"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useUserStore } from "@/store/userStore";

const CITIES = [
  { city: "Lagos",           country: "Nigeria",  flag: "🇳🇬" },
  { city: "Abuja",           country: "Nigeria",  flag: "🇳🇬" },
  { city: "Port Harcourt",   country: "Nigeria",  flag: "🇳🇬" },
  { city: "Ibadan",          country: "Nigeria",  flag: "🇳🇬" },
  { city: "Accra",           country: "Ghana",    flag: "🇬🇭" },
  { city: "Kumasi",          country: "Ghana",    flag: "🇬🇭" },
  { city: "Nairobi",         country: "Kenya",    flag: "🇰🇪" },
  { city: "Johannesburg",    country: "South Africa", flag: "🇿🇦" },
];

export default function LocationPicker() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const city = useUserStore((s) => s.city);
  const setCity = useUserStore((s) => s.setCity);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors whitespace-nowrap"
      >
        <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
        {city}
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Delivering to</p>
          </div>
          <div className="py-1 max-h-64 overflow-y-auto">
            {CITIES.map((c) => (
              <button
                key={c.city}
                type="button"
                onClick={() => { setCity(c.city); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{c.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{c.city}</p>
                    <p className="text-xs text-gray-400">{c.country}</p>
                  </div>
                </div>
                {city === c.city && <Check className="w-4 h-4 text-[#FF5A1F] flex-shrink-0" />}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-400 text-center">More cities coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
