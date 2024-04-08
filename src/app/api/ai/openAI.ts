import OpenAI from "openai"

const openai = new OpenAI()

export async function run(query: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
  })
  const [choice] = completion.choices
  return choice.message.content || ""
}

export async function generateImage(query: string) {
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: query,
    n: 1,
    size: "512x512",
  })
  return image.data
}
