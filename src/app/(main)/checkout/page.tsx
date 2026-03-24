"use client";

import { useState, useEffect } from "react";
import { MapPin, CreditCard, ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Lock, Home, Briefcase, MoreHorizontal, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUserStore, type SavedAddress } from "@/store/userStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: object;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [deliveryType, setDeliveryType] = useState<"standard" | "express">("standard");
  const [notes, setNotes] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const serviceFee = useCartStore((s) => s.serviceFee());
  const total = useCartStore((s) => s.total());
  const restaurantName = useCartStore((s) => s.restaurantName);
  const user = useUserStore((s) => s.user);
  const savedAddresses = useUserStore((s) => s.savedAddresses);
  const userCity = useUserStore((s) => s.city);
  const walletBalance = useUserStore((s) => s.walletBalance);
  const deductWallet = useUserStore((s) => s.deductWallet);
  const setDeliveryDetails = useCheckoutStore((s) => s.setDeliveryDetails);

  const walletInsufficient = paymentMethod === "wallet" && walletBalance < total;

  // Load Paystack script
  useEffect(() => {
    const existing = document.getElementById("paystack-js");
    if (existing) { setPaystackReady(true); return; }
    const script = document.createElement("script");
    script.id = "paystack-js";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  function payWithPaystack() {
    if (!paystackReady || !window.PaystackPop) {
      // Fallback: go directly to success
      router.push("/checkout/success");
      return;
    }
    setLoading(true);
    const ref = `CF-${Date.now()}`;
    const handler = window.PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with real test key
      email: user?.email ?? "guest@chopfast.com",
      amount: total * 100, // Paystack expects kobo
      currency: "NGN",
      ref,
      metadata: { restaurantName, deliveryAddress: address, landmark, notes },
      callback: (response) => {
        setLoading(false);
        router.push(`/checkout/success?ref=${response.reference}`);
      },
      onClose: () => setLoading(false),
    });
    handler.openIframe();
  }

  function handlePay() {
    if (walletInsufficient) return;
    if (paymentMethod === "card") {
      payWithPaystack();
    } else {
      setLoading(true);
      const ref = `CF-WL-${Date.now()}`;
      deductWallet(total, ref, `Order from ${restaurantName}`);
      setTimeout(() => router.push(`/checkout/success?ref=${ref}`), 1000);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add items before checking out</p>
        <Link href="/restaurants" className="bg-[#FF5A1F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#e8430a] transition-colors">
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 lg:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/restaurants" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">Checkout</h1>
          <p className="text-sm text-gray-400">{restaurantName}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-6">
        {(["address", "payment"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === s || (s === "address" && step === "payment") ? "bg-[#FF5A1F] text-white" : "bg-gray-200 text-gray-500"}`}>
              {s === "address" && step === "payment" ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === s ? "text-[#1A1A2E]" : "text-gray-400"}`}>
              {s === "address" ? "Delivery" : "Payment"}
            </span>
            {i < 1 && <div className="flex-1 h-px bg-gray-200 w-8" />}
          </div>
        ))}
      </div>

      {/* Mobile order summary toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setSummaryOpen(!summaryOpen)}
          className="w-full flex items-center justify-between bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3"
        >
          <span className="text-sm font-semibold text-[#FF5A1F]">Order summary · {formatCurrency(total)}</span>
          {summaryOpen ? <ChevronUp className="w-4 h-4 text-[#FF5A1F]" /> : <ChevronDown className="w-4 h-4 text-[#FF5A1F]" />}
        </button>
        {summaryOpen && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
            <OrderSummaryContent items={items} subtotal={subtotal} deliveryFee={deliveryFee} serviceFee={serviceFee} total={total} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          {step === "address" && (
            <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#FF5A1F]" />
                <h2 className="font-semibold text-[#1A1A2E]">Delivery address</h2>
              </div>

              {/* Saved addresses */}
              {savedAddresses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Saved addresses</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {savedAddresses.map((sa: SavedAddress) => (
                      <button
                        key={sa.id}
                        type="button"
                        onClick={() => { setAddress(sa.street); if (sa.landmark) setLandmark(sa.landmark); }}
                        className={`text-left p-3 rounded-xl border-2 transition-colors ${address === sa.street ? "border-[#FF5A1F] bg-orange-50" : "border-gray-200 hover:border-[#FF5A1F]"}`}
                      >
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sa.label === "Home" ? "bg-blue-100 text-blue-600" : sa.label === "Work" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                          {sa.label === "Home" ? <Home className="w-2.5 h-2.5" /> : sa.label === "Work" ? <Briefcase className="w-2.5 h-2.5" /> : <MoreHorizontal className="w-2.5 h-2.5" />}
                          {sa.label}
                        </span>
                        <p className="text-sm font-medium text-[#1A1A2E] mt-1.5 truncate">{sa.street}</p>
                        <p className="text-xs text-gray-400">{sa.city}</p>
                        {sa.landmark && <p className="text-xs text-gray-300 truncate">Near: {sa.landmark}</p>}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 mb-3">Or enter a new address below</p>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1.5">Street address *</label>
                  <input
                    id="street"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 15 Awolowo Road, Victoria Island"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1.5">Landmark (optional)</label>
                  <input
                    id="landmark"
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Access Bank, Behind Shoprite"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "standard" as const, label: "Standard", time: "25–45 min", fee: "₦700", icon: "🛵" },
                      { id: "express" as const, label: "Express", time: "15–25 min", fee: "₦1,200", icon: "⚡" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDeliveryType(opt.id)}
                        className={`flex items-start gap-3 border-2 rounded-xl p-3 transition-colors text-left ${deliveryType === opt.id ? "border-[#FF5A1F] bg-orange-50" : "border-gray-200 hover:border-[#FF5A1F]"}`}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-[#1A1A2E]">{opt.label}</p>
                          <p className="text-xs text-gray-500">{opt.time} · {opt.fee}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">Order notes (optional)</label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions for the restaurant…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDeliveryDetails(address, userCity, landmark);
                    setStep("payment");
                  }}
                  disabled={!address}
                  className="w-full bg-[#FF5A1F] text-white py-4 rounded-2xl font-semibold hover:bg-[#e8430a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-[#FF5A1F]" />
                <h2 className="font-semibold text-[#1A1A2E]">Payment method</h2>
              </div>

              <div className="space-y-3 mb-5">
                {/* Card option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center gap-4 border-2 rounded-xl p-4 transition-colors text-left ${paymentMethod === "card" ? "border-[#FF5A1F] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <span className="text-2xl">💳</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#1A1A2E]">Debit / Credit card</p>
                    <p className="text-xs text-gray-400">Powered by Paystack — Visa, Mastercard, Verve</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === "card" ? "border-[#FF5A1F]" : "border-gray-300"}`}>
                    {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />}
                  </div>
                </button>

                {/* Wallet option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`w-full flex items-center gap-4 border-2 rounded-xl p-4 transition-colors text-left ${paymentMethod === "wallet" ? "border-[#FF5A1F] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <span className="text-2xl">👛</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#1A1A2E]">Chopfast Wallet</p>
                    <p className="text-xs text-gray-400">
                      Balance: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === "wallet" ? "border-[#FF5A1F]" : "border-gray-300"}`}>
                    {paymentMethod === "wallet" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />}
                  </div>
                </button>

                {/* Insufficient balance warning */}
                {walletInsufficient && (
                  <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-600">Insufficient balance</p>
                      <p className="text-xs text-red-400 mt-0.5">
                        You need ₦{(total - walletBalance).toLocaleString("en-NG", { minimumFractionDigits: 2 })} more.{" "}
                        <a href="/profile" className="underline font-semibold">Top up on profile →</a>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="flex-1 border-2 border-gray-200 text-gray-700 py-3.5 rounded-2xl font-medium hover:border-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={loading || walletInsufficient}
                  className="flex-1 bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                    : <><Lock className="w-3.5 h-3.5" /> Pay {formatCurrency(total)}</>
                  }
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secured by Paystack · 256-bit SSL
              </p>
            </div>
          )}
        </div>

        {/* Desktop order summary */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 sticky top-24">
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Order summary</h3>
            <OrderSummaryContent items={items} subtotal={subtotal} deliveryFee={deliveryFee} serviceFee={serviceFee} total={total} />
          </div>
        </div>
      </div>

      {/* Mobile sticky pay button */}
      {step === "payment" && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-100 shadow-elevated z-40">
          <button
            type="button"
            onClick={handlePay}
            disabled={loading || walletInsufficient}
            className="w-full bg-[#FF5A1F] text-white py-4 rounded-2xl font-bold hover:bg-[#e8430a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
              : <><Lock className="w-3.5 h-3.5" /> Pay {formatCurrency(total)}</>
            }
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">🔒 Secured by Paystack</p>
        </div>
      )}
    </div>
  );
}

