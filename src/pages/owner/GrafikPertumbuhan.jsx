import React from "react";
import { TbTrendingUp } from "react-icons/tb";

const monthlyOrders = [
  { month: "Jan", count: 8  },
  { month: "Feb", count: 14 },
  { month: "Mar", count: 11 },
  { month: "Apr", count: 19 },
  { month: "Mei", count: 24 },
  { month: "Jun", count: 18 },
];

const maxCount = Math.max(...monthlyOrders.map(m => m.count));
const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

export default function GrafikPertumbuhan() {
  const totalOrders = monthlyOrders.reduce((sum, m) => sum + m.count, 0);
  const avgOrders = (totalOrders / monthlyOrders.length).toFixed(0);
  const maxOrder = Math.max(...monthlyOrders.map(m => m.count));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg">
            <TbTrendingUp size={24} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Grafik Pertumbuhan</h1>
            <p className="text-sm text-gray-400 mt-1">Analisis mendalam tren pertumbuhan 6 bulan terakhir</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Total Pesanan</p>
          <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% dari bulan lalu</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Rata-rata Per Bulan</p>
          <p className="text-3xl font-bold text-amber-600">{avgOrders}</p>
          <p className="text-xs text-gray-400 mt-2">Pesanan/bulan</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Puncak Penjualan</p>
          <p className="text-3xl font-bold text-pink-600">{maxOrder}</p>
          <p className="text-xs text-gray-400 mt-2">Pesanan (Mei)</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
        <h2 className="font-bold text-lg mb-2 text-gray-800">Pesanan Per Bulan</h2>
        <p className="text-sm text-gray-400 mb-6">Tren pesanan masuk selama 6 bulan</p>

        {/* Bar Chart */}
        <div className="flex items-end gap-2 h-56 border-b border-gray-100 pb-4 mb-6">
          {monthlyOrders.map((m) => {
            const pct = (m.count / maxCount) * 100;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-600">{m.count}</span>
                <div
                  className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer group"
                  style={{
                    height: `${pct}%`,
                    minHeight: 12,
                    background: "linear-gradient(180deg, #f59e0b, #fbbf24)",
                  }}
                  title={`${m.month}: ${m.count} pesanan`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {monthlyOrders.map((m) => (
            <div key={m.month} className="flex-1 text-center text-xs font-medium text-gray-600">{m.month}</div>
          ))}
        </div>
      </div>

      {/* Revenue Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">Proyeksi Pendapatan</h2>
          <p className="text-sm text-gray-400 mb-6">Estimasi berdasarkan rata-rata pesanan</p>

          <div className="space-y-4">
            {monthlyOrders.map((m) => {
              const est = m.count * 383858;
              const pct = (est / (maxCount * 383858)) * 100;
              return (
                <div key={m.month}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">{m.month}</span>
                    <span className="font-bold text-amber-600">{toRp(est)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Insights */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">Insights Pertumbuhan</h2>
          <p className="text-sm text-gray-400 mb-6">Analisis tren dan rekomendasi</p>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="text-xs font-bold text-green-700 mb-1">✓ Pertumbuhan Positif</p>
              <p className="text-xs text-green-600">Pesanan bulan ini naik 33% dibanding bulan kemarin</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <p className="text-xs font-bold text-blue-700 mb-1">📊 Konsistensi Baik</p>
              <p className="text-xs text-blue-600">Pesanan konsisten di atas 10 setiap bulannya</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
              <p className="text-xs font-bold text-amber-700 mb-1">⚡ Peluang Optimasi</p>
              <p className="text-xs text-amber-600">Kampanye di April meningkatkan pesanan 73% YoY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
