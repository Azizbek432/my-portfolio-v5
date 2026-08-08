export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  cover_image?: string;
  published_at: string;
  views_count: number;
  likes_count: number;
}

export interface Comment {
  id: string;
  post_slug: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  parent_id?: string | null;
  created_at: string;
  replies?: Comment[];
}