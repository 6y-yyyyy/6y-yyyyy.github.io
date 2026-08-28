import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./challenge.css";
import "./challenge-theme.css";
import "./features.css";
import "./memory.css";
import "./dashboard-fix.css";
import "./card-content.css";
import "./workflow.css";
import "./dashboard-layout.css";
import "./memory-detail.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
