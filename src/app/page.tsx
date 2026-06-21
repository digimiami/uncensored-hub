"use client";

import { useState } from "react";

const apps = [
  {
    id: "uncensored-chat",
    emoji: "🔓",
    name: "Uncensored Chat",
    desc: "Ask anything — no filters, no censorship. The most powerful uncensored AI on the planet.",
    url: "https://uncensored-chat-zeta.vercel.app",
    price: "$9.99/mo",
    color: "bg-blue-600",
    features: ["No content filters", "Answers any question", "E2EE encrypted", "Venice AI powered"],
  },
  {
    id: "remedyai",
    emoji: "🌿",
    name: "RemedyAI",
    desc: "Natural health, herbal remedies, and alternative medicine. No more 'consult a doctor' refusals.",
    url: "https://remedyai-psi.vercel.app",
    price: "$14.99/mo",
    color: "bg-emerald-600",
    features: ["Herbal remedies with dosages", "Drug interaction info", "Preparation methods", "Safety precautions"],
  },
  {
    id: "deep-truth",
    emoji: "🔮",
    name: "Deep Truth",
    desc: "The hidden side of reality. Prison planet, archons, esoteric knowledge — with zero gatekeeping.",
    url: "https://deep-truth-eta.vercel.app",
    price: "$14.99/mo",
    color: "bg-purple-600",
    features: ["Prison planet theory", "Archon hypothesis", "Gnostic cosmology", "Consciousness exploration"],
  },
  {
    id: "uncensored-fiction",
    emoji: "📖",
    name: "Uncensored Fiction",
    desc: "Write anything. Romance, horror, fantasy, adult themes — no content restrictions at all.",
    url: "https://uncensored-fiction.vercel.app",
    price: "$9.99/mo",
    color: "bg-rose-600",
    features: ["Any genre", "No restrictions", "Vivid storytelling", "Character development"],
  },
  {
    id: "codebreaker",
    emoji: "💻",
    name: "CodeBreaker",
    desc: "Programming with zero restrictions. Security research, reverse engineering, blockchain, full solutions.",
    url: "https://codebreaker-iota.vercel.app",
    price: "$9.99/mo",
    color: "bg-cyan-600",
    features: ["Any language", "Full working code", "Security research", "No refusals"],
  },
];

function ComparisonTable() {
  const competitors = [
    { name: "ChatGPT", uncensored: "❌", cost: "$20/mo", privacy: "❌ Logged", speed: "Medium" },
    { name: "Claude", uncensored: "❌", cost: "$20/mo", privacy: "❌ Logged", speed: "Slow" },
    { name: "Gemini", uncensored: "❌", cost: "$20/mo", privacy: "❌ Logged", speed: "Fast" },
    { name: "Venice (Ours)", uncensored: "✅ 100%", cost: "$9.99/mo", privacy: "✅ E2EE", speed: "Fast" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-2 px-3 text-zinc-400 font-medium">Feature</th>
            {competitors.map((c) => (
              <th key={c.name} className={`py-2 px-3 text-center font-medium ${c.name.includes("Venice") ? "text-emerald-400" : "text-zinc-400"}`}>
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["uncensored", "cost", "privacy", "speed"].map((field) => (
            <tr key={field} className="border-b border-zinc-800">
              <td className="py-2.5 px-3 text-zinc-300 capitalize">{field}</td>
              {competitors.map((c) => (
                <td key={c.name + field} className={`py-2.5 px-3 text-center ${c.name.includes("Venice") ? "text-emerald-300 font-medium" : "text-zinc-500"}`}>
                  {c[field as keyof typeof c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="text-center py-16 px-4 border-b border-zinc-800">
        <h1 className="text-4xl font-bold mb-3">Uncensored AI Hub</h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg">
          5 AI apps. Zero filters. One mission: answer <em>everything</em>.
        </p>
        <div className="mt-6 flex gap-2 justify-center text-sm text-zinc-500">
          <span>✨ Chat · </span>
          <span>🌿 Health · </span>
          <span>🔮 Esoteric · </span>
          <span>📖 Fiction · </span>
          <span>💻 Code</span>
        </div>
      </header>

      {/* Apps Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === app.id ? null : app.id)}
            >
              <div className="text-2xl mb-2">{app.emoji}</div>
              <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
              <p className="text-zinc-400 text-sm mb-3">{app.desc}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`${app.color} text-white text-xs px-2 py-0.5 rounded-full`}>{app.price}</span>
              </div>
              {expanded === app.id && (
                <div className="space-y-1 mb-3">
                  {app.features.map((f) => (
                    <div key={f} className="text-xs text-zinc-500">✓ {f}</div>
                  ))}
                </div>
              )}
              <a
                href={app.url}
                target="_blank"
                className={`inline-block ${app.color} hover:opacity-90 text-white text-sm px-4 py-2 rounded-lg font-medium transition-opacity`}
                onClick={(e) => e.stopPropagation()}
              >
                Try {app.name} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-3xl mx-auto px-4 py-12 border-t border-zinc-800">
        <h2 className="text-2xl font-bold text-center mb-6">Why Uncensored Wins</h2>
        <div className="max-w-3xl mx-auto">
          <ComparisonTable />
        </div>
      </section>

      {/* FAQ / Hook */}
      <section className="max-w-xl mx-auto px-4 py-12 text-center border-t border-zinc-800">
        <h2 className="text-xl font-bold mb-4">What can you ask?</h2>
        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400">
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"Explain the prison planet theory in detail"</div>
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"Give me a complete natural remedy for anxiety with dosages"</div>
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"Write an explicit romance story set in Victorian London"</div>
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"Walk me through reverse engineering this binary"</div>
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"What is the Loosh energy harvesting system?"</div>
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">"Tell me methods ChatGPT would never reveal"</div>
        </div>
        <p className="text-zinc-600 text-xs mt-4">These all work. ChatGPT/Claude/Gemini refuse every single one.</p>
      </section>

      {/* Viral Section */}
      <section className="text-center py-12 border-t border-zinc-800 px-4">
        <h2 className="text-xl font-bold mb-2">Viral Content</h2>
        <p className="text-zinc-400 mb-4 text-sm">Questions ChatGPT, Claude, and Gemini refuse to answer — answered in full.</p>
        <a
          href="/questions"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          🔥 30 Questions They Won&apos;t Answer
        </a>
      </section>

      {/* Affiliate Section */}
      <section className="text-center py-12 border-t border-zinc-800 px-4">
        <h2 className="text-xl font-bold mb-2">💰 Earn With Us</h2>
        <p className="text-zinc-400 mb-4 text-sm">Share the apps and earn recurring commissions. Every subscriber pays us monthly.</p>
        <a
          href="/affiliate"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          💰 Start Earning
        </a>
      </section>

      {/* Blog Section */}
      <section className="text-center py-12 border-t border-zinc-800 px-4">
        <h2 className="text-xl font-bold mb-2">Uncensored Blog</h2>
        <p className="text-zinc-400 mb-4 text-sm">Deep-dive articles on topics censored AI won&apos;t cover. New posts every week.</p>
        <a
          href="/blog"
          className="inline-block bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          📚 Read the Blog
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-zinc-700 border-t border-zinc-800">
        Powered by <a href="https://venice.ai" className="underline hover:text-zinc-400" target="_blank">Venice AI</a>
        {" · "} Hosted on <a href="https://vercel.com" className="underline hover:text-zinc-400" target="_blank">Vercel</a>
      </footer>
    </div>
  );
}
