"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Package, MapPin, Wallet, ChevronRight,
  LogOut, Bell, Heart, Star, Settings, HelpCircle,
  X, Check, CreditCard, Smartphone, Building2, Camera,
  ArrowDownLeft, ArrowUpRight,
} from "lucide-react";
import { useUserStore, type WalletTransaction } from "@/store/userStore";
import { useThemeStore } from "@/store/themeStore";
import { useOrderStore } from "@/store/orderStore";
import { useFavStore } from "@/store/favStore";
import type { OrderStatus } from "@/types";
import { useToast } from "@/components/shared/Toast";

const TOP_UP_AMOUNTS = [1000, 2000, 5000, 10000, 20000, 50000];

// USSD shortcodes (demo — real implementation requires backend)
const USSD_CODES = [
  { bank: "GTBank",       code: "*737*58*{AMOUNT}*4*6#" },
  { bank: "Access Bank",  code: "*901*58*{AMOUNT}#" },
  { bank: "First Bank",   code: "*894*{AMOUNT}*1*6#" },
  { bank: "Zenith Bank",  code: "*966*58*{AMOUNT}#" },
];

// Bank account for transfer (demo)
const BANK_ACCOUNT = { bank: "Wema Bank (ALAT)", name: "Chopfast Technologies Ltd", number: "0123456789" };

