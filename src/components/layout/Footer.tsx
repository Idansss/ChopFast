import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#FF5A1F] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="text-white font-bold text-xl">
                Chop<span className="text-[#FF5A1F]">fast</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Delivering your favourite African meals, fast and fresh.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook,  label: "Facebook",  href: "https://facebook.com/chopfast" },
                { Icon: Twitter,   label: "Twitter",   href: "https://twitter.com/chopfast" },
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com/chopfast" },
                { Icon: Youtube,   label: "YouTube",   href: "https://youtube.com/@chopfast" },
                { Icon: TikTokIcon, label: "TikTok",   href: "https://tiktok.com/@chopfast" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FF5A1F] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About us",  href: "/about" },
                { label: "Careers",   href: "/careers" },
                { label: "Blog",      href: "/blog" },
                { label: "Press",     href: "/press" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF5A1F] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Business</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Add your restaurant", href: "/add-restaurant" },
                { label: "Become a rider",       href: "/become-a-rider" },
                { label: "Partner with us",      href: "/partner" },
                { label: "Advertise",            href: "/advertise" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF5A1F] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Help center",      href: "/help" },
                { label: "Safety",           href: "/safety" },
                { label: "Terms of service", href: "/terms" },
                { label: "Privacy policy",   href: "/privacy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF5A1F] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-gray-500 mb-3">Available in</p>
          <div className="flex flex-wrap gap-2">
            {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Accra", "Nairobi", "Johannesburg", "Kampala"].map((city) => (
              <span key={city} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Chopfast Technologies Ltd. All rights reserved.
          </p>
          <div className="flex gap-2 text-xs text-gray-500">
            <span>🇳🇬 Nigeria</span>
            <span>·</span>
            <span>🇬🇭 Ghana</span>
            <span>·</span>
            <span>🇰🇪 Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
