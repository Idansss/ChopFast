"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useUserStore((s) => s.login);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      const nameParts = email.split("@")[0].split(".");
      login({
        id: "usr_" + Date.now(),
        firstName: nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1),
        lastName: nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : "",
        email,
        phone: "",
        avatar: "",
      });
      router.push("/home");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#F8F8F9] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1A1A2E] to-[#2d2d4e] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FF5A1F]/20 blur-3xl" />
        <div className="absolute bottom-10 -left-10 w-60 h-60 rounded-full bg-[#FFB800]/15 blur-3xl" />
        <Link href="/home" className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center shadow-lg shadow-[#FF5A1F]/30">
            <span className="text-white font-black text-sm">CF</span>
          </div>
          <span className="text-white font-black text-xl">Chop<span className="text-[#FF5A1F]">fast</span></span>
        </Link>
        <div className="relative flex-1 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white text-center w-72">
            <div className="text-6xl mb-3">🍛</div>
            <p className="font-bold text-xl">200+ restaurants</p>
            <p className="text-gray-300 text-sm mt-1">delivering across Africa</p>
            <div className="flex justify-center gap-0.5 mt-4">
              {"★★★★★".split("").map((s, i) => <span key={i} className="text-[#FFB800] text-lg">{s}</span>)}
            </div>
            <p className="text-gray-400 text-xs mt-1">4.8 from 50,000+ reviews</p>
          </div>
        </div>
        <p className="relative text-gray-400 text-sm italic">
          &quot;The fastest food delivery in Lagos. My go-to every day!&quot;
          <br /><span className="text-white font-semibold not-italic">— Adaeze O., Lagos</span>
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/home" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center">
              <span className="text-white font-black text-sm">CF</span>
            </div>
            <span className="text-[#1A1A2E] font-black text-xl">Chop<span className="text-[#FF5A1F]">fast</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#1A1A2E]">Welcome back 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue your order</p>
          </div>

          <button type="button" className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all mb-5">
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2a10.3 10.3 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.82.95 4.04l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.96L3.96 7.29C4.67 5.16 6.66 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#FF5A1F] font-semibold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#FF5A1F] font-bold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
