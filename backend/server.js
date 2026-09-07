import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "https://type-fast-one.vercel.app"
]
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true
    })
)

app.use(express.json())
app.use("/api/auth", authRoutes)
app.get("/", (req, res) => {
    res.send("typing speed tester backend runnig")
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")

        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed")
        console.error(error.message)
    })