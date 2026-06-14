import { useRef, useState } from "react"
import paragraphs from "./data/paragraphs"
function App() {
  const [currentText] = useState(() => {
    const randomPara = Math.floor(Math.random() * paragraphs.length)
    return paragraphs[randomPara]
  })

  const [typedText, setTypedText] = useState("")
  const inputRef = useRef(null)

  return (
    <div 
      className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6"
      onClick={() => inputRef.current.focus()}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Typing Speed Tester
        </h1>

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
          onChange={(e) => setTypedText(e.target.value)}
          className="opacity-0 absolute"
          autoFocus
        />
      </div>
    </div>
  )
}

export default App
