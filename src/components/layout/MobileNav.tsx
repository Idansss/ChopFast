"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, User, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useThemeStore } from "@/store/themeStore";

export default function MobileNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useUIStore((s) => s.toggleCart);
  const isDark = useThemeStore((s) => s.isDark);

  const links = [
    { href: "/home",        icon: Home,             label: "Home" },
    { href: "/restaurants", icon: UtensilsCrossed,  label: "Explore" },
    { href: "/favourites",  icon: Heart,            label: "Saved" },
    { href: "/profile",     icon: User,             label: "Account" },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t safe-area-pb shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-colors ${isDark ? "bg-[#0d0d1a] border-white/10" : "bg-white border-gray-100"}`}>
      <div className="flex items-center justify-around px-2 py-1">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${active ? "text-[#FF5A1F]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : "stroke-2"}`} />
              <span className={`text-[10px] font-medium ${active ? "text-[#FF5A1F]" : ""}`}>{label}</span>
              {active && <div className="w-1 h-1 rounded-full bg-[#FF5A1F] mt-0.5" />}
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          type="button"
          aria-label="Open cart"
          onClick={toggleCart}
          className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl relative text-gray-400 hover:text-gray-600 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF5A1F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>
      </div>
    </nav>
  );
}
