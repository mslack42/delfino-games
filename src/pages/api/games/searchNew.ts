import { searchGames } from "@/bgg/searchGames";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405)
    }

    const {name} = req.query

    const results = await searchGames((name as string));

    return res.status(200).json({message:"success", results})
}