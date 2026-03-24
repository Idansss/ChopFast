"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  item: MenuItem;
  restaurantName: string;
  onClose: () => void;
  onConfirm: (qty: number, instructions: string) => void;
}

export default function MenuItemCustomizeModal({ item, restaurantName, onClose, onConfirm }: Props) {
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState("");

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl z-50 overflow-hidden shadow-2xl">
        {/* Close */}
        <button type="button" aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10">
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Item image */}
        <div className="relative h-48 bg-gray-100">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="448px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#1A1A2E]">{item.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <p className="text-[#FF5A1F] font-bold mt-1">{formatCurrency(item.price)}</p>
          </div>

          {/* Special instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Special instructions{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="E.g. No onions, extra spicy, sauce on the side…"
              rows={2}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
            />
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </button>
              <span className="w-6 text-center font-bold text-[#1A1A2E]">{qty}</span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setQty(q => Math.min(10, q + 1))}
                className="w-7 h-7 bg-[#FF5A1F] rounded-lg shadow-sm flex items-center justify-center hover:bg-[#e8430a] transition-colors"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onConfirm(qty, instructions)}
              className="flex-1 bg-[#FF5A1F] text-white py-3 rounded-xl font-bold hover:bg-[#e8430a] transition-colors shadow-lg shadow-[#FF5A1F]/25"
            >
              Add {qty > 1 ? `${qty} items` : "to cart"} · {formatCurrency(item.price * qty)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
