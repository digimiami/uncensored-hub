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

  // Strip meta lines and first ---, then render markdown to HTML
  function renderMarkdown(raw: string): string {
    // Remove "Meta Description:" and "Keywords:" lines and the trailing ---
    let body = raw.replace(/^Meta Description:.*\n?/m, "");
    body = body.replace(/^Keywords:.*\n?/m, "");
    body = body.replace(/^---\n?/, "").trim();

    // Escape HTML entities first
    body = body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Split into blocks by double newline
    const blocks = body.split(/\n\n+/);
    const htmlBlocks = blocks.map((block) => {
      block = block.trim();
      if (!block) return "";

      // Horizontal rule
      if (/^-{3,}$/.test(block)) return "<hr class='my-8 border-zinc-700' />";

      // H1 heading
      if (/^# (.+)$/.test(block)) {
        return `<h1 class='text-2xl font-bold mt-10 mb-4'>${inlineMd(block.replace(/^# /, ""))}</h1>`;
      }
      // H2 heading
      if (/^## (.+)$/.test(block)) {
        return `<h2 class='text-xl font-bold mt-8 mb-3'>${inlineMd(block.replace(/^## /, ""))}</h2>`;
      }
      // H3 heading
      if (/^### (.+)$/.test(block)) {
        return `<h3 class='text-lg font-semibold mt-6 mb-2'>${inlineMd(block.replace(/^### /, ""))}</h3>`;
      }

      // Unordered list
      if (/^[-*] /.test(block)) {
        const items = block
          .split("\n")
          .filter((l) => l.trim())
          .map(
            (l) =>
              `<li class='ml-4 mb-1 list-disc'>${inlineMd(l.replace(/^[-*] /, ""))}</li>`
          )
          .join("");
        return `<ul class='mb-4'>${items}</ul>`;
      }

      // Ordered list
      if (/^\d+\. /.test(block)) {
        const items = block
          .split("\n")
          .filter((l) => l.trim())
          .map((l) => `<li class='ml-4 mb-1 list-decimal'>${inlineMd(l.replace(/^\d+\. /, ""))}</li>`)
          .join("");
        return `<ol class='mb-4'>${items}</ol>`;
      }

      // Paragraph (default)
      // Handle single line breaks within block
      const lines = block
        .split("\n")
        .map((l) => inlineMd(l))
        .join("<br/>");
      return `<p class='mb-4 leading-relaxed'>${lines}</p>`;
    });

    return htmlBlocks.filter(Boolean).join("\n");
  }

  function inlineMd(text: string): string {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Inline code
    text = text.replace(/`([^`]+)`/g, "<code class='bg-zinc-800 px-1 rounded text-orange-300'>$1</code>");
    // Links [text](url)
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener">$1</a>'
    );
    // Raw URLs
    text = text.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" class="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener">$1</a>'
    );
    return text;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-800 px-4 py-4">
        <a href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300">
          &larr; Back to blog
        </a>
      </header>
      <h1 className="text-2xl font-bold max-w-2xl mx-auto px-4 mt-8">
        {title}
      </h1>
      <article
        className="max-w-2xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
      <div className="max-w-2xl mx-auto px-4 pb-8 text-center">
        <a
          href="https://uncensored-chat-zeta.vercel.app"
          target="_blank"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          🔓 Ask the uncensored AI &rarr;
        </a>
      </div>
      <footer className="text-center py-6 text-xs text-zinc-700 border-t border-zinc-800">
        Powered by{" "}
        <a href="https://venice.ai" className="underline hover:text-zinc-400" target="_blank">
          Venice AI
        </a>
        {" · "}
        <a href="https://uncensored-chat-zeta.vercel.app" className="underline hover:text-zinc-400" target="_blank">
          Try uncensored AI
        </a>
      </footer>
    </div>
  );
}
