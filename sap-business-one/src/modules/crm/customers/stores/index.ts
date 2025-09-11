import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { customerApi } from '../api'
import type {
  Customer,
  CustomerFormData,
  CustomerFilters,
  CustomerStats,
  CustomerPagination
} from '../types'
import { CustomerStatus, CustomerType, CustomerIndustry, CustomerSource, CustomerPriority } from '../types'

export const useCustomerStore = defineStore('customer', () => {
  // State
  const customers = ref<Customer[]>([])
  const currentCustomer = ref<Customer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CustomerStats | null>(null)
  const pagination = ref<CustomerPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<CustomerFilters>({})

  // Computed properties
  const customersByStatus = computed(() => {
    const grouped: Record<CustomerStatus, Customer[]> = {
      [CustomerStatus.ACTIVE]: [],
      [CustomerStatus.INACTIVE]: [],
      [CustomerStatus.SUSPENDED]: [],
      [CustomerStatus.PROSPECT]: [],
      [CustomerStatus.LEAD]: [],
      [CustomerStatus.CANCELLED]: []
    }
    
    customers.value.forEach(customer => {
      grouped[customer.status].push(customer)
    })
    
    return grouped
  })

  const customersByType = computed(() => {
    const grouped: Record<CustomerType, Customer[]> = {
      [CustomerType.INDIVIDUAL]: [],
      [CustomerType.CORPORATE]: [],
      [CustomerType.SME]: [],
      [CustomerType.ENTERPRISE]: [],
      [CustomerType.PARTNER]: [],
      [CustomerType.DISTRIBUTOR]: []
    }
    
    customers.value.forEach(customer => {
      grouped[customer.type].push(customer)
    })
    
    return grouped
  })

  const activeCustomers = computed(() => 
    customers.value.filter(customer => customer.status === CustomerStatus.ACTIVE)
  )

  const prospectCustomers = computed(() => 
    customers.value.filter(customer => customer.status === CustomerStatus.PROSPECT)
  )

  const leadCustomers = computed(() => 
    customers.value.filter(customer => customer.status === CustomerStatus.LEAD)
  )

  const highPriorityCustomers = computed(() => 
    customers.value.filter(customer => 
      customer.priority === CustomerPriority.HIGH || customer.priority === CustomerPriority.CRITICAL
    )
  )

  // Actions
  const loadCustomers = async () => {
    try {
      loading.value = true
      error.value = null
      
      const result = await customerApi.getCustomers(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )
      
      customers.value = result.customers
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customers'
      console.error('Error loading customers:', err)
    } finally {
      loading.value = false
    }
  }

  const createCustomer = async (data: CustomerFormData) => {
    try {
      loading.value = true
      error.value = null
      
      const newCustomer = await customerApi.createCustomer(data)
      customers.value.unshift(newCustomer)
      
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return newCustomer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create customer'
      console.error('Error creating customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (id: string, data: Partial<CustomerFormData>) => {
    try {
      loading.value = true
      error.value = null
      
      const updatedCustomer = await customerApi.updateCustomer(id, data)
      
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1) {
        customers.value[index] = updatedCustomer
      }
      
      if (currentCustomer.value?.id === id) {
        currentCustomer.value = updatedCustomer
      }
      
      return updatedCustomer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update customer'
      console.error('Error updating customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      await customerApi.deleteCustomer(id)
      
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1) {
        customers.value.splice(index, 1)
      }
      
      if (currentCustomer.value?.id === id) {
        currentCustomer.value = null
      }
      
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      
      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete customer'
      console.error('Error deleting customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadCustomerStats = async () => {
    try {
      loading.value = true
      error.value = null
      
      const customerStats = await customerApi.getCustomerStats()
      stats.value = customerStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customer statistics'
      console.error('Error loading customer statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadCustomers()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadCustomers()
    }
  }

  // Filter actions
  const setFilters = (newFilters: CustomerFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadCustomers()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadCustomers()
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
    
    // Computed
    customersByStatus,
    customersByType,
    activeCustomers,
    prospectCustomers,
    leadCustomers,
    highPriorityCustomers,
    
    // Actions
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    loadCustomerStats,
    
    // Pagination
    nextPage,
    previousPage,
    
    // Filters
    setFilters,
    clearFilters
  }
})
