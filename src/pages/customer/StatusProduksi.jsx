import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "ORD-001",
    produk: "Blus Elegance",
    tanggal: "12 Mei 2025",
    steps: [
      { label: "Pesanan Diterima",      done: true,  date: "12 Mei 09:00" },
      { label: "Konfirmasi Pembayaran", done: true,  date: "12 Mei 11:30" },
      { label: "Proses Produksi",       done: true,  date: "13 Mei 08:00" },
      { label: "Quality Check",         done: true,  date: "17 Mei 14:00" },
      { label: "Siap Dikirim",          done: true,  date: "18 Mei 09:00" },
      { label: "Selesai",               done: true,  date: "20 Mei 15:00" },
    ],
  },
  {
    id: "ORD-002",
    produk: "Gaun Cherish",
    tanggal: "28 Apr 2025",
    steps: [
      { label: "Pesanan Diterima",      done: true,  date: "28 Apr 10:00" },
      { label: "Konfirmasi Pembayaran", done: true,  date: "28 Apr 13:00" },
      { label: "Proses Produksi",       done: true,  date: "29 Apr 08:00" },
      { label: "Quality Check",         done: true,  date: "04 Mei 11:00" },
      { label: "Siap Dikirim",          done: false, date: null },
      { label: "Selesai",               done: false, date: null },
    ],
  },
  {
    id: "ORD-003",
    produk: "Blus Rosé × 2",
    tanggal: "15 Apr 2025",
    steps: [
      { label: "Pesanan Diterima",      done: true,  date: "15 Apr 10:00" },
      { label: "Konfirmasi Pembayaran", done: true,  date: "15 Apr 14:00" },
      { label: "Proses Produksi",       done: true,  date: "16 Apr 08:00" },
      { label: "Quality Check",         done: false, date: null },
      { label: "Siap Dikirim",          done: false, date: null },
      { label: "Selesai",               done: false, date: null },
    ],
  },
];

export default function StatusProduksi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffafb]">
      {/* HERO HEADER */}
      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Status Produksi
        </h1>
        <p className="text-sm" style={{ color: "#6b4a58" }}>
          Pantau progres produksi pesanan Anda secara real-time
        </p>
      </div>

      {/* CARDS */}
      <div className="px-6 sm:px-10 pb-16 space-y-8">
        {orders.map((order) => {
          const doneCount = order.steps.filter(s => s.done).length;
          const pct = Math.round((doneCount / order.steps.length) * 100);
          return (
            <div key={order.id} className="bg-white rounded-3xl border border-pink-100 p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p className="font-mono font-bold text-base" style={{ color: "#b8860b" }}>{order.id}</p>
                  <p className="font-semibold text-lg" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>{order.produk}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>Dipesan: {order.tanggal}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: pct === 100 ? "#16a34a" : "#b8860b" }}>{pct}%</p>
                  <p className="text-xs" style={{ color: "#a07080" }}>selesai</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-pink-100 rounded-full mb-6 overflow-hidden">
                <div className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: pct === 100 ? "#16a34a" : "linear-gradient(90deg,#e91e8c,#c9a227)" }}
                />
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {order.steps.map((step, idx) => {
                  const isActive = step.done && (idx + 1 === order.steps.length || !order.steps[idx + 1].done);
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      {/* Dot */}
                      <div className="flex flex-col items-center mt-0.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          step.done ? "border-pink-500 bg-pink-500" : "border-gray-200 bg-white"
                        } ${isActive ? "ring-4 ring-pink-200" : ""}`}>
                          {step.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                        {idx < order.steps.length - 1 && (
                          <div className={`w-0.5 h-6 mt-1 ${step.done ? "bg-pink-300" : "bg-gray-100"}`} />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pb-1">
                        <p className={`text-sm font-semibold ${step.done ? "" : "text-gray-400"}`}
                          style={{ color: step.done ? (isActive ? "#e91e8c" : "#1a0a10") : undefined }}>
                          {step.label}
                        </p>
                        {step.date && <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>{step.date}</p>}
                        {!step.done && <p className="text-xs mt-0.5 text-gray-300">Menunggu...</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
