"use client";

import { MapPin, Phone, Star, CheckCircle, Clock, ChevronRight, MessageSquare, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import type { OrderStatus } from "@/types";

interface Props {
  params: { orderId: string };
}

type StepDef = { label: string; sub: string; time: string; done: boolean };

function deriveSteps(status: OrderStatus): StepDef[] {
  const ORDER: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "ready_for_pickup",
    "picked_up",
    "in_transit",
    "delivered",
  ];

  const currentIndex = ORDER.indexOf(status);

  const STEP_META: { label: string; sub: string; status: OrderStatus }[] = [
    { label: "Order placed",       sub: "We received your order",         status: "pending"          },
    { label: "Order confirmed",    sub: "Restaurant accepted",            status: "confirmed"        },
    { label: "Preparing your food", sub: "Kitchen is cooking",           status: "preparing"        },
    { label: "Rider picked up",    sub: "On the way to you",             status: "picked_up"        },
    { label: "Delivered",          sub: "Enjoy your meal!",              status: "delivered"        },
  ];

  return STEP_META.map((meta) => {
    const stepIndex = ORDER.indexOf(meta.status);
    const done = currentIndex >= stepIndex && status !== "cancelled";
    return { label: meta.label, sub: meta.sub, time: done ? "Done" : "Pending", done };
  });
}

export default function TrackOrderPage({ params }: Props) {
  const { orderId } = params;
  const order = useOrderStore((s) => s.getOrder(orderId));

  if (!order) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h1 className="text-2xl font-black text-[#1A1A2E] mb-2">Order not found</h1>
        <p className="text-gray-400 text-sm mb-6">
          We couldn&apos;t find an order matching <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{orderId}</span>.
        </p>
        <Link
          href="/orders"
          className="inline-block bg-[#FF5A1F] text-white font-bold px-6 py-3 rounded-2xl hover:bg-[#e8430a] transition-colors"
        >
          View all orders
        </Link>
      </div>
    );
  }

  const steps = deriveSteps(order.status);
  const currentStep = steps.findIndex((s) => !s.done);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/home" className="hover:text-[#FF5A1F] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/orders" className="hover:text-[#FF5A1F] transition-colors">Orders</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1A1A2E] font-semibold">{order.restaurantName}</span>
        <span className="text-gray-300 mx-1">·</span>
        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded-lg">{order.reference}</span>
      </div>

      {/* ETA hero bar */}
      <div className="bg-gradient-to-r from-[#FF5A1F] to-[#ff8c5a] rounded-3xl p-6 mb-6 text-white flex items-center justify-between overflow-hidden relative">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-16 bottom-0 w-24 h-24 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-sm text-white/80 mb-1">Estimated delivery</p>
          <p className="text-4xl font-black">{order.estimatedDelivery}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm font-semibold capitalize">{order.status.replace(/_/g, " ")}</span>
            </div>
          </div>
        </div>
        <div className="relative text-7xl animate-bounce [animation-duration:2s]">🛵</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Simulated map */}
          <div className="bg-[#1A1A2E] rounded-3xl overflow-hidden h-72 relative border border-white/5">
            {/* Fake map grid */}
            <div className="absolute inset-0 opacity-[0.07] grid grid-cols-4 grid-rows-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border border-white" />
              ))}
            </div>

            {/* Fake road lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/40" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/40" />
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/40" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/40" />
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 25 80 Q 35 55 55 45 Q 65 38 70 25"
                stroke="#FF5A1F"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 3"
              />
            </svg>

            {/* Restaurant pin */}
            <div className="absolute top-[22%] left-[68%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="bg-[#FF5A1F] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-[#FF5A1F]/40 whitespace-nowrap">
                  🍛 Restaurant
                </div>
                <div className="w-2 h-2 bg-[#FF5A1F] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>

            {/* Rider pin (animated) */}
            <div className="absolute top-[45%] left-[54%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-2xl border-2 border-[#FF5A1F] animate-pulse">
                  🛵
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-[#FF5A1F]/30 animate-ping" />
              </div>
            </div>

            {/* You pin */}
            <div className="absolute bottom-[20%] left-[26%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap">
                  📍 You
                </div>
                <div className="w-2 h-2 bg-green-500 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>

            {/* Map label */}
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] text-white/40 bg-black/20 rounded px-2 py-1">Live tracking</span>
            </div>
          </div>

          {/* Rider card */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1A1A2E]">Your rider</h3>
              <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-semibold">On the way</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF5A1F]/20 to-[#FF5A1F]/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                👨🏿
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1A1A2E]">Chukwuemeka O.</p>
                <div className="flex items-center gap-1.5 my-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600 font-medium">4.9</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-500">1,204 trips</span>
                </div>
                <p className="text-xs text-gray-400">🛵 Motorcycle · LG 342 XA</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button type="button" aria-label="Call rider" className="w-11 h-11 bg-[#FF5A1F] rounded-2xl flex items-center justify-center hover:bg-[#e8430a] transition-colors shadow-md shadow-[#FF5A1F]/25">
                  <Phone className="w-4 h-4 text-white" />
                </button>
                <button type="button" aria-label="Message rider" className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress timeline */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-bold text-[#1A1A2E] mb-5">Order progress</h3>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-100" />
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white ${step.done ? "bg-green-500 ring-green-100" : i === currentStep ? "bg-[#FF5A1F] ring-orange-100" : "bg-gray-100"}`}>
                      {step.done
                        ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                        : i === currentStep
                          ? <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
                          : <div className="w-2 h-2 rounded-full bg-gray-300" />
                      }
                    </div>
                    <div className="flex-1 pb-1">
                      <p className={`text-sm font-semibold leading-tight ${step.done || i === currentStep ? "text-[#1A1A2E]" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${step.done ? "text-gray-400" : i === currentStep ? "text-[#FF5A1F] font-medium" : "text-gray-300"}`}>
                        {i === currentStep ? step.sub : step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Delivering to</p>
                <p className="text-sm font-semibold text-[#1A1A2E]">{order.deliveryAddress.street}</p>
                <p className="text-xs text-gray-400">
                  {order.deliveryAddress.landmark
                    ? `${order.deliveryAddress.landmark}, `
                    : ""}
                  {order.deliveryAddress.city}
                </p>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100">
            <p className="text-sm font-semibold text-[#1A1A2E] mb-3">Need help?</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="flex items-center justify-center gap-1.5 text-xs font-semibold border-2 border-gray-200 rounded-xl py-2.5 hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:bg-orange-50 transition-all">
                <RotateCcw className="w-3.5 h-3.5" />
                Report issue
              </button>
              <button type="button" className="flex items-center justify-center gap-1.5 text-xs font-semibold border-2 border-red-100 text-red-400 rounded-xl py-2.5 hover:bg-red-50 hover:border-red-200 transition-all">
                Cancel order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
