import { X, Volume2, VolumeX, Settings2, Eye, EyeOff, TextCursorIcon, RectangleHorizontal, Minus, GripVertical, } from "lucide-react"
import { Line } from "react-chartjs-2"

function Settings({closeSettings, soundEnabled, changeSoundEnabled, hideTimer, changeHideTimer, cursorStyle, changeCursorStyle}) {
    return (
            <div className="fixed inset-0 z-50 bg-black text-primary-text px-8 py-10 overflow-hidden">
                <div className="flex justify-between items-center pb-6 border-b-2 border-white">
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

                <div className="max-w-6xl mx-auto py-10">
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
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                soundEnabled
                                    ? "bg-blue-300 text-white"
                                    : "bg-secondary-text/10 text-secondary-text hover:bg-secondary-text/20"
                            }`}    
                        >
                            {soundEnabled ? "ON" : "OFF"}
                        </button>
                    </div>
                
                    <div className="border-t border-white my-5"></div>

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
                            className={`px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                                hideTimer
                                ? "bg-blue-300 text-white"
                                    : "bg-secondary-text/10 text-secondary-text hover:bg-secondary-text/20"
                                }`}
                            >
                                {hideTimer ? "ON" : "OFF"}
                        </button>
                    </div>

                    <div className="border-t border-white my-5"></div>

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

                        <div  className="gap-1 p-1 relative flex items-center rounded-lg bg-secondary-text/10 overflow-hidden">
                            <div 
                                className={`w-[92px] absolute top-1 bottom-1 rounded-md bg-blue-300 transition-transform duration-200 ease-out ${
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
                                        className={`w-[90px] relative z-10 rounded-md flex items-center justify-center gap-2 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
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

                <div className="px-6 py-3 border-t-2 border-white">
                    <p className="text-xs text-secondary-text">
                        Your settings are saved automatically.
                    </p>
                </div>
            </div>
    )
}

export default Settings