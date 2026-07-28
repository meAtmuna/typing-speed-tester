import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("typing speed tester backend running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})