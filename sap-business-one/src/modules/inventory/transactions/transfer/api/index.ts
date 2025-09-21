import type {
  InventoryTransfer,
  InventoryTransferFormData,
  InventoryTransferFilters,
  InventoryTransferStats,
  InventoryTransferPagination
} from '../types'
import { TransferStatus } from '../types'

// Mock data for inventory transfers
const mockTransfers: InventoryTransfer[] = [
  {
    id: '1',
    documentNo: 'IT-2024-001',
    postingDate: '2024-01-15',
    documentDate: '2024-01-15',
    series: 'IT-2024',
    businessPartnerCode: 'BP001',
    businessPartnerName: 'Internal Transfer',
    sourceWarehouse: 'Main Warehouse',
    destinationWarehouse: 'Secondary Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM001',
        description: 'Product A',
        quantity: 10,
        uom: 'PCS',
        unitPrice: 100.00,
        fromWarehouse: 'Main Warehouse',
        toWarehouse: 'Secondary Warehouse'
      },
      {
        itemCode: 'ITEM002',
        description: 'Product B',
        quantity: 5,
        uom: 'PCS',
        unitPrice: 150.00,
        fromWarehouse: 'Main Warehouse',
        toWarehouse: 'Secondary Warehouse'
      }
    ],
    status: TransferStatus.COMPLETED,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    documentNo: 'IT-2024-002',
    postingDate: '2024-01-14',
    documentDate: '2024-01-14',
    series: 'IT-2024',
    businessPartnerCode: 'BP001',
    businessPartnerName: 'Internal Transfer',
    sourceWarehouse: 'Secondary Warehouse',
    destinationWarehouse: 'Storage Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM003',
        description: 'Product C',
        quantity: 8,
        uom: 'PCS',
        unitPrice: 200.00,
        fromWarehouse: 'Secondary Warehouse',
        toWarehouse: 'Storage Warehouse'
      }
    ],
    status: TransferStatus.PENDING,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    documentNo: 'IT-2024-003',
    postingDate: '2024-01-13',
    documentDate: '2024-01-13',
    series: 'IT-2024',
    businessPartnerCode: 'BP001',
    businessPartnerName: 'Internal Transfer',
    sourceWarehouse: 'Main Warehouse',
    destinationWarehouse: 'Storage Warehouse',
    lineItems: [
      {
        itemCode: 'ITEM004',
        description: 'Product D',
        quantity: 12,
        uom: 'PCS',
        unitPrice: 80.00,
        fromWarehouse: 'Main Warehouse',
        toWarehouse: 'Storage Warehouse'
      }
    ],
    status: TransferStatus.DRAFT,
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-13T09:00:00Z'
  }
]

