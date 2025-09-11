import type {
  Address,
  AddressFormData,
  AddressFilters,
  AddressStats,
  AddressPagination,
} from '../types'
import { AddressType, AddressStatus, Country } from '../types'

// Mock data
const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Main Office',
    description: 'Primary business location',
    addressType: [AddressType.BUSINESS, AddressType.HEADQUARTERS],
    status: AddressStatus.ACTIVE,
    isDefault: true,
    isVerified: true,
    addressLine1: '123 Business Plaza',
    addressLine2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: Country.US,
    contactPerson: 'John Smith',
    phone: '+1-555-0123',
    email: 'office@company.com',
    companyId: 'comp-001',
    companyName: 'ABC Corporation',
    taxId: '12-3456789',
    businessLicense: 'BL-001234',
    latitude: 40.7589,
    longitude: -73.9851,
    timezone: 'America/New_York',
    notes: 'Main corporate headquarters',
    tags: ['headquarters', 'main-office', 'corporate'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    verifiedAt: '2024-01-15T10:00:00Z',
    verifiedBy: 'admin',
    verificationMethod: 'MANUAL',
  },
  {
    id: '2',
    name: 'Warehouse Facility',
    description: 'Primary distribution center',
    addressType: [AddressType.WAREHOUSE, AddressType.BUSINESS],
    status: AddressStatus.ACTIVE,
    isDefault: false,
    isVerified: true,
    addressLine1: '456 Industrial Blvd',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60601',
    country: Country.US,
    contactPerson: 'Sarah Johnson',
    phone: '+1-555-0456',
    email: 'warehouse@company.com',
    companyId: 'comp-001',
    companyName: 'ABC Corporation',
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: 'America/Chicago',
    notes: 'Main distribution warehouse',
    tags: ['warehouse', 'distribution', 'logistics'],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    verifiedAt: '2024-01-20T14:30:00Z',
    verifiedBy: 'admin',
    verificationMethod: 'MANUAL',
  },
  {
    id: '3',
    name: 'European Branch',
    description: 'European operations center',
    addressType: [AddressType.BRANCH, AddressType.BUSINESS],
    status: AddressStatus.ACTIVE,
    isDefault: false,
    isVerified: true,
    addressLine1: '789 Business Street',
    city: 'London',
    state: 'England',
    postalCode: 'SW1A 1AA',
    country: Country.UK,
    contactPerson: 'Michael Brown',
    phone: '+44-20-7946-0958',
    email: 'europe@company.com',
    companyId: 'comp-001',
    companyName: 'ABC Corporation',
    taxId: 'GB-123456789',
    businessLicense: 'UK-BL-789012',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    notes: 'European regional office',
    tags: ['europe', 'branch', 'international'],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    verifiedAt: '2024-02-01T09:00:00Z',
    verifiedBy: 'admin',
    verificationMethod: 'MANUAL',
  },
  {
    id: '4',
    name: 'Billing Address',
    description: 'Primary billing location',
    addressType: [AddressType.BILLING],
    status: AddressStatus.ACTIVE,
    isDefault: false,
    isVerified: true,
    addressLine1: '123 Business Plaza',
    addressLine2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: Country.US,
    contactPerson: 'Finance Department',
    phone: '+1-555-0123',
    email: 'billing@company.com',
    companyId: 'comp-001',
    companyName: 'ABC Corporation',
    notes: 'Primary billing address',
    tags: ['billing', 'finance'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    verifiedAt: '2024-01-15T10:00:00Z',
    verifiedBy: 'admin',
    verificationMethod: 'MANUAL',
  },
  {
    id: '5',
    name: 'Shipping Address',
    description: 'Primary shipping location',
    addressType: [AddressType.SHIPPING],
    status: AddressStatus.ACTIVE,
    isDefault: false,
    isVerified: true,
    addressLine1: '456 Industrial Blvd',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60601',
    country: Country.US,
    contactPerson: 'Logistics Team',
    phone: '+1-555-0456',
    email: 'shipping@company.com',
    companyId: 'comp-001',
    companyName: 'ABC Corporation',
    notes: 'Primary shipping address',
    tags: ['shipping', 'logistics'],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    verifiedAt: '2024-01-20T14:30:00Z',
    verifiedBy: 'admin',
    verificationMethod: 'MANUAL',
  },
]

