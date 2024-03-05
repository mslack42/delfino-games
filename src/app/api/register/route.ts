import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createUserSchema } from "@/lib/user-schema";
import { ZodError } from "zod";
import { createUser } from "@/database/users/createUser";

export async function POST(req: Request) {
  try {
    const { name, email, password, invitationCode } = createUserSchema.parse(
      await req.json()
    );

    if (invitationCode !== process.env.INVITATION_CODE!) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid invitation code",
          errors: [
            {
              invitationCode: {
                code: "invalid_type",
                message: "Invalid invitation code",
              },
            },
          ],
        },
        { status: 400 }
      );
    }

    const hashed_password = await hash(password, 12);

    const user = await createUser(name, email, hashed_password);

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
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

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "User with that email already exists",
        },
        { status: 409 }
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
