import { PurchaseReturnStatus, ReturnType, ReturnReason, Currency } from '../types'
import type {
  PurchaseReturn,
  PurchaseReturnFormData,
  PurchaseReturnFilters,
  PurchaseReturnStats,
  PurchaseReturnPagination,
} from '../types'

// Mock data
const mockPurchaseReturns: PurchaseReturn[] = [
  {
    id: '1',
    docNum: 'PR-001',
    docEntry: 1,
    returnNumber: 'PR-2024-001',
    returnDate: '2024-01-15',
    postingDate: '2024-01-15',
    type: ReturnType.QUALITY_ISSUE,
    status: PurchaseReturnStatus.POSTED,
    currency: Currency.USD,
    subtotal: 500.0,
    taxTotal: 50.0,
    totalAmount: 550.0,
    vendorCode: 'V001',
    vendorName: 'ABC Supplies',
    vendorContact: 'John Smith',
    vendorEmail: 'john@abcsupplies.com',
    vendorPhone: '+1-555-0123',
    goodsReceiptId: 'GR-001',
    goodsReceiptNumber: 'GR-2024-001',
    warehouseCode: 'WH-001',
    warehouseName: 'Main Warehouse',
    department: 'Purchasing',
    costCenter: 'CC-001',
    projectCode: 'PROJ-001',
    returnReason: ReturnReason.DEFECTIVE,
    notes: 'Items received with quality issues',
    lineItems: [
      {
        id: '1',
        itemCode: 'ITEM-001',
        itemName: 'Electronic Component',
        description: 'High-quality electronic component',
        originalQuantity: 100,
        returnQuantity: 25,
        unitPrice: 20.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 50.0,
        lineTotal: 550.0,
        accountCode: 'ACCT-001',
        costCenter: 'CC-001',
        projectCode: 'PROJ-001',
        warehouseCode: 'WH-001',
        binLocation: 'A1-B2',
        batchNumber: 'BATCH-001',
        serialNumber: undefined,
        returnReason: ReturnReason.DEFECTIVE,
        notes: 'Components have manufacturing defects',
        goodsReceiptId: 'GR-001',
        goodsReceiptLineId: 'GRL-001',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    docNum: 'PR-002',
    docEntry: 2,
    returnNumber: 'PR-2024-002',
    returnDate: '2024-01-20',
    postingDate: '2024-01-20',
    type: ReturnType.DAMAGED,
    status: PurchaseReturnStatus.DRAFT,
    currency: Currency.USD,
    subtotal: 300.0,
    taxTotal: 30.0,
    totalAmount: 330.0,
    vendorCode: 'V002',
    vendorName: 'XYZ Manufacturing',
    vendorContact: 'Jane Doe',
    vendorEmail: 'jane@xyzmanufacturing.com',
    vendorPhone: '+1-555-0456',
    warehouseCode: 'WH-002',
    warehouseName: 'Secondary Warehouse',
    department: 'Operations',
    costCenter: 'CC-002',
    projectCode: 'PROJ-002',
    returnReason: ReturnReason.DAMAGED_IN_TRANSIT,
    notes: 'Items damaged during shipping',
    lineItems: [
      {
        id: '2',
        itemCode: 'ITEM-002',
        itemName: 'Mechanical Part',
        description: 'Precision mechanical component',
        originalQuantity: 50,
        returnQuantity: 15,
        unitPrice: 20.0,
        taxCode: 'VAT',
        taxPercent: 10,
        taxAmount: 30.0,
        lineTotal: 330.0,
        accountCode: 'ACCT-002',
        costCenter: 'CC-002',
        projectCode: 'PROJ-002',
        warehouseCode: 'WH-002',
        binLocation: 'C3-D4',
        batchNumber: 'BATCH-002',
        serialNumber: undefined,
        returnReason: ReturnReason.DAMAGED_IN_TRANSIT,
        notes: 'Parts arrived with visible damage',
        goodsReceiptId: 'GR-002',
        goodsReceiptLineId: 'GRL-002',
      },
    ],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
]

export const purchaseReturnApi = {
  // Core CRUD operations
  async getReturns(params?: {
    page?: number
    limit?: number
    filters?: PurchaseReturnFilters
  }): Promise<{ data: PurchaseReturn[]; pagination: PurchaseReturnPagination }> {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    let filteredReturns = [...mockPurchaseReturns]

    if (params?.filters) {
      if (params.filters.status) {
        filteredReturns = filteredReturns.filter((r) => r.status === params.filters!.status)
      }
      if (params.filters.type) {
        filteredReturns = filteredReturns.filter((r) => r.type === params.filters!.type)
      }
      if (params.filters.returnReason) {
        filteredReturns = filteredReturns.filter(
          (r) => r.returnReason === params.filters!.returnReason,
        )
      }
      if (params.filters.vendorCode) {
        filteredReturns = filteredReturns.filter((r) =>
          r.vendorCode.includes(params.filters!.vendorCode!),
        )
      }
      if (params.filters.search) {
        const search = params.filters.search.toLowerCase()
        filteredReturns = filteredReturns.filter(
          (r) =>
            r.returnNumber.toLowerCase().includes(search) ||
            r.vendorName.toLowerCase().includes(search) ||
            r.goodsReceiptNumber?.toLowerCase().includes(search) ||
            false,
        )
      }
    }

    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedReturns = filteredReturns.slice(start, end)

    return {
      data: paginatedReturns,
      pagination: {
        page,
        limit,
        total: filteredReturns.length,
        totalPages: Math.ceil(filteredReturns.length / limit),
        hasMore: end < filteredReturns.length,
      },
    }
  },

  async getReturn(id: string): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const returnItem = mockPurchaseReturns.find((r) => r.id === id)
    if (!returnItem) {
      throw new Error('Purchase return not found')
    }
    return returnItem
  },

  async createReturn(data: PurchaseReturnFormData): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReturn: PurchaseReturn = {
      id: Date.now().toString(),
      docNum: `PR-${Date.now()}`,
      docEntry: Date.now(),
      ...data,
      status: PurchaseReturnStatus.DRAFT,
      vendorName: 'Vendor Name', // Would come from vendor lookup
      vendorContact: 'Contact Person',
      vendorEmail: 'contact@vendor.com',
      vendorPhone: '+1-555-0000',
      goodsReceiptNumber: 'GR-REF', // Would come from GR lookup
      warehouseName: 'Warehouse Name', // Would come from warehouse lookup
      subtotal: data.lineItems.reduce((sum, item) => sum + item.returnQuantity * item.unitPrice, 0),
      taxTotal: data.lineItems.reduce(
        (sum, item) => sum + item.returnQuantity * item.unitPrice * (item.taxPercent / 100),
        0,
      ),
      totalAmount: 0, // Calculated
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random(),
        taxAmount: item.returnQuantity * item.unitPrice * (item.taxPercent / 100),
        lineTotal: item.returnQuantity * item.unitPrice,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount
    newReturn.totalAmount = newReturn.subtotal + newReturn.taxTotal

    mockPurchaseReturns.push(newReturn)
    return newReturn
  },

  async updateReturn(id: string, data: PurchaseReturnFormData): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockPurchaseReturns.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Purchase return not found')
    }

    const updatedReturn: PurchaseReturn = {
      ...mockPurchaseReturns[index],
      ...data,
      subtotal: data.lineItems.reduce((sum, item) => sum + item.returnQuantity * item.unitPrice, 0),
      taxTotal: data.lineItems.reduce(
        (sum, item) => sum + item.returnQuantity * item.unitPrice * (item.taxPercent / 100),
        0,
      ),
      lineItems: data.lineItems.map((item) => ({
        ...item,
        id: item.id || Date.now().toString() + Math.random(),
        taxAmount: item.returnQuantity * item.unitPrice * (item.taxPercent / 100),
        lineTotal: item.returnQuantity * item.unitPrice,
      })),
      updatedAt: new Date().toISOString(),
    }

    // Calculate total amount
    updatedReturn.totalAmount = updatedReturn.subtotal + updatedReturn.taxTotal

    mockPurchaseReturns[index] = updatedReturn
    return updatedReturn
  },

  async deleteReturn(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockPurchaseReturns.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Purchase return not found')
    }
    mockPurchaseReturns.splice(index, 1)
  },

  // Business logic operations
  async postReturn(id: string): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const returnItem = await this.getReturn(id)
    if (returnItem.status !== PurchaseReturnStatus.DRAFT) {
      throw new Error('Only draft returns can be posted')
    }

    returnItem.status = PurchaseReturnStatus.POSTED
    returnItem.postingDate = new Date().toISOString()
    returnItem.updatedAt = new Date().toISOString()

    return returnItem
  },

  async cancelReturn(id: string): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const returnItem = await this.getReturn(id)
    if (returnItem.status === PurchaseReturnStatus.POSTED) {
      throw new Error('Posted returns cannot be cancelled')
    }

    returnItem.status = PurchaseReturnStatus.CANCELLED
    returnItem.updatedAt = new Date().toISOString()

    return returnItem
  },

  async putOnHold(id: string): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const returnItem = await this.getReturn(id)
    if (returnItem.status === PurchaseReturnStatus.POSTED) {
      throw new Error('Posted returns cannot be put on hold')
    }

    returnItem.status = PurchaseReturnStatus.ON_HOLD
    returnItem.updatedAt = new Date().toISOString()

    return returnItem
  },

  async resumeReturn(id: string): Promise<PurchaseReturn> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const returnItem = await this.getReturn(id)
    if (returnItem.status === PurchaseReturnStatus.ON_HOLD) {
      returnItem.status = PurchaseReturnStatus.DRAFT
      returnItem.updatedAt = new Date().toISOString()
    }

    return returnItem
  },

  async copyReturn(id: string): Promise<PurchaseReturn> {
    const original = await this.getReturn(id)
    const copyData: PurchaseReturnFormData = {
      returnNumber: `COPY-${original.returnNumber}`,
      returnDate: new Date().toISOString().split('T')[0],
      postingDate: new Date().toISOString().split('T')[0],
      type: original.type,
      currency: original.currency,
      vendorCode: original.vendorCode,
      goodsReceiptId: original.goodsReceiptId,
      warehouseCode: original.warehouseCode,
      department: original.department,
      costCenter: original.costCenter,
      projectCode: original.projectCode,
      returnReason: original.returnReason,
      notes: `Copy of ${original.returnNumber}`,
      lineItems: original.lineItems.map((item) => ({
        itemCode: item.itemCode,
        itemName: item.itemName,
        description: item.description,
        originalQuantity: item.originalQuantity,
        returnQuantity: item.returnQuantity,
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
        returnReason: item.returnReason,
        notes: item.notes,
        goodsReceiptId: item.goodsReceiptId,
        goodsReceiptLineId: item.goodsReceiptLineId,
      })),
    }

    return this.createReturn(copyData)
  },

  async printReturn(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Printing return ${id}`)
  },

  async emailReturn(id: string, email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Emailing return ${id} to ${email}`)
  },

  // Statistics and reporting
  async getReturnStats(): Promise<{ data: PurchaseReturnStats }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalReturns = mockPurchaseReturns.length
    const draftReturns = mockPurchaseReturns.filter(
      (r) => r.status === PurchaseReturnStatus.DRAFT,
    ).length
    const openReturns = mockPurchaseReturns.filter(
      (r) => r.status === PurchaseReturnStatus.OPEN,
    ).length
    const postedReturns = mockPurchaseReturns.filter(
      (r) => r.status === PurchaseReturnStatus.POSTED,
    ).length
    const cancelledReturns = mockPurchaseReturns.filter(
      (r) => r.status === PurchaseReturnStatus.CANCELLED,
    ).length

    const totalAmount = mockPurchaseReturns.reduce((sum, r) => sum + r.totalAmount, 0)
    const averageReturnValue = totalReturns > 0 ? totalAmount / totalReturns : 0

    const returnsByStatus = [
      { status: PurchaseReturnStatus.DRAFT, count: draftReturns },
      { status: PurchaseReturnStatus.OPEN, count: openReturns },
      { status: PurchaseReturnStatus.POSTED, count: postedReturns },
      { status: PurchaseReturnStatus.CANCELLED, count: cancelledReturns },
    ]

    const returnsByType = [
      {
        type: ReturnType.STANDARD,
        count: mockPurchaseReturns.filter((r) => r.type === ReturnType.STANDARD).length,
      },
      {
        type: ReturnType.QUALITY_ISSUE,
        count: mockPurchaseReturns.filter((r) => r.type === ReturnType.QUALITY_ISSUE).length,
      },
      {
        type: ReturnType.DAMAGED,
        count: mockPurchaseReturns.filter((r) => r.type === ReturnType.DAMAGED).length,
      },
      {
        type: ReturnType.OVERAGE,
        count: mockPurchaseReturns.filter((r) => r.type === ReturnType.OVERAGE).length,
      },
      {
        type: ReturnType.EXPIRED,
        count: mockPurchaseReturns.filter((r) => r.type === ReturnType.EXPIRED).length,
      },
    ]

    const returnsByReason = [
      {
        reason: ReturnReason.DEFECTIVE,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.DEFECTIVE).length,
      },
      {
        reason: ReturnReason.WRONG_ITEM,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.WRONG_ITEM).length,
      },
      {
        reason: ReturnReason.DAMAGED_IN_TRANSIT,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.DAMAGED_IN_TRANSIT)
          .length,
      },
      {
        reason: ReturnReason.QUALITY_ISSUE,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.QUALITY_ISSUE)
          .length,
      },
      {
        reason: ReturnReason.OVERDELIVERY,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.OVERDELIVERY)
          .length,
      },
      {
        reason: ReturnReason.CUSTOMER_REQUEST,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.CUSTOMER_REQUEST)
          .length,
      },
      {
        reason: ReturnReason.EXPIRED,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.EXPIRED).length,
      },
      {
        reason: ReturnReason.OTHER,
        count: mockPurchaseReturns.filter((r) => r.returnReason === ReturnReason.OTHER).length,
      },
    ]

    const returnsByVendor = mockPurchaseReturns.reduce(
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

    const returnsByWarehouse = mockPurchaseReturns.reduce(
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
      { month: 'Jan 2024', count: 3, amount: 1500 },
      { month: 'Feb 2024', count: 5, amount: 2500 },
      { month: 'Mar 2024', count: 8, amount: 4000 },
    ]

    return {
      data: {
        totalReturns,
        draftReturns,
        openReturns,
        postedReturns,
        cancelledReturns,
        totalAmount,
        averageReturnValue,
        returnsByStatus,
        returnsByType,
        returnsByReason,
        returnsByVendor,
        returnsByWarehouse,
        monthlyTrend,
      },
    }
  },

  // Validation
  async validateReturn(
    data: PurchaseReturnFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data.returnNumber) errors.push('Return number is required')
    if (!data.returnDate) errors.push('Return date is required')
    if (!data.vendorCode) errors.push('Vendor is required')
    if (!data.warehouseCode) errors.push('Warehouse is required')
    if (!data.lineItems || data.lineItems.length === 0) {
      errors.push('At least one line item is required')
    }

    if (data.lineItems) {
      data.lineItems.forEach((item, index) => {
        if (!item.itemCode) errors.push(`Item ${index + 1}: Item code is required`)
        if (!item.description) errors.push(`Item ${index + 1}: Description is required`)
        if (item.returnQuantity <= 0)
          errors.push(`Item ${index + 1}: Return quantity must be greater than 0`)
        if (item.returnQuantity > item.originalQuantity)
          errors.push(`Item ${index + 1}: Return quantity cannot exceed original quantity`)
        if (item.unitPrice < 0) errors.push(`Item ${index + 1}: Unit price cannot be negative`)
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // Filter-specific getters
  async getReturnsByStatus(status: string): Promise<PurchaseReturn[]> {
    return mockPurchaseReturns.filter((r) => r.status === status)
  },

  async getReturnsByVendor(vendorCode: string): Promise<PurchaseReturn[]> {
    return mockPurchaseReturns.filter((r) => r.vendorCode === vendorCode)
  },

  async getReturnsByWarehouse(warehouseCode: string): Promise<PurchaseReturn[]> {
    return mockPurchaseReturns.filter((r) => r.warehouseCode === warehouseCode)
  },

  async getReturnsByDateRange(fromDate: string, toDate: string): Promise<PurchaseReturn[]> {
    return mockPurchaseReturns.filter((r) => r.returnDate >= fromDate && r.returnDate <= toDate)
  },
}
