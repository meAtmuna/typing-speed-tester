function TypingArea({currentText, typedText}) {
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
                <span key={currentIndex} className={styles}>
                    {char}
                </span>
                )
            })}
        </div>
    )
}

export default TypingArea