import { buildApiUrl, API_PATHS } from "../../config/apiConfig.js";
import { hashPassword } from "../security/passwordHash.js";
import { validateRegisterInput } from "./validators.js";

export async function registerWithCredentials(input) {
  const payload = validateRegisterInput(input);
  const passwordDigest = await hashPassword(payload.password);

  const response = await fetch(buildApiUrl(API_PATHS.register), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: passwordDigest,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "สมัครสมาชิกไม่สำเร็จ");
  }

  return response.json();
}
