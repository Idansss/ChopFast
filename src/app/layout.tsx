import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import { ToastProvider } from "@/components/shared/Toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chopfast — African Food Delivery",
  description: "Order your favourite African meals online. Fast delivery across Lagos, Accra, Nairobi and more.",
  keywords: "food delivery, jollof rice, Nigerian food, African food, Lagos delivery, Accra delivery",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          {children}
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
