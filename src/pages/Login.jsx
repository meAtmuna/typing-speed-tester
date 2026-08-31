import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()

        setErrorMessage("")
        setLoading(true)

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate("/typing-test")

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-app-bg flex items-center justify-center px-6">
            <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-cyan">
                    Welcome Back
                </h1>
                <p className="text-secondary-text text-center mt-2 mb-5">
                    Login to continue your typing journey
                </p>

                <form
                    onSubmit={handleLogin} 
                    className="space-y-5"
                >
                    {errorMessage && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {errorMessage}
                        </p>
                    )}
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Email
                        </label>

                        <input 
                            type="email"                            
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-cyan" 
                            />

                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-cyan transition cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 text-primary-text cursor-pointer">
                            <input 
                                type="checkbox"
                                className="accent-cyan w-4 h-4"
                            />
                            Remember me
                        </label>
                        <button 
                            type="button"
                            className="text-cyan hover:text-white transition cursor-pointer"
                        >
                            Forgot Password
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading} 
                        className="w-full bg-cyan text-app-bg font-semibold py-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-7">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-secondary-text">
                        OR
                    </span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>
                <button className="w-full border-border bg-transparent py-3 rounded-xl text-primary-text hover:border-cyan hover:bg-cyan/10 transition-all cursor-pointer flex items-center justify-center gap-3">
                    <i className="fa-brands fa-google text-lg text-cyan"></i>
                    Continue with Google
                </button>
                <p className="text-center mt-8 text-secondary-text">
                    Don't have an account
                    <Link 
                        to="/signup"
                        className="text-cyan ml-2 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login