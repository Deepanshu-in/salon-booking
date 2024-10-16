import express from "express";
import sanaAiController from "../Controllers/sanaAiController.js";
const router = express.Router();

// Integrate the controller to handle the POST request for generating AI responses
router.use("/", sanaAiController);

export default router;
