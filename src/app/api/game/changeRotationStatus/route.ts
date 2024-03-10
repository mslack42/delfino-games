import { changeRotationStatus } from "@/database/games/changeRotationStatus";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, newStatus } = await req.json();
  console.log(`Game rotation status: ${id} ${newStatus}`)

  if (!id || newStatus === undefined) {
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  try {
    changeRotationStatus(id, newStatus);

    return NextResponse.json({
      newStatus,
    });
  } catch (error: any) {
    // TODO
    return NextResponse.json(
      {},
      {
        status: 500,
      }
    );
  }
}
