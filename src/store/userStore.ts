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

interface UserAccount {
  user: User;
  savedAddresses: SavedAddress[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
}

interface UserStore {
  // Active session
  user: User | null;
  city: string;
  savedAddresses: SavedAddress[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];

  // Persisted accounts registry (keyed by email)
  accounts: Record<string, UserAccount>;

  register: (user: User) => void;
  loginByEmail: (email: string) => boolean;
  login: (user: User) => void; // kept for compatibility
  logout: () => void;
  setCity: (city: string) => void;
  addAddress: (addr: SavedAddress) => void;
  removeAddress: (id: string) => void;
  updateAvatar: (avatar: string) => void;
  updateProfile: (patch: Partial<Pick<User, "firstName" | "lastName" | "phone">>) => void;
  topUpWallet: (amount: number, method: string, ref: string) => void;
  deductWallet: (amount: number, ref: string, description: string) => void;
}

function saveToAccounts(state: UserStore): Partial<UserStore> {
  if (!state.user) return {};
  return {
    accounts: {
      ...state.accounts,
      [state.user.email]: {
        user: state.user,
        savedAddresses: state.savedAddresses,
        walletBalance: state.walletBalance,
        walletTransactions: state.walletTransactions,
      },
    },
  };
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      city: "Lagos",
      savedAddresses: [],
      walletBalance: 0,
      walletTransactions: [],
      accounts: {},

      // Create a new account and log in
      register: (user) =>
        set((state) => ({
          user,
          savedAddresses: [],
          walletBalance: 0,
          walletTransactions: [],
          accounts: {
            ...state.accounts,
            [user.email]: {
              user,
              savedAddresses: [],
              walletBalance: 0,
              walletTransactions: [],
            },
          },
        })),

      // Look up existing account by email and restore everything
      loginByEmail: (email) => {
        const account = get().accounts[email];
        if (!account) return false;
        set({
          user: account.user,
          savedAddresses: account.savedAddresses,
          walletBalance: account.walletBalance,
          walletTransactions: account.walletTransactions,
        });
        return true;
      },

      // Legacy — used by register page directly
      login: (user) =>
        set((state) => {
          const existing = state.accounts[user.email];
          if (existing) {
            return {
              user: existing.user,
              savedAddresses: existing.savedAddresses,
              walletBalance: existing.walletBalance,
              walletTransactions: existing.walletTransactions,
            };
          }
          return {
            user,
            savedAddresses: [],
            walletBalance: 0,
            walletTransactions: [],
            accounts: {
              ...state.accounts,
              [user.email]: { user, savedAddresses: [], walletBalance: 0, walletTransactions: [] },
            },
          };
        }),

      // Save current state to accounts before clearing session
      logout: () =>
        set((state) => ({
          ...saveToAccounts(state),
          user: null,
        })),

      setCity: (city) => set({ city }),

      addAddress: (addr) =>
        set((state) => {
          const savedAddresses = [...state.savedAddresses, addr];
          const accounts = state.user
            ? { ...state.accounts, [state.user.email]: { ...state.accounts[state.user.email], savedAddresses } }
            : state.accounts;
          return { savedAddresses, accounts };
        }),

      removeAddress: (id) =>
        set((state) => {
          const savedAddresses = state.savedAddresses.filter((a) => a.id !== id);
          const accounts = state.user
            ? { ...state.accounts, [state.user.email]: { ...state.accounts[state.user.email], savedAddresses } }
            : state.accounts;
          return { savedAddresses, accounts };
        }),

      updateAvatar: (avatar) =>
        set((state) => {
          const user = state.user ? { ...state.user, avatar } : null;
          const accounts = user
            ? { ...state.accounts, [user.email]: { ...state.accounts[user.email], user } }
            : state.accounts;
          return { user, accounts };
        }),

      updateProfile: (patch) =>
        set((state) => {
          const user = state.user ? { ...state.user, ...patch } : null;
          const accounts = user
            ? { ...state.accounts, [user.email]: { ...state.accounts[user.email], user } }
            : state.accounts;
          return { user, accounts };
        }),

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
        set((state) => {
          const walletBalance = state.walletBalance + amount;
          const walletTransactions = [tx, ...state.walletTransactions];
          const accounts = state.user
            ? { ...state.accounts, [state.user.email]: { ...state.accounts[state.user.email], walletBalance, walletTransactions } }
            : state.accounts;
          return { walletBalance, walletTransactions, accounts };
        });
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
        set((state) => {
          const walletBalance = Math.max(0, state.walletBalance - amount);
          const walletTransactions = [tx, ...state.walletTransactions];
          const accounts = state.user
            ? { ...state.accounts, [state.user.email]: { ...state.accounts[state.user.email], walletBalance, walletTransactions } }
            : state.accounts;
          return { walletBalance, walletTransactions, accounts };
        });
      },
    }),
    { name: "chopfast-user" }
  )
);
