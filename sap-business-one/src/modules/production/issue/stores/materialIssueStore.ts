import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  MaterialIssue, 
  MaterialIssueFormData, 
  MaterialIssueSearchParams,
  MaterialIssueStats 
} from '../types'
import { materialIssueAPI } from '../api'

export const useMaterialIssueStore = defineStore('materialIssue', () => {
  const issues = ref<MaterialIssue[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<MaterialIssueStats | null>(null)
  const currentIssue = ref<MaterialIssue | null>(null)

  // Actions
  async function fetchIssues(params?: MaterialIssueSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await materialIssueAPI.getIssues(params)
      issues.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch issues'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchIssue(id: string): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const issue = await materialIssueAPI.getIssue(id)
      currentIssue.value = issue
      
      // Update the issue in the list if it exists
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value[index] = issue
      }
      
      return issue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<MaterialIssueStats> {
    try {
      const issueStats = await materialIssueAPI.getIssueStats()
      stats.value = issueStats
      return issueStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function createIssue(data: MaterialIssueFormData): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const newIssue = await materialIssueAPI.createIssue(data)
      issues.value.unshift(newIssue)
      return newIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateIssue(id: string, data: Partial<MaterialIssueFormData>): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const updatedIssue = await materialIssueAPI.updateIssue(id, data)
      
      // Update in the list
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value[index] = updatedIssue
      }
      
      // Update current issue if it's the same
      if (currentIssue.value?.id === id) {
        currentIssue.value = updatedIssue
      }
      
      return updatedIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteIssue(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await materialIssueAPI.deleteIssue(id)
      
      // Remove from the list
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value.splice(index, 1)
      }
      
      // Clear current issue if it's the deleted one
      if (currentIssue.value?.id === id) {
        currentIssue.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Material issue specific actions
  async function issueItems(id: string, issuedQuantity: number): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const updatedIssue = await materialIssueAPI.issueItems(id, issuedQuantity)
      
      // Update in the list
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value[index] = updatedIssue
      }
      
      // Update current issue if it's the same
      if (currentIssue.value?.id === id) {
        currentIssue.value = updatedIssue
      }
      
      return updatedIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to issue items'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function closeIssue(id: string): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const closedIssue = await materialIssueAPI.closeIssue(id)
      
      // Update in the list
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value[index] = closedIssue
      }
      
      // Update current issue if it's the same
      if (currentIssue.value?.id === id) {
        currentIssue.value = closedIssue
      }
      
      return closedIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelIssue(id: string): Promise<MaterialIssue> {
    loading.value = true
    error.value = null
    try {
      const cancelledIssue = await materialIssueAPI.cancelIssue(id)
      
      // Update in the list
      const index = issues.value.findIndex(i => i.id === id)
      if (index !== -1) {
        issues.value[index] = cancelledIssue
      }
      
      // Update current issue if it's the same
      if (currentIssue.value?.id === id) {
        currentIssue.value = cancelledIssue
      }
      
      return cancelledIssue
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel issue'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getIssueById(id: string): MaterialIssue | undefined {
    return issues.value.find(i => i.id === id)
  }

  function getIssuesByStatus(status: string): MaterialIssue[] {
    return issues.value.filter(i => i.status === status)
  }

  function getIssuesByType(type: string): MaterialIssue[] {
    return issues.value.filter(i => i.type === type)
  }

  function getIssuesByProductionOrder(productionOrderId: string): MaterialIssue[] {
    return issues.value.filter(i => i.productionOrderId === productionOrderId)
  }

  function getOverdueIssues(): MaterialIssue[] {
    const now = new Date()
    return issues.value.filter(i => 
      new Date(i.dueDate) < now && 
      !['fully_issued', 'closed', 'cancelled'].includes(i.status)
    )
  }

  function getOpenIssues(): MaterialIssue[] {
    return issues.value.filter(i => ['open', 'partially_issued'].includes(i.status))
  }

  function getTotalIssueValue(): number {
    return issues.value.reduce((sum, i) => sum + i.totalCost, 0)
  }

  function getIssueCompletionRate(): number {
    if (issues.value.length === 0) return 0
    const totalPlanned = issues.value.reduce((sum, i) => sum + i.plannedQuantity, 0)
    const totalIssued = issues.value.reduce((sum, i) => sum + i.issuedQuantity, 0)
    return totalPlanned > 0 ? Math.round((totalIssued / totalPlanned) * 100) : 0
  }

  return {
    // State
    issues,
    loading,
    error,
    stats,
    currentIssue,
    
    // Actions
    fetchIssues,
    fetchIssue,
    fetchStats,
    createIssue,
    updateIssue,
    deleteIssue,
    issueItems,
    closeIssue,
    cancelIssue,
    
    // Getters
    getIssueById,
    getIssuesByStatus,
    getIssuesByType,
    getIssuesByProductionOrder,
    getOverdueIssues,
    getOpenIssues,
    getTotalIssueValue,
    getIssueCompletionRate,
  }
})