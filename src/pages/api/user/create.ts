import prisma  from "@/db"
import { hashPassword } from "@/util/hash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405)
    }

    const {email, name, password} = req.body

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword(password)
        }
    })

    return res.status(200).json({name, email})
}
