import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, User, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = '/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { data } = response.data as AuthResponse;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  register: (fullName: string, email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { fullName, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  getCurrentUser: () => api.get<ApiResponse<User>>('/auth/me'),

  logout: (refreshToken: string) =>
    api.post('/auth/revoke', { refreshToken }),
};

export const productService = {
  getProducts: (
    pageNumber = 1,
    pageSize = 12,
    search = '',
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number
  ) =>
    api.get<PaginatedResponse<any>>('/products', {
      params: {
        pageNumber,
        pageSize,
        search,
        categoryId,
        minPrice,
        maxPrice,
        isActive: true,
      },
    }),

  getProductById: (id: number) => api.get(`/products/${id}`),

  createProduct: (product: any) => api.post('/products', product),

  updateProduct: (id: number, product: any) =>
    api.put(`/products/${id}`, product),

  deleteProduct: (id: number) => api.delete(`/products/${id}`),

  uploadProductImage: (productId: number, formData: FormData) =>
    api.post(`/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const categoryService = {
  getCategories: () => api.get('/categories'),

  getCategoryById: (id: number) => api.get(`/categories/${id}`),

  createCategory: (category: any) => api.post('/categories', category),

  updateCategory: (id: number, category: any) =>
    api.put(`/categories/${id}`, category),

  deleteCategory: (id: number) => api.delete(`/categories/${id}`),
};

export const orderService = {
  getOrders: (pageNumber = 1, pageSize = 10) =>
    api.get<PaginatedResponse<any>>('/orders', {
      params: { pageNumber, pageSize },
    }),

  getOrderById: (id: number) => api.get(`/orders/${id}`),

  createOrder: (order: any) => api.post('/orders', order),

  updateOrderStatus: (id: number, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

export default api;
