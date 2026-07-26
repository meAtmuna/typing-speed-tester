import { Link } from "react-router-dom"

function Hero() {
    return (
        <section className="grid lg:grid-cols-2 items-center gap-16 py-24">
            <div>
                <p className="text cyan font-semibold mb-4">
                    Improve Faster
                </p>

                <h1 className="text-6xl font-bold leading-tight">
                    Improve Your
                    <br />
                    <span className="text-cyan">Typing Skills</span>
                </h1>

                <p className="text-secondary-text text-lg mt-6 leading-8 max-w-xl">
                    Practice typing with random words, paragraphs,
                    local stories and AI generated stories while
                    tracking your speed, accuracy and mistakes.
                </p>

                <div className="flex gap-4 mt-10">
                    <Link 
                        to="/typing-test"
                        className="bg-cyan text-app-bg px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all"
                    >
                        Start Typing
                    </Link>
                    <button className="border border-border px-8 py-4 rounded-xl hover:border-cyan transition-all cursor-pointer">
                        GitHub
                    </button>
                </div>
            </div>

            <div className="bg-card border-border rounded-3xl p-8">
                <p className="text-secondary-text mb-4">
                    Preview
                </p>
                <div className="bg-typing rounded-xl p-6 text-xl leading-10 text-secondary-text">
                    The quick brown fox jumps over the lazy dog.
                    Improve your typing speed wiht AI stories,
                    pargraphs and random words.
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