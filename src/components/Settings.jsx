import { X, Volume2, VolumeX, Settings2, Eye, EyeOff } from "lucide-react"

function Settings({closeSettings, soundEnabled, changeSoundEnabled, hideTimer, changeHideTimer}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm px-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden">
                <div className="flex justify-between items-start p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                            <Settings2 size={20} className="text-cyan"/>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-primary-text">
                                Settings
                            </h2>
                            <p className="text-secondary-text text-sm mt-1">
                                Customize your typing experience
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={closeSettings}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-secondary-text hover:text-primary-text hover:bg-white/5 cursor-pointer transition-all"
                        aria-label="Close settings"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                soundEnabled
                                    ? "bg-cyan/10 text-cyan"
                                    : "bg-secondary-text/10 text-secondary-text"
                            }`}
                            >
                                {soundEnabled ? (
                                    <Volume2 size={20} />
                                ) : (
                                    <VolumeX size={20} />
                                )}
                            </div>

                            <div>
                                <p className="font-medium text-primary-text">
                                    Typing Sound
                                </p>

                                <p className="text-sm text-secondary-text mt-1">
                                    {soundEnabled
                                        ? "Sound is enabled"
                                        : "Sound is disabled"
                                    }
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => changeSoundEnabled(!soundEnabled)}
                            className={`relative w-12 h-6 rounded-full transition-all cursor-pointer duration-300 ${
                                soundEnabled
                                    ? "bg-cyan"
                                    : "bg-secondary-text/30"
                            }`}
                            aria-label="Toggle typing sound"    
                        >
                            <div
                                className={` absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md duration-300 ${
                                    soundEnabled
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            >
                            </div>
                        </button>
                    </div>
                
                    <div className="border-t border-border my-5"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                hideTimer
                                    ? "bg-cyan/10 text-cyan"
                                    : "bg-secondary-text/10 text-secondary-text"
                                }`}
                            >
                                {hideTimer ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </div>

                            <div>
                                <p className="font-medium text-primary-text">
                                    Hide Timer
                                </p>

                                <p className="text-sm text-secondary-text mt-1">
                                    {hideTimer
                                        ? "Timer will be hidden while typing"
                                        : "Timer is visible while typing"
                                    }
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => changeHideTimer(!hideTimer)}
                            className={`relative w-12 h-6 rounded-full transition-all cursor-pointer duration-300 ${
                                hideTimer
                                ? "bg-cyan"
                                    : "bg-secondary-text/30"
                                }`}
                            aria-label="Toggle hide timer"    
                            >
                            <div
                                className={` absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md duration-300 ${
                                    hideTimer
                                    ? "translate-x-7"
                                    : "translate-x-1"
                                }`}
                                >
                            </div>
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border bg-black/5">
                    <p className="text-xs text-secondary-text">
                        Your settings are saved automatically.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Settings