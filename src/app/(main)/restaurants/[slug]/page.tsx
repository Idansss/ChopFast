import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Clock, Bike, MapPin, ChevronRight, Shield } from "lucide-react";
import { RESTAURANTS, MENU_CATEGORIES } from "@/data/mock";
import MenuItemCard from "@/components/restaurant/MenuItemCard";
import { formatCurrency, getDeliveryTime } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);
  if (!restaurant) notFound();

  const categories = MENU_CATEGORIES[restaurant.id] ?? [];
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="min-h-screen">
      {/* Cover image */}
      <div className="relative h-56 md:h-80 bg-gray-200 overflow-hidden">
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 text-white/90 text-xs bg-black/40 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/10">
            <Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{restaurant.name}</span>
          </div>
        </div>

        {/* Status pill */}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border ${restaurant.isOpen ? "bg-green-500/90 text-white border-green-400/30" : "bg-black/60 text-gray-300 border-white/10"}`}>
            {restaurant.isOpen ? "🟢 Open now" : "🔴 Closed"}
          </span>
        </div>

        {/* Restaurant name on image for mobile */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <h1 className="text-2xl font-black text-white drop-shadow-lg">{restaurant.name}</h1>
          <p className="text-white/80 text-sm">{restaurant.cuisineTags.join(" · ")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info card */}
        <div className="bg-white rounded-3xl shadow-elevated -mt-6 relative z-10 p-5 md:p-7 mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-card">
              <Image src={restaurant.logoUrl} alt={`${restaurant.name} logo`} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="hidden md:block text-xl md:text-2xl font-black text-[#1A1A2E] mb-1">{restaurant.name}</h1>
              <p className="text-sm text-[#FF5A1F] font-semibold mb-1">{restaurant.cuisineTags.join(" · ")}</p>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{restaurant.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-400">{totalItems} items on menu</span>
                <span className="text-gray-200">·</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Verified restaurant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />, value: `${restaurant.rating}`, sub: `${restaurant.reviewCount.toLocaleString()} reviews`, bg: "bg-amber-50" },
              { icon: <Clock className="w-4 h-4 text-[#FF5A1F]" />, value: getDeliveryTime(restaurant.deliveryTimeMin, restaurant.deliveryTimeMax), sub: "Delivery time", bg: "bg-orange-50" },
              { icon: <Bike className="w-4 h-4 text-blue-500" />, value: formatCurrency(restaurant.deliveryFee), sub: "Delivery fee", bg: "bg-blue-50" },
              { icon: <MapPin className="w-4 h-4 text-purple-500" />, value: formatCurrency(restaurant.minimumOrder), sub: "Minimum order", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} rounded-2xl p-3.5 flex items-center gap-3`}>
                <div className="bg-white rounded-xl p-2 shadow-sm flex-shrink-0">{stat.icon}</div>
                <div>
                  <p className="font-bold text-[#1A1A2E] text-sm leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky category nav */}
        {categories.length > 0 && (
          <div className="sticky top-16 z-30 bg-[#F8F8F9] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3 border-b border-gray-200 mb-6">
            <div className="flex gap-2 overflow-x-auto scroll-hide">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="text-sm font-semibold text-gray-500 hover:text-[#FF5A1F] whitespace-nowrap px-4 py-2 rounded-xl hover:bg-[#FF5A1F]/10 transition-colors flex-shrink-0"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu */}
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🍽️</span>
            <h3 className="text-lg font-bold text-gray-500">Menu coming soon</h3>
          </div>
        ) : (
          <div className="space-y-10 pb-20">
            {categories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-lg font-black text-[#1A1A2E]">{category.name}</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5 font-medium">
                    {category.items.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} restaurantName={restaurant.name} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
