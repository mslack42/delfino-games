import prisma  from "@/db"
import { hashPassword } from "@/util/hash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Invalid method"})
    }

    const {email, password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        })

        if (user && user.password === hashPassword(password)) {
            return res.status(200).json({id: user.id, email: user.email, name: user.name})
        }
        return res.status(401).json({message:"Invalid credentials"})
    } catch (e) {
        return res.status(500).json({message:"Server error"})
    }
}
