import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-page">
      {/* Floating orbs */}
      <div className="auth-orb1 absolute rounded-full blur-3xl animate-float-orb" />
      <div className="auth-orb2 absolute rounded-full blur-3xl animate-float-orb" />
      <div className="auth-orb3 absolute rounded-full blur-3xl animate-float-orb" />

      <div className="auth-container">
        {/* Brand header */}
        <div className="auth-header">
          <h1 className="auth-brand text-gradient-brand">
            BlackGold Cherish
          </h1>

          <div className="auth-divider" />

          <p className="auth-tagline">
            ✨ Temukan keindahan dalam setiap momen berharga ✨
          </p>
        </div>

        {/* Form card */}
        <div className="auth-card">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="auth-footer">
          © 2025{" "}
          <span className="font-bold text-gradient-brand">
            BlackGold Cherish
          </span>{" "}
          • All rights reserved
        </p>
      </div>
    </div>
  );
}
