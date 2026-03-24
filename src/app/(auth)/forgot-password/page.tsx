"use client";

import Link from "next/link";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-[#F8F8F9] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1A1A2E] to-[#2d2d4e] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FF5A1F]/20 blur-3xl" />
        <div className="absolute bottom-10 -left-10 w-60 h-60 rounded-full bg-[#FFB800]/15 blur-3xl" />

        {/* Logo */}
        <Link href="/home" className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center shadow-lg shadow-[#FF5A1F]/30">
            <span className="text-white font-black text-sm">CF</span>
          </div>
          <span className="text-white font-black text-xl">Chop<span className="text-[#FF5A1F]">fast</span></span>
        </Link>

        {/* Center card */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white text-center w-72">
            <div className="text-6xl mb-3">🔒</div>
            <p className="font-bold text-xl">Secure account recovery</p>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              We&apos;ll send a secure reset link straight to your inbox. It expires in 15 minutes.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span>256-bit encrypted link</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="relative text-gray-400 text-sm italic">
          &quot;Your security is our priority — every step of the way.&quot;
          <br /><span className="text-white font-semibold not-italic">— The Chopfast team</span>
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/home" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center">
              <span className="text-white font-black text-sm">CF</span>
            </div>
            <span className="text-[#1A1A2E] font-black text-xl">Chop<span className="text-[#FF5A1F]">fast</span></span>
          </Link>

          {sent ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-black text-[#1A1A2E] mb-2">Check your email</h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-1">
                We&apos;ve sent a reset link to
              </p>
              <p className="font-bold text-[#1A1A2E] text-sm break-all mb-6">{email.trim()}</p>
              <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                Didn&apos;t get it? Check your spam folder, or{" "}
                <button
                  type="button"
                  onClick={() => { setSent(false); setLoading(false); }}
                  className="text-[#FF5A1F] font-semibold hover:underline"
                >
                  try again
                </button>
                .
              </p>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1A1A2E] hover:text-[#FF5A1F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-[#1A1A2E]">Forgot your password?</h1>
                <p className="text-gray-500 text-sm mt-1">
                  No worries — enter your email and we&apos;ll send a reset link.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoFocus
                      className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-all shadow-lg shadow-[#FF5A1F]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : "Send reset link"}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#FF5A1F] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
