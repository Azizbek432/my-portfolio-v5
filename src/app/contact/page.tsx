"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiMessageSquare, FiUser, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpzeqzj"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SUBMITTING");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 pt-32 pb-10 px-6 relative overflow-hidden flex flex-col justify-between transition-colors">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10 w-full">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/30 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <FiMail /> Formspree Powered
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.contact.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-xl dark:shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FiUser className="text-emerald-600 dark:text-emerald-400" /> {t.contact.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Azizbek Abdullayev"
                className="w-full bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FiMail className="text-emerald-600 dark:text-emerald-400" /> {t.contact.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="dev@azizbek.dev"
                className="w-full bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FiMessageSquare className="text-emerald-600 dark:text-emerald-400" /> {t.contact.messageLabel}
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Loyihangiz yoki taklifingiz haqida yozing..."
                className="w-full bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all resize-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === "SUBMITTING"}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] shadow-lg shadow-emerald-500/20"
            >
              {status === "SUBMITTING" ? (
                <span>{t.contact.sendingBtn}</span>
              ) : (
                <>
                  <FiSend /> <span>{t.contact.sendBtn}</span>
                </>
              )}
            </button>

            {status === "SUCCESS" && (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 dark:border-emerald-800/60 p-4 rounded-xl text-xs font-mono">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <span>{t.contact.successMsg}</span>
              </div>
            )}

            {status === "ERROR" && (
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 dark:border-rose-800/60 p-4 rounded-xl text-xs font-mono">
                <FiAlertCircle className="w-5 h-5 shrink-0" />
                <span>{t.contact.errorMsg}</span>
              </div>
            )}

          </form>
        </motion.div>

      </div>

      <div className="mt-24 relative z-10">
        <Footer />
      </div>
    </main>
  );
}