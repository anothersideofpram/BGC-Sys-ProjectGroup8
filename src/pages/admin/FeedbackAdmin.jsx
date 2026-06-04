import { useState } from "react";

const allFeedback = [
  { id: 1, user: "Sari D.",   produk: "Blus Elegance",  rating: 5, komentar: "Bahannya lembut dan jahitannya rapi. Sangat puas!", tanggal: "10 Mei 2025", status: "Ditampilkan" },
  { id: 2, user: "Rina M.",   produk: "Blus Elegance",  rating: 4, komentar: "Nyaman dipakai, warna persis seperti foto.", tanggal: "5 Apr 2025", status: "Ditampilkan" },
  { id: 3, user: "Dewi A.",   produk: "Blus Rosé",      rating: 5, komentar: "Cantik banget! Rekomendasi!", tanggal: "2 Mei 2025", status: "Ditampilkan" },
  { id: 4, user: "Mega S.",   produk: "Gaun Cherish",   rating: 5, komentar: "Sempurna untuk acara pernikahan, banyak yang memuji!", tanggal: "15 Apr 2025", status: "Ditampilkan" },
  { id: 5, user: "Laila R.",  produk: "Gaun Cherish",   rating: 4, komentar: "Kualitas bagus, pengiriman cepat.", tanggal: "8 Apr 2025", status: "Ditampilkan" },
  { id: 6, user: "Putri N.",  produk: "Gaun Cherish",   rating: 3, komentar: "Ukuran agak kecil dari ekspektasi.", tanggal: "1 Apr 2025", status: "Pending" },
  { id: 7, user: "Tari W.",   produk: "Blus Aurora",    rating: 2, komentar: "Kurang sesuai ekspektasi.", tanggal: "20 Mar 2025", status: "Pending" },
];

const Stars = ({ n }) => Array.from({ length: 5 }, (_, i) => (
  <span key={i} style={{ color: i < n ? "#c9a227" : "#e5e7eb" }}>★</span>
));

const ratingColor = (r) =>
  r >= 4 ? { color: "#16a34a", bg: "rgba(22,163,74,.10)" } :
  r === 3 ? { color: "#b8860b", bg: "rgba(184,134,11,.10)" } :
             { color: "#dc2626", bg: "rgba(220,38,38,.10)" };

export default function FeedbackAdmin() {
  const [list, setList]     = useState(allFeedback);
  const [filter, setFilter] = useState("Semua");
  const [rFilter, setRFilter] = useState(0);

  const filtered = list.filter(fb => {
    const matchStatus = filter === "Semua" || fb.status === filter;
    const matchRating = rFilter === 0 || fb.rating === rFilter;
    return matchStatus && matchRating;
  });

  const avgAll = (list.reduce((a, b) => a + b.rating, 0) / list.length).toFixed(1);

  const toggleStatus = (id) =>
    setList(prev => prev.map(fb => fb.id === id ? { ...fb, status: fb.status === "Ditampilkan" ? "Disembunyikan" : "Ditampilkan" } : fb));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>Pantau Feedback</h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>Ulasan pelanggan terhadap produk BlackGold Cherish</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Ulasan",    value: list.length },
          { label: "Rating Rata-rata", value: `★ ${avgAll}` },
          { label: "Bintang 5",       value: list.filter(f => f.rating === 5).length },
          { label: "Perlu Perhatian", value: list.filter(f => f.rating <= 2).length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
            <p className="font-bold text-2xl" style={{ color: "#b8860b" }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {["Semua", "Ditampilkan", "Pending", "Disembunyikan"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${filter === f ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {[0,5,4,3,2,1].map(r => (
            <button key={r} onClick={() => setRFilter(r)}
              className={`px-3 py-2 rounded-full text-xs font-semibold transition-all ${rFilter === r ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {r === 0 ? "Semua ⭐" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map(fb => {
          const rc = ratingColor(fb.rating);
          return (
            <div key={fb.id} className="bg-white rounded-3xl border border-pink-100 p-6 flex gap-4 items-start">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}>
                {fb.user.charAt(0)}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>{fb.user}</p>
                    <p className="text-xs" style={{ color: "#a07080" }}>{fb.produk} · {fb.tanggal}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: rc.color, background: rc.bg }}>
                      <Stars n={fb.rating} /> {fb.rating}/5
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${fb.status === "Ditampilkan" ? "" : fb.status === "Pending" ? "" : ""}`}
                      style={{
                        color: fb.status === "Ditampilkan" ? "#16a34a" : fb.status === "Pending" ? "#b8860b" : "#6b7280",
                        background: fb.status === "Ditampilkan" ? "rgba(22,163,74,.10)" : fb.status === "Pending" ? "rgba(184,134,11,.10)" : "rgba(107,114,128,.10)"
                      }}>
                      {fb.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#6b4a58" }}>{fb.komentar}</p>
              </div>
              {/* Action */}
              <button onClick={() => toggleStatus(fb.id)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
                style={{ color: "#e91e8c" }}>
                {fb.status === "Ditampilkan" ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">Tidak ada feedback yang sesuai filter.</div>
        )}
      </div>
    </div>
  );
}
