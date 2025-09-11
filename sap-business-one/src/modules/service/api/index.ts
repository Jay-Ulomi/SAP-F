import { api } from '@/shared/api/apiClient'
import type {
  ServiceContract,
  ServiceContractFormData,
  Equipment,
  EquipmentFormData,
  ServiceCall,
  ServiceCallFormData,
  ServiceSearchParams,
  ServiceSearchResponse,
  ServiceStats,
  ResponseTimeMetric
} from '../types'

const BASE_URL = '/service'

export const serviceAPI = {
  // Service Contracts
  async getContracts(params?: ServiceSearchParams): Promise<ServiceSearchResponse<ServiceContract>> {
    return api.get<ServiceSearchResponse<ServiceContract>>(`${BASE_URL}/contracts`, { params })
  },

  async getContract(id: string): Promise<ServiceContract> {
    return api.get<ServiceContract>(`${BASE_URL}/contracts/${id}`)
  },

  async createContract(data: ServiceContractFormData): Promise<ServiceContract> {
    return api.post<ServiceContract>(`${BASE_URL}/contracts`, data)
  },

  async updateContract(id: string, data: Partial<ServiceContractFormData>): Promise<ServiceContract> {
    return api.put<ServiceContract>(`${BASE_URL}/contracts/${id}`, data)
  },

  async deleteContract(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/contracts/${id}`)
  },

  async renewContract(id: string): Promise<ServiceContract> {
    return api.patch<ServiceContract>(`${BASE_URL}/contracts/${id}/renew`)
  },

  // Equipment
  async getEquipment(params?: ServiceSearchParams): Promise<ServiceSearchResponse<Equipment>> {
    return api.get<ServiceSearchResponse<Equipment>>(`${BASE_URL}/equipment`, { params })
  },

  async getEquipmentById(id: string): Promise<Equipment> {
    return api.get<Equipment>(`${BASE_URL}/equipment/${id}`)
  },

  async createEquipment(data: EquipmentFormData): Promise<Equipment> {
    return api.post<Equipment>(`${BASE_URL}/equipment`, data)
  },

  async updateEquipment(id: string, data: Partial<EquipmentFormData>): Promise<Equipment> {
    return api.put<Equipment>(`${BASE_URL}/equipment/${id}`, data)
  },

  async deleteEquipment(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/equipment/${id}`)
  },

  // Service Calls
  async getServiceCalls(params?: ServiceSearchParams): Promise<ServiceSearchResponse<ServiceCall>> {
    return api.get<ServiceSearchResponse<ServiceCall>>(`${BASE_URL}/calls`, { params })
  },

  async getServiceCall(id: string): Promise<ServiceCall> {
    return api.get<ServiceCall>(`${BASE_URL}/calls/${id}`)
  },

  async createServiceCall(data: ServiceCallFormData): Promise<ServiceCall> {
    return api.post<ServiceCall>(`${BASE_URL}/calls`, data)
  },

  async updateServiceCall(id: string, data: Partial<ServiceCallFormData>): Promise<ServiceCall> {
    return api.put<ServiceCall>(`${BASE_URL}/calls/${id}`, data)
  },

  async deleteServiceCall(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/calls/${id}`)
  },

  async assignServiceCall(id: string, technicianId: string): Promise<ServiceCall> {
    return api.patch<ServiceCall>(`${BASE_URL}/calls/${id}/assign`, { technicianId })
  },

  async updateServiceCallStatus(id: string, status: string, resolution?: string): Promise<ServiceCall> {
    return api.patch<ServiceCall>(`${BASE_URL}/calls/${id}/status`, { status, resolution })
  },

  // Response Time Metrics
  async getResponseTimeMetrics(period: string): Promise<ResponseTimeMetric> {
    return api.get<ResponseTimeMetric>(`${BASE_URL}/metrics/response-time`, { params: { period } })
  },

  // Statistics
  async getServiceStats(): Promise<ServiceStats> {
    return api.get<ServiceStats>(`${BASE_URL}/stats`)
  },

  // Export
  async exportServiceCalls(params: ServiceSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    return api.get<Blob>(`${BASE_URL}/calls/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
  },

  // Upload attachment
  async uploadAttachment(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    return api.post<{ url: string }>(`${BASE_URL}/attachments/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}