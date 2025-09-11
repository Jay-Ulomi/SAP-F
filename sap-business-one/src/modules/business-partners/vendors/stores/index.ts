import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { vendorApi } from '../api'
import type {
  Vendor,
  VendorFormData,
  VendorFilters,
  VendorStats,
  VendorPagination,
  VendorValidationResult,
} from '../types'

export const useVendorStore = defineStore('vendor', () => {
  // State
  const vendors = ref<Vendor[]>([])
  const currentVendor = ref<Vendor | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<VendorStats | null>(null)
  const pagination = ref<VendorPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<VendorFilters>({})

  // Computed properties
  const totalPages = computed(() => pagination.value.totalPages)
  const hasActiveFilters = computed(() => {
    return Object.keys(filters.value).some((key) => {
      const value = filters.value[key as keyof VendorFilters]
      return value !== undefined && value !== '' && value !== null
    })
  })

  const vendorsByStatus = computed(() => {
    if (!stats.value) return []
    return stats.value.vendorsByStatus
  })

  const vendorsByType = computed(() => {
    if (!stats.value) return []
    return stats.value.vendorsByType
  })

  const vendorsByCountry = computed(() => {
    if (!stats.value) return []
    return stats.value.vendorsByCountry
  })

  const vendorsByCurrency = computed(() => {
    if (!stats.value) return []
    return stats.value.vendorsByCurrency
  })

  const activeVendors = computed(() => vendors.value.filter((vendor) => vendor.status === 'ACTIVE'))

  const inactiveVendors = computed(() =>
    vendors.value.filter((vendor) => vendor.status === 'INACTIVE'),
  )

  const suspendedVendors = computed(() =>
    vendors.value.filter((vendor) => vendor.status === 'SUSPENDED'),
  )

  const blockedVendors = computed(() =>
    vendors.value.filter((vendor) => vendor.status === 'BLOCKED'),
  )

  // Actions
  const loadVendors = async (newFilters?: VendorFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await vendorApi.getVendors(filters.value)
      vendors.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load vendors'
      console.error('Failed to load vendors:', err)
    } finally {
      loading.value = false
    }
  }

  const loadVendor = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.getVendor(id)
      currentVendor.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load vendor'
      console.error('Failed to load vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadVendorStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.getVendorStats()
      stats.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load vendor statistics'
      console.error('Failed to load vendor statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const createVendor = async (data: VendorFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.createVendor(data)
      vendors.value.unshift(response.data)

      // Update stats
      await loadVendorStats()

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create vendor'
      console.error('Failed to create vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateVendor = async (id: string, data: Partial<VendorFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.updateVendor(id, data)

      // Update in vendors list
      const index = vendors.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vendors.value[index] = response.data
      }

      // Update current vendor if it's the one being updated
      if (currentVendor.value?.id === id) {
        currentVendor.value = response.data
      }

      // Update stats
      await loadVendorStats()

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update vendor'
      console.error('Failed to update vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteVendor = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await vendorApi.deleteVendor(id)

      // Remove from vendors list
      const index = vendors.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vendors.value.splice(index, 1)
      }

      // Clear current vendor if it's the one being deleted
      if (currentVendor.value?.id === id) {
        currentVendor.value = null
      }

      // Update stats
      await loadVendorStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete vendor'
      console.error('Failed to delete vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const validateVendor = async (data: VendorFormData): Promise<VendorValidationResult> => {
    try {
      return await vendorApi.validateVendor(data)
    } catch (err) {
      console.error('Failed to validate vendor:', err)
      throw err
    }
  }

  const activateVendor = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.activateVendor(id)

      // Update in vendors list
      const index = vendors.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vendors.value[index] = response.data
      }

      // Update current vendor if it's the one being activated
      if (currentVendor.value?.id === id) {
        currentVendor.value = response.data
      }

      // Update stats
      await loadVendorStats()

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to activate vendor'
      console.error('Failed to activate vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const suspendVendor = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.suspendVendor(id, reason)

      // Update in vendors list
      const index = vendors.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vendors.value[index] = response.data
      }

      // Update current vendor if it's the one being suspended
      if (currentVendor.value?.id === id) {
        currentVendor.value = response.data
      }

      // Update stats
      await loadVendorStats()

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to suspend vendor'
      console.error('Failed to suspend vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const blockVendor = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await vendorApi.blockVendor(id, reason)

      // Update in vendors list
      const index = vendors.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vendors.value[index] = response.data
      }

      // Update current vendor if it's the one being blocked
      if (currentVendor.value?.id === id) {
        currentVendor.value = response.data
      }

      // Update stats
      await loadVendorStats()

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to block vendor'
      console.error('Failed to block vendor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearCurrentVendor = () => {
    currentVendor.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const clearFilters = () => {
    filters.value = {}
  }

  return {
    // State
    vendors,
    currentVendor,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    totalPages,
    hasActiveFilters,
    vendorsByStatus,
    vendorsByType,
    vendorsByCountry,
    vendorsByCurrency,
    activeVendors,
    inactiveVendors,
    suspendedVendors,
    blockedVendors,

    // Actions
    loadVendors,
    loadVendor,
    loadVendorStats,
    createVendor,
    updateVendor,
    deleteVendor,
    validateVendor,
    activateVendor,
    suspendVendor,
    blockVendor,
    clearCurrentVendor,
    clearError,
    clearFilters,
  }
})
