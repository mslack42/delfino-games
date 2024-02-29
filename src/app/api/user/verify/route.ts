import prisma from "@/db"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const userId = req.nextUrl.searchParams.get("id")

    if (!userId || !userId.length){
        return NextResponse.json({message:"no user specified"}, {status:400})
    }

    const update = await prisma.user.update({
        data: {
            accounts: {
                updateMany: {
                    where: {
                        role: "Unverified"
                    },
                    data: {
                        role: "Verified"
                    }
                }
            }
        },
        where: {
            id: userId,
            accounts: {
                every: {
                    role: "Unverified"
                }
            }
        },
        include: {
            _count: true
        }
    })

    if (update._count.accounts === 0) {
        return NextResponse.json({message:"Unverified user not found"}, {status:404})
    }
    return NextResponse.json({ message: "success" });
}