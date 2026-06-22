function TypingArea({currentText, typedText}) {
    return (
         <div className="text-3xl leading-relaxed text-zinc-500">
            {currentText.split("").map((char, currentIndex) =>{
                let styles = "text-zinc-500"

                if (currentIndex < typedText.length) {
                  const isCorrect = typedText[currentIndex] === char
                   
                  if (isCorrect) {
                    styles = "text-white"
                  } else {
                    if (char === " ") {
                        styles = "border-b-4 border-red-500"
                    } else {
                        styles = "text-red-500"
                    }
                  }
                } else if (currentIndex === typedText.length) {
                  styles =  "bg-yellow-500 text-black rounded"
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