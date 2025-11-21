import { useState } from "react";
import { Link } from "react-router-dom";
import { useStoredAuth } from "../../hooks/useStoredAuth.js";
import homeImage from "../../assets/87164382_p0.jpg";

const seedPosts = [
  {
    id: 1,
    title: "เริ่มต้นกับ FirstReact",
    body: "ยินดีต้อนรับเข้าสู่พื้นที่จดบันทึกหลังจากเข้าสู่ระบบสำเร็จ",
  },
  {
    id: 2,
    title: "เพิ่มโพสต์ใหม่",
    body: "กดปุ่มเพิ่มข้อมูลเพื่อสร้างโพสต์ตัวอย่างใหม่ได้ทันที",
  },
];

function createNewPost(index) {
  return {
    id: Date.now(),
    title: `โพสต์ใหม่ #${index}`,
    body: "นี่คือตัวอย่างโพสต์ที่เพิ่งถูกสร้าง ลองแก้ไขต่อในโค้ดได้เลย",
  };
}

function Dashboard() {
  const { authUser } = useStoredAuth();
  const [posts, setPosts] = useState(seedPosts);
  const [favorites, setFavorites] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddPost = () => {
    setPosts((prev) => [...prev, createNewPost(prev.length + 1)]);
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handleFavorite = (post) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === post.id);
      if (exists) {
        return prev.filter((item) => item.id !== post.id);
      }
      return [
        ...prev,
        {
          id: post.id,
          title: post.title,
          cover: homeImage,
        },
      ];
    });
  };

  const favoritesGrid = favorites.length ? (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-white/85">
        รายการที่บันทึกไว้
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/8 text-center"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={item.cover}
                alt={item.title}
              />
            </div>
            <p className="px-3 pb-3 pt-2 text-sm font-medium text-white/80">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <section
      className="relative flex min-h-screen w-full justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pb-20 pt-24 md:px-12"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85"
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col gap-10 text-white">
        <header className="flex flex-col gap-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Dashboard
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold md:text-4xl">
                พื้นที่จัดการข้อมูลของคุณ
              </h1>
              <p className="text-sm text-white/70 md:text-base">
                เพิ่มโพสต์ใหม่ บันทึกรายการที่ชอบ
                และดูรายละเอียดเพิ่มเติมภายในอินเทอร์เฟซเดียว
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(79,70,229,0.45)]"
              onClick={handleAddPost}
            >
              เพิ่มโพสต์ใหม่
            </button>
          </div>
        </header>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          {!authUser ? (
            <div className="flex flex-col items-center gap-4 text-center text-white/80">
              <p className="text-base">ยังไม่ได้เข้าสู่ระบบ</p>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white/85 transition-colors duration-200 ease-out hover:bg-white/20 hover:text-white"
                to="/login"
              >
                ไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => {
                  const isFav = favorites.some((fav) => fav.id === post.id);
                  return (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:bg-white/10"
                    >
                      <button
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-sm text-white/90 backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white/25"
                        aria-label="เพิ่มรายการถูกใจ"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleFavorite(post);
                        }}
                      >
                        {isFav ? "♥" : "♡"}
                      </button>
                      <button
                        className="flex w-full flex-col text-left"
                        onClick={() => handleSelectPost(post)}
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden">
                          <img
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            src={homeImage}
                            alt={post.title}
                          />
                        </div>
                        <div className="flex flex-col gap-2 px-4 py-4 text-white/90">
                          <h2 className="text-lg font-semibold text-white">
                            {post.title}
                          </h2>
                          <p className="text-sm leading-relaxed text-white/70">
                            {post.body}
                          </p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {selectedPost ? (
                <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 backdrop-blur-md md:grid-cols-[280px,1fr]">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <img
                      className="h-full w-full object-cover"
                      src={homeImage}
                      alt={selectedPost.title}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold text-white">
                      {selectedPost.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75">
                      {selectedPost.body}
                    </p>
                  </div>
                </div>
              ) : null}

              {favoritesGrid}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
