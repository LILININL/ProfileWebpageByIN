import { buildApiUrl, API_PATHS } from "../../config/apiConfig.js";
import { hashPassword } from "../security/passwordHash.js";
import { validateChangePasswordInput } from "./validators.js";
import { readStoredAuth } from "./authStorage.js";

export async function changePassword(input) {
  const payload = validateChangePasswordInput(input);
  const stored = readStoredAuth();
  const sessionEmailRaw = stored?.email ?? stored?.user?.email ?? null;
  if (!sessionEmailRaw) {
    throw new Error("ไม่พบอีเมลผู้ใช้ในสถานะเข้าสู่ระบบ");
  }
  const sessionEmail = String(sessionEmailRaw).trim().toLowerCase();
  const providedEmail = input?.email
    ? String(input.email).trim().toLowerCase()
    : "";
  if (providedEmail && providedEmail !== sessionEmail) {
    throw new Error("อีเมลไม่ตรงกับบัญชีที่กำลังเข้าสู่ระบบ");
  }

  const currentDigest = await hashPassword(payload.currentPassword);
  const newDigest = await hashPassword(payload.newPassword);

  const isHex64 = (s) => typeof s === "string" && /^[a-f0-9]{64}$/i.test(s);
  if (!isHex64(currentDigest) || !isHex64(newDigest)) {
    throw new Error("รูปแบบรหัสผ่านไม่ถูกต้อง โปรดติดต่อผู้ดูแลระบบ");
  }

  const res = await fetch(buildApiUrl(API_PATHS.changePassword), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: sessionEmail,
      old_password: currentDigest,
      new_password: newDigest,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "ไม่สามารถเปลี่ยนรหัสผ่านได้");
  }

  return res.json().catch(() => ({ ok: true }));
}
