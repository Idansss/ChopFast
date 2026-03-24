import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AfricanCurrency } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_CONFIG: Record<AfricanCurrency, { symbol: string; locale: string }> = {
  NGN: { symbol: "₦", locale: "en-NG" },
  GHS: { symbol: "₵", locale: "en-GH" },
  KES: { symbol: "KSh", locale: "en-KE" },
  ZAR: { symbol: "R", locale: "en-ZA" },
  EGP: { symbol: "E£", locale: "ar-EG" },
};

export function formatCurrency(
  amount: number,
  currency: AfricanCurrency = "NGN"
): string {
  const { symbol } = CURRENCY_CONFIG[currency];
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

export function getPriceRange(level: 1 | 2 | 3): string {
  return "₦".repeat(level) + "₦".repeat(3 - level).replace(/./g, "·");
}

export function getDeliveryTime(min: number, max: number): string {
  return `${min}–${max} min`;
}
