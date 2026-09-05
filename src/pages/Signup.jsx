import { Link, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const googleButtonRef = useRef(null)
    
    useEffect(() => {
        const  renderGoogleButton = () => {
            if (!window.google || !googleButtonRef.current) return

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

                callback: async (response) => {
                    try {
                        setLoading(true)
                        setErrorMessage("")

                        const res = await axios.post(
                            "http://localhost:5000/api/auth/google",
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

    const handleSignup = async (e) => {
        e.preventDefault()

        setErrorMessage("")

        if (password !== confirmPassword) {
            setErrorMessage("passwords do not match")
            return
        }

        setLoading(true)

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                    name,
                    email,
                    password
                }
            )

            console.log(res.data);
            navigate("/login")

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-card flex items-center justify-center px-6">
            <div className="bg-app-bg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-300">
                    Create Account
                </h1>
                <p className="text-secondary-text text-center  mt-2 mb-5">
                    Join TypeFast and start improving your typing today
                </p>

                <form
                    onSubmit={handleSignup} 
                    className="space-y-5"
                >
                    {errorMessage && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {errorMessage}
                        </p>
                    )}

                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Full Name
                        </label>

                        <input 
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Email
                        </label>

                        <input 
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white" 
                            />

                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-white transition cursor-pointer"
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
                    <div>
                        <label className="block mb-2 text-primary-text font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-typing border border-border text-primary-text placeholder:text-muted-text outline-none transition-all focus:border-white"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-white transition cursor-pointer"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-300 text-app-bg font-semibold py-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-7">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-secondary-text">
                        OR
                    </span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>
                <div
                    ref={googleButtonRef}
                    className="w-full flex justify-center"
                />
                {/* <button className="w-full border-border bg-transparent py-3 rounded-xl text-primary-text hover:border-cyan hover:bg-cyan/10 transition-all cursor-pointer flex items-center justify-center gap-3">
                    <i className="fa-brands fa-google text-lg text-cyan"></i>
                    Continue with Google
                </button> */}
                <p className="text-center mt-8 text-secondary-text">
                    Already have an account
                    <Link 
                        to="/login"
                        className="text-blue-300 ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup