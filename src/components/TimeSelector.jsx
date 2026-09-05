function TimeSelector({timeLimit, changeTimeLimit, openCustomTimeModal}) {
    const timeOptions = [15, 30, 45, 60, 90, 120]
    const isCustomIime = !timeOptions.includes(timeLimit)

    return(
        <div className="flex items-center gap-1.5">
                {timeOptions.map((time) => (
                    <button
                        key={time}
                        onClick={() => changeTimeLimit(time)}
                        className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-md transition-all cursor-pointer ${
                            timeLimit === time
                                ? "text-primary-text bg-white/10"
                                : "text-secondary-text hover:text-primary-text hover:bg-white/5"
                        }`}
                    >
                        {timeLimit === time && (
                            <span className="absolute inset-0 rounded-md bg-white/5 animate-[fadeIn_0.15s_ease-out]" />
                        )}
                        <span className="relative z-10">{time}s</span>
                    </button>
                ))}

                <button
                    className={`relative font-medium duration-200 active:scale-95 px-4 py-2 rounded-md transition-all cursor-pointer ${
                        isCustomIime
                        ? "text-primary-text bg-white/10"
                        : "text-secondary-text hover:text-primary-text hover:bg-white/5" 
                    }`}
                    onClick={openCustomTimeModal}
                >
                    {isCustomIime && (
                    <span className="absolute inset-0 rounded-md bg-white/5 animate-[fadeIn_0.15s_ease-out]" />
                )}
                <span className="relative z-10">Custom</span>
                </button>
            </div>
    )
}

export default TimeSelector