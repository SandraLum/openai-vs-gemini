"use client"
import Image from "next/image"

export default function Header() {
  return (
    <div
      className={`fixed h-[6em] flex w-full`}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className={`flex flex-row items-center`}>
        <Image
          src="/google-gemini.png"
          width={200}
          height={180}
          alt="Google Gemini"
        />
        <span className={`text-3xl text-neutral-100 font-bold px-5`}>VS</span>
        <Image src="/open-ai-white.png" width={80} height={60} alt="OpenAI" />
      </div>
      <span className={`text-neutral-300 self-end pb-2 pl-5`}>
        This is an AI Comparison tool
      </span>
    </div>
  )
}
