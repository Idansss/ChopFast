"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RESTAURANTS, MENU_CATEGORIES } from "@/data/mock";

const TRENDING = ["Party Jollof Rice", "Suya Smash Burger", "Chicken Shawarma", "Grilled Lobster", "Egusi Soup"];

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.toLowerCase().trim();

  const matchedRestaurants = q
    ? RESTAURANTS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisineTags.some((t) => t.toLowerCase().includes(q)) ||
          r.description.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedItems = q
    ? Object.values(MENU_CATEGORIES)
        .flat()
        .flatMap((cat) => cat.items)
        .filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        )
        .slice(0, 5)
    : [];

  const hasResults = matchedRestaurants.length > 0 || matchedItems.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white rounded-3xl shadow-modal overflow-hidden border border-gray-100">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-[#FF5A1F] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants, dishes, cuisines…"
              className="flex-1 text-base text-[#1A1A2E] placeholder-gray-400 outline-none bg-transparent"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button type="button" onClick={onClose} className="text-sm font-semibold text-gray-500 hover:text-[#FF5A1F] transition-colors ml-1">
              Cancel
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {/* No query: show trending */}
            {!q && (
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#FF5A1F]" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Trending now</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setQuery(t)}
                      className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:bg-orange-50 transition-colors font-medium"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-5 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Recent searches</p>
                </div>
                <div className="space-y-1">
                  {["Mama Put Kitchen", "Suya Spot", "Jollof Rice"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setQuery(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {q && !hasResults && (
              <div className="py-12 text-center">
                <span className="text-4xl block mb-3">🔍</span>
                <p className="font-semibold text-[#1A1A2E]">No results for &quot;{query}&quot;</p>
                <p className="text-sm text-gray-400 mt-1">Try a dish name, cuisine or restaurant</p>
              </div>
            )}

            {q && matchedRestaurants.length > 0 && (
              <div className="px-5 py-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Restaurants</p>
                <div className="space-y-2">
                  {matchedRestaurants.map((r) => (
                    <Link
                      key={r.id}
                      href={`/restaurants/${r.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={r.logoUrl} alt={r.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1A1A2E] text-sm group-hover:text-[#FF5A1F] transition-colors">{r.name}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{r.cuisineTags.join(" · ")} · {r.deliveryTimeMin}–{r.deliveryTimeMax} min</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${r.isOpen ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                        {r.isOpen ? "Open" : "Closed"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {q && matchedItems.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-50">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Dishes</p>
                <div className="space-y-2">
                  {matchedItems.map((item) => {
                    const restaurant = RESTAURANTS.find((r) => r.id === item.restaurantId);
                    return (
                      <Link
                        key={item.id}
                        href={`/restaurants/${restaurant?.slug ?? ""}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1A1A2E] text-sm group-hover:text-[#FF5A1F] transition-colors line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-400">{restaurant?.name} · ₦{item.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {q && hasResults && (
              <div className="px-5 py-3 border-t border-gray-100">
                <Link
                  href={`/restaurants?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#FF5A1F] hover:bg-orange-50 rounded-xl transition-colors"
                >
                  <Search className="w-4 h-4" />
                  See all results for &quot;{query}&quot;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
