import { useEffect, useRef, useState } from "react"
import paragraphs from "./data/paragraphs"
import words from "./data/words"
import stories from "./data/stories"
import Stats from "./components/Stats"
import ResultModal from "./components/Result"
import TypingArea from "./components/TypingArea"
import ContentSelector from "./components/ContentSelector"
import WordSelector from "./components/WordSelector"

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

  useEffect(() => {
    if (typedText.length === currentText.length && typedText === currentText) {
      setTestEnded(true)
    }
  }, [typedText, currentText])
  
  useEffect(() => {
    if (!testEnded) {
      inputRef.current?.focus()
    }
  }, [testEnded])

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

  function resetTest() {
    setTypedText("")
    setTimeLeft(60)
    setTestStarted(false)
    setTestEnded(false)
    generateText()
  }

  function changeContentMode(mode) {
    setContentType(mode)
    setTypedText("")
    setTimeLeft(60)
    setTestStarted(false)
    setTestEnded(false)    
  }
  
  if (testEnded) {
    return (
      <ResultModal wpm={wpm} accuracy={accuracy} mistakes={mistakes} resetTest={resetTest}/>
    )
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
        
        <ContentSelector contentType={contentType} changeContentMode={changeContentMode}/>

        {contentType === "words" && (
          <WordSelector  wordCount={wordCount} setWordCount={setWordCount}/>
        )}
        
        <Stats timeLeft={timeLeft} wpm={wpm} mistakes={mistakes} accuracy={accuracy}/>
        
        <TypingArea currentText={currentText} typedText={typedText}/>

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
