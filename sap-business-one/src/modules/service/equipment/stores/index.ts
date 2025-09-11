import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceAPI } from '../../api'
import type {
  Equipment,
  EquipmentFormData,
  EquipmentSearchParams,
  EquipmentStats,
  EquipmentFilters,
  EquipmentStatus,
  EquipmentType,
  MaintenanceStatus,
  WarrantyStatus,
} from '../types'

export const useEquipmentStore = defineStore('equipment', () => {
  // State
  const equipment = ref<Equipment[]>([])
  const currentEquipment = ref<Equipment | null>(null)
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
  const filters = ref<EquipmentFilters>({})
  const stats = ref<EquipmentStats | null>(null)

  // Computed properties
  const equipmentByStatus = computed(() => {
    const grouped: Record<EquipmentStatus, Equipment[]> = {
      active: [],
      in_service: [],
      out_of_service: [],
      under_repair: [],
      decommissioned: [],
      lost: [],
    }

    equipment.value.forEach((item) => {
      grouped[item.status].push(item)
    })

    return grouped
  })

  const equipmentByCategory = computed(() => {
    const grouped: Record<string, Equipment[]> = {}

    equipment.value.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })

    return grouped
  })

  const activeEquipment = computed(() =>
    equipment.value.filter((item) => item.status === 'active' || item.status === 'in_service'),
  )

  const equipmentUnderRepair = computed(() =>
    equipment.value.filter((item) => item.status === 'under_repair'),
  )

  const totalEquipmentValue = computed(() =>
    equipment.value.reduce((sum, item) => sum + item.value, 0),
  )

  const totalDepreciatedValue = computed(() =>
    equipment.value.reduce((sum, item) => sum + item.depreciatedValue, 0),
  )

  const equipmentNeedingService = computed(() => {
    const now = new Date()
    return equipment.value.filter(
      (item) => item.nextServiceDate && new Date(item.nextServiceDate) <= now,
    )
  })

  const warrantyExpiringSoon = computed(() => {
    const now = new Date()
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
    return equipment.value.filter(
      (item) =>
        item.warrantyExpiration &&
        new Date(item.warrantyExpiration) <= threeMonthsFromNow &&
        new Date(item.warrantyExpiration) > now,
    )
  })

  // Stats calculation
  const calculateStats = () => {
    const equipmentList = equipment.value
    const totalEquipment = equipmentList.length
    const activeEquipment = equipmentList.filter((item) => item.status === 'active').length
    const inServiceEquipment = equipmentList.filter((item) => item.status === 'in_service').length
    const outOfServiceEquipment = equipmentList.filter(
      (item) => item.status === 'out_of_service',
    ).length
    const maintenanceDueCount = equipmentNeedingService.value.length
    const underWarranty = equipmentList.filter(
      (item) => item.warrantyStatus === 'under_warranty',
    ).length

    const totalValue = equipmentList.reduce((sum, item) => sum + item.cost, 0)

    // Calculate average age
    const now = new Date()
    const totalAge = equipmentList.reduce((sum, item) => {
      const purchaseDate = new Date(item.purchaseDate)
      const ageInDays = (now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
      return sum + ageInDays
    }, 0)
    const averageAge = totalEquipment > 0 ? totalAge / totalEquipment : 0

    const equipmentByType: Record<EquipmentType, number> = {
      server: equipmentList.filter((e) => e.type === 'server').length,
      network: equipmentList.filter((e) => e.type === 'network').length,
      storage: equipmentList.filter((e) => e.type === 'storage').length,
      security: equipmentList.filter((e) => e.type === 'security').length,
      peripheral: equipmentList.filter((e) => e.type === 'peripheral').length,
      mobile: equipmentList.filter((e) => e.type === 'mobile').length,
      software: equipmentList.filter((e) => e.type === 'software').length,
      other: equipmentList.filter((e) => e.type === 'other').length,
    }

    const equipmentByStatus: Record<EquipmentStatus, number> = {
      active: equipmentList.filter((e) => e.status === 'active').length,
      in_service: equipmentList.filter((e) => e.status === 'in_service').length,
      out_of_service: equipmentList.filter((e) => e.status === 'out_of_service').length,
      maintenance: equipmentList.filter((e) => e.status === 'maintenance').length,
      retired: equipmentList.filter((e) => e.status === 'retired').length,
      disposed: equipmentList.filter((e) => e.status === 'disposed').length,
    }

    const maintenanceStatus: Record<MaintenanceStatus, number> = {
      up_to_date: equipmentList.filter((e) => e.maintenanceStatus === 'up_to_date').length,
      due_soon: equipmentList.filter((e) => e.maintenanceStatus === 'due_soon').length,
      overdue: equipmentList.filter((e) => e.maintenanceStatus === 'overdue').length,
      in_progress: equipmentList.filter((e) => e.maintenanceStatus === 'in_progress').length,
      not_required: equipmentList.filter((e) => e.maintenanceStatus === 'not_required').length,
    }

    const warrantyStatus: Record<WarrantyStatus, number> = {
      under_warranty: equipmentList.filter((e) => e.warrantyStatus === 'under_warranty').length,
      expired: equipmentList.filter((e) => e.warrantyStatus === 'expired').length,
      no_warranty: equipmentList.filter((e) => e.warrantyStatus === 'no_warranty').length,
      extended: equipmentList.filter((e) => e.warrantyStatus === 'extended').length,
    }

    // Calculate top customers
    const customerCounts: Record<
      string,
      { customerId: string; customerName: string; count: number }
    > = {}
    equipmentList.forEach((item) => {
      if (!customerCounts[item.customerId]) {
        customerCounts[item.customerId] = {
          customerId: item.customerId,
          customerName: item.customerName,
          count: 0,
        }
      }
      customerCounts[item.customerId].count++
    })
    const topCustomers = Object.values(customerCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    stats.value = {
      totalEquipment,
      activeEquipment,
      inServiceEquipment,
      outOfServiceEquipment,
      maintenanceDue: maintenanceDueCount,
      underWarranty,
      totalValue,
      averageAge: Math.round(averageAge),
      equipmentByType,
      equipmentByStatus,
      maintenanceStatus,
      warrantyStatus,
      topCustomers,
    }
  }

  // Actions
  const loadEquipment = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await serviceAPI.getEquipment({
        page: pagination.value.page,
        limit: pagination.value.limit,
        ...filters.value,
      })

      equipment.value = result.items
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
      error.value = err instanceof Error ? err.message : 'Failed to load equipment'
      console.error('Error loading equipment:', err)
    } finally {
      loading.value = false
    }
  }

  const loadEquipmentById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const equipmentItem = await serviceAPI.getEquipmentById(id)
      currentEquipment.value = equipmentItem
      return equipmentItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load equipment'
      console.error('Error loading equipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createEquipment = async (data: EquipmentFormData) => {
    try {
      loading.value = true
      error.value = null

      const newEquipment = await serviceAPI.createEquipment(data)
      equipment.value.unshift(newEquipment)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newEquipment
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create equipment'
      console.error('Error creating equipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEquipment = async (id: string, data: Partial<EquipmentFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedEquipment = await serviceAPI.updateEquipment(id, data)

      const index = equipment.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        equipment.value[index] = updatedEquipment
      }

      if (currentEquipment.value?.id === id) {
        currentEquipment.value = updatedEquipment
      }

      return updatedEquipment
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update equipment'
      console.error('Error updating equipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEquipment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await serviceAPI.deleteEquipment(id)

      const index = equipment.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        equipment.value.splice(index, 1)
      }

      if (currentEquipment.value?.id === id) {
        currentEquipment.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete equipment'
      console.error('Error deleting equipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadEquipment()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadEquipment()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadEquipment()
    }
  }

  // Filter actions
  const setFilters = (newFilters: EquipmentSearchParams) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadEquipment()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadEquipment()
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  return {
    // State
    equipment,
    currentEquipment,
    loading,
    error,
    pagination,
    filters,
    stats,

    // Computed
    equipmentByStatus,
    equipmentByCategory,
    activeEquipment,
    equipmentUnderRepair,
    totalEquipmentValue,
    totalDepreciatedValue,
    equipmentNeedingService,
    warrantyExpiringSoon,

    // Actions
    loadEquipment,
    loadEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,

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
