import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { BackgroundLines } from "./components/background-lines.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BackgroundLines className="bg-black">
        <App />
      </BackgroundLines>
    </BrowserRouter>
  </StrictMode>
);
