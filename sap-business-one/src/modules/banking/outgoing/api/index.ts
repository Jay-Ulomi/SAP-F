import type {
  OutgoingPayment,
  OutgoingPaymentFormData,
  OutgoingPaymentFilters,
  OutgoingPaymentStats,
  OutgoingPaymentsResponse,
} from '../types'
import {
  OutgoingPaymentType,
  OutgoingPaymentStatus,
  OutgoingPaymentPurpose,
} from '../types'

// Mock data for outgoing payments
const mockOutgoingPayments: OutgoingPayment[] = [
  {
    id: 'OP-1',
    paymentNumber: 'PAY-OUT-2024-001',
    paymentDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-20'),
    vendorId: 'V-1',
    vendorName: 'ABC Supplies Inc.',
    paymentType: OutgoingPaymentType.BANK_TRANSFER,
    paymentPurpose: OutgoingPaymentPurpose.VENDOR_PAYMENT,
    amount: 25000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'REF-ABC-001',
    description: 'Payment for office supplies and equipment',
    status: OutgoingPaymentStatus.COMPLETED,
    authorizedBy: 'finance_manager',
    authorizedDate: new Date('2024-01-14'),
    processedDate: new Date('2024-01-15'),
    appliedPurchaseOrders: [
      {
        id: 'APO-1',
        poId: 'PO-2024-001',
        poNumber: 'PO-2024-001',
        poDate: new Date('2024-01-01'),
        originalAmount: 25000.0,
        appliedAmount: 25000.0,
        discountAmount: 0.0,
        writeOffAmount: 0.0,
      },
    ],
    fees: [],
    notes: 'Payment processed successfully',
    attachments: ['invoice-abc-001.pdf'],
    createdBy: 'admin',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'OP-2',
    paymentNumber: 'PAY-OUT-2024-002',
    paymentDate: new Date('2024-01-25'),
    dueDate: new Date('2024-01-30'),
    vendorId: 'V-2',
    vendorName: 'XYZ Services Ltd.',
    paymentType: OutgoingPaymentType.CHECK,
    paymentPurpose: OutgoingPaymentPurpose.SUPPLIER_PAYMENT,
    amount: 18000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'CHK-12345',
    description: 'Payment for consulting services',
    status: OutgoingPaymentStatus.PENDING,
    appliedPurchaseOrders: [
      {
        id: 'APO-2',
        poId: 'PO-2024-002',
        poNumber: 'PO-2024-002',
        poDate: new Date('2024-01-15'),
        originalAmount: 18000.0,
        appliedAmount: 18000.0,
        discountAmount: 0.0,
        writeOffAmount: 0.0,
      },
    ],
    fees: [],
    notes: 'Check mailed to vendor',
    attachments: ['service-agreement.pdf'],
    createdBy: 'admin',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'OP-3',
    paymentNumber: 'PAY-OUT-2024-003',
    paymentDate: new Date('2024-02-01'),
    dueDate: new Date('2024-02-05'),
    vendorId: 'V-3',
    vendorName: 'Tech Solutions Corp.',
    paymentType: OutgoingPaymentType.WIRE_TRANSFER,
    paymentPurpose: OutgoingPaymentPurpose.EXPENSE_REIMBURSEMENT,
    amount: 8500.0,
    currency: 'USD',
    bankAccountId: 'BA-2',
    bankAccountName: 'Business Savings',
    referenceNumber: 'WIRE-2024-003',
    description: 'Reimbursement for travel expenses',
    status: OutgoingPaymentStatus.AUTHORIZED,
    authorizedBy: 'hr_manager',
    authorizedDate: new Date('2024-01-30'),
    appliedPurchaseOrders: [],
    fees: [
      {
        id: 'FEE-1',
        feeType: 'Wire Transfer Fee',
        description: 'International wire transfer fee',
        amount: 25.0,
        currency: 'USD',
      },
    ],
    notes: 'Travel expense reimbursement for Q4 2023',
    attachments: ['expense-report.pdf', 'receipts.pdf'],
    createdBy: 'admin',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-30'),
  },
]

