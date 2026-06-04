import "./assets/tailwind.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import AdminLayouts from "./layouts/AdminLayouts";
import OwnerLayouts from "./layouts/OwnerLayouts";
import AuthLayout from "./layouts/AuthLayouts";
import LoadingScreen from "./component/LoadingScreen";

/* ── Auth ── */
const Login    = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot   = lazy(() => import("./pages/auth/Forgot"));

/* ── Customer ── */
const LandingPage     = lazy(() => import("./pages/customer/LandingPage"));
const Koleksi         = lazy(() => import("./pages/customer/Koleksi"));
const OrderPage       = lazy(() => import("./pages/customer/OrderPage"));
const RiwayatPesanan  = lazy(() => import("./pages/customer/RiwayatPesanan"));
const StatusProduksi  = lazy(() => import("./pages/customer/StatusProduksi"));
const Feedback        = lazy(() => import("./pages/customer/Feedback"));
const Akun            = lazy(() => import("./pages/customer/Akun"));

/* ── Admin ── */
const Dashboard    = lazy(() => import("./pages/admin/Dashboard"));
const OrdersDetail = lazy(() => import("./pages/admin/OrdersDetail"));
const Customers    = lazy(() => import("./pages/admin/Customer"));
const ManageProduk = lazy(() => import("./pages/admin/ManageProduk"));
const FeedbackAdmin = lazy(() => import("./pages/admin/FeedbackAdmin"));
const AkunAdmin    = lazy(() => import("./pages/admin/AkunAdmin"));

/* ── Owner ── */
const OwnerDashboard = lazy(() => import("./pages/owner/Dashboard"));
const AkunOwner      = lazy(() => import("./pages/owner/AkunOwner"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* CUSTOMER */}
        <Route element={<MainLayout />}>
          <Route path="/"                element={<LandingPage />} />
          <Route path="/koleksi"         element={<Koleksi />} />
          <Route path="/order"           element={<OrderPage />} />
          <Route path="/riwayat"         element={<RiwayatPesanan />} />
          <Route path="/status-produksi" element={<StatusProduksi />} />
          <Route path="/feedback"        element={<Feedback />} />
          <Route path="/akun"            element={<Akun />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayouts />}>
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/orders"         element={<OrdersDetail />} />
          <Route path="/customers"      element={<Customers />} />
          <Route path="/manage-produk"  element={<ManageProduk />} />
          <Route path="/feedback-admin" element={<FeedbackAdmin />} />
          <Route path="/akun-admin"     element={<AkunAdmin />} />
        </Route>

        {/* OWNER */}
        <Route element={<OwnerLayouts />}>
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/akun-owner"       element={<AkunOwner />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
