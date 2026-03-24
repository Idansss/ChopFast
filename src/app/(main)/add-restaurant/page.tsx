"use client";

import Link from "next/link";
import { useState } from "react";

const benefits = [
  {
    icon: "👥",
    title: "Reach 1M+ customers",
    description:
      "Get instant access to Chopfast's active customer base across 8 African cities — no marketing spend needed to get started.",
  },
  {
    icon: "🆓",
    title: "Zero setup fee",
    description:
      "There's no cost to join Chopfast. We only earn when you earn — a simple revenue-share model with no hidden charges.",
  },
  {
    icon: "📊",
    title: "Real-time dashboard",
    description:
      "Manage your menu, track orders live, view earnings analytics, and chat with support from your dedicated restaurant portal.",
  },
  {
    icon: "💸",
    title: "Next-day payouts",
    description:
      "Your earnings are settled directly to your bank account the next business day — no waiting, no hassle.",
  },
];

const steps = [
  {
    step: "01",
    title: "Sign up",
    description: "Fill in your restaurant details and submit for review. Our team verifies your account within 48 hours.",
  },
  {
    step: "02",
    title: "Set up your menu",
    description: "Upload your dishes, prices, and photos using our simple menu builder. We'll help you get it right.",
  },
  {
    step: "03",
    title: "Go live & earn",
    description: "Once approved, your restaurant goes live on the Chopfast app and orders start flowing in immediately.",
  },
];

const cities = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Nairobi", "Accra", "Kampala"];
const cuisineTypes = ["Nigerian", "Ghanaian", "Kenyan", "Ethiopian", "Mediterranean", "Chinese", "Continental", "Fast Food", "Pastries & Bakery", "Seafood", "Vegetarian / Vegan", "Other"];

type FormFields = {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  cuisine: string;
};

export default function AddRestaurantPage() {
  const [form, setForm] = useState<FormFields>({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    cuisine: "",
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
        <section className="mb-14 text-center">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: "#FF5A1F22", color: "#FF5A1F" }}
          >
            Restaurant partners
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Grow your restaurant with Chopfast
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join 200+ restaurants already earning more with Chopfast. We handle the delivery — you focus on the food.
          </p>
        </section>

        {/* Benefits */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#1A1A2E" }}
          >
            Why partner with us?
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

        {/* Steps */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#1A1A2E" }}
          >
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-4"
                  style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#1A1A2E" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section>
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#1A1A2E" }}
            >
              Register your restaurant
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Complete the form below and our team will be in touch within 48 hours.
            </p>

            {submitted ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                  Application received!
                </h3>
                <p className="text-gray-600 text-sm">
                  Thank you for applying to join Chopfast. Our partnerships team will review your details and reach out to <strong>{form.email}</strong> within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="restaurantName"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Restaurant name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="restaurantName"
                      name="restaurantName"
                      type="text"
                      required
                      placeholder="e.g. Mama Nkechi's Kitchen"
                      value={form.restaurantName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                      style={{ ["--tw-ring-color" as string]: "#FF5A1F" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ownerName"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Owner / contact name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.ownerName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@restaurant.com"
                      value={form.email}
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
                      htmlFor="cuisine"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Cuisine type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="cuisine"
                      name="cuisine"
                      required
                      value={form.cuisine}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition bg-white"
                    >
                      <option value="">Select cuisine type</option>
                      {cuisineTypes.map((c) => (
                        <option key={c} value={c}>
                          {c}
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
                  {loading ? "Submitting…" : "Submit application"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
