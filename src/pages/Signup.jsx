import { Link } from "react-router-dom"

function Signup() {
    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-6">
            <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-cyan">
                    Create Account
                </h1>
                <p className="text-secondary-text text-center  mt-2 mb-5">
                    Join TypeFast and start improving your typing today
                </p>

                <form className="space-y-5">
                     <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Full Name
                        </label>

                        <input 
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Email
                        </label>

                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Password
                        </label>

                        <input 
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Confirm Password
                        </label>
                        <input 
                                type="password"
                                placeholder="Confirm password"
                                className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan"
                        />
                    </div>
                    <button className="w-full bg-cyan text-app-bg font-semibold py-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02]">
                        Create Account
                    </button>
                </form>

                <div className="flex items-center gap-4 my-7">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-secondary-text">
                        OR
                    </span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>
                <button className="w-full border-border bg-transparent py-3 rounded-xl text-primary-text hover:border-cyan hover:bg-cyan/10 transition-all cursor-pointer">
                        Continue with Google
                </button>
                <p className="text-center mt-8 text-secondary-text">
                    Already have an account
                    <Link 
                        to="/login"
                        className="text-cyan ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup