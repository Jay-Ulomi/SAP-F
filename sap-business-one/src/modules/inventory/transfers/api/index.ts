import { TransferType, TransferStatus, TransferPriority, TransferReason } from '../types'
import type {
  InventoryTransfer,
  TransferFormData,
  TransferListParams,
  TransferListResponse,
  TransferStats,
} from '../types'

// Mock data
const mockTransfers: InventoryTransfer[] = [
  {
    id: '1',
    transferNumber: 'TR-2024-001',
    type: TransferType.WAREHOUSE_TO_WAREHOUSE,
    status: TransferStatus.COMPLETED,
    priority: TransferPriority.NORMAL,
    reason: TransferReason.STOCK_REBALANCING,
    date: new Date('2024-01-15'),
    requestedDate: new Date('2024-01-14'),
    expectedDate: new Date('2024-01-16'),
    actualDate: new Date('2024-01-16'),
    fromWarehouseCode: 'WH001',
    fromWarehouseName: 'Main Warehouse',
    fromLocationCode: 'LOC001',
    fromLocationName: 'Storage Area A',
    toWarehouseCode: 'WH002',
    toWarehouseName: 'Branch Warehouse',
    toLocationCode: 'LOC002',
    toLocationName: 'Receiving Area',
    requestedBy: 'EMP001',
    requestedByName: 'John Smith',
    approvedBy: 'MGR001',
    approvedByName: 'Jane Manager',
    department: 'Warehouse',
    totalQuantity: 50,
    totalAmount: 15000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    shippingMethod: 'Internal Transport',
    remarks: 'Regular stock rebalancing',
    items: [
      {
        id: '1-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        quantity: 25,
        unitPrice: 200.0,
        totalAmount: 5000.0,
        fromWarehouseCode: 'WH001',
        fromLocationCode: 'LOC001',
        toWarehouseCode: 'WH002',
        toLocationCode: 'LOC002',
        batchNumber: 'BATCH001',
        remarks: 'High demand item',
      },
      {
        id: '1-2',
        itemCode: 'ITEM002',
        itemName: 'Wireless Mouse',
        description: 'Logitech MX Master 3',
        quantity: 25,
        unitPrice: 100.0,
        totalAmount: 2500.0,
        fromWarehouseCode: 'WH001',
        fromLocationCode: 'LOC001',
        toWarehouseCode: 'WH002',
        toLocationCode: 'LOC002',
        batchNumber: 'BATCH002',
        remarks: 'Accessory transfer',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-14T08:00:00Z'),
    approvedDate: new Date('2024-01-14T10:30:00Z'),
    completedDate: new Date('2024-01-16T15:45:00Z'),
  },
  {
    id: '2',
    transferNumber: 'TR-2024-002',
    type: TransferType.LOCATION_TO_LOCATION,
    status: TransferStatus.IN_TRANSIT,
    priority: TransferPriority.HIGH,
    reason: TransferReason.CUSTOMER_ORDER,
    date: new Date('2024-01-17'),
    requestedDate: new Date('2024-01-17'),
    expectedDate: new Date('2024-01-18'),
    fromWarehouseCode: 'WH001',
    fromWarehouseName: 'Main Warehouse',
    fromLocationCode: 'LOC003',
    fromLocationName: 'Storage Area B',
    toWarehouseCode: 'WH001',
    toWarehouseName: 'Main Warehouse',
    toLocationCode: 'LOC004',
    toLocationName: 'Shipping Area',
    requestedBy: 'EMP002',
    requestedByName: 'Mike Johnson',
    department: 'Sales',
    totalQuantity: 10,
    totalAmount: 5000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    shippingMethod: 'Internal Movement',
    trackingNumber: 'TRK-001234',
    remarks: 'Urgent customer order fulfillment',
    items: [
      {
        id: '2-1',
        itemCode: 'ITEM003',
        itemName: 'USB Cable',
        description: 'USB-C to USB-A Cable',
        quantity: 10,
        unitPrice: 50.0,
        totalAmount: 500.0,
        fromWarehouseCode: 'WH001',
        fromLocationCode: 'LOC003',
        toWarehouseCode: 'WH001',
        toLocationCode: 'LOC004',
        batchNumber: 'BATCH003',
        remarks: 'Customer order item',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-17T09:00:00Z'),
  },
  {
    id: '3',
    transferNumber: 'TR-2024-003',
    type: TransferType.BRANCH_TO_BRANCH,
    status: TransferStatus.PENDING,
    priority: TransferPriority.NORMAL,
    reason: TransferReason.PRODUCTION_NEED,
    date: new Date('2024-01-18'),
    requestedDate: new Date('2024-01-18'),
    expectedDate: new Date('2024-01-20'),
    fromWarehouseCode: 'WH002',
    fromWarehouseName: 'Branch Warehouse',
    fromLocationCode: 'LOC005',
    fromLocationName: 'Storage Area',
    toWarehouseCode: 'WH003',
    toWarehouseName: 'Production Warehouse',
    toLocationCode: 'LOC006',
    toLocationName: 'Production Floor',
    requestedBy: 'EMP003',
    requestedByName: 'Sarah Wilson',
    department: 'Production',
    totalQuantity: 100,
    totalAmount: 25000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    shippingMethod: 'External Courier',
    remarks: 'Production material transfer',
    items: [
      {
        id: '3-1',
        itemCode: 'ITEM004',
        itemName: 'Raw Material A',
        description: 'Steel Component',
        quantity: 50,
        unitPrice: 200.0,
        totalAmount: 10000.0,
        fromWarehouseCode: 'WH002',
        fromLocationCode: 'LOC005',
        toWarehouseCode: 'WH003',
        toLocationCode: 'LOC006',
        batchNumber: 'BATCH004',
        remarks: 'Production material',
      },
      {
        id: '3-2',
        itemCode: 'ITEM005',
        itemName: 'Raw Material B',
        description: 'Aluminum Component',
        quantity: 50,
        unitPrice: 300.0,
        totalAmount: 15000.0,
        fromWarehouseCode: 'WH002',
        fromLocationCode: 'LOC005',
        toWarehouseCode: 'WH003',
        toLocationCode: 'LOC006',
        batchNumber: 'BATCH005',
        remarks: 'Production material',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-18T11:00:00Z'),
  },
  {
    id: '4',
    transferNumber: 'TR-2024-004',
    type: TransferType.INTERNAL,
    status: TransferStatus.DRAFT,
    priority: TransferPriority.LOW,
    reason: TransferReason.MAINTENANCE,
    date: new Date('2024-01-19'),
    fromWarehouseCode: 'WH001',
    fromWarehouseName: 'Main Warehouse',
    fromLocationCode: 'LOC007',
    fromLocationName: 'Maintenance Area',
    toWarehouseCode: 'WH001',
    toWarehouseName: 'Main Warehouse',
    toLocationCode: 'LOC008',
    toLocationName: 'Repair Area',
    requestedBy: 'EMP004',
    requestedByName: 'Tom Brown',
    department: 'Maintenance',
    totalQuantity: 5,
    totalAmount: 1000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    shippingMethod: 'Internal Movement',
    remarks: 'Equipment maintenance transfer',
    items: [
      {
        id: '4-1',
        itemCode: 'ITEM006',
        itemName: 'Maintenance Tool',
        description: 'Specialized Equipment',
        quantity: 5,
        unitPrice: 200.0,
        totalAmount: 1000.0,
        fromWarehouseCode: 'WH001',
        fromLocationCode: 'LOC007',
        toWarehouseCode: 'WH001',
        toLocationCode: 'LOC008',
        batchNumber: 'BATCH006',
        remarks: 'Maintenance equipment',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-19T14:00:00Z'),
  },
  {
    id: '5',
    transferNumber: 'TR-2024-005',
    type: TransferType.EXTERNAL,
    status: TransferStatus.CANCELLED,
    priority: TransferPriority.URGENT,
    reason: TransferReason.DAMAGE_REPLACEMENT,
    date: new Date('2024-01-20'),
    requestedDate: new Date('2024-01-20'),
    fromWarehouseCode: 'WH001',
    fromWarehouseName: 'Main Warehouse',
    fromLocationCode: 'LOC009',
    fromLocationName: 'Quality Control',
    toWarehouseCode: 'WH004',
    toWarehouseName: 'External Supplier',
    requestedBy: 'EMP005',
    requestedByName: 'Lisa Davis',
    department: 'Quality Control',
    totalQuantity: 2,
    totalAmount: 400.0,
    currency: 'USD',
    exchangeRate: 1.0,
    shippingMethod: 'External Courier',
    remarks: 'Damaged goods return - cancelled due to supplier issue',
    items: [
      {
        id: '5-1',
        itemCode: 'ITEM007',
        itemName: 'Defective Product',
        description: 'Damaged Item',
        quantity: 2,
        unitPrice: 200.0,
        totalAmount: 400.0,
        fromWarehouseCode: 'WH001',
        fromLocationCode: 'LOC009',
        toWarehouseCode: 'WH004',
        batchNumber: 'BATCH007',
        remarks: 'Defective return',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-20T16:00:00Z'),
  },
]

// API functions
export const transfersApi = {
  // Get all transfers with pagination and filters
  async getTransfers(params: TransferListParams = {}): Promise<TransferListResponse> {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockTransfers]

    // Apply filters
    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.priority) {
      filteredItems = filteredItems.filter((item) => item.priority === filters.priority)
    }
    if (filters.reason) {
      filteredItems = filteredItems.filter((item) => item.reason === filters.reason)
    }
    if (filters.fromWarehouseCode) {
      filteredItems = filteredItems.filter(
        (item) => item.fromWarehouseCode === filters.fromWarehouseCode,
      )
    }
    if (filters.toWarehouseCode) {
      filteredItems = filteredItems.filter(
        (item) => item.toWarehouseCode === filters.toWarehouseCode,
      )
    }
    if (filters.requestedBy) {
      filteredItems = filteredItems.filter((item) => item.requestedBy === filters.requestedBy)
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
          item.transferNumber.toLowerCase().includes(searchLower) ||
          item.requestedByName.toLowerCase().includes(searchLower) ||
          item.fromWarehouseName.toLowerCase().includes(searchLower) ||
          item.toWarehouseName.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof InventoryTransfer]
      const bValue = b[sortBy as keyof InventoryTransfer]

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
    const stats: TransferStats = {
      totalTransfers: mockTransfers.length,
      pendingTransfers: mockTransfers.filter((item) => item.status === TransferStatus.PENDING)
        .length,
      inTransitTransfers: mockTransfers.filter((item) => item.status === TransferStatus.IN_TRANSIT)
        .length,
      completedTransfers: mockTransfers.filter((item) => item.status === TransferStatus.COMPLETED)
        .length,
      cancelledTransfers: mockTransfers.filter((item) => item.status === TransferStatus.CANCELLED)
        .length,
      urgentTransfers: mockTransfers.filter((item) => item.priority === TransferPriority.URGENT)
        .length,
      totalValue: mockTransfers.reduce((sum, item) => sum + item.totalAmount, 0),
      averageProcessingTime: 2.3, // Mock value in days
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

  // Get single transfer by ID
  async getTransfer(id: string): Promise<InventoryTransfer | null> {
    return mockTransfers.find((item) => item.id === id) || null
  },

  // Create new transfer
  async createTransfer(data: TransferFormData): Promise<InventoryTransfer> {
    const newId = (mockTransfers.length + 1).toString()
    const transferNumber = `TR-2024-${newId.padStart(3, '0')}`

    const newTransfer: InventoryTransfer = {
      id: newId,
      transferNumber,
      ...data,
      fromWarehouseName: 'Main Warehouse', // Mock warehouse name
      toWarehouseName: 'Target Warehouse', // Mock warehouse name
      fromLocationName: data.fromLocationCode ? 'Location Name' : undefined,
      toLocationName: data.toLocationCode ? 'Location Name' : undefined,
      requestedByName: 'Employee Name', // Mock employee name
      totalQuantity: data.items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      items: data.items.map((item, index) => ({
        ...item,
        id: `${newId}-${index + 1}`,
        totalAmount: item.quantity * item.unitPrice,
      })),
      createdBy: 'admin',
      createdDate: new Date(),
      status: TransferStatus.DRAFT,
    }

    mockTransfers.unshift(newTransfer)
    return newTransfer
  },

  // Update transfer
  async updateTransfer(id: string, data: Partial<TransferFormData>): Promise<InventoryTransfer> {
    const index = mockTransfers.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Transfer not found')
    }

    const updatedTransfer: InventoryTransfer = {
      ...mockTransfers[index],
      ...data,
      totalQuantity: data.items
        ? data.items.reduce((sum, item) => sum + item.quantity, 0)
        : mockTransfers[index].totalQuantity,
      totalAmount: data.items
        ? data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
        : mockTransfers[index].totalAmount,
      items: data.items
        ? data.items.map((item, itemIndex) => ({
            ...item,
            id: `${id}-${itemIndex + 1}`,
            totalAmount: item.quantity * item.unitPrice,
          }))
        : mockTransfers[index].items,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockTransfers[index] = updatedTransfer
    return updatedTransfer
  },

  // Delete transfer
  async deleteTransfer(id: string): Promise<void> {
    const index = mockTransfers.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Transfer not found')
    }
    mockTransfers.splice(index, 1)
  },

  // Approve transfer
  async approveTransfer(id: string): Promise<InventoryTransfer> {
    const index = mockTransfers.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Transfer not found')
    }

    mockTransfers[index] = {
      ...mockTransfers[index],
      status: TransferStatus.APPROVED,
      approvedBy: 'admin',
      approvedByName: 'Admin User',
      approvedDate: new Date(),
    }

    return mockTransfers[index]
  },

  // Complete transfer
  async completeTransfer(id: string): Promise<InventoryTransfer> {
    const index = mockTransfers.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Transfer not found')
    }

    mockTransfers[index] = {
      ...mockTransfers[index],
      status: TransferStatus.COMPLETED,
      actualDate: new Date(),
      completedDate: new Date(),
    }

    return mockTransfers[index]
  },

  // Get statistics
  async getStats(): Promise<TransferStats> {
    return {
      totalTransfers: mockTransfers.length,
      pendingTransfers: mockTransfers.filter((item) => item.status === TransferStatus.PENDING)
        .length,
      inTransitTransfers: mockTransfers.filter((item) => item.status === TransferStatus.IN_TRANSIT)
        .length,
      completedTransfers: mockTransfers.filter((item) => item.status === TransferStatus.COMPLETED)
        .length,
      cancelledTransfers: mockTransfers.filter((item) => item.status === TransferStatus.CANCELLED)
        .length,
      urgentTransfers: mockTransfers.filter((item) => item.priority === TransferPriority.URGENT)
        .length,
      totalValue: mockTransfers.reduce((sum, item) => sum + item.totalAmount, 0),
      averageProcessingTime: 2.3, // Mock value in days
    }
  },
}
