import { useCallback, useEffect, useState } from "react";
import {
  clearStoredAuth,
  readStoredAuth,
  writeStoredAuth,
} from "../services/auth/authStorage.js";

let currentAuth = readStoredAuth();
const listeners = new Set();
let hasStorageListener = false;

function notifySubscribers() {
  for (const listener of listeners) {
    listener(currentAuth);
  }
}

function updateAuth(user, remember = false) {
  if (!user) {
    clearStoredAuth();
  } else {
    writeStoredAuth(user, remember);
  }
  currentAuth = user;
  notifySubscribers();
}

function ensureStorageListener() {
  if (typeof window === "undefined" || hasStorageListener) {
    return;
  }
  const handle = () => {
    currentAuth = readStoredAuth();
    notifySubscribers();
  };
  window.addEventListener("storage", handle);
  hasStorageListener = true;
}

export function useStoredAuth() {
  const [authUser, setAuthUserState] = useState(currentAuth);

  useEffect(() => {
    ensureStorageListener();
    const listener = (value) => setAuthUserState(value);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setAuthUser = useCallback((user, remember = false) => {
    updateAuth(user, remember);
  }, []);

  const clearAuth = useCallback(() => {
    updateAuth(null);
  }, []);

  return { authUser, setAuthUser, clearAuth };
}
