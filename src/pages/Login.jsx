import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const googleButtonRef = useRef(null)

    useEffect(() => {
        const renderGoogleButton = () => {
            if (!window.google || !googleButtonRef.current) return

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

                callback: async (response) => {
                    try {
                        setLoading(true)
                        setErrorMessage("")

                        const res = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/auth/google`,
                            {
                                credential: response.credential
                            }
                        )

                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem(
                            "user",
                            JSON.stringify(res.data.user)
                        )

                        navigate("/typing-test")
                    } catch (error) {
                        setErrorMessage(
                            error.response?.data?.message || "Google login failed"
                        )
                    } finally {
                        setLoading(false)
                    }
                }
            })

            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    text: "continue_with",
                    shape: "rectangular",
                    width: 400
                }
            )
        }

        if (window.google) {
            renderGoogleButton()
        } else {
            const interval = setInterval(() => {
                if (window.google) {
                    clearInterval(interval)
                    renderGoogleButton()
                }
            },  100)

            return ()=> clearInterval(interval)
        }
    } , [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        setErrorMessage("")
        setLoading(true)

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
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
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-300 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-secondary-text text-center mt-3 text-sm">
                        Login to continue your typing journey
                    </p>
                </div>

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
                        <label className="block mb-3 text-primary-text font-medium text-sm">
                            Email
                        </label>

                        <input 
                            type="email"                            
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-0 py-3 rounded-none bg-transparent border-0 border-b border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white" 
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-primary-text font-medium text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-0 py-3 rounded-none bg-transparent border-0 border-b border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white" 
                            />

                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary-text transition cursor-pointer"
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
                    <div className="flex justify-between items-center pt-1">
                        <label className="flex items-center gap-2 text-secondary-text text-sm cursor-pointer">
                            <input 
                                type="checkbox"
                                className="text-blue-300 w-4 h-4 cursor-pointer"
                            />
                            Remember me
                        </label>
                        <button 
                            type="button"
                            className="text-blue-300 hover:text-white transition cursor-pointer"
                        >
                            Forgot Password
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading} 
                        className="w-full bg-blue-300 text-app-bg font-semibold py-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                {/* <button className="w-full border-border bg-transparent py-3 rounded-xl text-primary-text hover:border-cyan hover:bg-cyan/10 transition-all cursor-pointer flex items-center justify-center gap-3">
                    <i className="fa-brands fa-google text-lg text-cyan"></i>
                    Continue with Google
                </button> */}
                <div
                    ref={googleButtonRef}
                    className="w-full flex justify-center"
                />
                <p className="text-center mt-8 text-secondary-text">
                    Don't have an account
                    <Link 
                        to="/signup"
                        className="text-blue-300 ml-2 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login