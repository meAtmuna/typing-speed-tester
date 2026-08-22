function StorySelector({handleStory, selectedStoryType}) {
    const storyTypes = ["horror" , "funny", "adventure"]

    return (
        <div className="flex gap-1.5 items-center">
            {storyTypes.map((type) => {
                const active = selectedStoryType === type
                
                return (    
                    <button
                        key={type}
                        className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-lg transition-all cursor-pointer capitalize ${
                            active
                                ? "text-cyan"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/15"
                        }`}
                        onClick={() => handleStory(type)}
                    >
                        {active && (
                            <span className="absolute inset-0 rounded-lg bg-cyan/10 animate-[fadeIn_0.15s_ease-out]" />
                        )}

                        <span className="relative z-10">
                            {type}
                        </span>
                    </button>
                )                
            })}

            <button 
                className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStoryType === "ai"
                    ? "text-cyan"
                    : "text-secondary-text hover:text-primary-text hover:bg-cyan/5"
                }`}
                onClick={()=> handleStory("ai")}
            >
                {selectedStoryType === "ai" && (
                    <span className="absolute inset-0 rounded-lg bg-cyan/10 animate-[fadeIn_0.15s_ease-out]" />
                )}

                <span className="relative z-10">
                    <i className="fa-solid fa-wand-magic-sparkles text-xs" />
                    AI
                </span>
            </button>
        </div>
    )
}

export default StorySelector