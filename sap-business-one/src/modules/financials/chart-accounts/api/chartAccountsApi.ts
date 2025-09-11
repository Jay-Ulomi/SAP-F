import { apiClient } from '@/shared/api/apiClient'
import type {
  ChartAccount,
  ChartAccountFormData,
  ChartAccountFilters,
  ChartAccountListResponse,
} from '../types'

const BASE_PATH = '/api/financials/chart-accounts'

export const chartAccountsApi = {
  // Get list of chart accounts with pagination and filters
  async getChartAccounts(
    page: number = 1,
    pageSize: number = 20,
    filters?: ChartAccountFilters,
  ): Promise<ChartAccountListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.accountType && { accountType: filters.accountType }),
      ...(filters?.isActive !== undefined && { isActive: filters.isActive.toString() }),
      ...(filters?.level && { level: filters.level.toString() }),
    })

    const response = await apiClient.get(`${BASE_PATH}?${params}`)
    return response.data
  },

  // Get single chart account by ID
  async getChartAccount(id: string): Promise<ChartAccount> {
    const response = await apiClient.get(`${BASE_PATH}/${id}`)
    return response.data
  },

  // Create new chart account
  async createChartAccount(data: ChartAccountFormData): Promise<ChartAccount> {
    const response = await apiClient.post(BASE_PATH, data)
    return response.data
  },

  // Update existing chart account
  async updateChartAccount(id: string, data: Partial<ChartAccountFormData>): Promise<ChartAccount> {
    const response = await apiClient.put(`${BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete chart account
  async deleteChartAccount(id: string): Promise<void> {
    await apiClient.delete(`${BASE_PATH}/${id}`)
  },

  // Get account types for dropdown
  async getAccountTypes(): Promise<string[]> {
    const response = await apiClient.get(`${BASE_PATH}/account-types`)
    return response.data
  },

  // Get parent accounts for hierarchical structure
  async getParentAccounts(): Promise<ChartAccount[]> {
    const response = await apiClient.get(`${BASE_PATH}/parent-accounts`)
    return response.data
  },

  // Validate account code uniqueness
  async validateAccountCode(accountCode: string, excludeId?: string): Promise<boolean> {
    const params = new URLSearchParams({ accountCode })
    if (excludeId) params.append('excludeId', excludeId)

    const response = await apiClient.get(`${BASE_PATH}/validate-account-code?${params}`)
    return response.data.isValid
  },
}
