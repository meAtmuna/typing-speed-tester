import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function generateStory(type) {      
    const prompt = `
    Generate a ${type} story for typing practice.
    250-300 words, simple English, no headings.
    `
    
    try {
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"})
        const result = await model.generateContent(prompt)
        return result.response.text()

    } catch (error) {
        console.log("2.5 failed, trying 2.0...", error)

        try {
            const fallback = genAI.getGenerativeModel({model: "gemini-2.0-flash"})
            const result = await fallback.generateContent(prompt)
            return result.response.text()

        } catch (fallbackError) {
            console.log("2.0 also failed", fallbackError)
            throw new Error("All models failed")
        }
    }
}