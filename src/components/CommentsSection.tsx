"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient, User } from "@supabase/supabase-js";
import { FiHeart, FiMessageSquare, FiTrash2, FiEdit2, FiLogOut, FiGithub, FiGlobe } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const dict = {
  uz: {
    comments: "Izohlar",
    placeholder: "Fikr va mulohazalaringizni yozing...",
    post: "Izoh qoldirish",
    loginGoogle: "Google",
    loginGithub: "GitHub",
    logout: "Chiqish",
    reply: "Javob berish",
    edit: "Tahrirlash",
    delete: "O'chirish",
    save: "Saqlash",
    cancel: "Bekor qilish",
    pleaseLogin: "Izoh qoldirish uchun yuqoridagi tugmalar orqali kiring.",
    replyPlaceholder: "Javob yozing...",
    send: "Yuborish",
    author: "Author"
  },
  en: {
    comments: "Comments",
    placeholder: "Write your thoughts...",
    post: "Post comment",
    loginGoogle: "Google",
    loginGithub: "GitHub",
    logout: "Logout",
    reply: "Reply",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    pleaseLogin: "Please sign in above to leave a comment.",
    replyPlaceholder: "Write a reply...",
    send: "Send",
    author: "Author"
  },
  ru: {
    comments: "Комментарии",
    placeholder: "Напишите свой отзыв...",
    post: "Отправить",
    loginGoogle: "Google",
    loginGithub: "GitHub",
    logout: "Выйти",
    reply: "Ответить",
    edit: "Редактировать",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    pleaseLogin: "Войдите, чтобы оставить комментарий.",
    replyPlaceholder: "Напишите ответ...",
    send: "Отправить",
    author: "Author"
  }
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qfutuisdbyulpiboxxan.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_3xd0EGy-pgf1CkUvlxToRA_-He2dHOC"
);

interface Comment {
  id: string;
  post_slug: string;
  user_name: string;
  user_email: string;
  user_avatar: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  likes_count: number;
}

