"use server"
import { Pool } from "pg"

export const pool = new Pool()

export async function DBConnection() {
  try {
    console.log("Testing connection to PostgreSQL database")
    const client = await pool.connect()
    const results = await client.query("SELECT NOW()")
    console.log("Connected to PostgreSQL database", results?.rows[0]?.now)
    client.release()
    console.log("Release test connection completed.")
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw error
  }
}
