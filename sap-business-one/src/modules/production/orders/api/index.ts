// Production Orders API

import type {
  ProductionOrder,
  ProductionOrderFormData,
  ProductionOrderSearchParams,
  ProductionOrderStats,
} from '../types'

// Mock data
const mockOrders: ProductionOrder[] = [
  {
    id: 'PO001',
    orderNumber: 'PO-2024-001',
    type: 'standard',
    status: 'in_progress',
    priority: 'high',
    itemCode: 'PROD001',
    itemName: 'Premium Desktop Computer',
    plannedQuantity: 50,
    completedQuantity: 35,
    remainingQuantity: 15,
    unit: 'Units',
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    bomCode: 'BOM-PROD001-v1.2',
    bomVersion: '1.2',
    routingCode: 'RT-ASSEMBLY-01',
    routingVersion: '1.0',
    customerCode: 'C001',
    customerName: 'Tech Solutions Inc.',
    salesOrderNumber: 'SO-2024-156',
    plannedStartDate: '2024-01-15T08:00:00Z',
    plannedEndDate: '2024-01-25T17:00:00Z',
    actualStartDate: '2024-01-15T08:30:00Z',
    dueDate: '2024-01-28T17:00:00Z',
    components: [
      {
        id: 'COMP001',
        itemCode: 'CPU001',
        itemName: 'Intel Core i7 Processor',
        requiredQuantity: 50,
        issuedQuantity: 35,
        remainingQuantity: 15,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        batchRequired: true,
        serialRequired: true,
        batchNumbers: ['BATCH001', 'BATCH002'],
        serialNumbers: ['SN001', 'SN002', 'SN003']
      },
      {
        id: 'COMP002',
        itemCode: 'RAM001',
        itemName: '16GB DDR4 RAM',
        requiredQuantity: 100,
        issuedQuantity: 70,
        remainingQuantity: 30,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        batchRequired: false,
        serialRequired: false,
      }
    ],
    resources: [
      {
        id: 'RES001',
        resourceCode: 'ASM-LINE-01',
        resourceName: 'Assembly Line 1',
        resourceType: 'Equipment',
        plannedHours: 80,
        actualHours: 56,
        remainingHours: 24,
        costPerHour: 150,
        totalCost: 8400,
        status: 'In Use'
      },
      {
        id: 'RES002',
        resourceCode: 'TECH-001',
        resourceName: 'Senior Technician',
        resourceType: 'Labor',
        plannedHours: 40,
        actualHours: 28,
        remainingHours: 12,
        costPerHour: 85,
        totalCost: 3400,
        status: 'Assigned'
      }
    ],
    remarks: 'Priority order for key customer. Ensure quality controls are strictly followed.',
    attachments: ['assembly_instructions.pdf', 'quality_checklist.xlsx'],
    createdBy: 'production_manager',
    createdAt: '2024-01-10T09:00:00Z',
    updatedBy: 'shift_supervisor',
    updatedAt: '2024-01-20T14:30:00Z',
    releasedBy: 'production_manager',
    releasedAt: '2024-01-15T07:45:00Z',
  },
  {
    id: 'PO002',
    orderNumber: 'PO-2024-002',
    type: 'standard',
    status: 'released',
    priority: 'medium',
    itemCode: 'PROD002',
    itemName: 'Enterprise Server Unit',
    plannedQuantity: 25,
    completedQuantity: 0,
    remainingQuantity: 25,
    unit: 'Units',
    warehouseCode: 'WH02',
    warehouseName: 'Assembly Warehouse',
    bomCode: 'BOM-PROD002-v2.1',
    bomVersion: '2.1',
    routingCode: 'RT-SERVER-01',
    routingVersion: '1.1',
    customerCode: 'C002',
    customerName: 'Global Enterprise Corp',
    salesOrderNumber: 'SO-2024-198',
    plannedStartDate: '2024-02-01T08:00:00Z',
    plannedEndDate: '2024-02-15T17:00:00Z',
    dueDate: '2024-02-18T17:00:00Z',
    components: [
      {
        id: 'COMP003',
        itemCode: 'CPU002',
        itemName: 'Intel Xeon Server Processor',
        requiredQuantity: 50,
        issuedQuantity: 0,
        remainingQuantity: 50,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        batchRequired: true,
        serialRequired: true,
      },
      {
        id: 'COMP004',
        itemCode: 'HDD001',
        itemName: '2TB Enterprise HDD',
        requiredQuantity: 100,
        issuedQuantity: 0,
        remainingQuantity: 100,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        batchRequired: true,
        serialRequired: true,
      }
    ],
    resources: [
      {
        id: 'RES003',
        resourceCode: 'ASM-LINE-02',
        resourceName: 'Server Assembly Line',
        resourceType: 'Equipment',
        plannedHours: 120,
        actualHours: 0,
        remainingHours: 120,
        costPerHour: 180,
        totalCost: 21600,
        status: 'Available'
      }
    ],
    remarks: 'Enterprise order with extended warranty requirements.',
    createdBy: 'sales_manager',
    createdAt: '2024-01-25T11:15:00Z',
    releasedBy: 'production_manager',
    releasedAt: '2024-01-30T16:00:00Z',
  },
  {
    id: 'PO003',
    orderNumber: 'PO-2024-003',
    type: 'special',
    status: 'planned',
    priority: 'urgent',
    itemCode: 'PROD003',
    itemName: 'Custom Gaming Laptop',
    plannedQuantity: 10,
    completedQuantity: 0,
    remainingQuantity: 10,
    unit: 'Units',
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    bomCode: 'BOM-PROD003-v1.0',
    bomVersion: '1.0',
    customerCode: 'C003',
    customerName: 'Gaming World Ltd',
    salesOrderNumber: 'SO-2024-220',
    plannedStartDate: '2024-02-10T08:00:00Z',
    plannedEndDate: '2024-02-20T17:00:00Z',
    dueDate: '2024-02-22T17:00:00Z',
    components: [
      {
        id: 'COMP005',
        itemCode: 'GPU001',
        itemName: 'Gaming Graphics Card RTX',
        requiredQuantity: 10,
        issuedQuantity: 0,
        remainingQuantity: 10,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        batchRequired: false,
        serialRequired: true,
      }
    ],
    resources: [
      {
        id: 'RES004',
        resourceCode: 'CUSTOM-01',
        resourceName: 'Custom Assembly Station',
        resourceType: 'Equipment',
        plannedHours: 60,
        actualHours: 0,
        remainingHours: 60,
        costPerHour: 200,
        totalCost: 12000,
        status: 'Reserved'
      }
    ],
    remarks: 'Custom configuration with special cooling system. Requires specialized assembly team.',
    createdBy: 'custom_orders_team',
    createdAt: '2024-02-05T10:30:00Z',
  }
]