const STATUS_STYLES: Record<OrderStatus, { label: string; classes: string }> = {
  pending:          { label: "Pending",        classes: "text-yellow-600 bg-yellow-50"  },
  confirmed:        { label: "Confirmed",      classes: "text-blue-600 bg-blue-50"      },
  preparing:        { label: "Preparing",      classes: "text-orange-600 bg-orange-50"  },
  ready_for_pickup: { label: "Ready",          classes: "text-purple-600 bg-purple-50"  },
  picked_up:        { label: "Picked up",      classes: "text-indigo-600 bg-indigo-50"  },
  in_transit:       { label: "On the way",     classes: "text-blue-600 bg-blue-50"      },
  delivered:        { label: "Delivered",      classes: "text-green-600 bg-green-50"    },
  cancelled:        { label: "Cancelled",      classes: "text-red-600 bg-red-50"        },
};

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const updateAvatar = useUserStore((s) => s.updateAvatar);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const walletBalance = useUserStore((s) => s.walletBalance);
  const walletTransactions = useUserStore((s) => s.walletTransactions);
  const topUpWallet = useUserStore((s) => s.topUpWallet);
  const orders = useOrderStore((s) => s.orders);
  const favIds = useFavStore((s) => s.ids);
  const recentOrders = orders.slice(0, 3);
  const [showSettings, setShowSettings] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWalletHistory, setShowWalletHistory] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpMethod, setTopUpMethod] = useState("card");
  const [topUpDone, setTopUpDone] = useState(false);
  const [topUpLoading, setTopUpLoading] = useState(false);
  // "select" | "ussd" | "bank" | "processing" | "done"
  const [topUpScreen, setTopUpScreen] = useState<"select" | "ussd" | "bank" | "processing">("select");
  const [notifications, setNotifications] = useState({ orders: true, promos: true, reminders: false });
  const [editName, setEditName] = useState({ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" });
  const { showToast } = useToast();

  const initials = user
    ? (user.firstName[0] + (user.lastName?.[0] ?? "")).toUpperCase()
    : "?";

  const phoneDisplay = user?.phone && user.phone.replace(/\D/g, "").length >= 10
    ? user.phone
    : "Not provided";

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file.", "error");
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showToast("Image is too large. Max size is 5MB.", "error");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateAvatar(reader.result);
        showToast("Profile picture updated.");
      }
    };
    reader.readAsDataURL(file);
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
  }

  function handleLogout() {
    logout();
    router.push("/home");
  }

  // Load Paystack script once
  useEffect(() => {
    const existing = document.getElementById("paystack-js");
    if (existing) { setPaystackReady(true); return; }
    const script = document.createElement("script");
    script.id = "paystack-js";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  function closeTopUp() {
    setShowTopUp(false);
    setTopUpDone(false);
    setTopUpScreen("select");
    setTopUpAmount("");
  }

  function handleTopUp() {
    const amount = Number(topUpAmount);
    if (!amount || amount < 100) return;

    if (topUpMethod === "card") {
      // Route through Paystack popup
      if (!paystackReady || !window.PaystackPop) {
        // Paystack not loaded — fall back to simulated success
        creditWallet(amount, "card");
        return;
      }
      setTopUpLoading(true);
      const ref = `CF-TU-${Date.now()}`;
      const handler = window.PaystackPop.setup({
        key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        email: user?.email ?? "guest@chopfast.com",
        amount: amount * 100, // kobo
        currency: "NGN",
        ref,
        metadata: { type: "wallet_topup" },
        callback: (response) => {
          setTopUpLoading(false);
          creditWallet(amount, "card", response.reference);
        },
        onClose: () => setTopUpLoading(false),
      });
      handler.openIframe();
    } else if (topUpMethod === "ussd") {
      setTopUpScreen("ussd");
    } else {
      setTopUpScreen("bank");
    }
  }

  function creditWallet(amount: number, method: string, ref?: string) {
    const txRef = ref ?? `CF-TU-${Date.now()}`;
    topUpWallet(amount, method, txRef);
    setTopUpDone(true);
    setTimeout(closeTopUp, 2500);
  }

  function simulateOfflinePayment() {
    // Called after user confirms USSD/bank transfer
    setTopUpScreen("processing" as "select" | "ussd" | "bank" | "processing");
    setTimeout(() => {
      creditWallet(Number(topUpAmount), topUpMethod);
    }, 2500);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d2d4e] rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full bg-[#FF5A1F]/10" />
        <div className="relative flex items-center gap-4">
          <div
            className="relative w-16 h-16 cursor-pointer group flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 bg-[#FF5A1F] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF5A1F]/30">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="text-2xl font-black text-white">{initials}</span>
              )}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="Upload profile photo"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <div className="flex-1">
            <h1 className="text-xl font-black">{user ? `${user.firstName} ${user.lastName}`.trim() : "Guest"}</h1>
            <p className="text-gray-300 text-sm">{user?.email || "—"}</p>
            <p className="text-gray-400 text-xs mt-0.5">{phoneDisplay}</p>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                {user?.avatar ? "Change photo" : "Add photo"}
              </button>
            </div>
          </div>
          <button
            type="button"
            aria-label="Settings"
            onClick={() => setShowSettings(true)}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Wallet balance */}
        <div className="relative mt-5 bg-white/10 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Wallet balance</p>
              <p className="text-2xl font-black">₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowWalletHistory(true)}
                className="text-xs text-white/70 font-semibold px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                History
              </button>
              <button
                type="button"
                onClick={() => setShowTopUp(true)}
                className="bg-[#FF5A1F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e8430a] transition-colors shadow-lg shadow-[#FF5A1F]/30"
              >
                Top up
              </button>
            </div>
          </div>
          {walletTransactions.length > 0 && (
            <div className="border-t border-white/10 pt-3 space-y-1">
              {walletTransactions.slice(0, 2).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {tx.type === "credit"
                      ? <ArrowDownLeft className="w-3 h-3 text-green-400" />
                      : <ArrowUpRight className="w-3 h-3 text-red-400" />}
                    <span className="text-gray-300 truncate max-w-[140px]">{tx.description}</span>
                  </div>
                  <span className={tx.type === "credit" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                    {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Link href="/orders" className="bg-white rounded-2xl p-4 text-center shadow-card border border-gray-100 hover:border-[#FF5A1F]/30 hover:shadow-md transition-all">
          <span className="text-2xl block mb-1">📦</span>
          <p className="text-xl font-black text-[#1A1A2E]">{orders.length}</p>
          <p className="text-xs text-gray-400">Orders</p>
        </Link>
        <Link href="/favourites" className="bg-white rounded-2xl p-4 text-center shadow-card border border-gray-100 hover:border-[#FF5A1F]/30 hover:shadow-md transition-all">
          <span className="text-2xl block mb-1">❤️</span>
          <p className="text-xl font-black text-[#1A1A2E]">{favIds.length}</p>
          <p className="text-xs text-gray-400">Saved</p>
        </Link>
        <div className="bg-white rounded-2xl p-4 text-center shadow-card border border-gray-100">
          <span className="text-2xl block mb-1">⭐</span>
          <p className="text-xl font-black text-[#1A1A2E]">0</p>
          <p className="text-xs text-gray-400">Reviews</p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 mb-5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#1A1A2E]">Recent orders</h2>
          <Link href="/orders" className="text-xs text-[#FF5A1F] font-semibold hover:text-[#e8430a]">View all</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-gray-400 text-sm">No orders yet</p>
              <Link href="/restaurants" className="text-[#FF5A1F] text-sm font-semibold mt-1 inline-block hover:underline">
                Browse restaurants
              </Link>
            </div>
          ) : (
            recentOrders.map((order) => {
              const itemsLabel = order.items
                .map((i) => `${i.name}${i.quantity > 1 ? ` × ${i.quantity}` : ""}`)
                .join(", ");
              const date = new Date(order.createdAt).toLocaleDateString("en-NG", {
                weekday: "short", month: "short", day: "numeric",
              });
              const { label: statusLabel, classes: statusClasses } =
                STATUS_STYLES[order.status] ?? { label: order.status, classes: "text-gray-600 bg-gray-50" };

              return (
                <Link
                  key={order.id}
                  href="/orders"
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🍛
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1A2E] text-sm">{order.restaurantName}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{itemsLabel}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{date} · {order.reference}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#1A1A2E]">₦{order.total.toLocaleString()}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusClasses}`}>
                      {statusLabel}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 mb-5 divide-y divide-gray-50">
        {[
          { icon: Package,    label: "Order history",      sub: "Track and reorder past meals",    href: "/orders"       },
          { icon: MapPin,     label: "Saved addresses",    sub: "Home, Work, and more",            href: "/addresses"    },
          { icon: Heart,      label: "Favourite places",   sub: `${favIds.length} saved restaurants`, href: "/favourites" },
          { icon: Wallet,     label: "Payment methods",    sub: "Cards and wallet",                href: "/profile"      },
          { icon: Star,       label: "My reviews",         sub: "Review past orders",              href: "/orders"       },
          { icon: Bell,       label: "Notifications",      sub: "Manage your alerts",              href: "/profile"      },
          { icon: HelpCircle, label: "Help & Support",     sub: "FAQs, chat with us",              href: "/help"         },
        ].map(({ icon: Icon, label, sub, href }) => (
          <Link key={label} href={href} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">
            <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-[#FF5A1F]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A2E]">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <button type="button" onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold py-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors border border-red-100">
        <LogOut className="w-4 h-4" />
        Sign out
      </button>

      {/* ── Settings Modal ── */}
      {showSettings && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setShowSettings(false)} />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-[#1A1A2E]">Settings</h2>
              <button type="button" aria-label="Close" onClick={() => setShowSettings(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto overflow-x-hidden">
              {/* Edit name */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Personal info</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="settings-firstname" className="block text-xs font-semibold text-gray-600 mb-1">First name</label>
                    <input
                      id="settings-firstname"
                      type="text"
                      value={editName.firstName}
                      onChange={(e) => setEditName((n) => ({ ...n, firstName: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-lastname" className="block text-xs font-semibold text-gray-600 mb-1">Last name</label>
                    <input
                      id="settings-lastname"
                      type="text"
                      value={editName.lastName}
                      onChange={(e) => setEditName((n) => ({ ...n, lastName: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Appearance</p>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">Dark mode</p>
                    <p className="text-xs text-gray-400">Easy on the eyes at night</p>
                  </div>
                  <button
                    type="button"
                    aria-label={isDark ? "Disable dark mode" : "Enable dark mode"}
                    onClick={toggleTheme}
                    className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${isDark ? "bg-[#FF5A1F]" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>

              {/* Notification toggles */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Notifications</p>
                <div className="space-y-3">
                  {[
                    { key: "orders" as const, label: "Order updates", sub: "Delivery status and confirmations" },
                    { key: "promos" as const, label: "Promotions", sub: "Deals, discounts, and offers" },
                    { key: "reminders" as const, label: "Meal reminders", sub: "Lunchtime and dinner nudges" },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A2E]">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`${notifications[key] ? "Disable" : "Enable"} ${label}`}
                        onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                        className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${notifications[key] ? "bg-[#FF5A1F]" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <button
                type="button"
                onClick={() => {
                  updateProfile({ firstName: editName.firstName.trim(), lastName: editName.lastName.trim() });
                  setShowSettings(false);
                }}
                className="w-full bg-[#FF5A1F] text-white py-3 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Wallet History Modal ── */}
      {showWalletHistory && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setShowWalletHistory(false)} />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-[#1A1A2E]">Wallet history</h2>
                <p className="text-xs text-gray-400 mt-0.5">Balance: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
              </div>
              <button type="button" aria-label="Close" onClick={() => setShowWalletHistory(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {walletTransactions.length === 0 ? (
                <div className="py-12 text-center">
                  <Wallet className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="font-semibold text-[#1A1A2E]">No transactions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Top up your wallet to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {walletTransactions.map((tx: WalletTransaction) => {
                    const date = new Date(tx.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
                    const time = new Date(tx.createdAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={tx.id} className="flex items-center gap-4 px-5 py-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === "credit" ? "bg-green-50" : "bg-red-50"}`}>
                          {tx.type === "credit"
                            ? <ArrowDownLeft className="w-5 h-5 text-green-500" />
                            : <ArrowUpRight className="w-5 h-5 text-red-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1A1A2E] truncate">{tx.description}</p>
                          <p className="text-xs text-gray-400">{date} · {time}{tx.method ? ` · ${tx.method}` : ""}</p>
                          <p className="text-[10px] text-gray-300 font-mono mt-0.5">{tx.ref}</p>
                        </div>
                        <span className={`text-sm font-bold flex-shrink-0 ${tx.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                          {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setShowWalletHistory(false); setShowTopUp(true); }}
                className="w-full bg-[#FF5A1F] text-white py-3 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors"
              >
                Top up wallet
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Top Up Modal ── */}
      {showTopUp && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={topUpScreen === "select" ? closeTopUp : undefined} />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {topUpScreen !== "select" && !topUpDone && topUpScreen !== "processing" && (
                  <button type="button" aria-label="Back" onClick={() => setTopUpScreen("select")} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors mr-1">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}
                <h2 className="font-bold text-[#1A1A2E]">
                  {topUpDone ? "Top up successful" : topUpScreen === "ussd" ? "Pay via USSD" : topUpScreen === "bank" ? "Bank transfer" : topUpScreen === "processing" ? "Processing…" : "Top up wallet"}
                </h2>
              </div>
              {!topUpLoading && topUpScreen !== "processing" && (
                <button type="button" aria-label="Close" onClick={closeTopUp} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* ── Success screen ── */}
            {topUpDone && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <p className="font-bold text-[#1A1A2E] text-lg">₦{Number(topUpAmount).toLocaleString()} added!</p>
                <p className="text-sm text-gray-400 mt-1">Your wallet has been topped up successfully.</p>
                <p className="text-sm font-bold text-[#1A1A2E] mt-3">
                  New balance: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}

            {/* ── Processing screen ── */}
            {!topUpDone && topUpScreen === "processing" && (
              <div className="p-10 text-center">
                <div className="w-12 h-12 border-4 border-[#FF5A1F]/20 border-t-[#FF5A1F] rounded-full animate-spin mx-auto mb-5" />
                <p className="font-bold text-[#1A1A2E]">Confirming payment…</p>
                <p className="text-sm text-gray-400 mt-1">Please wait while we verify your payment.</p>
              </div>
            )}

            {/* ── USSD screen ── */}
            {!topUpDone && topUpScreen === "ussd" && (
              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-500">Dial the code for your bank, then tap <span className="font-semibold text-[#1A1A2E]">"I've paid"</span> to confirm.</p>
                <div className="space-y-2">
                  {USSD_CODES.map(({ bank, code }) => {
                    const filled = code.replace("{AMOUNT}", String(Number(topUpAmount)));
                    return (
                      <div key={bank} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                        <div>
                          <p className="text-xs font-semibold text-gray-500">{bank}</p>
                          <p className="text-sm font-mono font-bold text-[#1A1A2E]">{filled}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard?.writeText(filled)}
                          className="text-xs text-[#FF5A1F] font-semibold px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={simulateOfflinePayment}
                  className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors"
                >
                  I&apos;ve paid — ₦{Number(topUpAmount).toLocaleString()}
                </button>
                <p className="text-center text-xs text-gray-400">🔒 Secured by Paystack</p>
              </div>
            )}

            {/* ── Bank transfer screen ── */}
            {!topUpDone && topUpScreen === "bank" && (
              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-500">Transfer exactly <span className="font-bold text-[#1A1A2E]">₦{Number(topUpAmount).toLocaleString()}</span> to the account below, then tap <span className="font-semibold text-[#1A1A2E]">"I've transferred"</span>.</p>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100">
                  {[
                    { label: "Bank", value: BANK_ACCOUNT.bank },
                    { label: "Account name", value: BANK_ACCOUNT.name },
                    { label: "Account number", value: BANK_ACCOUNT.number },
                    { label: "Amount", value: `₦${Number(topUpAmount).toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-gray-500">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1A1A2E]">{value}</span>
                        {(label === "Account number" || label === "Amount") && (
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(value.replace("₦", "").replace(/,/g, ""))}
                            className="text-xs text-[#FF5A1F] font-semibold px-2 py-0.5 rounded-lg hover:bg-orange-50 transition-colors"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                  ⚠️ Use your registered name or phone number as narration so we can match your payment.
                </div>
                <button
                  type="button"
                  onClick={simulateOfflinePayment}
                  className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors"
                >
                  I&apos;ve transferred — ₦{Number(topUpAmount).toLocaleString()}
                </button>
                <p className="text-center text-xs text-gray-400">🔒 Secured by Paystack</p>
              </div>
            )}

            {/* ── Select amount + method screen ── */}
            {!topUpDone && topUpScreen === "select" && (
              <div className="p-5 space-y-5">
                {/* Quick amounts */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Select amount</p>
                  <div className="grid grid-cols-3 gap-2">
                    {TOP_UP_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopUpAmount(String(amt))}
                        className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${topUpAmount === String(amt) ? "border-[#FF5A1F] bg-orange-50 text-[#FF5A1F]" : "border-gray-200 text-gray-700 hover:border-[#FF5A1F]"}`}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom amount */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Or enter amount</label>
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#FF5A1F] transition-colors">
                    <span className="px-3 text-gray-400 font-semibold text-sm">₦</span>
                    <input
                      type="number"
                      placeholder="0"
                      min="100"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="flex-1 py-2.5 pr-3 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Payment method</p>
                  <div className="space-y-2">
                    {[
                      { id: "card", icon: CreditCard, label: "Debit / Credit card", sub: "Visa, Mastercard, Verve" },
                      { id: "ussd", icon: Smartphone, label: "USSD", sub: "GTBank, Access, Zenith & more" },
                      { id: "bank", icon: Building2, label: "Bank transfer", sub: "Transfer to our account" },
                    ].map(({ id, icon: Icon, label, sub }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTopUpMethod(id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors text-left ${topUpMethod === id ? "border-[#FF5A1F] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${topUpMethod === id ? "text-[#FF5A1F]" : "text-gray-400"}`} />
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${topUpMethod === id ? "text-[#FF5A1F]" : "text-gray-700"}`}>{label}</p>
                          <p className="text-xs text-gray-400">{sub}</p>
                        </div>
                        {topUpMethod === id && <Check className="w-4 h-4 text-[#FF5A1F] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTopUp}
                  disabled={!topUpAmount || Number(topUpAmount) < 100 || topUpLoading}
                  className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {topUpLoading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Opening payment…</>
                    : topUpAmount && Number(topUpAmount) >= 100
                      ? `Top up ₦${Number(topUpAmount).toLocaleString()}`
                      : "Enter an amount to continue"
                  }
                </button>
                <p className="text-center text-xs text-gray-400">🔒 Secured by Paystack</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
