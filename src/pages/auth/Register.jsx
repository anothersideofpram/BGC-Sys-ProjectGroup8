import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../lib/supabase";

const TERMS_SECTIONS = [
  {
    emoji: "📋",
    title: "1. Penerimaan Syarat",
    body: "Dengan menggunakan platform BlackGold Cherish, Anda menyatakan telah membaca dan menyetujui syarat & ketentuan ini. Kami berhak memperbarui ketentuan sewaktu-waktu.",
  },
  {
    emoji: "🛍️",
    title: "2. Layanan",
    body: "Kami menyediakan penjualan fashion premium, custom order, dan pelacakan produksi. Kami berhak mengubah atau menghentikan layanan kapan pun.",
  },
  {
    emoji: "💳",
    title: "3. Pembayaran",
    body: "Pembayaran diproses melalui Midtrans. Harga dalam Rupiah (IDR) dan bersifat final. Kami tidak menyimpan data kartu kredit/debit Anda.",
  },
  {
    emoji: "📦",
    title: "4. Pesanan & Pengiriman",
    body: "Pesanan diproses setelah pembayaran dikonfirmasi. Custom order memerlukan 7–21 hari kerja. Kami tidak bertanggung jawab atas keterlambatan akibat force majeure.",
  },
  {
    emoji: "🔄",
    title: "5. Retur & Refund",
    body: "Retur diterima dalam 3 hari untuk produk cacat. Custom order tidak dapat diretur kecuali ada cacat produksi. Refund diproses dalam 7–14 hari kerja.",
  },
  {
    emoji: "⚠️",
    title: "6. Larangan",
    body: "Dilarang menggunakan identitas palsu, melakukan penipuan, menyebarkan konten melanggar hukum, atau mengakses sistem secara tidak sah.",
  },
];

const PRIVACY_SECTIONS = [
  {
    emoji: "📊",
    title: "1. Data yang Kami Kumpulkan",
    body: "Kami mengumpulkan nama, email, nomor telepon, dan alamat pengiriman yang Anda berikan saat mendaftar atau melakukan pemesanan.",
  },
  {
    emoji: "🎯",
    title: "2. Penggunaan Data",
    body: "Data digunakan semata-mata untuk memproses pesanan, mengirimkan konfirmasi transaksi, dan meningkatkan layanan kami.",
  },
  {
    emoji: "🔒",
    title: "3. Keamanan Data",
    body: "Data Anda disimpan dengan enkripsi standar industri. Kami tidak menjual atau membagikan data kepada pihak ketiga tanpa izin eksplisit Anda.",
  },
  {
    emoji: "🍪",
    title: "4. Cookie",
    body: "Kami menggunakan cookie untuk menjaga sesi login dan meningkatkan pengalaman berbelanja. Anda dapat menonaktifkan cookie melalui pengaturan browser.",
  },
  {
    emoji: "👤",
    title: "5. Hak Anda",
    body: "Anda berhak mengakses, memperbarui, atau meminta penghapusan data akun Anda kapan pun dengan menghubungi kami melalui email resmi.",
  },
  {
    emoji: "📧",
    title: "6. Kontak",
    body: "Pertanyaan terkait privasi: adminbgcherish@gmail.com — Senin s.d. Sabtu, 08.00–17.00 WIB.",
  },
];

const modalAnimStyle = `
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
  .terms-scroll::-webkit-scrollbar { width:4px; }
  .terms-scroll::-webkit-scrollbar-track { background:transparent; }
  .terms-scroll::-webkit-scrollbar-thumb { background:rgba(184,134,11,0.35); border-radius:99px; }
`;

