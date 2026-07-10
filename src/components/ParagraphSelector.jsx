function ParagraphSelector({paragraphDifficulty, changeParagraphDifficulty}) {
    const difficulties = ["easy", "medium", "hard"]

    return (
        <div className="flex gap-3">
            {difficulties.map((level) => {
                const active = paragraphDifficulty === level

                return (
                    <button
                        className={`px-4 py-2 rounded-lg transition-all capitalize cursor-pointer ${
                            active
                                ? "bg-cyan/15 text-cyan"
                                : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                        }`} 
                        key={level}
                        onClick={() => changeParagraphDifficulty(level)}
                    >
                        {level}
                    </button>
                )
            })}
        </div>
    )
}

export default ParagraphSelector