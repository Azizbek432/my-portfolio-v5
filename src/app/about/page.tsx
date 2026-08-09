"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FiCode, 
  FiTerminal, 
  FiGlobe, 
  FiCpu, 
  FiCheckCircle, 
  FiSend, 
  FiGithub, 
  FiLinkedin, 
  FiYoutube 
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

const techStack = [
  { category: "Frontend", items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "React Native"] },
  { category: "Backend & Systems", items: ["NestJS", "Node.js", "Python", "FastAPI", "C++", "SFML"] },
  { category: "Databases & Tools", items: ["PostgreSQL", "SQLite", "Docker", "Git", "Linux", "Vercel"] },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-10 px-6 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-20 relative z-10 w-full">

        <div className="pt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono px-3.5 py-1.5 rounded-full">
              <FiTerminal /> {t.about.role}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.about.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{t.about.titleHighlight}</span>
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base font-mono">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-2xl space-y-3 w-72 sm:w-80 rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <Image 
                    src="/profile.jpg" 
                    alt="Azizbek Abdullayev" 
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-xs pointer-events-none">
                    {t.about.photoPlaceholder}
                  </div>
                </div>
                <div className="text-center pb-2">
                  <h3 className="text-lg font-bold text-white">Azizbek Abdullayev</h3>
                  <p className="text-xs font-mono text-emerald-400">{t.about.photoSubtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.about.greetingPrefix}<span className="text-emerald-400">{t.about.greetingName}</span>{t.about.greetingSuffix}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {t.about.bio}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiCpu className="text-emerald-400" /> {t.about.principlesTitle}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t.about.principlesDesc}
            </p>
          </div>
          <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiGlobe className="text-emerald-400" /> {t.about.hobbyTitle}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t.about.hobbyDesc}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiCode className="text-emerald-400" /> {t.about.techTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((group, idx) => (
              <div key={idx} className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-4">
                <h4 className="text-sm font-mono text-emerald-400 font-semibold">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 text-xs px-2.5 py-1 rounded-md font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">{t.about.servicesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.servicesList.map((srv, idx: number) => (
              <div key={idx} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
                <FiCheckCircle className="text-emerald-400 w-5 h-5" />
                <h3 className="text-base font-semibold text-white">{srv.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-neutral-800/80 space-y-6"
        >
          <h2 className="text-xl font-bold text-white">{t.about.socialTitle}</h2>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/Azizbek432" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all">
              <FiGithub className="text-emerald-400" /> GitHub
            </a>
            <a href="https://t.me/azizbek_it_dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all">
              <FiSend className="text-emerald-400" /> Telegram Channel
            </a>
            <a href="https://www.linkedin.com/in/azizbek-abdullayev-future-full-stack-developer" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all">
              <FiLinkedin className="text-emerald-400" /> LinkedIn
            </a>
            <a href="https://www.youtube.com/@Azizbek_Abdullayev__2026" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all">
              <FiYoutube className="text-emerald-400" /> YouTube
            </a>
          </div>
        </motion.div>

      </div>

      <div className="mt-24 relative z-10">
        <Footer />
      </div>
    </main>
  );
}