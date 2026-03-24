"use client";

import Link from "next/link";
import { useState } from "react";

const benefits = [
  {
    icon: "📅",
    title: "Flexible hours",
    description: "Work whenever you want — morning, afternoon, or evening. You set your own schedule with no minimum hours.",
  },
  {
    icon: "💵",
    title: "Weekly pay",
    description: "Earnings are paid directly to your bank account every Friday. No delays, no paperwork.",
  },
  {
    icon: "🛡️",
    title: "Free insurance",
    description: "All Chopfast riders are covered by our comprehensive accident and third-party liability insurance at no cost.",
  },
  {
    icon: "📱",
    title: "Rider app",
    description: "The Chopfast Rider app gives you real-time order alerts, turn-by-turn navigation, earnings tracker, and 24/7 support chat.",
  },
];

const requirements = [
  "A working smartphone (Android 8.0+ or iOS 13+)",
  "A valid government-issued ID (NIN, passport, or driver's licence)",
  "A roadworthy motorbike or bicycle",
  "Ability to read a map and follow delivery instructions",
  "Minimum age of 18 years",
];

const cities = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Nairobi", "Accra", "Kampala"];
const vehicleTypes = ["Motorbike", "Bicycle", "Electric bicycle", "Tricycle (Keke)"];

type FormFields = {
  fullName: string;
  phone: string;
  city: string;
  vehicle: string;
};

export default function BecomeARiderPage() {
  const [form, setForm] = useState<FormFields>({
    fullName: "",
    phone: "",
    city: "",
    vehicle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
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

        {/* Hero */}
        <section className="mb-14">
          <div
            className="rounded-2xl p-8 sm:p-12 text-center"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ backgroundColor: "#FF5A1F22", color: "#FF5A1F" }}
            >
              Ride with Chopfast
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Earn up to{" "}
              <span style={{ color: "#FF5A1F" }}>₦150,000/month</span>{" "}
              on your own schedule
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Join 50,000+ riders who deliver with Chopfast across Africa. Flexible, rewarding, and backed by the best support in the business.
            </p>
          </div>
        </section>

        {/* Earnings breakdown */}
        <section className="mb-14">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "₦150k", label: "Max monthly earnings" },
              { value: "7 days", label: "Weekly payout" },
              { value: "24/7", label: "Rider support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <p
                  className="text-2xl sm:text-3xl font-extrabold mb-1"
                  style={{ color: "#FF5A1F" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#1A1A2E" }}
          >
            Rider benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: "#FF5A1F15" }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#1A1A2E" }}>
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#1A1A2E" }}
          >
            What you need to get started
          </h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-sm text-gray-700">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
                  >
                    ✓
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sign-up form */}
        <section>
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#1A1A2E" }}
            >
              Sign up to ride
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Fill in your details and our rider onboarding team will contact you within 24 hours.
            </p>

            {submitted ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <div className="text-5xl mb-4">🏍️</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                  You're on the list!
                </h3>
                <p className="text-gray-600 text-sm">
                  Thanks, <strong>{form.fullName}</strong>! Our rider onboarding team will call you on <strong>{form.phone}</strong> within 24 hours to complete your registration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition bg-white"
                    >
                      <option value="">Select your city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="vehicle"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Vehicle type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="vehicle"
                      name="vehicle"
                      required
                      value={form.vehicle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition bg-white"
                    >
                      <option value="">Select vehicle type</option>
                      {vehicleTypes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#FF5A1F" }}
                >
                  {loading ? "Submitting…" : "Start earning with Chopfast"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
