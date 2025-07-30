import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { useAuth } from '@/hooks/useAuth'

/**
 * API Error Response interface
 */
interface ApiErrorResponse {
  message: string
  code?: string
  details?: Record<string, unknown>
}

/**
 * Create axios instance with base configuration
 * Following Google Cloud API design standards
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor to add authentication token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuth.getState().token

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log requests in development (only when debug flag is set)
    if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_API) {
      console.warn(`[API] ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor for error handling and auth refresh
 */
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Clear auth state and redirect to login
      const { logout } = useAuth.getState()
      await logout()

      // Reject with a user-friendly message
      return Promise.reject(new Error('Session expired. Please login again.'))
    }

    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: originalRequest?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      })
    }

    // Extract error message
    const errorMessage =
      error.response?.data?.message || error.message || 'An unexpected error occurred'

    return Promise.reject(new Error(errorMessage))
  },
)

/**
 * Type-safe API request wrapper
 * @template T - Response data type
 * @template D - Request data type
 */
export async function apiRequest<T = unknown, D = unknown>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: D,
  config?: InternalAxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.request<T>({
    method,
    url,
    data,
    ...config,
  })
  return response.data
}

// Export convenience methods
export const api = {
  get: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('get', url, undefined, config),

  post: <T = unknown, D = unknown>(url: string, data?: D, config?: InternalAxiosRequestConfig) =>
    apiRequest<T, D>('post', url, data, config),

  put: <T = unknown, D = unknown>(url: string, data?: D, config?: InternalAxiosRequestConfig) =>
    apiRequest<T, D>('put', url, data, config),

  patch: <T = unknown, D = unknown>(url: string, data?: D, config?: InternalAxiosRequestConfig) =>
    apiRequest<T, D>('patch', url, data, config),

  delete: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('delete', url, undefined, config),
}
