import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LuTag,
  LuShoppingCart,
  LuHistory,
  LuCircleUserRound,
  LuHeart,
} from "react-icons/lu";

const NAV_ITEMS = [
  { path: "/koleksi", icon: LuTag, title: "Koleksi" },
  { path: "/wishlist", icon: LuHeart, title: "Wishlist" },
  { path: "/order", icon: LuShoppingCart, title: "Order" },
  { path: "/riwayat", icon: LuHistory, title: "Riwayat Pesanan" },
  { path: "/akun", icon: LuCircleUserRound, title: "Akun Saya" },
];

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a0a10 0%, #2d1420 60%, #1a0a10 100%)",
        borderTop: "1px solid rgba(184,134,11,0.25)",
      }}
      className="mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p
              className="text-xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-cinzel, serif)",
                background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BlackGold Cherish
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Fashion Pilihan, Kualitas Terbaik
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map(({ path, title }) => (
              <a
                key={path}
                href={path}
                className="text-xs transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {title}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(184,134,11,0.35), transparent)",
          }}
          className="mb-6"
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} BlackGold Cherish. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(184,134,11,0.55)" }}>
            Dibuat dengan ❤️ oleh Kelompok 8
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#fffafb] flex flex-col">
      {!isLanding && (
        <nav className="kol-navbar sticky top-0 z-40 bg-white flex items-center justify-between px-6 sm:px-10 py-4">
          <button
            onClick={() => navigate("/")}
            className="text-gradient-brand font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-cinzel, serif)" }}
          >
            BlackGold Cherish
          </button>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ path, icon: Icon, title }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  title={title}
                  className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 group"
                  style={{
                    color: isActive ? "#b8860b" : "#1a0a10",
                    background: isActive
                      ? "rgba(184,134,11,0.08)"
                      : "transparent",
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      transition: "transform 0.2s, color 0.2s",
                      transform: "scale(1)",
                    }}
                    className="group-hover:scale-110 group-hover:text-[#b8860b]"
                  />
                  <span
                    className="text-[10px] font-medium leading-none"
                    style={{
                      color: isActive ? "#b8860b" : "#6b4c2a",
                      opacity: isActive ? 1 : 0.75,
                      transition: "color 0.2s, opacity 0.2s",
                    }}
                  >
                    {title}
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#b8860b" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
      {!isLanding && <Footer />}
    </div>
  );
}
