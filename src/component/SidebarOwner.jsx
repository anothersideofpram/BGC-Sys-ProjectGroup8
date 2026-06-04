import { MdDashboard, MdBarChart } from "react-icons/md";
import { TbChartLine, TbUsers } from "react-icons/tb";
import { FiUser, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarOwner() {
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-700 font-semibold border-l-4 border-amber-500"
        : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
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
        <p className="text-xs text-gray-400 mt-1">Owner Panel</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
          Dashboard
        </p>

        <NavLink to="/owner-dashboard" className={menuClass}>
          <MdDashboard className="text-lg shrink-0" />
          Dashboard Statistik
        </NavLink>

        <NavLink to="/owner-grafik" className={menuClass}>
          <TbChartLine className="text-lg shrink-0" />
          Grafik Pertumbuhan
        </NavLink>

        <NavLink to="/owner-statistik" className={menuClass}>
          <TbUsers className="text-lg shrink-0" />
          Statistik Pelanggan
        </NavLink>

        <div className="pt-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Akun
          </p>
          <NavLink to="/akun-owner" className={menuClass}>
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
