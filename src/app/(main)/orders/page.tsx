"use client";

import Link from "next/link";
import { useState } from "react";
import { Package, RotateCcw, ChevronRight } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import type { Order, OrderStatus, CartItem } from "@/types";
import ReviewModal from "@/components/shared/ReviewModal";

function statusConfig(status: OrderStatus): { label: string; className: string } {
  switch (status) {
    case "delivered":
      return { label: "Delivered", className: "bg-green-100 text-green-700" };
    case "in_transit":
    case "picked_up":
      return { label: status === "in_transit" ? "On the way" : "Picked up", className: "bg-blue-100 text-blue-700" };
    case "preparing":
    case "confirmed":
    case "ready_for_pickup":
      return { label: status === "preparing" ? "Preparing" : status === "confirmed" ? "Confirmed" : "Ready", className: "bg-orange-100 text-[#FF5A1F]" };
    case "cancelled":
      return { label: "Cancelled", className: "bg-red-100 text-red-600" };
    case "pending":
    default:
      return { label: "Pending", className: "bg-gray-100 text-gray-500" };
  }
}

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function truncateItems(items: CartItem[], max = 2): string {
  const names = items.slice(0, max).map((i) => `${i.name} × ${i.quantity}`);
  const rest = items.length - max;
  if (rest > 0) names.push(`+${rest} more`);
  return names.join(", ");
}

function OrderCard({
  order,
  onReview,
}: {
  order: Order;
  onReview: (orderId: string) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const { label, className } = statusConfig(order.status);

  function handleReorder() {
    for (const item of order.items) {
      addItem({ ...item, quantity: item.quantity });
    }
  }

  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF5A1F]/15 to-[#FF5A1F]/5 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-[#FF5A1F]" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A2E] text-sm leading-tight">{order.restaurantName}</p>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{order.reference}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>{label}</span>
          <Link
            href={`/track/${order.reference}`}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Track order"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        {/* Items */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {truncateItems(order.items)}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <span className="text-sm font-bold text-[#1A1A2E]">{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 pb-4 flex items-center gap-3">
        <button
          onClick={handleReorder}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#FF5A1F] border-2 border-[#FF5A1F]/30 bg-orange-50 hover:bg-[#FF5A1F] hover:text-white hover:border-[#FF5A1F] rounded-xl px-4 py-2 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reorder
        </button>
        <Link
          href={`/track/${order.reference}`}
          className="text-xs font-semibold text-gray-500 hover:text-[#1A1A2E] transition-colors px-2 py-2"
        >
          View details
        </Link>
        {order.status === "delivered" && (
          <button
            type="button"
            onClick={() => onReview(order.id)}
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-amber-600 border-2 border-amber-200 bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-amber-500 rounded-xl px-4 py-2 transition-all"
          >
            ⭐ Review
          </button>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);

  const reviewingOrder = reviewingOrderId
    ? orders.find((o) => o.id === reviewingOrderId)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Your Orders</h1>
          <p className="text-sm text-gray-400 mt-1">All your Chopfast deliveries</p>
        </div>
        {orders.length > 0 && (
          <span className="bg-[#1A1A2E] text-white text-sm font-bold px-3 py-1 rounded-full">
            {orders.length}
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-5 block">📦</span>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">No orders yet</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-xs">
            When you place an order, it will show up here so you can track and reorder with ease.
          </p>
          <Link
            href="/restaurants"
            className="bg-[#FF5A1F] text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-[#e8430a] transition-colors text-sm"
          >
            Browse restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onReview={setReviewingOrderId} />
          ))}
        </div>
      )}

      {reviewingOrder && (
        <ReviewModal
          restaurantName={reviewingOrder.restaurantName}
          orderId={reviewingOrder.id}
          onClose={() => setReviewingOrderId(null)}
        />
      )}
    </div>
  );
}
