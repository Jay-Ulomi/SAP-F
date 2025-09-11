import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceCallApi } from '../api'
import type {
  ServiceCall,
  ServiceCallFormData,
  ServiceCallFilters,
  ServiceCallStats,
  ServiceCallPagination,
} from '../types'
import {
  ServiceCallStatus,
  ServiceCallType,
  ServiceCallCategory,
  ServiceCallPriority,
  ServiceCallSource,
} from '../types'

export const useServiceCallStore = defineStore('serviceCall', () => {
  // State
  const serviceCalls = ref<ServiceCall[]>([])
  const currentServiceCall = ref<ServiceCall | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ServiceCallStats | null>(null)
  const pagination = ref<ServiceCallPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ServiceCallFilters>({})

  // Computed properties
  const serviceCallsByStatus = computed(() => {
    const grouped: Record<ServiceCallStatus, ServiceCall[]> = {
      [ServiceCallStatus.OPEN]: [],
      [ServiceCallStatus.IN_PROGRESS]: [],
      [ServiceCallStatus.ON_HOLD]: [],
      [ServiceCallStatus.RESOLVED]: [],
      [ServiceCallStatus.CLOSED]: [],
      [ServiceCallStatus.CANCELLED]: [],
    }

    serviceCalls.value.forEach((serviceCall) => {
      grouped[serviceCall.status].push(serviceCall)
    })

    return grouped
  })

  const serviceCallsByPriority = computed(() => {
    const grouped: Record<ServiceCallPriority, ServiceCall[]> = {
      [ServiceCallPriority.LOW]: [],
      [ServiceCallPriority.MEDIUM]: [],
      [ServiceCallPriority.HIGH]: [],
      [ServiceCallPriority.CRITICAL]: [],
    }

    serviceCalls.value.forEach((serviceCall) => {
      grouped[serviceCall.priority].push(serviceCall)
    })

    return grouped
  })

  const serviceCallsByType = computed(() => {
    const grouped: Record<ServiceCallType, ServiceCall[]> = {
      [ServiceCallType.TECHNICAL_SUPPORT]: [],
      [ServiceCallType.BUG_REPORT]: [],
      [ServiceCallType.FEATURE_REQUEST]: [],
      [ServiceCallType.TRAINING]: [],
      [ServiceCallType.CONSULTATION]: [],
      [ServiceCallType.MAINTENANCE]: [],
      [ServiceCallType.INSTALLATION]: [],
      [ServiceCallType.UPGRADE]: [],
      [ServiceCallType.OTHER]: [],
    }

    serviceCalls.value.forEach((serviceCall) => {
      grouped[serviceCall.type].push(serviceCall)
    })

    return grouped
  })

  const serviceCallsByCategory = computed(() => {
    const grouped: Record<ServiceCallCategory, ServiceCall[]> = {
      [ServiceCallCategory.SOFTWARE]: [],
      [ServiceCallCategory.HARDWARE]: [],
      [ServiceCallCategory.NETWORK]: [],
      [ServiceCallCategory.DATABASE]: [],
      [ServiceCallCategory.SECURITY]: [],
      [ServiceCallCategory.USER_ACCESS]: [],
      [ServiceCallCategory.INTEGRATION]: [],
      [ServiceCallCategory.REPORTING]: [],
      [ServiceCallCategory.WORKFLOW]: [],
      [ServiceCallCategory.OTHER]: [],
    }

    serviceCalls.value.forEach((serviceCall) => {
      grouped[serviceCall.category].push(serviceCall)
    })

    return grouped
  })

  const openServiceCalls = computed(() =>
    serviceCalls.value.filter(
      (serviceCall) =>
        serviceCall.status === ServiceCallStatus.OPEN ||
        serviceCall.status === ServiceCallStatus.IN_PROGRESS,
    ),
  )

  const resolvedServiceCalls = computed(() =>
    serviceCalls.value.filter((serviceCall) => serviceCall.status === ServiceCallStatus.RESOLVED),
  )

  const closedServiceCalls = computed(() =>
    serviceCalls.value.filter((serviceCall) => serviceCall.status === ServiceCallStatus.CLOSED),
  )

  const highPriorityServiceCalls = computed(() =>
    serviceCalls.value.filter(
      (serviceCall) =>
        serviceCall.priority === ServiceCallPriority.HIGH ||
        serviceCall.priority === ServiceCallPriority.CRITICAL,
    ),
  )

  const serviceCallsThisWeek = computed(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return serviceCalls.value.filter(
      (serviceCall) => serviceCall.timeline.reportedDate >= oneWeekAgo,
    )
  })

  const serviceCallsThisMonth = computed(() => {
    const now = new Date()
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    return serviceCalls.value.filter(
      (serviceCall) => serviceCall.timeline.reportedDate >= oneMonthAgo,
    )
  })

  const totalCost = computed(() =>
    serviceCalls.value.reduce((sum, serviceCall) => sum + serviceCall.financial.totalCost, 0),
  )

  const billableAmount = computed(() =>
    serviceCalls.value.reduce((sum, serviceCall) => sum + serviceCall.financial.billableAmount, 0),
  )

  const slaCompliantCalls = computed(() =>
    serviceCalls.value.filter((serviceCall) => serviceCall.timeline.slaCompliance === 'ON_TIME'),
  )

  const slaBreachedCalls = computed(() =>
    serviceCalls.value.filter((serviceCall) => serviceCall.timeline.slaCompliance === 'BREACHED'),
  )

  // Actions
  const loadServiceCalls = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await serviceCallApi.getServiceCalls(
        pagination.value.page,
        pagination.value.limit,
        filters.value,
      )

      serviceCalls.value = result.serviceCalls
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load service calls'
      console.error('Error loading service calls:', err)
    } finally {
      loading.value = false
    }
  }

  const createServiceCall = async (data: ServiceCallFormData) => {
    try {
      loading.value = true
      error.value = null

      const newServiceCall = await serviceCallApi.createServiceCall(data)
      serviceCalls.value.unshift(newServiceCall)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newServiceCall
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

      const updatedServiceCall = await serviceCallApi.updateServiceCall(id, data)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedServiceCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedServiceCall
      }

      return updatedServiceCall
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

      await serviceCallApi.deleteServiceCall(id)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value.splice(index, 1)
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete service call'
      console.error('Error deleting service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateServiceCall = async (
    id: string,
    newServiceCallCode: string,
    newTitle: string,
    newCustomerName: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedServiceCall = await serviceCallApi.duplicateServiceCall(
        id,
        newServiceCallCode,
        newTitle,
        newCustomerName,
      )
      serviceCalls.value.unshift(duplicatedServiceCall)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return duplicatedServiceCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate service call'
      console.error('Error duplicating service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadServiceCallStats = async () => {
    try {
      loading.value = true
      error.value = null

      const serviceCallStats = await serviceCallApi.getServiceCallStats()
      stats.value = serviceCallStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load service call statistics'
      console.error('Error loading service call statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Business logic actions
  const updateStatus = async (id: string, newStatus: ServiceCallStatus) => {
    try {
      loading.value = true
      error.value = null

      const updatedServiceCall = await serviceCallApi.updateStatus(id, newStatus)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedServiceCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedServiceCall
      }

      return updatedServiceCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update service call status'
      console.error('Error updating service call status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePriority = async (id: string, newPriority: ServiceCallPriority) => {
    try {
      loading.value = true
      error.value = null

      const updatedServiceCall = await serviceCallApi.updatePriority(id, newPriority)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedServiceCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedServiceCall
      }

      return updatedServiceCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update service call priority'
      console.error('Error updating service call priority:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const assignServiceCall = async (id: string, assignedTo: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedServiceCall = await serviceCallApi.assignServiceCall(id, assignedTo)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedServiceCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedServiceCall
      }

      return updatedServiceCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to assign service call'
      console.error('Error assigning service call:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const addActivity = async (id: string, activity: any) => {
    try {
      loading.value = true
      error.value = null

      const updatedServiceCall = await serviceCallApi.addActivity(id, activity)

      const index = serviceCalls.value.findIndex((sc) => sc.id === id)
      if (index !== -1) {
        serviceCalls.value[index] = updatedServiceCall
      }

      if (currentServiceCall.value?.id === id) {
        currentServiceCall.value = updatedServiceCall
      }

      return updatedServiceCall
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add activity'
      console.error('Error adding activity:', err)
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
  const setFilters = (newFilters: ServiceCallFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadServiceCalls()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadServiceCalls()
  }

  return {
    // State
    serviceCalls,
    currentServiceCall,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    serviceCallsByStatus,
    serviceCallsByPriority,
    serviceCallsByType,
    serviceCallsByCategory,
    openServiceCalls,
    resolvedServiceCalls,
    closedServiceCalls,
    highPriorityServiceCalls,
    serviceCallsThisWeek,
    serviceCallsThisMonth,
    totalCost,
    billableAmount,
    slaCompliantCalls,
    slaBreachedCalls,

    // Actions
    loadServiceCalls,
    createServiceCall,
    updateServiceCall,
    deleteServiceCall,
    duplicateServiceCall,
    loadServiceCallStats,
    updateStatus,
    updatePriority,
    assignServiceCall,
    addActivity,

    // Pagination
    nextPage,
    previousPage,
    goToPage,

    // Filters
    setFilters,
    clearFilters,
  }
})
