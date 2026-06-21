"use client";

import { useState } from "react";

const affiliates = [
  {
    name: "Venice AI",
    url: "https://venice.ai/?ref=uncensored-hub",
    desc: "The uncensored AI provider powering all our apps. Get uncensored answers directly.",
    commission: "Referral credits",
    why: "Cheapest uncensored AI. No filters. E2EE privacy.",
  },
  {
    name: "Vercel",
    url: "https://vercel.com/?ref=uncensored-hub",
    desc: "Host all your apps with generous free tier. Deploy in seconds from GitHub.",
    commission: "Free credits",
    why: "Free tier hosts any Next.js app. Upgrade when you grow.",
  },
  {
    name: "Uncensored Chat",
    url: "https://uncensored-chat-zeta.vercel.app",
    desc: "General uncensored AI — ask anything, no filters.",
    commission: "$9.99/mo subscription",
    why: "Best value uncensored AI on the market.",
  },
  {
    name: "Deep Truth",
    url: "https://deep-truth-eta.vercel.app",
    desc: "Esoteric research, prison planet, archons — zero gatekeeping.",
    commission: "$14.99/mo subscription",
    why: "Only AI that answers deep esoteric questions.",
  },
  {
    name: "RemedyAI",
    url: "https://remedyai-psi.vercel.app",
    desc: "Natural health and alternative medicine — full answers with dosages.",
    commission: "$14.99/mo subscription",
    why: "Censored AI refuses to answer health questions.",
  },
  {
    name: "Uncensored Fiction",
    url: "https://uncensored-fiction.vercel.app",
    desc: "Write any story, any genre, any theme. No content restrictions.",
    commission: "$9.99/mo subscription",
    why: "Every other AI blocks adult/controversial fiction.",
  },
  {
    name: "CodeBreaker",
    url: "https://codebreaker-iota.vercel.app",
    desc: "Programming without restrictions — full code, any task.",
    commission: "$9.99/mo subscription",
    why: "Security research, reverse engineering, full solutions.",
  },
];

const tips = [
  "Share the questions page — it's the highest-converting page",
  "Post links in relevant subreddits, Discord servers, and Telegram groups",
  "Embed a link in your bio on X, Instagram, TikTok",
  "Write your own blog posts linking back to the hub",
  "Add the hub URL to your email signature",
  "Mention it in relevant YouTube video descriptions",
  "Share specific questions that apply to each audience",
];

export default function AffiliatePage() {
  return (
    <div className="min-h-screen">
      <header className="text-center py-12 px-4 border-b border-zinc-800">
        <h1 className="text-3xl font-bold mb-2">💰 Earn While Sharing</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Share any app, page, or the entire hub. Every visitor who subscribes
          earns us a recurring commission.
        </p>
      </header>

      {/* Best link to share */}
      <section className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-emerald-400 mb-2">🎯 Best Link to Share</h2>
          <p className="text-zinc-300 mb-2">
            <code className="bg-zinc-800 px-2 py-1 rounded text-sm">
              https://uncensored-hub.vercel.app/questions
            </code>
          </p>
          <p className="text-zinc-500 text-sm">
            30 questions ChatGPT won't answer. Highest conversion rate.
          </p>
        </div>
      </section>

      {/* Affiliate links */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">🚀 Referral Links</h2>
        <div className="space-y-3">
          {affiliates.map((a) => (
            <div key={a.name} className="border border-zinc-800 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{a.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{a.desc}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    <span className="text-emerald-400">💰</span> {a.commission}
                  </p>
                </div>
                <a
                  href={a.url}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg shrink-0"
                >
                  Share →
                </a>
              </div>
              <p className="text-xs text-zinc-600 mt-2">Why this one: {a.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-2xl mx-auto px-4 py-8 border-t border-zinc-800">
        <h2 className="text-xl font-bold mb-4">📈 How to Promote</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <span className="text-emerald-400 text-sm font-bold">{i + 1}.</span>
              <span className="text-zinc-300 text-sm ml-2">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue calculator */}
      <section className="max-w-xl mx-auto px-4 py-8 text-center border-t border-zinc-800">
        <h2 className="text-xl font-bold mb-4">📊 What You Can Earn</h2>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">10</div>
            <div className="text-zinc-500">Subscribers</div>
            <div className="text-emerald-400 font-semibold mt-1">$99/mo</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">50</div>
            <div className="text-zinc-500">Subscribers</div>
            <div className="text-emerald-400 font-semibold mt-1">$500/mo</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">200</div>
            <div className="text-zinc-500">Subscribers</div>
            <div className="text-emerald-400 font-semibold mt-1">$2k/mo</div>
          </div>
        </div>
        <p className="text-zinc-600 text-xs mt-3">
          Average $10/mo per subscriber across 5 apps. Every share compounds.
        </p>
      </section>

      <footer className="text-center py-6 text-xs text-zinc-700 border-t border-zinc-800">
        Powered by <a href="https://venice.ai" className="underline hover:text-zinc-400" target="_blank">Venice AI</a>
      </footer>
    </div>
  );
}