function PolicyModal({ title, subtitle, sections, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(10,4,8,0.75)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{modalAnimStyle}</style>

      <div
        style={{
          background: "linear-gradient(160deg, #1f0a14 0%, #2d1020 60%, #1a0810 100%)",
          border: "1px solid rgba(184,134,11,0.3)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,134,11,0.1)",
          animation: "slideUp 0.25s cubic-bezier(0.34,1.3,0.64,1)",
        }}
      >
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid rgba(184,134,11,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "rgba(184,134,11,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
              BlackGold Cherish
            </p>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                fontFamily: "serif",
                background: "linear-gradient(90deg, #b8860b, #e8c862)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p style={{ fontSize: "11px", color: "rgba(255,200,210,0.45)", marginTop: "2px" }}>{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid rgba(184,134,11,0.2)",
              background: "rgba(184,134,11,0.08)",
              color: "rgba(255,220,200,0.7)",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220,20,60,0.15)";
              e.currentTarget.style.borderColor = "rgba(220,20,60,0.4)";
              e.currentTarget.style.color = "#dc143c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(184,134,11,0.08)";
              e.currentTarget.style.borderColor = "rgba(184,134,11,0.2)";
              e.currentTarget.style.color = "rgba(255,220,200,0.7)";
            }}
          >
            ✕
          </button>
        </div>

        <div className="terms-scroll" style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          <p style={{ fontSize: "12px", color: "rgba(255,200,210,0.55)", fontStyle: "italic", marginBottom: "20px", lineHeight: 1.6 }}>
            Harap baca sebelum mendaftar.
          </p>

          {sections.map((sec, i) => (
            <div
              key={i}
              style={{
                marginBottom: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(184,134,11,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#e8c862",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{sec.emoji}</span>
                {sec.title}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,210,230,0.65)", lineHeight: 1.7, margin: 0 }}>
                {sec.body}
              </p>
            </div>
          ))}

          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "16px", fontStyle: "italic" }}>
            © 2023 BlackGold Cherish. All rights reserved.
          </p>
        </div>

        <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(184,134,11,0.15)", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
              backgroundSize: "200% auto",
              color: "#1a0a10",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              transition: "background-position 0.4s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = "right center";
              e.currentTarget.style.transform = "scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = "left center";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!dataForm.fullName) {
      setError("Nama lengkap wajib diisi");
      setLoading(false);
      return;
    }

    if (!dataForm.phoneNumber) {
      setError("Nomor telepon wajib diisi");
      setLoading(false);
      return;
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    if (dataForm.password.length < 8) {
      setError("Password minimal 8 karakter");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            full_name: dataForm.fullName,
            phone: dataForm.phoneNumber,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Registrasi berhasil. Silakan cek email untuk verifikasi.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        nama: dataForm.fullName,
        email: dataForm.email,
        no_hp: dataForm.phoneNumber,
        provider: "email",
        role: "customer",
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Gagal mendaftar, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showTerms && (
        <PolicyModal
          title="Syarat & Ketentuan"
          subtitle="Terms of Service — BlackGold Cherish"
          sections={TERMS_SECTIONS}
          onClose={() => setShowTerms(false)}
        />
      )}
      {showPrivacy && (
        <PolicyModal
          title="Kebijakan Privasi"
          subtitle="Privacy Policy — BlackGold Cherish"
          sections={PRIVACY_SECTIONS}
          onClose={() => setShowPrivacy(false)}
        />
      )}

      <div className="text-center mb-6">
        <p className="text-pink-600 text-base font-medium">
          Bergabunglah bersama kami
        </p>
      </div>

      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Daftar Akun
            </span>
          </h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-pink-50 text-pink-600 p-3 rounded-xl mb-6 text-sm border border-pink-200">
            <BsFillExclamationDiamondFill className="text-pink-500 text-sm" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={dataForm.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={dataForm.phoneNumber}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-pink-300 text-pink-500 focus:ring-pink-400"
              required
            />
            <label htmlFor="terms" className="text-xs text-pink-600 leading-relaxed">
              Saya menyetujui{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-pink-500 font-semibold hover:underline hover:text-pink-700 transition-colors"
              >
                Syarat &amp; Ketentuan
              </button>
              {" "}dan{" "}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="text-pink-500 font-semibold hover:underline hover:text-pink-700 transition-colors"
              >
                Kebijakan Privasi
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-pink-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-pink-500">
          Sudah punya akun?{" "}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-semibold hover:underline transition ${isActive ? "text-pink-700" : "text-pink-600"}`
            }
          >
            Login di sini
          </NavLink>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-pink-100"></div>
          <span className="px-4 text-xs text-pink-400 font-medium bg-transparent">
            Atau
          </span>
          <div className="flex-grow border-t border-pink-100"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-3 border border-pink-200 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Daftar dengan Google
        </button>
      </div>
    </>
  );
}
