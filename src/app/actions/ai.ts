"use server"

import * as GoogleAI from "../api/ai/googleAI"
import * as OpenAI from "../api/ai/openAI"
import mockOpenAIImage from "./mockOpenAIImage"

export async function runGoogleAI(query: string) {
  const text = await GoogleAI.run(query)
  console.log("google: text", text)
  return text
}

export async function runOpenAI(query: string) {
  const text = await OpenAI.run(query)
  console.log("openAI: text", text)
  return text
}

export async function runGenerateImageOpenAI(query: string) {
  const result = await OpenAI.generateImages(query)
  console.log("openAI: images", JSON.stringify(result))
  return result
}
