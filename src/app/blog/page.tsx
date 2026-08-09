"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 
import { Post } from "@/types";   
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const { lang } = useLanguage();
  const t = translations[lang].blog;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 pt-32 pb-16 px-6 relative overflow-hidden transition-colors flex flex-col">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 w-full flex-grow mb-20">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base">
            {t.subtitle}
          </p>
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
                className="group block p-6 bg-white dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800/80 hover:border-emerald-500/50 rounded-2xl transition-all shadow-sm dark:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-all self-start sm:self-center shrink-0">
                    <FiArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <Footer />
    </main>    
  );
}