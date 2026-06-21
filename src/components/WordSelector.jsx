import { useState } from "react"

function WordSelector({ wordCount, setWordCount, customWords, setCustomWords, applyCustomWords}) {
    const [showCustomInput, setShowCustomInput] = useState(false)
    const wordOptions = [10, 25, 50, 100]
    
    return (
        <div className="flex justify-center gap-3 mb-8">
            {wordOptions.map((count) => (
              <button 
                className={`px-4 py-2 rounded ${
                  wordCount === count 
                  ? "bg-amber-400 text-black" 
                  : "bg-zinc-800 text-white"
                } `} 
                key={count} 
                onClick={() => {
                  setWordCount(count)
                  setShowCustomInput(false)
                }}
               >
                {count}
              </button>
            ))}

            <button 
              className="px-4 py-2 rounded bg-zinc-800 text-white"
              onClick={() => setShowCustomInput(true)}
            >
              Custom
            </button>

            {showCustomInput && (
              <div className="flex items-center gap-3">
                <input 
                  type="text"
                  inputMode="numeric"
                  placeholder="word amount"
                  value={customWords}
                  onChange={(e) => {
                    const value = e.target.value

                    if (/^\d*$/.test(value)) {
                      setCustomWords(value)
                    }
                  }}
                  className={`w-40 px-3 py-2 rounded outline-none border ${
                    customWords.trim() === ""
                      ? "border-red-500 bg-zinc-900" 
                      : "border-zinc-700 bg-zinc-800" 
                  } text-white`}
                />

                {customWords.trim() !== "" && (
                  <button 
                    className="px-4 py-2 rounded bg-amber-400 text-black"
                    onClick={applyCustomWords}
                  >
                    Apply
                  </button>
                )}
              </div>
            )}
        </div>
    )
}

export default WordSelector