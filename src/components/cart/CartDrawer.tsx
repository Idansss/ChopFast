"use client";

import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const { items, restaurantName, updateQuantity, clearCart } = useCartStore();
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const serviceFee = useCartStore((s) => s.serviceFee());
  const total = useCartStore((s) => s.total());

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF5A1F]/10 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#FF5A1F]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1A1A2E] leading-tight">Your Cart</h2>
              {restaurantName && (
                <p className="text-xs text-gray-400">{restaurantName}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="button"
              aria-label="Close cart"
              onClick={closeCart}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-5 border-2 border-dashed border-gray-200">
              <span className="text-4xl">🛒</span>
            </div>
            <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">Add dishes from a restaurant to start your order.</p>
            <button
              type="button"
              onClick={closeCart}
              className="bg-[#FF5A1F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e8430a] transition-colors shadow-lg shadow-[#FF5A1F]/25"
            >
              Browse restaurants
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.menuItemId} className="flex gap-3 items-center bg-gray-50 rounded-2xl p-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1A2E] text-sm line-clamp-1">{item.name}</p>
                    <p className="text-[#FF5A1F] font-bold text-sm">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-400">{formatCurrency(item.unitPrice)} each</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 bg-white rounded-xl p-1 shadow-sm">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-colors"
                    >
                      {item.quantity === 1
                        ? <Trash2 className="w-3 h-3 text-red-400" />
                        : <Minus className="w-3 h-3 text-gray-600" />
                      }
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-[#1A1A2E]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-[#FF5A1F] hover:bg-[#e8430a] flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout */}
            <div className="border-t border-gray-100 px-5 pt-4 pb-5 space-y-3">
              {/* Promo code */}
              <div className="flex items-center bg-gray-50 border border-dashed border-gray-200 rounded-xl overflow-hidden">
                <Tag className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="flex-1 text-sm bg-transparent outline-none text-gray-600 placeholder-gray-400 px-2 py-2.5 min-w-0"
                />
                <button type="button" className="text-xs font-bold bg-[#1A1A2E] text-white px-4 py-2.5 hover:bg-[#2d2d4e] transition-colors whitespace-nowrap flex-shrink-0">
                  Apply
                </button>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1A2E]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery fee</span>
                  <span className="font-medium text-[#1A1A2E]">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Service fee</span>
                  <span className="font-medium text-[#1A1A2E]">{formatCurrency(serviceFee)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-[#1A1A2E] border-t border-gray-100 pt-3">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(total)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-between w-full bg-[#FF5A1F] text-white px-5 py-4 rounded-2xl font-bold hover:bg-[#e8430a] transition-all shadow-lg shadow-[#FF5A1F]/30 hover:shadow-[#FF5A1F]/40"
              >
                <span>Place Order</span>
                <div className="flex items-center gap-2">
                  <span>{formatCurrency(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <p className="text-center text-xs text-gray-400">
                🔒 Secured by Paystack · Free cancellation before pickup
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
