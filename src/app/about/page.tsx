"use client";

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

const techStack = [
  { category: "Frontend", items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "HTML5/CSS3"] },
  { category: "Backend & Systems", items: ["NestJS", "Node.js", "Express.js", "Python", "FastAPI", "C++"] },
  { category: "Databases & Tools", items: ["PostgreSQL", "SQLite", "Prisma", "Supabase", "Git", "VS Code"] },
];

const services = [
  {
    title: "Full-stack Web Development",
    desc: "React, Next.js hamda Node.js/NestJS ekotizimi orqali tekor va xavfsiz web loyihalar yaratish.",
  },
  {
    title: "Telegram Bots & Automation",
    desc: "Biznes jarayonlarini avtomatlashtiruvchi va integratsiyalashgan backend botlar ishlab chiqish.",
  },
  {
    title: "Technical Support & Refactoring",
    desc: "Mavjud kodingizni modernizatsiya qilish, unumdorlikni oshirish va yangi funksiyalar qo'shish.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <FiTerminal /> Developer & Educator
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Azizbek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Abdullayev</span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Men web dasturlash va tizimlar muhandisligiga ishtiyoqli, uzluksiz o&apos;rganish va amaliyotga tayangan holda sifatli raqamli mahsulotlar yaratuvchi Full-stack dasturchiman.
          </p>
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
              <FiCpu className="text-emerald-400" /> Prinsiplarim
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              &apos;Katta natijalar kichik va uzluksiz qadamlar bilan boshlanadi.&apos; Har kuni kod yozish, har hafta sifatli reformat va deploy qilish asosiy tamoyilimdir.
            </p>
          </div>
          <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiGlobe className="text-emerald-400" /> Bo&apos;sh Vaqt & Qiziqishlar
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Dasturlashdan tashqari shaxmat o&apos;ynash, algoritmlarni chuqur tahlil qilish hamda milliy musiqa asboblari (Rubob) ijrosida hordiq chiqarishni xush ko&apos;raman.
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
            <FiCode className="text-emerald-400" /> Texnologiyalar & Ko&apos;nikmalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((group, idx) => (
              <div key={idx} className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-4">
                <h4 className="text-sm font-mono text-emerald-400 font-semibold">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 text-xs px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Xizmatlar & Web Yechimlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <div key={idx} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
                <FiCheckCircle className="text-emerald-400 w-5 h-5" />
                <h3 className="text-base font-semibold text-white">{srv.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* External Portfolios & Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-neutral-800/80 space-y-6"
        >
          <h2 className="text-xl font-bold text-white">Ijtimoiy Tarmoqlar & Portfoliolar</h2>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/Azizbek432" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all">
              <FiGithub className="text-emerald-400" /> GitHub (46+ Repos)
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
    </main>
  );
}