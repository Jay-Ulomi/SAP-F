import type { IncomingPayment, IncomingPaymentFormData } from '../types'
import { PaymentType, PaymentStatus, PaymentSource } from '../types'

// Mock data
const mockIncomingPayments: IncomingPayment[] = [
  {
    id: 'IP-1',
    paymentNumber: 'PAY-2024-001',
    paymentDate: new Date('2024-01-15'),
    receivedDate: new Date('2024-01-15'),
    customerId: 'C-1',
    customerName: 'ABC Corporation',
    paymentType: PaymentType.BANK_TRANSFER,
    paymentSource: PaymentSource.CUSTOMER_PAYMENT,
    amount: 15000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'REF-ABC-001',
    description: 'Payment for Invoice INV-2024-001',
    status: PaymentStatus.CLEARED,
    clearedDate: new Date('2024-01-16'),
    appliedInvoices: [
      {
        invoiceId: 'INV-1',
        invoiceNumber: 'INV-2024-001',
        invoiceDate: new Date('2024-01-01'),
        originalAmount: 15000.0,
        appliedAmount: 15000.0,
        discountAmount: 0.0,
        writeOffAmount: 0.0,
      },
    ],
    fees: [],
    notes: 'Payment received on time',
    attachments: [],
    createdBy: 'admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'IP-2',
    paymentNumber: 'PAY-2024-002',
    paymentDate: new Date('2024-01-20'),
    receivedDate: new Date('2024-01-20'),
    customerId: 'C-2',
    customerName: 'XYZ Industries',
    paymentType: PaymentType.CHECK,
    paymentSource: PaymentSource.CUSTOMER_PAYMENT,
    amount: 22000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'CHK-12345',
    description: 'Check payment for Invoice INV-2024-003',
    status: PaymentStatus.PROCESSING,
    appliedInvoices: [
      {
        invoiceId: 'INV-3',
        invoiceNumber: 'INV-2024-003',
        invoiceDate: new Date('2024-01-10'),
        originalAmount: 22000.0,
        appliedAmount: 22000.0,
        discountAmount: 0.0,
        writeOffAmount: 0.0,
      },
    ],
    fees: [],
    notes: 'Check received, processing',
    attachments: ['check-image-001.jpg'],
    createdBy: 'admin',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

export const incomingPaymentsApi = {
  // Basic structure - will be implemented
  async getPayments() {
    return {
      payments: mockIncomingPayments,
      pagination: {
        page: 1,
        limit: 10,
        total: mockIncomingPayments.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    }
  },

  async getPaymentById(id: string) {
    return mockIncomingPayments.find((p) => p.id === id) || null
  },

  async createPayment(data: IncomingPaymentFormData) {
    await new Promise((r) => setTimeout(r, 300))

    const payment: IncomingPayment = {
      id: `IP-${Date.now()}`,
      paymentNumber: `PAY-${new Date().getFullYear()}-${String(mockIncomingPayments.length + 1).padStart(3, '0')}`,
      paymentDate: data.paymentDate,
      receivedDate: new Date(),
      customerId: data.customerId || 'C-1',
      customerName: 'New Customer',
      paymentType: data.paymentType,
      paymentSource: data.paymentSource,
      amount: data.amount,
      currency: data.currency,
      bankAccountId: data.bankAccountId || 'BA-1',
      bankAccountName: 'Main Business Checking',
      referenceNumber: data.referenceNumber,
      description: data.description,
      status: PaymentStatus.RECEIVED,
      appliedInvoices: [],
      fees: [],
      notes: data.notes,
      attachments: [],
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockIncomingPayments.unshift(payment)
    return payment
  },

  async updatePayment(id: string, data: Partial<IncomingPaymentFormData>) {
    await new Promise((r) => setTimeout(r, 200))
    const idx = mockIncomingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return null

    const payment = mockIncomingPayments[idx]
    const updated: IncomingPayment = {
      ...payment,
      ...data,
      updatedAt: new Date(),
    }

    // Handle applied invoices if provided
    if (data.appliedInvoices) {
      updated.appliedInvoices = data.appliedInvoices.map((ai) => ({
        invoiceId: ai.invoiceId,
        invoiceNumber: 'Updated Invoice',
        invoiceDate: new Date(),
        originalAmount: 0,
        appliedAmount: ai.appliedAmount,
        discountAmount: ai.discountAmount,
        writeOffAmount: ai.writeOffAmount,
      }))
    }

    mockIncomingPayments[idx] = updated
    return updated
  },

  async deletePayment(id: string) {
    await new Promise((r) => setTimeout(r, 120))
    const idx = mockIncomingPayments.findIndex((p) => p.id === id)
    if (idx === -1) return false
    mockIncomingPayments.splice(idx, 1)
    return true
  },
}
