import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import sanaAIanimation from "../assets/images/askSana.json";
import sanaLoadingAnimation from "../assets/images/chatBotLoading.json";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatBotFloater = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/sana");
    }, 1000);
  };

  return (
    <Tooltip title="Ask Sana AI" arrow>
      <div
        className="group fixed bottom-0 right-5 flex items-end justify-end w-[150px] h-24 cursor-pointer m-4"
        onClick={handleClick}
      >
        {!isClicked ? (
          <Lottie animationData={sanaAIanimation} loop={true} />
        ) : (
          <Lottie animationData={sanaLoadingAnimation} loop={false} />
        )}
      </div>
    </Tooltip>
  );
};

export default ChatBotFloater;
