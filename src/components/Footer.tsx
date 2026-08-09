"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiSend, FiMail, FiYoutube, FiCode, FiHeart, FiLock } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const t = {
    UZ: {
      desc: "High-performance full-stack web va mobile ilovalar yaratish hamda dasturlash bo'yicha kontent ulashish platformasi.",
      pages: "Sahifalar",
      home: "Bosh sahifa",
      blog: "Maqolalar",
      projects: "Loyihalar",
      about: "Men haqimda",
      contact: "Aloqa",
      social: "Ijtimoiy tarmoqlar",
      built: "Next.js & Tailwind yordamida yasalgan",
      adminTitle: "Admin Panel"
    },
    EN: {
      desc: "A platform for building high-performance full-stack web & mobile apps and sharing programming content.",
      pages: "Pages",
      home: "Home",
      blog: "Articles",
      projects: "Projects",
      about: "About Me",
      contact: "Contact",
      social: "Social Networks",
      built: "Built with Next.js & Tailwind",
      adminTitle: "Admin Panel"
    },
    RU: {
      desc: "Платформа для создания высокопроизводительных full-stack веб и мобильных приложений, а также обмена контентом по программированию.",
      pages: "Страницы",
      home: "Главная",
      blog: "Статьи",
      projects: "Проекты",
      about: "Обо мне",
      contact: "Контакты",
      social: "Социальные сети",
      built: "Создано с помощью Next.js & Tailwind",
      adminTitle: "Админ панель"
    }
  };

  const text = t[lang] || t.EN;

  return (
    <footer className="w-full bg-neutral-50 dark:bg-[#0a0a0c] border-t border-neutral-200 dark:border-neutral-800/60 pt-16 pb-12 px-6 text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800/40">
        
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 group inline-flex">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiCode className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider text-neutral-900 dark:text-white">
              AZIZBEK<span className="text-emerald-600 dark:text-emerald-400">.DEV</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
            {text.desc}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-neutral-900 dark:text-white tracking-wider">{text.pages}</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{text.home}</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{text.blog}</Link></li>
            <li><Link href="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{text.projects}</Link></li>
            <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{text.about}</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{text.contact}</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-neutral-900 dark:text-white tracking-wider">{text.social}</h4>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/Azizbek432"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/azizbek-abdullayev-future-full-stack-developer/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/AzizbekAbd5902"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@Azizbek_Abdullayev__2026"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiYoutube className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/AzizbekAbdullayev09"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiSend className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@azizbekabdullayev3500@gmail.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiMail className="w-4 h-4" />
            </a>
            <Link
              href="/admin"
              title={text.adminTitle}
              className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FiLock className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-4">
        <p>© {currentYear} Azizbek Abdullayev</p>
        <p className="flex items-center gap-1 font-mono">
          Built with <FiHeart className="text-emerald-600 dark:text-emerald-400 w-3.5 h-3.5 fill-emerald-500 dark:fill-emerald-400" /> {text.built}
        </p>
      </div>
    </footer>
  );
}