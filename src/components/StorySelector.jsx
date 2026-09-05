function StorySelector({handleStory, selectedStoryType}) {
    const storyTypes = ["horror" , "funny", "adventure"]

    return (
        <div className="flex gap-1.5 items-center">
            {storyTypes.map((type) => {
                const active = selectedStoryType === type
                
                return (    
                    <button
                        key={type}
                        className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-md transition-all cursor-pointer capitalize ${
                            active
                                ? "text-primary-text bg-white/10"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                        }`}
                        onClick={() => handleStory(type)}
                    >
                        {active && (
                            <span className="absolute inset-0 rounded-md bg-white/5 animate-[fadeIn_0.15s_ease-out]" />
                        )}

                        <span className="relative z-10">
                            {type}
                        </span>
                    </button>
                )                
            })}

            <button 
                className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStoryType === "ai"
                    ? "text-primary-text bg-white/10"
                    : "text-secondary-text hover:text-primary-text hover:bg-cyan/5"
                }`}
                onClick={()=> handleStory("ai")}
            >
                {selectedStoryType === "ai" && (
                    <span className="absolute inset-0 rounded-md bg-white/5 animate-[fadeIn_0.15s_ease-out]" />
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