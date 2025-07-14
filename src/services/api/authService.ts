import { API_ENDPOINTS, apiRequest } from '../../config/api';
import type { AuthResponse } from '../../types/index';

export const authService = {
  // Login user
  async login(credentials: any): Promise<AuthResponse> {
    const response = await apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  // Register user
  async register(userData: any): Promise<AuthResponse> {
    const response = await apiRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await apiRequest(API_ENDPOINTS.ME);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return { success: false, message: 'Failed to get current user' };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // Reset password with token
  async resetPassword(token: string, password: string) {
    return await apiRequest(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  // Direct reset password (from profile, with email)
  async directResetPassword(correo: string, password: string) {
    return await apiRequest(API_ENDPOINTS.DIRECT_RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ correo, password }),
    });
  },
}; 