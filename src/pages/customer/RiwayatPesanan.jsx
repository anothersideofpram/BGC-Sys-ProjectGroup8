import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CornerOrn, FloralOrn, Sparkles, GoldDivider, BrandStamp, BotanicalLine } from "../../component/Decorations";

const statusConfig = {
  selesai:   { label: "Selesai",           color: "#16a34a", bg: "rgba(22,163,74,0.10)" },
  produksi:  { label: "Proses Produksi",   color: "#b8860b", bg: "rgba(184,134,11,0.10)" },
  menunggu:  { label: "Menunggu Konfirmasi",color: "#e91e8c", bg: "rgba(233,30,140,0.10)" },
  dikirim:   { label: "Dikirim",           color: "#0284c7", bg: "rgba(2,132,199,0.10)" },
};

const dummy = [
  { id: "ORD-001", tanggal: "12 Mei 2025",  produk: "Blus Elegance × 1",        total: 544500,  status: "selesai",  ukuran: "M", metode: "Transfer Bank" },
  { id: "ORD-002", tanggal: "28 Apr 2025",  produk: "Gaun Cherish × 1",         total: 1387500, status: "dikirim",  ukuran: "L", metode: "E-Wallet" },
  { id: "ORD-003", tanggal: "15 Apr 2025",  produk: "Blus Rosé × 2",            total: 710400,  status: "produksi", ukuran: "S", metode: "Transfer Bank" },
  { id: "ORD-004", tanggal: "02 Apr 2025",  produk: "Baju Kurung Klasik × 1",   total: 466200,  status: "menunggu", ukuran: "M", metode: "COD" },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

export default function RiwayatPesanan() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <Sparkles className="absolute left-1/2 bottom-0" opacity={0.12} />
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Riwayat Pesanan
        </h1>
        <p className="text-sm relative z-10" style={{ color: "#6b4a58" }}>
          Semua pesanan yang pernah Anda lakukan
        </p>
      </div>

      {/* TABEL */}
      <div className="px-6 sm:px-10 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="bg-white rounded-2xl border border-pink-100 px-5 py-4">
              <p className="text-2xl font-bold" style={{ color: cfg.color }}>
                {dummy.filter(d => d.status === key).length}
              </p>
              <p className="text-xs mt-1" style={{ color: "#a07080" }}>{cfg.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr style={{ background: "rgba(255,240,246,0.7)", borderBottom: "1px solid #fce7f3" }}>
                {["No. Pesanan", "Tanggal", "Produk", "Total", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dummy.map((row, i) => {
                const st = statusConfig[row.status];
                return (
                  <tr key={row.id} className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-[#fffafb]"}`}>
                    <td className="px-5 py-4 font-mono font-semibold" style={{ color: "#b8860b" }}>{row.id}</td>
                    <td className="px-5 py-4" style={{ color: "#6b4a58" }}>{row.tanggal}</td>
                    <td className="px-5 py-4" style={{ color: "#1a0a10" }}>{row.produk}</td>
                    <td className="px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{toRp(row.total)}</td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: st.color, background: st.bg }}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSelected(row)} className="text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: "#e91e8c" }}>
                        Detail →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>

        {/* Decorative footer area */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <BotanicalLine width={280} opacity={0.2} />
          <div className="flex items-center gap-6">
            <FloralOrn size={32} opacity={0.15} color="#e91e8c" />
            <BrandStamp opacity={0.15} />
            <FloralOrn size={32} opacity={0.15} />
          </div>
          <GoldDivider opacity={0.2} className="w-64" />
        </div>
      </div>

      {selected && (
        <div className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-mono font-bold text-lg" style={{ color: "#b8860b" }}>{selected.id}</p>
                <p className="text-sm" style={{ color: "#a07080" }}>{selected.tanggal}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-500 text-2xl">×</button>
            </div>
            {[
              ["Produk",   selected.produk],
              ["Ukuran",   selected.ukuran],
              ["Metode",   selected.metode],
              ["Total",    toRp(selected.total)],
              ["Status",   statusConfig[selected.status].label],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 border-b border-pink-50 text-sm">
                <span style={{ color: "#a07080" }}>{k}</span>
                <span className="font-semibold" style={{ color: "#1a0a10" }}>{v}</span>
              </div>
            ))}
            <button onClick={() => navigate("/status-produksi")} className="kol-btn-pesan w-full mt-6 py-3 rounded-full text-white text-sm font-semibold">
              Lihat Status Produksi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
