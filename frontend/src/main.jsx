import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Analytics />
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
        <ScrollToTop />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
