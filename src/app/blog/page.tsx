"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 
import { Post } from "@/types";   
import { FiArrowUpRight, FiCalendar, FiPlus, FiX } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function BlogPage() {
  const { lang } = useLanguage();
  const t = translations[lang].blog;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug: slug || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        summary,
        content,
        published_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Xatolik yuz berdi: " + error.message);
    } else {
      setTitle("");
      setSlug("");
      setSummary("");
      setContent("");
      setIsModalOpen(false);
      
      // Qayta yuklash
      const { data } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
      setPosts(data || []);
    }
    setSubmitting(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t.title}
            </h1>
            <p className="text-neutral-400 text-base">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
          >
            <FiPlus className="w-4 h-4" />
            <span>{t.createBtn}</span>
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-neutral-500 font-mono text-sm">{t.loading}</p>
          ) : posts.length === 0 ? (
            <p className="text-neutral-500 font-mono text-sm">{t.noPosts}</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/80 hover:border-emerald-500/50 rounded-2xl transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/50 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center text-neutral-300 transition-all self-start sm:self-center shrink-0">
                    <FiArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{t.modal.title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-800/50"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{t.modal.titleLabel}</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: Next.js 15 yangiliklari"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{t.modal.slugLabel}</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Avtomatik yaratiladi"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{t.modal.summaryLabel}</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Maqola haqida qisqacha..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{t.modal.contentLabel}</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Maqola matnini shu yerga yozing..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-all"
                >
                  {t.modal.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {submitting ? t.modal.publishing : t.modal.publish}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}