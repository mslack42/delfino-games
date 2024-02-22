import { searchGames } from "@/bgg/searchGames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  if (!name || !name.length) {
    return NextResponse.json({ message: "empty search" }, { status: 400 });
  }

  const results = await searchGames(name as string);

  return NextResponse.json({ message: "success", results });
}
