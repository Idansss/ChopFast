"use client";
import { create } from "zustand";

interface CheckoutStore {
  deliveryAddress: string;
  deliveryCity: string;
  deliveryLandmark: string;
  setDeliveryDetails: (address: string, city: string, landmark: string) => void;
  clear: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  deliveryAddress: "",
  deliveryCity: "Lagos",
  deliveryLandmark: "",
  setDeliveryDetails: (address, city, landmark) =>
    set({ deliveryAddress: address, deliveryCity: city, deliveryLandmark: landmark }),
  clear: () => set({ deliveryAddress: "", deliveryCity: "Lagos", deliveryLandmark: "" }),
}));
