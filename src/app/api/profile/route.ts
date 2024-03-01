import { editProfileSchema } from "@/lib/profile-schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { updateUser } from "@/database/users/updateUser";

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
