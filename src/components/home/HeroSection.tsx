"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, Loader2, Navigation } from "lucide-react";

export default function HeroSection() {
  const [address, setAddress] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [geoError, setGeoError] = useState("");

  function detectLocation() {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by your browser.");
      return;
    }
    setDetecting(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr =
            data.address?.road && data.address?.suburb
              ? `${data.address.road}, ${data.address.suburb}, ${data.address.city ?? data.address.town ?? ""}`
              : data.display_name?.split(",").slice(0, 3).join(",") ?? "Location detected";
          setAddress(addr.trim().replace(/,\s*$/, ""));
        } catch {
          setGeoError("Could not fetch address. Try typing it.");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        setGeoError("Location access denied. Please type your address.");
        setDetecting(false);
      },
      { timeout: 8000 }
    );
  }

  return (
    <section className="relative bg-[#1A1A2E] overflow-hidden min-h-[540px] flex items-center">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#FF5A1F]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-[#FFB800]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#FF5A1F]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span className="text-[#FF5A1F] text-xs font-semibold">Now delivering in 8 African cities</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5">
              Your favourite<br />
              <span className="text-[#FF5A1F]">African meals</span>
              <br />at your door
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              From party jollof to suya, shawarma to grilled lobster — order from 200+ restaurants and get it delivered hot in under 40 minutes.
            </p>

            {/* Address bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-2 max-w-xl">
              <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-3.5">
                <MapPin className="w-5 h-5 text-[#FF5A1F] flex-shrink-0 ml-1" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); setGeoError(""); }}
                  placeholder="Enter your delivery address…"
                  className="flex-1 text-sm text-white placeholder-gray-400 outline-none !bg-transparent min-w-0"
                />
                <button
                  type="button"
                  aria-label="Detect my location"
                  onClick={detectLocation}
                  disabled={detecting}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#FF5A1F] hover:text-white bg-white/10 hover:bg-[#FF5A1F] px-2.5 py-1.5 rounded-xl transition-colors flex-shrink-0 disabled:opacity-60"
                >
                  {detecting
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <Navigation className="w-3.5 h-3.5" />
                  }
                  <span className="hidden sm:inline">{detecting ? "Detecting…" : "Use my location"}</span>
                </button>
              </div>
              <Link
                href={`/restaurants${address ? `?q=${encodeURIComponent(address)}` : ""}`}
                className="flex items-center justify-center gap-2 bg-[#FF5A1F] text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-[#e8430a] transition-all hover:scale-105 shadow-lg shadow-[#FF5A1F]/30 whitespace-nowrap"
              >
                Find Food
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {geoError && (
              <p className="text-xs text-red-400 mb-4 pl-1">{geoError}</p>
            )}

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { emoji: "🎉", text: "Free delivery on first order" },
                { emoji: "⚡", text: "Avg. 32 min delivery" },
                { emoji: "⭐", text: "4.8 rating · 1M+ orders" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-300">
                  <span>{t.emoji}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating food cards */}
          <div className="hidden lg:flex justify-center items-center relative h-96">
            <div className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 w-52 text-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="text-5xl mb-2">🍛</div>
              <p className="text-white font-semibold text-sm">Party Jollof Rice</p>
              <p className="text-[#FF5A1F] text-sm font-bold mt-1">₦3,500</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★★★★★</span>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-40 shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="text-4xl mb-1.5">🍔</div>
              <p className="text-white font-semibold text-sm">Suya Burger</p>
              <p className="text-[#FF5A1F] text-sm font-bold">₦5,500</p>
            </div>
            <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-40 shadow-xl rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="text-4xl mb-1.5">🌯</div>
              <p className="text-white font-semibold text-sm">Chicken Shawarma</p>
              <p className="text-[#FF5A1F] text-sm font-bold">₦2,500</p>
            </div>
            <div className="absolute top-8 right-8 bg-[#FF5A1F] rounded-2xl px-4 py-2.5 shadow-lg shadow-[#FF5A1F]/40">
              <p className="text-white text-xs font-medium">Delivered in</p>
              <p className="text-white text-xl font-bold">32 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#F8F8F9] [clip-path:ellipse(55%_100%_at_50%_100%)]" />
    </section>
  );
}
