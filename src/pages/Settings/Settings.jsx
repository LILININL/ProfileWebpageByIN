import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoredAuth } from "../../hooks/useStoredAuth.js";
import AvatarEditor from "../../components/AvatarEditor.jsx";
import { changePassword } from "../../services/auth/changePasswordService.js";
import homeImage from "../../assets/87164382_p0.jpg";

function Settings() {
  const navigate = useNavigate();
  const { authUser, setAuthUser, clearAuth } = useStoredAuth();

  const [displayName, setDisplayName] = useState(authUser?.name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(authUser?.avatar ?? "");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  if (!authUser) {
    return (
      <section
        className="relative flex min-h-screen w-full justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pb-20 pt-24 md:px-12"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <h1 className="text-4xl font-semibold">ตั้งค่า</h1>
        <p className="text-sm text-white/75">
          ต้องเข้าสู่ระบบก่อนจึงจะจัดการข้อมูลส่วนตัวได้
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(79,70,229,0.45)]"
        >
          ไปหน้าเข้าสู่ระบบ
        </button>
      </section>
    );
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    setProfileMessage("");
    setAuthUser({ ...authUser, name: displayName, avatar: avatarUrl });
    setProfileMessage("บันทึกโปรไฟล์เรียบร้อยแล้ว");
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const currentPassword = form.get("current-password");
    const newPassword = form.get("new-password");
    const confirmPassword = form.get("confirm-password");
    if (!currentPassword || !newPassword) return;
    setPasswordLoading(true);
    setPasswordMessage("");
    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      setPasswordMessage("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      event.target.reset();
    } catch (err) {
      setPasswordMessage(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <section
      className="relative flex min-h-screen w-full justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pb-10 pt-0 md:px-12"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/85 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-10">
        <header className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50 pb-10 pt-10">
            Settings
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            ตั้งค่าบัญชีของคุณ
          </h1>
          <p className="mt-2 text-sm text-white/70 md:text-base">
            ปรับแต่งข้อมูลที่ใช้แสดงผล เปลี่ยนรหัสผ่าน หรือออกจากระบบได้ที่นี่
          </p>
        </header>

        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/10 p-6 text-white/80 backdrop-blur-lg shadow-[0_18px_40px_rgba(15,23,42,0.35)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName || authUser.email}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white">
                {(displayName || authUser.email || "?")
                  .slice(0, 1)
                  .toUpperCase()}
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold text-white/90">
                {displayName || authUser.email}
              </p>
              <p className="text-xs text-white/60">{authUser.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-white/15"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <h2 className="text-lg font-semibold">ข้อมูลโปรไฟล์</h2>
            <form className="space-y-6" onSubmit={handleProfileSubmit}>
              <div className="w-full">
                <AvatarEditor
                  value={avatarUrl}
                  onChange={(payload) => {
                    if (payload?.url) setAvatarUrl(payload.url);
                  }}
                />
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
                ชื่อที่แสดง
                <input
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="ชื่อที่อยากให้แสดง"
                />
              </label>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(16,185,129,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(16,185,129,0.45)]"
                >
                  บันทึกข้อมูลโปรไฟล์
                </button>
              </div>
            </form>
            {profileMessage ? (
              <p className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                {profileMessage}
              </p>
            ) : null}
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <h2 className="text-lg font-semibold">เปลี่ยนรหัสผ่าน</h2>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
                รหัสผ่านปัจจุบัน
                <input
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                  type="password"
                  name="current-password"
                  placeholder="••••••"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
                รหัสผ่านใหม่
                <input
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                  type="password"
                  name="new-password"
                  placeholder="••••••"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
                ยืนยันรหัสผ่านใหม่
                <input
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white transition duration-200 ease-out placeholder:text-white/40 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/50"
                  type="password"
                  name="confirm-password"
                  placeholder="••••••"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(79,70,229,0.45)] disabled:opacity-60"
              >
                {passwordLoading
                  ? "กำลังเปลี่ยนรหัสผ่าน..."
                  : "เปลี่ยนรหัสผ่าน"}
              </button>
            </form>
            {passwordMessage ? (
              <p className="rounded-2xl border border-indigo-300/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100">
                {passwordMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
