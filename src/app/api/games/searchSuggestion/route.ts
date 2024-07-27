import { searchGamesAndExpansions } from "@/bgg/searchGames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name");

    if (!name || !name.length) {
      return NextResponse.json({ message: "empty search" }, { status: 400 });
    }

    const results = await searchGamesAndExpansions(name as string);

    return NextResponse.json({ message: "success", results });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Internal failure" }, { status: 500 });
  }
}
