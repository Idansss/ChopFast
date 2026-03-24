import Link from "next/link";

function TechCrunchLogo() {
  return (
    <svg viewBox="0 0 120 30" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="23" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#0A9E6A">T</text>
      <text x="16" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#1A1A2E">echCrunch</text>
    </svg>
  );
}

function CNNLogo() {
  return (
    <svg viewBox="0 0 80 28" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="3" fill="#CC0000"/>
      <text x="8" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="white">CNN</text>
    </svg>
  );
}

function TechpointLogo() {
  return (
    <svg viewBox="0 0 185 28" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="14" r="10" fill="#00C853"/>
      <text x="28" y="20" fontFamily="Arial, sans-serif" fontSize="15" fill="#1A1A2E">
        <tspan fontWeight="800">Techpoint</tspan>
        <tspan fontWeight="400" fill="#555"> Africa</tspan>
      </text>
    </svg>
  );
}

function BloombergLogo() {
  return (
    <svg viewBox="0 0 130 28" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#1A1A2E">Bloomberg</text>
    </svg>
  );
}

const coverage = [
  {
    outlet: "TechCrunch",
    Logo: TechCrunchLogo,
    headline: "Chopfast raises $18M Series A to expand Africa's fastest food delivery network",
    date: "November 4, 2025",
    url: "https://techcrunch.com",
  },
  {
    outlet: "CNN Africa",
    Logo: CNNLogo,
    headline: "How a Lagos startup is transforming the way 8 African cities eat",
    date: "September 12, 2025",
    url: "https://edition.cnn.com/africa",
  },
  {
    outlet: "Techpoint Africa",
    Logo: TechpointLogo,
    headline: "Chopfast hits 1 million orders milestone, eyes expansion to East Africa",
    date: "July 22, 2025",
    url: "https://techpoint.africa",
  },
  {
    outlet: "Bloomberg Africa",
    Logo: BloombergLogo,
    headline: "Africa's food delivery sector heats up as Chopfast, rivals battle for market share",
    date: "May 8, 2025",
    url: "https://bloomberg.com/africa",
  },
];

const assets = [
  { name: "Chopfast logo (SVG)", size: "12 KB", type: "SVG" },
  { name: "Chopfast logo (PNG, white)", size: "48 KB", type: "PNG" },
  { name: "Chopfast logo (PNG, dark)", size: "51 KB", type: "PNG" },
  { name: "Brand guidelines PDF", size: "2.4 MB", type: "PDF" },
  { name: "Founder headshots (ZIP)", size: "14 MB", type: "ZIP" },
  { name: "Product screenshots (ZIP)", size: "32 MB", type: "ZIP" },
];

const facts = [
  "Founded in Lagos, Nigeria in 2022",
  "Operates in 8 cities across 5 African countries",
  "Over 1 million orders delivered to date",
  "200+ restaurant partners across all markets",
  "50,000+ active delivery riders",
  "Average delivery time: 35 minutes",
  "Series A funded — $18M raised (2025)",
];

export default function PressPage() {
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
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Press &amp; Media
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
            Welcome to the Chopfast newsroom. Find press releases, brand assets, coverage highlights, and contact information for media enquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FF5A1F" }}
            >
              📦 Download press kit
            </a>
            <a
              href="mailto:press@chopfast.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: "#1A1A2E", color: "#1A1A2E" }}
            >
              ✉️ press@chopfast.com
            </a>
          </div>
        </section>

        {/* Quick facts */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#1A1A2E" }}
          >
            Company facts
          </h2>
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <ul className="space-y-3">
              {facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-gray-300 text-sm">
                  <span style={{ color: "#FF5A1F" }} className="mt-0.5 flex-shrink-0">
                    ▸
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Press coverage */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#1A1A2E" }}
          >
            Recent coverage
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {coverage.map((item) => (
              <a
                key={item.headline}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-center gap-3 mb-3 h-7">
                  <item.Logo />
                </div>
                <p className="text-sm font-semibold leading-snug text-gray-800 mb-2">
                  {item.headline}
                </p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Brand assets */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#1A1A2E" }}
          >
            Brand assets
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            All assets below are licensed for editorial use only. Commercial use requires written consent from Chopfast. Please do not alter, distort, or recolour the logo.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {assets.map((asset) => (
              <div
                key={asset.name}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{asset.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{asset.size}</p>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#FF5A1F15", color: "#FF5A1F" }}
                >
                  ↓ {asset.type}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Media contact */}
        <section>
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: "#FF5A1F" }}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Media contact
            </h2>
            <p className="text-orange-100 text-sm mb-4">
              For press enquiries, interview requests, and media partnerships, please reach out to our communications team. We aim to respond within 24 hours on business days.
            </p>
            <div className="space-y-1">
              <p className="text-white font-semibold">Adaeze Okonkwo — Head of Communications</p>
              <a
                href="mailto:press@chopfast.com"
                className="text-orange-100 text-sm underline hover:text-white"
              >
                press@chopfast.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
