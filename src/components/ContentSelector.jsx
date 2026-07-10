function ContentSelector({contentType, changeContentMode}) {
    const tabs = ["words", "paragraph", "story"]

    return(
        <div className="flex gap-4">
            {tabs.map((tab) => {
                const active = contentType === tab

                return (
                    <button 
                        key={tab}
                        className={`px-5 py-2 rounded-lg capitalize transition-all cursor-pointer ${
                            active
                            ? "bg-cyan/10 text-cyan border border-cyan"
                            : "text-secondary-text"
                        }`}
                        onClick={() => changeContentMode(tab)}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>
    )
}

export default ContentSelector