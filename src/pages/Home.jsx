import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

function Home() {
    return (
        <div className="min-h-screen bg-app-bg text-primary-text">
            <div className="max-w-7xl mx-auto px-8">
                <Navbar />
                <Hero />
            </div>
        </div>
    )
}

export default Home