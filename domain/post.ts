export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  category?: string;
  cover?: string;
  tags?: string[];
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  thumbnail?: string;
  tags: string[];
}

export interface Post extends PostSummary {
  content: string;
}