export const outgoingPaymentsApi = {
  // Get all outgoing payments with pagination and filters
  async getPayments(
    page = 1,
    limit = 10,
    filters?: OutgoingPaymentFilters
  ): Promise<OutgoingPaymentsResponse> {
    await new Promise((r) => setTimeout(r, 300))

    let filteredPayments = [...mockOutgoingPayments]

    // Apply filters
    if (filters) {
      if (filters.status) {
        filteredPayments = filteredPayments.filter((p) => p.status === filters.status)
      }
      if (filters.paymentType) {
        filteredPayments = filteredPayments.filter((p) => p.paymentType === filters.paymentType)
      }
      if (filters.paymentPurpose) {
        filteredPayments = filteredPayments.filter((p) => p.paymentPurpose === filters.paymentPurpose)
      }
      if (filters.vendorId) {
        filteredPayments = filteredPayments.filter((p) => p.vendorId === filters.vendorId)
      }
      if (filters.bankAccountId) {
        filteredPayments = filteredPayments.filter((p) => p.bankAccountId === filters.bankAccountId)
      }
      if (filters.dateFrom) {
        filteredPayments = filteredPayments.filter((p) => p.paymentDate >= filters.dateFrom!)
      }
      if (filters.dateTo) {
        filteredPayments = filteredPayments.filter((p) => p.paymentDate <= filters.dateTo!)
      }
      if (filters.amountMin !== undefined) {
        filteredPayments = filteredPayments.filter((p) => p.amount >= filters.amountMin!)
      }
      if (filters.amountMax !== undefined) {
        filteredPayments = filteredPayments.filter((p) => p.amount <= filters.amountMax!)
      }
    }

    const total = filteredPayments.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex)

    return {
      payments: paginatedPayments,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  },

  // Get payment by ID
  async getPaymentById(id: string): Promise<OutgoingPayment | null> {
    await new Promise((r) => setTimeout(r, 200))
    return mockOutgoingPayments.find((p) => p.id === id) || null
  },

  // Create new outgoing payment
  async createPayment(data: OutgoingPaymentFormData): Promise<OutgoingPayment> {
    await new Promise((r) => setTimeout(r, 400))

    const payment: OutgoingPayment = {
      id: `OP-${Date.now()}`,
      paymentNumber: `PAY-OUT-${new Date().getFullYear()}-${String(mockOutgoingPayments.length + 1).padStart(3, '0')}`,
      paymentDate: data.paymentDate,
      dueDate: data.dueDate,
      vendorId: data.vendorId,
      vendorName: 'New Vendor',
      paymentType: data.paymentType,
      paymentPurpose: data.paymentPurpose,
      amount: data.amount,
      currency: data.currency,
      bankAccountId: data.bankAccountId,
      bankAccountName: 'Main Business Checking',
      referenceNumber: data.referenceNumber,
      description: data.description,
      status: OutgoingPaymentStatus.PENDING,
      appliedPurchaseOrders: data.appliedPurchaseOrders.map((apo) => ({
        id: `APO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        poId: apo.poId,
        poNumber: `PO-${apo.poId}`,
        poDate: new Date(),
        originalAmount: apo.appliedAmount,
        appliedAmount: apo.appliedAmount,
        discountAmount: apo.discountAmount,
        writeOffAmount: apo.writeOffAmount,
      })),
      fees: [],
      notes: data.notes,
      attachments: [],
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockOutgoingPayments.unshift(payment)
    return payment
  },

  // Update existing payment
  async updatePayment(id: string, data: Partial<OutgoingPaymentFormData>): Promise<OutgoingPayment | null> {
    await new Promise((r) => setTimeout(r, 300))
    const idx = mockOutgoingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return null

    const payment = mockOutgoingPayments[idx]
    const updated: OutgoingPayment = {
      ...payment,
      ...data,
      updatedAt: new Date(),
    }

    // Handle applied purchase orders if provided
    if (data.appliedPurchaseOrders) {
      updated.appliedPurchaseOrders = data.appliedPurchaseOrders.map((apo) => ({
        id: `APO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        poId: apo.poId,
        poNumber: `PO-${apo.poId}`,
        poDate: new Date(),
        originalAmount: apo.appliedAmount,
        appliedAmount: apo.appliedAmount,
        discountAmount: apo.discountAmount,
        writeOffAmount: apo.writeOffAmount,
      }))
    }

    mockOutgoingPayments[idx] = updated
    return updated
  },

  // Delete payment
  async deletePayment(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 200))
    const idx = mockOutgoingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return false
    mockOutgoingPayments.splice(idx, 1)
    return true
  },

  // Get payment statistics
  async getStats(): Promise<OutgoingPaymentStats> {
    await new Promise((r) => setTimeout(r, 250))

    const totalPayments = mockOutgoingPayments.length
    const totalAmount = mockOutgoingPayments.reduce((sum, p) => sum + p.amount, 0)
    const pendingPayments = mockOutgoingPayments.filter((p) => p.status === OutgoingPaymentStatus.PENDING).length
    const completedPayments = mockOutgoingPayments.filter((p) => p.status === OutgoingPaymentStatus.COMPLETED).length
    const failedPayments = mockOutgoingPayments.filter((p) => p.status === OutgoingPaymentStatus.FAILED).length

    const paymentsByType: Record<OutgoingPaymentType, number> = {
      [OutgoingPaymentType.BANK_TRANSFER]: 0,
      [OutgoingPaymentType.CHECK]: 0,
      [OutgoingPaymentType.CASH]: 0,
      [OutgoingPaymentType.WIRE_TRANSFER]: 0,
      [OutgoingPaymentType.ACH]: 0,
      [OutgoingPaymentType.CREDIT_CARD]: 0,
      [OutgoingPaymentType.DEBIT_CARD]: 0,
      [OutgoingPaymentType.PAYPAL]: 0,
      [OutgoingPaymentType.OTHER]: 0,
    }

    const paymentsByPurpose: Record<OutgoingPaymentPurpose, number> = {
      [OutgoingPaymentPurpose.VENDOR_PAYMENT]: 0,
      [OutgoingPaymentPurpose.SUPPLIER_PAYMENT]: 0,
      [OutgoingPaymentPurpose.EXPENSE_REIMBURSEMENT]: 0,
      [OutgoingPaymentPurpose.LOAN_PAYMENT]: 0,
      [OutgoingPaymentPurpose.TAX_PAYMENT]: 0,
      [OutgoingPaymentPurpose.INSURANCE_PAYMENT]: 0,
      [OutgoingPaymentPurpose.UTILITY_PAYMENT]: 0,
      [OutgoingPaymentPurpose.RENT_PAYMENT]: 0,
      [OutgoingPaymentPurpose.SALARY_PAYMENT]: 0,
      [OutgoingPaymentPurpose.OTHER]: 0,
    }

    mockOutgoingPayments.forEach((payment) => {
      paymentsByType[payment.paymentType]++
      paymentsByPurpose[payment.paymentPurpose]++
    })

    return {
      totalPayments,
      totalAmount,
      pendingPayments,
      completedPayments,
      failedPayments,
      averagePaymentAmount: totalPayments > 0 ? totalAmount / totalPayments : 0,
      paymentsByType,
      paymentsByPurpose,
    }
  },

  // Authorize payment
  async authorizePayment(id: string, authorizedBy: string): Promise<OutgoingPayment | null> {
    await new Promise((r) => setTimeout(r, 300))
    const idx = mockOutgoingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return null

    const payment = mockOutgoingPayments[idx]
    const updated: OutgoingPayment = {
      ...payment,
      status: OutgoingPaymentStatus.AUTHORIZED,
      authorizedBy,
      authorizedDate: new Date(),
      updatedAt: new Date(),
    }

    mockOutgoingPayments[idx] = updated
    return updated
  },

  // Process payment
  async processPayment(id: string): Promise<OutgoingPayment | null> {
    await new Promise((r) => setTimeout(r, 500))
    const idx = mockOutgoingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return null

    const payment = mockOutgoingPayments[idx]
    const updated: OutgoingPayment = {
      ...payment,
      status: OutgoingPaymentStatus.PROCESSING,
      updatedAt: new Date(),
    }

    mockOutgoingPayments[idx] = updated
    return updated
  },

  // Complete payment
  async completePayment(id: string): Promise<OutgoingPayment | null> {
    await new Promise((r) => setTimeout(r, 300))
    const idx = mockOutgoingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return null

    const payment = mockOutgoingPayments[idx]
    const updated: OutgoingPayment = {
      ...payment,
      status: OutgoingPaymentStatus.COMPLETED,
      processedDate: new Date(),
      updatedAt: new Date(),
    }

    mockOutgoingPayments[idx] = updated
    return updated
  },
}
