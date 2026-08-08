"use client";

import { useMemo, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId] = useState<string>("");

  const headings = useMemo(() => {
    const lines = content.split("\n");
    const parsedHeadings: Heading[] = [];

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        const text = line.replace("# ", "").trim();
        parsedHeadings.push({ id: text.toLowerCase().replace(/\s+/g, "-"), text, level: 1 });
      } else if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        parsedHeadings.push({ id: text.toLowerCase().replace(/\s+/g, "-"), text, level: 2 });
      }
    });

    return parsedHeadings;
  }, [content]);

  return (
    <div className="space-y-3 text-xs">
      <h3 className="font-mono text-neutral-500 uppercase tracking-wider">Table of Contents</h3>
      <ul className="space-y-2 border-l border-neutral-800 pl-3">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}>
            <a
              href={`#${heading.id}`}
              className={`block hover:text-emerald-400 transition-colors ${
                activeId === heading.id ? "text-emerald-400 font-medium" : "text-neutral-400"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}