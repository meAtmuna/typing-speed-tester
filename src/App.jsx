import { useEffect, useRef, useState } from "react"
import paragraphs from "./data/paragraphs"
import words from "./data/words"
import stories from "./data/stories"

function App() {
  const [currentText, setCurrentText] = useState("")
  const [typedText, setTypedText] = useState("")
  const [timeLeft, setTimeLeft] =  useState(60)
  const [testStarted, setTestStarted] = useState(false)
  const [testEnded, setTestEnded] = useState(false)
  const [contentType, setContentType] = useState("words")
  const [wordCount, setWordCount] = useState(50)
  const inputRef = useRef(null)

  useEffect(() =>{
    generateText()
  }, [contentType,wordCount])

  useEffect(()=> {
    if (!testStarted || testEnded) return
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTestEnded(true)
          return 0
        }

        return prev - 1
      })
    }, 1000);

    return () => clearInterval(timer)
  }, [testStarted, testEnded])
  
  function updateTypedText(e) {
    if (testEnded) return

    if (!testStarted) {
      setTestStarted(true)
    }

    setTypedText(e.target.value)
  }

  const mistakes = typedText
    .split("")
    .filter((char, index) => char !== currentText[index]).length
   
  const correctChars = Math.max(0, typedText.length - mistakes)

  const accuracy = typedText.length > 0 
                    ? Math.round(((typedText.length - mistakes) / typedText.length) * 100)
                    : 100

  const timeSpent = (60 - timeLeft) / 60

  const wpm = timeSpent > 0 ? Math.round(correctChars / 5 / timeSpent) : 0

  function generateText() {
    if (contentType === "words") {
      const randomWords = []

      for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length)
        randomWords.push(words[randomIndex])  
      }

     setCurrentText(randomWords.join(" "))
     return

    }

    if (contentType === "paragraph") {
      const randomIndex = Math.floor(Math.random() * paragraphs.length)
      setCurrentText(paragraphs[randomIndex])
      return
    }

    const randomIndex = Math.floor(Math.random() * stories.length)
    setCurrentText(stories[randomIndex])
  }

  return (
    <div 
      className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6"
      onClick={() => inputRef.current.focus()}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Typing Speed Tester
        </h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <button
            className="px-4 py-2 rounded bg-zinc-800"
            onClick={() => setContentType("words")}
          >
            Words
          </button>
          <button
            className="px-4 py-2 rounded bg-zinc-800"
            onClick={() => setContentType("paragraph")}
          >
            Paragraph
          </button>
          <button
            className="px-4 py-2 rounded bg-zinc-800"
            onClick={() => setContentType("story")}
          >
            Story
          </button>
        </div>

        <div className="flex justify-center gap-8 mb-8 text-lg">
          <p className="text-yellow-400">
            Time: {timeLeft}s
          </p>
          <p className="text-green-400">
            WPM: {wpm}
          </p>
          <p className="text-red-500">
            Mistakes: {mistakes}
          </p>
          <p className="text-blue-400">
            Accuracy:  {accuracy}%
          </p>
        </div>
        <div className="text-3xl leading-relaxed text-zinc-500">
          {currentText.split("").map((char, currentIndex) =>{
            let color = "text-zinc-500"

            if (currentIndex < typedText.length) {
              color = typedText[currentIndex] === char ? "text-white" : "text-red-500"
            } else if (currentIndex === typedText.length) {
              color =  "bg-yellow-500 text-black rounded"
            }

            return (
              <span key={currentIndex} className={color}>
                {char}
              </span>
            )
          })}
        </div>

        <input
          ref={inputRef}
          type="text" 
          value={typedText}
          onChange={updateTypedText}
          className="opacity-0 absolute"
          autoFocus
          disabled={testEnded}
        />
      </div>
    </div>
  )
}

export default App
