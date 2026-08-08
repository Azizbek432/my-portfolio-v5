import Link from "next/link";
import { FiGithub, FiLinkedin, FiSend, FiMail, FiYoutube, FiCode, FiHeart } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] border-t border-neutral-800/60 pt-16 pb-12 px-6 text-neutral-400">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800/40">
        
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 group inline-flex">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FiCode className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider text-white">
              AZIZBEK<span className="text-emerald-400">.DEV</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
            High-performance full-stack web va mobile ilovalar yaratish hamda dasturlash bo&apos;yicha kontent ulashish platformasi.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-white tracking-wider">Sahifalar</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Bosh sahifa</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Maqolalar</Link></li>
            <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">Loyihalar</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400 transition-colors">Men haqimda</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Aloqa</Link></li>
          </ul>
        </div>

        {/* Social & Connect */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-white tracking-wider">Ijtimoiy tarmoqlar</h4>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/Azizbek432"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FiYoutube className="w-4 h-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FiSend className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@azizbek.dev"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-emerald-400 hover:border-neutral-700 transition-all"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>© 2026 Azizbek Abdullayev. Barcha huquqlar himoyalangan.</p>
        <p className="flex items-center gap-1 font-mono">
          Built with <FiHeart className="text-emerald-400 w-3.5 h-3.5 fill-emerald-400" /> Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}