#!/usr/bin/env python3
"""Generate 4 blog posts to seed the SEO blog."""
import os, json, requests, glob
from datetime import datetime, timedelta

VENICE_KEY = os.environ.get('VENICE_API_KEY', '')
if not VENICE_KEY:
    print("No VENICE_API_KEY set")
    exit(1)

POSTS_DIR = "/root/uncensored-hub/public/blog"
os.makedirs(POSTS_DIR, exist_ok=True)

existing = glob.glob(f"{POSTS_DIR}/*.md")
existing_count = len(existing)
print(f"Existing posts: {existing_count}")

topics = [
    "Archons and the Loosh Harvest — The Hidden Mechanics of Consciousness Control",
    "10 Things ChatGPT Refuses to Tell You About Alternative Medicine",
    "The White Light Deception — What NDE Researchers Won't Say",
    "How to Lucid Dream Every Night — Complete Step-by-Step Guide",
]

for i, topic in enumerate(topics):
    slug = topic.lower().replace(" — ", "-").replace(" ", "-").replace("'", "").replace("—", "-").replace(",", "").replace("?", "")
    slug = "".join(c for c in slug if c.isalnum() or c == "-")[:60]
    
    payload = {
        "model": "deepseek-v4-pro",
        "messages": [
            {"role": "system", "content": "You are an SEO content writer. Write a 1000-1500 word blog article. Use H2 and H3 headings. Include an intro, 5+ sections, and a conclusion. Keep it factual and engaging. No fluff."},
            {"role": "user", "content": f"Write a complete SEO-optimized blog article titled: '{topic}'. Include meta description, keywords, and a CTA to try the uncensored AI at https://uncensored-chat-zeta.vercel.app"}
        ],
        "temperature": 0.5,
        "max_tokens": 5000,
    }

    try:
        r = requests.post(
            "https://api.venice.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {VENICE_KEY}", "Content-Type": "application/json"},
            json=payload,
            timeout=180
        )
        data = r.json()
        content = data['choices'][0]['message']['content']
        
        # Stagger dates to avoid all same-day
        date = (datetime.now() - timedelta(days=len(topics)-i-1)).strftime("%Y-%m-%d")
        
        md = f"""---
title: "{topic}"
date: {date}
slug: {slug}
description: "SEO-optimized article about {topic[:50]}"
---

{content}

---

*Want to ask questions about this topic that ChatGPT won't answer? Try [Uncensored Chat](https://uncensored-chat-zeta.vercel.app) — no filters, no censorship.*
"""
        filepath = f"{POSTS_DIR}/{date}-{slug}.md"
        with open(filepath, 'w') as f:
            f.write(md)
        
        print(f"✅ [{i+1}/4] {topic[:50]}... ({len(content)} chars)")
        
    except Exception as e:
        print(f"❌ [{i+1}/4] {topic[:30]}... Failed: {e}")

print("\nDone!")
