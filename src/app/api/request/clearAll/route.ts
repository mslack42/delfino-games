import { clearGameRequests } from "@/database/game-requests/clearGameRequests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { gameId } = await req.json();

  if (!gameId) {
    return NextResponse.json(
      { status: 400, message: "Validation Error" },
      {
        status: 400,
      }
    );
  }

  try {
    await clearGameRequests(gameId);

    return NextResponse.json({
      status: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { status: 500, message: "Internal Failure" },
      {
        status: 500,
      }
    );
  }
}
