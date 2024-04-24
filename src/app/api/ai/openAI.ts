import OpenAI from "openai"
import { Images, ImagesResponse } from "openai/resources/images.mjs"

const openai = new OpenAI()

export async function run(query: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
  })
  const [choice] = completion.choices
  return choice.message.content || ""
}

export async function generateImages(
  query: string
): Promise<OpenAI.Images.Image[]> {
  const dall_E_2 = {
    model: "dall-e-2",
    prompt: query,
    n: 1,
    response_format: "b64_json",
    size: "256x256",
  }
  const dall_e_3 = {
    model: "dall-e-3",
    prompt: query,
    n: 1,
    response_format: "b64_json",
    size: "1024x1024",
  }

  const image: ImagesResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: query,
    n: 1,
    response_format: "b64_json",
    size: "1024x1024",
  })
  return image.data
}
