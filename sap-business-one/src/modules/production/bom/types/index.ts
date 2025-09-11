// BOM (Bill of Materials) Types

export enum BOMType {
  PRODUCTION = 'production',
  TEMPLATE = 'template',
  SALES = 'sales',
}

export enum BOMStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  OBSOLETE = 'obsolete',
}

export enum ComponentType {
  ITEM = 'item',
  PHANTOM = 'phantom',
  TEXT = 'text',
}

export interface BOMComponent {
  id: string
  itemCode: string
  itemName: string
  componentType: ComponentType
  quantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  position: number
  scrap: number
  notes?: string
  visualOrder: number
  issueMethod: 'backflush' | 'manual'
  costDistribution?: number
}

export interface BOMProductionData {
  setupTime: number
  runTime: number
  stockTime: number
  moveTime: number
  laborTime: number
  machineTime: number
  totalTime: number
  batchSize: number
  minBatchSize?: number
  maxBatchSize?: number
  lotSize: number
}

export interface BOMCosting {
  materialCost: number
  laborCost: number
  machineCost: number
  overheadCost: number
  totalCost: number
  costPerUnit: number
  targetCost?: number
  standardCost?: number
}

export interface BOM {
  id: string
  bomCode: string
  version: string
  itemCode: string
  itemName: string
  description?: string
  type: BOMType
  status: BOMStatus
  effectiveFrom: string
  effectiveTo?: string
  quantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  components: BOMComponent[]
  productionData: BOMProductionData
  costing: BOMCosting
  routingCode?: string
  routingVersion?: string
  alternativeBOMs?: string[]
  attachments?: string[]
  notes?: string
  revision: number
  revisionNotes?: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
  approvedBy?: string
  approvedAt?: string
}

export interface BOMFormData {
  bomCode?: string
  version: string
  itemCode: string
  description?: string
  type: BOMType
  status: BOMStatus
  effectiveFrom: string
  effectiveTo?: string
  quantity: number
  unit: string
  warehouseCode: string
  routingCode?: string
  routingVersion?: string
  notes?: string
}

export interface BOMStats {
  totalBOMs: number
  activeBOMs: number
  inactiveBOMs: number
  draftBOMs: number
  obsoleteBOMs: number
  bomsByType: Record<BOMType, number>
  bomsByStatus: Record<BOMStatus, number>
  averageComponents: number
  totalComponents: number
  averageCostPerUnit: number
}

export interface BOMFilters {
  search?: string
  status?: BOMStatus
  type?: BOMType
  itemCode?: string
  warehouseCode?: string
  effectiveFrom?: string
  effectiveTo?: string
}

export interface BOMSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: BOMFilters
}