import { ApInvoiceStatus, ApInvoiceType, PaymentTerms, Currency } from '../types'
import type {
  ApInvoice,
  ApInvoiceFormData,
  ApInvoiceFilters,
  ApInvoiceStats,
  ApInvoicePagination,
} from '../types'

// Mock data
const mockApInvoices: ApInvoice[] = [
  {
    id: '1',
    docNum: 'AP-001',
    docEntry: 1,
    vendorCode: 'V001',
    vendorName: 'ABC Supplies',
    invoiceNumber: 'INV-2024-001',
    invoiceDate: '2024-01-15',
    postingDate: '2024-01-15',
    dueDate: '2024-02-14',
    type: ApInvoiceType.STANDARD,
    status: ApInvoiceStatus.PENDING,
    currency: Currency.USD,
    exchangeRate: 1.0,
    subtotal: 1000.0,
    discountTotal: 50.0,
    taxTotal: 95.0,
    totalAmount: 1045.0,
    paidAmount: 0.0,
    remainingAmount: 1045.0,
    paymentTerms: PaymentTerms.NET_30,
    purchaseOrderNumber: 'PO-2024-001',
    goodsReceiptNumber: 'GR-2024-001',
    projectCode: 'PROJ-001',
    costCenter: 'CC-001',
    notes: 'Monthly supplies invoice',
    lineItems: [
      {
        id: '1',
        itemCode: 'ITEM-001',
        itemName: 'Office Supplies',
        description: 'High-quality office supplies',
        quantity: 100,
        unitPrice: 10.0,
        discountPercent: 5.0,
        discountAmount: 50.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 95.0,
        lineTotal: 1045.0,
        accountCode: 'ACCT-001',
        costCenter: 'CC-001',
        projectCode: 'PROJ-001',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    docNum: 'AP-002',
    docEntry: 2,
    vendorCode: 'V002',
    vendorName: 'XYZ Manufacturing',
    invoiceNumber: 'INV-2024-002',
    invoiceDate: '2024-01-20',
    postingDate: '2024-01-20',
    dueDate: '2024-02-19',
    type: ApInvoiceType.EXPENSE,
    status: ApInvoiceStatus.APPROVED,
    currency: Currency.USD,
    exchangeRate: 1.0,
    subtotal: 2500.0,
    discountTotal: 0.0,
    taxTotal: 250.0,
    totalAmount: 2750.0,
    paidAmount: 0.0,
    remainingAmount: 2750.0,
    paymentTerms: PaymentTerms.NET_30,
    projectCode: 'PROJ-002',
    costCenter: 'CC-002',
    notes: 'Manufacturing equipment maintenance',
    lineItems: [
      {
        id: '2',
        itemCode: 'ITEM-002',
        itemName: 'Equipment Maintenance',
        description: 'Monthly equipment maintenance service',
        quantity: 1,
        unitPrice: 2500.0,
        discountPercent: 0.0,
        discountAmount: 0.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 250.0,
        lineTotal: 2750.0,
        accountCode: 'ACCT-002',
        costCenter: 'CC-002',
        projectCode: 'PROJ-002',
      },
    ],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
]

export const apInvoiceApi = {
  // Core CRUD operations
  async getInvoices(params?: {
    page?: number
    limit?: number
    filters?: ApInvoiceFilters
  }): Promise<{ data: ApInvoice[]; pagination: ApInvoicePagination }> {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    let filteredInvoices = [...mockApInvoices]

    if (params?.filters) {
      if (params.filters.status) {
        filteredInvoices = filteredInvoices.filter((i) => i.status === params.filters!.status)
      }
      if (params.filters.type) {
        filteredInvoices = filteredInvoices.filter((i) => i.type === params.filters!.type)
      }
      if (params.filters.vendorCode) {
        filteredInvoices = filteredInvoices.filter((i) =>
          i.vendorCode.includes(params.filters!.vendorCode!),
        )
      }
      if (params.filters.paymentTerms) {
        filteredInvoices = filteredInvoices.filter(
          (i) => i.paymentTerms === params.filters!.paymentTerms,
        )
      }
      if (params.filters.currency) {
        filteredInvoices = filteredInvoices.filter((i) => i.currency === params.filters!.currency)
      }
      if (params.filters.search) {
        const search = params.filters.search.toLowerCase()
        filteredInvoices = filteredInvoices.filter(
          (i) =>
            i.invoiceNumber.toLowerCase().includes(search) ||
            i.vendorName.toLowerCase().includes(search) ||
            i.purchaseOrderNumber?.toLowerCase().includes(search) ||
            false,
        )
      }
    }

    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedInvoices = filteredInvoices.slice(start, end)

    return {
      data: paginatedInvoices,
      pagination: {
        page,
        limit,
        total: filteredInvoices.length,
        totalPages: Math.ceil(filteredInvoices.length / limit),
        hasMore: end < filteredInvoices.length,
      },
    }
  },

  async getInvoice(id: string): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const invoice = mockApInvoices.find((i) => i.id === id)
    if (!invoice) {
      throw new Error('A/P Invoice not found')
    }
    return invoice
  },

  async createInvoice(data: ApInvoiceFormData): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newInvoice: ApInvoice = {
      id: Date.now().toString(),
      docNum: `AP-${Date.now()}`,
      docEntry: Date.now(),
      ...data,
      status: ApInvoiceStatus.DRAFT,
      exchangeRate: data.exchangeRate || 1.0,
      subtotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        const lineDiscount = lineSubtotal * (item.discountPercent / 100)
        return sum + (lineSubtotal - lineDiscount)
      }, 0),
      discountTotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        return sum + lineSubtotal * (item.discountPercent / 100)
      }, 0),
      taxTotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        const lineDiscount = lineSubtotal * (item.discountPercent / 100)
        const lineNetAmount = lineSubtotal - lineDiscount
        return sum + lineNetAmount * (item.taxPercent / 100)
      }, 0),
      totalAmount: 0, // Calculated
      paidAmount: 0.0,
      remainingAmount: 0, // Calculated
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random(),
        discountAmount: item.quantity * item.unitPrice * (item.discountPercent / 100),
        taxAmount:
          (item.quantity * item.unitPrice -
            item.quantity * item.unitPrice * (item.discountPercent / 100)) *
          (item.taxPercent / 100),
        lineTotal:
          (item.quantity * item.unitPrice -
            item.quantity * item.unitPrice * (item.discountPercent / 100)) *
          (1 + item.taxPercent / 100),
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount and remaining amount
    newInvoice.totalAmount = newInvoice.subtotal - newInvoice.discountTotal + newInvoice.taxTotal
    newInvoice.remainingAmount = newInvoice.totalAmount - newInvoice.paidAmount

    mockApInvoices.push(newInvoice)
    return newInvoice
  },

  async updateInvoice(id: string, data: ApInvoiceFormData): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockApInvoices.findIndex((i) => i.id === id)
    if (index === -1) {
      throw new Error('A/P Invoice not found')
    }

    const updatedInvoice: ApInvoice = {
      ...mockApInvoices[index],
      ...data,
      subtotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        const lineDiscount = lineSubtotal * (item.discountPercent / 100)
        return sum + (lineSubtotal - lineDiscount)
      }, 0),
      discountTotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        return sum + lineSubtotal * (item.discountPercent / 100)
      }, 0),
      taxTotal: data.lineItems.reduce((sum, item) => {
        const lineSubtotal = item.quantity * item.unitPrice
        const lineDiscount = lineSubtotal * (item.discountPercent / 100)
        const lineNetAmount = lineSubtotal - lineDiscount
        return sum + lineNetAmount * (item.taxPercent / 100)
      }, 0),
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: item.id || Date.now().toString() + Math.random(),
        discountAmount: item.quantity * item.unitPrice * (item.discountPercent / 100),
        taxAmount:
          (item.quantity * item.unitPrice -
            item.quantity * item.unitPrice * (item.discountPercent / 100)) *
          (item.taxPercent / 100),
        lineTotal:
          (item.quantity * item.unitPrice -
            item.quantity * item.unitPrice * (item.discountPercent / 100)) *
          (1 + item.taxPercent / 100),
      })),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount and remaining amount
    updatedInvoice.totalAmount =
      updatedInvoice.subtotal - updatedInvoice.discountTotal + updatedInvoice.taxTotal
    updatedInvoice.remainingAmount = updatedInvoice.totalAmount - updatedInvoice.paidAmount

    mockApInvoices[index] = updatedInvoice
    return updatedInvoice
  },

  async deleteInvoice(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockApInvoices.findIndex((i) => i.id === id)
    if (index === -1) {
      throw new Error('A/P Invoice not found')
    }
    mockApInvoices.splice(index, 1)
  },

  // Business logic operations
  async approveInvoice(id: string, approvalNotes?: string): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const invoice = await this.getInvoice(id)
    if (invoice.status !== ApInvoiceStatus.PENDING) {
      throw new Error('Only pending invoices can be approved')
    }

    invoice.status = ApInvoiceStatus.APPROVED
    invoice.approvalNotes = approvalNotes
    invoice.approvedBy = 'Current User' // Would come from auth context
    invoice.approvedDate = new Date().toISOString()
    invoice.updatedAt = new Date().toISOString()

    return invoice
  },

  async rejectInvoice(id: string, rejectionNotes: string): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const invoice = await this.getInvoice(id)
    if (invoice.status !== ApInvoiceStatus.PENDING) {
      throw new Error('Only pending invoices can be rejected')
    }

    invoice.status = ApInvoiceStatus.REJECTED
    invoice.approvalNotes = rejectionNotes
    invoice.updatedAt = new Date().toISOString()

    return invoice
  },

  async postInvoice(id: string): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const invoice = await this.getInvoice(id)
    if (invoice.status !== ApInvoiceStatus.APPROVED) {
      throw new Error('Only approved invoices can be posted')
    }

    invoice.status = ApInvoiceStatus.PENDING
    invoice.postingDate = new Date().toISOString()
    invoice.updatedAt = new Date().toISOString()

    return invoice
  },

  async cancelInvoice(id: string): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const invoice = await this.getInvoice(id)
    if (invoice.status === ApInvoiceStatus.PAID) {
      throw new Error('Paid invoices cannot be cancelled')
    }

    invoice.status = ApInvoiceStatus.CANCELLED
    invoice.updatedAt = new Date().toISOString()

    return invoice
  },

  async recordPayment(id: string, paymentAmount: number): Promise<ApInvoice> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const invoice = await this.getInvoice(id)
    if (
      invoice.status === ApInvoiceStatus.CANCELLED ||
      invoice.status === ApInvoiceStatus.REJECTED
    ) {
      throw new Error('Cannot record payment for cancelled or rejected invoices')
    }

    invoice.paidAmount += paymentAmount
    invoice.remainingAmount = invoice.totalAmount - invoice.paidAmount

    if (invoice.remainingAmount <= 0) {
      invoice.status = ApInvoiceStatus.PAID
    } else {
      invoice.status = ApInvoiceStatus.PARTIALLY_PAID
    }

    invoice.updatedAt = new Date().toISOString()

    return invoice
  },

  async copyInvoice(id: string): Promise<ApInvoice> {
    const original = await this.getInvoice(id)
    const copyData: ApInvoiceFormData = {
      vendorCode: original.vendorCode,
      vendorName: original.vendorName,
      invoiceNumber: `COPY-${original.invoiceNumber}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      postingDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      type: original.type,
      currency: original.currency,
      exchangeRate: original.exchangeRate,
      paymentTerms: original.paymentTerms,
      purchaseOrderNumber: original.purchaseOrderNumber,
      goodsReceiptNumber: original.goodsReceiptNumber,
      projectCode: original.projectCode,
      costCenter: original.costCenter,
      notes: `Copy of ${original.invoiceNumber}`,
      lineItems: original.lineItems.map((item) => ({
        itemCode: item.itemCode,
        itemName: item.itemName,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPercent: item.discountPercent,
        taxCode: item.taxCode,
        taxPercent: item.taxPercent,
        accountCode: item.accountCode,
        costCenter: item.costCenter,
        projectCode: item.projectCode,
      })),
    }

    return this.createInvoice(copyData)
  },

  async printInvoice(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Printing invoice ${id}`)
  },

  async emailInvoice(id: string, email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Emailing invoice ${id} to ${email}`)
  },

  // Statistics and reporting
  async getInvoiceStats(): Promise<{ data: ApInvoiceStats }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalInvoices = mockApInvoices.length
    const totalAmount = mockApInvoices.reduce((sum, i) => sum + i.totalAmount, 0)
    const paidAmount = mockApInvoices.reduce((sum, i) => sum + i.paidAmount, 0)
    const outstandingAmount = mockApInvoices.reduce((sum, i) => sum + i.remainingAmount, 0)
    const overdueAmount = mockApInvoices
      .filter((i) => new Date(i.dueDate) < new Date() && i.status !== ApInvoiceStatus.PAID)
      .reduce((sum, i) => sum + i.remainingAmount, 0)
    const averageInvoiceValue = totalInvoices > 0 ? totalAmount / totalInvoices : 0

    const invoicesByStatus = [
      {
        status: ApInvoiceStatus.DRAFT,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.DRAFT).length,
      },
      {
        status: ApInvoiceStatus.PENDING,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.PENDING).length,
      },
      {
        status: ApInvoiceStatus.APPROVED,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.APPROVED).length,
      },
      {
        status: ApInvoiceStatus.PAID,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.PAID).length,
      },
      {
        status: ApInvoiceStatus.PARTIALLY_PAID,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.PARTIALLY_PAID).length,
      },
      {
        status: ApInvoiceStatus.OVERDUE,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.OVERDUE).length,
      },
      {
        status: ApInvoiceStatus.CANCELLED,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.CANCELLED).length,
      },
      {
        status: ApInvoiceStatus.REJECTED,
        count: mockApInvoices.filter((i) => i.status === ApInvoiceStatus.REJECTED).length,
      },
    ]

    const invoicesByVendor = mockApInvoices.reduce(
      (acc, i) => {
        const existing = acc.find((v) => v.vendorCode === i.vendorCode)
        if (existing) {
          existing.count++
          existing.amount += i.totalAmount
        } else {
          acc.push({
            vendorCode: i.vendorCode,
            vendorName: i.vendorName,
            count: 1,
            amount: i.totalAmount,
          })
        }
        return acc
      },
      [] as { vendorCode: string; vendorName: string; count: number; amount: number }[],
    )

    const monthlyTrend = [
      { month: 'Jan 2024', count: 5, amount: 5000 },
      { month: 'Feb 2024', count: 8, amount: 8000 },
      { month: 'Mar 2024', count: 12, amount: 12000 },
    ]

    return {
      data: {
        totalInvoices,
        totalAmount,
        paidAmount,
        outstandingAmount,
        overdueAmount,
        averageInvoiceValue,
        invoicesByStatus,
        invoicesByVendor,
        monthlyTrend,
      },
    }
  },

  // Validation
  async validateInvoice(data: ApInvoiceFormData): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data.vendorCode) errors.push('Vendor is required')
    if (!data.invoiceNumber) errors.push('Invoice number is required')
    if (!data.invoiceDate) errors.push('Invoice date is required')
    if (!data.dueDate) errors.push('Due date is required')
    if (!data.lineItems || data.lineItems.length === 0) {
      errors.push('At least one line item is required')
    }

    if (data.lineItems) {
      data.lineItems.forEach((item, index) => {
        if (!item.itemCode) errors.push(`Item ${index + 1}: Item code is required`)
        if (!item.description) errors.push(`Item ${index + 1}: Description is required`)
        if (item.quantity <= 0) errors.push(`Item ${index + 1}: Quantity must be greater than 0`)
        if (item.unitPrice < 0) errors.push(`Item ${index + 1}: Unit price cannot be negative`)
        if (item.discountPercent < 0 || item.discountPercent > 100) {
          errors.push(`Item ${index + 1}: Discount percent must be between 0 and 100`)
        }
        if (item.taxPercent < 0) errors.push(`Item ${index + 1}: Tax percent cannot be negative`)
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // Filter-specific getters
  async getInvoicesByStatus(status: string): Promise<ApInvoice[]> {
    return mockApInvoices.filter((i) => i.status === status)
  },

  async getInvoicesByVendor(vendorCode: string): Promise<ApInvoice[]> {
    return mockApInvoices.filter((i) => i.vendorCode === vendorCode)
  },

  async getOverdueInvoices(): Promise<ApInvoice[]> {
    return mockApInvoices.filter(
      (i) => new Date(i.dueDate) < new Date() && i.status !== ApInvoiceStatus.PAID,
    )
  },

  async getInvoicesByDateRange(fromDate: string, toDate: string): Promise<ApInvoice[]> {
    return mockApInvoices.filter((i) => i.invoiceDate >= fromDate && i.invoiceDate <= toDate)
  },
}
