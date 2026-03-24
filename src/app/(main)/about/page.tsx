import Link from "next/link";

const stats = [
  { value: "1M+", label: "Orders delivered" },
  { value: "200+", label: "Restaurant partners" },
  { value: "8", label: "Cities covered" },
  { value: "50k+", label: "Active riders" },
];

const values = [
  {
    icon: "⚡",
    title: "Speed",
    description:
      "We obsess over delivery time. Our average delivery window is 35 minutes or less — because great food shouldn't make you wait.",
  },
  {
    icon: "🍽️",
    title: "Quality",
    description:
      "Every restaurant on Chopfast is vetted for food safety, hygiene standards, and customer ratings before they go live on our platform.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "We are built for Africa, by Africans. We invest in local riders, partner with small businesses, and celebrate the continent's food culture.",
  },
  {
    icon: "💡",
    title: "Technology",
    description:
      "From AI-powered route optimisation to real-time order tracking, we use cutting-edge technology to make every delivery seamless.",
  },
];

const team = [
  {
    name: "Abass Ibrahim",
    role: "Co-founder & CEO",
    bio: "Former product lead at Flutterwave. Passionate about building infrastructure for Africa's food economy.",
  },
  {
    name: "Abass Ibrahim",
    role: "Co-founder & CTO",
    bio: "Ex-Google engineer with 10 years of experience scaling distributed systems across emerging markets.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "VP Operations",
    bio: "Built and scaled logistics networks across 6 African countries. Joined Chopfast in 2023.",
  },
  {
    name: "Kofi Mensah",
    role: "VP Growth",
    bio: "Growth strategist who helped scale three unicorn startups across West Africa.",
  },
];

export default function AboutPage() {
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
        <section className="mb-16 text-center">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: "#FF5A1F22", color: "#FF5A1F" }}
          >
            Our story
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Feeding Africa, one delivery at a time
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chopfast was born from a simple frustration — getting great local food delivered quickly in Lagos was nearly impossible. We decided to fix that, and haven't stopped since.
          </p>
        </section>

        {/* Founding story */}
        <section className="mb-16">
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ backgroundColor: "#1A1A2E", color: "#fff" }}
          >
            <h2 className="text-2xl font-bold mb-4">How it started</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              In 2022, co-founder Abass Ibrahim was working late nights at a tech hub in Lagos' Victoria Island. Every evening, ordering suya, jollof rice, or egusi soup from the restaurants they loved meant hour-long waits and cold food. They mapped the problem: fragmented restaurant systems, no real-time tracking, and riders with no support network.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Within six months, they had built the first version of Chopfast, onboarded 12 restaurants in Lekki, and processed their first 1,000 orders. By the end of 2022, they had expanded to Abuja. By 2023, Chopfast operated in Lagos, Abuja, Port Harcourt, Kano, Ibadan, Nairobi, Accra, and Kampala.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, Chopfast is the fastest-growing food delivery platform in West Africa — proudly African, unapologetically bold, and obsessively fast.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#1A1A2E" }}
          >
            Chopfast by the numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-6 text-center shadow-sm bg-white border border-gray-100"
              >
                <p
                  className="text-4xl font-extrabold mb-1"
                  style={{ color: "#FF5A1F" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#1A1A2E" }}
          >
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: "#FF5A1F15" }}
                >
                  {v.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "#1A1A2E" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#1A1A2E" }}
          >
            Meet the leadership team
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                  style={{
                    backgroundColor: "#1A1A2E",
                    color: "#FF5A1F",
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h3
                  className="text-lg font-bold mb-0.5"
                  style={{ color: "#1A1A2E" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#FF5A1F" }}
                >
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: "#FF5A1F" }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Want to be part of the story?
            </h2>
            <p className="text-orange-100 mb-6">
              We're hiring across engineering, operations, and marketing. Come build Africa's food future with us.
            </p>
            <Link
              href="/careers"
              className="inline-block bg-white font-bold px-8 py-3 rounded-full transition-opacity hover:opacity-90"
              style={{ color: "#FF5A1F" }}
            >
              View open roles
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
