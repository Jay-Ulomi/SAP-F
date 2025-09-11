// Resource Groups Store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  ResourceGroup,
  ResourceGroupFormData,
  ResourceGroupSearchParams,
  ResourceGroupStats,
} from '../types'
import { resourceGroupsAPI } from '../api'

export const useResourceGroupStore = defineStore('resource-groups', () => {
  // State
  const groups = ref<ResourceGroup[]>([])
  const currentGroup = ref<ResourceGroup | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchParams = ref<ResourceGroupSearchParams>({
    page: 1,
    limit: 10,
    sortBy: 'groupCode',
    sortOrder: 'asc',
  })
  const totalGroups = ref(0)
  const totalPages = ref(0)
  const stats = ref<ResourceGroupStats | null>(null)

  // Computed
  const hasGroups = computed(() => groups.value.length > 0)
  const isLastPage = computed(() => searchParams.value.page === totalPages.value)
  const activeGroups = computed(() =>
    groups.value.filter((g) => g.status === 'active'),
  )

  // Actions
  async function fetchGroups(params?: ResourceGroupSearchParams) {
    loading.value = true
    error.value = null
    try {
      const mergedParams = { ...searchParams.value, ...params }
      searchParams.value = mergedParams
      const response = await resourceGroupsAPI.getResourceGroups(mergedParams)
      groups.value = response.items
      totalGroups.value = response.total
      totalPages.value = response.totalPages
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch resource groups'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchGroupById(id: string) {
    loading.value = true
    error.value = null
    try {
      currentGroup.value = await resourceGroupsAPI.getResourceGroupById(id)
      return currentGroup.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch resource group'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createGroup(data: ResourceGroupFormData) {
    loading.value = true
    error.value = null
    try {
      const newGroup = await resourceGroupsAPI.createResourceGroup(data)
      await fetchGroups()
      return newGroup
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create resource group'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateGroup(id: string, data: Partial<ResourceGroupFormData>) {
    loading.value = true
    error.value = null
    try {
      const updatedGroup = await resourceGroupsAPI.updateResourceGroup(id, data)
      await fetchGroups()
      return updatedGroup
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update resource group'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteGroup(id: string) {
    loading.value = true
    error.value = null
    try {
      await resourceGroupsAPI.deleteResourceGroup(id)
      await fetchGroups()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete resource group'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchGroupStats() {
    try {
      stats.value = await resourceGroupsAPI.getResourceGroupStats()
      return stats.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch statistics'
      throw error.value
    }
  }

  async function addResourceToGroup(groupId: string, resourceId: string) {
    try {
      const result = await resourceGroupsAPI.addResourceToGroup(groupId, resourceId)
      await fetchGroups()
      return result
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add resource to group'
      throw error.value
    }
  }

  async function removeResourceFromGroup(groupId: string, resourceId: string) {
    try {
      const result = await resourceGroupsAPI.removeResourceFromGroup(groupId, resourceId)
      await fetchGroups()
      return result
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to remove resource from group'
      throw error.value
    }
  }

  function setPage(page: number) {
    searchParams.value.page = page
    fetchGroups()
  }

  function setFilters(filters: ResourceGroupSearchParams['filters']) {
    searchParams.value.filters = filters
    searchParams.value.page = 1
    fetchGroups()
  }

  function clearFilters() {
    searchParams.value.filters = {}
    searchParams.value.page = 1
    fetchGroups()
  }

  function setSort(sortBy: string) {
    if (searchParams.value.sortBy === sortBy) {
      searchParams.value.sortOrder = searchParams.value.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      searchParams.value.sortBy = sortBy
      searchParams.value.sortOrder = 'asc'
    }
    fetchGroups()
  }

  return {
    // State
    groups,
    currentGroup,
    loading,
    error,
    searchParams,
    totalGroups,
    totalPages,
    stats,

    // Computed
    hasGroups,
    isLastPage,
    activeGroups,

    // Actions
    fetchGroups,
    fetchGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    fetchGroupStats,
    addResourceToGroup,
    removeResourceFromGroup,
    setPage,
    setFilters,
    clearFilters,
    setSort,
  }
})