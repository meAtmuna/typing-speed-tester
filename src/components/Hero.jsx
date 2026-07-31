import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"

const previewText = "The quick brown fox jumps over the lazy dog. Improve your typing speed with AI stories, paragraphs and random words."

function Hero() {
    const [typedCount, setTypedCount] = useState (0)
    const previewWPM = Math.min(Math.floor(typedCount * 1.2), 135)

    useEffect(() => {
        let pos =0
        let timeout
        
        function type() {
            if (pos >= previewText.length ) {
                timeout = setTimeout(() => {
                    pos = 0
                    setTypedCount(0)
                    
                    timeout = setTimeout(type, 500)
                }, 1500);
                
                return
            }
            
            const currentChar = previewText[pos]
            
            const delay = previewText[pos] === " "
            ? 220
            : 90 + Math.random() * 80
            
            pos++
            setTypedCount(pos)
            timeout = setTimeout(type, delay)
        }
        
        timeout = setTimeout(type, 500)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <section className="grid lg:grid-cols-2 items-center gap-16 py-24">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan border border-cyan/30 mb-6">
                    <Zap size={14} />
                    <span className="text-cyan text-sm font-semibold uppercase tracking-wide">Improve Faster</span>
                </div>

                <h1 className="text-6xl font-bold leading-[1.1]">
                    Improve Your
                    <br />
                    <span className="text-cyan">Typing Skills</span>
                </h1>

                <p className="text-secondary-text text-lg mt-6 leading-8 max-w-xl">
                    Practice with random words, paragraphs,
                    local stories and AI-generated stories while
                    tracking your speed, accuracy and mistakes.
                </p>

                <div className="flex gap-4 mt-10">
                    <Link 
                        to="/typing-test"
                        className="bg-cyan text-app-bg px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-1 duration-300 shadow-lg"
                    >
                        Start Typing
                    </Link>
                    <a
                        href="https://github.com/meAtmuna/typing-speed-tester"
                        target="blank"
                        rel="noopener noreferrer" 
                        className="border border-border px-8 py-4 rounded-xl hover:border-cyan transition-all cursor-pointer flex items-center gap-2"
                    >
                        <i className="fa-brands fa-github"></i>
                        GitHub
                    </a>
                </div>

                <div className="flex gap-10 mt-12">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-green-400"></i>
                        <span className="text-secondary-text">
                            Free 
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-green-400"></i>
                        <span className="text-secondary-text">
                            No signup needed 
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-green-400"></i>
                        <span className="text-secondary-text">
                            AI Stories
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-secondary-text uppercase tracking-widest text-xs">
                        Live Preview
                    </p>

                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <div className="bg-typing border border-border rounded-xl p-6 text-xl leading-10 font-mono min-h-[130px]">
                    {previewText.split("").map((char, index) => {
                        let className =  "text-untyped"
                        if (index < typedCount) {
                            className =  "text-correct"
                        }
                        else if (index === typedCount) {
                            className = "bg-cyan text-app-bg rounded animate-pulse"
                        }

                        return (
                            <span 
                                key={index}
                                className={className}
                            >
                                {char}
                            </span>
                        )
                    })}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-typing border border-border rounded-xl p-4 text-center">
                        <p className="text-wpm text-2xl font-bold font-mono">
                            {previewWPM}
                        </p>
                        <p className="text-muted-text text-xs uppercase tracking-wider mt-1">
                            WPM
                        </p>
                    </div>
                    <div className="bg-typing border border-border rounded-xl p-4 text-center">
                        <p className="text-accuracy text-2xl font-bold font-mono">
                            100%
                        </p>
                        <p className="text-muted-text text-xs uppercase tracking-wider mt-1">
                            Accuracy
                        </p>
                    </div>
                    <div className="bg-typing border border-border rounded-xl p-4 text-center">
                        <p className="text-cyan text-2xl font-bold font-mono">
                            AI
                        </p>
                        <p className="text-muted-text text-xs uppercase tracking-wider mt-1">
                            Stories
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero