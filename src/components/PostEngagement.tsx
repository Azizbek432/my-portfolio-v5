"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiHeart, FiEye } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qfutuisdbyulpiboxxan.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_3xd0EGy-pgf1CkUvlxToRA_-He2dHOC"
);

interface PostEngagementProps {
  slug: string;
  initialViews: number;
  initialLikes: number;
  postTitle: string;
  isStatic: boolean;
}

export default function PostEngagement({
  slug,
  initialViews,
  initialLikes,
  postTitle,
  isStatic,
}: PostEngagementProps) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);

  const [hasLiked, setHasLiked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`liked_${slug}`) === "true";
    }
    return false;
  });

  useEffect(() => {
    const registerViewAndSync = async () => {
      try {
        const sessionKey = `viewed_${slug}`;
        const alreadyViewed = sessionStorage.getItem(sessionKey);

        const { data: existing } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!existing && isStatic) {
          const { data: inserted } = await supabase
            .from("posts")
            .insert([
              {
                slug: slug,
                title: postTitle,
                content: "Static article content container",
                views_count: 1,
                likes_count: initialLikes,
              },
            ])
            .select()
            .single();
          if (inserted) {
            setViews(inserted.views_count);
            setLikes(inserted.likes_count);
          }
          sessionStorage.setItem(sessionKey, "true");
        } else if (existing) {
          let newViews = existing.views_count || 0;

          if (!alreadyViewed) {
            newViews += 1;
            await supabase
              .from("posts")
              .update({ views_count: newViews })
              .eq("slug", slug);
            sessionStorage.setItem(sessionKey, "true");
          }

          setViews(newViews);
          setLikes(existing.likes_count || 0);
        }
      } catch (err) {
        console.error("Error updating views:", err);
      }
    };

    registerViewAndSync();
  }, [slug, isStatic, postTitle, initialLikes]);

  const handleLike = async () => {
    try {
      const newLikes = hasLiked ? Math.max(0, likes - 1) : likes + 1;
      const nextLikedState = !hasLiked;

      const { data: existing } = await supabase
        .from("posts")
        .select("id")
        .eq("slug", slug)
        .single();

      if (!existing) {
        await supabase.from("posts").insert([
          {
            slug: slug,
            title: postTitle,
            content: "",
            views_count: views,
            likes_count: newLikes,
          },
        ]);
      } else {
        await supabase
          .from("posts")
          .update({ likes_count: newLikes })
          .eq("slug", slug);
      }

      setLikes(newLikes);
      setHasLiked(nextLikedState);
      
      if (nextLikedState) {
        localStorage.setItem(`liked_${slug}`, "true");
      } else {
        localStorage.removeItem(`liked_${slug}`);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
      <span className="flex items-center gap-1.5">
        <FiEye className="text-emerald-600 dark:text-emerald-400" />
        {views} views
      </span>
      <span>•</span>
      <button
        type="button"
        onClick={handleLike}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer active:scale-95 ${
          hasLiked
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
            : "border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-emerald-400"
        }`}
      >
        <FiHeart
          className={`w-4 h-4 transition-colors ${
            hasLiked ? "fill-current text-emerald-600 dark:text-emerald-400" : ""
          }`}
        />
        <span>{likes} likes</span>
        {hasLiked && <span className="text-[10px] ml-0.5 opacity-75">(Liked)</span>}
      </button>
    </div>
  );
}