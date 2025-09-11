import { ApCreditMemoStatus, ApCreditMemoType, PaymentTerms, Currency } from '../types'
import type {
  ApCreditMemo,
  ApCreditMemoFormData,
  ApCreditMemoFilters,
  ApCreditMemoStats,
  ApCreditMemoPagination,
} from '../types'

// Mock data
const mockApCreditMemos: ApCreditMemo[] = [
  {
    id: '1',
    docNum: 'AP-CM-001',
    docEntry: 1,
    vendorCode: 'V001',
    vendorName: 'ABC Supplies',
    creditMemoNumber: 'CM-2024-001',
    creditMemoDate: '2024-01-15',
    postingDate: '2024-01-15',
    type: ApCreditMemoType.VENDOR_RETURN,
    status: ApCreditMemoStatus.PENDING,
    currency: Currency.USD,
    exchangeRate: 1.0,
    subtotal: 500.0,
    discountTotal: 0.0,
    taxTotal: 50.0,
    totalAmount: 550.0,
    appliedAmount: 0.0,
    remainingAmount: 550.0,
    paymentTerms: PaymentTerms.NET_30,
    originalInvoiceNumber: 'INV-2024-001',
    purchaseOrderNumber: 'PO-2024-001',
    goodsReceiptNumber: 'GR-2024-001',
    projectCode: 'PROJ-001',
    costCenter: 'CC-001',
    notes: 'Return of damaged goods',
    lineItems: [
      {
        id: '1',
        itemCode: 'ITEM-001',
        itemName: 'Office Supplies',
        description: 'Damaged office supplies - returning',
        quantity: 50,
        unitPrice: 10.0,
        discountPercent: 0.0,
        discountAmount: 0.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 50.0,
        lineTotal: 550.0,
        accountCode: 'ACCT-001',
        costCenter: 'CC-001',
        projectCode: 'PROJ-001',
        originalInvoiceNumber: 'INV-2024-001',
        returnReason: 'Damaged during shipping',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    docNum: 'AP-CM-002',
    docEntry: 2,
    vendorCode: 'V002',
    vendorName: 'XYZ Manufacturing',
    creditMemoNumber: 'CM-2024-002',
    creditMemoDate: '2024-01-20',
    postingDate: '2024-01-20',
    type: ApCreditMemoType.PRICE_ADJUSTMENT,
    status: ApCreditMemoStatus.APPROVED,
    currency: Currency.USD,
    exchangeRate: 1.0,
    subtotal: 200.0,
    discountTotal: 0.0,
    taxTotal: 20.0,
    totalAmount: 220.0,
    appliedAmount: 0.0,
    remainingAmount: 220.0,
    paymentTerms: PaymentTerms.NET_30,
    originalInvoiceNumber: 'INV-2024-002',
    projectCode: 'PROJ-002',
    costCenter: 'CC-002',
    notes: 'Price adjustment for bulk order',
    lineItems: [
      {
        id: '2',
        itemCode: 'ITEM-002',
        itemName: 'Manufacturing Parts',
        description: 'Price adjustment - bulk discount applied',
        quantity: 1,
        unitPrice: 200.0,
        discountPercent: 0.0,
        discountAmount: 0.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 20.0,
        lineTotal: 220.0,
        accountCode: 'ACCT-002',
        costCenter: 'CC-002',
        projectCode: 'PROJ-002',
        originalInvoiceNumber: 'INV-2024-002',
        returnReason: 'Price adjustment',
      },
    ],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
]

export const apCreditMemoApi = {
  // Core CRUD operations
  async getCreditMemos(params?: {
    page?: number
    limit?: number
    filters?: ApCreditMemoFilters
  }): Promise<{ data: ApCreditMemo[]; pagination: ApCreditMemoPagination }> {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    let filteredCreditMemos = [...mockApCreditMemos]

    if (params?.filters) {
      if (params.filters.status) {
        filteredCreditMemos = filteredCreditMemos.filter(
          (cm) => cm.status === params.filters!.status,
        )
      }
      if (params.filters.type) {
        filteredCreditMemos = filteredCreditMemos.filter((cm) => cm.type === params.filters!.type)
      }
      if (params.filters.vendorCode) {
        filteredCreditMemos = filteredCreditMemos.filter((cm) =>
          cm.vendorCode.includes(params.filters!.vendorCode!),
        )
      }
      if (params.filters.paymentTerms) {
        filteredCreditMemos = filteredCreditMemos.filter(
          (cm) => cm.paymentTerms === params.filters!.paymentTerms,
        )
      }
      if (params.filters.currency) {
        filteredCreditMemos = filteredCreditMemos.filter(
          (cm) => cm.currency === params.filters!.currency,
        )
      }
      if (params.filters.search) {
        const search = params.filters.search.toLowerCase()
        filteredCreditMemos = filteredCreditMemos.filter(
          (cm) =>
            cm.creditMemoNumber.toLowerCase().includes(search) ||
            cm.vendorName.toLowerCase().includes(search) ||
            cm.originalInvoiceNumber?.toLowerCase().includes(search) ||
            false,
        )
      }
    }

    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedCreditMemos = filteredCreditMemos.slice(start, end)

    return {
      data: paginatedCreditMemos,
      pagination: {
        page,
        limit,
        total: filteredCreditMemos.length,
        totalPages: Math.ceil(filteredCreditMemos.length / limit),
        hasMore: end < filteredCreditMemos.length,
      },
    }
  },

  async getCreditMemo(id: string): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const creditMemo = mockApCreditMemos.find((cm) => cm.id === id)
    if (!creditMemo) {
      throw new Error('A/P Credit Memo not found')
    }
    return creditMemo
  },

  async createCreditMemo(data: ApCreditMemoFormData): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newCreditMemo: ApCreditMemo = {
      id: Date.now().toString(),
      docNum: `AP-CM-${Date.now()}`,
      docEntry: Date.now(),
      ...data,
      status: ApCreditMemoStatus.DRAFT,
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
      appliedAmount: 0.0,
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
    newCreditMemo.totalAmount =
      newCreditMemo.subtotal - newCreditMemo.discountTotal + newCreditMemo.taxTotal
    newCreditMemo.remainingAmount = newCreditMemo.totalAmount - newCreditMemo.appliedAmount

    mockApCreditMemos.push(newCreditMemo)
    return newCreditMemo
  },

  async updateCreditMemo(id: string, data: ApCreditMemoFormData): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockApCreditMemos.findIndex((cm) => cm.id === id)
    if (index === -1) {
      throw new Error('A/P Credit Memo not found')
    }

    const updatedCreditMemo: ApCreditMemo = {
      ...mockApCreditMemos[index],
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
    updatedCreditMemo.totalAmount =
      updatedCreditMemo.subtotal - updatedCreditMemo.discountTotal + updatedCreditMemo.taxTotal
    updatedCreditMemo.remainingAmount =
      updatedCreditMemo.totalAmount - updatedCreditMemo.appliedAmount

    mockApCreditMemos[index] = updatedCreditMemo
    return updatedCreditMemo
  },

  async deleteCreditMemo(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockApCreditMemos.findIndex((cm) => cm.id === id)
    if (index === -1) {
      throw new Error('A/P Credit Memo not found')
    }
    mockApCreditMemos.splice(index, 1)
  },

  // Business logic operations
  async approveCreditMemo(id: string, approvalNotes?: string): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const creditMemo = await this.getCreditMemo(id)
    if (creditMemo.status !== ApCreditMemoStatus.PENDING) {
      throw new Error('Only pending credit memos can be approved')
    }

    creditMemo.status = ApCreditMemoStatus.APPROVED
    creditMemo.approvalNotes = approvalNotes
    creditMemo.approvedBy = 'Current User' // Would come from auth context
    creditMemo.approvedDate = new Date().toISOString()
    creditMemo.updatedAt = new Date().toISOString()

    return creditMemo
  },

  async rejectCreditMemo(id: string, rejectionNotes: string): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const creditMemo = await this.getCreditMemo(id)
    if (creditMemo.status !== ApCreditMemoStatus.PENDING) {
      throw new Error('Only pending credit memos can be rejected')
    }

    creditMemo.status = ApCreditMemoStatus.REJECTED
    creditMemo.approvalNotes = rejectionNotes
    creditMemo.updatedAt = new Date().toISOString()

    return creditMemo
  },

  async postCreditMemo(id: string): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const creditMemo = await this.getCreditMemo(id)
    if (creditMemo.status !== ApCreditMemoStatus.APPROVED) {
      throw new Error('Only approved credit memos can be posted')
    }

    creditMemo.status = ApCreditMemoStatus.PENDING
    creditMemo.postingDate = new Date().toISOString()
    creditMemo.updatedAt = new Date().toISOString()

    return creditMemo
  },

  async cancelCreditMemo(id: string): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const creditMemo = await this.getCreditMemo(id)
    if (creditMemo.status === ApCreditMemoStatus.APPLIED) {
      throw new Error('Applied credit memos cannot be cancelled')
    }

    creditMemo.status = ApCreditMemoStatus.CANCELLED
    creditMemo.updatedAt = new Date().toISOString()

    return creditMemo
  },

  async applyCreditMemo(id: string, applyAmount: number): Promise<ApCreditMemo> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const creditMemo = await this.getCreditMemo(id)
    if (
      creditMemo.status === ApCreditMemoStatus.CANCELLED ||
      creditMemo.status === ApCreditMemoStatus.REJECTED
    ) {
      throw new Error('Cannot apply cancelled or rejected credit memos')
    }

    creditMemo.appliedAmount += applyAmount
    creditMemo.remainingAmount = creditMemo.totalAmount - creditMemo.appliedAmount

    if (creditMemo.remainingAmount <= 0) {
      creditMemo.status = ApCreditMemoStatus.APPLIED
    } else {
      creditMemo.status = ApCreditMemoStatus.PARTIALLY_APPLIED
    }

    creditMemo.updatedAt = new Date().toISOString()

    return creditMemo
  },

  async copyCreditMemo(id: string): Promise<ApCreditMemo> {
    const original = await this.getCreditMemo(id)
    const copyData: ApCreditMemoFormData = {
      vendorCode: original.vendorCode,
      vendorName: original.vendorName,
      creditMemoNumber: `COPY-${original.creditMemoNumber}`,
      creditMemoDate: new Date().toISOString().split('T')[0],
      postingDate: new Date().toISOString().split('T')[0],
      type: original.type,
      currency: original.currency,
      exchangeRate: original.exchangeRate,
      paymentTerms: original.paymentTerms,
      originalInvoiceNumber: original.originalInvoiceNumber,
      purchaseOrderNumber: original.purchaseOrderNumber,
      goodsReceiptNumber: original.goodsReceiptNumber,
      projectCode: original.projectCode,
      costCenter: original.costCenter,
      notes: `Copy of ${original.creditMemoNumber}`,
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
        originalInvoiceNumber: item.originalInvoiceNumber,
        returnReason: item.returnReason,
      })),
    }

    return this.createCreditMemo(copyData)
  },

  async printCreditMemo(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Printing credit memo ${id}`)
  },

  async emailCreditMemo(id: string, email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Emailing credit memo ${id} to ${email}`)
  },

  // Statistics and reporting
  async getCreditMemoStats(): Promise<{ data: ApCreditMemoStats }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalCreditMemos = mockApCreditMemos.length
    const totalAmount = mockApCreditMemos.reduce((sum, cm) => sum + cm.totalAmount, 0)
    const appliedAmount = mockApCreditMemos.reduce((sum, cm) => sum + cm.appliedAmount, 0)
    const outstandingAmount = mockApCreditMemos.reduce((sum, cm) => sum + cm.remainingAmount, 0)
    const averageCreditMemoValue = totalCreditMemos > 0 ? totalAmount / totalCreditMemos : 0

    const creditMemosByStatus = [
      {
        status: ApCreditMemoStatus.DRAFT,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.DRAFT).length,
      },
      {
        status: ApCreditMemoStatus.PENDING,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.PENDING).length,
      },
      {
        status: ApCreditMemoStatus.APPROVED,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.APPROVED).length,
      },
      {
        status: ApCreditMemoStatus.APPLIED,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.APPLIED).length,
      },
      {
        status: ApCreditMemoStatus.PARTIALLY_APPLIED,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.PARTIALLY_APPLIED)
          .length,
      },
      {
        status: ApCreditMemoStatus.CANCELLED,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.CANCELLED).length,
      },
      {
        status: ApCreditMemoStatus.REJECTED,
        count: mockApCreditMemos.filter((cm) => cm.status === ApCreditMemoStatus.REJECTED).length,
      },
    ]

    const creditMemosByVendor = mockApCreditMemos.reduce(
      (acc, cm) => {
        const existing = acc.find((v) => v.vendorCode === cm.vendorCode)
        if (existing) {
          existing.count++
          existing.amount += cm.totalAmount
        } else {
          acc.push({
            vendorCode: cm.vendorCode,
            vendorName: cm.vendorName,
            count: 1,
            amount: cm.totalAmount,
          })
        }
        return acc
      },
      [] as { vendorCode: string; vendorName: string; count: number; amount: number }[],
    )

    const creditMemosByType = [
      {
        type: ApCreditMemoType.VENDOR_RETURN,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.VENDOR_RETURN).length,
      },
      {
        type: ApCreditMemoType.PRICE_ADJUSTMENT,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.PRICE_ADJUSTMENT)
          .length,
      },
      {
        type: ApCreditMemoType.DISCOUNT,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.DISCOUNT).length,
      },
      {
        type: ApCreditMemoType.DAMAGED_GOODS,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.DAMAGED_GOODS).length,
      },
      {
        type: ApCreditMemoType.WRONG_ITEM,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.WRONG_ITEM).length,
      },
      {
        type: ApCreditMemoType.QUALITY_ISSUE,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.QUALITY_ISSUE).length,
      },
      {
        type: ApCreditMemoType.OTHER,
        count: mockApCreditMemos.filter((cm) => cm.type === ApCreditMemoType.OTHER).length,
      },
    ]

    const monthlyTrend = [
      { month: 'Jan 2024', count: 3, amount: 1500 },
      { month: 'Feb 2024', count: 5, amount: 2500 },
      { month: 'Mar 2024', count: 8, amount: 4000 },
    ]

    return {
      data: {
        totalCreditMemos,
        totalAmount,
        appliedAmount,
        outstandingAmount,
        averageCreditMemoValue,
        creditMemosByStatus,
        creditMemosByVendor,
        creditMemosByType,
        monthlyTrend,
      },
    }
  },

  // Validation
  async validateCreditMemo(
    data: ApCreditMemoFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data.vendorCode) errors.push('Vendor is required')
    if (!data.creditMemoNumber) errors.push('Credit memo number is required')
    if (!data.creditMemoDate) errors.push('Credit memo date is required')
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
  async getCreditMemosByStatus(status: string): Promise<ApCreditMemo[]> {
    return mockApCreditMemos.filter((cm) => cm.status === status)
  },

  async getCreditMemosByVendor(vendorCode: string): Promise<ApCreditMemo[]> {
    return mockApCreditMemos.filter((cm) => cm.vendorCode === vendorCode)
  },

  async getCreditMemosByType(type: string): Promise<ApCreditMemo[]> {
    return mockApCreditMemos.filter((cm) => cm.type === type)
  },

  async getCreditMemosByDateRange(fromDate: string, toDate: string): Promise<ApCreditMemo[]> {
    return mockApCreditMemos.filter(
      (cm) => cm.creditMemoDate >= fromDate && cm.creditMemoDate <= toDate,
    )
  },
}
