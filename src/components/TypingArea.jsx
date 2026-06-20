function TypingArea({currentText, typedText}) {
    return (
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
    )
}

export default TypingArea