"use client";

import { useMemo, useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -40% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-3 text-xs">
      <h3 className="font-mono text-neutral-500 uppercase tracking-wider font-semibold">
        Table of Contents
      </h3>
      <ul className="space-y-2 border-l border-neutral-200 dark:border-neutral-800 pl-3">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}>
            <a
              href={`#${heading.id}`}
              className={`block transition-colors ${
                activeId === heading.id
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
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