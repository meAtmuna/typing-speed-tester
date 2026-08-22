function WordSelector({ wordCount, changeWordCount, openCustomModal}) {
    const wordOptions = [10, 25, 50, 100]
    const isCustom = wordCount === "custom"
    return (
        <div className="flex gap-1.5 items-center">
            {wordOptions.map((count) => (
              <button 
                className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  wordCount === count 
                  ? "text-cyan" 
                  : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                } `} 
                key={count} 
                onClick={() => {
                  changeWordCount(count)
                }}
               >
                  {wordCount === count && (
                      <span className="absolute inset-0 rounded-lg bg-cyan/10 animate-[fadeIn_0.15s_ease-out]" />
                  )}

                  <span className="relative z-10">
                    {count}
                  </span>
              </button>
            ))}

            <button 
              className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                isCustom
                  ? "text-cyan"
                  : "text-secondary-text hover:text-primary-text hover:bg-white/5" 
              }`}
              onClick={openCustomModal}
            >
              {isCustom && (
                    <span className="absolute inset-0 rounded-lg bg-cyan/10 animate-[fadeIn_0.15s_ease-out]" />
              )}

              <span className="relative z-10">
                    Custom
                </span>
            </button>
        </div>
    )
}

export default WordSelector