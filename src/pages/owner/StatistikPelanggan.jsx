import React from "react";
import { TbUsers } from "react-icons/tb";

const customerMetrics = [
  {
    label: "Total Pelanggan",
    value: "1,240",
    color: "#e91e8c",
    trend: "+8.2%",
  },
  {
    label: "Pelanggan Aktif (30d)",
    value: "842",
    color: "#b8860b",
    trend: "+12.5%",
  },
  {
    label: "Pelanggan Baru (30d)",
    value: "120",
    color: "#16a34a",
    trend: "+15.3%",
  },
  { label: "Pelanggan Repeat", value: "486", color: "#0891b2", trend: "+5.8%" },
];

const orderStatus = [
  { label: "Pesanan Selesai", count: 89, pct: 70, color: "#16a34a" },
  { label: "Proses Produksi", count: 23, pct: 18, color: "#b8860b" },
  { label: "Menunggu Konfirmasi", count: 10, pct: 8, color: "#e91e8c" },
  { label: "Dibatalkan", count: 5, pct: 4, color: "#dc2626" },
];

const topCustomers = [
  { name: "Siti Nurhaliza", orders: 12, spent: 4560000 },
  { name: "Anita Wijaya", orders: 10, spent: 3830000 },
  { name: "Diana Kusuma", orders: 9, spent: 3450000 },
  { name: "Rini Marlena", orders: 8, spent: 3070000 },
  { name: "Bunga Sari", orders: 7, spent: 2690000 },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

export default function StatistikPelanggan() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg">
            <TbUsers size={24} className="text-pink-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Statistik Pelanggan
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Analisis mendalam metrik dan perilaku pelanggan
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {customerMetrics.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all"
          >
            <p className="text-xs text-gray-400 mb-2">{m.label}</p>

            <div className="flex items-end justify-between gap-2">
              <div className="text-3xl font-bold" style={{ color: m.color }}>
                {m.value}
              </div>

              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                {m.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Status Pesanan
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Breakdown pesanan berdasarkan status
          </p>

          <div className="space-y-4">
            {orderStatus.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">{s.label}</span>
                  <span className="font-bold" style={{ color: s.color }}>
                    {s.count} · {s.pct}%
                  </span>
                </div>

                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{ width: `${s.pct}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-1">Total Pesanan: 127</p>
            <p className="text-xs text-gray-500">Data diperbarui hari ini</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Pelanggan Teratas
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            5 pelanggan dengan transaksi terbanyak
          </p>

          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-xs font-bold">
                  #{i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {c.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {c.orders} pesanan · {toRp(c.spent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Perilaku Pembelian
          </h2>
          <p className="text-sm text-gray-400 mb-6">Pola transaksi pelanggan</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Rata-rata Pembelian/Bulan</span>
                <span className="font-bold text-blue-600">2.3</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Nilai Rata-rata Transaksi</span>
                <span className="font-bold text-green-600">Rp 383.858</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-emerald-400"
                  style={{ width: "55%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Tingkat Retensi</span>
                <span className="font-bold text-purple-600">39%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-purple-400 to-pink-400"
                  style={{ width: "39%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Insights Pelanggan
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Rekomendasi dan saran actionable
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="text-xs font-bold text-green-700 mb-1">
                ✓ Pertumbuhan Positif
              </p>
              <p className="text-xs text-green-600">
                Pelanggan baru naik 15.3% dalam 30 hari terakhir
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
              <p className="text-xs font-bold text-amber-700 mb-1">
                ⚠️ Perhatian
              </p>
              <p className="text-xs text-amber-600">
                Tingkat retensi 39%, pertimbangkan program loyalitas
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <p className="text-xs font-bold text-blue-700 mb-1">
                💡 Rekomendasi
              </p>
              <p className="text-xs text-blue-600">
                Fokus pada follow-up 5 pelanggan top untuk retention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
