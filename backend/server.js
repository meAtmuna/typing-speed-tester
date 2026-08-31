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
app.get("/", (req, res) => {
    res.send("typing speed tester backend runnig")
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")

        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed")
        console.error(error.message)
    })