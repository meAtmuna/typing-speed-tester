import { useEffect, useRef } from "react"

function TypingArea({currentText, typedText}) {
    const currentCharRef = useRef(null)

    useEffect(() => {
      if (currentCharRef.current) {
        currentCharRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })
      }
    }, [typedText])
    return (
         <div className="bg-typing border border-border rounded-2xl p-8 text-3xl leading-relaxed cursor-text">
            {currentText.split("").map((char, currentIndex) =>{
                let styles = "text-untyped"

                if (currentIndex < typedText.length) {
                  const isCorrect = typedText[currentIndex] === char
                   
                  if (isCorrect) {
                    styles = "text-correct"
                  } else {
                    if (char === " ") {
                        styles = "border-b-4 border-red-500"
                    } else {
                        styles = "text-mistake"
                    }
                  }
                } else if (currentIndex === typedText.length) {
                  styles =  "bg-cyan text-app-bg rounded"
                }

                return (
                <span 
                  key={currentIndex} 
                  className={styles}
                  ref={
                    currentIndex === typedText.length
                      ? currentCharRef
                      : null
                  }
                >
                    {char}
                </span>
                )
            })}
        </div>
    )
}

export default TypingArea