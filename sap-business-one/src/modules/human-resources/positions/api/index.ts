import { api } from '@/shared/api/apiClient'
import type { 
  Position, 
  PositionFormData, 
  PositionSearchParams,
  PositionSearchResponse,
  PositionStats,
  Department,
  Employee
} from '../types'

const BASE_URL = '/hr/positions'

export const positionAPI = {
  // Get all positions with filtering and pagination
  async getPositions(params?: PositionSearchParams): Promise<PositionSearchResponse> {
    const response = await api.get(`${BASE_URL}`, { params })
    return response.data
  },

  // Get a single position by ID
  async getPosition(id: string): Promise<Position> {
    const response = await api.get(`${BASE_URL}/${id}`)
    return response.data
  },

  // Create a new position
  async createPosition(data: PositionFormData): Promise<Position> {
    const response = await api.post(`${BASE_URL}`, data)
    return response.data
  },

  // Update a position
  async updatePosition(id: string, data: Partial<PositionFormData>): Promise<Position> {
    const response = await api.put(`${BASE_URL}/${id}`, data)
    return response.data
  },

  // Delete a position
  async deletePosition(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`)
  },

  // Activate/Deactivate position
  async updatePositionStatus(id: string, status: 'active' | 'inactive'): Promise<Position> {
    const response = await api.patch(`${BASE_URL}/${id}/status`, { status })
    return response.data
  },

  // Get position statistics
  async getPositionStats(): Promise<PositionStats> {
    const response = await api.get(`${BASE_URL}/stats`)
    return response.data
  },

  // Get departments for position form
  async getDepartments(): Promise<Department[]> {
    const response = await api.get('/hr/departments')
    return response.data
  },

  // Get employees for reporting structure
  async getEmployees(params?: { search?: string; limit?: number }): Promise<Employee[]> {
    const response = await api.get('/hr/employees', { params })
    return response.data
  },

  // Export positions
  async exportPositions(params: PositionSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  },

  // Clone position
  async clonePosition(id: string, data: { title: string; code: string }): Promise<Position> {
    const response = await api.post(`${BASE_URL}/${id}/clone`, data)
    return response.data
  },

  // Get position history/audit trail
  async getPositionHistory(id: string): Promise<any[]> {
    const response = await api.get(`${BASE_URL}/${id}/history`)
    return response.data
  }
}