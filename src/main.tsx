import { createRoot } from "react-dom/client";

import { App } from "./app";

import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root should exist");
}

createRoot(root).render(<App />);
