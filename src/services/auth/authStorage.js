const SESSION_KEY = "lin.auth.session";
const COOKIE_KEY = "lin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

const safeParse = (value) => {
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export function readSessionStorage() {
  if (!isBrowser) {
    return null;
  }
  return safeParse(sessionStorage.getItem(SESSION_KEY));
}

export function writeSessionStorage(data) {
  if (!isBrowser) {
    return;
  }
  if (!data) {
    sessionStorage.removeItem(SESSION_KEY);
    return;
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function readCookie() {
  if (!isBrowser) {
    return null;
  }
  const cookies =
    document.cookie?.split(";").map((entry) => entry.trim()) ?? [];
  const target = cookies.find((entry) => entry.startsWith(`${COOKIE_KEY}=`));
  if (!target) {
    return null;
  }
  const raw = decodeURIComponent(target.slice(COOKIE_KEY.length + 1));
  return safeParse(raw);
}

export function writeCookie(data) {
  if (!isBrowser) {
    return;
  }
  if (!data) {
    document.cookie = `${COOKIE_KEY}=; Max-Age=0; Path=/`;
    return;
  }
  const encoded = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${COOKIE_KEY}=${encoded}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function readStoredAuth() {
  return readSessionStorage() ?? readCookie();
}

export function writeStoredAuth(data, remember = false) {
  if (!data) {
    writeSessionStorage(null);
    writeCookie(null);
    return;
  }

  if (remember) {
    writeCookie(data);
    writeSessionStorage(null);
  } else {
    writeSessionStorage(data);
    writeCookie(null);
  }
}

export function clearStoredAuth() {
  writeStoredAuth(null);
}
