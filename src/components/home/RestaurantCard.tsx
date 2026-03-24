"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Bike, ChevronRight, Heart } from "lucide-react";
import type { Restaurant } from "@/types";
import { formatCurrency, getDeliveryTime } from "@/lib/utils";
import { useFavStore } from "@/store/favStore";

interface Props {
  restaurant: Restaurant;
  size?: "default" | "compact";
}

export default function RestaurantCard({ restaurant, size = "default" }: Props) {
  const toggle = useFavStore((s) => s.toggle);
  const isFaved = useFavStore((s) => s.isFaved(restaurant.id));

  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200">
        {/* Cover image */}
        <div className={`relative ${size === "compact" ? "h-36" : "h-44"} bg-gray-100 overflow-hidden`}>
          <Image
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Heart / favourite button */}
          <button
            type="button"
            aria-label={isFaved ? "Remove from favourites" : "Save restaurant"}
            onClick={(e) => { e.preventDefault(); toggle(restaurant.id); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          >
            <Heart className={`w-4 h-4 ${isFaved ? "fill-[#FF5A1F] text-[#FF5A1F]" : "text-gray-400"}`} />
          </button>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {restaurant.isFeatured && (
              <span className="bg-[#FF5A1F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
            {!restaurant.isOpen && (
              <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Closed
              </span>
            )}
          </div>

          {/* Bottom: delivery fee */}
          <div className="absolute bottom-3 right-3">
            {restaurant.deliveryFee === 0 ? (
              <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                Free delivery
              </span>
            ) : (
              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <Bike className="w-3 h-3" />
                {formatCurrency(restaurant.deliveryFee)}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug group-hover:text-[#FF5A1F] transition-colors line-clamp-1 flex-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0 bg-amber-50 rounded-lg px-1.5 py-0.5">
              <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-xs font-bold text-[#1A1A2E]">{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mb-3 line-clamp-1">
            {restaurant.cuisineTags.join(" · ")} · {restaurant.reviewCount.toLocaleString()} reviews
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-5 h-5 bg-orange-50 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-[#FF5A1F]" />
              </div>
              <span>{getDeliveryTime(restaurant.deliveryTimeMin, restaurant.deliveryTimeMax)}</span>
            </div>

            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${restaurant.isOpen ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="px-4 pb-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
          <div className="flex items-center gap-1 text-xs text-[#FF5A1F] font-semibold">
            <span>View menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
