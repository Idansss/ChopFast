import Link from "next/link";

const safetyPillars = [
  {
    icon: "🪪",
    title: "Rider verification",
    description:
      "Every rider on the Chopfast platform undergoes a rigorous onboarding process before their first delivery. This includes government-issued ID verification, a criminal background check, vehicle roadworthiness inspection, and a mandatory safety orientation session. Riders are continuously monitored using real-time GPS and a customer rating system that flags any anomalies.",
    details: [
      "Government ID and background check",
      "Vehicle inspection and road safety assessment",
      "Mandatory safety orientation training",
      "Ongoing GPS monitoring and behavioural rating",
    ],
  },
  {
    icon: "🍱",
    title: "Food safety standards",
    description:
      "We take the quality and safety of every meal seriously. All restaurant partners must meet Chopfast's food safety certification requirements before going live on the platform. Our team conducts surprise audits and acts on every food quality complaint within 24 hours.",
    details: [
      "Restaurant hygiene certification required at onboarding",
      "Tamper-evident packaging mandatory for all orders",
      "Temperature-controlled delivery bags provided to riders",
      "Complaint-driven audit system — issues resolved in 24 hours",
    ],
  },
  {
    icon: "📦",
    title: "Contactless delivery",
    description:
      "Customers can opt for contactless delivery at any time — no interaction with the rider required. The rider places the order at the specified safe drop-off point and sends a photo confirmation. This option is always available regardless of the reason for the request.",
    details: [
      "Available on every order with a single toggle",
      "Rider receives clear contactless instructions",
      "Photo confirmation sent on drop-off",
      "No reason required to activate contactless mode",
    ],
  },
  {
    icon: "🆘",
    title: "Emergency support",
    description:
      "Safety incidents can happen. We've built a rapid-response emergency support system available 24/7. Customers and riders can trigger an emergency alert directly from the app, which immediately notifies our safety team and — where necessary — local emergency services.",
    details: [
      "In-app emergency SOS button for customers and riders",
      "24/7 safety response team across all cities",
      "Partnership with local emergency services in all operating cities",
      "Incident reporting and post-event welfare follow-up",
    ],
  },
];

const trustStats = [
  { value: "99.8%", label: "Safe deliveries" },
  { value: "100%", label: "Riders ID-verified" },
  { value: "24/7", label: "Safety team coverage" },
  { value: "<2 min", label: "Emergency response time" },
];

export default function SafetyPage() {
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
            Safety first
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Safety at Chopfast
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe every customer, rider, and restaurant partner deserves a safe experience. Safety isn't a feature — it's the foundation of everything we do.
          </p>
        </section>

        {/* Trust stats */}
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm"
              >
                <p
                  className="text-2xl sm:text-3xl font-extrabold mb-1"
                  style={{ color: "#FF5A1F" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety pillars */}
        <section className="mb-14 space-y-6">
          {safetyPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: "#FF5A1F15" }}
                >
                  {pillar.icon}
                </div>
                <div className="flex-1">
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1A1A2E" }}
                  >
                    {pillar.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2">
                    {pillar.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
                        >
                          ✓
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Report a safety issue */}
        <section>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Experienced a safety incident?
            </h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              We take every safety report seriously. If you've experienced or witnessed a safety issue involving a Chopfast rider, restaurant, or platform interaction, please report it immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="px-8 py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FF5A1F" }}
              >
                🆘 Report a safety issue
              </button>
              <a
                href="mailto:safety@chopfast.com"
                className="px-8 py-3 rounded-full font-bold text-sm border-2 border-gray-600 text-gray-300 transition-colors hover:border-gray-400 text-center"
              >
                ✉️ safety@chopfast.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
