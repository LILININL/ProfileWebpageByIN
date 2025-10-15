const ensureString = (value, field) => {
  if (typeof value !== "string") {
    throw new Error(`${field} ต้องเป็นข้อความ`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`กรุณากรอก ${field}`);
  }

  return trimmed;
};

const ensurePassword = (value) => {
  if (value.length < 8) {
    throw new Error("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
  }

  if (/\s/.test(value)) {
    throw new Error("รหัสผ่านห้ามมีช่องว่าง");
  }

  return value;
};

export function validateLoginInput(input) {
  const email = ensureString(input?.email, "อีเมล");
  const password = ensurePassword(ensureString(input?.password, "รหัสผ่าน"));

  return { email, password };
}

export function validateRegisterInput(input) {
  const name = ensureString(input?.name, "ชื่อ");
  const { email, password } = validateLoginInput(input);
  const confirmPassword = ensurePassword(
    ensureString(input?.confirmPassword ?? input?.password, "ยืนยันรหัสผ่าน")
  );

  if (password !== confirmPassword) {
    throw new Error("รหัสผ่านยืนยันไม่ตรงกัน");
  }

  return { name, email, password };
}

export function validateChangePasswordInput(input) {
  const currentPassword = ensurePassword(
    ensureString(input?.currentPassword, "รหัสผ่านปัจจุบัน")
  );
  const newPassword = ensurePassword(
    ensureString(input?.newPassword, "รหัสผ่านใหม่")
  );
  const confirmPassword = ensurePassword(
    ensureString(input?.confirmPassword ?? input?.newPassword, "ยืนยันรหัสผ่าน")
  );

  if (newPassword !== confirmPassword) {
    throw new Error("รหัสผ่านใหม่และยืนยันไม่ตรงกัน");
  }

  return { currentPassword, newPassword };
}
