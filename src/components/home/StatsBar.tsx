import { STATS } from "@/data/mock";

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1 px-4">
              <span className="text-3xl mb-1">{stat.icon}</span>
              <p className="text-2xl md:text-3xl font-bold text-[#1A1A2E]">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