// Mock API client
const apiClient = {
  get: async (url: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return { data: mockAddresses }
  },
  post: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const newAddress = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
    }
    mockAddresses.push(newAddress)
    return { data: newAddress }
  },
  put: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const index = mockAddresses.findIndex((addr) => addr.id === data.id)
    if (index !== -1) {
      mockAddresses[index] = {
        ...mockAddresses[index],
        ...data,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin',
      }
      return { data: mockAddresses[index] }
    }
    throw new Error('Address not found')
  },
  delete: async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const id = url.split('/').pop()
    const index = mockAddresses.findIndex((addr) => addr.id === id)
    if (index !== -1) {
      mockAddresses.splice(index, 1)
      return { success: true }
    }
    throw new Error('Address not found')
  },
}

// Address Management API service
export const addressApi = {
  getAddresses: async (
    filters?: AddressFilters,
    pagination?: { page: number; limit: number },
  ): Promise<{ data: Address[]; total: number }> => {
    try {
      let filteredAddresses = [...mockAddresses]

      // Apply filters
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        filteredAddresses = filteredAddresses.filter(
          (address) =>
            address.name.toLowerCase().includes(searchLower) ||
            address.city.toLowerCase().includes(searchLower) ||
            address.state.toLowerCase().includes(searchLower) ||
            address.companyName?.toLowerCase().includes(searchLower) ||
            address.description?.toLowerCase().includes(searchLower),
        )
      }

      if (filters?.addressType && filters.addressType.length > 0) {
        filteredAddresses = filteredAddresses.filter((address) =>
          address.addressType.some((type) => filters.addressType!.includes(type)),
        )
      }

      if (filters?.status) {
        filteredAddresses = filteredAddresses.filter((address) => address.status === filters.status)
      }

      if (filters?.country) {
        filteredAddresses = filteredAddresses.filter(
          (address) => address.country === filters.country,
        )
      }

      if (filters?.city) {
        filteredAddresses = filteredAddresses.filter((address) =>
          address.city.toLowerCase().includes(filters.city!.toLowerCase()),
        )
      }

      if (filters?.state) {
        filteredAddresses = filteredAddresses.filter((address) =>
          address.state.toLowerCase().includes(filters.state!.toLowerCase()),
        )
      }

      if (filters?.companyId) {
        filteredAddresses = filteredAddresses.filter(
          (address) => address.companyId === filters.companyId,
        )
      }

      if (filters?.isDefault !== undefined) {
        filteredAddresses = filteredAddresses.filter(
          (address) => address.isDefault === filters.isDefault,
        )
      }

      if (filters?.isVerified !== undefined) {
        filteredAddresses = filteredAddresses.filter(
          (address) => address.isVerified === filters.isVerified,
        )
      }

      const total = filteredAddresses.length

      // Apply pagination
      if (pagination) {
        const start = (pagination.page - 1) * pagination.limit
        const end = start + pagination.limit
        filteredAddresses = filteredAddresses.slice(start, end)
      }

      return { data: filteredAddresses, total }
    } catch (error) {
      console.error('Error fetching addresses:', error)
      throw error
    }
  },

  getAddress: async (id: string): Promise<Address> => {
    try {
      const address = mockAddresses.find((addr) => addr.id === id)
      if (!address) {
        throw new Error('Address not found')
      }
      return address
    } catch (error) {
      console.error('Error fetching address:', error)
      throw error
    }
  },

  createAddress: async (data: AddressFormData): Promise<Address> => {
    try {
      const response = await apiClient.post('/addresses', data)
      return response.data
    } catch (error) {
      console.error('Error creating address:', error)
      throw error
    }
  },

  updateAddress: async (id: string, data: AddressFormData): Promise<Address> => {
    try {
      const response = await apiClient.put(`/addresses/${id}`, { ...data, id })
      return response.data
    } catch (error) {
      console.error('Error updating address:', error)
      throw error
    }
  },

  deleteAddress: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/addresses/${id}`)
    } catch (error) {
      console.error('Error deleting address:', error)
      throw error
    }
  },

  getAddressStats: async (): Promise<AddressStats> => {
    try {
      const addresses = mockAddresses

      // Calculate stats
      const totalAddresses = addresses.length
      const activeAddresses = addresses.filter(
        (addr) => addr.status === AddressStatus.ACTIVE,
      ).length
      const defaultAddresses = addresses.filter((addr) => addr.isDefault).length
      const verifiedAddresses = addresses.filter((addr) => addr.isVerified).length

      // Group by type
      const addressesByType: Record<AddressType, number> = Object.values(AddressType).reduce(
        (acc, type) => {
          acc[type] = addresses.filter((addr) => addr.addressType.includes(type)).length
          return acc
        },
        {} as Record<AddressType, number>,
      )

      // Group by country
      const addressesByCountry: Record<Country, number> = Object.values(Country).reduce(
        (acc, country) => {
          acc[country] = addresses.filter((addr) => addr.country === country).length
          return acc
        },
        {} as Record<Country, number>,
      )

      // Group by status
      const addressesByStatus: Record<AddressStatus, number> = Object.values(AddressStatus).reduce(
        (acc, status) => {
          acc[status] = addresses.filter((addr) => addr.status === status).length
          return acc
        },
        {} as Record<AddressStatus, number>,
      )

      return {
        totalAddresses,
        activeAddresses,
        defaultAddresses,
        verifiedAddresses,
        addressesByType,
        addressesByCountry,
        addressesByStatus,
      }
    } catch (error) {
      console.error('Error fetching address stats:', error)
      throw error
    }
  },

  validateAddress: async (
    data: AddressFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> => {
    try {
      const errors: string[] = []

      if (!data.name.trim()) {
        errors.push('Address name is required')
      }

      if (!data.addressLine1.trim()) {
        errors.push('Address line 1 is required')
      }

      if (!data.city.trim()) {
        errors.push('City is required')
      }

      if (!data.state.trim()) {
        errors.push('State is required')
      }

      if (!data.postalCode.trim()) {
        errors.push('Postal code is required')
      }

      if (!data.country) {
        errors.push('Country is required')
      }

      if (data.addressType.length === 0) {
        errors.push('At least one address type is required')
      }

      return {
        isValid: errors.length === 0,
        errors,
      }
    } catch (error) {
      console.error('Error validating address:', error)
      throw error
    }
  },

  setDefaultAddress: async (id: string): Promise<void> => {
    try {
      // Remove default from all addresses
      mockAddresses.forEach((addr) => {
        addr.isDefault = false
        addr.updatedAt = new Date().toISOString()
        addr.updatedBy = 'admin'
      })

      // Set new default
      const address = mockAddresses.find((addr) => addr.id === id)
      if (address) {
        address.isDefault = true
        address.updatedAt = new Date().toISOString()
        address.updatedBy = 'admin'
      }
    } catch (error) {
      console.error('Error setting default address:', error)
      throw error
    }
  },

  verifyAddress: async (id: string, verificationMethod: string): Promise<void> => {
    try {
      const address = mockAddresses.find((addr) => addr.id === id)
      if (address) {
        address.isVerified = true
        address.verifiedAt = new Date().toISOString()
        address.verifiedBy = 'admin'
        address.verificationMethod = verificationMethod
        address.updatedAt = new Date().toISOString()
        address.updatedBy = 'admin'
      }
    } catch (error) {
      console.error('Error verifying address:', error)
      throw error
    }
  },

  duplicateAddress: async (
    id: string,
    newName: string,
    newDescription?: string,
  ): Promise<Address> => {
    try {
      const originalAddress = mockAddresses.find((addr) => addr.id === id)
      if (!originalAddress) {
        throw new Error('Address not found')
      }

      const newAddress: Address = {
        ...originalAddress,
        id: Date.now().toString(),
        name: newName,
        description: newDescription || originalAddress.description,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin',
        verifiedAt: undefined,
        verifiedBy: undefined,
        verificationMethod: undefined,
        isVerified: false,
      }

      mockAddresses.push(newAddress)
      return newAddress
    } catch (error) {
      console.error('Error duplicating address:', error)
      throw error
    }
  },
}
