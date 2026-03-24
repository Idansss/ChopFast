"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;

  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;

  // computed
  itemCount: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  serviceFee: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: null,

      addItem: (item) => {
        const { items, restaurantId } = get();

        // Different restaurant — clear cart first
        if (restaurantId && restaurantId !== item.restaurantId) {
          set({ items: [item], restaurantId: item.restaurantId, restaurantName: item.restaurantName });
          return;
        }

        const existing = items.find((i) => i.menuItemId === item.menuItemId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, item],
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
          });
        }
      },

      removeItem: (menuItemId) => {
        const items = get().items.filter((i) => i.menuItemId !== menuItemId);
        set({ items, restaurantId: items.length ? get().restaurantId : null });
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      deliveryFee: () => (get().items.length ? 700 : 0),
      serviceFee: () => Math.round(get().subtotal() * 0.05),
      total: () => get().subtotal() + get().deliveryFee() + get().serviceFee(),
    }),
    { name: "chopfast-cart" }
  )
);
