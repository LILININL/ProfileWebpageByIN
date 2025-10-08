const textEncoder = new TextEncoder();

const subtleCrypto = globalThis.crypto?.subtle;

const bufferToHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

export async function hashPassword(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  if (!subtleCrypto) {
    return password;
  }

  const passwordBytes = textEncoder.encode(password);
  const hashBuffer = await subtleCrypto.digest("SHA-256", passwordBytes);
  return bufferToHex(hashBuffer);
}
