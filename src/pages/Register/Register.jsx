import { Link } from "react-router-dom";
import { registerWithCredentials } from "../../services/auth/registerService.js";
import { useFormController } from "../../hooks/useFormController.js";
import backgroundImage from "../../assets/87164382_p0.jpg";

function Register() {
  const { values, loading, error, result, handleChange, handleSubmit } =
    useFormController({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: registerWithCredentials,
    });

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-16 pt-24 md:px-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/60 to-slate-950/90 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-2xl flex-col gap-10 text-white">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold md:text-5xl">สร้างบัญชี</h1>
          <p className="text-sm leading-relaxed text-white/75 md:text-base">
            กรอกข้อมูลพื้นฐานเพื่อเริ่มทดลองระบบ Dashboard ของ FirstReact
            Playground
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-lg shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              ชื่อ (ภาษาอังกฤษ)
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                placeholder="เช่น LiLin"
                autoComplete="name"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              อีเมล
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
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
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              ยืนยันรหัสผ่าน
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </label>

            <button
              className="w-full rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(16,185,129,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(16,185,129,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          {result ? (
            <div className="mt-4 space-y-2 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-left text-sm text-emerald-100">
              <h2 className="text-base font-semibold">สำเร็จ!</h2>
              <p>บัญชีใหม่ถูกสร้างเรียบร้อย</p>
              <pre className="max-h-48 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-emerald-100">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>

        <Link
          className="mx-auto inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-200 ease-out hover:text-white"
          to="/login"
        >
          ← กลับหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </section>
  );
}

export default Register;
