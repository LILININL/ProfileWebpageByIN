import { buildApiUrl, API_PATHS } from "../../config/apiConfig.js";
import { hashPassword } from "../security/passwordHash.js";
import { validateLoginInput } from "./validators.js";

export async function loginWithCredentials(credentials) {
  const payload = validateLoginInput(credentials);
  const passwordDigest = await hashPassword(payload.password);

  const response = await fetch(buildApiUrl(API_PATHS.login), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: payload.email, password: passwordDigest }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "เข้าสู่ระบบไม่สำเร็จ");
  }

  return response.json();
}
