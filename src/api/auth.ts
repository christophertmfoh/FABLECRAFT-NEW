import { type User } from '@/hooks/useAuth'

import { api } from './client'

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Signup data interface
 */
export interface SignupData {
  email: string
  password: string
  username: string
  fullName?: string
}

/**
 * Auth response interface
 */
export interface AuthResponse {
  user: User
  token: string
  message?: string
}

/**
 * Auth Service
 * Handles all authentication-related API calls
 * Following OAuth 2.0 patterns adapted for JWT
 */
export const authService = {
  /**
   * Login user with credentials
   * @param credentials - Email and password
   * @returns User data and authentication token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/login', credentials)
  },

  /**
   * Register new user
   * @param userData - Registration data
   * @returns User data and authentication token
   */
  async signup(userData: SignupData): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/signup', userData)
  },

  /**
   * Logout current user
   * Notifies server to invalidate token
   */
  async logout(): Promise<void> {
    return api.post('/auth/logout')
  },

  /**
   * Get current authenticated user
   * @returns Current user data
   */
  async getCurrentUser(): Promise<{ user: User }> {
    return api.get<{ user: User }>('/auth/me')
  },

  /**
   * Refresh authentication token
   * @returns New authentication token
   */
  async refreshToken(): Promise<{ token: string }> {
    return api.post<{ token: string }>('/auth/refresh')
  },

  /**
   * Request password reset
   * @param email - User's email address
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/password-reset', { email })
  },

  /**
   * Reset password with token
   * @param token - Reset token from email
   * @param newPassword - New password
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/password-reset/confirm', {
      token,
      newPassword,
    })
  },
}
