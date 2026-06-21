"use client";

import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/blog/list")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      <header className="text-center py-12 px-4 border-b border-zinc-800">
        <h1 className="text-3xl font-bold mb-2">Uncensored Blog</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          In-depth articles on the topics censored AI won&apos;t touch.
        </p>
      </header>
      <section className="max-w-2xl mx-auto px-4 py-8">
        {posts.length === 0 && (
          <p className="text-zinc-500 text-center">Loading posts...</p>
        )}
        <div className="space-y-3">
          {posts.map((post: any, i: number) => (
            <a
              key={i}
              href={`/blog/${post.slug || post}`}
              className="block border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors"
            >
              <div className="text-xs text-zinc-500">{post.date}</div>
              <div className="font-medium mt-1">{post.title}</div>
              <div className="text-xs text-zinc-500 mt-1">
                {post.description?.slice(0, 120)}...
              </div>
            </a>
          ))}
        </div>
      </section>
      <footer className="text-center py-6 text-xs text-zinc-700 border-t border-zinc-800">
        Powered by{" "}
        <a href="https://venice.ai" className="underline hover:text-zinc-400" target="_blank">
          Venice AI
        </a>
      </footer>
    </div>
  );
}
