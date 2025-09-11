import { GoodsReceiptStatus, ReceiptType, QualityStatus, Currency } from '../types'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptFilters,
  GoodsReceiptStats,
  GoodsReceiptPagination,
} from '../types'

// Mock data - replace with actual API calls
const mockGoodsReceipts: GoodsReceipt[] = [
  {
    id: '1',
    docNum: '1001',
    docEntry: 1001,
    receiptNumber: 'GR-001',
    receiptDate: '2024-01-15',
    postingDate: '2024-01-15',
    type: ReceiptType.FULL,
    status: GoodsReceiptStatus.POSTED,
    currency: Currency.USD,
    subtotal: 1500.0,
    taxTotal: 150.0,
    totalAmount: 1650.0,
    vendorCode: 'V001',
    vendorName: 'ABC Supplies',
    vendorContact: 'John Smith',
    vendorEmail: 'john@abcsupplies.com',
    vendorPhone: '+1-555-0123',
    purchaseOrderId: 'PO-001',
    purchaseOrderNumber: 'PO-001',
    warehouseCode: 'WH-01',
    warehouseName: 'Main Warehouse',
    department: 'Purchasing',
    costCenter: 'CC-001',
    projectCode: 'PRJ-001',
    notes: 'Standard delivery',
    qualityNotes: 'All items passed quality check',
    lineItems: [
      {
        id: '1',
        itemCode: 'ITEM-001',
        itemName: 'Office Chair',
        description: 'Ergonomic office chair',
        orderedQuantity: 10,
        receivedQuantity: 10,
        unitPrice: 150.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 150.0,
        lineTotal: 1650.0,
        accountCode: 'ACCT-001',
        costCenter: 'CC-001',
        projectCode: 'PRJ-001',
        warehouseCode: 'WH-01',
        binLocation: 'A1-B1',
        batchNumber: 'BATCH-001',
        serialNumber: undefined,
        qualityStatus: QualityStatus.ACCEPTED,
        qualityNotes: 'Good condition',
        vendorNotes: 'On time delivery',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
]

// API Service
export const goodsReceiptApi = {
  // Core CRUD Operations
  async getReceipts(params?: {
    page?: number
    limit?: number
    filters?: GoodsReceiptFilters
  }): Promise<{ data: GoodsReceipt[]; pagination: GoodsReceiptPagination }> {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    let filteredReceipts = [...mockGoodsReceipts]

    if (params?.filters) {
      if (params.filters.status) {
        filteredReceipts = filteredReceipts.filter((r) => r.status === params.filters!.status)
      }
      if (params.filters.type) {
        filteredReceipts = filteredReceipts.filter((r) => r.type === params.filters!.type)
      }
      if (params.filters.vendorCode) {
        filteredReceipts = filteredReceipts.filter((r) =>
          r.vendorCode.includes(params.filters!.vendorCode!),
        )
      }
      if (params.filters.search) {
        const search = params.filters.search.toLowerCase()
        filteredReceipts = filteredReceipts.filter(
          (r) =>
            r.receiptNumber.toLowerCase().includes(search) ||
            r.vendorName.toLowerCase().includes(search) ||
            r.purchaseOrderNumber.toLowerCase().includes(search),
        )
      }
    }

    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedReceipts = filteredReceipts.slice(start, end)

    return {
      data: paginatedReceipts,
      pagination: {
        page,
        limit,
        total: filteredReceipts.length,
        totalPages: Math.ceil(filteredReceipts.length / limit),
        hasMore: end < filteredReceipts.length,
      },
    }
  },

  async getReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const receipt = mockGoodsReceipts.find((r) => r.id === id)
    if (!receipt) {
      throw new Error('Goods receipt not found')
    }
    return receipt
  },

  async createReceipt(data: GoodsReceiptFormData): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newReceipt: GoodsReceipt = {
      id: Date.now().toString(),
      docNum: Date.now().toString(),
      docEntry: Date.now(),
      ...data,
      status: GoodsReceiptStatus.DRAFT,
      vendorName: 'Vendor Name', // Would come from vendor lookup
      vendorContact: 'Contact Person',
      vendorEmail: 'contact@vendor.com',
      vendorPhone: '+1-555-0000',
      purchaseOrderNumber: 'PO-REF', // Would come from PO lookup
      warehouseName: 'Warehouse Name', // Would come from warehouse lookup
      subtotal: data.lineItems.reduce(
        (sum, item) => sum + item.orderedQuantity * item.unitPrice,
        0,
      ),
      taxTotal: data.lineItems.reduce(
        (sum, item) => sum + item.orderedQuantity * item.unitPrice * (item.taxPercent / 100),
        0,
      ),
      totalAmount: 0, // Calculated
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random(),
        receivedQuantity: 0,
        taxAmount: item.orderedQuantity * item.unitPrice * (item.taxPercent / 100),
        lineTotal: item.orderedQuantity * item.unitPrice,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount
    newReceipt.totalAmount = newReceipt.subtotal + newReceipt.taxTotal

    mockGoodsReceipts.push(newReceipt)
    return newReceipt
  },

  async updateReceipt(id: string, data: GoodsReceiptFormData): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockGoodsReceipts.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }

    const updatedReceipt: GoodsReceipt = {
      ...mockGoodsReceipts[index],
      ...data,
      subtotal: data.lineItems.reduce(
        (sum, item) => sum + item.orderedQuantity * item.unitPrice,
        0,
      ),
      taxTotal: data.lineItems.reduce(
        (sum, item) => sum + item.orderedQuantity * item.unitPrice * (item.taxPercent / 100),
        0,
      ),
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random(),
        receivedQuantity: item.receivedQuantity || 0,
        taxAmount: item.orderedQuantity * item.unitPrice * (item.taxPercent / 100),
        lineTotal: item.orderedQuantity * item.unitPrice,
      })),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount
    updatedReceipt.totalAmount = updatedReceipt.subtotal + updatedReceipt.taxTotal

    mockGoodsReceipts[index] = updatedReceipt
    return updatedReceipt
  },

  async deleteReceipt(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockGoodsReceipts.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }
    mockGoodsReceipts.splice(index, 1)
  },

  // Business Logic Operations
  async postReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const receipt = await this.getReceipt(id)
    if (receipt.status !== 'DRAFT') {
      throw new Error('Only draft receipts can be posted')
    }

    receipt.status = GoodsReceiptStatus.POSTED
    receipt.postingDate = new Date().toISOString()
    receipt.updatedAt = new Date().toISOString()

    return receipt
  },

  async cancelReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const receipt = await this.getReceipt(id)
    if (receipt.status === 'POSTED') {
      throw new Error('Posted receipts cannot be cancelled')
    }

    receipt.status = GoodsReceiptStatus.CANCELLED
    receipt.updatedAt = new Date().toISOString()

    return receipt
  },

  async putOnHold(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const receipt = await this.getReceipt(id)
    receipt.status = GoodsReceiptStatus.ON_HOLD
    receipt.updatedAt = new Date().toISOString()

    return receipt
  },

  async resumeReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const receipt = await this.getReceipt(id)
    if (receipt.status === GoodsReceiptStatus.ON_HOLD) {
      receipt.status = GoodsReceiptStatus.DRAFT
      receipt.updatedAt = new Date().toISOString()
    }

    return receipt
  },

  // Utility Operations
  async copyReceipt(id: string): Promise<GoodsReceipt> {
    const original = await this.getReceipt(id)
    const copyData: GoodsReceiptFormData = {
      receiptNumber: `COPY-${original.receiptNumber}`,
      receiptDate: new Date().toISOString().split('T')[0],
      postingDate: new Date().toISOString().split('T')[0],
      type: original.type,
      currency: original.currency,
      vendorCode: original.vendorCode,
      purchaseOrderId: original.purchaseOrderId,
      warehouseCode: original.warehouseCode,
      department: original.department,
      costCenter: original.costCenter,
      projectCode: original.projectCode,
      notes: `Copy of ${original.receiptNumber}`,
      lineItems: original.lineItems.map((item) => ({
        itemCode: item.itemCode,
        itemName: item.itemName,
        description: item.description,
        orderedQuantity: item.orderedQuantity,
        receivedQuantity: item.receivedQuantity,
        unitPrice: item.unitPrice,
        taxCode: item.taxCode,
        taxPercent: item.taxPercent,
        accountCode: item.accountCode,
        costCenter: item.costCenter,
        projectCode: item.projectCode,
        warehouseCode: item.warehouseCode,
        binLocation: item.binLocation,
        batchNumber: item.batchNumber,
        serialNumber: item.serialNumber,
        qualityStatus: item.qualityStatus,
        qualityNotes: item.qualityNotes,
        vendorNotes: item.vendorNotes,
      })),
    }

    return this.createReceipt(copyData)
  },

  async printReceipt(id: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return `Printing goods receipt ${id}...`
  },

  async emailReceipt(id: string, email: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return `Emailing goods receipt ${id} to ${email}...`
  },

  // Statistics
  async getReceiptStats(): Promise<{ data: GoodsReceiptStats }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalReceipts = mockGoodsReceipts.length
    const draftReceipts = mockGoodsReceipts.filter((r) => r.status === 'DRAFT').length
    const postedReceipts = mockGoodsReceipts.filter((r) => r.status === 'POSTED').length
    const cancelledReceipts = mockGoodsReceipts.filter((r) => r.status === 'CANCELLED').length

    const totalAmount = mockGoodsReceipts.reduce((sum, r) => sum + r.totalAmount, 0)
    const averageReceiptValue = totalReceipts > 0 ? totalAmount / totalReceipts : 0

    const receiptsByStatus = [
      { status: GoodsReceiptStatus.DRAFT, count: draftReceipts },
      { status: GoodsReceiptStatus.POSTED, count: postedReceipts },
      { status: GoodsReceiptStatus.CANCELLED, count: cancelledReceipts },
    ]

    const receiptsByType = [
      {
        type: ReceiptType.FULL,
        count: mockGoodsReceipts.filter((r) => r.type === ReceiptType.FULL).length,
      },
      {
        type: ReceiptType.PARTIAL,
        count: mockGoodsReceipts.filter((r) => r.type === ReceiptType.PARTIAL).length,
      },
      {
        type: ReceiptType.OVER_RECEIPT,
        count: mockGoodsReceipts.filter((r) => r.type === ReceiptType.OVER_RECEIPT).length,
      },
    ]

    const receiptsByVendor = mockGoodsReceipts.reduce(
      (acc, r) => {
        const existing = acc.find((v) => v.vendor === r.vendorName)
        if (existing) {
          existing.count++
          existing.amount += r.totalAmount
        } else {
          acc.push({ vendor: r.vendorName, count: 1, amount: r.totalAmount })
        }
        return acc
      },
      [] as { vendor: string; count: number; amount: number }[],
    )

    const receiptsByWarehouse = mockGoodsReceipts.reduce(
      (acc, r) => {
        const existing = acc.find((w) => w.warehouse === r.warehouseName)
        if (existing) {
          existing.count++
          existing.amount += r.totalAmount
        } else {
          acc.push({ warehouse: r.warehouseName, count: 1, amount: r.totalAmount })
        }
        return acc
      },
      [] as { warehouse: string; count: number; amount: number }[],
    )

    const monthlyTrend = [
      { month: 'Jan 2024', count: 5, amount: 5000 },
      { month: 'Feb 2024', count: 8, amount: 8000 },
      { month: 'Mar 2024', count: 12, amount: 12000 },
    ]

    return {
      data: {
        totalReceipts,
        draftReceipts,
        postedReceipts,
        cancelledReceipts,
        totalAmount,
        averageReceiptValue,
        receiptsByStatus,
        receiptsByType,
        receiptsByVendor,
        receiptsByWarehouse,
        monthlyTrend,
      },
    }
  },

  // Validation
  async validateReceipt(
    data: GoodsReceiptFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data.receiptNumber) errors.push('Receipt number is required')
    if (!data.receiptDate) errors.push('Receipt date is required')
    if (!data.vendorCode) errors.push('Vendor is required')
    if (!data.purchaseOrderId) errors.push('Purchase order is required')
    if (!data.warehouseCode) errors.push('Warehouse is required')
    if (!data.lineItems || data.lineItems.length === 0) {
      errors.push('At least one line item is required')
    }

    if (data.lineItems) {
      data.lineItems.forEach((item, index) => {
        if (!item.itemCode) errors.push(`Item ${index + 1}: Item code is required`)
        if (!item.description) errors.push(`Item ${index + 1}: Description is required`)
        if (item.orderedQuantity <= 0)
          errors.push(`Item ${index + 1}: Quantity must be greater than 0`)
        if (item.unitPrice < 0) errors.push(`Item ${index + 1}: Unit price cannot be negative`)
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // Filter-specific getters
  async getReceiptsByStatus(status: string): Promise<GoodsReceipt[]> {
    return mockGoodsReceipts.filter((r) => r.status === status)
  },

  async getReceiptsByVendor(vendorCode: string): Promise<GoodsReceipt[]> {
    return mockGoodsReceipts.filter((r) => r.vendorCode === vendorCode)
  },

  async getReceiptsByWarehouse(warehouseCode: string): Promise<GoodsReceipt[]> {
    return mockGoodsReceipts.filter((r) => r.warehouseCode === warehouseCode)
  },

  async getReceiptsByDateRange(fromDate: string, toDate: string): Promise<GoodsReceipt[]> {
    return mockGoodsReceipts.filter((r) => r.receiptDate >= fromDate && r.receiptDate <= toDate)
  },
}
