import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ColorContext from "./context/ColorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorContext>
      <App />
    </ColorContext>
  </StrictMode>
);
