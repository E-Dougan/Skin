import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  email: string;
  name?: string;
  skin_type?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  skin_types?: string;
  ingredients?: string;
  image_url?: string;
}

export interface AnalysisResult {
  skin_type: string;
  concerns: string[];
  recommendations: string[];
}

export interface Routine {
  id: number;
  name: string;
  steps: string[];
  frequency: string;
  completed_steps?: string[];
}

// Auth API
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  getCurrentUser: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id: number) => api.get(`/products/${id}`),
  getRecommendations: (skinType: string) => api.get(`/products/recommend/${skinType}`),
  purchase: (id: number, quantity: number, paymentMethod: string) =>
    api.post(`/products/${id}/purchase`, { quantity, paymentMethod }),
};

// Analysis API
export const analysisAPI = {
  analyzeImage: (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/analysis/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getHistory: () => api.get('/analysis/history'),
  quickAssessment: (answers: any) => api.post('/analysis/quick-assessment', { answers }),
};

// Users API
export const usersAPI = {
  updateProfile: (data: Partial<User>) => api.put('/users/profile', data),
  getProfile: () => api.get('/users/profile'),
};

// Routines API
export const routinesAPI = {
  getAll: () => api.get('/routines'),
  create: (routine: Omit<Routine, 'id'>) => api.post('/routines', routine),
  updateProgress: (id: number, completedSteps: string[]) =>
    api.put(`/routines/${id}/progress`, { completed_steps: completedSteps }),
  delete: (id: number) => api.delete(`/routines/${id}`),
};
export const checkoutAPI = {
  createSession: (productId: number, quantity: number) =>
    api.post('/products/checkout', { productId, quantity }),
};
export default api;