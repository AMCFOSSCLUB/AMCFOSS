import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { loginWithEmail, role, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-redirect if user is already logged in and has a role
  useEffect(() => {
    if (!authLoading && user) {
      if (role === "core") {
        navigate("/mentor", { replace: true });
      } else if (role === "tech") {
        navigate("/office", { replace: true });
      } else if (!role) {
        navigate("/select-role", { replace: true });
      }
    }
  }, [user, role, authLoading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const domain = email.split("@")[1] || "";
      const isCollege = domain.toLowerCase().includes("amcfoss") || domain.toLowerCase().includes("edu");
      if (!isCollege) {
        setError("Please use your college email ID.");
        setLoading(false);
        return;
      }
      await loginWithEmail(email, password);
      // Don't navigate here - let the useEffect handle it based on role
    } catch (err) {
      setError(err.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in with your AMC FOSS email to open your personalised workspace."
      footer={
        <span>

        </span>
      }
    >
      {error ? (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300">
          {error}
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">College Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#00ff88]/70 focus:bg-white/10 focus:ring-2 focus:ring-[#00ff88]/40"
            placeholder="you@amcfoss.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#00ff88]/70 focus:bg-white/10 focus:ring-2 focus:ring-[#00ff88]/40"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-r from-[#00ff88] via-[#2ecc71] to-[#27ae60] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0b1020] shadow-[0_18px_50px_rgba(0,255,136,0.24)] transition focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-60"
        >
          <span className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
          <span className="relative">{loading ? "Signing In..." : "Enter Workspace"}</span>
        </button>
      </form>
    </AuthLayout>
  );
}


