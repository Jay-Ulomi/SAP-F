import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptFilters,
  GoodsReceiptStats,
  GoodsReceiptPagination
} from '../types'
import { ReceiptStatus } from '../types'

// Mock data for goods receipts
const mockReceipts: GoodsReceipt[] = [
  {
    id: 1,
    documentNo: 'GR-2024-001',
    postingDate: '2024-01-15',
    documentDate: '2024-01-15',
    series: 'GR-2024',
    businessPartnerCode: 'SUP001',
    businessPartnerName: 'ABC Suppliers Ltd',
    supplier: 'ABC Suppliers Ltd',
    warehouse: 'Main Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM001',
        description: 'Raw Material A',
        quantity: 100,
        unitPrice: 15.50,
        uomCode: 'KG',
        accountName: 'Inventory Account',
        dimension1: 'Dept-01',
        dimension2: 'Cost-Center-A',
        dimension3: 'Project-X',
        dimension4: 'Region-North',
        warehouse: 'Main Warehouse',
        project: 'Project Alpha',
        lineTotal: 1550.00
      },
      {
        itemCode: 'ITEM002',
        description: 'Component B',
        quantity: 50,
        unitPrice: 25.00,
        uomCode: 'PCS',
        accountName: 'Inventory Account',
        dimension1: 'Dept-02',
        dimension2: 'Cost-Center-B',
        dimension3: 'Project-Y',
        dimension4: 'Region-South',
        warehouse: 'Main Warehouse',
        project: 'Project Beta',
        lineTotal: 1250.00
      }
    ],
    itemsCount: 2,
    totalAmount: 2800.00,
    status: ReceiptStatus.RECEIVED,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    documentNo: 'GR-2024-002',
    postingDate: '2024-01-14',
    documentDate: '2024-01-14',
    series: 'GR-2024',
    businessPartnerCode: 'SUP002',
    businessPartnerName: 'XYZ Trading Co',
    supplier: 'XYZ Trading Co',
    warehouse: 'Secondary Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM003',
        description: 'Electronic Component',
        quantity: 25,
        unitPrice: 45.00,
        uomCode: 'PCS',
        accountName: 'Electronics Inventory',
        dimension1: 'Dept-03',
        dimension2: 'Cost-Center-C',
        dimension3: 'Project-Z',
        dimension4: 'Region-East',
        warehouse: 'Secondary Warehouse',
        project: 'Project Gamma',
        lineTotal: 1125.00
      }
    ],
    itemsCount: 1,
    totalAmount: 1125.00,
    status: ReceiptStatus.PENDING,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    documentNo: 'GR-2024-003',
    postingDate: '2024-01-13',
    documentDate: '2024-01-13',
    series: 'GR-2024',
    businessPartnerCode: 'SUP003',
    businessPartnerName: 'Quality Parts Inc',
    supplier: 'Quality Parts Inc',
    warehouse: 'Main Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM004',
        description: 'Premium Material',
        quantity: 200,
        unitPrice: 12.75,
        uomCode: 'KG',
        accountName: 'Premium Inventory',
        dimension1: 'Dept-01',
        dimension2: 'Cost-Center-A',
        dimension3: 'Project-X',
        dimension4: 'Region-West',
        warehouse: 'Main Warehouse',
        project: 'Project Delta',
        lineTotal: 2550.00
      }
    ],
    itemsCount: 1,
    totalAmount: 2550.00,
    status: ReceiptStatus.RECEIVED,
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-13T09:00:00Z'
  }
]

