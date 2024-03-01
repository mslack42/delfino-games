import { BggSummaryData } from "@/bgg/types";
import { NewGameData, addGame } from "@/database/games/addGame";
import prisma from "@/db";
import { addGameSchema } from "@/lib/game-schema";
import { tryParseInt } from "@/util/tryParseInt";
import { Ownership, Location } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type PayloadDataType = {
  formData: any;
  bggData: BggSummaryData;
};

export async function POST(req: NextRequest) {
  try {
    const json: PayloadDataType = await req.json();
    const { ownership, location, ownerId, newOwner, holderId, newHolder } =
      addGameSchema.parse(json.formData);

    const ownerIdInt = tryParseInt(ownerId);
    const holderIdInt = tryParseInt(holderId);

    const newGame: NewGameData = {
      bggData: json.bggData,
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
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        status: "error",
      },
      { status: 400 }
    );
  }
}
