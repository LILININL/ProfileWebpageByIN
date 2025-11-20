const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "why.whylin.xyz";

const rawBasePathApi = import.meta.env.VITE_BASE_PATH_API ?? "/auth";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

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
