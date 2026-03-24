export default function PromoBanner() {
  const promos = [
    {
      id: 1,
      title: "₦0 delivery on your first order",
      subtitle: "Use code CHOP1ST at checkout",
      bg: "bg-gradient-to-r from-[#FF5A1F] to-[#ff8c5a]",
      emoji: "🎉",
    },
    {
      id: 2,
      title: "30% off all Jollof orders today",
      subtitle: "Limited time — ends midnight",
      bg: "bg-gradient-to-r from-[#1A1A2E] to-[#2d2d4e]",
      emoji: "🍛",
    },
    {
      id: 3,
      title: "Free drink with any burger",
      subtitle: "At Naija Burger Co. every Friday",
      bg: "bg-gradient-to-r from-[#FFB800] to-[#ffd43b]",
      emoji: "🍔",
    },
  ];

  return (
    <section className="py-6">
      <div className="flex gap-4 overflow-x-auto scroll-hide pb-2">
        {promos.map((p) => (
          <div
            key={p.id}
            className={`${p.bg} flex-shrink-0 rounded-2xl p-5 text-white cursor-pointer hover:opacity-90 transition-opacity`}
            style={{ minWidth: "280px" }}
          >
            <div className="text-4xl mb-3">{p.emoji}</div>
            <h3 className="font-bold text-base mb-1">{p.title}</h3>
            <p className="text-sm opacity-80">{p.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
