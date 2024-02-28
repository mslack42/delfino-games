import { deleteHolderRecord } from "@/database/holders/deleteHolder";
import { editHolderSchema } from "@/lib/holder-schema";
import { tryParseInt } from "@/util/tryParseInt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { Location } from "@prisma/client";
import { ZodError } from "zod";

export async function DELETE(req: NextRequest) {
    const holderId = tryParseInt(req.nextUrl.searchParams.get('id') ?? "")

    if (!holderId) {
        return NextResponse.json({ message: "no id provided" }, { status: 400 });
    }

    await deleteHolderRecord(holderId)
    return NextResponse.json({message:"success"})
}

export async function POST(req: NextRequest) {
    try {
        const {name, office, id} = editHolderSchema.parse(await req.json())

        await prisma.person.update({
            where: {
                id: id
            },
            data: {
                location: {
                    set: office as Location
                },
                name: {
                    set: name
                }
            }
        })

        return NextResponse.json({
            status: "success"
        })
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

          console.log(error)

        return NextResponse.json(
            {
              status: "error",
              message: error.message || "Internal Server Error",
            },
            { status: 500 }
          );
    }
}