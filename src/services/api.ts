// API service utility for making authenticated requests
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async makeRequest(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    return fetch(url, config);
  }

  // Auth-specific methods
  async login(email: string, password: string) {
    const response = await this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: string;
  }) {
    const response = await this.makeRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    return response.json();
  }

  async logout() {
    const response = await this.makeRequest('/api/auth/logout', {
      method: 'POST',
    });

    return response.json();
  }

  // Posts API methods
  async createPost(postData: {
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    tags?: string[];
    category?: string;
    status?: 'draft' | 'published';
    metaTitle?: string;
    metaDescription?: string;
  }) {
    const response = await this.makeRequest('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    return response.json();
  }

  async getPosts(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    category?: string;
    tags?: string;
    search?: string;
    author?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await this.makeRequest(
      `/api/posts?${queryParams.toString()}`,
    );
    return response.json();
  }

  async getPostById(postId: string) {
    const response = await this.makeRequest(`/api/posts/${postId}`);
    return response.json();
  }

  async updatePost(
    postId: string,
    postData: {
      title?: string;
      content?: string;
      excerpt?: string;
      featuredImage?: string;
      tags?: string[];
      category?: string;
      status?: 'draft' | 'published' | 'archived';
      metaTitle?: string;
      metaDescription?: string;
    },
  ) {
    const response = await this.makeRequest(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });

    return response.json();
  }

  async getPostBySlug(slug: string) {
    const response = await this.makeRequest(`/api/posts/slug/${slug}`);
    return response.json();
  }

  async updatePostStatus(postId: string, status: string) {
    const response = await this.makeRequest(`/api/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });

    return response.json();
  }

  async deletePost(postId: string) {
    const response = await this.makeRequest(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  // Comment methods
  async addComment(postId: string, content: string) {
    const response = await this.makeRequest(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    return response.json();
  }

  async deleteComment(postId: string, commentId: string) {
    const response = await this.makeRequest(
      `/api/posts/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
      },
    );

    return response.json();
  }
}

export const apiService = new ApiService();
