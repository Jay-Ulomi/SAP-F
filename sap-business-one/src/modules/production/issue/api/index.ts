// Material Issue API

import type {
  MaterialIssue,
  MaterialIssueFormData,
  MaterialIssueSearchParams,
  MaterialIssueStats,
} from '../types'

// Mock data
const mockIssues: MaterialIssue[] = [
  {
    id: 'ISS001',
    issueNumber: 'MI-2024-001',
    type: 'production',
    status: 'partially_issued',
    productionOrderId: 'PO001',
    productionOrderNumber: 'PO-2024-001',
    itemCode: 'PROD001',
    itemName: 'Premium Desktop Computer',
    plannedQuantity: 50,
    issuedQuantity: 35,
    remainingQuantity: 15,
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    bomCode: 'BOM-PROD001',
    bomVersion: '1.2',
    issueDate: '2024-01-15T00:00:00Z',
    plannedIssueDate: '2024-01-15T08:00:00Z',
    dueDate: '2024-01-25T17:00:00Z',
    items: [
      {
        id: 'ISSITEM001',
        itemCode: 'CPU001',
        itemName: 'Intel Core i7 Processor',
        requiredQuantity: 50,
        issuedQuantity: 35,
        remainingQuantity: 15,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        binLocation: 'A-01-001',
        batchNumbers: ['BATCH001', 'BATCH002'],
        serialNumbers: ['SN001', 'SN002'],
        unitCost: 280.00,
        totalCost: 9800.00,
        notes: 'Handle with ESD protection'
      },
      {
        id: 'ISSITEM002',
        itemCode: 'RAM001',
        itemName: '16GB DDR4 RAM',
        requiredQuantity: 100,
        issuedQuantity: 70,
        remainingQuantity: 30,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        binLocation: 'A-02-005',
        unitCost: 85.00,
        totalCost: 5950.00
      },
      {
        id: 'ISSITEM003',
        itemCode: 'MB001',
        itemName: 'Gaming Motherboard',
        requiredQuantity: 50,
        issuedQuantity: 35,
        remainingQuantity: 15,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        binLocation: 'A-03-010',
        unitCost: 180.00,
        totalCost: 6300.00,
        notes: 'Test all ports before use'
      }
    ],
    totalCost: 22050.00,
    remarks: 'Partial issue for first batch production. Remaining materials to be issued after quality approval.',
    attachments: ['issue_list.pdf', 'batch_tracking.xlsx'],
    issuedBy: 'warehouse_supervisor',
    issuedAt: '2024-01-15T09:30:00Z',
    createdBy: 'production_planner',
    createdAt: '2024-01-14T16:00:00Z',
    updatedBy: 'warehouse_supervisor',
    updatedAt: '2024-01-15T09:30:00Z'
  },
  {
    id: 'ISS002',
    issueNumber: 'MI-2024-002',
    type: 'manual',
    status: 'open',
    itemCode: 'PROD002',
    itemName: 'Enterprise Server Unit',
    plannedQuantity: 25,
    issuedQuantity: 0,
    remainingQuantity: 25,
    warehouseCode: 'WH02',
    warehouseName: 'Assembly Warehouse',
    issueDate: '2024-02-01T00:00:00Z',
    plannedIssueDate: '2024-02-01T08:00:00Z',
    dueDate: '2024-02-15T17:00:00Z',
    items: [
      {
        id: 'ISSITEM004',
        itemCode: 'CPU002',
        itemName: 'Intel Xeon Server Processor',
        requiredQuantity: 50,
        issuedQuantity: 0,
        remainingQuantity: 50,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        binLocation: 'B-01-001',
        unitCost: 450.00,
        totalCost: 22500.00
      },
      {
        id: 'ISSITEM005',
        itemCode: 'RAM002',
        itemName: '32GB ECC RAM',
        requiredQuantity: 100,
        issuedQuantity: 0,
        remainingQuantity: 100,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        binLocation: 'B-02-003',
        unitCost: 220.00,
        totalCost: 22000.00
      },
      {
        id: 'ISSITEM006',
        itemCode: 'HDD001',
        itemName: '2TB Enterprise HDD',
        requiredQuantity: 100,
        issuedQuantity: 0,
        remainingQuantity: 100,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        binLocation: 'B-03-005',
        unitCost: 150.00,
        totalCost: 15000.00
      }
    ],
    totalCost: 59500.00,
    remarks: 'Manual issue for enterprise server production. All components to be issued together.',
    createdBy: 'production_manager',
    createdAt: '2024-01-30T14:00:00Z'
  },
  {
    id: 'ISS003',
    issueNumber: 'MI-2024-003',
    type: 'backflush',
    status: 'fully_issued',
    productionOrderId: 'PO003',
    productionOrderNumber: 'PO-2024-003',
    itemCode: 'PROD003',
    itemName: 'Custom Gaming Laptop',
    plannedQuantity: 10,
    issuedQuantity: 10,
    remainingQuantity: 0,
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    bomCode: 'BOM-PROD003',
    bomVersion: '1.0',
    issueDate: '2024-02-10T00:00:00Z',
    plannedIssueDate: '2024-02-10T08:00:00Z',
    dueDate: '2024-02-20T17:00:00Z',
    items: [
      {
        id: 'ISSITEM007',
        itemCode: 'GPU001',
        itemName: 'Gaming Graphics Card RTX',
        requiredQuantity: 10,
        issuedQuantity: 10,
        remainingQuantity: 0,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        binLocation: 'A-04-001',
        serialNumbers: ['GPU001', 'GPU002', 'GPU003', 'GPU004', 'GPU005'],
        unitCost: 650.00,
        totalCost: 6500.00,
        notes: 'High-end graphics cards with serial tracking'
      },
      {
        id: 'ISSITEM008',
        itemCode: 'SCREEN001',
        itemName: '17" Gaming Display',
        requiredQuantity: 10,
        issuedQuantity: 10,
        remainingQuantity: 0,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        binLocation: 'A-05-002',
        unitCost: 380.00,
        totalCost: 3800.00
      }
    ],
    totalCost: 10300.00,
    remarks: 'Backflushed issue for custom gaming laptop. All materials issued upon production completion.',
    issuedBy: 'system_auto',
    issuedAt: '2024-02-20T16:45:00Z',
    createdBy: 'system_auto',
    createdAt: '2024-02-10T08:00:00Z',
    updatedBy: 'system_auto',
    updatedAt: '2024-02-20T16:45:00Z'
  }
]

