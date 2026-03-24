import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoBanner from "@/components/home/PromoBanner";
import StatsBar from "@/components/home/StatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import RestaurantCard from "@/components/home/RestaurantCard";
import { RESTAURANTS } from "@/data/mock";
import Link from "next/link";
import { ArrowRight, Flame, Star } from "lucide-react";
import { HomeSkeleton } from "@/components/shared/SkeletonCard";

export default function HomePage() {
  const featured = RESTAURANTS.filter((r) => r.isFeatured);
  const openNow = RESTAURANTS.filter((r) => r.isOpen).slice(0, 6);
  const topRated = [...RESTAURANTS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsBar />

      <Suspense fallback={<HomeSkeleton />}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="pt-10">
            <CategoryGrid />
          </div>

          {/* Promo banners */}
          <PromoBanner />

          {/* Featured */}
          <section className="py-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  <span className="text-xs font-semibold text-[#FF5A1F] uppercase tracking-wide">Featured</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A2E]">Top restaurants</h2>
              </div>
              <Link href="/restaurants" className="flex items-center gap-1.5 text-sm font-semibold text-[#FF5A1F] hover:text-[#e8430a] transition-colors group">
                See all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </section>

          {/* Open now */}
          <section className="py-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Delivering now</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A2E]">Open near you</h2>
              </div>
              <Link href="/restaurants?open=true" className="flex items-center gap-1.5 text-sm font-semibold text-[#FF5A1F] hover:text-[#e8430a] transition-colors group">
                See all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {openNow.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </section>

          {/* Top rated strip */}
          <section className="py-8">
            <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2d2d4e] rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Flame className="w-5 h-5 text-[#FF5A1F]" />
                <h2 className="text-xl font-bold text-white">Highest rated today</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRated.map((r, i) => (
                  <Link key={r.id} href={`/restaurants/${r.slug}`} className="group flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-2xl p-3 transition-colors border border-white/10">
                    <span className="text-2xl font-black text-[#FF5A1F] w-6 flex-shrink-0">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm line-clamp-1">{r.name}</p>
                      <p className="text-gray-400 text-xs">{r.cuisineTags[0]} · {r.deliveryTimeMin}–{r.deliveryTimeMax} min</p>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                      <span className="text-white text-sm font-bold">{r.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Suspense>

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* App download CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-gradient-to-br from-[#FF5A1F] to-[#ff8c5a] rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/10 blur-xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-white text-2xl md:text-3xl font-black mb-2">
                Get the Chopfast app 📱
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-sm">
                Live order tracking, exclusive app deals, and 1-tap reorder. Available on iOS & Android.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              {/* App Store */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-tight">Download on the</p>
                  <p className="text-sm font-bold text-[#1A1A2E] leading-tight">App Store</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.3.17.65.19.98.07l12.49-7.04-2.79-2.8-10.68 9.77z" fill="#EA4335"/>
                  <path d="M22.47 10.23l-3.1-1.75-3.11 3.11 3.11 3.1 3.13-1.76c.89-.5.89-1.7-.03-2.7z" fill="#FBBC05"/>
                  <path d="M2.18.28C1.85.43 1.63.78 1.63 1.22v21.56c0 .44.22.79.55.94l12.23-11.99L2.18.28z" fill="#4285F4"/>
                  <path d="M16.65 10.56L3.18.28c-.33-.19-.68-.2-1 0l12.23 11.99 2.24-1.71z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-tight">Get it on</p>
                  <p className="text-sm font-bold text-[#1A1A2E] leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
