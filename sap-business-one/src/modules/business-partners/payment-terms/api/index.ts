import type {
  PaymentTerm,
  PaymentTermFormData,
  PaymentTermFilters,
  PaymentTermStats,
  PaymentTermPagination,
} from '../types'
import { PaymentTermType, PaymentMethod, Currency } from '../types'

// Mock data
const mockPaymentTerms: PaymentTerm[] = [
  {
    id: '1',
    code: 'NET30',
    name: 'Net 30 Days',
    description: 'Payment due within 30 days of invoice date',
    type: PaymentTermType.NET_DAYS,
    netDays: 30,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: Currency.USD,
    isActive: true,
    isDefault: false,
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
  {
    id: '2',
    code: 'NET15',
    name: 'Net 15 Days',
    description: 'Payment due within 15 days of invoice date',
    type: PaymentTermType.NET_DAYS,
    netDays: 15,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: Currency.USD,
    isActive: true,
    isDefault: false,
    sortOrder: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
  {
    id: '3',
    code: '2/10NET30',
    name: '2/10 Net 30',
    description: '2% discount if paid within 10 days, otherwise net 30 days',
    type: PaymentTermType.NET_DAYS,
    netDays: 30,
    discountDays: 10,
    discountPercent: 2,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: Currency.USD,
    isActive: true,
    isDefault: true,
    sortOrder: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
  {
    id: '4',
    code: 'EOM',
    name: 'End of Month',
    description: 'Payment due at the end of the month following invoice date',
    type: PaymentTermType.END_OF_MONTH,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: Currency.USD,
    isActive: true,
    isDefault: false,
    sortOrder: 4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
  {
    id: '5',
    code: 'IMMEDIATE',
    name: 'Immediate Payment',
    description: 'Payment due immediately upon receipt of invoice',
    type: PaymentTermType.IMMEDIATE,
    paymentMethod: PaymentMethod.CASH,
    currency: Currency.USD,
    isActive: true,
    isDefault: false,
    sortOrder: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
]

// Mock API client
const apiClient = {
  get: async (url: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url === '/api/payment-terms') {
      return { data: mockPaymentTerms, total: mockPaymentTerms.length }
    }

    if (url.startsWith('/api/payment-terms/')) {
      const id = url.split('/').pop()
      const paymentTerm = mockPaymentTerms.find((pt) => pt.id === id)
      if (paymentTerm) {
        return { data: paymentTerm }
      }
      throw new Error('Payment term not found')
    }

    if (url === '/api/payment-terms/stats') {
      const stats: PaymentTermStats = {
        totalPaymentTerms: mockPaymentTerms.length,
        activePaymentTerms: mockPaymentTerms.filter((pt) => pt.isActive).length,
        defaultPaymentTerms: mockPaymentTerms.filter((pt) => pt.isDefault).length,
        netDaysTerms: mockPaymentTerms.filter((pt) => pt.type === PaymentTermType.NET_DAYS).length,
        endOfMonthTerms: mockPaymentTerms.filter((pt) => pt.type === PaymentTermType.END_OF_MONTH).length,
        fixedDateTerms: mockPaymentTerms.filter((pt) => pt.type === PaymentTermType.FIXED_DATE).length,
        immediateTerms: mockPaymentTerms.filter((pt) => pt.type === PaymentTermType.IMMEDIATE).length,
        customTerms: mockPaymentTerms.filter((pt) => pt.type === PaymentTermType.CUSTOM).length,
        termsWithDiscount: mockPaymentTerms.filter((pt) => pt.discountPercent && pt.discountPercent > 0).length,
        averageNetDays: mockPaymentTerms
          .filter((pt) => pt.netDays)
          .reduce((sum, pt) => sum + (pt.netDays || 0), 0) / mockPaymentTerms.filter((pt) => pt.netDays).length || 0,
        mostUsedCurrency: Currency.USD,
        mostUsedPaymentMethod: PaymentMethod.BANK_TRANSFER,
      }
      return { data: stats }
    }

    throw new Error('Endpoint not found')
  },

  post: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (url === '/api/payment-terms') {
      const newPaymentTerm: PaymentTerm = {
        id: `pt-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User',
        updatedBy: 'Current User',
      }
      mockPaymentTerms.push(newPaymentTerm)
      return { data: newPaymentTerm }
    }

    throw new Error('Endpoint not found')
  },

  put: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (url.startsWith('/api/payment-terms/')) {
      const id = url.split('/').pop()
      const paymentTermIndex = mockPaymentTerms.findIndex((pt) => pt.id === id)

      if (paymentTermIndex === -1) {
        throw new Error('Payment term not found')
      }

      const updatedPaymentTerm: PaymentTerm = {
        ...mockPaymentTerms[paymentTermIndex],
        ...data,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Current User',
      }

      mockPaymentTerms[paymentTermIndex] = updatedPaymentTerm
      return { data: updatedPaymentTerm }
    }

    throw new Error('Endpoint not found')
  },

  delete: async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url.startsWith('/api/payment-terms/')) {
      const id = url.split('/').pop()
      const paymentTermIndex = mockPaymentTerms.findIndex((pt) => pt.id === id)

      if (paymentTermIndex === -1) {
        throw new Error('Payment term not found')
      }

      mockPaymentTerms.splice(paymentTermIndex, 1)
      return { success: true }
    }

    throw new Error('Endpoint not found')
  },
}

// Payment Terms API service
export const paymentTermApi = {
  // Get all payment terms with optional filtering
  getPaymentTerms: async (
    filters?: PaymentTermFilters,
    pagination?: { page: number; limit: number },
  ): Promise<{ data: PaymentTerm[]; total: number }> => {
    try {
      let filteredTerms = [...mockPaymentTerms]

      // Apply filters
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        filteredTerms = filteredTerms.filter(
          (term) =>
            term.code.toLowerCase().includes(search) ||
            term.name.toLowerCase().includes(search) ||
            term.description?.toLowerCase().includes(search),
        )
      }

      if (filters?.type && filters.type.length > 0) {
        filteredTerms = filteredTerms.filter((term) => filters.type!.includes(term.type))
      }

      if (filters?.paymentMethod && filters.paymentMethod.length > 0) {
        filteredTerms = filteredTerms.filter((term) => filters.paymentMethod!.includes(term.paymentMethod))
      }

      if (filters?.currency && filters.currency.length > 0) {
        filteredTerms = filteredTerms.filter((term) => filters.currency!.includes(term.currency))
      }

      if (filters?.isActive !== undefined) {
        filteredTerms = filteredTerms.filter((term) => term.isActive === filters.isActive)
      }

      if (filters?.isDefault !== undefined) {
        filteredTerms = filteredTerms.filter((term) => term.isDefault === filters.isDefault)
      }

      if (filters?.hasDiscount !== undefined) {
        if (filters.hasDiscount) {
          filteredTerms = filteredTerms.filter((term) => term.discountPercent && term.discountPercent > 0)
        } else {
          filteredTerms = filteredTerms.filter((term) => !term.discountPercent || term.discountPercent === 0)
        }
      }

      if (filters?.netDaysRange) {
        filteredTerms = filteredTerms.filter(
          (term) =>
            term.netDays &&
            term.netDays >= filters.netDaysRange!.min &&
            term.netDays <= filters.netDaysRange!.max,
        )
      }

      const total = filteredTerms.length

      // Apply pagination
      if (pagination) {
        const start = (pagination.page - 1) * pagination.limit
        const end = start + pagination.limit
        filteredTerms = filteredTerms.slice(start, end)
      }

      return { data: filteredTerms, total }
    } catch (error) {
      console.error('Error fetching payment terms:', error)
      throw error
    }
  },

  // Get a single payment term by ID
  getPaymentTerm: async (id: string): Promise<PaymentTerm> => {
    try {
      const response = await apiClient.get(`/api/payment-terms/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching payment term:', error)
      throw error
    }
  },

  // Create a new payment term
  createPaymentTerm: async (data: PaymentTermFormData): Promise<PaymentTerm> => {
    try {
      const response = await apiClient.post('/api/payment-terms', data)
      return response.data
    } catch (error) {
      console.error('Error creating payment term:', error)
      throw error
    }
  },

  // Update an existing payment term
  updatePaymentTerm: async (id: string, data: Partial<PaymentTermFormData>): Promise<PaymentTerm> => {
    try {
      const response = await apiClient.put(`/api/payment-terms/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating payment term:', error)
      throw error
    }
  },

  // Delete a payment term
  deletePaymentTerm: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/payment-terms/${id}`)
    } catch (error) {
      console.error('Error deleting payment term:', error)
      throw error
    }
  },

  // Get payment term statistics
  getPaymentTermStats: async (): Promise<PaymentTermStats> => {
    try {
      const response = await apiClient.get('/api/payment-terms/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching payment term stats:', error)
      throw error
    }
  },

  // Validate payment term data
  validatePaymentTerm: async (data: PaymentTermFormData): Promise<{ valid: boolean; errors: string[] }> => {
    const errors: string[] = []

    if (!data.code?.trim()) {
      errors.push('Payment term code is required')
    }

    if (!data.name?.trim()) {
      errors.push('Payment term name is required')
    }

    if (data.type === PaymentTermType.NET_DAYS && (!data.netDays || data.netDays <= 0)) {
      errors.push('Net days must be greater than 0 for Net Days payment terms')
    }

    if (data.type === PaymentTermType.FIXED_DATE && !data.dueDate) {
      errors.push('Due date is required for Fixed Date payment terms')
    }

    if (data.discountPercent && (data.discountPercent < 0 || data.discountPercent > 100)) {
      errors.push('Discount percentage must be between 0 and 100')
    }

    if (data.discountDays && data.discountDays <= 0) {
      errors.push('Discount days must be greater than 0')
    }

    if (data.sortOrder && data.sortOrder < 0) {
      errors.push('Sort order cannot be negative')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  },

  // Set default payment term
  setDefaultPaymentTerm: async (id: string): Promise<PaymentTerm> => {
    try {
      // Remove default from all other terms
      mockPaymentTerms.forEach((term) => {
        if (term.id !== id) {
          term.isDefault = false
          term.updatedAt = new Date().toISOString()
          term.updatedBy = 'Current User'
        }
      })

      // Set the specified term as default
      const paymentTerm = mockPaymentTerms.find((pt) => pt.id === id)
      if (!paymentTerm) {
        throw new Error('Payment term not found')
      }

      paymentTerm.isDefault = true
      paymentTerm.updatedAt = new Date().toISOString()
      paymentTerm.updatedBy = 'Current User'

      return paymentTerm
    } catch (error) {
      console.error('Error setting default payment term:', error)
      throw error
    }
  },

  // Duplicate payment term
  duplicatePaymentTerm: async (id: string, newCode: string, newName: string): Promise<PaymentTerm> => {
    try {
      const originalTerm = mockPaymentTerms.find((pt) => pt.id === id)
      if (!originalTerm) {
        throw new Error('Payment term not found')
      }

      const duplicatedTerm: PaymentTerm = {
        ...originalTerm,
        id: `pt-${Date.now()}`,
        code: newCode,
        name: newName,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User',
        updatedBy: 'Current User',
      }

      mockPaymentTerms.push(duplicatedTerm)
      return duplicatedTerm
    } catch (error) {
      console.error('Error duplicating payment term:', error)
      throw error
    }
  },
}
