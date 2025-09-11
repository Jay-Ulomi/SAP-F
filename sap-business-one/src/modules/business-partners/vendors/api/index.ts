import { apiClient } from '@/shared/api/apiClient'
import { VendorStatus, VendorType, Currency } from '../types'
import type {
  Vendor,
  VendorFormData,
  VendorFilters,
  VendorResponse,
  VendorListResponse,
  VendorStatsResponse,
  VendorValidationResult,
} from '../types'

// Mock data for development
const mockVendors: Vendor[] = [
  {
    id: '1',
    code: 'V001',
    name: 'ABC Supplies Inc.',
    type: VendorType.SUPPLIER,
    status: VendorStatus.ACTIVE,
    taxId: '12-3456789',
    website: 'https://abcsupplies.com',
    notes: 'Primary supplier for office supplies',
    primaryContact: {
      id: 'c1',
      firstName: 'John',
      lastName: 'Smith',
      position: 'Sales Manager',
      email: 'john.smith@abcsupplies.com',
      phone: '+1-555-0123',
      mobile: '+1-555-0124',
      isPrimary: true,
    },
    contacts: [
      {
        id: 'c1',
        firstName: 'John',
        lastName: 'Smith',
        position: 'Sales Manager',
        email: 'john.smith@abcsupplies.com',
        phone: '+1-555-0123',
        mobile: '+1-555-0124',
        isPrimary: true,
      },
      {
        id: 'c2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        position: 'Customer Service',
        email: 'sarah.johnson@abcsupplies.com',
        phone: '+1-555-0125',
        isPrimary: false,
      },
    ],
    addresses: [
      {
        id: 'a1',
        type: 'BILLING',
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        isDefault: true,
        phone: '+1-555-0123',
      },
      {
        id: 'a2',
        type: 'SHIPPING',
        street: '456 Warehouse Blvd',
        city: 'Newark',
        state: 'NJ',
        country: 'USA',
        postalCode: '07101',
        isDefault: false,
      },
    ],
    financial: {
      currency: Currency.USD,
      creditLimit: 50000,
      currentBalance: 12500,
      paymentTerms: 'NET 30',
      discountPercent: 2.5,
      taxCode: 'VAT',
      taxPercent: 8.875,
      bankAccount: '1234567890',
      bankName: 'Chase Bank',
      bankBranch: 'NYC Main',
      swiftCode: 'CHASUS33',
      iban: 'US64CHAS1234567890',
    },
    statistics: {
      totalOrders: 45,
      totalInvoices: 42,
      totalPayments: 38,
      averageOrderValue: 2800,
      lastOrderDate: '2024-12-15',
      lastInvoiceDate: '2024-12-10',
      lastPaymentDate: '2024-12-05',
      onTimeDeliveryRate: 95.5,
      qualityRating: 4.8,
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-15T14:30:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
  },
  {
    id: '2',
    code: 'V002',
    name: 'Tech Solutions Ltd.',
    type: VendorType.SERVICE_PROVIDER,
    status: VendorStatus.ACTIVE,
    taxId: '98-7654321',
    website: 'https://techsolutions.com',
    notes: 'IT consulting and software development services',
    primaryContact: {
      id: 'c3',
      firstName: 'Michael',
      lastName: 'Chen',
      position: 'Account Manager',
      email: 'michael.chen@techsolutions.com',
      phone: '+1-555-0234',
      isPrimary: true,
    },
    contacts: [
      {
        id: 'c3',
        firstName: 'Michael',
        lastName: 'Chen',
        position: 'Account Manager',
        email: 'michael.chen@techsolutions.com',
        phone: '+1-555-0234',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        id: 'a3',
        type: 'BOTH',
        street: '789 Tech Park',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94105',
        isDefault: true,
        phone: '+1-555-0234',
      },
    ],
    financial: {
      currency: Currency.USD,
      creditLimit: 100000,
      currentBalance: 0,
      paymentTerms: 'NET 15',
      discountPercent: 0,
      taxCode: 'VAT',
      taxPercent: 8.5,
      bankAccount: '0987654321',
      bankName: 'Wells Fargo',
      bankBranch: 'SF Downtown',
      swiftCode: 'WFBIUS6S',
      iban: 'US66WFBI0987654321',
    },
    statistics: {
      totalOrders: 12,
      totalInvoices: 12,
      totalPayments: 12,
      averageOrderValue: 8500,
      lastOrderDate: '2024-12-12',
      lastInvoiceDate: '2024-12-12',
      lastPaymentDate: '2024-12-12',
      onTimeDeliveryRate: 100,
      qualityRating: 5.0,
    },
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-12-12T16:45:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
  },
  {
    id: '3',
    code: 'V003',
    name: 'Global Manufacturing Co.',
    type: VendorType.MANUFACTURER,
    status: VendorStatus.ACTIVE,
    taxId: '45-6789012',
    website: 'https://globalmanufacturing.com',
    notes: 'Custom manufacturing and assembly services',
    primaryContact: {
      id: 'c4',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      position: 'Sales Director',
      email: 'emily.rodriguez@globalmanufacturing.com',
      phone: '+1-555-0345',
      isPrimary: true,
    },
    contacts: [
      {
        id: 'c4',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        position: 'Sales Director',
        email: 'emily.rodriguez@globalmanufacturing.com',
        phone: '+1-555-0345',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        id: 'a4',
        type: 'BOTH',
        street: '321 Industrial Way',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '60601',
        isDefault: true,
        phone: '+1-555-0345',
      },
    ],
    financial: {
      currency: Currency.USD,
      creditLimit: 250000,
      currentBalance: 75000,
      paymentTerms: 'NET 45',
      discountPercent: 3.0,
      taxCode: 'VAT',
      taxPercent: 9.25,
      bankAccount: '1122334455',
      bankName: 'Bank of America',
      bankBranch: 'Chicago Loop',
      swiftCode: 'BOFAUS3N',
      iban: 'US33BOFA1122334455',
    },
    statistics: {
      totalOrders: 28,
      totalInvoices: 25,
      totalPayments: 20,
      averageOrderValue: 15000,
      lastOrderDate: '2024-12-08',
      lastInvoiceDate: '2024-12-05',
      lastPaymentDate: '2024-11-28',
      onTimeDeliveryRate: 92.8,
      qualityRating: 4.6,
    },
    createdAt: '2024-03-10T11:00:00Z',
    updatedAt: '2024-12-08T13:20:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
  },
]

export const vendorApi = {
  // Get all vendors with filters and pagination
  getVendors: async (filters: VendorFilters = {}): Promise<VendorListResponse> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      let filteredVendors = [...mockVendors]

      // Apply filters
      if (filters.status) {
        filteredVendors = filteredVendors.filter((v) => v.status === filters.status)
      }
      if (filters.type) {
        filteredVendors = filteredVendors.filter((v) => v.type === filters.type)
      }
      if (filters.currency) {
        filteredVendors = filteredVendors.filter((v) => v.financial.currency === filters.currency)
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredVendors = filteredVendors.filter(
          (v) =>
            v.name.toLowerCase().includes(searchLower) ||
            v.code.toLowerCase().includes(searchLower) ||
            v.primaryContact.firstName.toLowerCase().includes(searchLower) ||
            v.primaryContact.lastName.toLowerCase().includes(searchLower),
        )
      }
      if (filters.country) {
        filteredVendors = filteredVendors.filter((v) =>
          v.addresses.some((addr) => addr.country === filters.country),
        )
      }
      if (filters.state) {
        filteredVendors = filteredVendors.filter((v) =>
          v.addresses.some((addr) => addr.state === filters.state),
        )
      }
      if (filters.city) {
        filteredVendors = filteredVendors.filter((v) =>
          v.addresses.some((addr) => addr.city === filters.city),
        )
      }
      if (filters.paymentTerms) {
        filteredVendors = filteredVendors.filter(
          (v) => v.financial.paymentTerms === filters.paymentTerms,
        )
      }
      if (filters.creditLimitMin !== undefined) {
        filteredVendors = filteredVendors.filter(
          (v) => v.financial.creditLimit >= filters.creditLimitMin!,
        )
      }
      if (filters.creditLimitMax !== undefined) {
        filteredVendors = filteredVendors.filter(
          (v) => v.financial.creditLimit <= filters.creditLimitMax!,
        )
      }
      if (filters.currentBalanceMin !== undefined) {
        filteredVendors = filteredVendors.filter(
          (v) => v.financial.currentBalance >= filters.currentBalanceMin!,
        )
      }
      if (filters.currentBalanceMax !== undefined) {
        filteredVendors = filteredVendors.filter(
          (v) => v.financial.currentBalance <= filters.currentBalanceMax!,
        )
      }

      const total = filteredVendors.length
      const pagination = {
        page: 1,
        limit: total,
        total,
        totalPages: 1,
        hasMore: false,
      }

      return {
        data: filteredVendors,
        pagination,
        message: 'Vendors retrieved successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to retrieve vendors')
    }
  },

  // Get vendor by ID
  getVendor: async (id: string): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))

      const vendor = mockVendors.find((v) => v.id === id)
      if (!vendor) {
        throw new Error('Vendor not found')
      }

      return {
        data: vendor,
        message: 'Vendor retrieved successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to retrieve vendor')
    }
  },

  // Create new vendor
  createVendor: async (data: VendorFormData): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newVendor: Vendor = {
        id: Date.now().toString(),
        ...data,
        primaryContact: {
          id: `c${Date.now()}`,
          ...data.primaryContact,
        },
        contacts: data.contacts.map((contact, index) => ({
          id: `c${Date.now()}-${index}`,
          ...contact,
        })),
        addresses: data.addresses.map((address, index) => ({
          id: `a${Date.now()}-${index}`,
          ...address,
        })),
        statistics: {
          totalOrders: 0,
          totalInvoices: 0,
          totalPayments: 0,
          averageOrderValue: 0,
          onTimeDeliveryRate: 0,
          qualityRating: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user',
        updatedBy: 'current-user',
      }

      mockVendors.push(newVendor)

      return {
        data: newVendor,
        message: 'Vendor created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to create vendor')
    }
  },

  // Update existing vendor
  updateVendor: async (id: string, data: Partial<VendorFormData>): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))

      const vendorIndex = mockVendors.findIndex((v) => v.id === id)
      if (vendorIndex === -1) {
        throw new Error('Vendor not found')
      }

      const updatedVendor = {
        ...mockVendors[vendorIndex],
        ...data,
        primaryContact: data.primaryContact
          ? {
              id: mockVendors[vendorIndex].primaryContact.id,
              ...data.primaryContact,
            }
          : mockVendors[vendorIndex].primaryContact,
        contacts: data.contacts
          ? data.contacts.map((contact, index) => ({
              id: mockVendors[vendorIndex].contacts[index]?.id || `c${Date.now()}-${index}`,
              ...contact,
            }))
          : mockVendors[vendorIndex].contacts,
        addresses: data.addresses
          ? data.addresses.map((address, index) => ({
              id: mockVendors[vendorIndex].addresses[index]?.id || `a${Date.now()}-${index}`,
              ...address,
            }))
          : mockVendors[vendorIndex].addresses,
        updatedAt: new Date().toISOString(),
        updatedBy: 'current-user',
      }

      mockVendors[vendorIndex] = updatedVendor

      return {
        data: updatedVendor,
        message: 'Vendor updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to update vendor')
    }
  },

  // Delete vendor
  deleteVendor: async (id: string): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const vendorIndex = mockVendors.findIndex((v) => v.id === id)
      if (vendorIndex === -1) {
        throw new Error('Vendor not found')
      }

      mockVendors.splice(vendorIndex, 1)
    } catch (error) {
      throw new Error('Failed to delete vendor')
    }
  },

  // Get vendor statistics
  getVendorStats: async (): Promise<VendorStatsResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))

      const stats = {
        totalVendors: mockVendors.length,
        activeVendors: mockVendors.filter((v) => v.status === VendorStatus.ACTIVE).length,
        inactiveVendors: mockVendors.filter((v) => v.status === VendorStatus.INACTIVE).length,
        suspendedVendors: mockVendors.filter((v) => v.status === VendorStatus.SUSPENDED).length,
        blockedVendors: mockVendors.filter((v) => v.status === VendorStatus.BLOCKED).length,
        totalCreditLimit: mockVendors.reduce((sum, v) => sum + v.financial.creditLimit, 0),
        totalCurrentBalance: mockVendors.reduce((sum, v) => sum + v.financial.currentBalance, 0),
        vendorsByStatus: Object.values(VendorStatus).map((status) => ({
          status,
          count: mockVendors.filter((v) => v.status === status).length,
        })),
        vendorsByType: Object.values(VendorType).map((type) => ({
          type,
          count: mockVendors.filter((v) => v.type === type).length,
        })),
        vendorsByCountry: Array.from(
          new Set(mockVendors.flatMap((v) => v.addresses.map((addr) => addr.country))),
        ).map((country) => ({
          country,
          count: mockVendors.filter((v) => v.addresses.some((addr) => addr.country === country))
            .length,
        })),
        vendorsByCurrency: Object.values(Currency).map((currency) => ({
          currency,
          count: mockVendors.filter((v) => v.financial.currency === currency).length,
        })),
        monthlyTrend: [
          { month: 'Oct 2024', count: 2, amount: 150000 },
          { month: 'Nov 2024', count: 3, amount: 225000 },
          { month: 'Dec 2024', count: 3, amount: 400000 },
        ],
      }

      return {
        data: stats,
        message: 'Vendor statistics retrieved successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to retrieve vendor statistics')
    }
  },

  // Validate vendor data
  validateVendor: async (data: VendorFormData): Promise<VendorValidationResult> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))

      const errors: string[] = []
      const warnings: string[] = []

      // Required field validation
      if (!data.code.trim()) {
        errors.push('Vendor code is required')
      }
      if (!data.name.trim()) {
        errors.push('Vendor name is required')
      }
      if (!data.taxId.trim()) {
        errors.push('Tax ID is required')
      }
      if (!data.primaryContact.firstName.trim()) {
        errors.push('Primary contact first name is required')
      }
      if (!data.primaryContact.lastName.trim()) {
        errors.push('Primary contact last name is required')
      }
      if (!data.primaryContact.email.trim()) {
        errors.push('Primary contact email is required')
      }
      if (!data.primaryContact.phone.trim()) {
        errors.push('Primary contact phone is required')
      }

      // Business logic validation
      if (data.financial.creditLimit < 0) {
        errors.push('Credit limit cannot be negative')
      }
      if (data.financial.discountPercent < 0 || data.financial.discountPercent > 100) {
        errors.push('Discount percent must be between 0 and 100')
      }
      if (data.financial.taxPercent < 0 || data.financial.taxPercent > 100) {
        errors.push('Tax percent must be between 0 and 100')
      }

      // Warnings
      if (data.financial.creditLimit > 1000000) {
        warnings.push('Credit limit is very high, please verify')
      }
      if (data.addresses.length === 0) {
        warnings.push('No addresses provided')
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      }
    } catch (error) {
      throw new Error('Failed to validate vendor data')
    }
  },

  // Business logic operations
  activateVendor: async (id: string): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const vendor = mockVendors.find((v) => v.id === id)
      if (!vendor) {
        throw new Error('Vendor not found')
      }

      vendor.status = VendorStatus.ACTIVE
      vendor.updatedAt = new Date().toISOString()
      vendor.updatedBy = 'current-user'

      return {
        data: vendor,
        message: 'Vendor activated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to activate vendor')
    }
  },

  suspendVendor: async (id: string, reason?: string): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const vendor = mockVendors.find((v) => v.id === id)
      if (!vendor) {
        throw new Error('Vendor not found')
      }

      vendor.status = VendorStatus.SUSPENDED
      vendor.notes = reason ? `${vendor.notes || ''}\nSuspended: ${reason}`.trim() : vendor.notes
      vendor.updatedAt = new Date().toISOString()
      vendor.updatedBy = 'current-user'

      return {
        data: vendor,
        message: 'Vendor suspended successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to suspend vendor')
    }
  },

  blockVendor: async (id: string, reason?: string): Promise<VendorResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const vendor = mockVendors.find((v) => v.id === id)
      if (!vendor) {
        throw new Error('Vendor not found')
      }

      vendor.status = VendorStatus.BLOCKED
      vendor.notes = reason ? `${vendor.notes || ''}\nBlocked: ${reason}`.trim() : vendor.notes
      vendor.updatedAt = new Date().toISOString()
      vendor.updatedBy = 'current-user'

      return {
        data: vendor,
        message: 'Vendor blocked successfully',
        success: true,
      }
    } catch (error) {
      throw new Error('Failed to block vendor')
    }
  },
}
