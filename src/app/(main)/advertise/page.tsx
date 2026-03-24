"use client";

import Link from "next/link";
import { useState } from "react";

const stats = [
  { value: "2M+", label: "Monthly active users" },
  { value: "8", label: "Cities across Africa" },
  { value: "35 min", label: "Avg. session length" },
  { value: "68%", label: "Users aged 18–35" },
];

const adFormats = [
  {
    icon: "🖼️",
    title: "Banner ads",
    description:
      "Full-width and half-page display banners placed prominently on the Chopfast home feed, restaurant listings, and search results pages. High visibility, low cost-per-impression.",
    badge: "Most popular",
    badgeColor: "#FF5A1F",
  },
  {
    icon: "🍽️",
    title: "Sponsored listings",
    description:
      "Boost your restaurant or product to the top of relevant search and category pages. Sponsored listings are clearly labelled and drive 3× higher click-through rates.",
    badge: null,
    badgeColor: "",
  },
  {
    icon: "🔔",
    title: "Push notifications",
    description:
      "Reach opted-in users directly on their devices with personalised push alerts. Ideal for flash promotions, new menu launches, and time-sensitive offers.",
    badge: "High CTR",
    badgeColor: "#3B82F6",
  },
  {
    icon: "📧",
    title: "Email campaigns",
    description:
      "Feature your brand in Chopfast's weekly newsletter sent to 400,000+ subscribers. Native ad placements blend seamlessly with editorial content for higher engagement.",
    badge: null,
    badgeColor: "",
  },
];

const budgetRanges = [
  "Under $500/month",
  "$500 – $2,000/month",
  "$2,000 – $5,000/month",
  "$5,000 – $20,000/month",
  "$20,000+/month",
  "One-time campaign",
];

type FormFields = {
  company: string;
  email: string;
  budget: string;
  message: string;
};

export default function AdvertisePage() {
  const [form, setForm] = useState<FormFields>({
    company: "",
    email: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
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
            Advertising
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Reach 2 million hungry Africans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advertise on Chopfast and put your brand directly in front of engaged, high-intent customers across Africa's fastest-growing cities.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm"
              >
                <p
                  className="text-3xl font-extrabold mb-1"
                  style={{ color: "#FF5A1F" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad formats */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#1A1A2E" }}
          >
            Advertising formats
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {adFormats.map((format) => (
              <div
                key={format.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: "#FF5A1F15" }}
                  >
                    {format.icon}
                  </div>
                  {format.badge && (
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: format.badgeColor }}
                    >
                      {format.badge}
                    </span>
                  )}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#1A1A2E" }}
                >
                  {format.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Audience callout */}
        <section className="mb-14">
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Who you'll reach
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Chopfast users are urban, digital-native professionals and students across Nigeria, Kenya, Ghana, and Uganda. They are active on their smartphones throughout the day, placing orders during lunch breaks, evenings, and weekends — making them one of the most valuable advertising audiences in Africa.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { value: "68%", label: "Mobile-first users" },
                { value: "74%", label: "25–40 age bracket" },
                { value: "4.2×", label: "Weekly order frequency" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold" style={{ color: "#FF5A1F" }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section>
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#1A1A2E" }}
            >
              Start advertising
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Tell us about your campaign and a member of our advertising team will send you a media kit and pricing within 1 business day.
            </p>

            {submitted ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <div className="text-5xl mb-4">📣</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                  Enquiry received!
                </h3>
                <p className="text-gray-600 text-sm">
                  Thanks for your interest in advertising on Chopfast. We'll send our media kit and custom pricing to <strong>{form.email}</strong> within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      placeholder="Your company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                    />
                  </div>
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
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Monthly budget range <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition bg-white"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Campaign details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your campaign goals, target audience, and preferred ad formats…"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#FF5A1F" }}
                >
                  {loading ? "Sending…" : "Request media kit"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
