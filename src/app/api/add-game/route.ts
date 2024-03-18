import { BggSummaryData } from "@/bgg/types";
import { addGame } from "@/database/games/addGame";
import { NewGameData } from "@/database/games/types";
import { addGameSchema } from "@/lib/game-schema";
import { tryParseInt } from "@/util/tryParseInt";
import { Ownership, Location } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type PayloadDataType = {
  formData: any;
  bggData: BggSummaryData;
  selectedExpansions: number[];
};

export async function POST(req: NextRequest) {
  try {
    const json: PayloadDataType = await req.json();

    const {
      ownership,
      location,
      ownerId,
      newOwner,
      holderId,
      newHolder,
      isInRotation,
    } = addGameSchema.parse(json.formData);

    const ownerIdInt = tryParseInt(ownerId);
    const holderIdInt = tryParseInt(holderId);

    const newGame: NewGameData = {
      bggData: {
        ...json.bggData,
        expansions:
          json.selectedExpansions.length > 0
            ? json.bggData.expansions!.filter((ex) =>
                json.selectedExpansions.includes(ex.bggId)
              )
            : undefined,
      },
      ownership: ownership as Ownership,
      location: location as Location,
      ownerId: ownerIdInt,
      newOwner:
        ownerIdInt !== null && ownerIdInt !== undefined && ownerIdInt > -1
          ? undefined
          : newOwner!,
      holderId: holderIdInt,
      newHolder:
        holderIdInt !== null && holderIdInt !== undefined && holderIdInt > -1
          ? undefined
          : newHolder!,
      isInRotation: isInRotation,
    };

    const submitSuccess = await addGame(newGame);

    if (submitSuccess) {
      return NextResponse.json({
        message: "success",
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: e.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
      },
      { status: 500 }
    );
  }
}
