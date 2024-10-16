import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY; // Make sure this key is set in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { history, message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: req.body.history,
    });
    const msg = req.body.message;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
