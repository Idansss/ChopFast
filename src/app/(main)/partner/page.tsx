"use client";

import Link from "next/link";
import { useState } from "react";

const partnershipTypes = [
  {
    icon: "🏢",
    title: "Corporate catering",
    description:
      "Feed your team with daily office meals, working lunches, and team events. We handle logistics for companies of all sizes.",
  },
  {
    icon: "🎉",
    title: "Event catering",
    description:
      "From product launches to weddings and conferences, Chopfast coordinates food delivery for large-scale events across our cities.",
  },
  {
    icon: "📦",
    title: "Bulk orders",
    description:
      "NGOs, schools, hospitals, and government institutions rely on Chopfast for large-scale daily meal programmes at negotiated rates.",
  },
  {
    icon: "🔌",
    title: "API integration",
    description:
      "Embed Chopfast delivery capabilities directly into your platform using our developer API — ideal for marketplaces and super-apps.",
  },
];

const partnerSelectOptions = [
  "Corporate catering",
  "Event catering",
  "Bulk orders",
  "API integration",
  "Other",
];

type FormFields = {
  companyName: string;
  contactName: string;
  email: string;
  partnershipType: string;
  message: string;
};

export default function PartnerPage() {
  const [form, setForm] = useState<FormFields>({
    companyName: "",
    contactName: "",
    email: "",
    partnershipType: "",
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
            Partnerships
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Partner with Chopfast
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're feeding a team of 10 or serving 10,000 guests at an event, Chopfast has a partnership model built for your scale.
          </p>
        </section>

        {/* Partnership types */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#1A1A2E" }}
          >
            Partnership types
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {partnershipTypes.map((pt) => (
              <div
                key={pt.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: "#FF5A1F15" }}
                >
                  {pt.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#1A1A2E" }}
                >
                  {pt.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pt.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Logos / social proof */}
        <section className="mb-14">
          <p className="text-center text-sm text-gray-400 font-medium mb-6 uppercase tracking-widest">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Flutterwave", "MTN Nigeria", "Access Bank", "UN WFP Nigeria", "Andela"].map(
              (org) => (
                <div
                  key={org}
                  className="px-5 py-2.5 bg-white rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-gray-500"
                >
                  {org}
                </div>
              )
            )}
          </div>
        </section>

        {/* Contact form */}
        <section>
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#1A1A2E" }}
            >
              Get in touch
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Tell us about your organisation and partnership interests and a member of our business development team will respond within 2 business days.
            </p>

            {submitted ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                  Thanks for reaching out!
                </h3>
                <p className="text-gray-600 text-sm">
                  We've received your partnership enquiry from <strong>{form.companyName}</strong>. Our business development team will contact <strong>{form.email}</strong> within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      placeholder="Your company or organisation"
                      value={form.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Contact name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Work email <span className="text-red-500">*</span>
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

                <div>
                  <label
                    htmlFor="partnershipType"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Partnership type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    value={form.partnershipType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition bg-white"
                  >
                    <option value="">Select partnership type</option>
                    {partnerSelectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your needs, scale, and any specific requirements…"
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
                  {loading ? "Sending…" : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
