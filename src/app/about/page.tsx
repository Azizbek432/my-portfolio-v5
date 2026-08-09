"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiTerminal, FiCode, FiCpu, FiGlobe, FiCheckCircle } from "react-icons/fi";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, 
  SiNestjs, SiFastapi, SiPostgresql, SiSqlite, SiDocker, 
  SiCplusplus, SiVercel, SiLinux 
} from "react-icons/si";
import { FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

const techStack = [
  { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" /> },
  { name: "React", icon: <SiReact className="w-5 h-5" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="w-5 h-5" /> },
  { name: "NestJS", icon: <SiNestjs className="w-5 h-5" /> },
  { name: "Node.js", icon: <FaNodeJs className="w-5 h-5" /> },
  { name: "Python", icon: <FaPython className="w-5 h-5" /> },
  { name: "FastAPI", icon: <SiFastapi className="w-5 h-5" /> },
  { name: "C++", icon: <SiCplusplus className="w-5 h-5" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" /> },
  { name: "SQLite", icon: <SiSqlite className="w-5 h-5" /> },
  { name: "Docker", icon: <SiDocker className="w-5 h-5" /> },
  { name: "Git", icon: <FaGitAlt className="w-5 h-5" /> },
  { name: "Linux", icon: <SiLinux className="w-5 h-5" /> },
  { name: "Vercel", icon: <SiVercel className="w-5 h-5" /> },
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
            <div className="relative group p-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-[22px] w-72 sm:w-80 transition-all duration-300 hover:border-emerald-500/40">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <Image 
                    src="/profile.jpg" 
                    alt="Azizbek Abdullayev" 
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="text-center pt-4 pb-2">
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
            <p className="text-sm text-neutral-400 leading-relaxed">{t.about.principlesDesc}</p>
          </div>
          <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiGlobe className="text-emerald-400" /> {t.about.hobbyTitle}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{t.about.hobbyDesc}</p>
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center justify-center gap-2 p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/[0.03] transition-all">
                <div className="text-neutral-300">{tech.icon}</div>
                <span className="text-[10px] font-mono text-neutral-400">{tech.name}</span>
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
            {t.about.servicesList.map((srv: { title: string; desc: string }, idx: number) => (
              <div key={idx} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
                <FiCheckCircle className="text-emerald-400 w-5 h-5" />
                <h3 className="text-base font-semibold text-white">{srv.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="mt-24 relative z-10">
        <Footer />
      </div>
    </main>
  );
}