"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Clock } from "lucide-react";
import { useFavStore } from "@/store/favStore";
import { RESTAURANTS } from "@/data/mock";
import { getDeliveryTime } from "@/lib/utils";

export default function FavouritesPage() {
  const ids = useFavStore((s) => s.ids);
  const toggle = useFavStore((s) => s.toggle);

  const saved = ids
    .map((id) => RESTAURANTS.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Saved restaurants</h1>
        {saved.length > 0 && (
          <span className="bg-[#FF5A1F] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {saved.length}
          </span>
        )}
      </div>

      {/* Empty state */}
      {saved.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-6xl mb-4">❤️</span>
          <h2 className="text-xl font-black text-[#1A1A2E] mb-2">No saved restaurants yet</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">
            Tap the heart on any restaurant to save it here for quick access.
          </p>
          <Link
            href="/restaurants"
            className="bg-[#FF5A1F] text-white font-bold px-6 py-3 rounded-2xl hover:bg-[#e8430a] transition-colors shadow-lg shadow-[#FF5A1F]/25"
          >
            Explore restaurants
          </Link>
        </div>
      )}

      {/* Grid */}
      {saved.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden group">
              {/* Cover image — card is clickable, heart button is not */}
              <Link href={`/restaurants/${restaurant.slug}`} className="block">
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={restaurant.coverImageUrl}
                    alt={restaurant.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Open / Closed badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        restaurant.isOpen
                          ? "bg-green-500 text-white"
                          : "bg-gray-800/70 text-gray-200"
                      }`}
                    >
                      {restaurant.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/restaurants/${restaurant.slug}`} className="flex-1 min-w-0">
                    <h3 className="font-black text-[#1A1A2E] text-base leading-tight truncate hover:text-[#FF5A1F] transition-colors">
                      {restaurant.name}
                    </h3>
                  </Link>

                  {/* Remove heart button */}
                  <button
                    type="button"
                    aria-label={`Remove ${restaurant.name} from favourites`}
                    onClick={() => toggle(restaurant.id)}
                    className="flex-shrink-0 w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Cuisine tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {restaurant.cuisineTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating + delivery time */}
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[#1A1A2E]">{restaurant.rating}</span>
                  </div>
                  <span className="text-gray-200">·</span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getDeliveryTime(restaurant.deliveryTimeMin, restaurant.deliveryTimeMax)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
