// Resource Master Data Store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Resource,
  ResourceFormData,
  ResourceSearchParams,
  ResourceStats,
} from '../types'
import { resourceMasterDataAPI } from '../api'

export const useResourceStore = defineStore('resource-master-data', () => {
  // State
  const resources = ref<Resource[]>([])
  const currentResource = ref<Resource | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchParams = ref<ResourceSearchParams>({
    page: 1,
    limit: 10,
    sortBy: 'resourceCode',
    sortOrder: 'asc',
  })
  const totalResources = ref(0)
  const totalPages = ref(0)
  const stats = ref<ResourceStats | null>(null)

  // Computed
  const hasResources = computed(() => resources.value.length > 0)
  const isLastPage = computed(() => searchParams.value.page === totalPages.value)
  const availableResources = computed(() =>
    resources.value.filter((r) => r.status === 'available'),
  )
  const inUseResources = computed(() => resources.value.filter((r) => r.status === 'in_use'))

  // Actions
  async function fetchResources(params?: ResourceSearchParams) {
    loading.value = true
    error.value = null
    try {
      const mergedParams = { ...searchParams.value, ...params }
      searchParams.value = mergedParams
      const response = await resourceMasterDataAPI.getResources(mergedParams)
      resources.value = response.items
      totalResources.value = response.total
      totalPages.value = response.totalPages
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch resources'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchResourceById(id: string) {
    loading.value = true
    error.value = null
    try {
      currentResource.value = await resourceMasterDataAPI.getResourceById(id)
      return currentResource.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch resource'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createResource(data: ResourceFormData) {
    loading.value = true
    error.value = null
    try {
      const newResource = await resourceMasterDataAPI.createResource(data)
      await fetchResources()
      return newResource
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create resource'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateResource(id: string, data: Partial<ResourceFormData>) {
    loading.value = true
    error.value = null
    try {
      const updatedResource = await resourceMasterDataAPI.updateResource(id, data)
      await fetchResources()
      return updatedResource
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update resource'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteResource(id: string) {
    loading.value = true
    error.value = null
    try {
      await resourceMasterDataAPI.deleteResource(id)
      await fetchResources()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete resource'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchResourceStats() {
    try {
      stats.value = await resourceMasterDataAPI.getResourceStats()
      return stats.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch statistics'
      throw error.value
    }
  }

  async function checkResourceAvailability(resourceId: string, date: string, hours: number) {
    try {
      return await resourceMasterDataAPI.checkAvailability(resourceId, date, hours)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to check availability'
      throw error.value
    }
  }

  function setPage(page: number) {
    searchParams.value.page = page
    fetchResources()
  }

  function setFilters(filters: ResourceSearchParams['filters']) {
    searchParams.value.filters = filters
    searchParams.value.page = 1
    fetchResources()
  }

  function clearFilters() {
    searchParams.value.filters = {}
    searchParams.value.page = 1
    fetchResources()
  }

  function setSort(sortBy: string) {
    if (searchParams.value.sortBy === sortBy) {
      searchParams.value.sortOrder = searchParams.value.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      searchParams.value.sortBy = sortBy
      searchParams.value.sortOrder = 'asc'
    }
    fetchResources()
  }

  return {
    // State
    resources,
    currentResource,
    loading,
    error,
    searchParams,
    totalResources,
    totalPages,
    stats,

    // Computed
    hasResources,
    isLastPage,
    availableResources,
    inUseResources,

    // Actions
    fetchResources,
    fetchResourceById,
    createResource,
    updateResource,
    deleteResource,
    fetchResourceStats,
    checkResourceAvailability,
    setPage,
    setFilters,
    clearFilters,
    setSort,
  }
})