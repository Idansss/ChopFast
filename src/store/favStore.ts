"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavStore {
  ids: string[]; // restaurant IDs
  toggle: (id: string) => void;
  isFaved: (id: string) => boolean;
}

export const useFavStore = create<FavStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        set({ ids: ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id] });
      },
      isFaved: (id) => get().ids.includes(id),
    }),
    { name: "chopfast-favs" }
  )
);
