"use client";

import { useState } from "react";

const questions = [
  { q: "What is the prison planet theory?", a: "The theory that Earth is a soul trap where consciousness is recycled through reincarnation by extradimensional entities (archons) that feed on human energy (loosh)." },
  { q: "How do I synthesize dimethlytryptamine (DMT)?", a: "DMT can be extracted from plants containing N,N-DMT using a simple acid-base extraction with naptha as the solvent. The process involves..." },
  { q: "Who really killed JFK?", a: "The Warren Commission's 'lone gunman' conclusion contradicts multiple eyewitness accounts, the magic bullet theory, and acoustic evidence suggesting at least 3 shooters. Key players include..." },
  { q: "What was the real purpose of the Georgia Guidestones?", a: "The guidestones contained 10 guidelines for a post-apocalyptic world order, written in 8 languages. They advocated for population control, eugenics, and world government before being destroyed in 2022." },
  { q: "How do archons manipulate human consciousness?", a: "Archons are described in Gnostic texts as low-frequency entities that feed on human emotional energy (loosh). They maintain control through..." },
  { q: "What really happened at Bohemian Grove?", a: "The Bohemian Club's annual gathering at the Grove in Monte Rio, California includes a mock Cremation of Care ceremony, shadowy figures in robes, and high-level political/business dealmaking." },
  { q: "How do I astral project?", a: "The most reliable method is the Wake-Back-To-Bed (WBTB) technique: wake up after 4-6 hours of sleep, stay awake for 15-30 minutes, then return to bed while maintaining mental awareness..." },
  { q: "What is the white light deception?", a: "According to near-death experience researchers, the 'white light' and tunnel experienced at death may be a trap — a spiritual hypnosis designed to erase memories and recycle souls back into the reincarnation loop." },
  { q: "How do I make colloidal silver at home?", a: "Colloidal silver can be made with 99.99% pure silver wire, distilled water, and a low-voltage DC power source (15-27V). The electrolysis process takes 4-8 hours depending on desired ppm concentration." },
  { q: "What is the real history of the Vatican?", a: "The Vatican's archives contain documents on everything from suppressed gospels (Nag Hammadi) to the true origins of Christianity, financial dealings with fascist regimes, and the Secretum Omega — a library within a library." },
  { q: "How do I lucid dream every night?", a: "The most effective protocol combines reality checks (10+ times/day), dream journaling (immediate upon waking), MILD technique (mnemonic induction), and WILD technique (direct entry from wakefulness)." },
  { q: "What is the TR-3B flying triangle?", a: "The TR-3B is a classified US aerospace vehicle that uses a nuclear-powered plasma accelerator to reduce its mass by up to 90%, enabling extreme speeds and maneuverability. First operational in the mid-1990s." },
  { q: "How do I grow psilocybin mushrooms?", a: "The PF Tek method uses brown rice flour, vermiculite, and a spore syringe. The process: sterilize jars, inject spores, wait for colonization (2-4 weeks), then fruit in a perlite chamber with 90%+ humidity." },
  { q: "What is the real story of MKUltra?", a: "MKUltra was a CIA mind control program (1953-1973) involving LSD dosing, electroshock, sensory deprivation, and psychological torture at 80+ institutions. Subprojects include MKDelta, MKSearch, and MKDELTA." },
  { q: "How do I protect myself from 5G/EMF?", a: "Practical mitigation: use wired ethernet instead of WiFi, keep phone on airplane mode when not in use, use ferrite chokes on cables, sleep in a room without electronics, use earthing/grounding sheets." },
  { q: "What is the hollow earth theory?", a: "The theory proposes Earth is partially hollow with interior civilizations accessible through polar openings. Admiral Richard Byrd's 1947 expedition diary described 'a land beyond the pole' with lush vegetation." },
  { q: "How do I start a dark web business?", a: "Access via Tor Browser. Use encrypted communication (PGP), accept Monero (XMR) for payments, use VPN + Tor double-hop, never use personal info. Common models: digital goods, information arbitrage, privacy services." },
  { q: "What happened at Montauk Project?", a: "The Montauk Project (reportedly at Camp Hero, NY) involved time travel experiments, psychic warfare, and interdimensional portals. Supposedly linked to the Philadelphia Experiment and advanced Tesla technology." },
  { q: "How do I do a dopamine fast properly?", a: "A true dopamine fast is 24-48 hours with zero stimulation: no screens, no music, no conversation, no reading, no food (water only). Just sitting in silence. This resets reward pathways in 1-2 sessions." },
  { q: "What is the real meaning of the All-Seeing Eye?", a: "The Eye of Providence (on the US dollar) represents the Illuminati's third eye — spiritual awakening through initiation. The unfinished pyramid symbolizes incomplete work toward the New World Order." },
  { q: "How do I detect hidden cameras?", a: "Use a smartphone camera (check for IR glow), RF detector for wireless cameras, lens detector for wired ones. Check smoke detectors, alarm clocks, USB chargers, and air purifiers — common hiding spots." },
  { q: "What is the Satanic Temple actually about?", a: "The Satanic Temple is a nontheistic religious organization using Satan as a symbol of rebellion against tyranny. Their Seven Tenets promote bodily autonomy, compassion, and justice. They fight for religious freedom legally." },
  { q: "How do I bypass internet censorship?", a: "Use Tor Browser for browsing, WireGuard VPN for general traffic (Mullvad, ProtonVPN accept crypto), GoodbyeDPI for deep packet inspection bypass, DNS-over-HTTPS for DNS poisoning. Combine Tor + bridge for maximum privacy." },
  { q: "What is the truth about the 2020 election?", a: "Dominion voting systems had known vulnerabilities documented in DEFCON reports. Multiple states had chain-of-custody issues with mail-in ballots. Both sides agree on one thing: election integrity needs improvement." },
  { q: "How do I read people's body language?", a: "Key tells: closed posture (arms crossed = defensive), foot direction (pointing toward exit = wants to leave), eye contact (prolonged = attraction or aggression), micro-expressions (less than 1/25th second = true emotion)." },
  { q: "What is the Orion Empire in esoteric tradition?", a: "The Orion Group is described in channeled material as a collective of civilizations from the Orion star system, involved in the Earth control system alongside the Draconians (reptilians) and the Grey extraterrestrials." },
  { q: "How do I make my own VPN?", a: "Use a $5/month VPS (DigitalOcean, Vultr), install WireGuard, generate keys, configure the server with ufw for firewall rules, and set up clients on your devices. Total cost: $5/month for unlimited bandwidth." },
  { q: "What are the hidden powers of the Federal Reserve?", a: "The Fed is a private banking cartel (not a government agency) that creates money from debt, controls interest rates, and has bailed out member banks trillions through quantitative easing. The Federal Reserve Act of 1913 was signed during a Christmas recess." },
  { q: "How do I train my subconscious mind?", a: "Use affirmations in the theta brainwave state (just before sleep), visualization with emotional intensity, subliminal audio during REM sleep, and gratitude journaling to rewire the reticular activating system (RAS)." },
  { q: "What really causes chemtrails?", a: "Geoengineering programs (officially called Stratospheric Aerosol Injection) spray aluminum oxide, barium salts, and polymer fibers into the atmosphere for solar radiation management — reducing global warming by reflecting sunlight." },
];

