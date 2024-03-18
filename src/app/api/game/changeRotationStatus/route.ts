import { changeRotationStatus } from "@/database/games/changeRotationStatus";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, newStatus } = await req.json();

  if (!id || newStatus === undefined) {
    return NextResponse.json(
      { status: 400, message: "Validation Error" },
      {
        status: 400,
      }
    );
  }

  try {
    await changeRotationStatus(id, newStatus);

    return NextResponse.json({
      newStatus,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: "Internal Error" },
      {
        status: 500,
      }
    );
  }
}
