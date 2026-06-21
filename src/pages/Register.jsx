import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.endsWith("@amcfoss.com")) {
      setError("Please register with your @amcfoss.com email address.");
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      navigate("/select-role", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your AMC FOSS profile."
      subtitle="Register with your official @amcfoss.com email to unlock the Core or Tech workspace."
      footer={
        <span>
          Already verified?{" "}
          <Link to="/login" className="text-[#00ff88] hover:text-[#2ecc71]">
            Sign in
          </Link>
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
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">AMC FOSS Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#00ff88]/70 focus:bg-white/10 focus:ring-2 focus:ring-[#00ff88]/40"
            placeholder="you@amcfoss.com"
            required
          />
          <p className="text-xs text-slate-400">Only @amcfoss.com email addresses are accepted.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#00ff88]/70 focus:bg-white/10 focus:ring-2 focus:ring-[#00ff88]/40"
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#00ff88]/70 focus:bg-white/10 focus:ring-2 focus:ring-[#00ff88]/40"
              placeholder="Retype password"
              required
              minLength={6}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-r from-[#00ff88] via-[#2ecc71] to-[#27ae60] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0b1020] shadow-[0_18px_50px_rgba(0,255,136,0.24)] transition focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-60"
        >
          <span className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
          <span className="relative">{loading ? "Creating..." : "Create Account"}</span>
        </button>
      </form>
    </AuthLayout>
  );
}


