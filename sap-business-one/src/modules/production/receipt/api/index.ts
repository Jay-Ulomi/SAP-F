import type { 
  ProductionReceipt, 
  ProductionReceiptFormData, 
  ProductionReceiptStats,
  ProductionReceiptSearchParams
} from '../types'
import { ReceiptType, ReceiptStatus, QualityStatus } from '../types'

// Mock data
const mockReceipts: ProductionReceipt[] = [
  {
    id: 'receipt-001',
    receiptNumber: 'PR-2024-001',
    type: ReceiptType.PRODUCTION,
    status: ReceiptStatus.FULLY_RECEIVED,
    productionOrderId: 'po-001',
    productionOrderNumber: 'PO-2024-001',
    itemCode: 'FG-LAPTOP-001',
    itemName: 'Gaming Laptop Pro 15"',
    plannedQuantity: 100,
    receivedQuantity: 98,
    remainingQuantity: 2,
    warehouseCode: 'WH-FG',
    warehouseName: 'Finished Goods Warehouse',
    bomCode: 'BOM-LAPTOP-001',
    bomVersion: 'v1.2',
    receiptDate: '2024-03-15T08:00:00Z',
    plannedReceiptDate: '2024-03-15T00:00:00Z',
    completionDate: '2024-03-15T16:30:00Z',
    items: [
      {
        id: 'ri-001',
        itemCode: 'FG-LAPTOP-001',
        itemName: 'Gaming Laptop Pro 15"',
        plannedQuantity: 100,
        receivedQuantity: 98,
        remainingQuantity: 2,
        unit: 'PC',
        warehouseCode: 'WH-FG',
        warehouseName: 'Finished Goods Warehouse',
        binLocation: 'A-01-01',
        batchNumbers: ['BATCH-240315-001'],
        unitCost: 1250.00,
        totalCost: 122500.00,
        qualityStatus: QualityStatus.APPROVED,
        expirationDate: '2025-03-15T00:00:00Z',
        notes: 'Quality inspection passed'
      }
    ],
    totalCost: 122500.00,
    yieldPercentage: 98,
    scrapQuantity: 2,
    scrapReason: 'Screen defect',
    qualityStatus: QualityStatus.APPROVED,
    remarks: 'Production completed successfully with minor scrap',
    receivedBy: 'John Smith',
    receivedAt: '2024-03-15T16:30:00Z',
    approvedBy: 'Jane Doe',
    approvedAt: '2024-03-15T17:00:00Z',
    createdBy: 'Production System',
    createdAt: '2024-03-14T09:00:00Z',
    updatedBy: 'John Smith',
    updatedAt: '2024-03-15T16:30:00Z'
  },
  {
    id: 'receipt-002',
    receiptNumber: 'PR-2024-002',
    type: ReceiptType.PRODUCTION,
    status: ReceiptStatus.PARTIALLY_RECEIVED,
    productionOrderId: 'po-002',
    productionOrderNumber: 'PO-2024-002',
    itemCode: 'FG-TABLET-001',
    itemName: 'Business Tablet 10"',
    plannedQuantity: 200,
    receivedQuantity: 120,
    remainingQuantity: 80,
    warehouseCode: 'WH-FG',
    warehouseName: 'Finished Goods Warehouse',
    bomCode: 'BOM-TABLET-001',
    bomVersion: 'v1.0',
    receiptDate: '2024-03-16T10:00:00Z',
    plannedReceiptDate: '2024-03-16T00:00:00Z',
    items: [
      {
        id: 'ri-002',
        itemCode: 'FG-TABLET-001',
        itemName: 'Business Tablet 10"',
        plannedQuantity: 200,
        receivedQuantity: 120,
        remainingQuantity: 80,
        unit: 'PC',
        warehouseCode: 'WH-FG',
        warehouseName: 'Finished Goods Warehouse',
        binLocation: 'A-02-01',
        batchNumbers: ['BATCH-240316-001'],
        unitCost: 850.00,
        totalCost: 102000.00,
        qualityStatus: QualityStatus.PENDING,
        expirationDate: '2025-03-16T00:00:00Z',
        notes: 'Partial receipt - remaining in production'
      }
    ],
    totalCost: 102000.00,
    yieldPercentage: 60,
    qualityStatus: QualityStatus.PENDING,
    remarks: 'Production in progress - partial receipt',
    receivedBy: 'Mike Johnson',
    receivedAt: '2024-03-16T15:45:00Z',
    createdBy: 'Production System',
    createdAt: '2024-03-15T08:00:00Z',
    updatedBy: 'Mike Johnson',
    updatedAt: '2024-03-16T15:45:00Z'
  },
  {
    id: 'receipt-003',
    receiptNumber: 'PR-2024-003',
    type: ReceiptType.BYPRODUCT,
    status: ReceiptStatus.OPEN,
    productionOrderId: 'po-003',
    productionOrderNumber: 'PO-2024-003',
    itemCode: 'BP-METAL-001',
    itemName: 'Metal Shavings',
    plannedQuantity: 50,
    receivedQuantity: 0,
    remainingQuantity: 50,
    warehouseCode: 'WH-BP',
    warehouseName: 'Byproduct Warehouse',
    receiptDate: '2024-03-17T00:00:00Z',
    plannedReceiptDate: '2024-03-17T00:00:00Z',
    items: [
      {
        id: 'ri-003',
        itemCode: 'BP-METAL-001',
        itemName: 'Metal Shavings',
        plannedQuantity: 50,
        receivedQuantity: 0,
        remainingQuantity: 50,
        unit: 'KG',
        warehouseCode: 'WH-BP',
        warehouseName: 'Byproduct Warehouse',
        binLocation: 'B-01-01',
        unitCost: 15.00,
        totalCost: 750.00,
        qualityStatus: QualityStatus.PENDING,
        notes: 'Awaiting production completion'
      }
    ],
    totalCost: 750.00,
    yieldPercentage: 0,
    qualityStatus: QualityStatus.PENDING,
    remarks: 'Byproduct collection pending',
    createdBy: 'Production System',
    createdAt: '2024-03-16T14:00:00Z'
  }
]

