import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_TIMEOUT = 30000 // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response
    console.log(`API Request completed:`, response.config.url)

    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          // Forbidden - show access denied message
          console.error('Access denied:', error.response.data)
          break
        case 404:
          // Not found
          console.error('Resource not found:', error.response.data)
          break
        case 422:
          // Validation error
          console.error('Validation error:', error.response.data)
          break
        case 500:
          // Server error
          console.error('Server error:', error.response.data)
          break
        default:
          console.error('API Error:', error.response.data)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error: No response received')
    } else {
      // Something else happened
      console.error('Request error:', error.message)
    }

    return Promise.reject(error)
  },
)

// Generic API methods
export const api = {
  // GET request
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then((response) => response.data)
  },

  // POST request
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post(url, data, config).then((response) => response.data)
  },

  // PUT request
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put(url, data, config).then((response) => response.data)
  },

  // PATCH request
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch(url, data, config).then((response) => response.data)
  },

  // DELETE request
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete(url, config).then((response) => response.data)
  },

  // Upload file
  upload: <T = unknown>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<T> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        },
      })
      .then((response) => response.data)
  },

  // Download file
  download: (url: string, filename?: string): Promise<void> => {
    return apiClient
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => {
        const blob = new Blob([response.data])
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      })
  },
}

// Export the axios instance for custom configurations
export { apiClient }

// Export types
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}
