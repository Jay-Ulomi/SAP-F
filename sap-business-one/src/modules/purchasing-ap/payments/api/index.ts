import type {
  Payment,
  PaymentFormData,
  PaymentFilters,
  PaymentStats,
  PaymentPagination,
} from '../types'
import { PaymentStatus, PaymentMethod, PaymentType, Currency } from '../types'

// Mock data
const mockPayments: Payment[] = [
  {
    id: 'pay-001',
    paymentNumber: 'PAY-2024-001',
    docNum: 'PAY001',
    docEntry: 1,
    paymentDate: '2024-01-15',
    postingDate: '2024-01-15',
    dueDate: '2024-01-15',
    vendorCode: 'V001',
    vendorName: 'ABC Supplies',
    vendorId: 'vendor-001',
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    paymentType: PaymentType.INVOICE_PAYMENT,
    status: PaymentStatus.COMPLETED,
    amount: 1500.0,
    currency: Currency.USD,
    exchangeRate: 1.0,
    referenceNumber: 'REF-001',
    lineItems: [
      {
        id: 'line-001',
        invoiceId: 'inv-001',
        invoiceNumber: 'INV-2024-001',
        invoiceAmount: 1500.0,
        appliedAmount: 1500.0,
        remainingBalance: 0.0,
        discountAmount: 0.0,
        taxAmount: 0.0,
        description: 'Office supplies invoice payment',
      },
    ],
    totalApplied: 1500.0,
    totalDiscount: 0.0,
    totalTax: 0.0,
    netAmount: 1500.0,
    notes: 'Payment for office supplies',
    approvalNotes: 'Approved by manager',
    approvalDate: '2024-01-14',
    approvedBy: 'John Manager',
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    lastActivityDate: '2024-01-15T14:30:00Z',
  },
  {
    id: 'pay-002',
    paymentNumber: 'PAY-2024-002',
    docNum: 'PAY002',
    docEntry: 2,
    paymentDate: '2024-01-20',
    postingDate: '2024-01-20',
    dueDate: '2024-01-20',
    vendorCode: 'V002',
    vendorName: 'XYZ Corporation',
    vendorId: 'vendor-002',
    paymentMethod: PaymentMethod.CHECK,
    paymentType: PaymentType.INVOICE_PAYMENT,
    status: PaymentStatus.PROCESSED,
    amount: 2500.0,
    currency: Currency.USD,
    exchangeRate: 1.0,
    checkNumber: 'CHK-001',
    lineItems: [
      {
        id: 'line-002',
        invoiceId: 'inv-002',
        invoiceNumber: 'INV-2024-002',
        invoiceAmount: 2500.0,
        appliedAmount: 2500.0,
        remainingBalance: 0.0,
        discountAmount: 0.0,
        taxAmount: 0.0,
        description: 'Equipment purchase payment',
      },
    ],
    totalApplied: 2500.0,
    totalDiscount: 0.0,
    totalTax: 0.0,
    netAmount: 2500.0,
    notes: 'Payment for equipment',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    lastActivityDate: '2024-01-20T09:15:00Z',
  },
  {
    id: 'pay-003',
    paymentNumber: 'PAY-2024-003',
    docNum: 'PAY003',
    docEntry: 3,
    paymentDate: '2024-01-25',
    postingDate: '2024-01-25',
    dueDate: '2024-01-25',
    vendorCode: 'V003',
    vendorName: 'Tech Solutions',
    vendorId: 'vendor-003',
    paymentMethod: PaymentMethod.WIRE_TRANSFER,
    paymentType: PaymentType.ADVANCE_PAYMENT,
    status: PaymentStatus.PENDING,
    amount: 5000.0,
    currency: Currency.USD,
    exchangeRate: 1.0,
    referenceNumber: 'REF-002',
    lineItems: [],
    totalApplied: 0.0,
    totalDiscount: 0.0,
    totalTax: 0.0,
    netAmount: 5000.0,
    notes: 'Advance payment for upcoming project',
    createdAt: '2024-01-24T10:00:00Z',
    updatedAt: '2024-01-24T10:00:00Z',
    lastActivityDate: '2024-01-24T10:00:00Z',
  },
]

// Mock stats
const mockStats: PaymentStats = {
  totalPayments: 3,
  totalAmount: 9000.0,
  pendingPayments: 1,
  processedPayments: 1,
  completedPayments: 1,
  failedPayments: 0,
  averagePaymentAmount: 3000.0,
  paymentsThisMonth: 3,
  paymentsThisQuarter: 3,
  paymentsThisYear: 3,
}

