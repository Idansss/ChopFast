"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/mock";

export default function CategoryGrid() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1A1A2E]">What are you craving?</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/restaurants?cuisine=${cat.tag}`}
            className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-2xl px-5 py-4 shadow-card border border-gray-100 hover:border-[#FF5A1F] hover:shadow-elevated transition-all group"
          >
            {"flagCode" in cat && cat.flagCode ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                <Image
                  src={`https://flagcdn.com/w80/${cat.flagCode}.png`}
                  alt={cat.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
            )}
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
