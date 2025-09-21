import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { approvalsApi } from '../api/approvalsApi'
import type {
  ApprovalRule,
  ApprovalRuleFormData,
  ApprovalInstance,
  ApprovalAction,
  ApprovalFilters,
  ApprovalStats,
  ApprovalPagination,
  ApprovalHistory,
  User,
  ApprovableDocument
} from '../types'

export const useApprovalsStore = defineStore('approvals', () => {
  // State
  const approvalRules = ref<ApprovalRule[]>([])
  const approvalInstances = ref<ApprovalInstance[]>([])
  const users = ref<User[]>([])
  const approvalHistory = ref<ApprovalHistory[]>([])
  const stats = ref<ApprovalStats | null>(null)
  const pagination = ref<ApprovalPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const activeRules = computed(() =>
    approvalRules.value.filter(rule => rule.status === 'ACTIVE')
  )

  const pendingApprovals = computed(() =>
    approvalInstances.value.filter(instance => instance.status === 'PENDING_APPROVAL')
  )

  const myPendingApprovals = computed(() => {
    // This would filter based on current user ID
    const currentUserId = 'current-user-id' // Get from auth store
    return approvalInstances.value.filter(instance =>
      instance.status === 'PENDING_APPROVAL' &&
      instance.approvals.some(approval =>
        approval.approverId === currentUserId && approval.status === 'PENDING'
      )
    )
  })

  // Actions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  // Approval Rules
  const fetchApprovalRules = async (filters?: ApprovalFilters, paginationParams?: { page: number; limit: number }) => {
    try {
      setLoading(true)
      clearError()

      const response = await approvalsApi.getApprovalRules(filters, paginationParams)

      approvalRules.value = response.data
      pagination.value = response.pagination

    } catch (err) {
      console.error('Error fetching approval rules:', err)
      setError('Failed to fetch approval rules')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchApprovalRule = async (id: string): Promise<ApprovalRule> => {
    try {
      setLoading(true)
      clearError()

      const rule = await approvalsApi.getApprovalRule(id)

      // Update the rule in the store if it exists
      const index = approvalRules.value.findIndex(r => r.id === id)
      if (index !== -1) {
        approvalRules.value[index] = rule
      }

      return rule
    } catch (err) {
      console.error('Error fetching approval rule:', err)
      setError('Failed to fetch approval rule')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createApprovalRule = async (data: ApprovalRuleFormData): Promise<ApprovalRule> => {
    try {
      setLoading(true)
      clearError()

      const newRule = await approvalsApi.createApprovalRule(data)

      approvalRules.value.unshift(newRule)

      return newRule
    } catch (err) {
      console.error('Error creating approval rule:', err)
      setError('Failed to create approval rule')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateApprovalRule = async (id: string, data: ApprovalRuleFormData): Promise<ApprovalRule> => {
    try {
      setLoading(true)
      clearError()

      const updatedRule = await approvalsApi.updateApprovalRule(id, data)

      const index = approvalRules.value.findIndex(rule => rule.id === id)
      if (index !== -1) {
        approvalRules.value[index] = updatedRule
      }

      return updatedRule
    } catch (err) {
      console.error('Error updating approval rule:', err)
      setError('Failed to update approval rule')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteApprovalRule = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      clearError()

      await approvalsApi.deleteApprovalRule(id)

      const index = approvalRules.value.findIndex(rule => rule.id === id)
      if (index !== -1) {
        approvalRules.value.splice(index, 1)
      }

    } catch (err) {
      console.error('Error deleting approval rule:', err)
      setError('Failed to delete approval rule')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Approval Instances
  const fetchApprovalInstances = async (filters?: { status?: string; department?: string }) => {
    try {
      setLoading(true)
      clearError()

      const instances = await approvalsApi.getApprovalInstances(filters)
      approvalInstances.value = instances

    } catch (err) {
      console.error('Error fetching approval instances:', err)
      setError('Failed to fetch approval instances')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchApprovalInstance = async (id: string): Promise<ApprovalInstance> => {
    try {
      setLoading(true)
      clearError()

      const instance = await approvalsApi.getApprovalInstance(id)

      // Update the instance in the store if it exists
      const index = approvalInstances.value.findIndex(i => i.id === id)
      if (index !== -1) {
        approvalInstances.value[index] = instance
      }

      return instance
    } catch (err) {
      console.error('Error fetching approval instance:', err)
      setError('Failed to fetch approval instance')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createApprovalInstance = async (document: ApprovableDocument): Promise<ApprovalInstance> => {
    try {
      setLoading(true)
      clearError()

      const instance = await approvalsApi.createApprovalInstance(document)
      approvalInstances.value.unshift(instance)

      return instance
    } catch (err) {
      console.error('Error creating approval instance:', err)
      setError('Failed to create approval instance')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const processApproval = async (instanceId: string, action: ApprovalAction): Promise<ApprovalInstance> => {
    try {
      setLoading(true)
      clearError()

      const updatedInstance = await approvalsApi.processApproval(instanceId, action)

      const index = approvalInstances.value.findIndex(instance => instance.id === instanceId)
      if (index !== -1) {
        approvalInstances.value[index] = updatedInstance
      }

      return updatedInstance
    } catch (err) {
      console.error('Error processing approval:', err)
      setError('Failed to process approval')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Approval History
  const fetchApprovalHistory = async (documentId: string) => {
    try {
      setLoading(true)
      clearError()

      const history = await approvalsApi.getApprovalHistory(documentId)
      approvalHistory.value = history

    } catch (err) {
      console.error('Error fetching approval history:', err)
      setError('Failed to fetch approval history')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Statistics
  const fetchStats = async () => {
    try {
      setLoading(true)
      clearError()

      const statistics = await approvalsApi.getApprovalStats()
      stats.value = statistics

    } catch (err) {
      console.error('Error fetching approval stats:', err)
      setError('Failed to fetch approval statistics')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Users
  const fetchUsers = async (department?: string) => {
    try {
      const userList = await approvalsApi.getUsers(department)
      users.value = userList
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to fetch users')
      throw err
    }
  }

  // Utility functions
  const findApprovalRule = async (document: ApprovableDocument): Promise<ApprovalRule | null> => {
    try {
      return await approvalsApi.findApprovalRule(document)
    } catch (err) {
      console.error('Error finding approval rule:', err)
      return null
    }
  }

  const resetStore = () => {
    approvalRules.value = []
    approvalInstances.value = []
    users.value = []
    approvalHistory.value = []
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: false
    }
    loading.value = false
    error.value = null
  }

  return {
    // State
    approvalRules,
    approvalInstances,
    users,
    approvalHistory,
    stats,
    pagination,
    loading,
    error,

    // Computed
    activeRules,
    pendingApprovals,
    myPendingApprovals,

    // Actions
    setLoading,
    setError,
    clearError,
    fetchApprovalRules,
    fetchApprovalRule,
    createApprovalRule,
    updateApprovalRule,
    deleteApprovalRule,
    fetchApprovalInstances,
    fetchApprovalInstance,
    createApprovalInstance,
    processApproval,
    fetchApprovalHistory,
    fetchStats,
    fetchUsers,
    findApprovalRule,
    resetStore
  }
})