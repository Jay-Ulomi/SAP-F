// BOM (Bill of Materials) API

import type {
  BOM,
  BOMFormData,
  BOMSearchParams,
  BOMStats,
} from '../types'

// Mock data
const mockBOMs: BOM[] = [
  {
    id: 'BOM001',
    bomCode: 'BOM-PROD001',
    version: '1.2',
    itemCode: 'PROD001',
    itemName: 'Premium Desktop Computer',
    description: 'Complete BOM for premium desktop computer assembly',
    type: 'production',
    status: 'active',
    effectiveFrom: '2024-01-01T00:00:00Z',
    quantity: 1,
    unit: 'Units',
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    components: [
      {
        id: 'COMP001',
        itemCode: 'CPU001',
        itemName: 'Intel Core i7 Processor',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 1,
        scrap: 2,
        visualOrder: 1,
        issueMethod: 'manual',
        costDistribution: 35,
        notes: 'Handle with care, ESD sensitive'
      },
      {
        id: 'COMP002',
        itemCode: 'RAM001',
        itemName: '16GB DDR4 RAM',
        componentType: 'item',
        quantity: 2,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 2,
        scrap: 1,
        visualOrder: 2,
        issueMethod: 'backflush',
        costDistribution: 20
      },
      {
        id: 'COMP003',
        itemCode: 'MB001',
        itemName: 'Gaming Motherboard',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 3,
        scrap: 1,
        visualOrder: 3,
        issueMethod: 'manual',
        costDistribution: 25,
        notes: 'Test all ports before assembly'
      },
      {
        id: 'COMP004',
        itemCode: 'CASE001',
        itemName: 'ATX Computer Case',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 4,
        scrap: 0.5,
        visualOrder: 4,
        issueMethod: 'manual',
        costDistribution: 10
      },
      {
        id: 'COMP005',
        itemCode: 'PSU001',
        itemName: '650W Power Supply',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 5,
        scrap: 1,
        visualOrder: 5,
        issueMethod: 'backflush',
        costDistribution: 10
      }
    ],
    productionData: {
      setupTime: 30,
      runTime: 120,
      stockTime: 15,
      moveTime: 10,
      laborTime: 150,
      machineTime: 45,
      totalTime: 175,
      batchSize: 10,
      minBatchSize: 5,
      maxBatchSize: 50,
      lotSize: 1
    },
    costing: {
      materialCost: 850.00,
      laborCost: 125.00,
      machineCost: 75.00,
      overheadCost: 50.00,
      totalCost: 1100.00,
      costPerUnit: 1100.00,
      targetCost: 1050.00,
      standardCost: 1080.00
    },
    routingCode: 'RT-ASSEMBLY-01',
    routingVersion: '1.0',
    alternativeBOMs: ['BOM-PROD001-ALT1'],
    attachments: ['assembly_diagram.pdf', 'component_specs.xlsx'],
    notes: 'Premium configuration with high-end components. Ensure all components are tested before assembly.',
    revision: 3,
    revisionNotes: 'Updated RAM specifications and added quality control notes',
    createdBy: 'engineering_manager',
    createdAt: '2024-01-01T08:00:00Z',
    updatedBy: 'senior_engineer',
    updatedAt: '2024-01-15T14:30:00Z',
    approvedBy: 'production_manager',
    approvedAt: '2024-01-16T09:00:00Z'
  },
  {
    id: 'BOM002',
    bomCode: 'BOM-PROD002',
    version: '2.1',
    itemCode: 'PROD002',
    itemName: 'Enterprise Server Unit',
    description: 'Complete BOM for enterprise server unit',
    type: 'production',
    status: 'active',
    effectiveFrom: '2024-02-01T00:00:00Z',
    quantity: 1,
    unit: 'Units',
    warehouseCode: 'WH02',
    warehouseName: 'Assembly Warehouse',
    components: [
      {
        id: 'COMP006',
        itemCode: 'CPU002',
        itemName: 'Intel Xeon Server Processor',
        componentType: 'item',
        quantity: 2,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        position: 1,
        scrap: 1,
        visualOrder: 1,
        issueMethod: 'manual',
        costDistribution: 45
      },
      {
        id: 'COMP007',
        itemCode: 'RAM002',
        itemName: '32GB ECC RAM',
        componentType: 'item',
        quantity: 4,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        position: 2,
        scrap: 2,
        visualOrder: 2,
        issueMethod: 'backflush',
        costDistribution: 30
      },
      {
        id: 'COMP008',
        itemCode: 'HDD001',
        itemName: '2TB Enterprise HDD',
        componentType: 'item',
        quantity: 4,
        unit: 'Units',
        warehouseCode: 'WH02',
        warehouseName: 'Assembly Warehouse',
        position: 3,
        scrap: 2,
        visualOrder: 3,
        issueMethod: 'manual',
        costDistribution: 20
      }
    ],
    productionData: {
      setupTime: 45,
      runTime: 180,
      stockTime: 30,
      moveTime: 15,
      laborTime: 240,
      machineTime: 60,
      totalTime: 270,
      batchSize: 5,
      minBatchSize: 2,
      maxBatchSize: 20,
      lotSize: 1
    },
    costing: {
      materialCost: 2850.00,
      laborCost: 200.00,
      machineCost: 120.00,
      overheadCost: 80.00,
      totalCost: 3250.00,
      costPerUnit: 3250.00,
      targetCost: 3200.00,
      standardCost: 3220.00
    },
    routingCode: 'RT-SERVER-01',
    routingVersion: '1.1',
    notes: 'Enterprise-grade server assembly with redundant components',
    revision: 2,
    revisionNotes: 'Updated hard drive configuration for RAID setup',
    createdBy: 'server_engineer',
    createdAt: '2024-01-25T11:15:00Z',
    updatedBy: 'lead_engineer',
    updatedAt: '2024-02-01T10:00:00Z',
    approvedBy: 'production_manager',
    approvedAt: '2024-02-01T16:00:00Z'
  },
  {
    id: 'BOM003',
    bomCode: 'BOM-PROD003',
    version: '1.0',
    itemCode: 'PROD003',
    itemName: 'Custom Gaming Laptop',
    description: 'BOM for custom gaming laptop configuration',
    type: 'production',
    status: 'draft',
    effectiveFrom: '2024-03-01T00:00:00Z',
    quantity: 1,
    unit: 'Units',
    warehouseCode: 'WH01',
    warehouseName: 'Main Warehouse',
    components: [
      {
        id: 'COMP009',
        itemCode: 'GPU001',
        itemName: 'Gaming Graphics Card RTX',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 1,
        scrap: 1,
        visualOrder: 1,
        issueMethod: 'manual',
        costDistribution: 50
      },
      {
        id: 'COMP010',
        itemCode: 'SCREEN001',
        itemName: '17" Gaming Display',
        componentType: 'item',
        quantity: 1,
        unit: 'Units',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        position: 2,
        scrap: 2,
        visualOrder: 2,
        issueMethod: 'manual',
        costDistribution: 25,
        notes: 'High refresh rate display'
      }
    ],
    productionData: {
      setupTime: 40,
      runTime: 200,
      stockTime: 20,
      moveTime: 10,
      laborTime: 250,
      machineTime: 30,
      totalTime: 270,
      batchSize: 1,
      minBatchSize: 1,
      maxBatchSize: 5,
      lotSize: 1
    },
    costing: {
      materialCost: 1850.00,
      laborCost: 250.00,
      machineCost: 50.00,
      overheadCost: 100.00,
      totalCost: 2250.00,
      costPerUnit: 2250.00,
      targetCost: 2200.00
    },
    notes: 'Custom gaming laptop with high-end specifications. Requires specialized cooling system.',
    revision: 1,
    revisionNotes: 'Initial draft version for review',
    createdBy: 'custom_engineer',
    createdAt: '2024-02-20T15:30:00Z'
  }
]

