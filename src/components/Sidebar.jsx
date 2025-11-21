import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoredAuth } from "../hooks/useStoredAuth.js";

const BasePath = [
  {
    id: "home",
    path: "/",
    icon: (
      <path d="M3 11.2 12 4l9 7.2V20a2 2 0 0 1-2 2h-5v-5h-4v5H5a2 2 0 0 1-2-2z" />
    ),
    label: "หน้าแรก",
  },
  {
    id: "dashboard",
    path: "/dashboard",
    icon: (
      <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
    ),
    label: "แดชบอร์ด",
    authOnly: true,
  },

  {
    id: "contact",
    path: "/contact",
    icon: (
      <>
        <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z" />
        <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z" />
      </>
    ),
    label: "ติดต่อ",
  },
  {
    id: "about",
    path: "/iSme",
    icon: (
      <>
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
        <path d="M11 10h2v6h-2zm0-4h2v2h-2z" />
      </>
    ),
    label: "เกี่ยวกับฉัน",
  },
  {
    id: "settings",
    path: "/settings",
    icon: (
      <>
        <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z" />
        <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z" />
      </>
    ),
    label: "ตั้งค่า",
    authOnly: true,
  },
  {
    id: "login",
    path: "/login",
    icon: (
      <>
        <path d="M10 17v-3H3v-4h7V7l5 5-5 5z" />
        <path d="M19 3h-8a2 2 0 0 0-2 2v3h2V5h8v14h-8v-3h-2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      </>
    ),
    label: "เข้าสู่ระบบ",
    guestOnly: true,
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useStoredAuth();

  const path = useMemo(() => {
    return BasePath.filter((path) => {
      if (path.authOnly && !authUser) {
        return false;
      }
      if (path.guestOnly && authUser) {
        return false;
      }
      return true;
    });
  }, [authUser]);

  return (
    <aside className="hidden h-screen w-20 flex-col items-center justify-center py-8 md:flex">
      <nav className="flex flex-col items-center gap-4">
        {path.map((path) => {
          const isActive = location.pathname === path.path;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => navigate(path.path)}
              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition duration-200 ease-out ${
                isActive
                  ? "bg-white/20 text-white shadow-[0_12px_24px_rgba(15,23,42,0.35)]"
                  : "bg-transparent text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              aria-label={path.label}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`h-6 w-6 transition duration-200 ease-out ${
                  isActive ? "fill-white" : "fill-current"
                }`}
                aria-hidden
              >
                {path.icon}
              </svg>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
