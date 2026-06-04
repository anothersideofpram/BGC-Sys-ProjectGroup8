import { useNavigate } from "react-router-dom";

const monthlyOrders = [
  { month: "Jan", count: 8  },
  { month: "Feb", count: 14 },
  { month: "Mar", count: 11 },
  { month: "Apr", count: 19 },
  { month: "Mei", count: 24 },
  { month: "Jun", count: 18 },
];

const customerStats = [
  { label: "Total Pelanggan",    value: "127",          icon: "👥" },
  { label: "Pelanggan Baru",     value: "23",           icon: "🆕" },
  { label: "Total Transaksi",    value: "Rp 48.750.000", icon: "💰" },
  { label: "Rata-rata Order",    value: "Rp 383.858",   icon: "📊" },
];

const topProducts = [
  { name: "Gaun Cherish",       orders: 34, revenue: 18700000 },
  { name: "Blus Elegance",      orders: 28, revenue: 7980000  },
  { name: "Gaun Midnight",      orders: 21, revenue: 13020000 },
  { name: "Blus Rosé",          orders: 19, revenue: 6080000  },
  { name: "Baju Kurung Klasik", orders: 15, revenue: 6300000  },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");
const maxCount = Math.max(...monthlyOrders.map(m => m.count));

export default function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
          Dashboard Statistik
        </h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>
          Ringkasan performa toko BlackGold Cherish
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {customerStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-6">
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="font-bold text-lg" style={{ color: "#b8860b" }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grafik Pertumbuhan Pesanan */}
        <div className="bg-white rounded-3xl border border-pink-100 p-7">
          <h2 className="font-bold text-lg mb-1" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
            Grafik Pertumbuhan Pesanan
          </h2>
          <p className="text-xs mb-6" style={{ color: "#a07080" }}>6 Bulan Terakhir</p>

          {/* Bar chart */}
          <div className="flex items-end gap-3 h-48 border-b border-pink-100 pb-2 mb-3">
            {monthlyOrders.map((m) => {
              const pct = (m.count / maxCount) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold" style={{ color: "#b8860b" }}>{m.count}</span>
                  <div
                    className="w-full rounded-t-xl transition-all duration-700"
                    style={{
                      height: `${pct}%`,
                      minHeight: 8,
                      background: "linear-gradient(180deg, #e91e8c, #c9a227)",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            {monthlyOrders.map((m) => (
              <div key={m.month} className="flex-1 text-center text-xs" style={{ color: "#a07080" }}>{m.month}</div>
            ))}
          </div>
        </div>

        {/* Top Produk */}
        <div className="bg-white rounded-3xl border border-pink-100 p-7">
          <h2 className="font-bold text-lg mb-1" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
            Produk Terlaris
          </h2>
          <p className="text-xs mb-6" style={{ color: "#a07080" }}>Berdasarkan jumlah pesanan</p>

          <div className="space-y-4">
            {topProducts.map((p, i) => {
              const pct = (p.orders / topProducts[0].orders) * 100;
              return (
                <div key={p.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium" style={{ color: "#1a0a10" }}>
                      <span className="text-xs mr-2" style={{ color: "#b8860b" }}>#{i + 1}</span>{p.name}
                    </span>
                    <span className="font-semibold" style={{ color: "#b8860b" }}>{p.orders} pesanan</span>
                  </div>
                  <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#e91e8c,#c9a227)" }} />
                  </div>
                  <p className="text-xs mt-1 text-right" style={{ color: "#a07080" }}>{toRp(p.revenue)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistik Pelanggan */}
        <div className="bg-white rounded-3xl border border-pink-100 p-7">
          <h2 className="font-bold text-lg mb-1" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
            Statistik Pelanggan & Transaksi
          </h2>
          <p className="text-xs mb-6" style={{ color: "#a07080" }}>Distribusi status pesanan</p>

          <div className="space-y-4">
            {[
              { label: "Pesanan Selesai",    count: 89, pct: 70, color: "#16a34a" },
              { label: "Proses Produksi",   count: 23, pct: 18, color: "#b8860b" },
              { label: "Menunggu Konfirmasi", count: 10, pct: 8, color: "#e91e8c" },
              { label: "Dibatalkan",         count: 5,  pct: 4,  color: "#dc2626" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span style={{ color: "#1a0a10" }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: s.color }}>{s.count} · {s.pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimasi Pendapatan */}
        <div className="bg-white rounded-3xl border border-pink-100 p-7">
          <h2 className="font-bold text-lg mb-1" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
            Estimasi Pendapatan
          </h2>
          <p className="text-xs mb-6" style={{ color: "#a07080" }}>Per bulan (6 bulan terakhir)</p>

          <div className="space-y-3">
            {monthlyOrders.map((m) => {
              const est = m.count * 383858;
              const pct = (est / (maxCount * 383858)) * 100;
              return (
                <div key={m.month} className="flex items-center gap-4">
                  <span className="w-10 text-xs font-semibold" style={{ color: "#a07080" }}>{m.month}</span>
                  <div className="flex-1 h-2.5 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-2.5 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#c9a227,#f0d080)" }} />
                  </div>
                  <span className="text-xs font-semibold w-28 text-right" style={{ color: "#b8860b" }}>{toRp(est)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
