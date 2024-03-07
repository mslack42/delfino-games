import { deleteGame } from "@/database/games/deleteGame";
import { tryParseInt } from "@/util/tryParseInt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const gameId = tryParseInt(req.nextUrl.searchParams.get("id") ?? "");

  if (!gameId) {
    return NextResponse.json({ message: "no id provided" }, { status: 400 });
  }

  await deleteGame(gameId);
  return NextResponse.json({ message: "success" });
}
