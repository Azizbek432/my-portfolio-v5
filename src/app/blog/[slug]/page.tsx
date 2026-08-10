"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import CommentsSection from "@/components/CommentsSection";
import TableOfContents from "@/components/TableOfContents";
import PostEngagement from "@/components/PostEngagement";
import { articles } from "@/data/blogData";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import Loading from "../loading";

interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  published_at: string;
  reading_time: string;
  views_count: number;
  likes_count: number;
}

const postDict = {
  UZ: {
    back: "Maqolalarga qaytish",
    notFound: "Maqola topilmadi",
    backToBlog: "Blogga qaytish",
    otherLang: "Read in other language?",
    uzbek: "O'zbekcha",
    english: "English",
    russian: "Русский",
    soon: "SOON",
    active: "Active",
  },
  EN: {
    back: "Back to Articles",
    notFound: "Article not found",
    backToBlog: "Back to Blog",
    otherLang: "Read in other language?",
    uzbek: "O'zbekcha",
    english: "English",
    russian: "Русский",
    soon: "SOON",
    active: "Active",
  },
  RU: {
    back: "Назад к статьям",
    notFound: "Статья не найдена",
    backToBlog: "Вернуться в блог",
    otherLang: "Read in other language?",
    uzbek: "O'zbekcha",
    english: "English",
    russian: "Русский",
    soon: "SOON",
    active: "Active",
  },
};

function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, index) => {
    if (line.startsWith("# ")) {
      const text = line.replace("# ", "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return (
        <h1 key={index} id={id} className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-10 mb-4 scroll-mt-28">
          {text}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return (
        <h2 key={index} id={id} className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-8 mb-3 scroll-mt-28">
          {text}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return (
        <h3 key={index} id={id} className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2 scroll-mt-28">
          {text}
        </h3>
      );
    } else if (line.trim() === "") {
      return <div key={index} className="h-3" />;
    } else {
      return (
        <p key={index} className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {line}
        </p>
      );
    }
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const { lang, setLang } = useLanguage();
  
  const currentLang = (lang?.toUpperCase() || "UZ") as "UZ" | "EN" | "RU";
  const t = postDict[currentLang] || postDict.UZ;

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        setPost(data as PostData);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  const staticArticle = articles.find((a) => a.slug === slug);

  if (loading) {
    return <Loading />;
  }

  if (!post && !staticArticle) {
    return (
      <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center transition-colors">
        <h1 className="text-2xl font-bold">{t.notFound}</h1>
        <Link href="/blog" className="mt-4 text-emerald-600 dark:text-emerald-400 underline font-mono text-xs">
          {t.backToBlog}
        </Link>
      </main>
    );
  }

  const staticTitleMap = staticArticle?.title as unknown as Record<string, string>;
  const staticDescMap = staticArticle?.description as unknown as Record<string, string>;

  const title =
    post?.title ||
    staticTitleMap?.[currentLang] ||
    staticTitleMap?.UZ ||
    "Maqola";

  const content =
    post?.content ||
    staticDescMap?.[currentLang] ||
    staticDescMap?.UZ ||
    "";

  const date = post?.published_at || staticArticle?.date || new Date().toISOString();
  const readingTime = post?.reading_time || staticArticle?.readTime || "4 min read";

  const initialViews = post?.views_count || staticArticle?.views || 1;
  const initialLikes = post?.likes_count || 0;
  const isStatic = !post && !!staticArticle;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Yaqinda";
    const d = new Date(dateString);
    return isNaN(d.getTime())
      ? "Yaqinda"
      : d.toLocaleDateString(currentLang === "UZ" ? "uz-UZ" : currentLang === "RU" ? "ru-RU" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 pt-28 pb-20 px-6 relative transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <FiArrowLeft /> {t.back}
          </Link>
        </div>

        <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800/80 pb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-emerald-600 dark:text-emerald-400" />
              {formatDate(date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-emerald-600 dark:text-emerald-400" />
              {readingTime}
            </span>
            <span>•</span>
            <PostEngagement
              slug={slug}
              initialViews={initialViews}
              initialLikes={initialLikes}
              postTitle={title}
              isStatic={isStatic}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3 max-w-none font-sans">
            {renderMarkdownContent(content)}
          </article>

          <aside className="lg:col-span-1 hidden lg:block space-y-6">
            <div className="sticky top-28 bg-white/50 dark:bg-neutral-900/30 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 backdrop-blur-md">
              <TableOfContents content={content} />
              
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800/80">
                <h4 className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  {t.otherLang}
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <button
                    onClick={() => setLang("UZ")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      currentLang === "UZ"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {currentLang === "UZ" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                      {t.uzbek}
                    </span>
                    {currentLang === "UZ" && <span className="text-[10px]">{t.active}</span>}
                  </button>

                  <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-400 dark:text-neutral-500 cursor-not-allowed">
                    <span>{t.english}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{t.soon}</span>
                  </div>

                  <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-400 dark:text-neutral-500 cursor-not-allowed">
                    <span>{t.russian}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{t.soon}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800/80">
          <CommentsSection postSlug={slug} />
        </div>
      </div>
    </main>
  );
}