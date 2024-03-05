import { editUserSchema } from "@/lib/user-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { deleteUser } from "@/database/users/deleteUser";
import { updateUser } from "@/database/users/updateUser";

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("id");

  if (!userId || !userId.length) {
    return NextResponse.json({ message: "no user specified" }, { status: 400 });
  }

  await deleteUser(userId);

  return NextResponse.json({ message: "success" });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, id, role } = editUserSchema.parse(await req.json());

    await updateUser(id, name, email, role as UserRole);

    return NextResponse.json({
      status: "success",
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
