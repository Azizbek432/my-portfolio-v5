"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FiArrowRight, 
  FiGithub, 
  FiLinkedin, 
  FiSend, 
  FiMail, 
  FiYoutube, 
  FiCode, 
  FiTerminal, 
  FiLayers, 
  FiCpu, 
  FiCompass 
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6"; 
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const extraTexts = {
    UZ: {
      statusBadge: "Loyihalar va ish uchun ochiq",
      subtitle: "FULL-STACK DEVELOPER · C++ & WEB ECOSYSTEMS",
      focusTitle: "Nima bilan shug'ullanaman?",
      fullstackTitle: "Full-Stack Arxitektura",
      fullstackDesc: "Frontend va backend tizimlarini zamonaviy, xavfsiz va tezkor arxitekturada qurish.",
      streamTitle: "Live Kodlash va Ta'lim",
      streamDesc: "YouTube orqali jonli efirlar, C++ o'yin dasturlash va texnologik bilimlar ulashish.",
      ctaTitle: "Birgalikda loyiha yaratamizmi?",
      ctaDesc: "G'oyangizni zamonaviy web-ilovaga aylantiramiz. Bog'lanish uchun ijtimoiy tarmoqlardan yozishingiz mumkin!",
      ctaBtn: "Bog'lanish",
      moreAbout: "Men haqimda"
    },
    EN: {
      statusBadge: "Currently open for opportunities",
      subtitle: "FULL-STACK DEVELOPER · C++ & WEB ECOSYSTEMS",
      focusTitle: "What I Focus On",
      fullstackTitle: "Full-Stack Architecture",
      fullstackDesc: "Building secure, high-performance web and backend systems meeting modern standards.",
      streamTitle: "Live Coding & Education",
      streamDesc: "Broadcasting live coding sessions on YouTube, C++ game dev and engineering insights.",
      ctaTitle: "Have a project or want to collaborate?",
      ctaDesc: "Let's turn your idea into a professional web application together.",
      ctaBtn: "Get in Touch",
      moreAbout: "More about me"
    },
    RU: {
      statusBadge: "Открыт к новым проектам",
      subtitle: "FULL-STACK DEVELOPER · C++ & WEB ECOSYSTEMS",
      focusTitle: "Мои направления",
      fullstackTitle: "Full-Stack Архитектура",
      fullstackDesc: "Создание безопасных и высокопроизводительных веб и бэкенд систем по современным стандартам.",
      streamTitle: "Лайв-кодинг и Обучение",
      streamDesc: "Проведение стримов на YouTube, разработка игр на C++ и обмен опытом.",
      ctaTitle: "Есть проект или хотите сотрудничать?",
      ctaDesc: "Давайте вместе превратим вашу идею в профессиональное веб-приложение!",
      ctaBtn: "Связаться",
      moreAbout: "Обо мне"
    }
  };

  const currentExtra = extraTexts[lang];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Azizbek432", icon: <FiGithub className="w-4 h-4" /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/azizbek-abdullayev-future-full-stack-developer/", icon: <FiLinkedin className="w-4 h-4" /> },
    { name: "X", href: "https://x.com/AzizbekAbd5902", icon: <FaXTwitter className="w-4 h-4" /> },
    { name: "YouTube", href: "https://www.youtube.com/@Azizbek_Abdullayev__2026", icon: <FiYoutube className="w-4 h-4" /> },
    { name: "Telegram", href: "https://t.me/Azizbek_Abdullayev09", icon: <FiSend className="w-4 h-4" /> },
    { name: "Email", href: "mailto:contact@azizbekabdullayev3500@gmail.com", icon: <FiMail className="w-4 h-4" /> },
  ];

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10 mb-20">
        
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 bg-neutral-900/90 border border-neutral-800/90 text-neutral-300 text-xs font-mono px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {currentExtra.statusBadge}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">Azizbek</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-wider text-emerald-400 font-semibold uppercase">
            {currentExtra.subtitle}
          </p>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed pt-2">
            {t.desc}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95"
            >
              <span>{t.btnArticles}</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium text-sm px-5 py-2.5 rounded-full transition-all active:scale-95"
            >
              <span>{currentExtra.moreAbout}</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={item.name}
                aria-label={item.name}
                className="p-2.5 bg-neutral-900/80 border border-neutral-800/80 rounded-full text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-neutral-800/80 transition-all duration-200 active:scale-90"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="p-4 bg-neutral-900/30 border border-neutral-800/60 rounded-xl space-y-1.5 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold">
              <FiCode className="w-3.5 h-3.5" /> CORE STACK
            </div>
            <p className="text-xs font-medium text-neutral-300">Next.js 15, TypeScript, NestJS, Tailwind</p>
          </div>

          <div className="p-4 bg-neutral-900/30 border border-neutral-800/60 rounded-xl space-y-1.5 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-[11px] font-bold">
              <FiTerminal className="w-3.5 h-3.5" /> SYSTEMS & ALGO
            </div>
            <p className="text-xs font-medium text-neutral-300">C++ Graphics & Native Systems</p>
          </div>

          <div className="p-4 bg-neutral-900/30 border border-neutral-800/60 rounded-xl space-y-1.5 hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold">
              <FiYoutube className="w-3.5 h-3.5" /> BROADCASTING
            </div>
            <p className="text-xs font-medium text-neutral-300">Live Coding Streams & Tech Content</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-4 pt-6 border-t border-neutral-800/60">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FiLayers className="text-emerald-400" /> {currentExtra.focusTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-neutral-900/20 border border-neutral-800/50 rounded-2xl space-y-2 hover:border-neutral-700/80 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <FiCpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">{currentExtra.fullstackTitle}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentExtra.fullstackDesc}
              </p>
            </div>

            <div className="p-5 bg-neutral-900/20 border border-neutral-800/50 rounded-2xl space-y-2 hover:border-neutral-700/80 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                <FiCompass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">{currentExtra.streamTitle}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentExtra.streamDesc}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-neutral-900/60 to-neutral-900/90 border border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left z-10">
            <h3 className="text-lg font-bold text-white">{currentExtra.ctaTitle}</h3>
            <p className="text-xs text-neutral-400 max-w-md">{currentExtra.ctaDesc}</p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all z-10 active:scale-95 shadow-md"
          >
            {currentExtra.ctaBtn}
          </Link>
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}