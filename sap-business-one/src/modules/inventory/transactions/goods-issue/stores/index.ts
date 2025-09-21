import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { goodsIssueApi } from '../api'
import type {
  GoodsIssue,
  GoodsIssueFormData,
  GoodsIssueFilters,
  GoodsIssueStats,
  GoodsIssuePagination
} from '../types'
import { IssueStatus } from '../types'

export const useGoodsIssueStore = defineStore('goodsIssue', () => {
  // State
  const issues = ref<GoodsIssue[]>([])
  const currentIssue = ref<GoodsIssue | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<GoodsIssueStats | null>(null)
  const pagination = ref<GoodsIssuePagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<GoodsIssueFilters>({})

  // Computed properties
  const issuesByStatus = computed(() => {
    const grouped: Record<IssueStatus, GoodsIssue[]> = {
      [IssueStatus.DRAFT]: [],
      [IssueStatus.PENDING]: [],
      [IssueStatus.ISSUED]: [],
      [IssueStatus.CANCELLED]: []
    }

    issues.value.forEach(issue => {
      if (issue.status) {
        grouped[issue.status].push(issue)
      }
    })

    return grouped
  })

  const issuedGoods = computed(() =>
    issues.value.filter(issue => issue.status === IssueStatus.ISSUED)
  )

  const pendingIssues = computed(() =>
    issues.value.filter(issue => issue.status === IssueStatus.PENDING)
  )

  const draftIssues = computed(() =>
    issues.value.filter(issue => issue.status === IssueStatus.DRAFT)
  )

  const totalValue = computed(() =>
    issues.value.reduce((sum, issue) => sum + issue.totalAmount, 0)
  )

  // Actions
  const loadIssues = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await goodsIssueApi.getIssues(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )

      issues.value = result.issues
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load issues'
      console.error('Error loading issues:', err)
    } finally {
      loading.value = false
    }
  }

  const loadIssueById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const issue = await goodsIssueApi.getIssueById(id)
      currentIssue.value = issue

      return issue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load issue'
      console.error('Error loading issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createIssue = async (data: GoodsIssueFormData) => {
    try {
      loading.value = true
      error.value = null

      const newIssue = await goodsIssueApi.createIssue(data)
      issues.value.unshift(newIssue)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create issue'
      console.error('Error creating issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateIssue = async (id: string, data: Partial<GoodsIssueFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedIssue = await goodsIssueApi.updateIssue(id, data)

      const index = issues.value.findIndex(i => i.id === parseInt(id))
      if (index !== -1) {
        issues.value[index] = updatedIssue
      }

      if (currentIssue.value?.id === parseInt(id)) {
        currentIssue.value = updatedIssue
      }

      return updatedIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update issue'
      console.error('Error updating issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteIssue = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await goodsIssueApi.deleteIssue(id)

      const index = issues.value.findIndex(i => i.id === parseInt(id))
      if (index !== -1) {
        issues.value.splice(index, 1)
      }

      if (currentIssue.value?.id === parseInt(id)) {
        currentIssue.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete issue'
      console.error('Error deleting issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadIssueStats = async () => {
    try {
      loading.value = true
      error.value = null

      const issueStats = await goodsIssueApi.getIssueStats()
      stats.value = issueStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load issue statistics'
      console.error('Error loading issue statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const completeIssue = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const completedIssue = await goodsIssueApi.completeIssue(id)

      const index = issues.value.findIndex(i => i.id === parseInt(id))
      if (index !== -1) {
        issues.value[index] = completedIssue
      }

      if (currentIssue.value?.id === parseInt(id)) {
        currentIssue.value = completedIssue
      }

      return completedIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete issue'
      console.error('Error completing issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelIssue = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledIssue = await goodsIssueApi.cancelIssue(id)

      const index = issues.value.findIndex(i => i.id === parseInt(id))
      if (index !== -1) {
        issues.value[index] = cancelledIssue
      }

      if (currentIssue.value?.id === parseInt(id)) {
        currentIssue.value = cancelledIssue
      }

      return cancelledIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel issue'
      console.error('Error cancelling issue:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadIssues()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadIssues()
    }
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadIssues()
    }
  }

  // Filter actions
  const setFilters = (newFilters: GoodsIssueFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadIssues()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadIssues()
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    issues,
    currentIssue,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    issuesByStatus,
    issuedGoods,
    pendingIssues,
    draftIssues,
    totalValue,

    // Actions
    loadIssues,
    loadIssueById,
    createIssue,
    updateIssue,
    deleteIssue,
    loadIssueStats,
    completeIssue,
    cancelIssue,

    // Pagination
    nextPage,
    previousPage,
    setPage,

    // Filters
    setFilters,
    clearFilters,

    // Utils
    clearError
  }
})