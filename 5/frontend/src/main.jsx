import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./style.css";
import "./i18n.js";

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
