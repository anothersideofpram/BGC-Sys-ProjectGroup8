import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerOrn, FloralOrn, Sparkles, GoldDivider, BrandStamp, BotanicalLine } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";
import { getRole } from "../../utils/auth";

const statusConfig = {
  menunggu_konfirmasi: { label: "Menunggu Konfirmasi",  color: "#e91e8c", bg: "rgba(233,30,140,0.10)"  },
  dikonfirmasi:        { label: "Dikonfirmasi",          color: "#0284c7", bg: "rgba(2,132,199,0.10)"  },
  produksi:            { label: "Proses Produksi",       color: "#b8860b", bg: "rgba(184,134,11,0.10)" },
  quality_check:       { label: "Quality Check",         color: "#7c3aed", bg: "rgba(124,58,237,0.10)" },
  siap_kirim:          { label: "Siap Dikirim",           color: "#ea580c", bg: "rgba(234,88,12,0.10)"  },
  dikirim:             { label: "Dikirim",                color: "#0891b2", bg: "rgba(8,145,178,0.10)"  },
  selesai:             { label: "Selesai",                color: "#16a34a", bg: "rgba(22,163,74,0.10)"  },
  dibatalkan:          { label: "Dibatalkan",             color: "#dc2626", bg: "rgba(220,38,38,0.10)"  },
};

