function Settings({closeSettings, soundEnabled, changeSoundEnabled}) {
    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-2xl p-6 w-[420px]">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold">
                            Settings
                        </h2>
                        <p className="text-secondary-text text-sm mt-1">
                            Customize your typing experience
                        </p>
                    </div>

                    <button 
                        onClick={closeSettings}
                        className="text-secondary-text hover:text-cyan text-xl cursor-pointer"
                    >
                        X
                    </button>
                </div>

                <div className="border-t border-border mt-6 pt-5">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="font-medium text-primary-text">
                                Typing Sound
                            </p>

                            <p className="text-sm text-secondary-text mt-1">
                                Play sound while typing
                            </p>
                        </div>

                        <button 
                            onClick={() => changeSoundEnabled(!soundEnabled)}
                            className={`w-1/2 h-6 rounded-full pt-1 transition-all cursor-pointer ${
                                soundEnabled
                                    ? "bg-cyan"
                                    : "bg-secondary-text/30"
                            }`}    
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transition-all ${
                                    soundEnabled
                                        ? "translate-x-41"
                                        : "translate-x-0"
                                }`}
                            >
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings