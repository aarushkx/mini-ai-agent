import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../constants.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
});

const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.2,
    responseMimeType: "application/json",
};

async function generateResponse(messages) {
    const result = await model.generateContent({
        contents: messages,
        generationConfig: generationConfig,
    });
    return result.response.text();
}

export { generateResponse };
