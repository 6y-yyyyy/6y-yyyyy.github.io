import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./challenge.css";
import "./challenge-theme.css";
import "./features.css";
import "./training.css";
import "./training-judgment.css";
import "./memory.css";
import "./dashboard-fix.css";
import "./flip-card.css";
import "./card-content.css";
import "./workflow.css";
import "./reference-answer.css";
import "./memory-detail.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
