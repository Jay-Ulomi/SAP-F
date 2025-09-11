import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceAPI } from '../../api'
import type {
  ServiceContract,
  ServiceContractFormData,
  ServiceContractSearchParams,
  ServiceContractStats,
  ServiceContractFilters,
  ContractType,
  ServiceContractStatus,
} from '../types'

export const useServiceContractsStore = defineStore('serviceContracts', () => {
  // State
  const contracts = ref<ServiceContract[]>([])
  const currentContract = ref<ServiceContract | null>(null)
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
  const filters = ref<ServiceContractFilters>({})
  const stats = ref<ServiceContractStats | null>(null)

  // Computed properties
  const contractsByStatus = computed(() => {
    const grouped: Record<ServiceContractStatus, ServiceContract[]> = {
      draft: [],
      active: [],
      expired: [],
      cancelled: [],
      suspended: [],
      renewed: [],
    }

    contracts.value.forEach((contract) => {
      grouped[contract.status].push(contract)
    })

    return grouped
  })

  const contractsByType = computed(() => {
    const grouped: Record<ContractType, ServiceContract[]> = {
      warranty: [],
      service_agreement: [],
      maintenance: [],
      support: [],
      subscription: [],
    }

    contracts.value.forEach((contract) => {
      grouped[contract.type].push(contract)
    })

    return grouped
  })

  const activeContracts = computed(() =>
    contracts.value.filter((contract) => contract.status === 'active'),
  )

  const expiredContracts = computed(() =>
    contracts.value.filter((contract) => contract.status === 'expired'),
  )

  const totalContractValue = computed(() =>
    contracts.value.reduce((sum, contract) => sum + contract.value, 0),
  )

  const contractsExpiringThisMonth = computed(() => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    return contracts.value.filter(
      (contract) => new Date(contract.endDate) <= nextMonth && contract.status === 'active',
    )
  })

  // Stats calculation
  const calculateStats = () => {
    const contractList = contracts.value
    const totalContracts = contractList.length
    const activeContracts = contractList.filter((contract) => contract.status === 'active').length
    const expiredContracts = contractList.filter((contract) => contract.status === 'expired').length
    const expiringSoon = contractsExpiringThisMonth.value.length

    const totalValue = contractList.reduce((sum, contract) => sum + contract.totalValue, 0)
    const averageContractValue = totalContracts > 0 ? totalValue / totalContracts : 0

    const contractsByType: Record<ContractType, number> = {
      preventive_maintenance: contractList.filter((c) => c.type === 'preventive_maintenance')
        .length,
      break_fix: contractList.filter((c) => c.type === 'break_fix').length,
      full_service: contractList.filter((c) => c.type === 'full_service').length,
      warranty: contractList.filter((c) => c.type === 'warranty').length,
      support: contractList.filter((c) => c.type === 'support').length,
      consulting: contractList.filter((c) => c.type === 'consulting').length,
    }

    const contractsByStatus: Record<ServiceContractStatus, number> = {
      draft: contractList.filter((c) => c.status === 'draft').length,
      active: contractList.filter((c) => c.status === 'active').length,
      expired: contractList.filter((c) => c.status === 'expired').length,
      cancelled: contractList.filter((c) => c.status === 'cancelled').length,
      suspended: contractList.filter((c) => c.status === 'suspended').length,
      renewed: contractList.filter((c) => c.status === 'renewed').length,
    }

    // Calculate renewal rate (simplified)
    const renewedContracts = contractList.filter((c) => c.status === 'renewed').length
    const renewalRate = totalContracts > 0 ? (renewedContracts / totalContracts) * 100 : 0

    // Mock customer satisfaction (would come from actual data)
    const customerSatisfaction = 4.2

    stats.value = {
      totalContracts,
      activeContracts,
      expiredContracts,
      expiringSoon,
      totalValue,
      averageContractValue: Math.round(averageContractValue * 100) / 100,
      contractsByType,
      contractsByStatus,
      renewalRate: Math.round(renewalRate * 10) / 10,
      customerSatisfaction,
    }
  }

  // Actions
  const loadContracts = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await serviceAPI.getContracts({
        page: pagination.value.page,
        limit: pagination.value.limit,
        ...filters.value,
      })

      contracts.value = result.items
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
      error.value = err instanceof Error ? err.message : 'Failed to load contracts'
      console.error('Error loading contracts:', err)
    } finally {
      loading.value = false
    }
  }

  const loadContract = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const contract = await serviceAPI.getContract(id)
      currentContract.value = contract
      return contract
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contract'
      console.error('Error loading contract:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createContract = async (data: ServiceContractFormData) => {
    try {
      loading.value = true
      error.value = null

      const newContract = await serviceAPI.createContract(data)
      contracts.value.unshift(newContract)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newContract
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create contract'
      console.error('Error creating contract:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateContract = async (id: string, data: Partial<ServiceContractFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedContract = await serviceAPI.updateContract(id, data)

      const index = contracts.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        contracts.value[index] = updatedContract
      }

      if (currentContract.value?.id === id) {
        currentContract.value = updatedContract
      }

      return updatedContract
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update contract'
      console.error('Error updating contract:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteContract = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await serviceAPI.deleteContract(id)

      const index = contracts.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        contracts.value.splice(index, 1)
      }

      if (currentContract.value?.id === id) {
        currentContract.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete contract'
      console.error('Error deleting contract:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const renewContract = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const renewedContract = await serviceAPI.renewContract(id)

      const index = contracts.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        contracts.value[index] = renewedContract
      }

      if (currentContract.value?.id === id) {
        currentContract.value = renewedContract
      }

      return renewedContract
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to renew contract'
      console.error('Error renewing contract:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadContracts()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadContracts()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadContracts()
    }
  }

  // Filter actions
  const setFilters = (newFilters: ServiceContractSearchParams) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadContracts()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadContracts()
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  return {
    // State
    contracts,
    currentContract,
    loading,
    error,
    pagination,
    filters,
    stats,

    // Computed
    contractsByStatus,
    contractsByType,
    activeContracts,
    expiredContracts,
    totalContractValue,
    contractsExpiringThisMonth,

    // Actions
    loadContracts,
    loadContract,
    createContract,
    updateContract,
    deleteContract,
    renewContract,

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
