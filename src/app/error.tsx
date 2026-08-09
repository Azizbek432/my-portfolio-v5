"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FiRefreshCw, FiAlertOctagon } from "react-icons/fi";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { lang } = useLanguage();

  const t = {
    UZ: { title: "Xatolik yuz berdi", desc: "Tizimda nosozlik aniqlandi.", btn: "Qayta urinish" },
    EN: { title: "Something went wrong", desc: "An error occurred in the system.", btn: "Try again" },
    RU: { title: "Произошла ошибка", desc: "Обнаружена ошибка в системе.", btn: "Попробовать снова" }
  };

  const text = t[lang] || t.EN;

  useEffect(() => {
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-6">
        <FiAlertOctagon className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{text.title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">{text.desc}</p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-medium text-sm hover:scale-105 transition-transform"
      >
        <FiRefreshCw className="w-4 h-4" />
        {text.btn}
      </button>
    </div>
  );
}