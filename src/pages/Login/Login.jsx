import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithCredentials } from "../../services/auth/loginService.js";
import { useFormController } from "../../hooks/useFormController.js";
import { useStoredAuth } from "../../hooks/useStoredAuth.js";
import backgroundImage from "../../assets/87164382_p0.jpg";

function Login() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useStoredAuth();
  const { values, loading, error, result, handleChange, handleSubmit } =
    useFormController({
      initialValues: {
        email: "",
        password: "",
        rememberMe: true,
      },
      onSubmit: loginWithCredentials,
      onSuccess: (payload, currentValues) => {
        if (payload) {
          setAuthUser(payload, Boolean(currentValues.rememberMe));
          navigate("/dashboard");
        }
      },
    });

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [authUser, navigate]);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-16 pt-24 md:px-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/65 to-slate-950/90 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-xl flex-col gap-8 text-white">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">เข้าสู่ระบบ</p>
          <h1 className="text-4xl font-semibold md:text-5xl">ยินดีต้อนรับกลับ</h1>
          <p className="text-sm leading-relaxed text-white/75 md:text-base">
            ใช้อีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ และบันทึกการตั้งค่าใน Dashboard ของคุณ
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-lg shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              อีเมล
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              รหัสผ่าน
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            <button
              className="w-full rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(79,70,229,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
            </button>

            <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/70 sm:flex-row">
              <label className="inline-flex items-center gap-2 text-sm text-white/75">
                <input
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-indigo-400 focus:ring-indigo-300/60"
                  type="checkbox"
                  checked={Boolean(values.rememberMe)}
                  onChange={handleChange("rememberMe")}
                />
                <span>จดจำการเข้าสู่ระบบ</span>
              </label>
              <span>
                ยังไม่มีบัญชี?{" "}
                <Link className="font-semibold text-indigo-300 hover:text-indigo-200" to="/register">
                  สมัครสมาชิก
                </Link>
              </span>
            </div>
          </form>

          {error ? (
            <p className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          {result ? (
            <div className="mt-4 space-y-2 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-left text-sm text-emerald-100">
              <h2 className="text-base font-semibold">สำเร็จ!</h2>
              <p>สวัสดีคุณ {result.name || result.email}</p>
              <pre className="max-h-48 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-emerald-100">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>

        <Link
          className="mx-auto inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-200 ease-out hover:text-white"
          to="/"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>
    </section>
  );
}

export default Login;
