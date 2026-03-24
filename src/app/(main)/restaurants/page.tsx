import RestaurantCard from "@/components/home/RestaurantCard";
import { RestaurantCardSkeleton } from "@/components/shared/SkeletonCard";
import { RESTAURANTS, CATEGORIES } from "@/data/mock";
import { SlidersHorizontal, Search } from "lucide-react";
import type { CuisineTag } from "@/types";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ cuisine?: string; open?: string; sort?: string; q?: string }>;
}

export default async function RestaurantsPage({ searchParams }: Props) {
  const params = await searchParams;
  const cuisine = params.cuisine as CuisineTag | undefined;
  const openOnly = params.open === "true";
  const sort = params.sort ?? "popular";
  const query = params.q?.toLowerCase() ?? "";

  let filtered = RESTAURANTS;
  if (cuisine) filtered = filtered.filter((r) => r.cuisineTags.includes(cuisine));
  if (openOnly) filtered = filtered.filter((r) => r.isOpen);
  if (query) filtered = filtered.filter((r) =>
    r.name.toLowerCase().includes(query) ||
    r.cuisineTags.some((t) => t.toLowerCase().includes(query)) ||
    r.description.toLowerCase().includes(query)
  );

  if (sort === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "fastest")    filtered = [...filtered].sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
  if (sort === "cheapest")   filtered = [...filtered].sort((a, b) => a.deliveryFee - b.deliveryFee);

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { cuisine, open: openOnly ? "true" : undefined, sort, q: params.q, ...overrides };
    Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
    return `/restaurants?${p.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">
          {cuisine ? `${cuisine} restaurants` : query ? `Results for "${params.q}"` : "All restaurants"}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{filtered.length} {filtered.length === 1 ? "place" : "places"} found in Lagos</p>
      </div>

      {/* Search bar */}
      <form method="GET" action="/restaurants" className="flex gap-3 mb-5">
        <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 hover:border-[#FF5A1F] focus-within:border-[#FF5A1F] transition-colors shadow-sm">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            name="q"
            defaultValue={params.q}
            placeholder="Search restaurants, dishes, cuisines…"
            className="flex-1 text-sm text-[#1A1A2E] placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <button type="submit" className="bg-[#FF5A1F] text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-[#e8430a] transition-colors">
          Search
        </button>
      </form>

      {/* Filter row */}
      <div className="flex items-center gap-2.5 mb-3 overflow-x-auto scroll-hide pb-1">
        <Link
          href={buildHref({ cuisine: undefined })}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold flex-shrink-0 border transition-colors ${!cuisine && !openOnly ? "bg-[#FF5A1F] text-white border-[#FF5A1F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#FF5A1F]"}`}
        >
          All
        </Link>

        <Link
          href={buildHref({ open: openOnly ? undefined : "true" })}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold flex-shrink-0 border transition-colors ${openOnly ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-400"}`}
        >
          <span className={`w-2 h-2 rounded-full ${openOnly ? "bg-white" : "bg-green-400"}`} />
          Open now
        </Link>

        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={buildHref({ cuisine: cuisine === cat.tag ? undefined : cat.tag })}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold flex-shrink-0 border transition-colors ${cuisine === cat.tag ? "bg-[#FF5A1F] text-white border-[#FF5A1F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#FF5A1F]"}`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Sort row */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scroll-hide pb-1">
        <div className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0 mr-1">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Sort:</span>
        </div>
        {[
          { id: "popular",  label: "Popular" },
          { id: "rating",   label: "⭐ Highest rated" },
          { id: "fastest",  label: "⚡ Fastest" },
          { id: "cheapest", label: "💰 Free delivery" },
        ].map((s) => (
          <Link
            key={s.id}
            href={buildHref({ sort: s.id })}
            className={`text-sm rounded-xl px-3 py-1.5 border transition-colors flex-shrink-0 ${sort === s.id ? "bg-[#1A1A2E] text-white border-[#1A1A2E]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">🍽️</span>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">No restaurants found</h3>
          <p className="text-gray-400 text-sm mb-5">Try adjusting your search or filters</p>
          <Link href="/restaurants" className="bg-[#FF5A1F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e8430a] transition-colors">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
          {/* Skeleton placeholders to hint at more content */}
          {filtered.length < 3 && Array.from({ length: 3 - filtered.length }).map((_, i) => (
            <RestaurantCardSkeleton key={`sk-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
