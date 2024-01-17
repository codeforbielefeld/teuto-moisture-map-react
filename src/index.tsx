import "./index.css";
import App from "./App";
import { initializeIcons } from "@fluentui/react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

initializeIcons();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
