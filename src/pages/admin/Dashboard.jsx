import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { GoldDivider, FloralOrn, DiamondPattern, BrandStamp } from "../../component/Decorations";

const summaryCards = [
  {
    title: "Total Pesanan",
    value: "75",
    icon: FaShoppingCart,
    bgColor: "bg-blue-100",
    color: "text-blue-600",
    link: "/orders"
  },
  {
    title: "Pesanan Terkirim",
    value: "58",
    icon: FaTruck,
    bgColor: "bg-green-100",
    color: "text-green-600",
    link: "/orders"
  },
  {
    title: "Pesanan Batal",
    value: "5",
    icon: FaBan,
    bgColor: "bg-red-100",
    color: "text-red-600",
    link: "/orders"
  },
  {
    title: "Total Pendapatan",
    value: "Rp 128M",
    icon: FaDollarSign,
    bgColor: "bg-purple-100",
    color: "text-purple-600",
    link: null
  },
];

const quickStats = [
  { label: "Pelanggan Aktif", value: "342", trend: "+8.2%" },
  { label: "Produk Stok Rendah", value: "12", trend: "-3%" },
  { label: "Feedback Baru", value: "24", trend: "+12%" },
  { label: "Pesanan Hari Ini", value: "8", trend: "+5%" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className={`bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-lg transition-all ${
                card.link ? "hover:border-gray-300" : ""
              }`}
              onClick={() => card.link && navigate(card.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`text-lg ${card.color}`} />
                </div>
                {card.link && <MdArrowOutward className="text-gray-300 group-hover:text-gray-600" />}
              </div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <span className="text-xs text-green-600 font-semibold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative separator */}
      <div className="flex items-center gap-4 my-2">
        <FloralOrn size={28} opacity={0.2} />
        <GoldDivider opacity={0.18} className="flex-1" />
        <DiamondPattern opacity={0.12} className="w-16 h-16" />
        <GoldDivider opacity={0.18} className="flex-1" />
        <FloralOrn size={28} opacity={0.2} color="#e91e8c" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all"
          onClick={() => navigate("/orders")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Kelola Pesanan</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaShoppingCart className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lihat dan kelola semua pesanan pelanggan dengan status terkini
          </p>
          <button className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>

        <div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 cursor-pointer hover:shadow-lg hover:border-green-300 transition-all"
          onClick={() => navigate("/manage-produk")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Kelola Produk</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <FaShoppingCart className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tambah, edit, atau hapus produk dari katalog toko Anda
          </p>
          <button className="flex items-center gap-2 text-green-600 font-medium text-sm hover:text-green-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>

        <div
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6 cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all"
          onClick={() => navigate("/feedback-admin")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Pantau Feedback</h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaBan className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lihat review dan feedback pelanggan tentang produk Anda
          </p>
          <button className="flex items-center gap-2 text-purple-600 font-medium text-sm hover:text-purple-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-900">
          <span className="font-bold">💡 Tip:</span> Klik pada setiap item untuk melihat detail dan mengelola data Anda dengan lebih baik.
        </p>
      </div>
    </div>
  );
}
