function WordSelector({ wordCount, changeWordCount, openCustomModal}) {
    const wordOptions = [10, 25, 50, 100]
    
    return (
        <div className="flex gap-3 items-center">
            {wordOptions.map((count) => (
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${
                  wordCount === count 
                  ? "bg-cyan/15 text-cyan" 
                  : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                } `} 
                key={count} 
                onClick={() => {
                  changeWordCount(count)
                }}
               >
                {count}
              </button>
            ))}

            <button 
              className={`px-4 py-2 rounded-lg transition-all ${
                wordCount === "custom"
                  ? "bg-cyan/15 text-cyan"
                  : "text-secondary-text hover:text-cyan hover:bg-cyan/10" 
              }`}
              onClick={openCustomModal}
            >
              Custom
            </button>
        </div>
    )
}

export default WordSelector