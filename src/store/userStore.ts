"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface SavedAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  street: string;
  city: string;
  landmark?: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  method?: string;
  ref: string;
  createdAt: string;
}

interface UserStore {
  user: User | null;
  city: string;
  savedAddresses: SavedAddress[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  login: (user: User) => void;
  logout: () => void;
  setCity: (city: string) => void;
  addAddress: (addr: SavedAddress) => void;
  removeAddress: (id: string) => void;
  updateAvatar: (avatar: string) => void;
  updateProfile: (patch: Partial<Pick<User, "firstName" | "lastName" | "phone">>) => void;
  topUpWallet: (amount: number, method: string, ref: string) => void;
  deductWallet: (amount: number, ref: string, description: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      city: "Lagos",
      savedAddresses: [],
      walletBalance: 0,
      walletTransactions: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      setCity: (city) => set({ city }),
      addAddress: (addr) =>
        set({ savedAddresses: [...get().savedAddresses, addr] }),
      removeAddress: (id) =>
        set({ savedAddresses: get().savedAddresses.filter((a) => a.id !== id) }),
      updateAvatar: (avatar) =>
        set((state) => ({ user: state.user ? { ...state.user, avatar } : null })),
      updateProfile: (patch) =>
        set((state) => ({ user: state.user ? { ...state.user, ...patch } : null })),
      topUpWallet: (amount, method, ref) => {
        const tx: WalletTransaction = {
          id: `tx-${Date.now()}`,
          type: "credit",
          amount,
          description: "Wallet top-up",
          method,
          ref,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          walletBalance: state.walletBalance + amount,
          walletTransactions: [tx, ...state.walletTransactions],
        }));
      },
      deductWallet: (amount, ref, description) => {
        const tx: WalletTransaction = {
          id: `tx-${Date.now()}`,
          type: "debit",
          amount,
          description,
          ref,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          walletBalance: Math.max(0, state.walletBalance - amount),
          walletTransactions: [tx, ...state.walletTransactions],
        }));
      },
    }),
    { name: "chopfast-user" }
  )
);
