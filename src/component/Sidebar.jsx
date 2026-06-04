import { MdDashboard, MdInventory2 } from "react-icons/md";
import { TbFileDescription, TbMessageStar } from "react-icons/tb";
import { FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ role = "admin" }) {
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 font-semibold border-l-4 border-pink-500"
        : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
    }`;

  return (
    <div className="flex flex-col w-64 min-h-screen bg-white shadow-md px-5 py-8">
      {/* Brand */}
      <div className="mb-8">
        <div
          className="text-gradient-brand text-xl font-bold"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          BlackGold Cherish
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {role === "admin" ? "Admin Panel" : "Owner Panel"}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
          Menu Utama
        </p>

        <NavLink to="/dashboard" className={menuClass}>
          <MdDashboard className="text-lg shrink-0" />
          Dashboard
        </NavLink>

        <NavLink to="/orders" className={menuClass}>
          <TbFileDescription className="text-lg shrink-0" />
          Detail Pesanan
        </NavLink>

        <NavLink to="/manage-produk" className={menuClass}>
          <MdInventory2 className="text-lg shrink-0" />
          Kelola Produk
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          <FiUsers className="text-lg shrink-0" />
          Data Pelanggan
        </NavLink>

        <NavLink to="/feedback-admin" className={menuClass}>
          <TbMessageStar className="text-lg shrink-0" />
          Pantau Feedback
        </NavLink>

        <div className="pt-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Akun
          </p>
          <NavLink to="/akun-admin" className={menuClass}>
            <FiUser className="text-lg shrink-0" />
            Profil Saya
          </NavLink>
        </div>
      </nav>

      {/* Logout */}
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-all mt-4"
      >
        <FiLogOut className="text-lg shrink-0" />
        Keluar
      </button>

      <p className="text-[10px] text-gray-300 text-center mt-4">
        © 2025 BlackGold Cherish
      </p>
    </div>
  );
}
