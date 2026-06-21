import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const blogDir = path.join(process.cwd(), "public", "blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "index.md");

  for (const f of files) {
    const fullContent = fs.readFileSync(path.join(blogDir, f), "utf-8");
    const fileSlug = fullContent.match(/slug:\s*(\S+)/)?.[1];
    if (fileSlug === slug || f.replace(".md", "") === slug) {
      const title = fullContent.match(/title:\s*"(.*?)"/)?.[1] || "Post";
      // Strip frontmatter
      const body = fullContent.replace(/^---[\s\S]*?---\n*/, "");
      return NextResponse.json({ title, content: body });
    }
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
