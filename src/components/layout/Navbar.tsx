"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X, LogOut, User, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { useThemeStore } from "@/store/themeStore";
import LocationPicker from "./LocationPicker";
import SearchModal from "./SearchModal";
import NotificationDropdown from "./NotificationDropdown";
import BrandLogo from "@/components/shared/BrandLogo";

const NAV_LINKS = [
  { href: "/home",        label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useUIStore((s) => s.toggleCart);
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/home");
  }

  const initials = user
    ? (user.firstName[0] + (user.lastName?.[0] ?? "")).toUpperCase()
    : "";

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-sm border-b shadow-sm transition-colors ${isDark ? "bg-[#0d0d1a]/95 border-white/10" : "bg-white/95 border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2 flex-shrink-0">
              <BrandLogo size={32} priority className="shrink-0" />
              <span className={`font-black text-xl tracking-tight ${isDark ? "text-white" : "text-[#1A1A2E]"}`}>
                Chop<span className="text-[#FF5A1F]">fast</span>
              </span>
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active ? "bg-[#FF5A1F]/10 text-[#FF5A1F]" : isDark ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-[#1A1A2E] hover:bg-gray-50"}`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Search + Location — desktop */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
              <LocationPicker />
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={`flex-1 flex items-center gap-2 border rounded-xl px-3 py-2 text-sm text-gray-400 hover:border-[#FF5A1F] transition-colors ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs truncate">Search restaurants or dishes…</span>
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <NotificationDropdown />

              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
                className={`hidden md:flex w-9 h-9 rounded-xl border items-center justify-center hover:text-[#FF5A1F] hover:border-[#FF5A1F] transition-colors ${isDark ? "border-white/15 text-gray-400" : "border-gray-200 text-gray-500"}`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {user ? (
                /* Logged-in user avatar */
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-50"}`}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.firstName} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#FF5A1F] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{initials}</span>
                      </div>
                    )}
                    <span className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-[#1A1A2E]"}`}>{user.firstName}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Sign out"
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Guest auth buttons */
                <>
                  <Link href="/login" className={`hidden md:block text-sm font-medium hover:text-[#FF5A1F] px-3 py-2 rounded-xl transition-colors ${isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-50"}`}>
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="hidden md:block text-sm font-semibold bg-[#FF5A1F] text-white px-4 py-2 rounded-xl hover:bg-[#e8430a] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/25"
                  >
                    Get started
                  </Link>
                </>
              )}

              {/* Cart */}
              <button
                type="button"
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative flex items-center gap-2 bg-[#FF5A1F] text-white px-3 py-2 rounded-xl hover:bg-[#e8430a] transition-all hover:shadow-lg hover:shadow-[#FF5A1F]/25"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:block text-sm font-semibold">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#1A1A2E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={`md:hidden p-2 rounded-xl transition-colors ${isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden pb-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`w-full flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm text-gray-400 hover:border-[#FF5A1F] transition-colors ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <Search className="w-4 h-4" />
              <span>Search restaurants or dishes…</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className={`md:hidden border-t px-4 py-4 space-y-2 shadow-elevated ${isDark ? "bg-[#0d0d1a] border-white/10" : "bg-white border-gray-100"}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/10 hover:text-white" : "text-gray-700 hover:bg-gray-50"}`}>
                {label}
              </Link>
            ))}
            <div className={`border-t pt-3 mt-3 space-y-2 ${isDark ? "border-white/10" : "border-gray-100"}`}>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-50"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF5A1F] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{initials}</span>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-[#1A1A2E]"}`}>{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-sm font-medium text-red-400 px-3 py-2.5 rounded-xl hover:bg-red-50/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className={`flex items-center gap-2 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-50"}`}>
                    <User className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                    Sign in
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold bg-[#FF5A1F] text-white px-4 py-3 rounded-xl text-center hover:bg-[#e8430a] transition-colors">
                    Get started — it&apos;s free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
