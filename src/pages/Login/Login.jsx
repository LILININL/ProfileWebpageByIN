import { useState } from "react";
import { Link } from "react-router-dom";
import { loginWithCredentials } from "../../services/auth/loginService.js";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await loginWithCredentials({ email, password });
      setResult(data);
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell auth-page">
      <div className="auth-card">
        <h1>เข้าสู่ระบบ</h1>
        <p className="auth-subtitle">
          ใช้อีเมลเดียวกับที่สมัครสมาชิกผ่าน API เพื่อทดสอบ flow การเข้าสู่ระบบ
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            อีเมล
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-label">
            รหัสผ่าน
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {error ? <p className="auth-error">{error}</p> : null}
        {result ? (
          <div className="auth-success">
            <h2>สำเร็จ!</h2>
            <p>สวัสดีคุณ {result.name || result.email}</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : null}

        <Link className="back-link" to="/">
          ← กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}

export default Login;
