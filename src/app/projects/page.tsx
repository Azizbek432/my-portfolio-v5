"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder, FiCode, FiSmartphone, FiCpu } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { projectsData } from "@/lib/projectsData";

type CategoryFilter = "all" | "web" | "mobile" | "systems";

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

  const categories: { id: CategoryFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: t.projects.filterAll, icon: FiFolder },
    { id: "web", label: t.projects.filterWeb, icon: FiCode },
    { id: "mobile", label: t.projects.filterMobile, icon: FiSmartphone },
    { id: "systems", label: t.projects.filterSystems, icon: FiCpu },
  ];

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono px-3.5 py-1.5 rounded-full">
            <FiCode /> Production & Open Source
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t.projects.title}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20"
                    : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.id}
                className="bg-neutral-900/40 border border-neutral-800/80 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between group transition-all backdrop-blur-sm hover:shadow-2xl hover:shadow-emerald-950/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-emerald-400 transition-colors p-1"
                          title={t.projects.viewCode}
                        >
                          <FiGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-emerald-400 transition-colors p-1"
                          title={t.projects.viewDemo}
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {project.description[lang]}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-neutral-800/60 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}