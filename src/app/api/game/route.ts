import { DsGameData } from "@/database/games/types";
import { deleteGame } from "@/database/games/deleteGame";
import { editGameSchema } from "@/lib/game-schema";
import { tryParseInt } from "@/util/tryParseInt";
import { Ownership, Location } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateGame } from "@/database/games/updateGame";

export async function DELETE(req: NextRequest) {
  const gameId = tryParseInt(req.nextUrl.searchParams.get("id") ?? "");

  if (!gameId) {
    return NextResponse.json({ message: "no id provided" }, { status: 400 });
  }

  await deleteGame(gameId);
  return NextResponse.json({ message: "success" });
}

export async function POST(req: NextRequest) {
  const gameId = tryParseInt(req.nextUrl.searchParams.get("id") ?? "");

  if (!gameId) {
    return NextResponse.json({ message: "no id provided" }, { status: 400 });
  }

  try {
    const formData = await req.json();
    const {
      ownership,
      location,
      ownerId,
      newOwner,
      holderId,
      newHolder,
      isInRotation,
    } = editGameSchema.parse(formData);

    const ownerIdInt = tryParseInt(ownerId);
    const holderIdInt = tryParseInt(holderId);

    const data: DsGameData = {
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

    const submitSuccess = await updateGame(data, gameId);

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
      {
        status: 400,
      }
    );
  }
}
