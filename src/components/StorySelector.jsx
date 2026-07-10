function StorySelector({handleStory, selectedStoryType}) {
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
        </div>
    )
}

export default StorySelector