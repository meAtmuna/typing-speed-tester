import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import TypingTest from "./pages/TypingTest"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/typing-test" element={<TypingTest/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
