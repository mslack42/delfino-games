import { deleteHolderRecord } from "@/database/holders/deleteHolder";
import { tryParseInt } from "@/util/tryParseInt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const holderId = tryParseInt(req.nextUrl.searchParams.get('id') ?? "")

    if (!holderId) {
        return NextResponse.json({ message: "no id provided" }, { status: 400 });
    }

    await deleteHolderRecord(holderId)
    return NextResponse.json({message:"success"})
}