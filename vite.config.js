import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve("certs/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve("certs/localhost-cert.pem")),
    },
    host: "0.0.0.0",
  },
});
