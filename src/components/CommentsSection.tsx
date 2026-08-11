"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient, User } from "@supabase/supabase-js";
import { 
  FiHeart, 
  FiMessageSquare, 
  FiTrash2, 
  FiEdit2, 
  FiLogOut, 
  FiGithub, 
  FiGlobe, 
  FiUser, 
  FiCornerDownRight, 
  FiChevronDown, 
  FiChevronUp 
} from "react-icons/fi";

const dict = {
  uz: {
    comments: "Izohlar",
    placeholder: "Fikr va mulohazalaringizni yozing...",
    replyPlaceholder: "Javob yozish...",
    guestPlaceholder: "Ismingiz (ixtiyoriy, yozmasangiz Mehmon bo'ladi)...",
    guestTip: "💡 GitHubga kirmasdan ham bemalol ism yozib izoh qoldirishingiz mumkin.",
    post: "Izoh qoldirish",
    reply: "Javob berish",
    cancelReply: "Bekor qilish",
    loginGithub: "GitHub orqali kirish",
    logout: "Chiqish",
    edit: "Tahrirlash",
    delete: "O'chirish",
    save: "Saqlash",
    cancel: "Bekor qilish",
    author: "Muallif",
    guestBadge: "Mehmon",
    justNow: "hozirgina",
    yesterday: "kecha",
    lastWeek: "o'tgan hafta",
    lastYear: "o'tgan yil",
    showReplies: "Javoblarni ko'rsatish",
    hideReplies: "Javoblarni yashirish"
  },
  en: {
    comments: "Comments",
    placeholder: "Write your thoughts...",
    replyPlaceholder: "Write a reply...",
    guestPlaceholder: "Your name (optional, defaults to Guest)...",
    guestTip: "💡 You can leave a comment with your name without signing into GitHub.",
    post: "Post comment",
    reply: "Reply",
    cancelReply: "Cancel",
    loginGithub: "Sign in with GitHub",
    logout: "Logout",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    author: "Author",
    guestBadge: "Guest",
    justNow: "just now",
    yesterday: "yesterday",
    lastWeek: "last week",
    lastYear: "last year",
    showReplies: "Show replies",
    hideReplies: "Hide replies"
  },
  ru: {
    comments: "Комментарии",
    placeholder: "Напишите свой отзыв...",
    replyPlaceholder: "Написать ответ...",
    guestPlaceholder: "Ваше имя (необязательно, по умолчанию Гость)...",
    guestTip: "💡 Вы можете оставить комментарий от своего имени без входа через GitHub.",
    post: "Отправить",
    reply: "Ответить",
    cancelReply: "Отмена",
    loginGithub: "Войти через GitHub",
    logout: "Выйти",
    edit: "Редактировать",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    author: "Автор",
    guestBadge: "Гость",
    justNow: "только что",
    yesterday: "вчера",
    lastWeek: "на прошлой неделе",
    lastYear: "в прошлом году",
    showReplies: "Показать ответы",
    hideReplies: "Скрыть ответы"
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
  user_id: string | null;
  content: string;
  parent_id: string | null;
  created_at: string;
  likes_count: number;
  replies?: Comment[];
}

function getRelativeTime(dateString: string, t: typeof dict["uz"]) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return t.justNow;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return t.yesterday;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return t.lastWeek;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return t.lastYear;
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
  const [lang, setLang] = useState<"uz" | "en" | "ru">("uz");
  const t = dict[lang];

  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [collapsedReplies, setCollapsedReplies] = useState<{ [key: string]: boolean }>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});

  const fetchCommentsAndLikes = useCallback(async (currentUser: User | null) => {
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: true });

    if (!commentsError && commentsData) {
      const parentComments = commentsData.filter((c) => !c.parent_id);
      const formatted = parentComments.map((parent) => ({
        ...parent,
        replies: commentsData.filter((child) => child.parent_id === parent.id),
      }));
      setComments(formatted);
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
        async () => {
          const { data } = await supabase.auth.getUser();
          fetchCommentsAndLikes(data?.user || null);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comment_likes" },
        async () => {
          const { data } = await supabase.auth.getUser();
          fetchCommentsAndLikes(data?.user || null);
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [postSlug, fetchCommentsAndLikes]);

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
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
    const contentText = parentId ? replyContent : newComment;
    if (!contentText.trim()) return;

    const nameToUse = user 
      ? (user.user_metadata?.full_name || user.email?.split("@")[0] || "User")
      : (guestName.trim() || t.guestBadge);

    const avatarToUse = user
      ? (user.user_metadata?.avatar_url || "https://github.com/shadcn.png")
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nameToUse)}`;

    const { error } = await supabase.from("comments").insert([
      {
        post_slug: postSlug,
        user_id: user ? user.id : null,
        user_email: user ? (user.email || "") : "",
        user_name: nameToUse,
        user_avatar: avatarToUse,
        content: contentText.trim(),
        parent_id: parentId,
      },
    ]);

    if (!error) {
      if (parentId) {
        setReplyContent("");
        setReplyingToId(null);
      } else {
        setNewComment("");
        if (!user) setGuestName("");
      }
      fetchCommentsAndLikes(user);
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
    const isLiked = likedComments[commentId];
    const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    setLikedComments({ ...likedComments, [commentId]: !isLiked });

    const updateLikesRecursive = (list: Comment[]): Comment[] => {
      return list.map(c => {
        if (c.id === commentId) {
          return { ...c, likes_count: newLikes };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateLikesRecursive(c.replies) };
        }
        return c;
      });
    };
    setComments(updateLikesRecursive(comments));

    if (user) {
      if (isLiked) {
        await supabase.from("comment_likes").delete().eq("comment_id", commentId).eq("user_id", user.id);
      } else {
        await supabase.from("comment_likes").insert([{ comment_id: commentId, user_id: user.id }]);
      }
    }

    await supabase.from("comments").update({ likes_count: newLikes }).eq("id", commentId);
  };

  const isAuthor = (email: string) => {
    if (!email) return false;
    const authors = process.env.NEXT_PUBLIC_AUTHOR_EMAILS?.split(",").map(e => e.trim()) || [];
    return authors.includes(email);
  };

  const toggleCollapse = (commentId: string) => {
    setCollapsedReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div className="space-y-8 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <FiMessageSquare className="text-emerald-500" />
          {t.comments} ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
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
                className="rounded-full border border-neutral-700 object-cover" 
              />
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">{user.user_metadata?.full_name || user.email}</span>
              <button onClick={signOut} className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:text-red-500 transition-colors cursor-pointer" title={t.logout}>
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={signInWithGithub} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 text-white border border-neutral-700 text-xs font-medium hover:border-emerald-500 transition-all cursor-pointer">
              <FiGithub className="w-4 h-4" /> {t.loginGithub}
            </button>
          )}
        </div>
      </div>

      <form onSubmit={(e) => handleAddComment(e, null)} className="space-y-3 p-4 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800">
        {!user && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
              <FiUser className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder={t.guestPlaceholder}
              className="w-full sm:w-72 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-neutral-100"
            />
          </div>
        )}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t.placeholder}
          className="w-full p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none h-24 text-neutral-900 dark:text-neutral-100"
        />
        <div className="flex items-center justify-between flex-wrap gap-2">
          {!user && (
            <span className="text-[11px] text-neutral-500 font-mono">
              {t.guestTip}
            </span>
          )}
          <div className="flex justify-end ml-auto">
            <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors cursor-pointer">
              {t.post}
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => {
          const hasReplies = comment.replies && comment.replies.length > 0;
          const isCollapsed = collapsedReplies[comment.id];

          return (
            <div key={comment.id} className="space-y-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={comment.user_avatar || "https://github.com/shadcn.png"} 
                      alt="Avatar" 
                      width={32} 
                      height={32} 
                      className="rounded-full border border-neutral-700 object-cover" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{comment.user_name}</h4>
                        {comment.user_email && isAuthor(comment.user_email) ? (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20">
                            {t.author}
                          </span>
                        ) : !comment.user_id ? (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-500/10 text-neutral-400 rounded-md border border-neutral-500/20">
                            {t.guestBadge}
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {getRelativeTime(comment.created_at, t)}
                      </span>
                    </div>
                  </div>

                  {user && comment.user_id === user.id && (
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

                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-1">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleLikeComment(comment.id, comment.likes_count)} className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                      <FiHeart className={`w-3.5 h-3.5 ${likedComments[comment.id] ? "fill-current text-emerald-500" : ""}`} />
                      <span>{comment.likes_count}</span>
                    </button>

                    <button 
                      onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)} 
                      className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer"
                    >
                      <FiCornerDownRight className="w-3.5 h-3.5" />
                      <span>{t.reply}</span>
                    </button>
                  </div>

                  {hasReplies && (
                    <button 
                      onClick={() => toggleCollapse(comment.id)}
                      className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      <span>{isCollapsed ? `${t.showReplies} (${comment.replies?.length})` : t.hideReplies}</span>
                      {isCollapsed ? <FiChevronDown className="w-3.5 h-3.5" /> : <FiChevronUp className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {replyingToId === comment.id && (
                <form onSubmit={(e) => handleAddComment(e, comment.id)} className="ml-6 sm:ml-10 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <span>Replying to {comment.user_name}</span>
                    <button type="button" onClick={() => setReplyingToId(null)} className="hover:underline">{t.cancelReply}</button>
                  </div>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={t.replyPlaceholder}
                    className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-none focus:border-emerald-500 resize-none h-16 text-neutral-900 dark:text-neutral-100"
                  />
                  <div className="flex justify-end">
                    <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors cursor-pointer">
                      {t.post}
                    </button>
                  </div>
                </form>
              )}

              {hasReplies && !isCollapsed && (
                <div className="pl-6 sm:pl-10 space-y-3 border-l-2 border-neutral-200 dark:border-neutral-800 ml-4">
                  {comment.replies!.map((reply) => (
                    <div key={reply.id} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Image 
                            src={reply.user_avatar || "https://github.com/shadcn.png"} 
                            alt="Avatar" 
                            width={28} 
                            height={28} 
                            className="rounded-full border border-neutral-700 object-cover" 
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-bold text-neutral-900 dark:text-white">{reply.user_name}</h5>
                              {reply.user_email && isAuthor(reply.user_email) ? (
                                <span className="px-1 py-0.2 text-[9px] font-semibold bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                                  {t.author}
                                </span>
                              ) : !reply.user_id ? (
                                <span className="px-1 py-0.2 text-[9px] font-semibold bg-neutral-500/10 text-neutral-400 rounded border border-neutral-500/20">
                                  {t.guestBadge}
                                </span>
                              ) : null}
                            </div>
                            <span className="text-[9px] text-neutral-500 font-mono">
                              {getRelativeTime(reply.created_at, t)}
                            </span>
                          </div>
                        </div>

                        {user && reply.user_id === user.id && (
                          <div className="flex items-center gap-2 text-neutral-400">
                            <button onClick={() => { setEditingId(reply.id); setEditContent(reply.content); }} className="hover:text-emerald-500 transition-colors cursor-pointer" title={t.edit}>
                              <FiEdit2 className="w-3 h-3" />
                            </button>
                            <button onClick={() => handleDelete(reply.id)} className="hover:text-red-500 transition-colors cursor-pointer" title={t.delete}>
                              <FiTrash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {editingId === reply.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs border border-neutral-700 focus:outline-none text-neutral-900 dark:text-neutral-100"
                          />
                          <div className="gap-2 flex justify-end">
                            <button onClick={() => setEditingId(null)} className="px-2.5 py-0.5 rounded bg-neutral-700 text-white text-[11px] cursor-pointer">{t.cancel}</button>
                            <button onClick={() => handleUpdate(reply.id)} className="px-2.5 py-0.5 rounded bg-emerald-500 text-black text-[11px] font-semibold cursor-pointer">{t.save}</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-700 dark:text-neutral-300">{reply.content}</p>
                      )}

                      <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
                        <button onClick={() => handleLikeComment(reply.id, reply.likes_count)} className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                          <FiHeart className={`w-3 h-3 ${likedComments[reply.id] ? "fill-current text-emerald-500" : ""}`} />
                          <span>{reply.likes_count}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}