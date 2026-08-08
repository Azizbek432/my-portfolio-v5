import { supabase } from "@/lib/supabase";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import { notFound } from "next/navigation";
import { FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  // Formatting escaped newlines if any
  const formattedContent = post.content ? post.content.replace(/\\n/g, "\n") : "";

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-neutral-100 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-8">
            <header className="space-y-4 border-b border-neutral-800/80 pb-8">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-emerald-400" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="text-emerald-400" /> 3 min read
                </span>
              </div>
            </header>

            {/* Content Display */}
            <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed text-base whitespace-pre-wrap font-sans">
              {formattedContent}
            </div>

            {/* Interactive Comments Component */}
            <div className="pt-12">
              <Comments postSlug={slug} />
            </div>
          </article>

          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 p-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Table of Contents
              </h3>
              <TableOfContents content={formattedContent} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}