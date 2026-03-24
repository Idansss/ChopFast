"use client";

import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", countryCode: "+234", phone: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const login = useUserStore((s) => s.login);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.phone.length < 7) e.phone = "Enter a valid phone number";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      login({
        id: "usr_" + Date.now(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.countryCode + form.phone.replace(/\D/g, "").replace(/^0/, ""),
        avatar: "",
      });
      router.push("/home");
    }, 1400);
  }

  const pwStrength = form.password.length >= 12 ? "strong" : form.password.length >= 8 ? "medium" : form.password.length >= 4 ? "weak" : "";
  const strengthColors = { strong: "bg-green-500", medium: "bg-amber-400", weak: "bg-red-400" };
  const strengthWidths = { strong: "w-full", medium: "w-[60%]", weak: "w-[30%]" };
  const strengthLabels = { strong: "Strong", medium: "Medium", weak: "Weak" };

  return (
    <div className="min-h-screen bg-[#F8F8F9] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FF5A1F] to-[#ff8c5a] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-black/10 blur-3xl" />
        <Link href="/home" className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg">
            <span className="text-white font-black text-sm">CF</span>
          </div>
          <span className="text-white font-black text-xl">Chopfast</span>
        </Link>
        <div className="relative space-y-6">
          <h2 className="text-3xl font-black text-white leading-tight">
            Join 1M+ food lovers<br />across Africa 🌍
          </h2>
          <div className="space-y-3">
            {[
              { icon: "🎉", text: "Free delivery on your first order" },
              { icon: "⚡", text: "Average 32-minute delivery" },
              { icon: "🔒", text: "100% secure payments via Paystack" },
              { icon: "📍", text: "Live order tracking on the map" },
              { icon: "🌍", text: "Available in Lagos, Accra, Nairobi + more" },
            ].map((p) => (
              <div key={p.text} className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-7 h-7 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-sm">{p.icon}</div>
                {p.text}
              </div>
            ))}
          </div>
        </div>
        <div className="relative bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <p className="text-white text-sm font-semibold mb-1">🛵 Super fast delivery</p>
          <p className="text-white/70 text-xs">95% of our orders arrive within the estimated time window. Guaranteed.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link href="/home" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center">
              <span className="text-white font-black text-sm">CF</span>
            </div>
            <span className="text-[#1A1A2E] font-black text-xl">Chop<span className="text-[#FF5A1F]">fast</span></span>
          </Link>

          <div className="mb-7">
            <h1 className="text-2xl font-black text-[#1A1A2E]">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">It only takes 30 seconds</p>
          </div>

          <button type="button" className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all mb-5">
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2a10.3 10.3 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.82.95 4.04l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.96L3.96 7.29C4.67 5.16 6.66 3.58 9 3.58z"/></svg>
            Sign up with Google
          </button>

          <div className="relative flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1.5">First name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input id="firstName" type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Emeka" autoComplete="given-name"
                    className={`w-full border-2 rounded-2xl pl-8 pr-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#FF5A1F]"}`} />
                </div>
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-semibold text-gray-700 mb-1.5">Last name</label>
                <input id="lastName" type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Obi" autoComplete="family-name"
                  className={`w-full border-2 rounded-2xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#FF5A1F]"}`} />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" autoComplete="email"
                  className={`w-full border-2 rounded-2xl pl-9 pr-9 py-2.5 text-sm focus:outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#FF5A1F]"}`} />
                {form.email.includes("@") && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5">Phone number</label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={(e) => set("countryCode", e.target.value)} aria-label="Country code" autoComplete="tel-country-code"
                  className="border-2 border-gray-200 rounded-2xl px-2.5 py-2.5 text-sm focus:outline-none focus:border-[#FF5A1F] bg-white flex-shrink-0 cursor-pointer">
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+233">🇬🇭 +233</option>
                  <option value="+254">🇰🇪 +254</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+256">🇺🇬 +256</option>
                  <option value="+255">🇹🇿 +255</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0801 234 5678" autoComplete="tel-national"
                    className={`w-full border-2 rounded-2xl pl-8 pr-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#FF5A1F]"}`} />
                </div>
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input id="password" type={showPw ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password"
                  className={`w-full border-2 rounded-2xl pl-9 pr-10 py-2.5 text-sm focus:outline-none transition-colors ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#FF5A1F]"}`} />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pwStrength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strengthColors[pwStrength]} ${strengthWidths[pwStrength]}`} />
                  </div>
                  <span className={`text-xs font-semibold ${pwStrength === "strong" ? "text-green-600" : pwStrength === "medium" ? "text-amber-600" : "text-red-500"}`}>
                    {strengthLabels[pwStrength]}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {Object.keys(errors).length > 0 && !Object.values(errors).every(e => !e) && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">Please fix the errors above.</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-all shadow-lg shadow-[#FF5A1F]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account…</>
              ) : "Create account — it's free"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            By signing up you agree to our <Link href="#" className="text-[#FF5A1F] hover:underline">Terms</Link> and <Link href="#" className="text-[#FF5A1F] hover:underline">Privacy Policy</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account? <Link href="/login" className="text-[#FF5A1F] font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
