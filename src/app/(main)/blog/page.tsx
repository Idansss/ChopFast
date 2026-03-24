"use client";

import Link from "next/link";
import { useState } from "react";

const posts = [
  {
    emoji: "🍛",
    bannerColor: "#FFF3ED",
    category: "Food Culture",
    title: "The Rise of Jollof Rice Wars: Ghana vs Nigeria, Settled by Data",
    excerpt:
      "We crunched 500,000 orders to find out which jollof reigns supreme on the Chopfast platform — and the results might surprise you.",
    date: "March 10, 2026",
    readTime: "5 min read",
    author: "Amara Osei",
  },
  {
    emoji: "🚴",
    bannerColor: "#ECFDF5",
    category: "Delivery Tips",
    title: "10 Habits of Customers Who Always Get Hot Food",
    excerpt:
      "From precise address details to choosing the right time slots, here's what the data tells us separates a great delivery experience from a lukewarm one.",
    date: "February 28, 2026",
    readTime: "4 min read",
    author: "Tunde Badmus",
  },
  {
    emoji: "🏪",
    bannerColor: "#EFF6FF",
    category: "Restaurant Spotlight",
    title: "Meet Mama Nkechi's: From Roadside Kitchen to 10,000 Orders a Month",
    excerpt:
      "When Nkechi Okafor joined Chopfast in 2023 with just one pot and a prayer, she had no idea she'd become one of our highest-rated restaurant partners.",
    date: "February 14, 2026",
    readTime: "6 min read",
    author: "Chinelo Igwe",
  },
  {
    emoji: "🌍",
    bannerColor: "#F5F3FF",
    category: "African Cuisine Guide",
    title: "A Beginner's Guide to West African Street Food: 12 Dishes to Try",
    excerpt:
      "From akara to puff-puff to kelewele, we break down the most beloved street foods across West Africa — and which Chopfast restaurants serve them best.",
    date: "January 30, 2026",
    readTime: "7 min read",
    author: "Efua Mensah",
  },
  {
    emoji: "📱",
    bannerColor: "#FEF9C3",
    category: "Product",
    title: "How We Cut Average Delivery Time by 8 Minutes Using AI Routing",
    excerpt:
      "A behind-the-scenes look at the machine learning model our engineering team built to optimise rider routes across 8 African cities in real time.",
    date: "January 15, 2026",
    readTime: "8 min read",
    author: "Emeka Eze",
  },
  {
    emoji: "🍲",
    bannerColor: "#FFF1F2",
    category: "African Cuisine Guide",
    title: "East African Food 101: Why Ugali, Nyama Choma & Pilau Should Be on Your Radar",
    excerpt:
      "As Chopfast expands deeper into East Africa, we're celebrating the rich and diverse food culture of Kenya, Uganda, and Tanzania.",
    date: "January 2, 2026",
    readTime: "5 min read",
    author: "Zawadi Kamau",
  },
];

const categories = ["All", "Food Culture", "Delivery Tips", "Restaurant Spotlight", "African Cuisine Guide", "Product"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  function handleSubscribe() {
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  }

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

        {/* Header */}
        <section className="mb-10 text-center">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Chopfast Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Stories, guides, and insights from the heart of Africa's food delivery scene.
          </p>
        </section>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
                style={
                  active
                    ? { backgroundColor: "#FF5A1F", color: "#fff", borderColor: "#FF5A1F" }
                    : { backgroundColor: "#fff", color: "#374151", borderColor: "#E5E7EB" }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No posts in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {filtered.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Banner */}
                <div
                  className="h-32 flex items-center justify-center text-6xl"
                  style={{ backgroundColor: post.bannerColor }}
                >
                  {post.emoji}
                </div>
                <div className="p-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#FF5A1F" }}
                  >
                    {post.category}
                  </span>
                  <h2
                    className="text-base font-bold mt-1 mb-2 leading-snug"
                    style={{ color: "#1A1A2E" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <section
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Get the best stories in your inbox
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Join 80,000+ food lovers who get our weekly digest of African food culture, platform updates, and restaurant discoveries.
          </p>
          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 font-semibold text-sm px-6 py-3 rounded-full">
              ✓ You&apos;re subscribed — welcome to the community!
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-sm bg-white text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FF5A1F" }}
              >
                Subscribe
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