export const materialIssueAPI = {
  async getIssues(params?: MaterialIssueSearchParams) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    
    let filteredIssues = [...mockIssues]
    
    // Apply filters if provided
    if (params?.filters) {
      const { filters } = params
      if (filters.search) {
        const query = filters.search.toLowerCase()
        filteredIssues = filteredIssues.filter(issue =>
          issue.issueNumber.toLowerCase().includes(query) ||
          issue.itemName.toLowerCase().includes(query) ||
          issue.itemCode.toLowerCase().includes(query) ||
          (issue.productionOrderNumber && issue.productionOrderNumber.toLowerCase().includes(query))
        )
      }
      if (filters.status) {
        filteredIssues = filteredIssues.filter(issue => issue.status === filters.status)
      }
      if (filters.type) {
        filteredIssues = filteredIssues.filter(issue => issue.type === filters.type)
      }
      if (filters.productionOrderId) {
        filteredIssues = filteredIssues.filter(issue => issue.productionOrderId === filters.productionOrderId)
      }
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filteredIssues.sort((a, b) => {
        const aVal = (a as any)[params.sortBy!]
        const bVal = (b as any)[params.sortBy!]
        const order = params.sortOrder === 'desc' ? -1 : 1
        return aVal > bVal ? order : aVal < bVal ? -order : 0
      })
    }
    
    // Apply pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const paginatedIssues = filteredIssues.slice(start, start + limit)
    
    return {
      items: paginatedIssues,
      total: filteredIssues.length,
      page: page,
      totalPages: Math.ceil(filteredIssues.length / limit),
    }
  },

  async getIssueStats(): Promise<MaterialIssueStats> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const totalIssues = mockIssues.length
    const draft = mockIssues.filter(i => i.status === 'draft').length
    const open = mockIssues.filter(i => i.status === 'open').length
    const partiallyIssued = mockIssues.filter(i => i.status === 'partially_issued').length
    const fullyIssued = mockIssues.filter(i => i.status === 'fully_issued').length
    const closed = mockIssues.filter(i => i.status === 'closed').length
    const cancelled = mockIssues.filter(i => i.status === 'cancelled').length
    
    const totalIssuedValue = mockIssues.reduce((sum, i) => sum + i.totalCost, 0)
    const averageIssueValue = totalIssues > 0 ? totalIssuedValue / totalIssues : 0
    const totalItemsIssued = mockIssues.reduce((sum, i) => sum + i.items.length, 0)
    
    // Count overdue issues
    const now = new Date()
    const overdue = mockIssues.filter(i => 
      new Date(i.dueDate) < now && 
      !['fully_issued', 'closed', 'cancelled'].includes(i.status)
    ).length
    
    // Top issued items
    const itemStats = new Map<string, { itemName: string, totalQuantity: number, totalValue: number }>()
    mockIssues.forEach(issue => {
      issue.items.forEach(item => {
        const existing = itemStats.get(item.itemCode) || { 
          itemName: item.itemName, 
          totalQuantity: 0, 
          totalValue: 0 
        }
        existing.totalQuantity += item.issuedQuantity
        existing.totalValue += item.totalCost
        itemStats.set(item.itemCode, existing)
      })
    })
    
    const topIssuedItems = Array.from(itemStats.entries())
      .map(([itemCode, stats]) => ({ itemCode, ...stats }))
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5)
    
    return {
      totalIssues,
      draftIssues: draft,
      openIssues: open,
      partiallyIssuedIssues: partiallyIssued,
      fullyIssuedIssues: fullyIssued,
      closedIssues: closed,
      cancelledIssues: cancelled,
      overdueIssues: overdue,
      totalIssuedValue: Math.round(totalIssuedValue * 100) / 100,
      averageIssueValue: Math.round(averageIssueValue * 100) / 100,
      totalItemsIssued,
      issuesByType: {
        production: mockIssues.filter(i => i.type === 'production').length,
        manual: mockIssues.filter(i => i.type === 'manual').length,
        backflush: mockIssues.filter(i => i.type === 'backflush').length,
        consumption: mockIssues.filter(i => i.type === 'consumption').length,
      },
      issuesByStatus: {
        draft: draft,
        open: open,
        partially_issued: partiallyIssued,
        fully_issued: fullyIssued,
        closed: closed,
        cancelled: cancelled,
      },
      topIssuedItems,
    }
  },

  async createIssue(data: MaterialIssueFormData): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const newIssue: MaterialIssue = {
      id: `ISS${String(mockIssues.length + 1).padStart(3, '0')}`,
      issueNumber: data.issueNumber || `MI-2024-${String(mockIssues.length + 1).padStart(3, '0')}`,
      type: data.type,
      status: data.status,
      productionOrderId: data.productionOrderId,
      productionOrderNumber: data.productionOrderId ? `PO-${data.productionOrderId}` : undefined,
      itemCode: data.itemCode,
      itemName: 'Product Name',
      plannedQuantity: data.plannedQuantity,
      issuedQuantity: 0,
      remainingQuantity: data.plannedQuantity,
      warehouseCode: data.warehouseCode,
      warehouseName: 'Warehouse Name',
      bomCode: data.bomCode,
      bomVersion: data.bomVersion,
      issueDate: data.issueDate,
      plannedIssueDate: data.plannedIssueDate,
      dueDate: data.dueDate,
      items: [],
      totalCost: 0,
      remarks: data.remarks,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    
    mockIssues.push(newIssue)
    return newIssue
  },

  async updateIssue(id: string, data: Partial<MaterialIssueFormData>): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const issueIndex = mockIssues.findIndex(i => i.id === id)
    if (issueIndex === -1) {
      throw new Error('Material issue not found')
    }
    
    const updatedIssue = {
      ...mockIssues[issueIndex],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    mockIssues[issueIndex] = updatedIssue
    return updatedIssue
  },

  async deleteIssue(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const issueIndex = mockIssues.findIndex(i => i.id === id)
    if (issueIndex === -1) {
      throw new Error('Material issue not found')
    }
    
    mockIssues.splice(issueIndex, 1)
  },

  async getIssue(id: string): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const issue = mockIssues.find(i => i.id === id)
    if (!issue) {
      throw new Error('Material issue not found')
    }
    
    return issue
  },

  async issueItems(id: string, issuedQuantity: number): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const issueIndex = mockIssues.findIndex(i => i.id === id)
    if (issueIndex === -1) {
      throw new Error('Material issue not found')
    }
    
    const issue = mockIssues[issueIndex]
    const newIssuedQuantity = Math.min(issue.issuedQuantity + issuedQuantity, issue.plannedQuantity)
    const newRemainingQuantity = issue.plannedQuantity - newIssuedQuantity
    
    let status = issue.status
    if (newIssuedQuantity === issue.plannedQuantity) {
      status = 'fully_issued'
    } else if (newIssuedQuantity > 0) {
      status = 'partially_issued'
    }
    
    mockIssues[issueIndex] = {
      ...issue,
      issuedQuantity: newIssuedQuantity,
      remainingQuantity: newRemainingQuantity,
      status: status,
      issuedBy: 'current-user',
      issuedAt: new Date().toISOString(),
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockIssues[issueIndex]
  },

  async closeIssue(id: string): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const issueIndex = mockIssues.findIndex(i => i.id === id)
    if (issueIndex === -1) {
      throw new Error('Material issue not found')
    }
    
    mockIssues[issueIndex] = {
      ...mockIssues[issueIndex],
      status: 'closed',
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockIssues[issueIndex]
  },

  async cancelIssue(id: string): Promise<MaterialIssue> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const issueIndex = mockIssues.findIndex(i => i.id === id)
    if (issueIndex === -1) {
      throw new Error('Material issue not found')
    }
    
    mockIssues[issueIndex] = {
      ...mockIssues[issueIndex],
      status: 'cancelled',
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockIssues[issueIndex]
  },
}