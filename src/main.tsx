import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root should exist");
}

createRoot(root).render(<StrictMode>{null}</StrictMode>);
