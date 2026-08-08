import Link from "next/link";
import { FiArrowUpRight, FiTerminal, FiCode, FiTv, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Top Status & Identity Banner */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Building Full-Stack Solutions & Tech Content
          </span>
          <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <FiTerminal className="text-emerald-400" /> C++ & Web Ecosystems
          </span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Scalable Systems</span> & Engineering Content.
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
            Salom! Men <strong className="text-white font-medium">Azizbek Abdullayev</strong>. Full-stack dasturchiman. High-performance web va mobile platformalar yaratish, shuningdek dasturlash tajribalarimni ulashish bilan shug&apos;ullanaman.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Read Articles</span>
            <FiArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all"
          >
            <span>Explore Projects</span>
            <FiCode className="w-4 h-4 text-neutral-400" />
          </Link>
        </div>

        {/* Dynamic Tech Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <div className="p-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-2 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <FiCode className="w-4 h-4" /> CORE STACK
            </div>
            <p className="text-sm font-medium text-neutral-200">Next.js 15, TypeScript, NestJS & Tailwind CSS</p>
          </div>

          <div className="p-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-2 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold">
              <FiTerminal className="w-4 h-4" /> SYSTEMS & ALGO
            </div>
            <p className="text-sm font-medium text-neutral-200">C++ Graphics & Native Algorithms</p>
          </div>

          <div className="p-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-2 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <FiTv className="w-4 h-4" /> BROADCASTING
            </div>
            <p className="text-sm font-medium text-neutral-200">Live Coding Streams & Tech Blogging</p>
          </div>
        </div>

        {/* Social Links Footer */}
        <div className="flex items-center gap-4 pt-6 border-t border-neutral-800/60 text-neutral-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-white hover:border-neutral-700 transition-all"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-white hover:border-neutral-700 transition-all"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-white hover:border-neutral-700 transition-all"
            aria-label="Telegram"
          >
            <FiSend className="w-5 h-5" />
          </a>
        </div>
      </div>
    </main>
  );
}