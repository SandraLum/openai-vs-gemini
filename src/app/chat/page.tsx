"use client"

import { useState } from "react"
import Image from "next/image"
import { runGoogleAI, runOpenAI } from "../actions/ai"

interface Suggestion {
  query: string
}

export default function Chat() {
  const [query, setQuery] = useState("")

  const suggestions: Suggestion[] = [
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

  function onSuggestionClicked(suggestion: Suggestion) {
    setQuery(suggestion.query)
  }

  async function onSend() {
    console.log("hello ---")
    const results = await Promise.all([runGoogleAI(query), runOpenAI(query)])
    console.log("results", results)
  }

  return (
    <div className={`flex flex-col`}>
      <span className={`text-[2.5rem] font-bold`}>Ask me anything</span>
      <div className={`flex flex-row py-5`}>
        {suggestions.map((suggestion, idx) => {
          return (
            <button
              onClick={() => onSuggestionClicked(suggestion)}
              key={`sug-${idx}`}
              className={`rounded-2xl border-2 border-violet-500 min-h-[1rem] p-3 mr-3 bg-gradient-to-br from-neutral-200 to-indigo-200 text-neutral-700 hover:to-indigo-300`}
            >
              {suggestion.query}
            </button>
          )
        })}
      </div>
      <div className={`flex flex-row py-3`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a prompt here ..."
          className="w-full bg-transparent text-xl rounded-xl border-2 border-violet-500 p-2"
        />
        <button
          onClick={onSend}
          className={`p-4 px-6 bg-white rounded-2xl mx-4 text-violet-700`}
        >
          Send
        </button>
      </div>

      {/* Results */}
      <div>
        <a name="results" />
        <div className={`flex flex-row`}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
