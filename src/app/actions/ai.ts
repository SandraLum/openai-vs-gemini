"use server"

import * as GoogleAI from "../api/ai/googleAI"
import * as OpenAI from "../api/ai/openAI"

export async function runGoogleAI(query: string) {
  const text = await GoogleAI.run(query)
  console.log("return text", text)
  return text
}

export async function runOpenAI(query: string) {
  const text = await OpenAI.run(query)
  console.log("openAI text", text)
  return text
}
