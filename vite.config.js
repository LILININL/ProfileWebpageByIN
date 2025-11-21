import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const { version: packageVersion } = require("./package.json");
const { env } = require("process");

const getGitVersion = () => {
  try {
    const tag = execSync("git describe --tags --abbrev=0", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (tag) return tag;
  } catch {
    console.warn("No git tags found.");
  }

  try {
    return execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    console.warn("No git commit hash found.");
    return null;
  }
};

const resolvedVersion =
  env.VITE_APP_VERSION ?? getGitVersion() ?? packageVersion;

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(resolvedVersion),
  },
});
