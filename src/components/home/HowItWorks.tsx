export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      emoji: "📍",
      title: "Set your location",
      desc: "Enter your delivery address and we'll show you restaurants delivering to you right now.",
    },
    {
      step: "02",
      emoji: "🍽️",
      title: "Choose your meal",
      desc: "Browse 200+ restaurants, read menus and add your favourite dishes to your cart.",
    },
    {
      step: "03",
      emoji: "💳",
      title: "Pay securely",
      desc: "Pay with card, bank transfer, or your Chopfast wallet. Powered by Paystack.",
    },
    {
      step: "04",
      emoji: "🛵",
      title: "Track live",
      desc: "Watch your rider on a live map and get real-time updates from kitchen to door.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">How Chopfast works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Order your favourite food in four simple steps. Fresh, fast, and always on time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] right-[-50%] h-px border-t-2 border-dashed border-gray-200 z-0" />
              )}

              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center hover:shadow-elevated hover:-translate-y-1 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF5A1F] to-[#ff8c5a] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-[#FF5A1F]/25">
                  {s.emoji}
                </div>
                <div className="text-xs font-bold text-[#FF5A1F] mb-1">{s.step}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
