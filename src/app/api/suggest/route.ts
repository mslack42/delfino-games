import { getUserGameSuggestions } from "@/database/game-suggestions/getUserGameSuggestions";
import { toggleGameSuggestion } from "@/database/game-suggestions/toggleGameSuggestion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bggSearchResult, userId, newStatus } = await req.json();

  if (!bggSearchResult || !userId || newStatus === undefined) {
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  try {
    if (newStatus) {
      const userSuggestions = await getUserGameSuggestions(userId);
      if (userSuggestions.length >= 3) {
        return NextResponse.json(
          {
            reason: "TooManyGameSuggestions",
          },
          { status: 400 }
        );
      }
    }

    await toggleGameSuggestion(bggSearchResult, userId, newStatus);

    return NextResponse.json({
      newStatus,
    });
  } catch (error: any) {
    // TODO
    console.log(error);
    if (error.code === "P2002") {
      return NextResponse.json(
        {},
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {},
      {
        status: 500,
      }
    );
  }
}
