import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export async function login(req, res) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}