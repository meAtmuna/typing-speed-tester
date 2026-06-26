function ContentSelector({contentType, changeContentMode}) {
    const tabs = ["words", "paragraph", "story"]

    return(
        <div className="bg-card border border-border rounded-xl p-2.5 flex gap-4 mb-8 w-fit">
            {tabs.map((tab) => {
                const active = contentType === tab

                return (
                    <button 
                        key={tab}
                        className={`px-5 py-2 rounded-lg capitalize transition-all ${
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