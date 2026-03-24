import { TESTIMONIALS } from "@/data/mock";

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">What our customers say</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-[#FFB800] text-xl">{s}</span>
            ))}
          </div>
          <p className="text-gray-500 text-sm">Rated 4.8/5 from over 50,000 reviews</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[#F8F8F9] rounded-2xl p-5 border border-gray-100 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#FFB800] text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2.5 border-t border-gray-200 pt-4">
                <div className="w-9 h-9 bg-[#FF5A1F]/10 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A2E]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
