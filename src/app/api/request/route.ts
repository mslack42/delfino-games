import { getUserGameRequests } from "@/database/game-requests/getUserGameRequests";
import { toggleGameRequest } from "@/database/game-requests/toggleGameRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { gameId, userId, newStatus } = await req.json();

  if (!gameId || !userId || newStatus === undefined) {
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  try {
    if (newStatus) {
      const userRequests = await getUserGameRequests(userId);
      if (userRequests.length >= 3) {
        return NextResponse.json(
          {
            reason: "TooManyGameRequests",
          },
          { status: 400 }
        );
      }
    }

    await toggleGameRequest(gameId, userId, newStatus);

    return NextResponse.json({
      newStatus,
    });
  } catch (error: any) {
    // TODO
    console.log(error);
    return NextResponse.json(
      {},
      {
        status: 500,
      }
    );
  }
}
