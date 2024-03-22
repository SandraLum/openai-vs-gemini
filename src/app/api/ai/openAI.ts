import OpenAI from "openai"

const openai = new OpenAI()

async function run(query: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
  })
  const [choice] = completion.choices
  return choice.message.content || ""
}
export { run }
