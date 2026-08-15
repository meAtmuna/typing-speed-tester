function TimeSelector({timeLimit, changeTimeLimit, openCustomTimeModal}) {
    const timeOptions = [15, 30, 45, 60, 90, 120]
    const iscustomIime = !timeOptions.includes(timeLimit)

    return(
        <div className="flex items-center gap-3">
                {timeOptions.map((time) => (
                    <button
                        key={time}
                        onClick={() => changeTimeLimit(time)}
                        className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                            timeLimit === time
                                ? "bg-cyan/15 text-cyan"
                                : "text-secondary-text hover:text-cyan hover:bg-cyan/10"
                        }`}
                    >
                        {time}s
                    </button>
                ))}

                <button
                    className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                        iscustomIime
                        ? "bg-cyan/15 text-cyan"
                        : "text-secondary-text hover:text-cyan hover:bg-cyan/10" 
                    }`}
                    onClick={openCustomTimeModal}
                >
                    Custom
                </button>
            </div>
    )
}

export default TimeSelector