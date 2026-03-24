"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Flame } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useToast } from "@/components/shared/Toast";
import MenuItemCustomizeModal from "@/components/restaurant/MenuItemCustomizeModal";

interface Props {
  item: MenuItem;
  restaurantName: string;
}

export default function MenuItemCard({ item, restaurantName }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const openCart = useUIStore((s) => s.openCart);
  const { showToast } = useToast();

  const [showCustomize, setShowCustomize] = useState(false);

  const cartItem = cartItems.find((i) => i.menuItemId === item.id);
  const qty = cartItem?.quantity ?? 0;

  function handleAdd() {
    if (qty === 0) {
      // First add — open customise modal
      setShowCustomize(true);
    } else {
      // Already in cart — increment directly without modal
      addItem({
        menuItemId: item.id,
        restaurantId: item.restaurantId,
        restaurantName,
        name: item.name,
        imageUrl: item.imageUrl,
        unitPrice: item.price,
        quantity: 1,
      });
    }
  }

  function handleModalConfirm(qty: number, instructions: string) {
    addItem({
      menuItemId: item.id,
      restaurantId: item.restaurantId,
      restaurantName,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.price,
      quantity: qty,
      ...(instructions.trim() ? { instructions: instructions.trim() } : {}),
    });
    showToast(`${item.name} added to cart`);
    setShowCustomize(false);
  }

  return (
    <>
      <div className={`flex gap-4 bg-white rounded-2xl p-4 border transition-all duration-200 ${qty > 0 ? "border-[#FF5A1F]/30 shadow-md shadow-[#FF5A1F]/5" : "border-gray-100 shadow-card hover:shadow-elevated hover:-translate-y-0.5"} ${!item.isAvailable ? "opacity-60" : ""}`}>
        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start gap-2 mb-1">
            <h4 className="font-semibold text-[#1A1A2E] text-sm leading-snug line-clamp-1 flex-1">{item.name}</h4>
            {item.isPopular && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 flex-shrink-0 whitespace-nowrap">
                <Flame className="w-2.5 h-2.5" />
                Popular
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed flex-1">
            {item.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="font-bold text-[#FF5A1F] text-sm">{formatCurrency(item.price)}</span>
              {item.calories && (
                <span className="text-[10px] text-gray-400 ml-2">{item.calories} kcal</span>
              )}
            </div>

            {/* Quantity controls */}
            {item.isAvailable && (
              <div className="flex items-center gap-2">
                {qty > 0 ? (
                  <div className="flex items-center gap-2 bg-[#FF5A1F]/10 rounded-xl px-1 py-0.5">
                    <button
                      type="button"
                      aria-label="Remove one"
                      onClick={() => updateQuantity(item.id, qty - 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-[#FF5A1F]">{qty}</span>
                    <button
                      type="button"
                      aria-label="Add one more"
                      onClick={handleAdd}
                      className="w-7 h-7 rounded-lg bg-[#FF5A1F] shadow-sm flex items-center justify-center hover:bg-[#e8430a] transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label={`Add ${item.name} to cart`}
                    onClick={handleAdd}
                    className="w-8 h-8 bg-[#FF5A1F] hover:bg-[#e8430a] text-white rounded-xl flex items-center justify-center shadow-md shadow-[#FF5A1F]/25 transition-all hover:scale-110"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative flex-shrink-0 self-start">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          </div>
          {!item.isAvailable && (
            <div className="absolute inset-0 rounded-xl bg-white/70 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-500 bg-white rounded-lg px-1.5 py-0.5 shadow-sm">Sold out</span>
            </div>
          )}
        </div>
      </div>

      {/* Customize modal — rendered outside the card div to avoid stacking context issues */}
      {showCustomize && (
        <MenuItemCustomizeModal
          item={item}
          restaurantName={restaurantName}
          onClose={() => setShowCustomize(false)}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
}
