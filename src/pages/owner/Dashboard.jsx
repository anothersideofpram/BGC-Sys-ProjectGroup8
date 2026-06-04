import { useNavigate } from "react-router-dom";
import { TbChartLine, TbUsers } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";

const customerStats = [
  { label: "Total Pelanggan", value: "1,240", color: "#e91e8c" },
  { label: "Pelanggan Aktif", value: "842", color: "#b8860b" },
  { label: "Pelanggan Baru (30d)", value: "120", color: "#16a34a" },
  { label: "Rata-rata Pembelian", value: "2.3/bulan", color: "#0891b2" },
];

const topProducts = [
  { name: "Gaun Cherish", orders: 34 },
  { name: "Blus Elegance", orders: 28 },
  { name: "Gaun Midnight", orders: 21 },
];

export default function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {customerStats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all"
          >
            <div className="text-sm text-gray-500 mb-2">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Pertumbuhan Preview */}
        <div
          className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:shadow-lg hover:border-amber-200 transition-all group"
          onClick={() => navigate("/owner-grafik")}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Grafik Pertumbuhan</h3>
              <p className="text-xs text-gray-400 mt-1">
                Tren 6 bulan terakhir
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg group-hover:shadow-md transition-all">
              <TbChartLine size={24} className="text-amber-600" />
            </div>
          </div>

          <div className="h-40 flex items-end gap-2 mb-5">
            {[8, 14, 11, 19, 24, 18].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-amber-400 to-yellow-300"
                style={{ height: `${(v / 24) * 100}%` }}
              />
            ))}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg text-amber-700 font-medium text-sm hover:from-amber-100 hover:to-yellow-100 transition-all">
            <span>Lihat Detail</span>
            <MdArrowOutward size={16} />
          </button>
        </div>

        {/* Statistik Pelanggan Preview */}
        <div
          className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:shadow-lg hover:border-pink-200 transition-all group"
          onClick={() => navigate("/owner-statistik")}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Statistik Pelanggan</h3>
              <p className="text-xs text-gray-400 mt-1">
                Ringkasan metrik pelanggan
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg group-hover:shadow-md transition-all">
              <TbUsers size={24} className="text-pink-600" />
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Pelanggan Aktif</span>
                <span className="font-bold text-pink-600">842</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-gradient-to-r from-pink-400 to-rose-400"
                  style={{ width: "68%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Tingkat Konversi</span>
                <span className="font-bold text-blue-600">28%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{ width: "28%" }}
                />
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg text-pink-700 font-medium text-sm hover:from-pink-100 hover:to-rose-100 transition-all">
            <span>Lihat Detail</span>
            <MdArrowOutward size={16} />
          </button>
        </div>

        {/* Top Produk Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Produk Terlaris</h3>
            <p className="text-xs text-gray-400 mt-1">Top 3 bulan ini</p>
          </div>

          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center text-white text-xs font-bold">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-400">{p.orders} pesanan</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimasi Pendapatan Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Estimasi Pendapatan</h3>
            <p className="text-xs text-gray-400 mt-1">Bulan ini</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Proyeksi Pendapatan</span>
                <span className="font-bold text-green-600">
                  Rp 12.450.000
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-emerald-400"
                  style={{ width: "85%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Rata-rata per Order</span>
                <span className="font-bold text-blue-600">Rp 383.858</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{ width: "65%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}