function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return "last week";
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return "last year";
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
  const [lang, setLang] = useState<"uz" | "en" | "ru">("uz");
  const t = dict[lang];

  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});

  const fetchCommentsAndLikes = useCallback(async (currentUser: User | null) => {
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false });

    if (!commentsError && commentsData) {
      setComments(commentsData);
    }

    if (currentUser) {
      const { data: likesData, error: likesError } = await supabase
        .from("comment_likes")
        .select("comment_id")
        .eq("user_id", currentUser.id);

      if (!likesError && likesData) {
        const likedMap: { [key: string]: boolean } = {};
        likesData.forEach((like) => {
          likedMap[like.comment_id] = true;
        });
        setLikedComments(likedMap);
      }
    } else {
      setLikedComments({});
    }
  }, [postSlug]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const currentUser = data?.user || null;
      setUser(currentUser);
      fetchCommentsAndLikes(currentUser);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      fetchCommentsAndLikes(currentUser);
    });

    const channel = supabase
      .channel(`public:comments:${postSlug}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments", filter: `post_slug=eq.${postSlug}` },
        () => {
          fetchCommentsAndLikes(user);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comment_likes" },
        () => {
          fetchCommentsAndLikes(user);
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [postSlug, fetchCommentsAndLikes, user]);

  const signInWithProvider = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLikedComments({});
  };

  const handleAddComment = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    const content = parentId ? replyContent : newComment;
    if (!content.trim() || !user) return;

    const { error } = await supabase.from("comments").insert([
      {
        post_slug: postSlug,
        user_id: user.id,
        user_email: user.email || "",
        user_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        user_avatar: user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
        content: content.trim(),
        parent_id: parentId,
      },
    ]);

    if (!error) {
      if (parentId) {
        setReplyContent("");
        setReplyingTo(null);
      } else {
        setNewComment("");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (!error) fetchCommentsAndLikes(user);
  };

  const handleUpdate = async (id: string) => {
    if (!editContent.trim()) return;
    const { error } = await supabase
      .from("comments")
      .update({ content: editContent.trim() })
      .eq("id", id);

    if (!error) {
      setEditingId(null);
      setEditContent("");
      fetchCommentsAndLikes(user);
    }
  };

  const handleLikeComment = async (commentId: string, currentLikes: number) => {
    if (!user) return;
    const isLiked = likedComments[commentId];
    const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    setLikedComments({ ...likedComments, [commentId]: !isLiked });
    setComments(comments.map(c => c.id === commentId ? { ...c, likes_count: newLikes } : c));

    if (isLiked) {
      await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);
    } else {
      await supabase
        .from("comment_likes")
        .insert([{ comment_id: commentId, user_id: user.id }]);
    }

    await supabase.from("comments").update({ likes_count: newLikes }).eq("id", commentId);
  };

  const isAuthor = (email: string) => {
    if (!email) return false;
    const authors = process.env.NEXT_PUBLIC_AUTHOR_EMAILS?.split(",").map(e => e.trim()) || [];
    return authors.includes(email);
  };

  return (
    <div className="space-y-8 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <FiMessageSquare className="text-emerald-500" />
          {t.comments} ({comments.length})
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <FiGlobe className="text-neutral-400 w-3.5 h-3.5" />
            {(["uz", "en", "ru"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`uppercase px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  lang === l
                    ? "bg-emerald-500 text-black font-bold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Image 
                src={user.user_metadata?.avatar_url || "https://github.com/shadcn.png"} 
                alt="Avatar" 
                width={32} 
                height={32} 
                className="rounded-full border border-neutral-700" 
              />
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">{user.user_metadata?.full_name || user.email}</span>
              <button onClick={signOut} className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:text-red-500 transition-colors cursor-pointer" title={t.logout}>
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => signInWithProvider("google")} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-medium hover:border-emerald-500 transition-all cursor-pointer">
                <FcGoogle className="w-4 h-4" /> {t.loginGoogle}
              </button>
              <button onClick={() => signInWithProvider("github")} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 text-white border border-neutral-700 text-xs font-medium hover:border-emerald-500 transition-all cursor-pointer">
                <FiGithub className="w-4 h-4" /> {t.loginGithub}
              </button>
            </div>
          )}
        </div>
      </div>

      {user ? (
        <form onSubmit={(e) => handleAddComment(e, null)} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t.placeholder}
            className="w-full p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none h-24 text-neutral-900 dark:text-neutral-100"
          />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors cursor-pointer">
              {t.post}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500">
          {t.pleaseLogin}
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image 
                  src={comment.user_avatar || "https://github.com/shadcn.png"} 
                  alt="Avatar" 
                  width={32} 
                  height={32} 
                  className="rounded-full" 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{comment.user_name}</h4>
                    {isAuthor(comment.user_email) && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20">
                        {t.author}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {getRelativeTime(comment.created_at)}
                  </span>
                </div>
              </div>

              {user && user.id === comment.user_id && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <button onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }} className="hover:text-emerald-500 transition-colors cursor-pointer" title={t.edit}>
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(comment.id)} className="hover:text-red-500 transition-colors cursor-pointer" title={t.delete}>
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {editingId === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs border border-neutral-700 focus:outline-none text-neutral-900 dark:text-neutral-100"
                />
                <div className="gap-2 flex justify-end">
                  <button onClick={() => setEditingId(null)} className="px-3 py-1 rounded bg-neutral-700 text-white text-xs cursor-pointer">{t.cancel}</button>
                  <button onClick={() => handleUpdate(comment.id)} className="px-3 py-1 rounded bg-emerald-500 text-black text-xs font-semibold cursor-pointer">{t.save}</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{comment.content}</p>
            )}

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
              <button onClick={() => handleLikeComment(comment.id, comment.likes_count)} className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                <FiHeart className={`w-3.5 h-3.5 ${likedComments[comment.id] ? "fill-current text-emerald-500" : ""}`} />
                <span>{comment.likes_count}</span>
              </button>
              {user && (
                <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="hover:text-emerald-500 transition-colors cursor-pointer">
                  {t.reply}
                </button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3 pl-4 border-l-2 border-emerald-500/50 space-y-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={t.replyPlaceholder}
                  className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs border border-neutral-700 focus:outline-none text-neutral-900 dark:text-neutral-100"
                />
                <div className="gap-2 flex justify-end">
                  <button onClick={() => setReplyingTo(null)} className="px-3 py-1 rounded bg-neutral-700 text-white text-xs cursor-pointer">{t.cancel}</button>
                  <button onClick={(e) => handleAddComment(e, comment.id)} className="px-3 py-1 rounded bg-emerald-500 text-black text-xs font-semibold cursor-pointer">{t.send}</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}