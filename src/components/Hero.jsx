import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"

const previewText = "The quick brown fox jumps over the lazy dog. Improve your typing speed with AI stories, paragraphs and random words."

function Hero() {
    const [typedCount, setTypedCount] = useState (0)

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

            pos++
            setTypedCount(pos)
            timeout =setTimeout(type, 60)
        }
        
        timeout = setTimeout(type, 500)

        return () => clearInterval(timeout)
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
                    <Link
                        to="#" 
                        className="border border-border px-8 py-4 rounded-xl hover:border-cyan transition-all cursor-pointer flex items-center gap-2"
                    >
                        <i className="fa-brands fa-github"></i>
                        GitHub
                    </Link>
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
                            className = "bg-cyan text-app-bg rounded"
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
                <div className="flex justify-between mt-8">
                    <div>
                        <h3 className="text-cyan text-3xl font-bold">
                            120+
                        </h3>
                        <p className="text-secondary-text">
                            WPM
                        </p>
                    </div>
                    <div>
                        <h3 className="text-cyan text-3xl font-bold">
                            99%
                        </h3>
                        <p className="text-secondary-text">
                            Accuracy
                        </p>
                    </div>
                    <div>
                        <h3 className="text-cyan text-3xl font-bold">
                            AI
                        </h3>
                        <p className="text-secondary-text">
                            Stories
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero