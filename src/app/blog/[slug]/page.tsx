"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`/api/blog/post?slug=${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "Post");
        setContent(data.content || "Not found.");
      })
      .catch(() => setContent("Failed to load."));
  }, [params.slug]);

  // Simple markdown-like rendering
  const html = content
    .replace(/^### (.*$)/gm, "<h3 class='text-lg font-semibold mt-6 mb-2'>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2 class='text-xl font-bold mt-8 mb-3'>$1</h2>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\\[(.*?)\\]\\((.*?)\\)/gm, '<a href="$2" class="text-blue-400 underline">$1</a>')
    .replace(/\\n\\n/g, "</p><p class='mb-4'>")
    .replace(/\\n/g, "<br/>");

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-800 px-4 py-4">
        <a href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300">&larr; Back to blog</a>
        <h1 className="text-2xl font-bold mt-2">{title}</h1>
      </header>
      <article
        className="max-w-2xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: `<p class='mb-4'>${html}</p>` }}
      />
      <footer className="text-center py-6 text-xs text-zinc-700 border-t border-zinc-800">
        Powered by{" "}
        <a href="https://venice.ai" className="underline" target="_blank">Venice AI</a>
        {" · "}
        <a href="https://uncensored-chat-zeta.vercel.app" className="underline">Try uncensored AI</a>
      </footer>
    </div>
  );
}
