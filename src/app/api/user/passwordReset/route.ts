import { updateUserPassword } from "@/database/users/updateUserPassword";
import { hash } from "bcryptjs";
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

    const newPassword = await hash("password", 12);

    const update = await updateUserPassword(userId, newPassword);

    if (update._count.accounts === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "success" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
