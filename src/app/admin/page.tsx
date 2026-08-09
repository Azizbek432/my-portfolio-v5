"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FiLock, FiKey, FiCheckCircle, FiPlus, FiLogOut, FiX, FiAlertCircle } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const { lang } = useLanguage();
  
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Post form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Modal ichidagi xabarlar uchun state
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const ADMIN_PASSWORD = "admin2012";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setFormSuccess("");

    const { error: dbError } = await supabase.from("posts").insert([
      {
        title,
        slug: slug || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        summary,
        content,
        published_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      setFormError("Xatolik: " + dbError.message);
    } else {
      setFormSuccess("Maqola muvaffaqiyatli e'lon qilindi!");
      setTitle("");
      setSlug("");
      setSummary("");
      setContent("");
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess("");
      }, 1500);
    }
    setSubmitting(false);
  };

  const texts = {
    UZ: {
      title: "Admin Panel",
      subtitle: "Maxfiy boshqaruv qismi",
      placeholder: "Parolni kiriting...",
      loginBtn: "Kirish",
      wrongPass: "Parol noto'g'ri!",
      welcome: "Xush kelibsiz, Azizbek!",
      newPost: "Yangi Maqola Yozish",
      logout: "Chiqish",
      modalTitle: "Yangi Maqola Qo'shish",
      titleLabel: "Sarlavha",
      slugLabel: "Slug (URL manzili)",
      summaryLabel: "Qisqacha mazmun (Summary)",
      contentLabel: "Maqola matni (Content)",
      cancel: "Bekor qilish",
      publish: "E'lon qilish",
      publishing: "Yuklanmoqda...",
    },
    EN: {
      title: "Admin Panel",
      subtitle: "Restricted management area",
      placeholder: "Enter password...",
      loginBtn: "Login",
      wrongPass: "Incorrect password!",
      welcome: "Welcome back, Azizbek!",
      newPost: "Create New Post",
      logout: "Logout",
      modalTitle: "Create New Post",
      titleLabel: "Title",
      slugLabel: "Slug",
      summaryLabel: "Summary",
      contentLabel: "Content",
      cancel: "Cancel",
      publish: "Publish",
      publishing: "Publishing...",
    },
    RU: {
      title: "Админ панель",
      subtitle: "Закрытая зона управления",
      placeholder: "Введите пароль...",
      loginBtn: "Войти",
      wrongPass: "Неверный пароль!",
      welcome: "Добро пожаловать, Азизбек!",
      newPost: "Написать статью",
      logout: "Выйти",
      modalTitle: "Создать новую статью",
      titleLabel: "Заголовок",
      slugLabel: "Слаг",
      summaryLabel: "Краткое описание",
      contentLabel: "Содержание",
      cancel: "Отмена",
      publish: "Опубликовать",
      publishing: "Публикация...",
    },
  };

  const t = texts[lang] || texts.EN;

  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
        <div className="flex-grow flex items-center justify-center px-6 pt-20">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-md space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiLock className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.subtitle}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <FiKey className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/80 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 text-center font-medium">
                  {t.wrongPass}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md active:scale-95"
              >
                {t.loginBtn}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 pt-32 px-6 flex flex-col justify-between transition-colors">
      <div className="max-w-3xl mx-auto space-y-8 w-full flex-grow">
        <div className="flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold">{t.welcome}</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.title}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium transition-colors"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-center">
          <h2 className="text-lg font-semibold">{t.newPost}</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            {lang === "UZ" ? "Yangi maqola yaratish yoki boshqarish uchun quyidagi tugmani bosing." : "Click the button below to create or manage a new blog post."}
          </p>
          <div>
            <button
              onClick={() => {
                setFormError("");
                setFormSuccess("");
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs transition-all shadow-md active:scale-95"
            >
              <FiPlus className="w-4 h-4" />
              <span>{t.newPost}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Maqola yaratish Modali */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t.modalTitle}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-xl bg-neutral-100 dark:bg-neutral-800/50"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-left">
              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-500 text-xs">
                  <FiAlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-500 text-xs font-medium">
                  <FiCheckCircle className="w-4 h-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">{t.titleLabel}</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: Next.js 15 yangiliklari"
                  className="w-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">{t.slugLabel}</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Avtomatik yaratiladi"
                  className="w-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">{t.summaryLabel}</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Maqola haqida qisqacha..."
                  className="w-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">{t.contentLabel}</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Maqola matnini shu yerga yozing..."
                  className="w-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-sm font-medium transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {submitting ? t.publishing : t.publish}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}