// Mock statistics
const mockStats: ProductionReceiptStats = {
  totalReceipts: 3,
  draftReceipts: 0,
  openReceipts: 1,
  partiallyReceivedReceipts: 1,
  fullyReceivedReceipts: 1,
  closedReceipts: 0,
  cancelledReceipts: 0,
  pendingQualityReceipts: 2,
  totalReceivedValue: 225250.00,
  averageReceiptValue: 75083.33,
  totalItemsReceived: 218,
  averageYield: 52.67,
  receiptsByType: {
    [ReceiptType.PRODUCTION]: 2,
    [ReceiptType.BYPRODUCT]: 1,
    [ReceiptType.REWORK]: 0,
    [ReceiptType.SCRAP]: 0,
  },
  receiptsByStatus: {
    [ReceiptStatus.DRAFT]: 0,
    [ReceiptStatus.OPEN]: 1,
    [ReceiptStatus.PARTIALLY_RECEIVED]: 1,
    [ReceiptStatus.FULLY_RECEIVED]: 1,
    [ReceiptStatus.CLOSED]: 0,
    [ReceiptStatus.CANCELLED]: 0,
  },
  receiptsByQualityStatus: {
    [QualityStatus.PENDING]: 2,
    [QualityStatus.APPROVED]: 1,
    [QualityStatus.REJECTED]: 0,
    [QualityStatus.ON_HOLD]: 0,
  },
  topReceivedItems: [
    {
      itemCode: 'FG-LAPTOP-001',
      itemName: 'Gaming Laptop Pro 15"',
      totalQuantity: 98,
      totalValue: 122500.00
    },
    {
      itemCode: 'FG-TABLET-001',
      itemName: 'Business Tablet 10"',
      totalQuantity: 120,
      totalValue: 102000.00
    },
    {
      itemCode: 'BP-METAL-001',
      itemName: 'Metal Shavings',
      totalQuantity: 0,
      totalValue: 0
    }
  ]
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const productionReceiptAPI = {
  // Get all receipts with optional search params
  async getReceipts(params?: ProductionReceiptSearchParams) {
    await delay(800)
    
    let filtered = [...mockReceipts]
    
    // Apply filters
    if (params?.filters) {
      const { filters } = params
      
      if (filters.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(receipt => 
          receipt.receiptNumber.toLowerCase().includes(search) ||
          receipt.itemName.toLowerCase().includes(search) ||
          receipt.itemCode.toLowerCase().includes(search) ||
          (receipt.productionOrderNumber && receipt.productionOrderNumber.toLowerCase().includes(search))
        )
      }
      
      if (filters.status) {
        filtered = filtered.filter(receipt => receipt.status === filters.status)
      }
      
      if (filters.type) {
        filtered = filtered.filter(receipt => receipt.type === filters.type)
      }
      
      if (filters.qualityStatus) {
        filtered = filtered.filter(receipt => receipt.qualityStatus === filters.qualityStatus)
      }
      
      if (filters.productionOrderId) {
        filtered = filtered.filter(receipt => receipt.productionOrderId === filters.productionOrderId)
      }
      
      if (filters.itemCode) {
        filtered = filtered.filter(receipt => receipt.itemCode === filters.itemCode)
      }
      
      if (filters.warehouseCode) {
        filtered = filtered.filter(receipt => receipt.warehouseCode === filters.warehouseCode)
      }
      
      if (filters.receiptDateFrom) {
        filtered = filtered.filter(receipt => 
          new Date(receipt.receiptDate) >= new Date(filters.receiptDateFrom!)
        )
      }
      
      if (filters.receiptDateTo) {
        filtered = filtered.filter(receipt => 
          new Date(receipt.receiptDate) <= new Date(filters.receiptDateTo!)
        )
      }
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filtered.sort((a, b) => {
        const aVal = (a as any)[params.sortBy!]
        const bVal = (b as any)[params.sortBy!]
        
        if (params.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1
        }
        return aVal > bVal ? 1 : -1
      })
    }
    
    // Apply pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      items: filtered.slice(startIndex, endIndex),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  },

  // Get single receipt by ID
  async getReceipt(id: string): Promise<ProductionReceipt> {
    await delay(500)
    
    const receipt = mockReceipts.find(r => r.id === id)
    if (!receipt) {
      throw new Error('Receipt not found')
    }
    
    return receipt
  },

  // Get receipt statistics
  async getReceiptStats(): Promise<ProductionReceiptStats> {
    await delay(600)
    return mockStats
  },

  // Create new receipt
  async createReceipt(data: ProductionReceiptFormData): Promise<ProductionReceipt> {
    await delay(1000)
    
    const newReceipt: ProductionReceipt = {
      id: `receipt-${Date.now()}`,
      receiptNumber: data.receiptNumber || `PR-${new Date().getFullYear()}-${String(mockReceipts.length + 1).padStart(3, '0')}`,
      type: data.type,
      status: data.status,
      productionOrderId: data.productionOrderId,
      itemCode: data.itemCode,
      itemName: `Item ${data.itemCode}`,
      plannedQuantity: data.plannedQuantity,
      receivedQuantity: 0,
      remainingQuantity: data.plannedQuantity,
      warehouseCode: data.warehouseCode,
      warehouseName: `Warehouse ${data.warehouseCode}`,
      bomCode: data.bomCode,
      bomVersion: data.bomVersion,
      receiptDate: data.receiptDate,
      plannedReceiptDate: data.plannedReceiptDate,
      items: [],
      totalCost: 0,
      yieldPercentage: 0,
      qualityStatus: data.qualityStatus,
      remarks: data.remarks,
      createdBy: 'Current User',
      createdAt: new Date().toISOString()
    }
    
    mockReceipts.push(newReceipt)
    return newReceipt
  },

  // Update receipt
  async updateReceipt(id: string, data: Partial<ProductionReceiptFormData>): Promise<ProductionReceipt> {
    await delay(800)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    const updatedReceipt = {
      ...mockReceipts[index],
      ...data,
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString()
    }
    
    mockReceipts[index] = updatedReceipt
    return updatedReceipt
  },

  // Delete receipt
  async deleteReceipt(id: string): Promise<void> {
    await delay(500)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    mockReceipts.splice(index, 1)
  },

  // Receive items
  async receiveItems(id: string, receivedQuantity: number): Promise<ProductionReceipt> {
    await delay(800)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    const receipt = mockReceipts[index]
    const newReceivedQuantity = receipt.receivedQuantity + receivedQuantity
    const newRemainingQuantity = receipt.plannedQuantity - newReceivedQuantity
    
    const updatedReceipt = {
      ...receipt,
      receivedQuantity: newReceivedQuantity,
      remainingQuantity: Math.max(0, newRemainingQuantity),
      status: newRemainingQuantity <= 0 ? ReceiptStatus.FULLY_RECEIVED : ReceiptStatus.PARTIALLY_RECEIVED,
      yieldPercentage: Math.round((newReceivedQuantity / receipt.plannedQuantity) * 100),
      receivedBy: 'Current User',
      receivedAt: new Date().toISOString(),
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString()
    }
    
    mockReceipts[index] = updatedReceipt
    return updatedReceipt
  },

  // Update quality status
  async updateQualityStatus(id: string, qualityStatus: QualityStatus): Promise<ProductionReceipt> {
    await delay(600)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    const updatedReceipt = {
      ...mockReceipts[index],
      qualityStatus,
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString()
    }
    
    mockReceipts[index] = updatedReceipt
    return updatedReceipt
  },

  // Close receipt
  async closeReceipt(id: string): Promise<ProductionReceipt> {
    await delay(600)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    const updatedReceipt = {
      ...mockReceipts[index],
      status: ReceiptStatus.CLOSED,
      completionDate: new Date().toISOString(),
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString()
    }
    
    mockReceipts[index] = updatedReceipt
    return updatedReceipt
  },

  // Cancel receipt
  async cancelReceipt(id: string): Promise<ProductionReceipt> {
    await delay(600)
    
    const index = mockReceipts.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Receipt not found')
    }
    
    const updatedReceipt = {
      ...mockReceipts[index],
      status: ReceiptStatus.CANCELLED,
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString()
    }
    
    mockReceipts[index] = updatedReceipt
    return updatedReceipt
  }
}