import backgroundImage from "../../assets/87164382_p0.jpg";
import HomeCard from "./components/HomeCard.jsx";
import HomeHero from "./components/HomeHero.jsx";

function Home() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-16 pt-24 md:px-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/85 backdrop-blur-[3px]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 text-center text-white">
        <HomeCard />
        <HomeHero />
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Landing Page",
              description:
                "องค์ประกอบพร้อมใช้งานสำหรับแนะนำโปรเจ็กต์หรือโปรดักต์",
            },
            {
              title: "Auth Flow",
              description: "ตัวอย่างการสมัครและล็อกอินพร้อมจัดการสถานะผู้ใช้",
            },
            {
              title: "Dashboard",
              description:
                "พื้นที่จัดการข้อมูลหลังบ้าน ตกแต่งด้วยการ์ดแบบ glassmorphism ",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur-lg transition-transform duration-200 ease-out hover:-translate-y-1 hover:bg-white/15"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
