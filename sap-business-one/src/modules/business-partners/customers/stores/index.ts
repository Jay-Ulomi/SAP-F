import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { customerApi } from '../api'
import type {
  Customer,
  CustomerFormData,
  CustomerFilters,
  CustomerStats,
  CustomerPagination,
} from '../types'
import { CustomerStatus, CustomerType, PaymentTerms, Currency, TaxExemption } from '../types'

export const useCustomerStore = defineStore('customers', () => {
  // State
  const customers = ref<Customer[]>([])
  const currentCustomer = ref<Customer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CustomerStats | null>(null)

  // Pagination
  const pagination = ref<CustomerPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<CustomerFilters>({})

  // Computed Properties
  const customersByStatus = computed(() => {
    const grouped: Record<CustomerStatus, Customer[]> = {
      [CustomerStatus.ACTIVE]: [],
      [CustomerStatus.INACTIVE]: [],
      [CustomerStatus.SUSPENDED]: [],
      [CustomerStatus.PENDING_APPROVAL]: [],
      [CustomerStatus.BLOCKED]: [],
    }

    customers.value.forEach((customer) => {
      grouped[customer.status].push(customer)
    })

    return grouped
  })

  const customersByType = computed(() => {
    const grouped: Record<CustomerType, Customer[]> = {
      [CustomerType.REGULAR]: [],
      [CustomerType.PREMIUM]: [],
      [CustomerType.WHOLESALE]: [],
      [CustomerType.RETAIL]: [],
      [CustomerType.DISTRIBUTOR]: [],
      [CustomerType.RESELLER]: [],
    }

    customers.value.forEach((customer) => {
      grouped[customer.type].push(customer)
    })

    return grouped
  })

  const activeCustomers = computed(() =>
    customers.value.filter((customer) => customer.status === CustomerStatus.ACTIVE),
  )

  const pendingApprovalCustomers = computed(() =>
    customers.value.filter((customer) => customer.status === CustomerStatus.PENDING_APPROVAL),
  )

  const customersWithOutstandingBalance = computed(() =>
    customers.value.filter((customer) => customer.financial.currentBalance > 0),
  )

  const totalRevenue = computed(() =>
    customers.value.reduce((sum, customer) => sum + customer.statistics.totalRevenue, 0),
  )

  const averageCreditLimit = computed(() => {
    if (customers.value.length === 0) return 0
    const total = customers.value.reduce((sum, customer) => sum + customer.financial.creditLimit, 0)
    return total / customers.value.length
  })

  const newCustomersThisMonth = computed(() => {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return customers.value.filter((customer) => new Date(customer.createdAt) >= thisMonth).length
  })

  // Actions
  const loadCustomers = async (
    newFilters?: CustomerFilters,
    newPagination?: Partial<CustomerPagination>,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }

      const result = await customerApi.getCustomers(filters.value, pagination.value)
      customers.value = result.customers
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customers'
    } finally {
      loading.value = false
    }
  }

  const loadCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.getCustomer(id)
      if (customer) {
        currentCustomer.value = customer
      } else {
        error.value = 'Customer not found'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customer'
    } finally {
      loading.value = false
    }
  }

  const createCustomer = async (customerData: CustomerFormData) => {
    try {
      loading.value = true
      error.value = null

      const newCustomer = await customerApi.createCustomer(customerData)
      customers.value.unshift(newCustomer)
      pagination.value.total += 1

      return newCustomer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (id: string, customerData: Partial<CustomerFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedCustomer = await customerApi.updateCustomer(id, customerData)
      if (updatedCustomer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = updatedCustomer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = updatedCustomer
        }

        return updatedCustomer
      } else {
        error.value = 'Customer not found'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const success = await customerApi.deleteCustomer(id)
      if (success) {
        customers.value = customers.value.filter((c) => c.id !== id)
        pagination.value.total -= 1

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = null
        }

        return true
      } else {
        error.value = 'Customer not found'
        return false
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Business Logic Actions
  const activateCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.activateCustomer(id)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to activate customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const suspendCustomer = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.suspendCustomer(id, reason)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to suspend customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const blockCustomer = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.blockCustomer(id, reason)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to block customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.approveCustomer(id)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCreditLimit = async (id: string, newLimit: number) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.updateCreditLimit(id, newLimit)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update credit limit'
      throw err
    } finally {
      loading.value = false
    }
  }

  const recordPayment = async (id: string, amount: number) => {
    try {
      loading.value = true
      error.value = null

      const customer = await customerApi.recordPayment(id, amount)
      if (customer) {
        const index = customers.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          customers.value[index] = customer
        }

        if (currentCustomer.value?.id === id) {
          currentCustomer.value = customer
        }

        return customer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to record payment'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility Actions
  const copyCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedCustomer = await customerApi.copyCustomer(id)
      if (copiedCustomer) {
        customers.value.unshift(copiedCustomer)
        pagination.value.total += 1
        return copiedCustomer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy customer'
      throw err
    } finally {
      loading.value = false
    }
  }

  const mergeCustomers = async (primaryId: string, secondaryId: string) => {
    try {
      loading.value = true
      error.value = null

      const mergedCustomer = await customerApi.mergeCustomers(primaryId, secondaryId)
      if (mergedCustomer) {
        // Update the primary customer in the list
        const index = customers.value.findIndex((c) => c.id === primaryId)
        if (index !== -1) {
          customers.value[index] = mergedCustomer
        }

        // Remove the secondary customer
        customers.value = customers.value.filter((c) => c.id !== secondaryId)
        pagination.value.total -= 1

        if (currentCustomer.value?.id === secondaryId) {
          currentCustomer.value = mergedCustomer
        }

        return mergedCustomer
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to merge customers'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Statistics Actions
  const loadCustomerStats = async () => {
    try {
      loading.value = true
      error.value = null

      const customerStats = await customerApi.getCustomerStats()
      stats.value = customerStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customer statistics'
    } finally {
      loading.value = false
    }
  }

  // Validation Actions
  const validateCustomer = async (customerData: CustomerFormData) => {
    try {
      return await customerApi.validateCustomer(customerData)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate customer'
      return { isValid: false, errors: ['Validation failed'] }
    }
  }

  // Filter Management
  const updateFilters = (newFilters: Partial<CustomerFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  // Pagination Controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadCustomers()
    }
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      goToPage(pagination.value.page + 1)
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      goToPage(pagination.value.page - 1)
    }
  }

  const setPageSize = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    loadCustomers()
  }

  // State Clearing
  const clearCurrentCustomer = () => {
    currentCustomer.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const resetStore = () => {
    customers.value = []
    currentCustomer.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    }
    filters.value = {}
  }

  return {
    // State
    customers,
    currentCustomer,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed Properties
    customersByStatus,
    customersByType,
    activeCustomers,
    pendingApprovalCustomers,
    customersWithOutstandingBalance,
    totalRevenue,
    averageCreditLimit,
    newCustomersThisMonth,

    // Actions
    loadCustomers,
    loadCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    activateCustomer,
    suspendCustomer,
    blockCustomer,
    approveCustomer,
    updateCreditLimit,
    recordPayment,
    copyCustomer,
    mergeCustomers,
    loadCustomerStats,
    validateCustomer,

    // Filter Management
    updateFilters,
    clearFilters,

    // Pagination Controls
    goToPage,
    nextPage,
    previousPage,
    setPageSize,

    // State Management
    clearCurrentCustomer,
    clearError,
    resetStore,
  }
})
