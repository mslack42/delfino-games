import { verifyUser } from "@/database/users/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");

    if (!userId || !userId.length) {
      return NextResponse.json(
        { message: "no user specified" },
        { status: 400 }
      );
    }

    const update = await verifyUser(userId);

    if (update._count.accounts === 0) {
      return NextResponse.json(
        { message: "Unverified user not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "success" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Internal failure" }, { status: 500 });
  }
}
