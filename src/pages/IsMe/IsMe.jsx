import { Link } from "react-router-dom";
import backgroundImage from "../../assets/87164382_p0.jpg";

function IsMe() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-16 pt-24 md:px-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/60 to-slate-950/90 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center text-white">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">about</p>
          <h1 className="text-4xl font-semibold tracking-wide md:text-5xl">Is Me</h1>
          <p className="text-lg leading-relaxed text-white/85 md:text-xl">
            สวัสดีครับ ผมชื่อ อิน นักพัฒนาที่สนใจงานเว็บและโมบายล์แอป เชื่อว่าการออกแบบประสบการณ์ผู้ใช้ที่ดีต้องมาพร้อมรหัสที่มีคุณภาพ
          </p>
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            หากต้องการพูดคุยเรื่องงานหรือต้องการพัฒนาผลิตภัณฑ์ร่วมกัน สามารถติดต่อได้ที่อีเมลหรือโทรศัพท์ด้านล่าง
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur-lg shadow-[0_24px_60px_rgba(15,23,42,0.45)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">อีเมล</p>
            <p className="text-lg font-medium">Ldaepoo1@gmail.com</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">โทรศัพท์</p>
            <p className="text-lg font-medium">093-625-2277</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white/85 transition-colors duration-200 ease-out hover:bg-white/20 hover:text-white"
            to="/"
          >
            ← กลับหน้าหลัก
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-indigo-500/60 px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(129,140,248,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-500"
            to="/contact"
          >
            ไปหน้าติดต่อ →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default IsMe;
