function ContentSelector({activeSelector, changeActiveSelector}) {
    const tabs = ["words", "paragraph", "story", "time"]

    return(
        <div className="flex gap-2">
            {tabs.map((tab) => {
                const active = activeSelector === tab

                return (
                    <button 
                        key={tab}
                        className={`relative px-4 py-2 text-sm font-medium rounded-md capitalize transition-al l cursor-pointer duration-200 active:scale-95 ${
                            active
                                ? "bg-white/10 text-primary-text"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                        }`}
                        onClick={() => changeActiveSelector(tab)}
                    >
                        {active && (
                            <span className="absolute inset-0 rounded-lg bg-white/5 border animate-[fadeIn_0.15s_ease-out]"></span>
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default ContentSelector