export const productionOrdersAPI = {
  async getOrders(params?: ProductionOrderSearchParams) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    let filteredOrders = [...mockOrders]
    
    // Apply filters if provided
    if (params?.filters) {
      const { filters } = params
      if (filters.search) {
        const query = filters.search.toLowerCase()
        filteredOrders = filteredOrders.filter(order =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.itemName.toLowerCase().includes(query) ||
          order.itemCode.toLowerCase().includes(query)
        )
      }
      if (filters.status) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.status)
      }
      if (filters.type) {
        filteredOrders = filteredOrders.filter(order => order.type === filters.type)
      }
      if (filters.priority) {
        filteredOrders = filteredOrders.filter(order => order.priority === filters.priority)
      }
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filteredOrders.sort((a, b) => {
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
    const paginatedOrders = filteredOrders.slice(start, start + limit)
    
    return {
      items: paginatedOrders,
      total: filteredOrders.length,
      page: page,
      totalPages: Math.ceil(filteredOrders.length / limit),
    }
  },

  async getOrderStats(): Promise<ProductionOrderStats> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const totalOrders = mockOrders.length
    const planned = mockOrders.filter(o => o.status === 'planned').length
    const released = mockOrders.filter(o => o.status === 'released').length
    const inProgress = mockOrders.filter(o => o.status === 'in_progress').length
    const completed = mockOrders.filter(o => o.status === 'completed').length
    const cancelled = mockOrders.filter(o => o.status === 'cancelled').length
    const onHold = mockOrders.filter(o => o.status === 'on_hold').length
    
    const totalPlanned = mockOrders.reduce((sum, o) => sum + o.plannedQuantity, 0)
    const totalCompleted = mockOrders.reduce((sum, o) => sum + o.completedQuantity, 0)
    const avgCompletionRate = totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 0
    
    // Count overdue orders (simplified - just checking if planned end date is past)
    const now = new Date()
    const overdue = mockOrders.filter(o => 
      new Date(o.plannedEndDate) < now && 
      !['completed', 'cancelled'].includes(o.status)
    ).length
    
    return {
      totalOrders,
      plannedOrders: planned,
      releasedOrders: released,
      inProgressOrders: inProgress,
      completedOrders: completed,
      cancelledOrders: cancelled,
      onHoldOrders: onHold,
      overdueOrders: overdue,
      totalPlannedQuantity: totalPlanned,
      totalCompletedQuantity: totalCompleted,
      averageCompletionRate: avgCompletionRate,
      ordersByType: {
        standard: mockOrders.filter(o => o.type === 'standard').length,
        special: mockOrders.filter(o => o.type === 'special').length,
        disassembly: mockOrders.filter(o => o.type === 'disassembly').length,
      },
      ordersByStatus: {
        planned: planned,
        released: released,
        in_progress: inProgress,
        completed: completed,
        cancelled: cancelled,
        on_hold: onHold,
      },
      ordersByPriority: {
        low: mockOrders.filter(o => o.priority === 'low').length,
        medium: mockOrders.filter(o => o.priority === 'medium').length,
        high: mockOrders.filter(o => o.priority === 'high').length,
        urgent: mockOrders.filter(o => o.priority === 'urgent').length,
      },
    }
  },

  async createOrder(data: ProductionOrderFormData): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const newOrder: ProductionOrder = {
      id: `PO${String(mockOrders.length + 1).padStart(3, '0')}`,
      orderNumber: data.orderNumber || `PO-2024-${String(mockOrders.length + 1).padStart(3, '0')}`,
      type: data.type,
      status: data.status,
      priority: data.priority,
      itemCode: data.itemCode,
      itemName: 'Product Name',
      plannedQuantity: data.plannedQuantity,
      completedQuantity: 0,
      remainingQuantity: data.plannedQuantity,
      unit: data.unit,
      warehouseCode: data.warehouseCode,
      warehouseName: 'Warehouse Name',
      bomCode: data.bomCode,
      bomVersion: data.bomVersion,
      routingCode: data.routingCode,
      routingVersion: data.routingVersion,
      customerCode: data.customerCode,
      salesOrderNumber: data.salesOrderNumber,
      plannedStartDate: data.plannedStartDate,
      plannedEndDate: data.plannedEndDate,
      dueDate: data.dueDate,
      components: [],
      resources: [],
      remarks: data.remarks,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    
    mockOrders.push(newOrder)
    return newOrder
  },

  async updateOrder(id: string, data: Partial<ProductionOrderFormData>): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const orderIndex = mockOrders.findIndex(o => o.id === id)
    if (orderIndex === -1) {
      throw new Error('Production order not found')
    }
    
    const updatedOrder = {
      ...mockOrders[orderIndex],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    mockOrders[orderIndex] = updatedOrder
    return updatedOrder
  },

  async deleteOrder(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const orderIndex = mockOrders.findIndex(o => o.id === id)
    if (orderIndex === -1) {
      throw new Error('Production order not found')
    }
    
    mockOrders.splice(orderIndex, 1)
  },

  async getOrder(id: string): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const order = mockOrders.find(o => o.id === id)
    if (!order) {
      throw new Error('Production order not found')
    }
    
    return order
  },

  // Additional actions
  async releaseOrder(id: string): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const orderIndex = mockOrders.findIndex(o => o.id === id)
    if (orderIndex === -1) {
      throw new Error('Production order not found')
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: 'released',
      releasedBy: 'current-user',
      releasedAt: new Date().toISOString(),
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockOrders[orderIndex]
  },

  async startOrder(id: string): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const orderIndex = mockOrders.findIndex(o => o.id === id)
    if (orderIndex === -1) {
      throw new Error('Production order not found')
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: 'in_progress',
      actualStartDate: new Date().toISOString(),
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockOrders[orderIndex]
  },

  async completeOrder(id: string): Promise<ProductionOrder> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const orderIndex = mockOrders.findIndex(o => o.id === id)
    if (orderIndex === -1) {
      throw new Error('Production order not found')
    }
    
    const order = mockOrders[orderIndex]
    mockOrders[orderIndex] = {
      ...order,
      status: 'completed',
      completedQuantity: order.plannedQuantity,
      remainingQuantity: 0,
      actualEndDate: new Date().toISOString(),
      completedBy: 'current-user',
      completedAt: new Date().toISOString(),
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockOrders[orderIndex]
  },
}