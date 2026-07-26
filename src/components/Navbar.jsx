import { sign } from "chart.js/helpers"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6">
            <Link to="/"
                  className="flex items-center gap-2"
            >
                <i className="fa-solid fa-keyboard text-cyan text-3xl"></i>

                <h1 className="text-3xl font-bold">
                    Type<span className="text-cyan"> Fast</span>    
                </h1>
            </Link>

            <div className="flex items-center gap-8">
                <a 
                    href="#about"
                    className="text-secondary-text hover:text-cyan transition-all"
                >
                    About
                </a>

                <a 
                    href="#contact"
                    className="text-secondary-text hover:text-cyan transition-all"
                >
                    contact
                </a>
            </div>

            <div className="flex gap-3">
                <Link
                    to="/login" 
                    className="border border-cyan px-5 py-2 rounded-lg text-primary-text hover:bg-cyan/10 cursor-pointer transition-all"
                >
                    Login
                </Link>
                <Link 
                    to="/signup"
                    className="bg-cyan text-app-bg font-semibold px-5 py-2 rounded-lg hover:opacity-90 cursor-pointer transition-all"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    )
}

export default Navbar