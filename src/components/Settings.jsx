import { X, Volume2, VolumeX, Settings2, Eye, EyeOff, TextCursorIcon, RectangleHorizontal, Minus, GripVertical, Minimize2, MinusIcon, } from "lucide-react"
import { Line } from "react-chartjs-2"

function Settings({closeSettings, soundEnabled, changeSoundEnabled, hideTimer, changeHideTimer, cursorStyle, changeCursorStyle}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm px-4">
            <div className="bg-card rounded-2xl w-full max-w-[650px] shadow-2xl overflow-hidden">
                <div className="flex justify-between items-start p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-blue-300 flex items-center justify-center">
                            <Settings2 size={20} className="text-white"/>
                        </div>

                        <div>
                            <h2 className="text-md font-bold text-primary-text">
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
                            <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${
                                soundEnabled
                                    ? "bg-blue-300 text-white"
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
                                    ? "bg-blue-300"
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
                            <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${
                                hideTimer
                                    ? "bg-blue-300 text-white"
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
                                ? "bg-blue-300"
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

                    <div className="border-t border-border my-5"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-blue-300 text-white flex items-center justify-center">
                                <TextCursorIcon size={20}/>
                            </div>

                            <div>
                                <p className="font-medium text-primary-text">
                                    Cursor Style
                                </p>

                                <p className="text-sm text-secondary-text mt-1">
                                    Choose your typing cursor
                                </p>
                            </div>
                        </div>

                        <div  className="gap-2 p-2 relative flex items-center rounded-full bg-secondary-text/10 overflow-hidden">
                            <div 
                                className={`w-[92px] absolute top-1.5 bottom-1.5 rounded-full bg-blue-300 transition-transform duration-300 ease-out ${
                                    cursorStyle === "block"
                                        ? "translate-x-0"
                                        : cursorStyle === "underline"
                                        ? "translate-x-[95px]"
                                        : "translate-x-[194px]"
                                }`} 
                            />
                            {[
                                {
                                    name: "block",
                                    label: "Block",
                                    icon: RectangleHorizontal
                                },
                                {
                                    name: "underline",
                                    label: "Underline",
                                    icon: Minus
                                },
                                {
                                    name: "bar",
                                    label: "Bar",
                                    icon: GripVertical
                                }
                            ].map(({ name, label, icon: Icon}) =>{
                                const active = cursorStyle === name
                                
                                return (
                                    <button
                                        key={name}
                                        onClick={() => changeCursorStyle(name)}
                                        className={`w-[90px] relative z-10 rounded-full flex items-center justify-center gap-1 py-1 text-sm font-medium transition-colors duration-300 cursor-pointer active:scale-95 ${
                                            active
                                                ? "text-white"
                                                : "text-secondary-text hover:text-primary-text"
                                        }`}
                                    >
                                        <span>
                                            {label}
                                        </span>
                                        <Icon size={16} />
                                    </button>
                                )
                            })}
                        </div>
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