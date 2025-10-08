import { useState } from "react";
import { Link } from "react-router-dom";
import { registerWithCredentials } from "../../services/auth/registerService.js";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านยืนยันไม่ตรงกัน");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await registerWithCredentials({ name, email, password });
      setResult(data);
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell register-page">
      <div className="register-card">
        <h1>สมัครสมาชิก</h1>
        <p className="register-subtitle">สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">
            ชื่อ
            <input
              className="register-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="ชื่อของคุณ"
              autoComplete="name"
            />
          </label>

          <label className="register-label">
            อีเมล
            <input
              className="register-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>

          <label className="register-label">
            รหัสผ่าน
            <input
              className="register-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </label>

          <label className="register-label">
            ยืนยันรหัสผ่าน
            <input
              className="register-input"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </label>

          <button className="register-submit" type="submit" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        {error ? <p className="register-error">{error}</p> : null}
        {result ? (
          <div className="register-success">
            <h2>สำเร็จ!</h2>
            <p>บัญชีใหม่ถูกสร้างเรียบร้อย</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : null}

        <Link className="back-link" to="/login">
          ← กลับหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}

export default Register;
