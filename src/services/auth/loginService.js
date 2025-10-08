import { buildApiUrl } from "../../config/apiConfig.js";
import { hashPassword } from "../security/passwordHash.js";

export async function loginWithCredentials({ email, password }) {
  const passwordDigest = await hashPassword(password);

  const response = await fetch(buildApiUrl("login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: passwordDigest }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "เข้าสู่ระบบไม่สำเร็จ");
  }

  return response.json();
}
