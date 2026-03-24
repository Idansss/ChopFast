"use client";

import { CheckCircle, MapPin, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import type { Order } from "@/types";

const STATUS_STEPS = [
  { label: "Order confirmed", sub: "We received your order", icon: "✅" },
  { label: "Restaurant preparing", sub: "Kitchen is cooking your meal", icon: "👨‍🍳" },
  { label: "Rider on the way", sub: "Your rider has picked up", icon: "🛵" },
  { label: "Delivered", sub: "Enjoy your meal!", icon: "🎉" },
];

// Auto-progress delays (ms): 0s, 8s, 20s
const STEP_DELAYS = [0, 8000, 20000];

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const serviceFee = useCartStore((s) => s.serviceFee());
  const total = useCartStore((s) => s.total());
  const restaurantName = useCartStore((s) => s.restaurantName);
  const restaurantId = useCartStore((s) => s.restaurantId);
  const addOrder = useOrderStore((s) => s.addOrder);
  const deliveryAddress = useCheckoutStore((s) => s.deliveryAddress);
  const deliveryCity = useCheckoutStore((s) => s.deliveryCity);
  const deliveryLandmark = useCheckoutStore((s) => s.deliveryLandmark);
  const clearCheckout = useCheckoutStore((s) => s.clear);

  const [statusIndex, setStatusIndex] = useState(0); // 0 = confirmed, 1 = preparing, 2 = on the way
  const orderRef = useRef(`CF-${Date.now()}`);
  const hasInit = useRef(false);

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    // Snapshot cart before clearing
    const snapshot = {
      items: [...items],
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      restaurantName: restaurantName ?? "Restaurant",
      restaurantId: restaurantId ?? "",
    };

    const addrStreet = deliveryAddress || "Victoria Island";
    const addrCity = deliveryCity || "Lagos";

    clearCart();
    clearCheckout();

    const order: Order = {
      id: orderRef.current,
      reference: orderRef.current,
      restaurantName: snapshot.restaurantName,
      restaurantLogo: "",
      items: snapshot.items,
      status: "confirmed",
      subtotal: snapshot.subtotal,
      deliveryFee: snapshot.deliveryFee,
      serviceFee: snapshot.serviceFee,
      total: snapshot.total,
      currency: "NGN",
      deliveryAddress: {
        street: addrStreet,
        city: addrCity,
        state: addrCity,
        country: "NG",
        landmark: deliveryLandmark || undefined,
        coordinates: { lat: 6.4281, lng: 3.4219 },
      },
      estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    // Auto-progress timeline
    const t1 = setTimeout(() => setStatusIndex(1), STEP_DELAYS[1]);
    const t2 = setTimeout(() => setStatusIndex(2), STEP_DELAYS[2]);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-50">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Order placed! 🎉</h1>
        <p className="text-gray-500 text-sm">Your food is on its way</p>
        <div className="mt-3 inline-block bg-gray-100 rounded-xl px-4 py-2">
          <span className="text-xs text-gray-500">Order reference: </span>
          <span className="text-sm font-bold text-[#1A1A2E] font-mono">{orderRef.current}</span>
        </div>
      </div>

      {/* ETA card */}
      <div className="bg-gradient-to-br from-[#FF5A1F] to-[#ff7a45] rounded-2xl p-5 text-white mb-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute right-12 bottom-0 w-20 h-20 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-sm opacity-80 mb-1">Estimated arrival</p>
          <p className="text-3xl font-bold">35 min</p>
          <div className="flex items-center gap-1.5 mt-1 text-sm opacity-80">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[180px]">{deliveryAddress || "Your delivery address"}</span>
          </div>
        </div>
        <div className="relative text-6xl">🛵</div>
      </div>

      {/* Live order status timeline */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-[#1A1A2E]">Live order progress</h3>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#FF5A1F] bg-orange-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse inline-block" />
            Live
          </span>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />

          <div className="space-y-5">
            {STATUS_STEPS.map((step, i) => {
              const isCompleted = i < statusIndex;
              const isActive = i === statusIndex;
              const isPending = i > statusIndex;

              return (
                <div key={i} className="flex items-start gap-4 relative">
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white transition-all duration-500 ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "bg-[#FF5A1F] animate-pulse"
                        : "bg-gray-100"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : isActive ? (
                      <Clock className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p
                      className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                        isCompleted || isActive ? "text-[#1A1A2E]" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 transition-colors duration-300 ${
                        isCompleted
                          ? "text-gray-400"
                          : isActive
                          ? "text-[#FF5A1F] font-medium"
                          : "text-gray-300"
                      }`}
                    >
                      {isActive ? step.sub : isCompleted ? "Done" : "Waiting..."}
                    </p>
                  </div>

                  {/* Status tag */}
                  <div className="flex-shrink-0 pt-0.5">
                    {isCompleted && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Done</span>
                    )}
                    {isActive && (
                      <span className="text-xs text-[#FF5A1F] bg-orange-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse inline-block" />
                        Now
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href={`/track/${orderRef.current}`}
          className="flex items-center justify-center gap-2 bg-[#1A1A2E] text-white py-4 rounded-2xl font-semibold hover:bg-[#2d2d4e] transition-colors"
        >
          Track live on map
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/orders"
          className="flex items-center justify-center gap-2 border-2 border-gray-200 text-[#1A1A2E] py-3.5 rounded-2xl font-medium hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors text-sm"
        >
          View all orders
        </Link>
        <Link
          href="/home"
          className="text-center text-sm font-medium text-[#FF5A1F] hover:text-[#e8430a] transition-colors py-2"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
