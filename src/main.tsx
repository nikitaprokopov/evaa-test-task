import { createRoot } from "react-dom/client";

import { initTelegramApp } from "./libs/telegram-app";

import "./index.css";

import { App } from "./app";

await initTelegramApp();

const root = document.getElementById("root");

if (!root) {
  throw new Error("root should exist");
}

createRoot(root).render(<App />);
