import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CornerOrn, DiamondPattern } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";

const CART_KEY = "bgc_cart";
const PPN_RATE = 0.11;
const toRp = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export default function OrderPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const incomingProduct = location.state?.product || null;
  const fromCart = !incomingProduct;

  const [cartItems, setCartItems]     = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [form, setForm]               = useState({ nama: "", email: "", telepon: "", alamat: "", payment: "bank", subPayment: "BCA", catatan: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [orderId, setOrderId]         = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buktiFile, setBuktiFile]     = useState(null);
  const [previewUrl, setPreviewUrl]   = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone, setUploadDone]   = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);
  const [copiedId, setCopiedId]       = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      if (userId && userId !== "admin-token" && userId !== "owner-token") {
        const { data: profile } = await supabase
          .from("users")
          .select("nama, email, no_hp, alamat")
          .eq("id", userId)
          .single();

        if (profile) {
          setUserProfile(profile);
          setForm(prev => ({
            ...prev,
            nama:    profile.nama    || "",
            email:   profile.email   || "",
            telepon: profile.no_hp   || "",
            alamat:  profile.alamat  || "",
          }));
        }
      }

      if (incomingProduct) {
        setCartItems([{
          id:       incomingProduct.id,
          name:     incomingProduct.nama_produk,
          price:    Number(incomingProduct.harga),
          jenis:    incomingProduct.categories?.nama_kategori || "—",
          ukuran:   incomingProduct.ukuran || [],
          size:     incomingProduct.ukuran?.[0] || "",
          qty:      1,
          note:     "",
          product:  incomingProduct,
        }]);
      } else {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (savedCart.length > 0) {
          setCartItems(savedCart);
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!buktiFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(buktiFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [buktiFile]);

  const subtotal  = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const ppn       = subtotal * PPN_RATE;
  const total     = subtotal + ppn;
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const syncCart = (items) => {
    if (!incomingProduct) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  };

  const updateItem = (id, field, value) =>
    setCartItems(prev => {
      const next = prev.map(it => it.id === id ? { ...it, [field]: value } : it);
      syncCart(next);
      return next;
    });

  const removeItem = (id) =>
    setCartItems(prev => {
      const next = prev.filter(it => it.id !== id);
      syncCart(next);
      return next;
    });

  const updateQty = (id, delta) =>
    setCartItems(prev => {
      const next = prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it);
      syncCart(next);
      return next;
    });

  
  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.telepon || !form.alamat) {
      setWarningMessage("Mohon lengkapi semua data pemesanan Anda sebelum melanjutkan.");
      return;
    }
    if (cartItems.length === 0) {
      setWarningMessage("Keranjang belanja Anda kosong. Silakan pilih produk terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id
      || localStorage.getItem("userToken")
      || sessionStorage.getItem("userToken");

    
    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id:           userId && userId !== "admin-token" ? userId : null,
        nama_pemesan:      form.nama,
        email:             form.email,
        no_hp:             form.telepon,
        alamat_pengiriman: form.alamat,
        metode_pembayaran: `${form.payment} (${form.subPayment})`,
        subtotal:          subtotal,
        ppn:               ppn,
        total_harga:       total,
        catatan_umum:      form.catatan || null,
        status_pesanan:    "menunggu_konfirmasi",
      })
      .select("id")
      .single();

    if (orderErr || !orderData) {
      setWarningMessage("Gagal membuat pesanan: " + (orderErr?.message || "Kesalahan tidak dikenal"));
      setIsSubmitting(false);
      return;
    }

    const newOrderId = orderData.id;

    
    const itemsPayload = cartItems.map(item => ({
      order_id:        newOrderId,
      product_id:      item.id,
      nama_produk:     item.name,
      kategori_produk: item.jenis,
      ukuran:          item.size || null,
      jumlah:          item.qty,
      harga_satuan:    item.price,
      total_harga:     item.price * item.qty,
      catatan_item:    item.note || null,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);

    if (itemsErr) {
      setWarningMessage("Pesanan dibuat tetapi gagal menyimpan produk pesanan: " + itemsErr.message);
    }

    setIsSubmitting(false);
    setOrderId(newOrderId);
    if (fromCart) {
      localStorage.removeItem(CART_KEY);
    }
    setSubmitted(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadBukti = async () => {
    if (!buktiFile || !orderId) return;
    setIsUploading(true);
    try {
      const ext  = buktiFile.name.split(".").pop();
      const path = `bukti/${orderId}.${ext}`;
      let imageUrl = "";

      const { data: upData, error: upErr } = await supabase.storage
        .from("payment-proofs")
        .upload(path, buktiFile, { upsert: true });

      if (!upErr && upData) {
        const { data: urlData } = supabase.storage.from("payment-proofs").getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      } else {
        console.warn("Storage upload failed, using base64 fallback:", upErr?.message);
        imageUrl = await getBase64(buktiFile);
      }

      const { error: dbErr } = await supabase
        .from("orders")
        .update({ bukti_transfer: imageUrl })
        .eq("id", orderId);

      if (dbErr) {
        setWarningMessage("Gagal menyimpan bukti transfer: " + dbErr.message);
      } else {
        setUploadDone(true);
      }
    } catch (err) {
      setWarningMessage("Kesalahan saat unggah bukti: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const REKENING = [
    { bank: "BCA",    no: "1234567890",  nama: "BlackGold Cherish", logo: "🏦" },
    { bank: "Mandiri", no: "0987654321", nama: "BlackGold Cherish", logo: "🏦" },
    { bank: "BNI",    no: "1122334455",  nama: "BlackGold Cherish", logo: "🏦" },
  ];

  const EWALLET = [
    { bank: "GoPay",  no: "08123456789", nama: "BlackGold Cherish", logo: "📱" },
    { bank: "OVO",    no: "08123456789", nama: "BlackGold Cherish", logo: "📱" },
    { bank: "Dana",   no: "08123456789", nama: "BlackGold Cherish", logo: "📱" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fffafb] px-6 sm:px-10 py-12">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="font-bold text-2xl mb-1" style={{ fontFamily: "var(--font-playfair,serif)", color: "#b8860b" }}>
              Pesanan Diterima!
            </h2>
            <p className="text-sm" style={{ color: "#6b4a58" }}>
              ID Pesanan:{" "}
              <span className="font-mono font-bold">#{String(orderId).slice(0, 8).toUpperCase()}</span>
            </p>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-2xl px-6 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#a07080" }}>Total Pembayaran</p>
            <p className="text-3xl font-extrabold kol-harga-gradient">{toRp(total)}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>
              Metode: {form.payment === "ewallet" ? `E-Wallet (${form.subPayment || "GoPay"})` : `Transfer Bank (${form.subPayment || "BCA"})`}
            </p>
          </div>

          <div className="bg-white border border-pink-100 rounded-2xl p-6">
            <p className="font-bold text-base mb-4" style={{ color: "#1a0a10" }}>
              {form.payment === "ewallet" ? "📱 Transfer E-Wallet" : "🏦 Transfer Bank"}
            </p>

            {/* Quick selector on payment page */}
            <div className="flex gap-2 mb-4">
              {(form.payment === "ewallet" ? ["GoPay", "OVO", "Dana"] : ["BCA", "Mandiri", "BNI"]).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, subPayment: opt }))}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    form.subPayment === opt 
                      ? "bg-pink-500 text-white border-pink-500 shadow-md" 
                      : "border-pink-100 bg-pink-50/50 text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {(form.payment === "ewallet" ? EWALLET : REKENING)
                .filter(r => r.bank === (form.subPayment || (form.payment === "ewallet" ? "GoPay" : "BCA")))
                .map((r) => (
                  <div key={r.bank} className="flex justify-between items-center bg-pink-50 rounded-xl px-4 py-3 border border-pink-100/50">
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#1a0a10" }}>{r.logo} {r.bank}</p>
                      <p className="font-mono text-lg font-bold" style={{ color: "#b8860b" }}>{r.no}</p>
                      <p className="text-xs" style={{ color: "#a07080" }}>a.n. {r.nama}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { 
                        navigator.clipboard.writeText(r.no); 
                        setCopiedId(r.bank);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors font-semibold ${
                        copiedId === r.bank
                          ? "border-green-300 bg-green-50 text-green-600"
                          : "border-pink-200 text-pink-500 hover:bg-pink-100"
                      }`}
                    >
                      {copiedId === r.bank ? "Tersalin ✓" : "Salin"}
                    </button>
                  </div>
                ))}
            </div>
            <p className="text-xs mt-4 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              ⚠️ Harap transfer tepat sesuai nominal. Sertakan ID pesanan sebagai keterangan transfer.
            </p>
          </div>

          {!uploadDone ? (
            <div className="bg-white border border-pink-100 rounded-2xl p-6">
              <p className="font-bold text-base mb-1" style={{ color: "#1a0a10" }}>📎 Upload Bukti Transfer</p>
              <p className="text-xs mb-4" style={{ color: "#a07080" }}>Upload foto/screenshot bukti transfer Anda agar pesanan segera dikonfirmasi.</p>
              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-2xl px-6 py-8 text-center transition-colors ${
                  buktiFile ? "border-pink-400 bg-pink-50" : "border-pink-200 hover:border-pink-300"
                }`}>
                  {buktiFile ? (
                    <>
                      <div className="text-3xl mb-2">🖼️</div>
                      <p className="text-sm font-semibold mb-2" style={{ color: "#b8860b" }}>{buktiFile.name}</p>
                      {previewUrl && (
                        <div className="max-w-xs mx-auto mb-3 border border-pink-100 rounded-lg overflow-hidden shadow-sm bg-white">
                          <img src={previewUrl} alt="Preview Bukti" className="w-full h-auto max-h-48 object-contain mx-auto p-1" />
                        </div>
                      )}
                      <p className="text-xs mt-1" style={{ color: "#a07080" }}>Klik untuk ganti file</p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📤</div>
                      <p className="text-sm font-medium" style={{ color: "#6b4a58" }}>Klik atau drag foto bukti transfer</p>
                      <p className="text-xs mt-1" style={{ color: "#a07080" }}>JPG, PNG, atau PDF · Maks 5MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => setBuktiFile(e.target.files?.[0] || null)}
                />
              </label>
              <button
                type="button"
                onClick={handleUploadBukti}
                disabled={!buktiFile || isUploading}
                className="mt-4 w-full py-3 rounded-full text-white text-sm font-bold disabled:opacity-50 transition-all cursor-pointer"
                style={{ background: "linear-gradient(135deg, #e91e8c, #c9a227)" }}
              >
                {isUploading ? "Mengunggah..." : "Kirim Bukti Transfer"}
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold text-base" style={{ color: "#16a34a" }}>Bukti Transfer Diterima!</p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Tim kami akan segera memverifikasi pembayaran Anda.</p>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate("/riwayat")} className="flex-1 kol-btn-pesan py-3 rounded-full text-white text-sm font-semibold">
              Lihat Riwayat
            </button>
            <button onClick={() => navigate("/koleksi")} className="flex-1 btn-outline-cherry py-3 rounded-full text-sm font-semibold" style={{ color: "#8b4050" }}>
              Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <DiamondPattern className="absolute left-1/2 bottom-0" opacity={0.1} />
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Pre-Order
        </h1>
        <p className="text-sm relative z-10" style={{ color: "#6b4a58" }}>
          {itemCount} item · Total sementara {toRp(total)}
        </p>
      </div>

      <div className="px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        
        <div>
          <h2 className="font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Item Pesanan
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-4">Keranjang kosong</p>
              <button onClick={() => navigate("/koleksi")} className="kol-btn-pesan px-8 py-3 rounded-full text-white text-sm font-semibold">
                Lihat Koleksi
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-pink-100 rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "#1a0a10" }}>{item.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>{item.jenis}</p>
                      <p className="kol-harga-gradient font-bold text-lg mt-1">{toRp(item.price)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-2xl text-gray-300 hover:text-red-400 transition-colors">×</button>
                  </div>

                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium" style={{ color: "#2a1a1f" }}>Jumlah:</span>
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors flex items-center justify-center">−</button>
                    <span className="font-semibold w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, +1)} className="w-8 h-8 rounded-full border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors flex items-center justify-center">+</button>
                    <span className="text-sm ml-auto font-semibold" style={{ color: "#b8860b" }}>
                      = {toRp(item.price * item.qty)}
                    </span>
                  </div>

                  
                  {item.ukuran?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Ukuran</p>
                      <div className="flex flex-wrap gap-2">
                        {item.ukuran.map((s) => (
                          <button key={s} onClick={() => updateItem(item.id, "size", s)}
                            className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-all ${
                              item.size === s ? "bg-pink-500 text-white border-pink-500" : "border-pink-200 text-gray-600 bg-white hover:border-pink-400"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  
                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Catatan item (opsional)</p>
                    <textarea rows={2} value={item.note} onChange={(e) => updateItem(item.id, "note", e.target.value)}
                      placeholder="Misal: warna khusus, permintaan tambahan..."
                      className="w-full border border-pink-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {cartItems.length > 0 && (
            <div className="mt-6 bg-white border border-pink-100 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-5" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                Ringkasan Pesanan
              </h3>
              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between" style={{ color: "#6b4a58" }}>
                    <span>{item.name} ×{item.qty}</span>
                    <span>{toRp(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-pink-100 pt-3 flex justify-between" style={{ color: "#6b4a58" }}>
                  <span>Subtotal</span><span>{toRp(subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "#6b4a58" }}>
                  <span>PPN (11%)</span><span>{toRp(ppn)}</span>
                </div>
                <div className="border-t border-pink-200 pt-3 flex justify-between font-bold text-base" style={{ color: "#1a0a10" }}>
                  <span>Total</span>
                  <span className="kol-harga-gradient text-lg">{toRp(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        
        <div className="bg-white border border-pink-100 rounded-3xl p-8 h-fit">
          <h2 className="font-bold text-2xl mb-7" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Informasi Pemesanan
          </h2>

          <div className="space-y-5">
            {[
              { label: "Nama Lengkap", key: "nama",    type: "text",  placeholder: "Masukkan nama lengkap" },
              { label: "Email",        key: "email",   type: "email", placeholder: "email@example.com" },
              { label: "No. Telepon",  key: "telepon", type: "tel",   placeholder: "08xxxxxxxxxx" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>{label}</label>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-pink-400 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Alamat Pengiriman</label>
              <textarea rows={3} placeholder="Masukkan alamat lengkap" value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: "#2a1a1f" }}>Metode Pembayaran</label>
              <div className="space-y-3">
                {[
                  { id: "bank",    label: "Transfer Bank",         desc: "BCA · Mandiri · BNI" },
                  { id: "ewallet", label: "E-Wallet",              desc: "GoPay · OVO · Dana" },
                ].map((pay) => {
                  const isSelected = form.payment === pay.id;
                  return (
                    <div key={pay.id} className="space-y-2">
                      <button key={pay.id} type="button" 
                        onClick={() => {
                          setForm({ 
                            ...form, 
                            payment: pay.id, 
                            subPayment: pay.id === "bank" ? "BCA" : pay.id === "ewallet" ? "GoPay" : "" 
                          });
                        }}
                        className={`w-full border rounded-2xl p-4 flex items-start gap-4 text-left transition-all cursor-pointer ${
                          isSelected ? "border-pink-400 bg-pink-50" : "border-pink-100 hover:border-pink-200"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                          isSelected ? "bg-pink-500 border-pink-500" : "border-gray-300"
                        }`} />
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>{pay.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>{pay.desc}</p>
                        </div>
                      </button>

                      {/* Sub options for bank */}
                      {isSelected && pay.id === "bank" && (
                        <div className="pl-9 grid grid-cols-3 gap-2 py-1">
                          {["BCA", "Mandiri", "BNI"].map(b => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setForm({ ...form, subPayment: b })}
                              className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                form.subPayment === b 
                                  ? "bg-pink-100 border-pink-400 text-pink-700 shadow-sm" 
                                  : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Sub options for ewallet */}
                      {isSelected && pay.id === "ewallet" && (
                        <div className="pl-9 grid grid-cols-3 gap-2 py-1">
                          {["GoPay", "OVO", "Dana"].map(ew => (
                            <button
                              key={ew}
                              type="button"
                              onClick={() => setForm({ ...form, subPayment: ew })}
                              className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                form.subPayment === ew 
                                  ? "bg-pink-100 border-pink-400 text-pink-700 shadow-sm" 
                                  : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
                              }`}
                            >
                              {ew}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            
            {cartItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm">
                <p className="font-semibold mb-1" style={{ color: "#92600a" }}>⏱ Estimasi Waktu Produksi</p>
                <p style={{ color: "#7a5200" }}>
                  {itemCount} item · estimasi{" "}
                  <strong>
                    {cartItems[0]?.product?.estimasi_min_hari ?? 7}–{cartItems[0]?.product?.estimasi_max_hari ?? 14} hari kerja
                  </strong>
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Catatan Umum (opsional)</label>
              <textarea rows={3} placeholder="Catatan tambahan untuk seluruh pesanan" value={form.catatan}
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full py-4 rounded-full text-white text-sm font-bold tracking-wide transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c9a227)", fontFamily: "var(--font-cinzel,serif)" }}
            >
              {isSubmitting ? "Memproses..." : `Kirim Pre-Order · ${toRp(total)}`}
            </button>
          </div>
        </div>
      </div>
      {warningMessage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-alert-fade"
          onClick={() => setWarningMessage(null)}
        >
          <style>{`
            @keyframes alert-fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes alert-scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .animate-alert-fade { animation: alert-fadeIn 0.2s ease-out forwards; }
            .animate-alert-scale { animation: alert-scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          `}</style>
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-pink-100 animate-alert-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 animate-bounce">
              ⚠️
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
              Informasi Pemesanan
            </h3>
            <p className="text-xs mb-6 leading-relaxed" style={{ color: "#6b4a58" }}>
              {warningMessage}
            </p>
            <button
              onClick={() => setWarningMessage(null)}
              className="w-full py-3 rounded-full text-white text-xs font-bold transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-md"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c9a227)" }}
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
