"use client"
import { useEffect, useState } from "react"
import styles from "./chat.module.css"
import { runGenerateImageOpenAI } from "../actions/ai"
import IconButton from "@/components/IconButton"
import LoadingSpinner from "@/components/LoadingSpinner"
import OpenAI from "openai"

interface Suggestion {
  query: string
}

export default function ImageGeneration() {
  const [query, setQuery] = useState("")
  const [openAIResults, setOpenAIResults] = useState<OpenAI.Images.Image[]>()
  const [openAIErrors, setOpenAIErrors] = useState<string>()
  const [googleAIResults, setGoogleAIResults] = useState()
  const [loading, setLoading] = useState(false)

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const mockQns: Suggestion[] = [
    {
      query: "Diablo looking in the form minecraft",
    },
    {
      query: "Unicorn eating a glass apple in a crystal garden",
    },
  ]

  useEffect(() => {
    async function init() {
      setSuggestions(mockQns)
    }
    init()
  }, [])

  function onSuggestionClicked(suggestion: Suggestion) {
    setQuery(suggestion.query)
  }

  async function onSend() {
    if (!loading) {
      setLoading(true)

      try {
        const result = await runGenerateImageOpenAI(query)
        console.log("Open AI result:", result)
        if (result.length > 0) {
          setOpenAIResults(result)
        }
      } catch (e) {
        console.error("Error generating openai images", e as Error)
        setOpenAIErrors(e)
      }
      setLoading(false)
    }
  }

  function convertToBlob(base64Json: string, type: string) {
    const byteCharacters = atob(base64Json)
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i))
    }

    const byteArray = new Uint8Array(byteArrays)
    return { data: new Blob([byteArray], { type }), type }
  }

  async function onCopyToClipboard(results: any) {
    if (results && results.length > 0 && results[0].b64_json) {
      let blobData = convertToBlob(results[0].b64_json, "image/png")
      navigator.clipboard.write([
        new ClipboardItem({ [blobData.type]: blobData.data }),
      ])
    }
  }

  return (
    <div className={`flex flex-col`}>
      <span className={`text-[2.5rem] font-bold`}>Generate Image</span>
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
          className={`flex flex-row p-4 px-6 bg-white rounded-2xl mx-4 text-violet-700`}
        >
          <span>Send</span>
          {loading && <LoadingSpinner className="mx-2" />}
        </button>
      </div>

      {/* Results */}
      <a href="#results" />
      <div className={`flex flex-row mt-5 `}>
        <div className={`${styles.chatContainer}`}>
          <div className={`${styles.chatHeader}`}>
            <span>
              OpenAI{" "}
              <span className="text-base font-normal">generated image(s)</span>
            </span>
            <IconButton
              className="p-2 active:text-neutral-400"
              onClick={() => onCopyToClipboard(openAIResults)}
              icon={"content_copy"}
            />
          </div>
          <div className="bg-white flex p-3 rounded-lg">
            {openAIResults
              ? openAIResults.map((img, idx) => {
                  return (
                    <img
                      key={`img-openai-${idx}`}
                      src={`data:image/png;base64,` + img.b64_json}
                      alt={query}
                    />
                  )
                })
              : openAIErrors}
          </div>
        </div>

        <div className={`${styles.chatContainer}`}>
          <div className={`${styles.chatHeader}`}>
            <span>
              Gemini <span className="text-base font-normal">results</span>
            </span>
            <IconButton
              className="p-2 active:text-neutral-400"
              onClick={() => onCopyToClipboard(googleAIResults)}
              icon={"content_copy"}
            />
          </div>
          <div className="bg-white flex p-3 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
