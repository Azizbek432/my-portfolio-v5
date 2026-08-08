import Link from "next/link";
import { supabase } from "@/lib/supabase"; 
import { Post } from "@/types";   

export const revalidate = 60; 

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-neutral-400 text-sm">
          Dasturlash, texnologiyalar va shaxsiy tajribalarim haqidagi maqolalar.
        </p>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-neutral-500">Hozircha maqolalar mavjud emas.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}