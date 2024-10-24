import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authContext } from "../context/AuthContext";
const SanaAI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  // Get the fine-tuned model
  const model = genAI.getGenerativeModel({
    model: "tunedModels/stylesatease-2hod67psk7ix",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // Function to handle user input
  const handleUserInput = (value) => {
    setUserInput(value);
  };

  // Function to send the message and get a response
  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;

    try {
      // Create a chat session for the model
      const chatSession = model.startChat({
        generationConfig,
        history: chatHistory.map((elt) => ({
          role: elt.type === "user" ? "user" : "model", // Adjust the role according to the user or model
          parts: [{ text: elt.message }], // Wrap the message in parts array
        })),
      });

      const result = await chatSession.sendMessage(messageText);

      // Accessing the response correctly
      const candidates = result.response?.candidates || [];
      if (candidates.length > 0) {
        const contentParts = candidates[0].content?.parts || [];
        const text = contentParts.map((part) => part.text).join(""); // Fetch the response text from parts
        setChatHistory((prev) => [
          ...prev,
          { type: "user", message: messageText },
          { type: "bot", message: text },
        ]);
      } else {
        console.error("No candidates found in response:", result);
      }

      setUserInput("");
    } catch (e) {
      console.error("Error occurred while fetching", e);
    }
  };

  return (
    <div className="p-4 h-[700px]">
      <MainContainer className="rounded-md">
        <ChatContainer className="pt-2">
          <MessageList>
            {chatHistory.map((elt, i) => (
              <Message
                key={i}
                model={{
                  message: elt.message,
                  sender: elt.type,
                  sentTime: "just now",
                  direction: elt.type === "user" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={userInput}
            onChange={(value) => handleUserInput(value)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default SanaAI;
