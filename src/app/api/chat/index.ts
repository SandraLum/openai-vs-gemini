export async function getSampleQuestions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/init`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
