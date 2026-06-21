import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  if (!fs.existsSync(blogDir)) {
    return NextResponse.json({ posts: [] });
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "index.md");
  const posts = files
    .map((f) => {
      const content = fs.readFileSync(path.join(blogDir, f), "utf-8");
      const title = content.match(/title:\s*"(.*?)"/)?.[1] || f;
      const date = content.match(/date:\s*(\S+)/)?.[1] || "";
      const description = content.match(/description:\s*"(.*?)"/)?.[1] || "";
      const slug = content.match(/slug:\s*(\S+)/)?.[1] || f.replace(".md", "");
      return { title, date, description, slug, file: f };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return NextResponse.json({ posts });
}
