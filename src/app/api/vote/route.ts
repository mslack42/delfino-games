import { getUserGameVotes } from "@/database/game-suggestion-votes/getUserGameVotes";
import { toggleGameSuggestionVote } from "@/database/game-suggestion-votes/toggleGameSuggestionVote";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bggId, userId, newStatus } = await req.json();

  if (!bggId || !userId || newStatus === undefined) {
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  try {
    if (newStatus) {
      const userSuggestions = await getUserGameVotes(userId);
      if (userSuggestions.length >= 5) {
        return NextResponse.json(
          {
            reason: "TooManyGameSuggestionVotes",
          },
          { status: 400 }
        );
      }
    }

    await toggleGameSuggestionVote(bggId, userId, newStatus);

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
