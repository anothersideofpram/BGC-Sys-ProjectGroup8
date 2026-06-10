const order = {
  id: "#ORD-0091",
  date: "23 April 2025 · 12:34 WIB",
  status: "processing",
  method: "Dine-in",
  table: "Meja 3",
  cashier: "Rini Agustina",
  payment: "QRIS",
  note: "Pelanggan minta nasi goreng tidak pedas, dan es teh tanpa gula.",
  customer: {
    name: "Andi Pratama",
    phone: "+62 812-3456-7890",
    email: "andi@email.com",
    visits: 14,
    totalSpend: "Rp 890.000",
  },
  items: [
    { icon: "🍳", name: "Nasi Goreng Spesial", category: "Main Course", qty: 1, price: 25000 },
    { icon: "🍵", name: "Es Teh Manis", category: "Minuman", qty: 2, price: 8000 },
    { icon: "🍤", name: "Kerupuk Udang", category: "Pelengkap", qty: 1, price: 4000 },
  ],
};

const statusConfig = {
  processing: { label: "Sedang Diproses", className: "bg-blue-100 text-blue-700" },
  pending:    { label: "Pending",          className: "bg-yellow-100 text-yellow-700" },
  completed:  { label: "Selesai",          className: "bg-green-100 text-green-700" },
  cancelled:  { label: "Dibatalkan",       className: "bg-red-100 text-red-700" },
};

const timeline = [
  { label: "Pesanan Diterima",        time: "12:34 WIB", state: "done" },
  { label: "Pembayaran Dikonfirmasi", time: "12:35 WIB", state: "done" },
  { label: "Sedang Dimasak",          time: "12:37 WIB", state: "active" },
  { label: "Siap Disajikan",          time: "Menunggu...", state: "pending" },
  { label: "Pesanan Selesai",         time: "Menunggu...", state: "pending" },
];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

export default function OrderDetail() {
  const subtotal = order.items.reduce((a, i) => a + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  const st = statusConfig[order.status];

  return (
    <div id="order-detail-container" className="p-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Orders Detail</h1>
          <p className="text-gray-500 text-sm mt-1">Detail lengkap informasi pesanan pelanggan.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-600 hover:bg-gray-50">
          ← Kembali ke Order List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div>
          {/* Order Meta */}
          <div className="bg-white rounded-xl p-5 shadow-sm mb-5">
            <div className="flex justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Order ID</p>
                <p className="text-2xl font-extrabold text-indigo-500">{order.id}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${st.className}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />{st.label}
                </span>
                <span className="text-xs text-gray-400">📅 {order.date}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                ["Metode Pesanan", `🍽️ ${order.method}`],
                ["Nomor Meja", order.table],
                ["Kasir", order.cashier],
                ["Metode Bayar", `💳 ${order.payment}`],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="font-semibold text-slate-700">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm mb-5">
            <p className="font-bold mb-4 text-sm">🧾 Item Pesanan</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Menu","Qty","Harga","Subtotal"].map((h, i) => (
                    <th key={h} className={`pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wide ${i > 0 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.name} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg">{item.icon}</div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-semibold">{item.qty}</td>
                    <td className="py-3 text-right text-gray-500">{fmt(item.price)}</td>
                    <td className="py-3 text-right font-bold">{fmt(item.price * item.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 border-t border-gray-100 pt-3 space-y-1">
              {[["Subtotal", fmt(subtotal)], ["Diskon", "- Rp 0"], ["Pajak (11%)", fmt(tax)]].map(([k, v]) => (
                <div key={k} className="flex justify-between px-1 text-sm text-gray-500"><span>{k}</span><span>{v}</span></div>
              ))}
              <div className="flex justify-between px-1 py-2 border-t border-gray-100 font-bold text-base">
                <span>Total Pembayaran</span>
                <span className="text-indigo-500">{fmt(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-5">
            <p className="font-bold text-sm mb-2">📝 Catatan Pesanan</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">⚠️ {order.note}</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="font-bold text-sm mb-4">⏱️ Status Pesanan</p>
            <div className="relative">
              {timeline.map((t, i) => (
                <div key={t.label} className="flex gap-3 pb-5 last:pb-0 relative">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gray-100" />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10
                    ${t.state === "done" ? "bg-green-100 text-green-600" : t.state === "active" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                    {t.state === "done" ? "✓" : t.state === "active" ? "⚙" : "○"}
                  </div>
                  <div className="pt-1">
                    <p className={`font-semibold ${t.state === "active" ? "text-blue-600" : t.state === "pending" ? "text-gray-400" : "text-slate-700"}`}>{t.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Customer */}
          <div className="bg-white rounded-xl p-5 shadow-sm mb-5">
            <p className="font-bold text-sm mb-4">👤 Informasi Pelanggan</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                {order.customer.name[0]}
              </div>
              <div>
                <p className="font-bold">{order.customer.name}</p>
                <p className="text-xs text-gray-400">Pelanggan Tetap ⭐</p>
              </div>
            </div>
            {[
              ["No. Telepon", order.customer.phone],
              ["Email", order.customer.email],
              ["Total Kunjungan", `${order.customer.visits} kali`],
              ["Total Belanja", order.customer.totalSpend],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{k}</span>
                <span className={`font-semibold text-sm ${k === "Total Belanja" ? "text-emerald-600" : "text-slate-700"}`}>{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm mb-5 space-y-2">
            <p className="font-bold text-sm mb-3">⚡ Aksi Pesanan</p>
            <button className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm">✓ Tandai Selesai</button>
            <button className="w-full py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold text-sm">Update Status</button>
            <button className="w-full py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold text-sm">Cetak Struk</button>
            <button className="w-full py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm">🗑 Batalkan Pesanan</button>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="font-bold text-sm mb-3">💳 Ringkasan Pembayaran</p>
            {[
              ["Metode", "QRIS"],
              ["Status Bayar", "✅ Lunas"],
              ["Total Dibayar", fmt(total)],
              ["Waktu Bayar", "12:35 WIB"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{k}</span>
                <span className={`font-semibold text-sm ${k === "Total Dibayar" ? "text-indigo-500 text-base" : "text-slate-700"}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}