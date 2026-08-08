"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiCode, FiGlobe, FiSun } from "react-icons/fi";
import { translations } from "@/lib/translations";

const navLinks = [
  { href: "/", label: translations.UZ.nav.home },
  { href: "/blog", label: translations.UZ.nav.blog },
  { href: "/projects", label: translations.UZ.nav.projects },
  { href: "/about", label: translations.UZ.nav.about },
  { href: "/contact", label: translations.UZ.nav.contact },
];

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"UZ" | "EN" | "RU">("UZ");

  const cycleLang = () => {
    if (lang === "UZ") setLang("EN");
    else if (lang === "EN") setLang("RU");
    else setLang("UZ");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
            <FiCode className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-sm tracking-wider text-white">
            AZIZBEK<span className="text-emerald-400">.DEV</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/80 p-1 rounded-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-neutral-800 text-emerald-400 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={cycleLang}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
            title="Change Language"
          >
            <FiGlobe className="text-emerald-400 w-3.5 h-3.5" />
            <span>{lang}</span>
          </button>

          <button
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-all"
            aria-label="Toggle Theme"
          >
            <FiSun className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}