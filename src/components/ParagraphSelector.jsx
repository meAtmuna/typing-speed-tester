function ParagraphSelector({paragraphDifficulty, changeParagraphDifficulty}) {
    const difficulties = ["easy", "medium", "hard"]

    return (
        <div className="flex gap-1.5 items-center">
            {difficulties.map((level) => {
                const active = paragraphDifficulty === level

                return (
                    <button
                        className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-lg transition-all capitalize cursor-pointer ${
                            active
                                ? "text-cyan"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                        }`} 
                        key={level}
                        onClick={() => changeParagraphDifficulty(level)}
                    >
                        {active && (
                            <span className="absolute inset-0 rounded-lg bg-cyan/10 animate-[fadeIn_0.15s_ease-out]" />
                        )}
                        <span className="relative z-10">
                            {level}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export default ParagraphSelector