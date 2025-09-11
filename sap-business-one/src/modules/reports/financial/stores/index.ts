import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FinancialReport, FinancialReportFormData, FinancialSearchParams, FinancialStats, Account } from '../types'
import { financialReportsApi } from '../api'

export const useFinancialReportsStore = defineStore('financialReports', () => {
  // State
  const reports = ref<FinancialReport[]>([])
  const currentReport = ref<FinancialReport | null>(null)
  const accounts = ref<Account[]>([])
  const stats = ref<FinancialStats | null>(null)
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  
  const searchParams = ref<FinancialSearchParams>({})

  // Getters
  const filteredReports = computed(() => {
    let filtered = reports.value
    
    if (searchParams.value.search) {
      const search = searchParams.value.search.toLowerCase()
      filtered = filtered.filter(report => 
        report.name.toLowerCase().includes(search) ||
        report.description?.toLowerCase().includes(search)
      )
    }
    
    if (searchParams.value.reportType) {
      filtered = filtered.filter(report => report.type === searchParams.value.reportType)
    }
    
    if (searchParams.value.status) {
      filtered = filtered.filter(report => report.status === searchParams.value.status)
    }
    
    return filtered
  })

  // Actions
  const loadReports = async (params?: FinancialSearchParams & { page?: number }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await financialReportsApi.getReports({
        ...searchParams.value,
        ...params,
        page: params?.page || pagination.value.page,
        limit: pagination.value.limit
      })
      
      reports.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reports'
      console.error('Error loading reports:', err)
    } finally {
      loading.value = false
    }
  }

  const loadReport = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      currentReport.value = await financialReportsApi.getReport(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load report'
      console.error('Error loading report:', err)
    } finally {
      loading.value = false
    }
  }

  const createReport = async (data: FinancialReportFormData) => {
    loading.value = true
    error.value = null
    
    try {
      const newReport = await financialReportsApi.createReport(data)
      reports.value.unshift(newReport)
      return newReport
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create report'
      console.error('Error creating report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReport = async (id: string, data: FinancialReportFormData) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedReport = await financialReportsApi.updateReport(id, data)
      const index = reports.value.findIndex(r => r.id === id)
      if (index !== -1) {
        reports.value[index] = updatedReport
      }
      if (currentReport.value?.id === id) {
        currentReport.value = updatedReport
      }
      return updatedReport
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update report'
      console.error('Error updating report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteReport = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      await financialReportsApi.deleteReport(id)
      reports.value = reports.value.filter(r => r.id !== id)
      if (currentReport.value?.id === id) {
        currentReport.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete report'
      console.error('Error deleting report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const exportReport = async (id: string, format: 'pdf' | 'excel' | 'csv' = 'pdf') => {
    try {
      const blob = await financialReportsApi.exportReport(id, format)
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      const report = reports.value.find(r => r.id === id)
      const filename = `${report?.name || 'financial-report'}.${format === 'excel' ? 'xlsx' : format}`
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to export report'
      console.error('Error exporting report:', err)
      throw err
    }
  }

  const loadStats = async () => {
    try {
      stats.value = await financialReportsApi.getStats()
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  const loadAccounts = async () => {
    try {
      accounts.value = await financialReportsApi.getAccounts()
    } catch (err) {
      console.error('Error loading accounts:', err)
    }
  }

  // Pagination
  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page++
      loadReports()
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page--
      loadReports()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadReports()
    }
  }

  // Filters
  const setFilters = (filters: FinancialSearchParams) => {
    searchParams.value = { ...filters }
    pagination.value.page = 1 // Reset to first page
    loadReports()
  }

  const clearFilters = () => {
    searchParams.value = {}
    pagination.value.page = 1
    loadReports()
  }

  // Reset state
  const resetState = () => {
    reports.value = []
    currentReport.value = null
    stats.value = null
    accounts.value = []
    loading.value = false
    error.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
    searchParams.value = {}
  }

  return {
    // State
    reports,
    currentReport,
    accounts,
    stats,
    loading,
    error,
    pagination,
    searchParams,
    
    // Getters
    filteredReports,
    
    // Actions
    loadReports,
    loadReport,
    createReport,
    updateReport,
    deleteReport,
    exportReport,
    loadStats,
    loadAccounts,
    
    // Pagination
    nextPage,
    previousPage,
    goToPage,
    
    // Filters
    setFilters,
    clearFilters,
    
    // Utilities
    resetState
  }
})