import User from "../models/User.js";
import bcrypt from "bcryptjs"

export async function signup(req, res) {
    try {
        const {name, email, password} = req.body

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const newUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}