export const bomAPI = {
  async getBOMs(params?: BOMSearchParams) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    let filteredBOMs = [...mockBOMs]
    
    // Apply filters if provided
    if (params?.filters) {
      const { filters } = params
      if (filters.search) {
        const query = filters.search.toLowerCase()
        filteredBOMs = filteredBOMs.filter(bom =>
          bom.bomCode.toLowerCase().includes(query) ||
          bom.itemName.toLowerCase().includes(query) ||
          bom.itemCode.toLowerCase().includes(query)
        )
      }
      if (filters.status) {
        filteredBOMs = filteredBOMs.filter(bom => bom.status === filters.status)
      }
      if (filters.type) {
        filteredBOMs = filteredBOMs.filter(bom => bom.type === filters.type)
      }
      if (filters.itemCode) {
        filteredBOMs = filteredBOMs.filter(bom => bom.itemCode === filters.itemCode)
      }
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filteredBOMs.sort((a, b) => {
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
    const paginatedBOMs = filteredBOMs.slice(start, start + limit)
    
    return {
      items: paginatedBOMs,
      total: filteredBOMs.length,
      page: page,
      totalPages: Math.ceil(filteredBOMs.length / limit),
    }
  },

  async getBOMStats(): Promise<BOMStats> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const totalBOMs = mockBOMs.length
    const active = mockBOMs.filter(b => b.status === 'active').length
    const inactive = mockBOMs.filter(b => b.status === 'inactive').length
    const draft = mockBOMs.filter(b => b.status === 'draft').length
    const obsolete = mockBOMs.filter(b => b.status === 'obsolete').length
    
    const totalComponents = mockBOMs.reduce((sum, b) => sum + b.components.length, 0)
    const avgComponents = totalBOMs > 0 ? Math.round(totalComponents / totalBOMs) : 0
    
    const totalCosts = mockBOMs.reduce((sum, b) => sum + b.costing.costPerUnit, 0)
    const avgCostPerUnit = totalBOMs > 0 ? Math.round((totalCosts / totalBOMs) * 100) / 100 : 0
    
    return {
      totalBOMs,
      activeBOMs: active,
      inactiveBOMs: inactive,
      draftBOMs: draft,
      obsoleteBOMs: obsolete,
      bomsByType: {
        production: mockBOMs.filter(b => b.type === 'production').length,
        template: mockBOMs.filter(b => b.type === 'template').length,
        sales: mockBOMs.filter(b => b.type === 'sales').length,
      },
      bomsByStatus: {
        active: active,
        inactive: inactive,
        draft: draft,
        obsolete: obsolete,
      },
      averageComponents: avgComponents,
      totalComponents,
      averageCostPerUnit: avgCostPerUnit,
    }
  },

  async createBOM(data: BOMFormData): Promise<BOM> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const newBOM: BOM = {
      id: `BOM${String(mockBOMs.length + 1).padStart(3, '0')}`,
      bomCode: data.bomCode || `BOM-${data.itemCode}`,
      version: data.version,
      itemCode: data.itemCode,
      itemName: 'Product Name',
      description: data.description,
      type: data.type,
      status: data.status,
      effectiveFrom: data.effectiveFrom,
      effectiveTo: data.effectiveTo,
      quantity: data.quantity,
      unit: data.unit,
      warehouseCode: data.warehouseCode,
      warehouseName: 'Warehouse Name',
      components: [],
      productionData: {
        setupTime: 0,
        runTime: 0,
        stockTime: 0,
        moveTime: 0,
        laborTime: 0,
        machineTime: 0,
        totalTime: 0,
        batchSize: 1,
        lotSize: 1
      },
      costing: {
        materialCost: 0,
        laborCost: 0,
        machineCost: 0,
        overheadCost: 0,
        totalCost: 0,
        costPerUnit: 0
      },
      routingCode: data.routingCode,
      routingVersion: data.routingVersion,
      notes: data.notes,
      revision: 1,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    
    mockBOMs.push(newBOM)
    return newBOM
  },

  async updateBOM(id: string, data: Partial<BOMFormData>): Promise<BOM> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const bomIndex = mockBOMs.findIndex(b => b.id === id)
    if (bomIndex === -1) {
      throw new Error('BOM not found')
    }
    
    const updatedBOM = {
      ...mockBOMs[bomIndex],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    mockBOMs[bomIndex] = updatedBOM
    return updatedBOM
  },

  async deleteBOM(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const bomIndex = mockBOMs.findIndex(b => b.id === id)
    if (bomIndex === -1) {
      throw new Error('BOM not found')
    }
    
    mockBOMs.splice(bomIndex, 1)
  },

  async getBOM(id: string): Promise<BOM> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const bom = mockBOMs.find(b => b.id === id)
    if (!bom) {
      throw new Error('BOM not found')
    }
    
    return bom
  },

  async copyBOM(id: string, newVersion: string): Promise<BOM> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const sourceBOM = mockBOMs.find(b => b.id === id)
    if (!sourceBOM) {
      throw new Error('Source BOM not found')
    }
    
    const newBOM: BOM = {
      ...sourceBOM,
      id: `BOM${String(mockBOMs.length + 1).padStart(3, '0')}`,
      version: newVersion,
      status: 'draft',
      revision: 1,
      revisionNotes: `Copied from ${sourceBOM.bomCode} v${sourceBOM.version}`,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
      updatedBy: undefined,
      updatedAt: undefined,
      approvedBy: undefined,
      approvedAt: undefined,
    }
    
    mockBOMs.push(newBOM)
    return newBOM
  },

  async approveBOM(id: string): Promise<BOM> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const bomIndex = mockBOMs.findIndex(b => b.id === id)
    if (bomIndex === -1) {
      throw new Error('BOM not found')
    }
    
    mockBOMs[bomIndex] = {
      ...mockBOMs[bomIndex],
      status: 'active',
      approvedBy: 'current-user',
      approvedAt: new Date().toISOString(),
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    
    return mockBOMs[bomIndex]
  },
}