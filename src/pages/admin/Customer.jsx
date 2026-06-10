import { useState } from "react";

const customers = [
  { id: 1,  nama: "Sari Dewi",      email: "sari.dewi@email.com",      telepon: "081234567890", kota: "Jakarta Selatan", totalPesanan: 4,  totalBelanja: 3108600, loyalitas: "Gold",   bergabung: "Jan 2024" },
  { id: 2,  nama: "Rina Marlina",   email: "rina.marlina@email.com",    telepon: "082345678901", kota: "Bandung",         totalPesanan: 2,  totalBelanja: 870000,  loyalitas: "Silver", bergabung: "Mar 2024" },
  { id: 3,  nama: "Dewi Anggraini", email: "dewi.a@email.com",          telepon: "083456789012", kota: "Surabaya",        totalPesanan: 6,  totalBelanja: 5240000, loyalitas: "Gold",   bergabung: "Nov 2023" },
  { id: 4,  nama: "Mega Setiawati", email: "mega.s@email.com",          telepon: "084567890123", kota: "Yogyakarta",      totalPesanan: 1,  totalBelanja: 550000,  loyalitas: "Bronze", bergabung: "Mei 2024" },
  { id: 5,  nama: "Laila Rahma",    email: "laila.r@email.com",         telepon: "085678901234", kota: "Medan",           totalPesanan: 3,  totalBelanja: 1760000, loyalitas: "Silver", bergabung: "Feb 2024" },
  { id: 6,  nama: "Putri Nandini",  email: "putri.n@email.com",         telepon: "086789012345", kota: "Semarang",        totalPesanan: 1,  totalBelanja: 320000,  loyalitas: "Bronze", bergabung: "Jun 2024" },
  { id: 7,  nama: "Tari Widiastuti",email: "tari.w@email.com",          telepon: "087890123456", kota: "Makassar",        totalPesanan: 2,  totalBelanja: 940000,  loyalitas: "Silver", bergabung: "Apr 2024" },
  { id: 8,  nama: "Nadia Kusuma",   email: "nadia.k@email.com",         telepon: "088901234567", kota: "Palembang",       totalPesanan: 5,  totalBelanja: 4120000, loyalitas: "Gold",   bergabung: "Agu 2023" },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

const loyaltisBadge = {
  Gold:   { color: "#b8860b", bg: "rgba(184,134,11,.12)",  icon: "🥇" },
  Silver: { color: "#6b7280", bg: "rgba(107,114,128,.12)", icon: "🥈" },
  Bronze: { color: "#92400e", bg: "rgba(146,64,14,.12)",   icon: "🥉" },
};

export default function DataPelanggan() {
  const [search, setSearch] = useState("");
  const [filterLoyalitas, setFilterLoyalitas] = useState("Semua");
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c => {
    const matchSearch =
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.kota.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterLoyalitas === "Semua" || c.loyalitas === filterLoyalitas;
    return matchSearch && matchFilter;
  });

  const totalGold   = customers.filter(c => c.loyalitas === "Gold").length;
  const totalSilver = customers.filter(c => c.loyalitas === "Silver").length;
  const totalBronze = customers.filter(c => c.loyalitas === "Bronze").length;
  const totalOmzet  = customers.reduce((a, c) => a + c.totalBelanja, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
          Data Pelanggan
        </h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>
          Informasi pelanggan dan tingkat loyalitas
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Pelanggan", value: customers.length,      color: "#b8860b" },
          { label: "🥇 Gold",         value: totalGold,             color: "#b8860b" },
          { label: "🥈 Silver",       value: totalSilver,           color: "#6b7280" },
          { label: "Total Omzet",     value: toRp(totalOmzet),      color: "#16a34a" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
            <p className="font-bold text-xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Cari nama, email, atau kota..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-pink-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-pink-400"
            style={{ color: "#1a0a10" }}
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e879a0" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <div className="flex gap-2">
          {["Semua", "Gold", "Silver", "Bronze"].map(f => (
            <button
              key={f}
              onClick={() => setFilterLoyalitas(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filterLoyalitas === f ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600 hover:border-pink-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr style={{ background: "rgba(255,240,246,0.7)", borderBottom: "1px solid #fce7f3" }}>
              {["Pelanggan", "Kontak", "Kota", "Total Pesanan", "Total Belanja", "Loyalitas", "Bergabung"].map(h => (
                <th key={h} className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wide" style={{ color: "#6b4a58" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                  Tidak ada pelanggan yang sesuai.
                </td>
              </tr>
            ) : filtered.map((c, i) => {
              const badge = loyaltisBadge[c.loyalitas];
              return (
                <tr
                  key={c.id}
                  className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors cursor-pointer ${i % 2 ? "bg-[#fffafb]" : ""}`}
                  onClick={() => setSelected(c)}
                >
                  {/* Nama + avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}
                      >
                        {c.nama.charAt(0)}
                      </div>
                      <span className="font-semibold" style={{ color: "#1a0a10" }}>{c.nama}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4" style={{ color: "#6b4a58" }}>
                    <p>{c.email}</p>
                    <p className="text-xs" style={{ color: "#a07080" }}>{c.telepon}</p>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "#6b4a58" }}>{c.kota}</td>
                  <td className="px-5 py-4 text-center font-semibold" style={{ color: "#1a0a10" }}>{c.totalPesanan}</td>
                  <td className="px-5 py-4 font-semibold text-xs" style={{ color: "#b8860b" }}>{toRp(c.totalBelanja)}</td>
                  <td className="px-5 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ color: badge.color, background: badge.bg }}
                    >
                      {badge.icon} {c.loyalitas}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "#a07080" }}>{c.bergabung}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-8" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-pink-50 flex items-center justify-center"
              style={{ color: "#dc143c" }}
            >
              ✕
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
                style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}
              >
                {selected.nama.charAt(0)}
              </div>
              <p className="font-bold text-xl" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>{selected.nama}</p>
              <span
                className="mt-1 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ color: loyaltisBadge[selected.loyalitas].color, background: loyaltisBadge[selected.loyalitas].bg }}
              >
                {loyaltisBadge[selected.loyalitas].icon} {selected.loyalitas}
              </span>
            </div>

            {/* Info grid */}
            <div className="space-y-3">
              {[
                { label: "Email",          value: selected.email },
                { label: "Telepon",        value: selected.telepon },
                { label: "Kota",           value: selected.kota },
                { label: "Bergabung",      value: selected.bergabung },
                { label: "Total Pesanan",  value: `${selected.totalPesanan} pesanan` },
                { label: "Total Belanja",  value: toRp(selected.totalBelanja) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-pink-50 last:border-0">
                  <span className="text-xs font-medium" style={{ color: "#a07080" }}>{label}</span>
                  <span className="text-sm font-semibold" style={{ color: "#1a0a10" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
