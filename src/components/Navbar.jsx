import { sign } from "chart.js/helpers"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6">
            <Link to="/"
                  className="flex items-center gap-2"
            >
                <i className="fa-solid fa-keyboard text-blue-300 text-3xl"></i>

                <h1 className="text-3xl font-bold">
                    Type<span className="text-blue-300"> Fast</span>    
                </h1>
            </Link>

            {/* <div className="flex items-center gap-8">
                <a 
                    href="#about"
                    className="text-secondary-text hover:text-bluebg-blue-300 transition-all"
                >
                    About
                </a>

                <a 
                    href="#contact"
                    className="text-secondary-text hover:text-bluebg-blue-300 transition-all"
                >
                    contact
                </a>
            </div> */}

            <div className="flex gap-3">
                <Link
                    to="/login" 
                    className="bg-blue-300 font font-semibold px-4 py-2 rounded-md text-primary-text hover:opacity-90 cursor-pointer transition-all"
                >
                    Login
                </Link>
                <Link 
                    to="/signup"
                    className="bg-blue-300 font-semibold px-4 py-2 rounded-md hover:opacity-90 cursor-pointer transition-all"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    )
}

export default Navbar