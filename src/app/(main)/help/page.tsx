"use client";

import Link from "next/link";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  section: string;
  icon: string;
  items: FaqItem[];
};

const faqs: FaqSection[] = [
  {
    section: "Orders",
    icon: "🛒",
    items: [
      {
        question: "How do I place an order on Chopfast?",
        answer:
          "Open the Chopfast app, browse restaurants near you, add items to your cart, choose a delivery address, select your payment method, and tap 'Place order'. You'll receive a confirmation notification immediately and can track your order in real time.",
      },
      {
        question: "Can I schedule an order for later?",
        answer:
          "Yes! When checking out, tap 'Schedule delivery' and choose a date and time up to 7 days in advance. The restaurant will prepare your order fresh just before your chosen delivery slot.",
      },
      {
        question: "How do I make changes to an order I've just placed?",
        answer:
          "You have a 2-minute window after placing an order to cancel or modify it. After that, the restaurant has begun preparing your food. Go to 'My orders' in the app and tap 'Contact support' if you need assistance.",
      },
      {
        question: "What happens if a restaurant runs out of an item I ordered?",
        answer:
          "If an item becomes unavailable after you've ordered, the restaurant will notify us and we'll contact you via app notification and SMS. You can accept a substitution or receive a full refund for the missing item within 24 hours.",
      },
    ],
  },
  {
    section: "Payments",
    icon: "💳",
    items: [
      {
        question: "What payment methods does Chopfast accept?",
        answer:
          "We accept debit and credit cards (Visa, Mastercard), mobile money (M-Pesa, MTN MoMo), bank transfers, USSD, and Chopfast Wallet. All transactions are encrypted and secured with 3D Secure authentication.",
      },
      {
        question: "How do I get a refund?",
        answer:
          "Refunds are issued for orders that are cancelled before preparation, undelivered orders, or orders with significant quality issues. To request a refund, go to 'My orders' → select the order → tap 'Report an issue'. Approved refunds are processed within 3–5 business days.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payment failures are usually caused by insufficient funds, incorrect card details, or a block placed by your bank. Try a different payment method, or contact your bank to authorise the transaction. If the problem persists, reach out to our support team.",
      },
    ],
  },
  {
    section: "Delivery",
    icon: "🚴",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Average delivery time is 35 minutes, though this varies based on restaurant preparation time, distance, and traffic conditions. Your app will show a live ETA once your rider picks up your order.",
      },
      {
        question: "Can I track my rider in real time?",
        answer:
          "Absolutely. Once your order is picked up, you'll see your rider's live location on a map in the app. You can also call or message them directly through the app without sharing personal phone numbers.",
      },
      {
        question: "What should I do if my order hasn't arrived?",
        answer:
          "If your estimated delivery time has passed, check the live tracking map first. If the rider appears stuck or unresponsive, tap 'Contact support' within the order screen and our team will investigate immediately and ensure you're taken care of.",
      },
    ],
  },
  {
    section: "Account",
    icon: "👤",
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "On the login screen, tap 'Forgot password' and enter your registered email or phone number. You'll receive a reset link via email or an OTP via SMS. Follow the instructions to create a new password.",
      },
      {
        question: "How do I delete my Chopfast account?",
        answer:
          "You can request account deletion from Settings → Account → Delete account. Please note that deletion is permanent and all order history, saved addresses, and wallet balances will be erased. Pending refunds must be settled before deletion is processed.",
      },
    ],
  },
];

export default function HelpPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F8F9" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: "#FF5A1F" }}
        >
          ← Back to home
        </Link>

        {/* Header */}
        <section className="mb-10 text-center">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          {/* Search bar (UI only) */}
          <div className="max-w-xl mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search for help articles…"
              className="w-full pl-10 pr-4 py-3.5 rounded-full border border-gray-200 bg-white text-sm outline-none shadow-sm focus:ring-2 transition"
              style={{ ["--tw-ring-color" as string]: "#FF5A1F" }}
            />
          </div>
        </section>

        {/* FAQ sections */}
        <section className="mb-14 space-y-8">
          {faqs.map((section) => (
            <div key={section.section}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "#1A1A2E" }}
                >
                  {section.section}
                </h2>
              </div>
              <div className="space-y-2">
                {section.items.map((item, idx) => {
                  const key = `${section.section}-${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="text-sm font-semibold pr-4"
                          style={{ color: "#1A1A2E" }}
                        >
                          {item.question}
                        </span>
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform"
                          style={{
                            backgroundColor: isOpen ? "#FF5A1F" : "#FF5A1F15",
                            color: isOpen ? "#fff" : "#FF5A1F",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          }}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Contact support */}
        <section>
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Still need help?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Our customer support team is available 7 days a week, 6 AM – 11 PM WAT. We typically respond within 5 minutes during peak hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FF5A1F" }}
              >
                💬 Live chat
              </button>
              <a
                href="mailto:support@chopfast.com"
                className="flex-1 py-3 rounded-full font-bold text-center text-sm border-2 border-gray-600 text-gray-300 transition-colors hover:border-gray-400"
              >
                ✉️ Email support
              </a>
              <a
                href="tel:+2348001234567"
                className="flex-1 py-3 rounded-full font-bold text-center text-sm border-2 border-gray-600 text-gray-300 transition-colors hover:border-gray-400"
              >
                📞 Call us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
