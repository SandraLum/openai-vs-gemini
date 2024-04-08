import { pool } from "@/lib/database"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400)
  } else {
    const results = await pool.query("SELECT * from v_sample_questions")
    res.status(200).json({ data: results.rows })
  }
}