// Inventory Transfer API service
export const inventoryTransferApi = {
  // Get all transfers with pagination and filters
  async getTransfers(
    page: number = 1,
    limit: number = 10,
    filters?: InventoryTransferFilters
  ): Promise<{ transfers: InventoryTransfer[]; pagination: InventoryTransferPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredTransfers = [...mockTransfers]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredTransfers = filteredTransfers.filter(
          (transfer) =>
            transfer.documentNo.toLowerCase().includes(searchLower) ||
            transfer.sourceWarehouse.toLowerCase().includes(searchLower) ||
            transfer.destinationWarehouse.toLowerCase().includes(searchLower) ||
            transfer.businessPartnerName.toLowerCase().includes(searchLower)
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredTransfers = filteredTransfers.filter((transfer) =>
          filters.status!.includes(transfer.status!)
        )
      }

      if (filters.sourceWarehouse) {
        filteredTransfers = filteredTransfers.filter((transfer) =>
          transfer.sourceWarehouse.toLowerCase().includes(filters.sourceWarehouse!.toLowerCase())
        )
      }

      if (filters.destinationWarehouse) {
        filteredTransfers = filteredTransfers.filter((transfer) =>
          transfer.destinationWarehouse.toLowerCase().includes(filters.destinationWarehouse!.toLowerCase())
        )
      }

      if (filters.dateRange) {
        filteredTransfers = filteredTransfers.filter((transfer) => {
          const transferDate = new Date(transfer.postingDate)
          return transferDate >= filters.dateRange!.start && transferDate <= filters.dateRange!.end
        })
      }
    }

    // Calculate pagination
    const total = filteredTransfers.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransfers = filteredTransfers.slice(startIndex, endIndex)

    return {
      transfers: paginatedTransfers,
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

  // Get transfer by ID
  async getTransferById(id: string): Promise<InventoryTransfer | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockTransfers.find((transfer) => transfer.id === id) || null
  },

  // Create new transfer
  async createTransfer(data: InventoryTransferFormData): Promise<InventoryTransfer> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newTransfer: InventoryTransfer = {
      id: `transfer_${Date.now()}`,
      documentNo: `IT-2024-${String(mockTransfers.length + 1).padStart(3, '0')}`,
      postingDate: data.postingDate,
      documentDate: data.documentDate,
      series: data.series,
      businessPartnerCode: data.businessPartnerCode,
      businessPartnerName: data.businessPartnerName,
      sourceWarehouse: data.sourceWarehouse,
      destinationWarehouse: data.destinationWarehouse,
      lineItems: data.lineItems,
      status: TransferStatus.DRAFT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockTransfers.push(newTransfer)
    return newTransfer
  },

  // Update transfer
  async updateTransfer(id: string, data: Partial<InventoryTransferFormData>): Promise<InventoryTransfer> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const transferIndex = mockTransfers.findIndex((transfer) => transfer.id === id)
    if (transferIndex === -1) {
      throw new Error('Transfer not found')
    }

    const existingTransfer = mockTransfers[transferIndex]

    const updatedTransfer: InventoryTransfer = {
      ...existingTransfer,
      ...(data.postingDate && { postingDate: data.postingDate }),
      ...(data.documentDate && { documentDate: data.documentDate }),
      ...(data.series && { series: data.series }),
      ...(data.businessPartnerCode && { businessPartnerCode: data.businessPartnerCode }),
      ...(data.businessPartnerName && { businessPartnerName: data.businessPartnerName }),
      ...(data.sourceWarehouse && { sourceWarehouse: data.sourceWarehouse }),
      ...(data.destinationWarehouse && { destinationWarehouse: data.destinationWarehouse }),
      ...(data.lineItems && { lineItems: data.lineItems }),
      updatedAt: new Date().toISOString()
    }

    mockTransfers[transferIndex] = updatedTransfer
    return updatedTransfer
  },

  // Delete transfer
  async deleteTransfer(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const transferIndex = mockTransfers.findIndex((transfer) => transfer.id === id)
    if (transferIndex === -1) {
      throw new Error('Transfer not found')
    }

    mockTransfers.splice(transferIndex, 1)
  },

  // Get transfer statistics
  async getTransferStats(): Promise<InventoryTransferStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalTransfers = mockTransfers.length
    const completedTransfers = mockTransfers.filter((t) => t.status === TransferStatus.COMPLETED).length
    const pendingTransfers = mockTransfers.filter((t) => t.status === TransferStatus.PENDING).length
    const draftTransfers = mockTransfers.filter((t) => t.status === TransferStatus.DRAFT).length
    const cancelledTransfers = mockTransfers.filter((t) => t.status === TransferStatus.CANCELLED).length

    const totalValue = mockTransfers.reduce((sum, transfer) => {
      return sum + transfer.lineItems.reduce((lineSum, item) => lineSum + (item.quantity * item.unitPrice), 0)
    }, 0)

    const averageValue = totalTransfers > 0 ? totalValue / totalTransfers : 0

    return {
      totalTransfers,
      completedTransfers,
      pendingTransfers,
      draftTransfers,
      cancelledTransfers,
      totalValue,
      averageValue
    }
  },

  // Business logic methods
  async completeTransfer(id: string): Promise<InventoryTransfer> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const transfer = mockTransfers.find((t) => t.id === id)
    if (!transfer) {
      throw new Error('Transfer not found')
    }

    if (transfer.status !== TransferStatus.PENDING && transfer.status !== TransferStatus.DRAFT) {
      throw new Error('Transfer cannot be completed')
    }

    transfer.status = TransferStatus.COMPLETED
    transfer.updatedAt = new Date().toISOString()

    return transfer
  },

  async cancelTransfer(id: string): Promise<InventoryTransfer> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const transfer = mockTransfers.find((t) => t.id === id)
    if (!transfer) {
      throw new Error('Transfer not found')
    }

    if (transfer.status === TransferStatus.COMPLETED) {
      throw new Error('Cannot cancel completed transfer')
    }

    transfer.status = TransferStatus.CANCELLED
    transfer.updatedAt = new Date().toISOString()

    return transfer
  }
}