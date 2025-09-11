// Production Orders Types

export enum ProductionOrderType {
  STANDARD = 'standard',
  SPECIAL = 'special',
  DISASSEMBLY = 'disassembly',
}

export enum ProductionOrderStatus {
  PLANNED = 'planned',
  RELEASED = 'released',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface ProductionOrderItem {
  id: string
  itemCode: string
  itemName: string
  plannedQuantity: number
  completedQuantity: number
  remainingQuantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  batchRequired: boolean
  serialRequired: boolean
}

export interface ProductionOrderComponent {
  id: string
  itemCode: string
  itemName: string
  requiredQuantity: number
  issuedQuantity: number
  remainingQuantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  batchNumbers?: string[]
  serialNumbers?: string[]
}

export interface ProductionOrderResource {
  id: string
  resourceCode: string
  resourceName: string
  resourceType: string
  plannedHours: number
  actualHours: number
  remainingHours: number
  costPerHour: number
  totalCost: number
  status: string
}

export interface ProductionOrder {
  id: string
  orderNumber: string
  type: ProductionOrderType
  status: ProductionOrderStatus
  priority: Priority
  itemCode: string
  itemName: string
  plannedQuantity: number
  completedQuantity: number
  remainingQuantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  bomCode?: string
  bomVersion?: string
  routingCode?: string
  routingVersion?: string
  customerCode?: string
  customerName?: string
  salesOrderNumber?: string
  plannedStartDate: string
  plannedEndDate: string
  actualStartDate?: string
  actualEndDate?: string
  dueDate: string
  components: ProductionOrderComponent[]
  resources: ProductionOrderResource[]
  remarks?: string
  attachments?: string[]
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
  releasedBy?: string
  releasedAt?: string
  completedBy?: string
  completedAt?: string
}

export interface ProductionOrderFormData {
  orderNumber?: string
  type: ProductionOrderType
  status: ProductionOrderStatus
  priority: Priority
  itemCode: string
  plannedQuantity: number
  unit: string
  warehouseCode: string
  bomCode?: string
  bomVersion?: string
  routingCode?: string
  routingVersion?: string
  customerCode?: string
  salesOrderNumber?: string
  plannedStartDate: string
  plannedEndDate: string
  dueDate: string
  remarks?: string
}

export interface ProductionOrderStats {
  totalOrders: number
  plannedOrders: number
  releasedOrders: number
  inProgressOrders: number
  completedOrders: number
  cancelledOrders: number
  onHoldOrders: number
  overdueOrders: number
  totalPlannedQuantity: number
  totalCompletedQuantity: number
  averageCompletionRate: number
  ordersByType: Record<ProductionOrderType, number>
  ordersByStatus: Record<ProductionOrderStatus, number>
  ordersByPriority: Record<Priority, number>
}

export interface ProductionOrderFilters {
  search?: string
  status?: ProductionOrderStatus
  type?: ProductionOrderType
  priority?: Priority
  itemCode?: string
  warehouseCode?: string
  customerCode?: string
  dueDateFrom?: string
  dueDateTo?: string
  plannedStartFrom?: string
  plannedStartTo?: string
}

export interface ProductionOrderSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ProductionOrderFilters
}