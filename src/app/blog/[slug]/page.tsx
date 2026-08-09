import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import PostEngagement from "@/components/PostEngagement";
import { articles } from "@/data/blogData";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qfutuisdbyulpiboxxan.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_3xd0EGy-pgf1CkUvlxToRA_-He2dHOC"
);

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  const staticArticle = articles.find((a) => a.slug === slug);

  if (!post && !staticArticle) {
    return (
      <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center transition-colors">
        <h1 className="text-2xl font-bold">Maqola topilmadi</h1>
        <Link href="/blog" className="mt-4 text-emerald-600 dark:text-emerald-400 underline font-mono text-xs">
          Blogga qaytish
        </Link>
      </main>
    );
  }

  const title = post?.title || staticArticle?.title.UZ || "Maqola";
  const content = post?.content || staticArticle?.description.UZ || "";
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
      : d.toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 pt-28 pb-20 px-6 relative transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <FiArrowLeft /> Back to Articles
        </Link>

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
          <article className="lg:col-span-3 prose dark:prose-invert prose-emerald max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
            <div className="whitespace-pre-wrap">{content}</div>
          </article>

          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents content={content} />
            </div>
          </aside>
        </div>

        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800/80">
          <Comments postSlug={slug} />
        </div>
      </div>
    </main>
  );
}