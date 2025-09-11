import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceAPI } from '../../api'
import type {
  ServiceCall,
  ServiceCallFormData,
  ServiceCallSearchParams,
  ServiceCallStats,
  ServiceCallFilters,
  ServiceCallStatus,
  ServiceCallPriority,
  ServiceCallType,
} from '../types'

export const useServiceCallsStore = defineStore('serviceCalls', () => {
  // State
  const serviceCalls = ref<ServiceCall[]>([])
  const currentServiceCall = ref<ServiceCall | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ServiceCallFilters>({})
  const stats = ref<ServiceCallStats | null>(null)

  // Computed properties
  const callsByStatus = computed(() => {
    const grouped: Record<ServiceCallStatus, ServiceCall[]> = {
      open: [],
      scheduled: [],
      in_progress: [],
      on_hold: [],
      resolved: [],
      closed: [],
      cancelled: [],
    }

    serviceCalls.value.forEach((call) => {
      grouped[call.status].push(call)
    })

    return grouped
  })

  const callsByPriority = computed(() => {
    const grouped: Record<ServiceCallPriority, ServiceCall[]> = {
      low: [],
      medium: [],
      high: [],
      critical: [],
    }

    serviceCalls.value.forEach((call) => {
      grouped[call.priority].push(call)
    })

    return grouped
  })

  const callsByType = computed(() => {
    const grouped: Record<ServiceCallType, ServiceCall[]> = {
      repair: [],
      maintenance: [],
      installation: [],
      inspection: [],
      consultation: [],
      warranty: [],
      other: [],
    }

    serviceCalls.value.forEach((call) => {
      grouped[call.type].push(call)
    })

    return grouped
  })

  const openCalls = computed(() =>
    serviceCalls.value.filter((call) => call.status === 'open' || call.status === 'in_progress'),
  )

  const highPriorityCalls = computed(() =>
    serviceCalls.value.filter((call) => call.priority === 'high' || call.priority === 'critical'),
  )

  // Stats calculation
  const calculateStats = () => {
    const calls = serviceCalls.value
    const totalCalls = calls.length
    const openCalls = calls.filter((call) => call.status === 'open').length
    const inProgressCalls = calls.filter((call) => call.status === 'in_progress').length
    const resolvedCalls = calls.filter((call) => call.status === 'resolved').length
    const closedCalls = calls.filter((call) => call.status === 'closed').length

    const callsWithResponseTime = calls.filter((call) => call.responseTime !== undefined)
    const averageResponseTime =
      callsWithResponseTime.length > 0
        ? callsWithResponseTime.reduce((sum, call) => sum + (call.responseTime || 0), 0) /
          callsWithResponseTime.length
        : 0

    const callsWithResolutionTime = calls.filter((call) => call.resolutionTime !== undefined)
    const averageResolutionTime =
      callsWithResolutionTime.length > 0
        ? callsWithResolutionTime.reduce((sum, call) => sum + (call.resolutionTime || 0), 0) /
          callsWithResolutionTime.length
        : 0

    const callsWithSatisfaction = calls.filter((call) => call.customerSatisfaction !== undefined)
    const customerSatisfaction =
      callsWithSatisfaction.length > 0
        ? callsWithSatisfaction.reduce((sum, call) => sum + (call.customerSatisfaction || 0), 0) /
          callsWithSatisfaction.length
        : 0

    const callsByStatus: Record<ServiceCallStatus, number> = {
      open: calls.filter((call) => call.status === 'open').length,
      scheduled: calls.filter((call) => call.status === 'scheduled').length,
      in_progress: calls.filter((call) => call.status === 'in_progress').length,
      on_hold: calls.filter((call) => call.status === 'on_hold').length,
      resolved: calls.filter((call) => call.status === 'resolved').length,
      closed: calls.filter((call) => call.status === 'closed').length,
      cancelled: calls.filter((call) => call.status === 'cancelled').length,
    }

    const callsByPriority: Record<ServiceCallPriority, number> = {
      low: calls.filter((call) => call.priority === 'low').length,
      medium: calls.filter((call) => call.priority === 'medium').length,
      high: calls.filter((call) => call.priority === 'high').length,
      critical: calls.filter((call) => call.priority === 'critical').length,
    }

    const callsByType: Record<ServiceCallType, number> = {
      repair: calls.filter((call) => call.type === 'repair').length,
      maintenance: calls.filter((call) => call.type === 'maintenance').length,
      installation: calls.filter((call) => call.type === 'installation').length,
      inspection: calls.filter((call) => call.type === 'inspection').length,
      consultation: calls.filter((call) => call.type === 'consultation').length,
      warranty: calls.filter((call) => call.type === 'warranty').length,
      other: calls.filter((call) => call.type === 'other').length,
    }

    const slaCompliantCalls = calls.filter((call) => call.slaStatus === 'within_sla').length
    const slaCompliance = totalCalls > 0 ? (slaCompliantCalls / totalCalls) * 100 : 0

    stats.value = {
      totalCalls,
      openCalls,
      inProgressCalls,
      resolvedCalls,
      closedCalls,
      averageResponseTime: Math.round(averageResponseTime),
      averageResolutionTime: Math.round(averageResolutionTime),
      customerSatisfaction: Math.round(customerSatisfaction * 10) / 10,
      callsByStatus,
      callsByPriority,
      callsByType,
      slaCompliance: Math.round(slaCompliance * 10) / 10,
    }
  }

  const slaBreachedCalls = computed(() =>
    serviceCalls.value.filter((call) => call.slaStatus === 'sla_breach'),
  )

  const totalCallsCost = computed(() =>
    serviceCalls.value.reduce((sum, call) => sum + call.totalCost, 0),
  )

  const averageCustomerSatisfaction = computed(() => {
    const satisfactionScores = serviceCalls.value
      .filter((call) => call.customerSatisfaction !== undefined)
      .map((call) => call.customerSatisfaction!)

    if (satisfactionScores.length === 0) return 0
    return satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length
  })

  const callsThisWeek = computed(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return serviceCalls.value.filter((call) => new Date(call.createdAt) >= oneWeekAgo)
  })

  // Actions
  const loadServiceCalls = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await serviceAPI.getServiceCalls({
        page: pagination.value.page,
        limit: pagination.value.limit,
        ...filters.value,
      })

      serviceCalls.value = result.items
      pagination.value = {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
      }
      calculateStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load service calls'
      console.error('Error loading service calls:', err)
    } finally {
      loading.value = false
    }
  }

  const loadServiceCall = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const call = await serviceAPI.getServiceCall(id)
      currentServiceCall.value = call
      return call
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load service call'
      console.error('Error loading service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createServiceCall = async (data: ServiceCallFormData) => {
    try {
      loading.value = true
      error.value = null

      const newCall = await serviceAPI.createServiceCall(data)
      serviceCalls.value.unshift(newCall)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create service call'
      console.error('Error creating service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateServiceCall = async (id: string, data: Partial<ServiceCallFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedCall = await serviceAPI.updateServiceCall(id, data)

      const index = serviceCalls.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedCall
      }

      return updatedCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update service call'
      console.error('Error updating service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteServiceCall = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await serviceAPI.deleteServiceCall(id)

      const index = serviceCalls.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        serviceCalls.value.splice(index, 1)
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete service call'
      console.error('Error deleting service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const assignServiceCall = async (id: string, technicianId: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedCall = await serviceAPI.assignServiceCall(id, technicianId)

      const index = serviceCalls.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedCall
      }

      return updatedCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to assign service call'
      console.error('Error assigning service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCallStatus = async (id: string, status: ServiceCallStatus, resolution?: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedCall = await serviceAPI.updateServiceCallStatus(id, status, resolution)

      const index = serviceCalls.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedCall
      }

      return updatedCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update call status'
      console.error('Error updating call status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadServiceCalls()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadServiceCalls()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadServiceCalls()
    }
  }

  // Filter actions
  const setFilters = (newFilters: ServiceCallSearchParams) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadServiceCalls()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadServiceCalls()
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  return {
    // State
    serviceCalls,
    currentServiceCall,
    loading,
    error,
    pagination,
    filters,
    stats,

    // Computed
    callsByStatus,
    callsByPriority,
    callsByType,
    openCalls,
    highPriorityCalls,
    slaBreachedCalls,
    totalCallsCost,
    averageCustomerSatisfaction,
    callsThisWeek,

    // Actions
    loadServiceCalls,
    loadServiceCall,
    createServiceCall,
    updateServiceCall,
    deleteServiceCall,
    assignServiceCall,
    updateCallStatus,

    // Pagination
    nextPage,
    previousPage,
    goToPage,
    setPage,

    // Filters
    setFilters,
    clearFilters,
  }
})
