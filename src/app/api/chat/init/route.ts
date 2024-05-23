import { pool } from "@/lib/database"
import { NextResponse } from "next/server"

export async function GET() {
  const defaultData = [
    {
      query: "Could you provide me a recipe on how to make mac and cheese",
    },
    {
      query:
        "Could you tell me a funny story regarding a bear, tortise and a dragon with a swollen tooth",
    },
    {
      query: "What is 10+10+20 divided by 2",
    },
  ]

  try {
    const results = await pool.query("SELECT * from v_sample_questions")
    return NextResponse.json({ data: results.rows }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      {
        data: defaultData,
        error: "Unable to get data, replaced with default set instead",
      },
      { status: 200 }
    )
  }
}
