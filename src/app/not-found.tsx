"use client";

import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();
  
  const content = {
    UZ: { title: "Sahifa topilmadi", desc: "Siz qidirayotgan sahifa mavjud emas.", btn: "Bosh sahifaga qaytish" },
    EN: { title: "Page not found", desc: "The page you are looking for does not exist.", btn: "Back to Home" },
    RU: { title: "Страница не найдена", desc: "Страница, которую вы ищете, не существует.", btn: "Вернуться на главную" }
  };

  const t = content[lang] || content.EN;

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 flex items-center justify-center px-6 transition-colors">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
          <FiAlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{t.title}</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.desc}</p>
        </div>
        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold text-xs px-6 py-3 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all active:scale-95">
            <FiArrowLeft className="w-4 h-4" />
            <span>{t.btn}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}