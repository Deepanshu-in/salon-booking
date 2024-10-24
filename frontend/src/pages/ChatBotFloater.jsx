import { useState, useContext } from "react";
import Lottie from "lottie-react";
import sanaAIanimation from "../assets/images/askSana.json";
import sanaLoadingAnimation from "../assets/images/chatBotLoading.json";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatBotFloater = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { user: userData } = useContext(authContext);

  const handleClick = () => {
    if (userData) {
      setIsClicked(true);
      setTimeout(() => {
        navigate("/sana");
      }, 1000);
    } else {
      toast.warning("Please Login to access SanaAI !", { autoClose: 3000 });
    }
  };

  return (
    <>
      <Tooltip title="Ask Sana AI" arrow>
        <div
          className="group fixed bottom-0 right-5 flex items-end justify-end w-[150px] h-24 cursor-pointer m-4"
          onClick={handleClick}
        >
          {!isClicked ? (
            <Lottie animationData={sanaAIanimation} loop={true} />
          ) : (
            <Lottie animationData={sanaLoadingAnimation} loop={true} />
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default ChatBotFloater;
