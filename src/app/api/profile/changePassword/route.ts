import { changePasswordSchema } from "@/lib/profile-schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const sessionId = (await auth())?.user?.id;

    if (!sessionId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Unauthorised",
        },
        { status: 403 }
      );
    }

    const { currentPassword, password, passwordConfirm } =
      changePasswordSchema.parse(await req.json());

    const dbUser = await prisma?.user.findFirst({
      where: {
        id: sessionId,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!(await bcrypt.compare(currentPassword, dbUser.password as string))) {
      return NextResponse.json(
        {
          status: "error",
          message: "Password incorrect",
          errors: [
            {
              currentPassword: {
                code: "invalid_type",
                message: "Password incorrect",
              },
            },
          ],
        },
        { status: 400 }
      );
    }

    const newPasswordHash = await hash(password,12)

    await prisma?.user.update({
      where: {
        id: sessionId,
      },
      data: {
        password: newPasswordHash,
      },
    });

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