const toRp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export default function RiwayatPesanan() {
  const navigate = useNavigate();
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  
  const [buktiFile, setBuktiFile]     = useState(null);
  const [previewUrl, setPreviewUrl]   = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      if (!userId || getRole() === "admin" || getRole() === "owner") {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(nama_produk, jumlah, harga_satuan, ukuran)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) setOrders(data);
      setLoading(false);
    };

    fetchOrders();
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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadBukti = async (orderId) => {
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
        alert("Gagal menyimpan bukti transfer: " + dbErr.message);
      } else {
        alert("Bukti transfer berhasil dikirim!");
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, bukti_transfer: imageUrl } : o));
        setSelected(prev => ({ ...prev, bukti_transfer: imageUrl }));
        setBuktiFile(null);
      }
    } catch (err) {
      alert("Kesalahan saat unggah bukti: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const statKeys = ["menunggu_konfirmasi", "produksi", "dikirim", "selesai"];
  const statLabels = {
    menunggu_konfirmasi: "Menunggu",
    produksi:            "Diproses",
    dikirim:             "Dikirim",
    selesai:             "Selesai",
  };

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

      <div className="px-6 sm:px-10 pb-16">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statKeys.map((key) => (
            <div key={key} className="bg-white rounded-2xl border border-pink-100 px-5 py-4">
              <p className="text-2xl font-bold" style={{ color: statusConfig[key]?.color }}>
                {loading ? "—" : orders.filter(o => o.status_pesanan === key).length}
              </p>
              <p className="text-xs mt-1" style={{ color: "#a07080" }}>{statLabels[key]}</p>
            </div>
          ))}
        </div>

        
        {loading ? (
          <div className="bg-white rounded-3xl border border-pink-100 p-10 animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-pink-50 rounded-xl" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-pink-100 p-16 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-lg font-semibold mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
              Belum ada pesanan
            </p>
            <p className="text-sm mb-6" style={{ color: "#a07080" }}>
              Yuk, mulai pesan produk pilihan Anda!
            </p>
            <button onClick={() => navigate("/koleksi")} className="kol-btn-pesan px-7 py-3 rounded-full text-white text-sm font-semibold">
              Lihat Produk
            </button>
          </div>
        ) : (
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
                  {orders.map((row, i) => {
                    const st = statusConfig[row.status_pesanan] || { label: row.status_pesanan, color: "#6b4a58", bg: "#f9fafb" };
                    const produkNama = row.order_items?.[0]?.nama_produk || "—";
                    const tgl = row.created_at
                      ? new Date(row.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
                      : "—";
                    return (
                      <tr key={row.id} className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-[#fffafb]"}`}>
                        <td className="px-5 py-4 font-mono font-semibold" style={{ color: "#b8860b" }}>
                          #{String(row.id).slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-5 py-4" style={{ color: "#6b4a58" }}>{tgl}</td>
                        <td className="px-5 py-4" style={{ color: "#1a0a10" }}>{produkNama}</td>
                        <td className="px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{toRp(row.total_harga)}</td>
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
        )}

        
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

      
      {selected && (() => {
        const isBank = selected.metode_pembayaran?.toLowerCase().includes("bank");
        const isEwallet = selected.metode_pembayaran?.toLowerCase().includes("ewallet");
        const isCod = selected.metode_pembayaran?.toLowerCase() === "cod";
        
        let sub = "BCA";
        if (selected.metode_pembayaran?.includes("BCA")) sub = "BCA";
        else if (selected.metode_pembayaran?.includes("Mandiri")) sub = "Mandiri";
        else if (selected.metode_pembayaran?.includes("BNI")) sub = "BNI";
        else if (selected.metode_pembayaran?.includes("GoPay")) sub = "GoPay";
        else if (selected.metode_pembayaran?.includes("OVO")) sub = "OVO";
        else if (selected.metode_pembayaran?.includes("Dana")) sub = "Dana";

        return (
          <div className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => { setSelected(null); setBuktiFile(null); }}>
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-mono font-bold text-lg" style={{ color: "#b8860b" }}>
                    #{String(selected.id).slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm" style={{ color: "#a07080" }}>
                    {selected.created_at ? new Date(selected.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
                <button onClick={() => { setSelected(null); setBuktiFile(null); }} className="text-gray-300 hover:text-gray-500 text-2xl">×</button>
              </div>
              {[
                ["Produk",       selected.order_items?.[0]?.nama_produk || "—"],
                ["Ukuran",       selected.order_items?.[0]?.ukuran || "—"],
                ["Metode Bayar", selected.metode_pembayaran || "—"],
                ["Total",        toRp(selected.total_harga)],
                ["Status",       statusConfig[selected.status_pesanan]?.label || selected.status_pesanan],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-pink-50 text-sm">
                  <span style={{ color: "#a07080" }}>{k}</span>
                  <span className="font-semibold" style={{ color: selected.status_pesanan === "dibatalkan" && k === "Status" ? "#dc2626" : "#1a0a10" }}>{v}</span>
                </div>
              ))}
              
              {/* Payment Details and Proof Upload (Only for waiting confirmation and non-COD) */}
              {selected.status_pesanan === "menunggu_konfirmasi" && !isCod && (
                <>
                  <div className="mt-4 p-4 bg-pink-50/50 border border-pink-100/70 rounded-2xl text-xs space-y-2">
                    <p className="font-bold text-slate-800" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {isEwallet ? "📱 Transfer E-Wallet" : "🏦 Transfer Pembayaran"}
                    </p>
                    <div className="flex justify-between items-center bg-white rounded-lg p-2.5 border border-pink-100">
                      <div>
                        <p className="font-semibold text-slate-700">{isEwallet ? "📱" : "🏦"} {sub}</p>
                        <p className="font-mono text-sm font-bold text-amber-600">
                          {sub === "BCA" && "1234567890"}
                          {sub === "Mandiri" && "0987654321"}
                          {sub === "BNI" && "1122334455"}
                          {["GoPay", "OVO", "Dana"].includes(sub) && "08123456789"}
                        </p>
                        <p className="text-[10px] text-gray-400">a.n. BlackGold Cherish</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const no = sub === "BCA" ? "1234567890" : sub === "Mandiri" ? "0987654321" : sub === "BNI" ? "1122334455" : "08123456789";
                          navigator.clipboard.writeText(no);
                          alert(`Nomor ${sub} berhasil disalin!`);
                        }}
                        className="text-[10px] px-2.5 py-1.5 rounded border border-pink-200 text-pink-500 hover:bg-pink-100 transition-colors font-semibold"
                      >
                        Salin
                      </button>
                    </div>
                  </div>

                  {!selected.bukti_transfer ? (
                    <div className="mt-4 p-4 border border-pink-100 rounded-2xl bg-white space-y-3">
                      <p className="font-bold text-slate-800 text-xs">📎 Upload Bukti Transfer</p>
                      <label className="block cursor-pointer">
                        <div className={`border border-dashed rounded-xl p-3 text-center transition-colors ${
                          buktiFile ? "border-pink-400 bg-pink-50/50" : "border-pink-200 hover:border-pink-300"
                        }`}>
                          {buktiFile ? (
                            <div>
                              <p className="text-[11px] font-semibold text-amber-600 truncate">{buktiFile.name}</p>
                              {previewUrl && (
                                <div className="max-w-[120px] mx-auto my-1.5 border border-pink-50 rounded overflow-hidden bg-white shadow-sm">
                                  <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-24 object-contain mx-auto" />
                                </div>
                              )}
                              <p className="text-[9px] text-gray-400">Klik untuk ganti file</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-[11px] text-gray-500">Pilih foto/screenshot bukti transfer</p>
                              <p className="text-[9px] text-gray-400 mt-0.5">JPG, PNG · Maks 5MB</p>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setBuktiFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleUploadBukti(selected.id)}
                        disabled={!buktiFile || isUploading}
                        className="w-full py-2 rounded-xl text-white text-xs font-bold disabled:opacity-50 transition-all cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #e91e8c, #c9a227)" }}
                      >
                        {isUploading ? "Mengunggah..." : "Kirim Bukti Transfer"}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-2xl text-center">
                      <p className="text-xs font-bold text-green-700">✓ Bukti Pembayaran Sudah Diunggah</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Menunggu verifikasi admin</p>
                      <div className="max-w-[120px] mx-auto mt-2 border border-green-100 rounded overflow-hidden bg-white shadow-sm">
                        <a href={selected.bukti_transfer} target="_blank" rel="noreferrer">
                          <img src={selected.bukti_transfer} alt="Bukti Transfer" className="w-full h-auto max-h-24 object-contain mx-auto cursor-pointer hover:opacity-90 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Show proof for other statuses if it exists */}
              {selected.status_pesanan !== "menunggu_konfirmasi" && selected.bukti_transfer && (
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <p className="text-xs font-bold text-slate-600">Bukti Pembayaran Terverifikasi</p>
                  <div className="max-w-[120px] mx-auto mt-2 border border-slate-200 rounded overflow-hidden bg-white shadow-sm">
                    <a href={selected.bukti_transfer} target="_blank" rel="noreferrer">
                      <img src={selected.bukti_transfer} alt="Bukti Transfer" className="w-full h-auto max-h-24 object-contain mx-auto cursor-pointer hover:opacity-90 transition-opacity" />
                    </a>
                  </div>
                </div>
              )}
              
              {selected.status_pesanan === "dibatalkan" && selected.catatan_umum && (
                <div className="mt-4 p-4 rounded-2xl text-xs border" style={{ background: "rgba(220,38,38,0.05)", borderColor: "rgba(220,38,38,0.15)", color: "#dc2626" }}>
                  <p className="font-bold mb-1" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Alasan Pembatalan</p>
                  <p style={{ margin: 0, color: "#7f1d1d", lineHeight: 1.5 }}>
                    {selected.catatan_umum.replace("[DIBATALKAN ADMIN]", "").trim() || "Tidak ada alasan spesifik yang diberikan."}
                  </p>
                </div>
              )}

              {selected.status_pesanan !== "dibatalkan" && (
                <button onClick={() => navigate("/status-produksi")} className="kol-btn-pesan w-full mt-6 py-3 rounded-full text-white text-sm font-semibold">
                  Lihat Status Produksi
                </button>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
