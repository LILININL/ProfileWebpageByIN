/* global __APP_VERSION__ */

// Provide a single source of truth for the app version.
// Prefer the CI-provided VITE_APP_VERSION; fall back to the build-time constant.
export const appVersion =
  import.meta.env?.VITE_APP_VERSION ??
  (typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev");