// Goods Receipt API service
export const goodsReceiptApi = {
  // Get all receipts with pagination and filters
  async getReceipts(
    page: number = 1,
    limit: number = 10,
    filters?: GoodsReceiptFilters
  ): Promise<{ receipts: GoodsReceipt[]; pagination: GoodsReceiptPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredReceipts = [...mockReceipts]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredReceipts = filteredReceipts.filter(
          (receipt) =>
            receipt.documentNo.toLowerCase().includes(searchLower) ||
            receipt.supplier.toLowerCase().includes(searchLower) ||
            receipt.warehouse.toLowerCase().includes(searchLower) ||
            receipt.businessPartnerName.toLowerCase().includes(searchLower)
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredReceipts = filteredReceipts.filter((receipt) =>
          filters.status!.includes(receipt.status! as ReceiptStatus)
        )
      }

      if (filters.supplier) {
        filteredReceipts = filteredReceipts.filter((receipt) =>
          receipt.supplier.toLowerCase().includes(filters.supplier!.toLowerCase())
        )
      }

      if (filters.warehouse) {
        filteredReceipts = filteredReceipts.filter((receipt) =>
          receipt.warehouse.toLowerCase().includes(filters.warehouse!.toLowerCase())
        )
      }

      if (filters.dateRange) {
        filteredReceipts = filteredReceipts.filter((receipt) => {
          const receiptDate = new Date(receipt.postingDate)
          return receiptDate >= filters.dateRange!.start && receiptDate <= filters.dateRange!.end
        })
      }
    }

    // Calculate pagination
    const total = filteredReceipts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedReceipts = filteredReceipts.slice(startIndex, endIndex)

    return {
      receipts: paginatedReceipts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }
  },

  // Get receipt by ID
  async getReceiptById(id: string): Promise<GoodsReceipt | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockReceipts.find((receipt) => receipt.id === parseInt(id)) || null
  },

  // Create new receipt
  async createReceipt(data: GoodsReceiptFormData): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalAmount = data.lineItems.reduce((sum, item) => sum + item.lineTotal, 0)

    const newReceipt: GoodsReceipt = {
      id: Math.max(...mockReceipts.map(r => r.id!)) + 1,
      documentNo: `GR-2024-${String(mockReceipts.length + 1).padStart(3, '0')}`,
      postingDate: data.postingDate,
      documentDate: data.documentDate,
      series: data.series,
      businessPartnerCode: data.businessPartnerCode,
      businessPartnerName: data.businessPartnerName,
      supplier: data.supplier,
      warehouse: data.warehouse,
      lineItems: data.lineItems,
      itemsCount: data.lineItems.length,
      totalAmount,
      status: ReceiptStatus.DRAFT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockReceipts.push(newReceipt)
    return newReceipt
  },

  // Update receipt
  async updateReceipt(id: string, data: Partial<GoodsReceiptFormData>): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const receiptIndex = mockReceipts.findIndex((receipt) => receipt.id === parseInt(id))
    if (receiptIndex === -1) {
      throw new Error('Receipt not found')
    }

    const existingReceipt = mockReceipts[receiptIndex]
    const totalAmount = data.lineItems ? data.lineItems.reduce((sum, item) => sum + item.lineTotal, 0) : existingReceipt.totalAmount

    const updatedReceipt: GoodsReceipt = {
      ...existingReceipt,
      ...(data.postingDate && { postingDate: data.postingDate }),
      ...(data.documentDate && { documentDate: data.documentDate }),
      ...(data.series && { series: data.series }),
      ...(data.businessPartnerCode && { businessPartnerCode: data.businessPartnerCode }),
      ...(data.businessPartnerName && { businessPartnerName: data.businessPartnerName }),
      ...(data.supplier && { supplier: data.supplier }),
      ...(data.warehouse && { warehouse: data.warehouse }),
      ...(data.lineItems && {
        lineItems: data.lineItems,
        itemsCount: data.lineItems.length,
        totalAmount
      }),
      updatedAt: new Date().toISOString()
    }

    mockReceipts[receiptIndex] = updatedReceipt
    return updatedReceipt
  },

  // Delete receipt
  async deleteReceipt(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const receiptIndex = mockReceipts.findIndex((receipt) => receipt.id === parseInt(id))
    if (receiptIndex === -1) {
      throw new Error('Receipt not found')
    }

    mockReceipts.splice(receiptIndex, 1)
  },

  // Get receipt statistics
  async getReceiptStats(): Promise<GoodsReceiptStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalReceipts = mockReceipts.length
    const receivedReceipts = mockReceipts.filter((r) => r.status === ReceiptStatus.RECEIVED).length
    const pendingReceipts = mockReceipts.filter((r) => r.status === ReceiptStatus.PENDING).length
    const draftReceipts = mockReceipts.filter((r) => r.status === ReceiptStatus.DRAFT).length
    const cancelledReceipts = mockReceipts.filter((r) => r.status === ReceiptStatus.CANCELLED).length

    const totalValue = mockReceipts.reduce((sum, receipt) => sum + receipt.totalAmount, 0)
    const averageValue = totalReceipts > 0 ? totalValue / totalReceipts : 0

    return {
      totalReceipts,
      receivedReceipts,
      pendingReceipts,
      draftReceipts,
      cancelledReceipts,
      totalValue,
      averageValue
    }
  },

  // Business logic methods
  async completeReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const receipt = mockReceipts.find((r) => r.id === parseInt(id))
    if (!receipt) {
      throw new Error('Receipt not found')
    }

    if (receipt.status !== ReceiptStatus.PENDING && receipt.status !== ReceiptStatus.DRAFT) {
      throw new Error('Receipt cannot be completed')
    }

    receipt.status = ReceiptStatus.RECEIVED
    receipt.updatedAt = new Date().toISOString()

    return receipt
  },

  async cancelReceipt(id: string): Promise<GoodsReceipt> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const receipt = mockReceipts.find((r) => r.id === parseInt(id))
    if (!receipt) {
      throw new Error('Receipt not found')
    }

    if (receipt.status === ReceiptStatus.RECEIVED) {
      throw new Error('Cannot cancel received goods')
    }

    receipt.status = ReceiptStatus.CANCELLED
    receipt.updatedAt = new Date().toISOString()

    return receipt
  }
}