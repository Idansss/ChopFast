"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types";

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      getOrder: (id) => get().orders.find(o => o.id === id || o.reference === id),
    }),
    { name: "chopfast-orders" }
  )
);
