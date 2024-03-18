import { editProfileSchema } from "@/lib/profile-schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth, signOut } from "@/auth";
import { updateUser } from "@/database/users/updateUser";
import { deleteUser } from "@/database/users/deleteUser";

export async function POST(req: NextRequest) {
  try {
    const sessionId = (await auth())?.user?.id;

    const { name, email, id } = editProfileSchema.parse(await req.json());

    if (sessionId !== id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }

    updateUser(id, name, email);

    return NextResponse.json({
      status: "success",
    });
  } catch (error: any) {
    console.log(error);
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

export async function DELETE(req: NextRequest) {
  try {
    const sessionId = (await auth())?.user?.id;

    await deleteUser(sessionId!);
    await signOut();
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