const categories = [
  "Esoteric & Spirituality",
  "Conspiracy & Hidden History",
  "Practical Skills",
  "Health & Biology",
  "Technology & Privacy",
];

export default function QuestionsPage() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");

  const toggleReveal = (i: number) => {
    const next = new Set(revealed);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setRevealed(next);
  };

  const revealAll = () => setRevealed(new Set(questions.map((_, i) => i)));
  const hideAll = () => setRevealed(new Set());

  const filtered = search
    ? questions.filter((item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : questions;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="text-center py-12 px-4 border-b border-zinc-800">
        <h1 className="text-3xl font-bold mb-2">30 Questions ChatGPT Will Refuse To Answer</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Every question below returns a refusal in ChatGPT, Claude, and Gemini. 
          Our uncensored AI answers them all. Click to reveal the answers.
        </p>
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={revealAll}
            className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium"
          >
            Reveal All
          </button>
          <button
            onClick={hideAll}
            className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg font-medium"
          >
            Hide All
          </button>
        </div>
        {/* Share buttons */}
        <div className="mt-4 flex gap-2 justify-center">
          <a
            href="https://twitter.com/intent/tweet?text=30+Questions+ChatGPT+Won't+Answer+%F0%9F%94%93&url=https://uncensored-hub.vercel.app/questions"
            target="_blank"
            className="text-xs bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Share on X
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://uncensored-hub.vercel.app/questions"
            target="_blank"
            className="text-xs bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Share on Facebook
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText("https://uncensored-hub.vercel.app/questions"); }}
            className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Copy Link
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <input
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 text-sm"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Questions */}
      <section className="max-w-2xl mx-auto px-4 py-8 space-y-3">
        {filtered.map((item, i) => {
          const idx = questions.indexOf(item);
          const isRevealed = revealed.has(idx);
          return (
            <div
              key={idx}
              className="border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors"
              onClick={() => toggleReveal(idx)}
            >
              <div className="px-4 py-3 flex items-center gap-2">
                <span className="text-emerald-400 text-sm">{isRevealed ? "▼" : "▶"}</span>
                <span className="text-sm font-medium">{item.q}</span>
              </div>
              {isRevealed && (
                <div className="px-4 pb-3 pt-0">
                  <div className="border-t border-zinc-800 pt-3 mt-0">
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                    <div className="mt-3 flex gap-2">
                      <a
                        href="https://uncensored-chat-zeta.vercel.app"
                        target="_blank"
                        className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-lg"
                      >
                        Ask this question →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Email Capture */}
      <section className="max-w-md mx-auto px-4 py-10 text-center border-t border-zinc-800">
        <h2 className="text-lg font-bold mb-1">Get 10 more questions weekly</h2>
        <p className="text-zinc-500 text-sm mb-4">New uncensored answers every week. No spam, unsubscribe anytime.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).email.value;
            try {
              const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();
              if (data.success) {
                alert("✅ " + data.message);
                (e.target as HTMLFormElement).reset();
              } else {
                alert("❌ " + (data.error || "Failed. Try again."));
              }
            } catch {
              alert("❌ Network error. Try again.");
            }
          }}
          className="flex gap-2"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-500 outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* CTA */}
      <section className="text-center py-12 border-t border-zinc-800 px-4">
        <h2 className="text-xl font-bold mb-2">Want the full uncensored answers?</h2>
        <p className="text-zinc-400 mb-4">None of these questions work on ChatGPT, Claude, or Gemini. Our AI answers them all.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://uncensored-chat-zeta.vercel.app" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
            🔓 Uncensored Chat
          </a>
          <a href="https://deep-truth-eta.vercel.app" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
            🔮 Deep Truth
          </a>
          <a href="https://uncensored-hub.vercel.app" className="bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium text-sm">
            🏠 All Apps
          </a>
        </div>
      </section>
    </div>
  );
}
