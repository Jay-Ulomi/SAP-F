import { GoodsReceiptType, GoodsReceiptStatus, TransactionType, DocumentType } from '../types'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptListParams,
  GoodsReceiptListResponse,
  GoodsReceiptStats,
} from '../types'

// Mock data
const mockGoodsReceipts: GoodsReceipt[] = [
  {
    id: '1',
    documentNumber: 'GR-2024-001',
    type: GoodsReceiptType.RECEIPT,
    status: GoodsReceiptStatus.POSTED,
    transactionType: TransactionType.INBOUND,
    documentType: DocumentType.PURCHASE_ORDER,
    referenceDocument: 'PO-2024-001',
    referenceNumber: 'PO-2024-001',
    date: new Date('2024-01-15'),
    postingDate: new Date('2024-01-15'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC001',
    locationName: 'Receiving Dock',
    supplierCode: 'SUP001',
    supplierName: 'ABC Suppliers Ltd',
    employeeCode: 'EMP001',
    employeeName: 'John Smith',
    department: 'Warehouse',
    totalQuantity: 100,
    totalAmount: 15000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    remarks: 'Standard goods receipt',
    items: [
      {
        id: '1-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        quantity: 50,
        unitPrice: 200.0,
        totalAmount: 10000.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC001',
        batchNumber: 'BATCH001',
        remarks: 'New stock',
      },
      {
        id: '1-2',
        itemCode: 'ITEM002',
        itemName: 'Wireless Mouse',
        description: 'Logitech MX Master 3',
        quantity: 50,
        unitPrice: 100.0,
        totalAmount: 5000.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC001',
        batchNumber: 'BATCH002',
        remarks: 'Accessories',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-15T08:00:00Z'),
    postedBy: 'admin',
    postedDate: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    documentNumber: 'GI-2024-001',
    type: GoodsReceiptType.ISSUE,
    status: GoodsReceiptStatus.POSTED,
    transactionType: TransactionType.OUTBOUND,
    documentType: DocumentType.SALES_ORDER,
    referenceDocument: 'SO-2024-001',
    referenceNumber: 'SO-2024-001',
    date: new Date('2024-01-16'),
    postingDate: new Date('2024-01-16'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC002',
    locationName: 'Shipping Dock',
    customerCode: 'CUST001',
    customerName: 'XYZ Corporation',
    employeeCode: 'EMP002',
    employeeName: 'Jane Doe',
    department: 'Warehouse',
    totalQuantity: 25,
    totalAmount: 7500.0,
    currency: 'USD',
    exchangeRate: 1.0,
    remarks: 'Customer order fulfillment',
    items: [
      {
        id: '2-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        quantity: 25,
        unitPrice: 300.0,
        totalAmount: 7500.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC002',
        batchNumber: 'BATCH001',
        remarks: 'Customer delivery',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-16T09:00:00Z'),
    postedBy: 'admin',
    postedDate: new Date('2024-01-16T11:15:00Z'),
  },
  {
    id: '3',
    documentNumber: 'GT-2024-001',
    type: GoodsReceiptType.TRANSFER,
    status: GoodsReceiptStatus.APPROVED,
    transactionType: TransactionType.INTERNAL,
    documentType: DocumentType.TRANSFER_ORDER,
    referenceDocument: 'TO-2024-001',
    referenceNumber: 'TO-2024-001',
    date: new Date('2024-01-17'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC001',
    locationName: 'Receiving Dock',
    employeeCode: 'EMP003',
    employeeName: 'Mike Johnson',
    department: 'Warehouse',
    totalQuantity: 10,
    totalAmount: 2000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    remarks: 'Internal transfer to branch',
    items: [
      {
        id: '3-1',
        itemCode: 'ITEM002',
        itemName: 'Wireless Mouse',
        description: 'Logitech MX Master 3',
        quantity: 10,
        unitPrice: 100.0,
        totalAmount: 1000.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC001',
        batchNumber: 'BATCH002',
        remarks: 'Branch transfer',
      },
      {
        id: '3-2',
        itemCode: 'ITEM003',
        itemName: 'USB Cable',
        description: 'USB-C to USB-A Cable',
        quantity: 10,
        unitPrice: 100.0,
        totalAmount: 1000.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC001',
        batchNumber: 'BATCH003',
        remarks: 'Accessory transfer',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-17T10:00:00Z'),
    approvedBy: 'manager',
    approvedDate: new Date('2024-01-17T14:30:00Z'),
  },
  {
    id: '4',
    documentNumber: 'GA-2024-001',
    type: GoodsReceiptType.ADJUSTMENT,
    status: GoodsReceiptStatus.DRAFT,
    transactionType: TransactionType.INTERNAL,
    documentType: DocumentType.ADJUSTMENT,
    date: new Date('2024-01-18'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC003',
    locationName: 'Storage Area',
    employeeCode: 'EMP004',
    employeeName: 'Sarah Wilson',
    department: 'Inventory',
    totalQuantity: 5,
    totalAmount: 500.0,
    currency: 'USD',
    exchangeRate: 1.0,
    remarks: 'Stock adjustment for damaged goods',
    items: [
      {
        id: '4-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        quantity: -5,
        unitPrice: 200.0,
        totalAmount: -1000.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC003',
        batchNumber: 'BATCH001',
        remarks: 'Damaged goods write-off',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-18T11:00:00Z'),
  },
  {
    id: '5',
    documentNumber: 'GR-2024-002',
    type: GoodsReceiptType.RETURN,
    status: GoodsReceiptStatus.PENDING,
    transactionType: TransactionType.INBOUND,
    documentType: DocumentType.MANUAL,
    referenceDocument: 'SO-2024-001',
    referenceNumber: 'SO-2024-001',
    date: new Date('2024-01-19'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC001',
    locationName: 'Receiving Dock',
    customerCode: 'CUST001',
    customerName: 'XYZ Corporation',
    employeeCode: 'EMP005',
    employeeName: 'Tom Brown',
    department: 'Warehouse',
    totalQuantity: 2,
    totalAmount: 600.0,
    currency: 'USD',
    exchangeRate: 1.0,
    remarks: 'Customer return - defective items',
    items: [
      {
        id: '5-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        quantity: 2,
        unitPrice: 300.0,
        totalAmount: 600.0,
        warehouseCode: 'WH001',
        locationCode: 'LOC001',
        batchNumber: 'BATCH001',
        remarks: 'Defective return',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-19T13:00:00Z'),
  },
]

// API functions
export const goodsReceiptsApi = {
  // Get all goods receipts with pagination and filters
  async getGoodsReceipts(params: GoodsReceiptListParams = {}): Promise<GoodsReceiptListResponse> {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockGoodsReceipts]

    // Apply filters
    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.transactionType) {
      filteredItems = filteredItems.filter(
        (item) => item.transactionType === filters.transactionType,
      )
    }
    if (filters.documentType) {
      filteredItems = filteredItems.filter((item) => item.documentType === filters.documentType)
    }
    if (filters.warehouseCode) {
      filteredItems = filteredItems.filter((item) => item.warehouseCode === filters.warehouseCode)
    }
    if (filters.supplierCode) {
      filteredItems = filteredItems.filter((item) => item.supplierCode === filters.supplierCode)
    }
    if (filters.customerCode) {
      filteredItems = filteredItems.filter((item) => item.customerCode === filters.customerCode)
    }
    if (filters.employeeCode) {
      filteredItems = filteredItems.filter((item) => item.employeeCode === filters.employeeCode)
    }
    if (filters.dateFrom) {
      filteredItems = filteredItems.filter((item) => item.date >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredItems = filteredItems.filter((item) => item.date <= filters.dateTo!)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredItems = filteredItems.filter(
        (item) =>
          item.documentNumber.toLowerCase().includes(searchLower) ||
          item.referenceNumber?.toLowerCase().includes(searchLower) ||
          item.supplierName?.toLowerCase().includes(searchLower) ||
          item.customerName?.toLowerCase().includes(searchLower) ||
          item.employeeName.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof GoodsReceipt]
      const bValue = b[sortBy as keyof GoodsReceipt]

      if (aValue === undefined || bValue === undefined) return 0

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    // Apply pagination
    const total = filteredItems.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const items = filteredItems.slice(startIndex, endIndex)

    // Calculate stats
    const stats: GoodsReceiptStats = {
      totalReceipts: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.RECEIPT)
        .length,
      totalIssues: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.ISSUE).length,
      totalTransfers: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.TRANSFER)
        .length,
      totalAdjustments: mockGoodsReceipts.filter(
        (item) => item.type === GoodsReceiptType.ADJUSTMENT,
      ).length,
      totalReturns: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.RETURN)
        .length,
      pendingApprovals: mockGoodsReceipts.filter(
        (item) => item.status === GoodsReceiptStatus.PENDING,
      ).length,
      totalValue: mockGoodsReceipts.reduce((sum, item) => sum + item.totalAmount, 0),
      averageProcessingTime: 2.5, // Mock value in hours
    }

    return {
      items,
      total,
      page,
      limit,
      totalPages,
      stats,
    }
  },

  // Get single goods receipt by ID
  async getGoodsReceipt(id: string): Promise<GoodsReceipt | null> {
    return mockGoodsReceipts.find((item) => item.id === id) || null
  },

  // Create new goods receipt
  async createGoodsReceipt(data: GoodsReceiptFormData): Promise<GoodsReceipt> {
    const newId = (mockGoodsReceipts.length + 1).toString()
    const documentNumber = `GR-2024-${newId.padStart(3, '0')}`

    const newGoodsReceipt: GoodsReceipt = {
      id: newId,
      documentNumber,
      ...data,
      warehouseName: 'Main Warehouse', // Mock warehouse name
      locationName: data.locationCode ? 'Location Name' : undefined,
      supplierName: data.supplierCode ? 'Supplier Name' : undefined,
      customerName: data.customerCode ? 'Customer Name' : undefined,
      employeeName: 'Employee Name', // Mock employee name
      totalQuantity: data.items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      items: data.items.map((item, index) => ({
        ...item,
        id: `${newId}-${index + 1}`,
        totalAmount: item.quantity * item.unitPrice,
      })),
      createdBy: 'admin',
      createdDate: new Date(),
      status: GoodsReceiptStatus.DRAFT,
    }

    mockGoodsReceipts.unshift(newGoodsReceipt)
    return newGoodsReceipt
  },

  // Update goods receipt
  async updateGoodsReceipt(id: string, data: Partial<GoodsReceiptFormData>): Promise<GoodsReceipt> {
    const index = mockGoodsReceipts.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }

    const updatedGoodsReceipt: GoodsReceipt = {
      ...mockGoodsReceipts[index],
      ...data,
      totalQuantity: data.items
        ? data.items.reduce((sum, item) => sum + item.quantity, 0)
        : mockGoodsReceipts[index].totalQuantity,
      totalAmount: data.items
        ? data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
        : mockGoodsReceipts[index].totalAmount,
      items: data.items
        ? data.items.map((item, itemIndex) => ({
            ...item,
            id: `${id}-${itemIndex + 1}`,
            totalAmount: item.quantity * item.unitPrice,
          }))
        : mockGoodsReceipts[index].items,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockGoodsReceipts[index] = updatedGoodsReceipt
    return updatedGoodsReceipt
  },

  // Delete goods receipt
  async deleteGoodsReceipt(id: string): Promise<void> {
    const index = mockGoodsReceipts.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }
    mockGoodsReceipts.splice(index, 1)
  },

  // Approve goods receipt
  async approveGoodsReceipt(id: string): Promise<GoodsReceipt> {
    const index = mockGoodsReceipts.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }

    mockGoodsReceipts[index] = {
      ...mockGoodsReceipts[index],
      status: GoodsReceiptStatus.APPROVED,
      approvedBy: 'admin',
      approvedDate: new Date(),
    }

    return mockGoodsReceipts[index]
  },

  // Post goods receipt
  async postGoodsReceipt(id: string): Promise<GoodsReceipt> {
    const index = mockGoodsReceipts.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Goods receipt not found')
    }

    mockGoodsReceipts[index] = {
      ...mockGoodsReceipts[index],
      status: GoodsReceiptStatus.POSTED,
      postingDate: new Date(),
      postedBy: 'admin',
      postedDate: new Date(),
    }

    return mockGoodsReceipts[index]
  },

  // Get statistics
  async getStats(): Promise<GoodsReceiptStats> {
    return {
      totalReceipts: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.RECEIPT)
        .length,
      totalIssues: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.ISSUE).length,
      totalTransfers: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.TRANSFER)
        .length,
      totalAdjustments: mockGoodsReceipts.filter(
        (item) => item.type === GoodsReceiptType.ADJUSTMENT,
      ).length,
      totalReturns: mockGoodsReceipts.filter((item) => item.type === GoodsReceiptType.RETURN)
        .length,
      pendingApprovals: mockGoodsReceipts.filter(
        (item) => item.status === GoodsReceiptStatus.PENDING,
      ).length,
      totalValue: mockGoodsReceipts.reduce((sum, item) => sum + item.totalAmount, 0),
      averageProcessingTime: 2.5, // Mock value in hours
    }
  },
}
