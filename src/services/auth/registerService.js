import { buildApiUrl } from "../../config/apiConfig.js";
import { hashPassword } from "../security/passwordHash.js";

export async function registerWithCredentials({ name, email, password }) {
  const passwordDigest = await hashPassword(password);

  const response = await fetch(buildApiUrl("register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password: passwordDigest }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "สมัครสมาชิกไม่สำเร็จ");
  }

  return response.json();
}
