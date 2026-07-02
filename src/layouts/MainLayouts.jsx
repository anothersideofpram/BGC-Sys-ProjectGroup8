import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  LuTag,
  LuShoppingCart,
  LuHistory,
  LuCircleUserRound,
  LuHeart,
} from "react-icons/lu";
import { FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const NAV_ITEMS = [
  { path: "/koleksi", icon: LuTag, title: "Koleksi" },
  { path: "/wishlist", icon: LuHeart, title: "Wishlist" },
  { path: "/order", icon: LuShoppingCart, title: "Order" },
  { path: "/riwayat", icon: LuHistory, title: "Riwayat Pesanan" },
  { path: "/akun", icon: LuCircleUserRound, title: "Akun Saya" },
];

const SOCIAL_LINKS = [
  {
    id: "tiktok",
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@blackgold_cherish",
    hoverColor: "#ffffff",
    glowColor: "rgba(255,255,255,0.35)",
    bg: "rgba(255,255,255,0.06)",
    hoverBg: "rgba(255,255,255,0.14)",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/blackgold_cherish",
    hoverColor: "#f58529",
    glowColor: "rgba(245,133,41,0.45)",
    bg: "rgba(245,133,41,0.06)",
    hoverBg: "rgba(245,133,41,0.14)",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/6285761004981",
    hoverColor: "#25D366",
    glowColor: "rgba(37,211,102,0.45)",
    bg: "rgba(37,211,102,0.06)",
    hoverBg: "rgba(37,211,102,0.14)",
  },
];

function SocialIcon({ id, icon: Icon, label, href, hoverColor, glowColor, bg, hoverBg }) {
  return (
    <a
      id={`footer-social-${id}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Kunjungi ${label} BlackGold Cherish`}
      title={label}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        padding: "10px 16px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: bg,
        color: "rgba(255,255,255,0.5)",
        textDecoration: "none",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
        minWidth: "64px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverColor;
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.borderColor = hoverColor;
        e.currentTarget.style.boxShadow = `0 0 18px ${glowColor}, 0 4px 14px rgba(0,0,0,0.3)`;
        e.currentTarget.style.transform = "translateY(-5px) scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
        e.currentTarget.style.background = bg;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <Icon size={20} />
      <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
        borderTop: "1px solid rgba(184,134,11,0.2)",
      }}
      className="mt-auto py-8 px-6 text-center"
    >
      {/* Brand */}
      <p
        className="font-bold text-lg mb-1"
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
      <p
        className="text-sm italic mb-6"
        style={{
          fontFamily: "var(--font-cormorant, serif)",
          color: "rgba(255,210,230,0.6)",
        }}
      >
        Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan
      </p>

      {/* Social Media */}
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(184,134,11,0.55)",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          ✦ Temukan Kami di ✦
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon key={social.id} {...social} />
          ))}
        </div>
      </div>

      {/* Gold Divider */}
      <div
        style={{
          width: "80px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.5), transparent)",
          margin: "0 auto 14px",
        }}
      />

      {/* Copyright */}
      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
        © 2023 BlackGold Cherish. All rights reserved.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <Link
          to="/terms"
          className="text-[10px] underline underline-offset-2 hover:opacity-80 transition-opacity"
          style={{ color: "rgba(184,134,11,0.6)" }}
        >
          Syarat & Ketentuan
        </Link>
      </div>
    </footer>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#fffafb] flex flex-col overflow-x-hidden">
      {!isLanding && (
        <>
          {/* Desktop Navbar */}
          <nav
            className="kol-navbar sticky top-0 z-40 bg-white hidden sm:flex items-center justify-between px-10 py-4"
            style={{ borderBottom: "1px solid rgba(184,134,11,0.12)" }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 text-gradient-brand font-bold text-xl tracking-tight shrink-0"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              <img src="/Logo BGC.jpg" alt="Logo" className="w-9 h-9 object-contain rounded-lg border border-pink-100" />
              <span>BlackGold Cherish</span>
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
                      background: isActive ? "rgba(184,134,11,0.08)" : "transparent",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{ transition: "transform 0.2s, color 0.2s" }}
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

          {/* Mobile Top Bar */}
          <div
            className="sm:hidden sticky top-0 z-40 bg-white flex items-center justify-center px-4 py-3"
            style={{ borderBottom: "1px solid rgba(184,134,11,0.15)" }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gradient-brand font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              <img src="/Logo BGC.jpg" alt="Logo" className="w-8 h-8 object-contain rounded-lg border border-pink-100" />
              <span>BlackGold Cherish</span>
            </button>
          </div>
        </>
      )}

      {/* Page Content */}
      <div className={`flex-1 ${!isLanding ? "pb-20 sm:pb-0" : ""}`}>
        <Outlet />
      </div>

      {/* Desktop Footer */}
      {!isLanding && (
        <div className="hidden sm:block">
          <Footer />
        </div>
      )}

      {/* Mobile Bottom Nav */}
      {!isLanding && (
        <nav
          className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(184,134,11,0.2)",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {NAV_ITEMS.map(({ path, icon: Icon, title }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={title}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? "#b8860b" : "#9e8a7a",
                  background: isActive ? "rgba(184,134,11,0.08)" : "transparent",
                  minWidth: "52px",
                }}
              >
                <Icon size={22} style={{ transition: "transform 0.2s, color 0.2s" }} />
                <span
                  className="text-[9px] font-semibold leading-none text-center w-full"
                  style={{
                    color: isActive ? "#b8860b" : "#9e8a7a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title === "Riwayat Pesanan" ? "Riwayat" : title === "Akun Saya" ? "Akun" : title}
                </span>
                {isActive && (
                  <span
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: "#b8860b" }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
