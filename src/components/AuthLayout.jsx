import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,136,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(46,204,113,0.14),transparent_42%)]" />
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-[#2ecc71]/25 blur-3xl" />
        <div className="absolute -bottom-36 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#00ff88]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(45deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-15" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full"
        >
          <div className="absolute inset-0 rounded-[2.25rem] bg-white/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.92),rgba(5,9,18,0.96))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link to="/" className="group flex items-center gap-3 text-lg font-semibold tracking-wide">
                <img
                  src="/images/amc-foss-logo.png"
                  alt="AMC FOSS logo"
                  className="h-14 w-14 rounded-2xl object-cover shadow-lg shadow-[#00ff88]/20 transition group-hover:scale-105"
                />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-400 sm:text-xs">
                    AMC FOSS
                  </span>
                  <span className="text-2xl font-semibold tracking-tight text-[#00ff88] transition group-hover:text-[#2ecc71] sm:text-3xl">
                    Premium Access
                  </span>
                </span>
              </Link>
              <Link
                to="/events"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-[#00ff88]/60 hover:text-[#00ff88]"
              >
                View Events
              </Link>
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center rounded-full border border-[#00ff88]/25 bg-[#00ff88]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#00ff88]">
                AMC FOSS Portal
              </span>
              <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
              {subtitle ? <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{subtitle}</p> : null}
            </div>

            <div className="space-y-5">{children}</div>

            {footer ? <div className="mt-8 text-sm text-slate-400">{footer}</div> : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


