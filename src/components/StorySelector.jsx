function StorySelector({handleStory, selectedStoryType, isAiSelected}) {
    const storyTypes = ["horror" , "funny", "adventure"]

    return (
        <div className="flex gap-3">
            {storyTypes.map((type) => {
                const active = selectedStoryType === type
                
                return (    
                    <button
                        key={type}
                        className={`px-4 py-2 rounded-lg transition-all cursor-pointer capitalize ${
                            active
                                ? "bg-cyan/15 text-cyan"
                                : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                        }`}
                        onClick={() => handleStory(type)}
                    >
                        {type}
                    </button>
                )                
            })}

            <button 
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStoryType === "ai"
                    ? "bg-cyan/15 text-cyan"
                    : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                }`}
                onClick={()=> handleStory("ai")}
            >
                <i className="fa-solid fa-wand-magic-sparkles text-xs" />
                AI
            </button>
        </div>
    )
}

export default StorySelector