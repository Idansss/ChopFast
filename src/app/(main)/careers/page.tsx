import Link from "next/link";

const roles = [
  {
    department: "Engineering",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    jobs: [
      {
        title: "Senior Backend Engineer",
        location: "Lagos, Nigeria",
        type: "Full-time",
        description:
          "Design and scale the microservices that power millions of food orders. You'll work with Node.js, Go, and PostgreSQL on high-traffic systems.",
      },
      {
        title: "Mobile Engineer (React Native)",
        location: "Nairobi, Kenya",
        type: "Full-time",
        description:
          "Build and improve the Chopfast customer and rider apps used by hundreds of thousands of Africans daily.",
      },
      {
        title: "Frontend Engineer",
        location: "Remote (Africa)",
        type: "Full-time",
        description:
          "Craft fast, accessible, and beautiful web experiences using Next.js, TypeScript, and Tailwind CSS.",
      },
    ],
  },
  {
    department: "Operations",
    color: "#10B981",
    bgColor: "#ECFDF5",
    jobs: [
      {
        title: "City Operations Manager",
        location: "Accra, Ghana",
        type: "Full-time",
        description:
          "Own end-to-end operations in Accra — from rider supply and restaurant relations to SLA performance and city growth.",
      },
      {
        title: "Logistics Coordinator",
        location: "Abuja, Nigeria",
        type: "Full-time",
        description:
          "Coordinate daily rider dispatching, resolve delivery escalations, and improve logistics efficiency metrics.",
      },
    ],
  },
  {
    department: "Marketing",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    jobs: [
      {
        title: "Growth Marketing Manager",
        location: "Lagos, Nigeria",
        type: "Full-time",
        description:
          "Drive customer acquisition and retention through performance marketing, partnerships, and data-driven campaigns across West Africa.",
      },
    ],
  },
];

const perks = [
  { icon: "💰", label: "Competitive pay + equity" },
  { icon: "🏥", label: "Full health insurance" },
  { icon: "🌍", label: "Pan-African team" },
  { icon: "📚", label: "Learning & development budget" },
  { icon: "🏖️", label: "Generous PTO policy" },
  { icon: "🍔", label: "Free Chopfast meals (obviously)" },
];

export default function CareersPage() {
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
            We're hiring
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Join the team building Africa's fastest food platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're a diverse, ambitious team spread across Lagos, Nairobi, Accra, and beyond. If you're excited by hard problems and bold ideas, you'll fit right in.
          </p>
        </section>

        {/* Perks */}
        <section className="mb-14">
          <h2
            className="text-xl font-bold mb-6 text-center"
            style={{ color: "#1A1A2E" }}
          >
            Why Chopfast?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm"
              >
                <span className="text-2xl">{perk.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {perk.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: "#1A1A2E" }}
          >
            Open roles
          </h2>
          <div className="space-y-10">
            {roles.map((dept) => (
              <div key={dept.department}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: dept.bgColor,
                      color: dept.color,
                    }}
                  >
                    {dept.department}
                  </span>
                  <span className="text-sm text-gray-400">
                    {dept.jobs.length} open role{dept.jobs.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-4">
                  {dept.jobs.map((job) => (
                    <div
                      key={job.title}
                      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ color: "#1A1A2E" }}
                        >
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            📍 {job.location}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "#FF5A1F15",
                              color: "#FF5A1F",
                            }}
                          >
                            {job.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={`mailto:careers@chopfast.com?subject=Application – ${encodeURIComponent(job.title)}&body=Hi Chopfast team,%0D%0A%0D%0AI'd like to apply for the ${encodeURIComponent(job.title)} role (${encodeURIComponent(job.location)}).%0D%0A%0D%0A[Attach your CV and a short intro here]`}
                          className="inline-block w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 text-center"
                          style={{ backgroundColor: "#FF5A1F" }}
                        >
                          Apply now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Don't see a role */}
        <section>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Don't see a role that fits?
            </h2>
            <p className="text-gray-400 mb-5 text-sm">
              We're always on the lookout for exceptional talent. Send us your CV and tell us how you'd make Chopfast better.
            </p>
            <a
              href="mailto:careers@chopfast.com"
              className="inline-block font-bold px-8 py-3 rounded-full text-white border-2 transition-colors hover:bg-white"
              style={{
                borderColor: "#FF5A1F",
                color: "#FF5A1F",
              }}
            >
              Send an open application
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
