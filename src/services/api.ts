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

  async logout() {
    const response = await this.makeRequest('/api/auth/logout', {
      method: 'POST',
    });

    return response.json();
  }

  // Future API methods can be added here
  // async getPosts() { ... }
  // async createPost(data) { ... }
  // etc.
}

export const apiService = new ApiService();