// API service
export const paymentApi = {
  // CRUD Operations
  async getPayments(
    filters?: PaymentFilters,
    pagination?: PaymentPagination,
  ): Promise<{ payments: Payment[]; pagination: PaymentPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredPayments = [...mockPayments]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const search = filters.search.toLowerCase()
        filteredPayments = filteredPayments.filter(
          (payment) =>
            payment.paymentNumber.toLowerCase().includes(search) ||
            payment.vendorName.toLowerCase().includes(search) ||
            payment.vendorCode.toLowerCase().includes(search),
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredPayments = filteredPayments.filter((payment) =>
          filters.status!.includes(payment.status),
        )
      }

      if (filters.paymentMethod && filters.paymentMethod.length > 0) {
        filteredPayments = filteredPayments.filter((payment) =>
          filters.paymentMethod!.includes(payment.paymentMethod),
        )
      }

      if (filters.paymentType && filters.paymentType.length > 0) {
        filteredPayments = filteredPayments.filter((payment) =>
          filters.paymentType!.includes(payment.paymentType),
        )
      }

      if (filters.vendorCode) {
        filteredPayments = filteredPayments.filter(
          (payment) => payment.vendorCode === filters.vendorCode,
        )
      }

      if (filters.vendorName) {
        filteredPayments = filteredPayments.filter((payment) =>
          payment.vendorName.toLowerCase().includes(filters.vendorName!.toLowerCase()),
        )
      }

      if (filters.currency && filters.currency.length > 0) {
        filteredPayments = filteredPayments.filter((payment) =>
          filters.currency!.includes(payment.currency),
        )
      }

      if (filters.dateRange) {
        filteredPayments = filteredPayments.filter((payment) => {
          const paymentDate = new Date(payment.paymentDate)
          const start = new Date(filters.dateRange!.start)
          const end = new Date(filters.dateRange!.end)
          return paymentDate >= start && paymentDate <= end
        })
      }

      if (filters.amountRange) {
        filteredPayments = filteredPayments.filter((payment) => {
          const amount = payment.amount
          const min = filters.amountRange!.min
          const max = filters.amountRange!.max
          return amount >= min && amount <= max
        })
      }
    }

    // Apply pagination
    const page = pagination?.page || 1
    const limit = pagination?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit

    const paginatedPayments = filteredPayments.slice(start, end)

    return {
      payments: paginatedPayments,
      pagination: {
        page,
        limit,
        total: filteredPayments.length,
        totalPages: Math.ceil(filteredPayments.length / limit),
      },
    }
  },

  async getPayment(id: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockPayments.find((payment) => payment.id === id) || null
  },

  async createPayment(paymentData: PaymentFormData): Promise<Payment> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      paymentNumber: `PAY-${new Date().getFullYear()}-${String(mockPayments.length + 1).padStart(3, '0')}`,
      docNum: `PAY${mockPayments.length + 1}`,
      docEntry: mockPayments.length + 1,
      ...paymentData,
      status: PaymentStatus.PENDING,
      lineItems: paymentData.lineItems.map((item, index) => ({
        ...item,
        id: `line-${Date.now()}-${index}`,
      })),
      totalApplied: paymentData.lineItems.reduce((sum, item) => sum + item.appliedAmount, 0),
      totalDiscount: paymentData.lineItems.reduce((sum, item) => sum + item.discountAmount, 0),
      totalTax: paymentData.lineItems.reduce((sum, item) => sum + item.taxAmount, 0),
      netAmount: paymentData.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    mockPayments.unshift(newPayment)
    return newPayment
  },

  async updatePayment(id: string, paymentData: Partial<PaymentFormData>): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const paymentIndex = mockPayments.findIndex((payment) => payment.id === id)
    if (paymentIndex === -1) return null

    const existingPayment = mockPayments[paymentIndex]
    const updatedPayment: Payment = {
      ...existingPayment,
      ...paymentData,
      lineItems: paymentData.lineItems
        ? paymentData.lineItems.map((item, index) => ({
            ...item,
            id: existingPayment.lineItems[index]?.id || `line-${Date.now()}-${index}`,
          }))
        : existingPayment.lineItems,
      totalApplied: paymentData.lineItems
        ? paymentData.lineItems.reduce((sum, item) => sum + item.appliedAmount, 0)
        : existingPayment.totalApplied,
      totalDiscount: paymentData.lineItems
        ? paymentData.lineItems.reduce((sum, item) => sum + item.discountAmount, 0)
        : existingPayment.totalDiscount,
      totalTax: paymentData.lineItems
        ? paymentData.lineItems.reduce((sum, item) => sum + item.taxAmount, 0)
        : existingPayment.totalTax,
      netAmount: paymentData.amount || existingPayment.netAmount,
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    mockPayments[paymentIndex] = updatedPayment
    return updatedPayment
  },

  async deletePayment(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const paymentIndex = mockPayments.findIndex((payment) => payment.id === id)
    if (paymentIndex === -1) return false

    mockPayments.splice(paymentIndex, 1)
    return true
  },

  // Business Logic Operations
  async approvePayment(id: string, approvalNotes?: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const payment = await this.getPayment(id)
    if (!payment || payment.status !== PaymentStatus.PENDING) return null

    const updatedPayment: Payment = {
      ...payment,
      status: PaymentStatus.APPROVED,
      approvalNotes: approvalNotes || payment.approvalNotes,
      approvalDate: new Date().toISOString(),
      approvedBy: 'Current User', // In real app, get from auth context
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    const paymentIndex = mockPayments.findIndex((p) => p.id === id)
    mockPayments[paymentIndex] = updatedPayment

    return updatedPayment
  },

  async processPayment(id: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const payment = await this.getPayment(id)
    if (!payment || payment.status !== PaymentStatus.APPROVED) return null

    const updatedPayment: Payment = {
      ...payment,
      status: PaymentStatus.PROCESSED,
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    const paymentIndex = mockPayments.findIndex((p) => p.id === id)
    mockPayments[paymentIndex] = updatedPayment

    return updatedPayment
  },

  async completePayment(id: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const payment = await this.getPayment(id)
    if (!payment || payment.status !== PaymentStatus.PROCESSED) return null

    const updatedPayment: Payment = {
      ...payment,
      status: PaymentStatus.COMPLETED,
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    const paymentIndex = mockPayments.findIndex((p) => p.id === id)
    mockPayments[paymentIndex] = updatedPayment

    return updatedPayment
  },

  async cancelPayment(id: string, reason?: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const payment = await this.getPayment(id)
    if (!payment || payment.status === PaymentStatus.COMPLETED) return null

    const updatedPayment: Payment = {
      ...payment,
      status: PaymentStatus.CANCELLED,
      notes: reason ? `${payment.notes || ''}\nCancelled: ${reason}`.trim() : payment.notes,
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    const paymentIndex = mockPayments.findIndex((p) => p.id === id)
    mockPayments[paymentIndex] = updatedPayment

    return updatedPayment
  },

  async holdPayment(id: string, reason?: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const payment = await this.getPayment(id)
    if (!payment || payment.status === PaymentStatus.COMPLETED) return null

    const updatedPayment: Payment = {
      ...payment,
      status: PaymentStatus.ON_HOLD,
      notes: reason ? `${payment.notes || ''}\nOn Hold: ${reason}`.trim() : payment.notes,
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    const paymentIndex = mockPayments.findIndex((p) => p.id === id)
    mockPayments[paymentIndex] = updatedPayment

    return updatedPayment
  },

  // Utility Operations
  async copyPayment(id: string): Promise<Payment | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const originalPayment = await this.getPayment(id)
    if (!originalPayment) return null

    const copiedPayment: Payment = {
      ...originalPayment,
      id: `pay-${Date.now()}`,
      paymentNumber: `PAY-${new Date().getFullYear()}-${String(mockPayments.length + 1).padStart(3, '0')}`,
      docNum: `PAY${mockPayments.length + 1}`,
      docEntry: mockPayments.length + 1,
      status: PaymentStatus.PENDING,
      paymentDate: new Date().toISOString().split('T')[0],
      postingDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      lineItems: originalPayment.lineItems.map((item, index) => ({
        ...item,
        id: `line-${Date.now()}-${index}`,
        appliedAmount: 0,
        remainingBalance: item.invoiceAmount,
      })),
      totalApplied: 0,
      approvalNotes: undefined,
      approvalDate: undefined,
      approvedBy: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    mockPayments.unshift(copiedPayment)
    return copiedPayment
  },

  // Statistics
  async getPaymentStats(): Promise<PaymentStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockStats
  },

  // Validation
  async validatePayment(
    paymentData: PaymentFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const errors: string[] = []

    if (!paymentData.paymentDate) errors.push('Payment date is required')
    if (!paymentData.postingDate) errors.push('Posting date is required')
    if (!paymentData.vendorCode) errors.push('Vendor code is required')
    if (!paymentData.vendorName) errors.push('Vendor name is required')
    if (!paymentData.amount || paymentData.amount <= 0) errors.push('Amount must be greater than 0')
    if (!paymentData.paymentMethod) errors.push('Payment method is required')
    if (!paymentData.paymentType) errors.push('Payment type is required')
    if (!paymentData.currency) errors.push('Currency is required')
    if (!paymentData.exchangeRate || paymentData.exchangeRate <= 0)
      errors.push('Exchange rate must be greater than 0')

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // Filter-specific getters
  getPaymentStatuses(): PaymentStatus[] {
    return Object.values(PaymentStatus)
  },

  getPaymentMethods(): PaymentMethod[] {
    return Object.values(PaymentMethod)
  },

  getPaymentTypes(): PaymentType[] {
    return Object.values(PaymentType)
  },

  getCurrencies(): Currency[] {
    return Object.values(Currency)
  },
}
