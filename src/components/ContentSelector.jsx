function ContentSelector({contentType, changeContentMode}) {
    return(
        <div className="flex justify-center gap-4 mb-8">
            <button
                className={`px-4 py-2 rounded ${
                    contentType === "words"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-800 text-white"
                }`}
                onClick={() => changeContentMode("words")}
            >
                Words
            </button>
            <button
                className={`px-4 py-2 rounded ${
                    contentType === "paragraph"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-800 text-white"
                }`} 
                onClick={() => changeContentMode("paragraph")}
            >
                Paragraph
            </button>
            <button
                className={`px-4 py-2 rounded ${
                    contentType === "story"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-800 text-white" 
                }`}
                onClick={() => changeContentMode("story")}
            >
                Story
            </button>
        </div>
    )
}

export default ContentSelector