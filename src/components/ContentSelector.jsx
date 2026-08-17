function ContentSelector({activeSelector, changeActiveSelector}) {
    const tabs = ["words", "paragraph", "story", "time"]

    return(
        <div className="flex gap-4">
            {tabs.map((tab) => {
                const active = activeSelector === tab

                return (
                    <button 
                        key={tab}
                        className={`px-5 py-2 rounded-lg capitalize transition-all cursor-pointer ${
                            active
                                ? "bg-cyan/10 text-cyan border border-cyan"
                                : "text-secondary-text"
                        }`}
                        onClick={() => changeActiveSelector(tab)}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>
    )
}

export default ContentSelector