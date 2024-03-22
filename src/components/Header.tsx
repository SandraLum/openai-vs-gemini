"use client"

export default function Header() {
  return (
    <div
      className={`fixed h-[6em] flex w-full`}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className={`flex flex-row items-center p-4`}>
        <img
          src="/google-gemini-smaller.png"
          className="h-[50px]"
          alt="Google Gemini"
        />
        <span className={`text-3xl text-neutral-100 font-bold px-5`}>VS</span>
        <img
          src="/open-ai-white-smaller.png"
          className="h-[42px] mt-4"
          alt="OpenAI"
        />
      </div>
      <span className={`text-neutral-300 self-end pb-2`}>
        This is an AI Comparison tool
      </span>
    </div>
  )
}
