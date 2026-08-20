function ContentSelector({activeSelector, changeActiveSelector}) {
    const tabs = ["words", "paragraph", "story", "time"]

    return(
        <div className="flex gap-2">
            {tabs.map((tab) => {
                const active = activeSelector === tab

                return (
                    <button 
                        key={tab}
                        className={` relative font-medium px-5 py-2 rounded-lg capitalize transition-all cursor-pointer duration-200 active:scale-95 ${
                            active
                                ? "text-cyan"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                        }`}
                        onClick={() => changeActiveSelector(tab)}
                    >
                        {active && (
                            <span className="absolute inset-0 rounded-lg bg-cyan/10 border border-cyan/30 animate-[fadeIn_0.15s_ease-out]"></span>
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default ContentSelector