import { Link } from "react-router-dom";
import backgroundImage from "../../assets/87164382_p0.jpg";

function Contact() {
  const contactItems = [
    { label: "ชื่อ", value: "อิน" },
    { label: "อีเมล", value: "Ldaepoo1@gmail.com" },
    { label: "โทรศัพท์", value: "093-625-2277" },
    { label: "บริการ", value: "พัฒนาเว็บไซต์และแอปพลิเคชันมือถือ" },
  ];

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-16 pt-24 md:px-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/65 to-slate-950/90 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide md:text-5xl">ติดต่อ</h1>
        <div className="w-full rounded-3xl border border-white/10 bg-white/10 p-8 text-left backdrop-blur-lg shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          <ul className="space-y-4">
            {contactItems.map((item) => (
              <li
                key={item.label}
                className="flex flex-col gap-1 text-white/85 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm uppercase tracking-[0.2em] text-white/50">
                  {item.label}
                </span>
                <span className="text-lg font-medium text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white/80 backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white/20 hover:text-white"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>
    </section>
  );
}

export default Contact;
