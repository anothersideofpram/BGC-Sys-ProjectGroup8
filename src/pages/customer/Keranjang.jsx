import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cartItemsDummy = [
  {
    id: 1,
    name: "Elegant Teal Blouse",
    price: 450000,
    size: "M",
    note: "",
  },
  {
    id: 2,
    name: "Maroon Evening Gown",
    price: 1250000,
    size: "L",
    note: "",
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

export default function Keranjang() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(cartItemsDummy);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    payment: "bank",
    catatan: "",
  });

  const subtotal = cartItems.reduce((a, b) => a + b.price, 0);
  const ppn = subtotal * 0.11;
  const total = subtotal + ppn;

  const updateItem = (id, field, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    alert("Pre-order berhasil dikirim!");
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 text-3xl text-[#1a0a10]"
          >
            ←
          </button>

          <h1 className="text-5xl font-bold text-pink-500 mb-2">
            Pre-Order Sistem
          </h1>

          <p className="text-[#7c6470] text-sm">
            Lengkapi formulir di bawah ini untuk melakukan pre-order
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1a0a10]">
              Item Pre-Order
            </h2>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fff7fa] border border-pink-100 rounded-3xl p-7"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-2xl font-semibold text-[#1a0a10]">
                        {item.name}
                      </h3>

                      <p className="text-pink-500 text-xl mt-1">
                        {toRp(item.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-3xl text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>

                  {/* SIZE */}
                  <div className="mb-5">
                    <p className="font-medium mb-3 text-[#2a1a1f]">
                      Pilih Ukuran
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            updateItem(item.id, "size", size)
                          }
                          className={`w-14 h-14 rounded-2xl border text-lg font-semibold transition-all ${
                            item.size === size
                              ? "bg-pink-500 text-white border-pink-500"
                              : "border-pink-200 text-[#1a0a10] bg-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* NOTE */}
                  <div>
                    <p className="font-medium mb-3 text-[#2a1a1f]">
                      Feedback / Catatan untuk item ini
                    </p>

                    <textarea
                      rows={3}
                      value={item.note}
                      onChange={(e) =>
                        updateItem(item.id, "note", e.target.value)
                      }
                      placeholder="Tambahkan catatan khusus untuk item ini..."
                      className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-pink-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 bg-white border border-pink-100 rounded-3xl p-7">
              <h3 className="text-3xl font-bold mb-7 text-[#1a0a10]">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span className="text-[#6b4a58]">Subtotal</span>
                  <span>{toRp(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6b4a58]">PPN (11%)</span>
                  <span>{toRp(ppn)}</span>
                </div>

                <div className="border-t border-pink-100 pt-5 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-pink-500">{toRp(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white border border-pink-100 rounded-3xl p-8 h-fit">
            <h2 className="text-4xl font-bold mb-8 text-[#1a0a10]">
              Informasi Pemesanan
            </h2>

            <div className="space-y-6">
              {/* nama */}
              <div>
                <label className="block mb-2 font-medium">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
                  value={form.nama}
                  onChange={(e) =>
                    setForm({ ...form, nama: e.target.value })
                  }
                />
              </div>

              {/* email */}
              <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              {/* phone */}
              <div>
                <label className="block mb-2 font-medium">
                  Nomor Telepon
                </label>

                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
                  value={form.telepon}
                  onChange={(e) =>
                    setForm({ ...form, telepon: e.target.value })
                  }
                />
              </div>

              {/* alamat */}
              <div>
                <label className="block mb-2 font-medium">
                  Alamat Lengkap
                </label>

                <textarea
                  rows={4}
                  placeholder="Masukkan alamat lengkap untuk pengiriman"
                  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-pink-400"
                  value={form.alamat}
                  onChange={(e) =>
                    setForm({ ...form, alamat: e.target.value })
                  }
                />
              </div>

              {/* pembayaran */}
              <div>
                <label className="block mb-4 font-medium text-xl">
                  Metode Pembayaran
                </label>

                <div className="space-y-4">
                  {[
                    {
                      id: "bank",
                      title: "Transfer Bank",
                      desc: "BCA, Mandiri, BNI",
                    },
                    {
                      id: "ewallet",
                      title: "E-Wallet",
                      desc: "GoPay, OVO, Dana",
                    },
                    {
                      id: "cod",
                      title: "COD (Cash on Delivery)",
                      desc: "Bayar saat barang diterima",
                    },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      onClick={() =>
                        setForm({ ...form, payment: pay.id })
                      }
                      className={`w-full border rounded-2xl p-5 flex items-start gap-4 text-left transition-all ${
                        form.payment === pay.id
                          ? "border-pink-400 bg-pink-50"
                          : "border-pink-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border mt-1 ${
                          form.payment === pay.id
                            ? "bg-cyan-400 border-cyan-400"
                            : "border-gray-400"
                        }`}
                      />

                      <div>
                        <p className="font-semibold text-lg">
                          {pay.title}
                        </p>

                        <p className="text-[#6b4a58]">{pay.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* catatan */}
              <div>
                <label className="block mb-2 font-medium">
                  Catatan Umum (Opsional)
                </label>

                <textarea
                  rows={4}
                  placeholder="Tambahkan catatan umum untuk pesanan Anda"
                  className="w-full border border-pink-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-pink-400"
                  value={form.catatan}
                  onChange={(e) =>
                    setForm({ ...form, catatan: e.target.value })
                  }
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                className="w-full py-5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xl font-semibold transition-all"
              >
                Kirim Pre-Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}