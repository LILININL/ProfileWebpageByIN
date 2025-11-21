import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version: packageVersion } = require("./package.json");
const { env } = require("process");

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION ?? packageVersion),
  },
});
