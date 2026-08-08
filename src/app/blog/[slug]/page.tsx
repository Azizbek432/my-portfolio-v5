import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";

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

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-[#0a0a0c] text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Maqola topilmadi</h1>
        <Link href="/blog" className="mt-4 text-emerald-400 underline">
          Blogga qaytish
        </Link>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Yaqinda";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Yaqinda"
      : date.toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c] text-neutral-100 pt-28 pb-20 px-6 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          <FiArrowLeft /> Back to Articles
        </Link>

        <div className="space-y-4 border-b border-neutral-800/80 pb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-emerald-400" />
              {formatDate(post.created_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-emerald-400" />
              {post.reading_time || "3 min read"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3 prose prose-invert prose-emerald max-w-none text-neutral-300 leading-relaxed font-sans">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </article>

          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>

        <div className="pt-12 border-t border-neutral-800/80">
          <Comments postSlug={slug} />
        </div>
      </div>
    </main>
  );
}