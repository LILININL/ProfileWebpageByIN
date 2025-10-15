const encoder = new TextEncoder();

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashText(value, fieldLabel = "ข้อมูล") {
  if (typeof value !== "string") {
    throw new TypeError(`${fieldLabel} ต้องเป็นข้อความ`);
  }

  if (!globalThis.crypto?.subtle) {
    console.warn(
      "[passwordHash] Web Crypto API not available; falling back to plain text."
    );
    return value;
  }

  const bytes = encoder.encode(value);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return bufferToHex(hashBuffer);
}

export const hashPassword = (password) => hashText(password, "รหัสผ่าน");
