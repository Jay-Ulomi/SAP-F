import { apiClient } from '@/shared/api/apiClient'
import type {
  JournalEntry,
  JournalEntryFormData,
  JournalEntryFilters,
  JournalEntryListResponse,
  JournalEntryValidationResult,
  AccountBalance,
  JournalEntryStatus,
  JournalEntryType,
} from '../types'

const BASE_PATH = '/api/financials/journal-entries'

export const journalEntriesApi = {
  // Get list of journal entries with pagination and filters
  async getJournalEntries(
    page: number = 1,
    pageSize: number = 20,
    filters?: JournalEntryFilters,
  ): Promise<JournalEntryListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      ...(filters?.dateTo && { dateTo: filters.dateTo }),
      ...(filters?.isPosted !== undefined && { isPosted: filters.isPosted.toString() }),
    })

    const response = await apiClient.get(`${BASE_PATH}?${params}`)
    return response.data
  },

  // Get single journal entry by ID
  async getJournalEntry(id: string): Promise<JournalEntry> {
    const response = await apiClient.get(`${BASE_PATH}/${id}`)
    return response.data
  },

  // Create new journal entry
  async createJournalEntry(data: JournalEntryFormData): Promise<JournalEntry> {
    const response = await apiClient.post(BASE_PATH, data)
    return response.data
  },

  // Update existing journal entry
  async updateJournalEntry(id: string, data: Partial<JournalEntryFormData>): Promise<JournalEntry> {
    const response = await apiClient.put(`${BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete journal entry
  async deleteJournalEntry(id: string): Promise<void> {
    await apiClient.delete(`${BASE_PATH}/${id}`)
  },

  // Post journal entry
  async postJournalEntry(id: string): Promise<JournalEntry> {
    const response = await apiClient.post(`${BASE_PATH}/${id}/post`)
    return response.data
  },

  // Void journal entry
  async voidJournalEntry(id: string, reason: string): Promise<JournalEntry> {
    const response = await apiClient.post(`${BASE_PATH}/${id}/void`, { reason })
    return response.data
  },

  // Validate journal entry
  async validateJournalEntry(data: JournalEntryFormData): Promise<JournalEntryValidationResult> {
    const response = await apiClient.post(`${BASE_PATH}/validate`, data)
    return response.data
  },

  // Get account balances for posting
  async getAccountBalances(accountIds: string[]): Promise<AccountBalance[]> {
    const response = await apiClient.post(`${BASE_PATH}/account-balances`, { accountIds })
    return response.data
  },

  // Get journal entry types
  async getJournalEntryTypes(): Promise<string[]> {
    const response = await apiClient.get(`${BASE_PATH}/types`)
    return response.data
  },

  // Get journal entry statuses
  async getJournalEntryStatuses(): Promise<string[]> {
    const response = await apiClient.get(`${BASE_PATH}/statuses`)
    return response.data
  },

  // Get next entry number
  async getNextEntryNumber(): Promise<string> {
    const response = await apiClient.get(`${BASE_PATH}/next-entry-number`)
    return response.data.entryNumber
  },

  // Copy journal entry
  async copyJournalEntry(id: string): Promise<JournalEntry> {
    const response = await apiClient.post(`${BASE_PATH}/${id}/copy`)
    return response.data
  },

  // Get journal entry statistics
  async getJournalEntryStats(filters?: JournalEntryFilters): Promise<{
    totalEntries: number
    totalDebit: number
    totalCredit: number
    postedEntries: number
    draftEntries: number
    pendingApproval: number
  }> {
    const params = new URLSearchParams()
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.type) params.append('type', filters.type)

    const response = await apiClient.get(`${BASE_PATH}/stats?${params}`)
    return response.data
  },
}
