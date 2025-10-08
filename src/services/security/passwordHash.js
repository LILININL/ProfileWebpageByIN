const encoder = new TextEncoder();

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  if (!globalThis.crypto?.subtle) {
    console.warn(
      "[passwordHash] Web Crypto API not available; falling back to plain password."
    );
    return password;
  }

  const passwordBytes = encoder.encode(password);
  const hashBuffer = await globalThis.crypto.subtle.digest(
    "SHA-256",
    passwordBytes
  );

  return bufferToHex(hashBuffer);
}
