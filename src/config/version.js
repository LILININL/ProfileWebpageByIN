export const appVersion =
  import.meta.env?.VITE_APP_VERSION ??
  (typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev");
