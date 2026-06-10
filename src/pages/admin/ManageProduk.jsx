import { useState } from "react";

const products = [
  {
    id: 1, name: "Blus Elegance", jenis: "Blus", harga: 285000, stok: 12,
    feedback: [
      { user: "Sari D.",   rating: 5, komentar: "Bahannya lembut dan jahitannya rapi. Sangat puas!", tanggal: "10 Mei 2025" },
      { user: "Rina M.",   rating: 4, komentar: "Nyaman dipakai, warna persis seperti foto.", tanggal: "5 Apr 2025" },
    ],
  },
  {
    id: 2, name: "Blus Rosé", jenis: "Blus", harga: 320000, stok: 8,
    feedback: [
      { user: "Dewi A.", rating: 5, komentar: "Cantik banget! Rekomendasi!", tanggal: "2 Mei 2025" },
    ],
  },
  {
    id: 3, name: "Gaun Cherish", jenis: "Gaun", harga: 550000, stok: 5,
    feedback: [
      { user: "Mega S.",  rating: 5, komentar: "Sempurna untuk acara pernikahan, banyak yang memuji!", tanggal: "15 Apr 2025" },
      { user: "Laila R.", rating: 4, komentar: "Kualitas bagus, pengiriman cepat.", tanggal: "8 Apr 2025" },
      { user: "Putri N.", rating: 3, komentar: "Ukuran agak kecil dari ekspektasi.", tanggal: "1 Apr 2025" },
    ],
  },
  { id: 4, name: "Gaun Midnight",      jenis: "Gaun",       harga: 620000, stok: 3,  feedback: [] },
  { id: 5, name: "Baju Kurung Klasik", jenis: "Baju Kurung", harga: 420000, stok: 10, feedback: [] },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");
const avgRating = (fb) => fb.length === 0 ? null : (fb.reduce((a, b) => a + b.rating, 0) / fb.length).toFixed(1);

export default function ManageProduk() {
  const [prodList, setProdList] = useState(products);
  const [addModal, setAddModal] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", jenis: "Blus", harga: "", stok: "" });

  const handleAdd = () => {
    if (!newProd.name || !newProd.harga) return;
    setProdList(prev => [...prev, {
      ...newProd,
      id: Date.now(),
      harga: Number(newProd.harga),
      stok: Number(newProd.stok),
      feedback: [],
    }]);
    setNewProd({ name: "", jenis: "Blus", harga: "", stok: "" });
    setAddModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus produk ini?")) setProdList(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Kelola Produk
          </h1>
          <p className="text-sm mt-1" style={{ color: "#a07080" }}>
            Manajemen data produk BlackGold Cherish
          </p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="kol-btn-pesan px-6 py-3 rounded-full text-white text-sm font-semibold"
        >
          + Tambah Produk
        </button>
      </div>

      {/* Product table */}
      <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr style={{ background: "rgba(255,240,246,0.7)", borderBottom: "1px solid #fce7f3" }}>
              {["Produk", "Jenis", "Harga", "Stok", "Rating", "Aksi"].map(h => (
                <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prodList.map((p, i) => {
              const avg = avgRating(p.feedback);
              return (
                <tr
                  key={p.id}
                  className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors ${i % 2 ? "bg-[#fffafb]" : ""}`}
                >
                  <td className="px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{p.name}</td>
                  <td className="px-5 py-4" style={{ color: "#6b4a58" }}>{p.jenis}</td>
                  <td className="px-5 py-4 font-semibold" style={{ color: "#b8860b" }}>{toRp(p.harga)}</td>
                  <td className="px-5 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        color: p.stok > 5 ? "#16a34a" : p.stok > 0 ? "#b8860b" : "#dc2626",
                        background: p.stok > 5 ? "rgba(22,163,74,.1)" : p.stok > 0 ? "rgba(184,134,11,.1)" : "rgba(220,38,38,.1)",
                      }}
                    >
                      {p.stok} unit
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {avg
                      ? <span className="font-semibold" style={{ color: "#c9a227" }}>★ {avg}</span>
                      : <span className="text-gray-300 text-xs">—</span>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: "#dc2626" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add product modal */}
      {addModal && (
        <div
          className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setAddModal(false)}
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <h3
              className="font-bold text-xl mb-6"
              style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}
            >
              Tambah Produk Baru
            </h3>
            <div className="space-y-4">
              {[
                { label: "Nama Produk", key: "name",  type: "text",   placeholder: "Nama produk..." },
                { label: "Harga (Rp)",  key: "harga", type: "number", placeholder: "285000" },
                { label: "Stok",        key: "stok",  type: "number", placeholder: "10" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={newProd[f.key]}
                    onChange={e => setNewProd({ ...newProd, [f.key]: e.target.value })}
                    className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Jenis</label>
                <select
                  value={newProd.jenis}
                  onChange={e => setNewProd({ ...newProd, jenis: e.target.value })}
                  className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400"
                >
                  {["Blus", "Gaun", "Baju Kurung"].map(j => <option key={j}>{j}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setAddModal(false)}
                className="flex-1 py-3 rounded-full border border-pink-200 text-sm font-semibold text-gray-600 hover:bg-pink-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 kol-btn-pesan py-3 rounded-full text-white text-sm font-semibold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
