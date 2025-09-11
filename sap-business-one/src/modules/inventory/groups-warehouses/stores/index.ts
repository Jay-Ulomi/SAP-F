import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { groupsWarehousesApi } from '../api'
import type {
  ItemGroup,
  Warehouse,
  Location,
  ItemGroupFormData,
  WarehouseFormData,
  LocationFormData,
  GroupsWarehousesStats,
  GroupsWarehousesFilters,
  GroupsWarehousesSearchParams,
} from '../types'

export const useGroupsWarehousesStore = defineStore('groupsWarehouses', () => {
  // State
  const groupsWarehouses = ref<(ItemGroup | Warehouse | Location)[]>([])
  const itemGroups = ref<ItemGroup[]>([])
  const warehouses = ref<Warehouse[]>([])
  const locations = ref<Location[]>([])
  const stats = ref<GroupsWarehousesStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters
  const filters = ref<GroupsWarehousesFilters>({})

  // Computed
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return groupsWarehouses.value.slice(start, end)
  })

  const hasItems = computed(() => groupsWarehouses.value.length > 0)

  const filteredGroups = computed(() => {
    let filtered = itemGroups.value

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(
        (group) =>
          group.groupName.toLowerCase().includes(searchLower) ||
          group.groupCode.toLowerCase().includes(searchLower),
      )
    }

    if (filters.value.status) {
      filtered = filtered.filter((group) => group.status === filters.value.status)
    }

    return filtered
  })

  const filteredWarehouses = computed(() => {
    let filtered = warehouses.value

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(
        (warehouse) =>
          warehouse.warehouseName.toLowerCase().includes(searchLower) ||
          warehouse.warehouseCode.toLowerCase().includes(searchLower),
      )
    }

    if (filters.value.status) {
      filtered = filtered.filter((warehouse) => warehouse.status === filters.value.status)
    }

    return filtered
  })

  const filteredLocations = computed(() => {
    let filtered = locations.value

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(
        (location) =>
          location.locationName.toLowerCase().includes(searchLower) ||
          location.locationCode.toLowerCase().includes(searchLower),
      )
    }

    if (filters.value.status) {
      filtered = filtered.filter((location) => location.status === filters.value.status)
    }

    if (filters.value.warehouseId) {
      filtered = filtered.filter((location) => location.warehouseId === filters.value.warehouseId)
    }

    return filtered
  })

  // Actions
  const fetchGroupsWarehouses = async (params: GroupsWarehousesSearchParams = {}) => {
    try {
      loading.value = true
      error.value = null

      const response = await groupsWarehousesApi.getGroupsWarehouses({
        page: currentPage.value,
        limit: itemsPerPage.value,
        ...params,
        filters: { ...filters.value, ...params.filters },
      })

      groupsWarehouses.value = response.data
      totalItems.value = response.total
      totalPages.value = response.totalPages
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching groups/warehouses:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchItemGroups = async () => {
    try {
      loading.value = true
      error.value = null
      itemGroups.value = await groupsWarehousesApi.getItemGroups()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching item groups:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchWarehouses = async () => {
    try {
      loading.value = true
      error.value = null
      warehouses.value = await groupsWarehousesApi.getWarehouses()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching warehouses:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchLocations = async () => {
    try {
      loading.value = true
      error.value = null
      locations.value = await groupsWarehousesApi.getLocations()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching locations:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await groupsWarehousesApi.getStats()
      stats.value = response.stats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching stats:', err)
    } finally {
      loading.value = false
    }
  }

  // Item Groups CRUD
  const createItemGroup = async (data: ItemGroupFormData) => {
    try {
      loading.value = true
      error.value = null
      const newGroup = await groupsWarehousesApi.createItemGroup(data)
      itemGroups.value.push(newGroup)
      await fetchStats()
      return newGroup
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error creating item group:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateItemGroup = async (id: string, data: Partial<ItemGroupFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updatedGroup = await groupsWarehousesApi.updateItemGroup(id, data)
      const index = itemGroups.value.findIndex((g) => g.id === id)
      if (index !== -1) {
        itemGroups.value[index] = updatedGroup
      }
      return updatedGroup
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error updating item group:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteItemGroup = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await groupsWarehousesApi.deleteItemGroup(id)
      itemGroups.value = itemGroups.value.filter((g) => g.id !== id)
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error deleting item group:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Warehouses CRUD
  const createWarehouse = async (data: WarehouseFormData) => {
    try {
      loading.value = true
      error.value = null
      const newWarehouse = await groupsWarehousesApi.createWarehouse(data)
      warehouses.value.push(newWarehouse)
      await fetchStats()
      return newWarehouse
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error creating warehouse:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateWarehouse = async (id: string, data: Partial<WarehouseFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updatedWarehouse = await groupsWarehousesApi.updateWarehouse(id, data)
      const index = warehouses.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        warehouses.value[index] = updatedWarehouse
      }
      return updatedWarehouse
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error updating warehouse:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteWarehouse = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await groupsWarehousesApi.deleteWarehouse(id)
      warehouses.value = warehouses.value.filter((w) => w.id !== id)
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error deleting warehouse:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Locations CRUD
  const createLocation = async (data: LocationFormData) => {
    try {
      loading.value = true
      error.value = null
      const newLocation = await groupsWarehousesApi.createLocation(data)
      locations.value.push(newLocation)
      await fetchStats()
      return newLocation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error creating location:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateLocation = async (id: string, data: Partial<LocationFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updatedLocation = await groupsWarehousesApi.updateLocation(id, data)
      const index = locations.value.findIndex((l) => l.id === id)
      if (index !== -1) {
        locations.value[index] = updatedLocation
      }
      return updatedLocation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error updating location:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteLocation = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await groupsWarehousesApi.deleteLocation(id)
      locations.value = locations.value.filter((l) => l.id !== id)
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error deleting location:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Filter and pagination actions
  const setFilters = (newFilters: Partial<GroupsWarehousesFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
  }

  return {
    // State
    groupsWarehouses,
    itemGroups,
    warehouses,
    locations,
    stats,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    filters,

    // Computed
    paginatedItems,
    hasItems,
    filteredGroups,
    filteredWarehouses,
    filteredLocations,

    // Actions
    fetchGroupsWarehouses,
    fetchItemGroups,
    fetchWarehouses,
    fetchLocations,
    fetchStats,
    createItemGroup,
    updateItemGroup,
    deleteItemGroup,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    createLocation,
    updateLocation,
    deleteLocation,
    setFilters,
    setPage,
    clearFilters,
  }
})
