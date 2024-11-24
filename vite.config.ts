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
          buffer: ["buffer"],
          zod: ["zod"],

          other: ["class-variance-authority", "tailwind-merge", "clsx"],
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

  plugins: [react(), svgr(), nodePolyfills({ include: ["buffer"], globals: { Buffer: true } })],
});