function OrderSummaryContent({ items, subtotal, deliveryFee, serviceFee, total }: {
  items: any[]; subtotal: number; deliveryFee: number; serviceFee: number; total: number;
}) {
  return (
    <>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.menuItemId} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="40px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1A1A2E] line-clamp-1">{item.name}</p>
              <p className="text-xs text-gray-400">×{item.quantity}</p>
            </div>
            <span className="text-sm font-medium text-[#1A1A2E]">{formatCurrency(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden mb-4 focus-within:border-[#FF5A1F] transition-colors">
        <input type="text" placeholder="Promo code" className="flex-1 px-3 py-2.5 text-sm outline-none bg-white min-w-0" />
        <button type="button" className="bg-[#1A1A2E] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#2d2d4e] transition-colors whitespace-nowrap flex-shrink-0">Apply</button>
      </div>
      <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between text-gray-600"><span>Delivery fee</span><span>{formatCurrency(deliveryFee)}</span></div>
        <div className="flex justify-between text-gray-600"><span>Service fee</span><span>{formatCurrency(serviceFee)}</span></div>
        <div className="flex justify-between font-bold text-[#1A1A2E] text-base pt-2 border-t border-gray-100"><span>Total</span><span>{formatCurrency(total)}</span></div>
      </div>
    </>
  );
}
