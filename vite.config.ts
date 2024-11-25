import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react-dom", "react"],
          zod: ["zod"],

          telegram: ["@telegram-apps/sdk-react"],

          other: ["class-variance-authority", "tailwind-merge", "clsx", "big.js"],
          radix: ["@radix-ui/react-slot", "@radix-ui/react-tabs"],
          reatom: ["@reatom/npm-react", "@reatom/framework"],

          evaa: ["@evaafi/sdk"],
          ton: ["@ton/ton"],
        },
      },
    },

    sourcemap: false,
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
  },

  plugins: [react(), svgr(), nodePolyfills({ include: ["buffer"], globals: { Buffer: true } })],
});
