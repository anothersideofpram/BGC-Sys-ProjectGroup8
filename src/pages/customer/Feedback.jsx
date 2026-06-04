import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productFeedbacks = {
  "Blus Elegance": [
    { user: "Sari D.", rating: 5, komentar: "Bahannya lembut dan jahitannya rapi. Sangat puas!", tanggal: "10 Mei 2025" },
    { user: "Rina M.", rating: 4, komentar: "Nyaman dipakai, warna persis seperti foto.", tanggal: "5 Apr 2025" },
  ],
  "Gaun Cherish": [
    { user: "Mega S.",  rating: 5, komentar: "Sempurna untuk acara pernikahan, banyak yang memuji!", tanggal: "15 Apr 2025" },
    { user: "Laila R.", rating: 4, komentar: "Kualitas bagus, pengiriman cepat.", tanggal: "8 Apr 2025" },
    { user: "Putri N.", rating: 3, komentar: "Ukuran agak kecil dari ekspektasi.", tanggal: "1 Apr 2025" },
  ],
  "Blus Rosé": [
    { user: "Dewi A.", rating: 5, komentar: "Cantik banget! Rekomendasi!", tanggal: "2 Mei 2025" },
  ],
};

const produkList = ["Blus Elegance", "Blus Rosé", "Blus Aurora", "Gaun Cherish", "Gaun Midnight", "Gaun Seroja", "Baju Kurung Klasik", "Baju Kurung Modern"];

const Stars = ({ n, interactive = false, onSet }) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i}
      className={interactive ? "cursor-pointer text-3xl select-none" : ""}
      style={{ color: i < n ? "#c9a227" : "#e5e7eb" }}
      onClick={() => interactive && onSet && onSet(i + 1)}>
      ★
    </span>
  ));

export default function Feedback() {
  const navigate = useNavigate();
  const [selectedProduk, setSelectedProduk] = useState("Blus Elegance");
  const [tab, setTab] = useState("lihat"); // lihat | beri
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [myFeedbacks, setMyFeedbacks] = useState([]);

  const existing = productFeedbacks[selectedProduk] || [];
  const allFb = [...existing, ...myFeedbacks.filter(f => f.produk === selectedProduk)];
  const avgRating = allFb.length === 0 ? null : (allFb.reduce((a, b) => a + b.rating, 0) / allFb.length).toFixed(1);

  const handleSubmit = () => {
    if (rating === 0 || komentar.trim() === "") {
      alert("Mohon pilih rating dan isi komentar.");
      return;
    }
    setMyFeedbacks(prev => [...prev, { user: "Anda", rating, komentar, tanggal: "Hari ini", produk: selectedProduk }]);
    setSubmitted(true);
    setRating(0);
    setKomentar("");
    setTimeout(() => { setSubmitted(false); setTab("lihat"); }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Ulasan Produk
        </h1>
        <p className="text-sm" style={{ color: "#6b4a58" }}>
          Lihat ulasan pelanggan lain atau bagikan pengalaman Anda
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-16">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: "#6b4a58" }}>Pilih Produk</label>
          <select
            value={selectedProduk}
            onChange={(e) => setSelectedProduk(e.target.value)}
            className="border border-pink-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-pink-400 bg-white"
            style={{ color: "#1a0a10", minWidth: 240 }}
          >
            {produkList.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {/* Rating summary */}
        <div className="bg-white rounded-3xl border border-pink-100 px-7 py-6 mb-6 flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-5xl font-bold" style={{ color: "#c9a227" }}>{avgRating ?? "—"}</p>
            <div className="text-xl mt-1"><Stars n={Math.round(avgRating ?? 0)} /></div>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{allFb.length} ulasan</p>
          </div>
          <div className="flex-1 space-y-2 min-w-[180px]">
            {[5,4,3,2,1].map(r => {
              const cnt = allFb.filter(f => f.rating === r).length;
              const pct = allFb.length === 0 ? 0 : (cnt / allFb.length) * 100;
              return (
                <div key={r} className="flex items-center gap-3">
                  <span className="text-xs w-4 text-right" style={{ color: "#a07080" }}>{r}★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: "#c9a227" }} />
                  </div>
                  <span className="text-xs w-6" style={{ color: "#a07080" }}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab */}
        <div className="flex gap-2 mb-6">
          {[["lihat", "📋 Lihat Ulasan"], ["beri", "✍️ Beri Ulasan"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === key ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* TAB LIHAT */}
        {tab === "lihat" && (
          <div className="space-y-4">
            {allFb.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg mb-2">Belum ada ulasan untuk produk ini</p>
                <button onClick={() => setTab("beri")} className="kol-btn-pesan px-6 py-2.5 rounded-full text-white text-sm font-semibold">
                  Jadi yang Pertama Mengulas
                </button>
              </div>
            ) : allFb.map((fb, i) => (
              <div key={i} className="bg-white rounded-3xl border border-pink-100 p-6 flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}>
                  {fb.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>{fb.user}</p>
                    <div className="flex items-center gap-2">
                      <Stars n={fb.rating} />
                      <span className="text-xs" style={{ color: "#a07080" }}>{fb.tanggal}</span>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "#6b4a58" }}>{fb.komentar}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB BERI */}
        {tab === "beri" && (
          <div className="bg-white rounded-3xl border border-pink-100 p-8 max-w-xl">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">🎉</p>
                <p className="font-bold text-lg" style={{ color: "#16a34a" }}>Ulasan berhasil dikirim!</p>
                <p className="text-sm mt-1" style={{ color: "#a07080" }}>Terima kasih atas feedback Anda.</p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
                  Tulis Ulasan — {selectedProduk}
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3" style={{ color: "#6b4a58" }}>Rating Anda</label>
                  <div className="flex gap-1">
                    <Stars n={rating} interactive onSet={setRating} />
                  </div>
                  {rating > 0 && (
                    <p className="text-sm mt-2" style={{ color: "#b8860b" }}>
                      {["", "Sangat Buruk", "Kurang Baik", "Cukup", "Baik", "Sangat Bagus"][rating]}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6b4a58" }}>Komentar</label>
                  <textarea
                    rows={4}
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    placeholder="Bagikan pengalaman Anda dengan produk ini..."
                    className="w-full border border-pink-200 rounded-2xl px-5 py-4 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
                  />
                  <p className="text-xs mt-1 text-right" style={{ color: "#a07080" }}>{komentar.length}/500</p>
                </div>

                <button onClick={handleSubmit}
                  className="w-full kol-btn-pesan py-4 rounded-full text-white text-sm font-bold"
                  style={{ fontFamily: "var(--font-cinzel,serif)" }}>
                  Kirim Ulasan
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
