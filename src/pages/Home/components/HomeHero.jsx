import { Link } from "react-router-dom";
import { useStoredAuth } from "../../../hooks/useStoredAuth.js";

function HomeHero() {
  const { authUser } = useStoredAuth();

  const primaryButtonClasses =
    "inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(79,70,229,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200";
  return (
    <div className="flex max-w-2xl flex-col items-center gap-6 text-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]">
      <p className="m-0 text-lg leading-relaxed text-white/90 md:text-xl">
        โปรเจ็กต์นี้เป็นพื้นที่ทดลอง React + Vite พร้อม flow สมัครสมาชิกและหน้า
        dashboard ตัวอย่างให้อ่านและปรับเล่นได้
      </p>
      {!authUser ? (
        <div className="flex flex-wrap justify-center gap-4">
          <Link className={primaryButtonClasses} to="/register">
            สมัครใช้งาน
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default HomeHero;
