import { useEffect, useRef, useState } from "react"
import paragraphs from "../data/paragraphs"
import words from "../data/words"
import stories from "../data/stories"
import Stats from "../components/Stats"
import ResultModal from "../components/Result"
import TypingArea from "../components/TypingArea"
import ContentSelector from "../components/ContentSelector"
import WordSelector from "../components/WordSelector"
import StorySelector from "../components/StorySelector"
import ParagraphSelector from "../components/ParagraphSelector"
import TimeSelector from "../components/TimeSelector"
import { generateStory } from "../utils/ai"
import { Settings as SettingsIcon } from "lucide-react"
import Settings from "../components/Settings"

function TypingTest() {
  const [currentText, setCurrentText] = useState("")
  const [typedText, setTypedText] = useState("")
  const [timeLeft, setTimeLeft] =  useState(60)
  const [timeLimit, setTimeLimit] = useState(60)
  const [customTime, setCustomTime] = useState("")
  const [showCustomTimeModal, setShowCustomTimeModal] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [testEnded, setTestEnded] = useState(false)
  const [contentType, setContentType] = useState("words")
  const [wordCount, setWordCount] = useState(50)
  const [customWords, setCustomWords] = useState("")
  const [loadingStory, setLoadingStory] = useState(false)
  const [selectedStoryType, setSelectedStoryType] = useState("horror")
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [wpmHistory, setWpmHistory] = useState([])
  const [paragraphDifficulty, setParagraphDifficulty] = useState("easy")
  const [selectedAiStoryType , setSelectedAiStoryType] = useState("horror")
  const [showAiModal, setShowAiModal] = useState(false)
  const [activeSelector, setActiveSelector] = useState("words")
  const [showSettings, setShowSettings] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isPasued, setIsPaused] = useState(false)
  const [hideTimer, setHideTimer] = useState(false)
  const inputRef = useRef(null)
  const wpmRef = useRef(0)
  
  const keySound = useRef(new Audio("/keyPress.mp3"))
  useEffect(() => {
    keySound.current.volume = 0.2
  }, [])

  useEffect(() =>{
    generateText()
  }, [contentType, wordCount, paragraphDifficulty, selectedStoryType,])

  useEffect(()=> {
    if (!testStarted || testEnded || isPasued) return
    
    const timer = setInterval(() => {
      setWpmHistory((old) => [...old, wpmRef.current])

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
  }, [testStarted, testEnded, isPasued])

  useEffect(() => {
    if (currentText.length > 0 && typedText.length === currentText.length) {
      setTestEnded(true)
    }
  }, [typedText, currentText])
  
  useEffect(() => {
    if (!testEnded) {
      inputRef.current?.focus()
    }
  }, [testEnded])

  function updateTypedText(e) {
    if (!testStarted || testEnded || isPasued) return

    const value = e.target.value

    if (value.length > typedText.length && soundEnabled) {
      keySound.current.currentTime = 0
      keySound.current.play().catch(() => {})
    }

    // if (!testStarted) {
    //   setTestStarted(true)
    // }

    setTypedText(value)
  }

  const mistakes = typedText
    .split("")
    .filter((char, index) => char !== currentText[index]).length
   
  const correctChars = Math.max(0, typedText.length - mistakes)

  const accuracy = typedText.length > 0 
                    ? Math.round(((typedText.length - mistakes) / typedText.length) * 100)
                    : 100

  const timeSpent = (timeLimit - timeLeft) / 60

  const wpm = timeSpent > 0 ? Math.round(correctChars / 5 / timeSpent) : 0

  useEffect(() => {
    wpmRef.current = wpm
  }, [wpm])

  function generateText() {
    if (contentType === "words") {
      const randomWords = []

      let totalWords = wordCount

      if (wordCount === "custom") {
        const customCount = Number(customWords)

        if (customCount === 0) {
          totalWords = 1000
        } else {
          totalWords = customCount
        }
      }

      for (let i = 0; i < totalWords; i++) {
        const randomIndex = Math.floor(Math.random() * words.length)
        randomWords.push(words[randomIndex])  
      }

     setCurrentText(randomWords.join(" "))
     return

    }

    if (contentType === "paragraph") {
      const selectedParagraphs = paragraphs[paragraphDifficulty]

      const randomIndex = Math.floor(Math.random() * selectedParagraphs.length)
      setCurrentText(selectedParagraphs[randomIndex])
      return
    }

    if (contentType === "story") {
      if (selectedStoryType === "ai") {
        return
      }
    }

    const selectedStories = stories[selectedStoryType]
    if (!selectedStories) return
    const randomIndex = Math.floor(Math.random() * selectedStories.length)
    setCurrentText(selectedStories[randomIndex])
  }

  function applyCustomWords() {
    if (customWords.trim() === "") return

    const count = Number(customWords)

    if (count > 1000) {
      alert("Max 1000 words allowed")
      return
    }

    setWordCount("custom")
    resetTest()
  }

  function applyCustomTime() {
    const  time = Number(customTime)

    if (time <= 0) return

    setTimeLimit(time)
    setTimeLeft(time)
    setTypedText("")
    setTestStarted(false)
    setTestEnded(false)
    setWpmHistory([])
  }

  async function handleStory(type) {
    if (type !== "ai") {
      setSelectedStoryType(type)

      const selectedStories = stories[type]
      const randomIndex = Math.floor(Math.random() * selectedStories.length)
      resetTest(false)
      setCurrentText(selectedStories[randomIndex])

      return
    }

    setSelectedStoryType("ai")
    setShowAiModal(true)
  }

  async function generateAiStory() {
    try {
      setLoadingStory(true)
  
      const story = await generateStory(selectedAiStoryType)

      setSelectedStoryType("ai")
      resetTest(false)
      setCurrentText(story)
      setShowAiModal(false)

    } catch {
      const selectedStories = stories[selectedAiStoryType]
      const randomIndex = Math.floor(Math.random() * selectedStories.length)

      setSelectedStoryType("ai")
      resetTest(false)
      setCurrentText(selectedStories[randomIndex])

      alert("AI unavailable. Showing local story.")
      setShowAiModal(false)

    } finally {
      setLoadingStory(false)
    }
  }

  function changeParagraphDifficulty(level) {
    setParagraphDifficulty(level)
    resetTest()
  }

  function changeWordCount(count) {
    setWordCount(count)
    resetTest()
  }

  function changeTimeLimit(time) {
    setTimeLimit(time)
    setTimeLeft(time)
    setTypedText("")
    setTestStarted(false)
    setTestEnded(false)
    setWpmHistory([])
  }

  function resetTest(shouldGenerate = true) {
    setTypedText("")
    setTimeLeft(timeLimit)
    setTestStarted(false)
    setTestEnded(false)
    setWpmHistory([])

    if (shouldGenerate) {
      generateText()
    }
  }

  // function changeContentMode(mode) {
  //   setContentType(mode)
  //   setTypedText("")
  //   setTimeLeft(60)
  //   setTestStarted(false)
  //   setTestEnded(false)    
  // }

  function changeActiveSelector(selector) {
    setActiveSelector(selector)

    if (selector != "time") {
      setContentType(selector)
      setTypedText("")
        setTestStarted(false)
        setTestEnded(false)
        setWpmHistory([])
        setTimeLeft(timeLimit)
      // resetTest()
    }
  }
  
  if (testEnded) {
    return (
      <ResultModal 
        wpm={wpm} 
        accuracy={accuracy} 
        mistakes={mistakes} 
        resetTest={resetTest}
        wpmHistory={wpmHistory}
        timeLimit={timeLimit}
      />
    )
  }

  return (
    <div className="min-h-screen bg-app-bg text-primary-text flex items-center justify-center px-6 py-10"
      onClick={() => {
        if (testStarted && !testEnded && !isPasued) {
          inputRef.current?.focus()
        }
      }}
    >
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2.5">
            <i className="fa-solid fa-keyboard text-cyan"></i>
            Type<span className="text-cyan">Fast</span>
          </h1>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-secondary-text hover:text-cyan hover:bg-cyan/10 rounded-lg transition-all cursor-pointer">
            <SettingsIcon size={22}/>
          </button>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-3 mb-8 flex justify-between items-center gap-6">
          <ContentSelector 
            activeSelector={activeSelector} 
            changeActiveSelector={changeActiveSelector}
          />

          {activeSelector === "words" && (
            <WordSelector  
              wordCount={wordCount} 
              changeWordCount={changeWordCount}
              openCustomModal={() => setShowCustomModal(true)}
            />
          )}    

          {activeSelector === "story" && (
            <StorySelector 
              handleStory={handleStory}
              selectedStoryType={selectedStoryType}
            />
          )}

          {activeSelector === "paragraph" && (
            <ParagraphSelector
              paragraphDifficulty={paragraphDifficulty}
              changeParagraphDifficulty={changeParagraphDifficulty}
            />
          )}

          {activeSelector === "time" && (
            <TimeSelector
              timeLimit={timeLimit}
              changeTimeLimit={changeTimeLimit}
              openCustomTimeModal={() => setShowCustomTimeModal(true)}
            />
          )}
        </div>

        <Stats 
          timeLeft={timeLeft} 
          wpm={wpm} 
          mistakes={mistakes} 
          accuracy={accuracy} 
          hideTimer={hideTimer} 
          testStarted={testStarted}
        />

        <div className="flex justify-center mb-6">
          {!testStarted ? (
            <button
              className="px-8 py-3 bg-cyan text-app-bg font-semibold rounded-xl cursor-pointer transition-all" 
              onClick={() => {
                setTestStarted(true)
                setIsPaused(false)
                inputRef.current?.focus()
              }}
            >
              Start Typing
            </button>
          ) : (
            <button 
              className="px-8 py-3 bg-cyan text-app-bg font-semibold rounded-xl cursor-pointer transition-all" 
              onClick={() => {
                setIsPaused(!isPasued)

                if (isPasued) {
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 0);
                }
              }}
            >
              {isPasued ? "Resume Typing" : "Pause Typing"}
            </button>
          )}
      </div>

        <div>
          <TypingArea currentText={currentText} typedText={typedText}/>
        </div>

        <input
          ref={inputRef}
          type="text" 
          value={typedText}
          onChange={updateTypedText}
          className="opacity-0 pointer-events-none fixed"
          disabled={testEnded || isPasued}
        />
      </div>

      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-6 w-[420px]">
            <h2 className="text-xl font-bold mb-2">Custom Word Count</h2>
            <p className="text-secondary-text mb-4">
              Enter number of words
            </p>

            <input 
                type="text"
                placeholder="word amount"
                value={customWords}
                onChange={(e) => {
                  const value = e.target.value

                  if (/^\d*$/.test(value)) {
                    setCustomWords(value)
                  }
                }}
                className={`w-full px-4 py-3 rounded-lg outline-none border mb-4 ${
                  customWords.trim() === ""
                    ? "border-red-500 bg-typing-box" 
                    : "border-border bg-typing-box focus:border-cyan" 
                } text-primary-text`}
              />

              <div className="flex gap-3 justify-end"> 
                <button 
                  className="px-4 py-2 rounded-lg text-secondary-text border border-cyan cursor-pointer"
                  onClick={() => setShowCustomModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-cyan text-app-bg font-semibold cursor-pointer"
                  onClick={() => {
                    applyCustomWords()
                    setShowCustomModal(false)
                  }}
                >
                  Apply
                </button>
              </div>
          </div>
        </div>
      )}

      {showCustomTimeModal &&  (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-6 w-[420px]">
            <h2 className="text-xl font-bold mb-2">Custom Time</h2>
            <p className="text-secondary-text mb-4">
              Enter time in seconds
            </p>

            <input 
                type="text"
                placeholder="Enter seconds"
                value={customTime}
                onChange={(e) => {
                  const value = e.target.value

                  if (/^\d*$/.test(value)) {
                    setCustomTime(value)
                  }
                }}
                className={`w-full px-4 py-3 rounded-lg outline-none border mb-4 ${
                  customTime.trim() === ""
                    ? "border-red-500 bg-typing-box" 
                    : "border-border bg-typing-box focus:border-cyan" 
                } text-primary-text`}
              />

              <div className="flex gap-3 justify-end"> 
                <button 
                  className="px-4 py-2 rounded-lg text-secondary-text border border-cyan cursor-pointer"
                  onClick={() => setShowCustomTimeModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-cyan text-app-bg font-semibold cursor-pointer"
                  onClick={() => {
                    applyCustomTime()
                    setShowCustomTimeModal(false)
                  }}
                  disabled={customTime.trim() === ""}
                >
                  Apply
                </button>
              </div>
          </div>
        </div>
      )}

      {showAiModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-6 w[420px]">
            <h2 className="text-xl font-bold mb-2">AI Story</h2>
            <p className="text-secondary-text mb-5">
              Select a Story type
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["horror", "funny", "adventure"].map((type) => (
                <button 
                  key={type}
                  onClick={() => setSelectedAiStoryType(type)}
                  className={`py-2  rounded-lg capitalize border transition-all px-4 cursor-pointer ${
                    selectedAiStoryType === type
                      ? "bg-cyan/15 text-cyan"
                      : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 rounded-lg text-secondary-text border border-cyan cursor-pointer"
                onClick={() => setShowAiModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-cyan text-app-bg font-semibold disabled:opacity-50 cursor-pointer"
                onClick={generateAiStory}
                disabled={loadingStory}
              >
                {loadingStory ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>  
        </div>
      )}

      {showSettings && (
        <Settings
          closeSettings={() => setShowSettings(false)}
          soundEnabled={soundEnabled}
          changeSoundEnabled={setSoundEnabled}
          hideTimer={hideTimer}
          changeHideTimer={setHideTimer}
        />
      )}
    </div>
  )
}

export default TypingTest