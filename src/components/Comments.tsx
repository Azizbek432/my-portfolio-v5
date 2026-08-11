"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types";
import { FiMessageSquare, FiCornerDownRight } from "react-icons/fi";

export default function Comments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: true });

      if (!error && data && isMounted) {
        const parentComments = data.filter((c) => !c.parent_id);
        const formatted = parentComments.map((parent) => ({
          ...parent,
          replies: data.filter((child) => child.parent_id === parent.id),
        }));
        setComments(formatted);
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert([
      {
        post_slug: postSlug,
        user_name: name,
        content: content,
        parent_id: replyTo,
      },
    ]);

    setLoading(false);
    if (!error) {
      setContent("");
      setReplyTo(null);

      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: true });

      if (data) {
        const parentComments = data.filter((c) => !c.parent_id);
        const formatted = parentComments.map((parent) => ({
          ...parent,
          replies: data.filter((child) => child.parent_id === parent.id),
        }));
        setComments(formatted);
      }
    }
  }

  return (
    <div className="space-y-8 pt-10 border-t border-neutral-800">
      <div className="flex items-center gap-2 text-lg font-semibold text-white">
        <FiMessageSquare className="w-5 h-5 text-emerald-400" />
        <span>Comments ({comments.length})</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/40 p-4 rounded-xl border border-neutral-800">
        {replyTo && (
          <div className="text-xs text-emerald-400 flex justify-between items-center bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
            <span>Replying to comment...</span>
            <button type="button" onClick={() => setReplyTo(null)} className="text-neutral-400 hover:text-white">✕</button>
          </div>
        )}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-neutral-700"
          required
        />
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700 min-h-[90px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <div className="bg-neutral-900/30 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-200">{comment.user_name}</span>
                <span className="text-neutral-500">{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{comment.content}</p>
              <button
                onClick={() => setReplyTo(comment.id)}
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-emerald-400 transition-colors pt-1"
              >
                <FiCornerDownRight className="w-3 h-3" /> Reply
              </button>
            </div>

            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-6 space-y-3 border-l-2 border-neutral-800 ml-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-neutral-900/20 p-3.5 rounded-xl border border-neutral-800/50 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-300">{reply.user_name}</span>
                      <span className="text-neutral-500">{new Date(reply.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-neutral-400">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}