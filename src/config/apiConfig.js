const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ??
  "https://fristgoapi-652162254402.us-central1.run.app";

const rawBasePathApi = import.meta.env.VITE_BASE_PATH_API ?? "/auth";

const normalizeApiBaseUrl = (url) => {
  const trimmed = String(url).trim().replace(/\/+$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl);

const ensureLeadingSlash = rawBasePathApi.startsWith("/")
  ? rawBasePathApi
  : `/${rawBasePathApi}`;

export const BASE_PATH_API =
  ensureLeadingSlash.length > 1 && ensureLeadingSlash.endsWith("/")
    ? ensureLeadingSlash.slice(0, -1)
    : ensureLeadingSlash;

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${BASE_PATH_API}${normalizedPath}`;
};

export const API_PATHS = Object.freeze({
  login: "/login",
  register: "/register",
  changePassword: "/change-password",
});
