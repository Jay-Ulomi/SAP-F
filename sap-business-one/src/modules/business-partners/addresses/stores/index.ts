import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { addressApi } from '../api'
import type {
  Address,
  AddressFormData,
  AddressFilters,
  AddressStats,
  AddressPagination,
} from '../types'
import { AddressType, AddressStatus, Country } from '../types'

export const useAddressStore = defineStore('addresses', () => {
  // State
  const addresses = ref<Address[]>([])
  const currentAddress = ref<Address | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<AddressStats | null>(null)
  const pagination = ref<AddressPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const filters = ref<AddressFilters>({})

  // Computed Properties
  const addressesByType = computed(() => {
    const grouped: Record<AddressType, Address[]> = Object.values(AddressType).reduce(
      (acc, type) => {
        acc[type] = addresses.value.filter((address) => address.addressType.includes(type))
        return acc
      },
      {} as Record<AddressType, Address[]>,
    )
    return grouped
  })

  const addressesByStatus = computed(() => {
    const grouped: Record<AddressStatus, Address[]> = Object.values(AddressStatus).reduce(
      (acc, status) => {
        acc[status] = addresses.value.filter((address) => address.status === status)
        return acc
      },
      {} as Record<AddressStatus, Address[]>,
    )
    return grouped
  })

  const addressesByCountry = computed(() => {
    const grouped: Record<Country, Address[]> = Object.values(Country).reduce(
      (acc, country) => {
        acc[country] = addresses.value.filter((address) => address.country === country)
        return acc
      },
      {} as Record<Country, Address[]>,
    )
    return grouped
  })

  const activeAddresses = computed(() =>
    addresses.value.filter((address) => address.status === AddressStatus.ACTIVE),
  )

  const defaultAddresses = computed(() => addresses.value.filter((address) => address.isDefault))

  const verifiedAddresses = computed(() => addresses.value.filter((address) => address.isVerified))

  const businessAddresses = computed(() =>
    addresses.value.filter((address) => address.addressType.includes(AddressType.BUSINESS)),
  )

  const billingAddresses = computed(() =>
    addresses.value.filter((address) => address.addressType.includes(AddressType.BILLING)),
  )

  const shippingAddresses = computed(() =>
    addresses.value.filter((address) => address.addressType.includes(AddressType.SHIPPING)),
  )

  // Actions
  const loadAddresses = async (newFilters?: AddressFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await addressApi.getAddresses(filters.value, {
        page: pagination.value.page,
        limit: pagination.value.limit,
      })

      addresses.value = response.data
      pagination.value.total = response.total
      pagination.value.totalPages = Math.ceil(response.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load addresses'
      console.error('Error loading addresses:', err)
    } finally {
      loading.value = false
    }
  }

  const loadAddress = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const address = await addressApi.getAddress(id)
      currentAddress.value = address
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load address'
      console.error('Error loading address:', err)
    } finally {
      loading.value = false
    }
  }

  const createAddress = async (data: AddressFormData) => {
    try {
      loading.value = true
      error.value = null

      const newAddress = await addressApi.createAddress(data)
      addresses.value.unshift(newAddress)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newAddress
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create address'
      console.error('Error creating address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateAddress = async (id: string, data: AddressFormData) => {
    try {
      loading.value = true
      error.value = null

      const updatedAddress = await addressApi.updateAddress(id, data)
      const index = addresses.value.findIndex((addr) => addr.id === id)
      if (index !== -1) {
        addresses.value[index] = updatedAddress
      }

      if (currentAddress.value?.id === id) {
        currentAddress.value = updatedAddress
      }

      return updatedAddress
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update address'
      console.error('Error updating address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAddress = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await addressApi.deleteAddress(id)
      addresses.value = addresses.value.filter((addr) => addr.id !== id)
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (currentAddress.value?.id === id) {
        currentAddress.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete address'
      console.error('Error deleting address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadAddressStats = async () => {
    try {
      loading.value = true
      error.value = null

      const addressStats = await addressApi.getAddressStats()
      stats.value = addressStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load address stats'
      console.error('Error loading address stats:', err)
    } finally {
      loading.value = false
    }
  }

  const setDefaultAddress = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await addressApi.setDefaultAddress(id)

      // Update local state
      addresses.value.forEach((addr) => {
        addr.isDefault = addr.id === id
      })

      if (currentAddress.value) {
        currentAddress.value.isDefault = currentAddress.value.id === id
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to set default address'
      console.error('Error setting default address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const verifyAddress = async (id: string, verificationMethod: string) => {
    try {
      loading.value = true
      error.value = null

      await addressApi.verifyAddress(id, verificationMethod)

      // Update local state
      const address = addresses.value.find((addr) => addr.id === id)
      if (address) {
        address.isVerified = true
        address.verifiedAt = new Date().toISOString()
        address.verifiedBy = 'admin'
        address.verificationMethod = verificationMethod
        address.updatedAt = new Date().toISOString()
        address.updatedBy = 'admin'
      }

      if (currentAddress.value?.id === id) {
        currentAddress.value.isVerified = true
        currentAddress.value.verifiedAt = new Date().toISOString()
        currentAddress.value.verifiedBy = 'admin'
        currentAddress.value.verificationMethod = verificationMethod
        currentAddress.value.updatedAt = new Date().toISOString()
        currentAddress.value.updatedBy = 'admin'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to verify address'
      console.error('Error verifying address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateAddress = async (id: string, newName: string, newDescription?: string) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedAddress = await addressApi.duplicateAddress(id, newName, newDescription)
      addresses.value.unshift(duplicatedAddress)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return duplicatedAddress
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate address'
      console.error('Error duplicating address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    pagination.value.page = page
    loadAddresses()
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    loadAddresses()
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page += 1
      loadAddresses()
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page -= 1
      loadAddresses()
    }
  }

  // Filter actions
  const setFilters = (newFilters: AddressFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadAddresses()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadAddresses()
  }

  const resetStore = () => {
    addresses.value = []
    currentAddress.value = null
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
    addresses,
    currentAddress,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    addressesByType,
    addressesByStatus,
    addressesByCountry,
    activeAddresses,
    defaultAddresses,
    verifiedAddresses,
    businessAddresses,
    billingAddresses,
    shippingAddresses,

    // Actions
    loadAddresses,
    loadAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    loadAddressStats,
    setDefaultAddress,
    verifyAddress,
    duplicateAddress,

    // Pagination
    setPage,
    setLimit,
    nextPage,
    previousPage,

    // Filters
    setFilters,
    clearFilters,

    // Utility
    resetStore,
  }
})
