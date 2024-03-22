"use client"

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from "./chat.module.css"
import { runGoogleAI, runOpenAI } from "../actions/ai"
import IconButton from "@/components/IconButton"
import LoadingSpinner from "@/components/LoadingSpinner"

interface Suggestion {
  query: string
}

export default function Chat() {
  const [query, setQuery] = useState("")
  const [openAIResults, setOpenAIResults] = useState("")
  const [googleAIResults, setGoogleAIResults] = useState("")
  const [loading, setLoading] = useState(false)

  const refGoogleAIText = useRef<HTMLTextAreaElement>(null)
  const refOpenAIText = useRef<HTMLTextAreaElement>(null)

  const suggestions: Suggestion[] = [
    {
      query: "Could you provide me a recipe on how to make mac and cheese",
    },
    {
      query:
        "Could you tell me a funny story regarding a bear, a tortoise and a dragon with a swollen tooth",
    },
    {
      query: "What is the sum of 400 300 200 1000 300 300",
    },
  ]

  useEffect(() => {
    if (refGoogleAIText.current) {
      refGoogleAIText.current.style.height = "auto"
      refGoogleAIText.current.style.height =
        refGoogleAIText.current.scrollHeight + "px"
    }
    if (refOpenAIText.current) {
      refOpenAIText.current.style.height = "auto"
      refOpenAIText.current.style.height =
        refOpenAIText.current.scrollHeight + "px"
    }
  }, [refGoogleAIText, refOpenAIText, openAIResults, googleAIResults])

  function onSuggestionClicked(suggestion: Suggestion) {
    setQuery(suggestion.query)
  }

  async function onSend() {
    if (!loading) {
      setLoading(true)
      // const mockResults = [
      //   "**Ingredients:**\n\n* 1 pound dried elbow macaroni\n* 4 tablespoons unsalted butter\n* 4 tablespoons all-purpose flour\n* 4 cups whole milk\n* 1 teaspoon dry mustard powder\n* 1/4 teaspoon salt\n* 1/8 teaspoon ground black pepper\n* 3 cups shredded cheddar cheese (about 12 ounces)\n* 1 cup shredded Monterey Jack cheese (about 4 ounces)\n\n**Instructions:**\n\n1. **Cook the pasta:** Bring a large pot of salted water to a boil and cook the macaroni according to the package directions. Drain the macaroni and set aside.\n\n2. **Make the cheese sauce:** In a large saucepan over medium heat, melt the butter. Whisk in the flour and cook for 1 minute. Gradually whisk in the milk until smooth. Bring to a simmer and cook for 5 minutes, stirring occasionally, until the sauce has thickened.\n\n3. **Season the sauce:** Add the dry mustard powder, salt, and black pepper to the sauce and stir to combine.\n\n4. **Add the cheese:** Gradually add the cheddar cheese and Monterey Jack cheese to the sauce, stirring until melted and smooth.\n\n5. **Combine the macaroni and cheese sauce:** Add the cooked macaroni to the cheese sauce and stir to combine. Cook for 2-3 minutes, or until the macaroni is warmed through.\n\n6. **Serve:** Serve the mac and cheese immediately, garnished with additional shredded cheese or chopped parsley, if desired.\n\n**Tips:**\n\n* For a creamier mac and cheese, use heavy cream instead of milk.\n* For a tangy mac and cheese, add a splash of lemon juice or white wine to the cheese sauce.\n* For a crispy topping, sprinkle some breadcrumbs or crushed crackers over the mac and cheese before baking.\n* Bake the mac and cheese at 350 degrees Fahrenheit for 20-25 minutes for a slightly browned and crispy crust.\n* To make a vegetarian mac and cheese, use vegetable broth instead of milk and omit the cheese. Add your favorite vegetables, such as broccoli, cauliflower, or carrots, to the macaroni before cooking.",
      //   "Sure! Here is a simple and delicious recipe for homemade mac and cheese:\n\nIngredients:\n- 2 cups elbow macaroni\n- 2 cups shredded cheddar cheese\n- 1/4 cup butter\n- 1/4 cup all-purpose flour\n- 2 cups milk\n- 1/2 teaspoon salt\n- 1/4 teaspoon black pepper\n- 1/4 teaspoon garlic powder\n\nInstructions:\n1. Cook the macaroni according to package instructions, then drain and set aside.\n2. In a large saucepan, melt the butter over medium heat. Stir in the flour until well combined.\n3. Gradually whisk in the milk, stirring constantly until the mixture is smooth and thickened.\n4. Stir in the salt, pepper, and garlic powder.\n5. Add the shredded cheddar cheese to the sauce, stirring until the cheese is melted and the sauce is smooth.\n6. Remove the saucepan from heat and stir in the cooked macaroni until evenly coated in the cheese sauce.\n7. Serve hot and enjoy!\n\nYou can also customize this recipe by adding in additional ingredients like crispy bacon, chopped vegetables, or breadcrumbs on top for a crunchy finish. Enjoy your homemade mac and cheese!",
      // ]

      //   const results = [
      //     'In the heart of an ancient forest, where the sun peeked through the dense canopy, there lived an unlikely trio: Boris the Bear, Terry the Tortoise, and Drake the Dragon.\n\nOne sunny afternoon, Boris stumbled upon a curiously swollen tooth. Its throbbing pain made him roar with discomfort. Desperate for relief, he lumbered over to Terry, his wise and ancient friend.\n\n"Oh, Terry!" Boris exclaimed, his voice a mix of pain and panic. "My tooth is killing me!"\n\nTerry extended his long, wrinkled neck and examined Boris\'s mouth. "My dear boy," he said, "you have a most unfortunate ailment. I suggest we consult Drake for his wisdom."\n\nSo, the trio made their way to Drake\'s lair, a smoldering cave filled with the lingering scent of dragonfire.\n\n"Drake!" Terry called out. "Boris has a toothache and needs your assistance."\n\nDrake emerged from the shadows, his emerald scales shimmering. "A swollen tooth, you say? I have just the remedy."\n\nHe puffed out his chest and directed a stream of fiery breath at Boris\'s mouth. "This will cauterize the swelling and cure your pain," he proclaimed.\n\nBoris opened his mouth wide, ready to experience the dragonfire. But just as Drake released his breath, Terry intervened.\n\n"Hold on, Drake!" Terry exclaimed. "That\'s Boris\'s left tooth. The swollen one is on the right!"\n\nA moment of silence fell over the cave as Boris, Terry, and Drake stared at one another. Then, a chorus of laughter erupted. Even the dragon couldn\'t resist a chuckle.\n\nFrom that day forward, the unlikely trio became known as the "Toothache Trio," and their laughter echoed through the ancient forest, a reminder of the silly incidents that can bring even the most unlikely friends together.',
      //     "Once upon a time, a bear, a tortoise, and a dragon were all friends who lived in the same forest. One day, the dragon woke up with a terribly swollen tooth and was in excruciating pain.\n\nThe bear and the tortoise decided to help their friend the dragon. They searched the forest for a dentist who could help with the dragon's toothache. Finally, they came across a wise old owl who claimed to be a dentist in his spare time.\n\nThe owl examined the dragon's tooth and determined that it needed to be pulled out. However, he was afraid that the dragon's fiery breath would singe his feathers. So, the bear and the tortoise came up with a plan to subdue the dragon's flame.\n\nThe tortoise suggested that they tickle the dragon's belly to make him laugh and unintentionally put out the flames. The bear agreed and with one swift pull, the owl yanked out the dragon's tooth. The dragon let out a roar of relief and gratitude.\n\nIn the end, the dragon was grateful for his friends' help and the owl was proud of his dental skills. The bear and the tortoise couldn't stop laughing at the absurdity of the situation. And from that day on, they all lived happily ever after in the forest, always ready to help each other in times of need.",
      //   ]
      try {
        const result = await runGoogleAI(query)
        setGoogleAIResults(result)
        console.log("Google result:", JSON.stringify(result))
      } catch (e) {
        setGoogleAIResults(e)
      }
      try {
        const result = await runOpenAI(query)
        setOpenAIResults(result)
        console.log("Google result:", JSON.stringify(result))
      } catch (e) {
        setOpenAIResults(e)
      }

      setLoading(false)
    }
  }

  function onCopyToClipboard(text: any) {
    navigator.clipboard.writeText(text)
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
              OpenAI <span className="text-base font-normal">results</span>
            </span>
            <IconButton
              className="p-2 active:text-neutral-400"
              onClick={() => onCopyToClipboard(openAIResults)}
              icon={"content_copy"}
            />
          </div>
          <div>
            <textarea
              readOnly
              ref={refOpenAIText}
              className="w-full p-3 rounded-lg"
              defaultValue={openAIResults}
            />
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
          <div>
            <textarea
              readOnly
              ref={refGoogleAIText}
              className="w-full p-3 rounded-lg"
              defaultValue={googleAIResults}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
