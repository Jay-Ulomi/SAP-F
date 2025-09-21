import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { inventoryTransferApi } from '../api'
import type {
  InventoryTransfer,
  InventoryTransferFormData,
  InventoryTransferFilters,
  InventoryTransferStats,
  InventoryTransferPagination
} from '../types'
import { TransferStatus } from '../types'

export const useInventoryTransferStore = defineStore('inventoryTransfer', () => {
  // State
  const transfers = ref<InventoryTransfer[]>([])
  const currentTransfer = ref<InventoryTransfer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<InventoryTransferStats | null>(null)
  const pagination = ref<InventoryTransferPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<InventoryTransferFilters>({})

  // Computed properties
  const transfersByStatus = computed(() => {
    const grouped: Record<TransferStatus, InventoryTransfer[]> = {
      [TransferStatus.DRAFT]: [],
      [TransferStatus.PENDING]: [],
      [TransferStatus.COMPLETED]: [],
      [TransferStatus.CANCELLED]: []
    }

    transfers.value.forEach(transfer => {
      if (transfer.status) {
        grouped[transfer.status].push(transfer)
      }
    })

    return grouped
  })

  const completedTransfers = computed(() =>
    transfers.value.filter(transfer => transfer.status === TransferStatus.COMPLETED)
  )

  const pendingTransfers = computed(() =>
    transfers.value.filter(transfer => transfer.status === TransferStatus.PENDING)
  )

  const draftTransfers = computed(() =>
    transfers.value.filter(transfer => transfer.status === TransferStatus.DRAFT)
  )

  const totalValue = computed(() =>
    transfers.value.reduce((sum, transfer) => {
      return sum + transfer.lineItems.reduce((lineSum, item) => lineSum + (item.quantity * item.unitPrice), 0)
    }, 0)
  )

  // Actions
  const loadTransfers = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await inventoryTransferApi.getTransfers(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )

      transfers.value = result.transfers
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load transfers'
      console.error('Error loading transfers:', err)
    } finally {
      loading.value = false
    }
  }

  const loadTransferById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const transfer = await inventoryTransferApi.getTransferById(id)
      currentTransfer.value = transfer

      return transfer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load transfer'
      console.error('Error loading transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTransfer = async (data: InventoryTransferFormData) => {
    try {
      loading.value = true
      error.value = null

      const newTransfer = await inventoryTransferApi.createTransfer(data)
      transfers.value.unshift(newTransfer)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newTransfer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create transfer'
      console.error('Error creating transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTransfer = async (id: string, data: Partial<InventoryTransferFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedTransfer = await inventoryTransferApi.updateTransfer(id, data)

      const index = transfers.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transfers.value[index] = updatedTransfer
      }

      if (currentTransfer.value?.id === id) {
        currentTransfer.value = updatedTransfer
      }

      return updatedTransfer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update transfer'
      console.error('Error updating transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTransfer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await inventoryTransferApi.deleteTransfer(id)

      const index = transfers.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transfers.value.splice(index, 1)
      }

      if (currentTransfer.value?.id === id) {
        currentTransfer.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete transfer'
      console.error('Error deleting transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadTransferStats = async () => {
    try {
      loading.value = true
      error.value = null

      const transferStats = await inventoryTransferApi.getTransferStats()
      stats.value = transferStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load transfer statistics'
      console.error('Error loading transfer statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const completeTransfer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const completedTransfer = await inventoryTransferApi.completeTransfer(id)

      const index = transfers.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transfers.value[index] = completedTransfer
      }

      if (currentTransfer.value?.id === id) {
        currentTransfer.value = completedTransfer
      }

      return completedTransfer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete transfer'
      console.error('Error completing transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelTransfer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledTransfer = await inventoryTransferApi.cancelTransfer(id)

      const index = transfers.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transfers.value[index] = cancelledTransfer
      }

      if (currentTransfer.value?.id === id) {
        currentTransfer.value = cancelledTransfer
      }

      return cancelledTransfer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel transfer'
      console.error('Error cancelling transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadTransfers()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadTransfers()
    }
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadTransfers()
    }
  }

  // Filter actions
  const setFilters = (newFilters: InventoryTransferFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadTransfers()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadTransfers()
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    transfers,
    currentTransfer,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    transfersByStatus,
    completedTransfers,
    pendingTransfers,
    draftTransfers,
    totalValue,

    // Actions
    loadTransfers,
    loadTransferById,
    createTransfer,
    updateTransfer,
    deleteTransfer,
    loadTransferStats,
    completeTransfer,
    cancelTransfer,

    // Pagination
    nextPage,
    previousPage,
    setPage,

    // Filters
    setFilters,
    clearFilters,

    // Utils
    clearError
  }
})