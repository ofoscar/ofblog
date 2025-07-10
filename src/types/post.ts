export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
}

export interface Comment {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Like {
  user: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  author: User;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  views: number;
  likes: Like[];
  comments: Comment[];
  metaTitle?: string;
  metaDescription?: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
}

export interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}
