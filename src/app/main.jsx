import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App.jsx";
import { initWebPDetection } from "../utils/webp";

// Initialize WebP detection early, before React renders
initWebPDetection();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
