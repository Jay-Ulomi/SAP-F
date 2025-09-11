import type {
  Item,
  ItemFormData,
  ItemStats,
  ItemSearchParams,
  ItemFilters,
  ItemType,
  ItemStatus,
  ItemGroup,
  UnitOfMeasure,
  ValuationMethod,
} from '../types'

// Mock data for development
const mockItems: Item[] = [
  {
    id: '1',
    itemCode: 'ITEM-001',
    itemName: 'Steel Rod 10mm',
    description: 'High-grade steel rod, 10mm diameter, 6m length',
    type: 'inventory' as ItemType,
    status: 'active' as ItemStatus,
    group: 'raw_materials' as ItemGroup,
    unitOfMeasure: 'meter' as UnitOfMeasure,
    baseUnitPrice: 25.5,
    standardCost: 22.0,
    valuationMethod: 'fifo' as ValuationMethod,
    minStockLevel: 100,
    maxStockLevel: 500,
    reorderPoint: 150,
    reorderQuantity: 200,
    supplierCode: 'SUP-001',
    supplierName: 'Steel Works Ltd',
    barcode: '1234567890123',
    weight: 0.617,
    dimensions: {
      length: 6000,
      width: 10,
      height: 10,
    },
    taxCode: 'VAT-20',
    glAccount: '1200',
    warehouseCode: 'WH-001',
    location: 'A-01-01',
    notes: 'Primary supplier, good quality',
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedBy: 'admin',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    itemCode: 'ITEM-002',
    itemName: 'Aluminum Sheet 2mm',
    description: 'Aluminum sheet, 2mm thickness, 1m x 2m',
    type: 'inventory' as ItemType,
    status: 'active' as ItemStatus,
    group: 'raw_materials' as ItemGroup,
    unitOfMeasure: 'piece' as UnitOfMeasure,
    baseUnitPrice: 45.0,
    standardCost: 40.0,
    valuationMethod: 'average' as ValuationMethod,
    minStockLevel: 50,
    maxStockLevel: 200,
    reorderPoint: 75,
    reorderQuantity: 100,
    supplierCode: 'SUP-002',
    supplierName: 'Aluminum Co',
    barcode: '1234567890124',
    weight: 5.4,
    dimensions: {
      length: 2000,
      width: 1000,
      height: 2,
    },
    taxCode: 'VAT-20',
    glAccount: '1200',
    warehouseCode: 'WH-001',
    location: 'A-02-01',
    notes: 'Lightweight, corrosion resistant',
    createdBy: 'admin',
    createdAt: '2024-01-16T09:15:00Z',
  },
  {
    id: '3',
    itemCode: 'ITEM-003',
    itemName: 'Assembly Service',
    description: 'Professional assembly service for mechanical components',
    type: 'service' as ItemType,
    status: 'active' as ItemStatus,
    group: 'services' as ItemGroup,
    unitOfMeasure: 'hour' as UnitOfMeasure,
    baseUnitPrice: 75.0,
    standardCost: 60.0,
    valuationMethod: 'standard' as ValuationMethod,
    minStockLevel: 0,
    maxStockLevel: 0,
    reorderPoint: 0,
    reorderQuantity: 0,
    supplierCode: 'SUP-003',
    supplierName: 'Assembly Pro',
    taxCode: 'VAT-20',
    glAccount: '4000',
    notes: 'Skilled technicians, quality guaranteed',
    createdBy: 'admin',
    createdAt: '2024-01-17T11:20:00Z',
  },
  {
    id: '4',
    itemCode: 'ITEM-004',
    itemName: 'Finished Product A',
    description: 'Complete assembled product ready for sale',
    type: 'inventory' as ItemType,
    status: 'active' as ItemStatus,
    group: 'finished_goods' as ItemGroup,
    unitOfMeasure: 'piece' as UnitOfMeasure,
    baseUnitPrice: 250.0,
    standardCost: 180.0,
    valuationMethod: 'fifo' as ValuationMethod,
    minStockLevel: 20,
    maxStockLevel: 100,
    reorderPoint: 30,
    reorderQuantity: 50,
    barcode: '1234567890125',
    weight: 2.5,
    dimensions: {
      length: 300,
      width: 200,
      height: 150,
    },
    taxCode: 'VAT-20',
    glAccount: '1300',
    warehouseCode: 'WH-002',
    location: 'B-01-01',
    notes: 'Best seller, high demand',
    createdBy: 'admin',
    createdAt: '2024-01-18T13:45:00Z',
  },
  {
    id: '5',
    itemCode: 'ITEM-005',
    itemName: 'Maintenance Kit',
    description: 'Complete maintenance kit for equipment',
    type: 'inventory' as ItemType,
    status: 'active' as ItemStatus,
    group: 'spare_parts' as ItemGroup,
    unitOfMeasure: 'box' as UnitOfMeasure,
    baseUnitPrice: 85.0,
    standardCost: 70.0,
    valuationMethod: 'average' as ValuationMethod,
    minStockLevel: 10,
    maxStockLevel: 50,
    reorderPoint: 15,
    reorderQuantity: 25,
    supplierCode: 'SUP-004',
    supplierName: 'Maintenance Supply',
    barcode: '1234567890126',
    weight: 1.2,
    taxCode: 'VAT-20',
    glAccount: '1200',
    warehouseCode: 'WH-001',
    location: 'C-01-01',
    notes: 'Essential for equipment maintenance',
    createdBy: 'admin',
    createdAt: '2024-01-19T15:30:00Z',
  },
]

// API Functions
export const itemApi = {
  // Get all items with pagination and filters
  async getItems(params: ItemSearchParams = {}): Promise<{
    items: Item[]
    total: number
    page: number
    limit: number
  }> {
    const { page = 1, limit = 10, sortBy = 'itemCode', sortOrder = 'asc', filters = {} } = params

    let filteredItems = [...mockItems]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredItems = filteredItems.filter(
        (item) =>
          item.itemCode.toLowerCase().includes(searchLower) ||
          item.itemName.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.supplierName?.toLowerCase().includes(searchLower),
      )
    }

    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }

    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }

    if (filters.group) {
      filteredItems = filteredItems.filter((item) => item.group === filters.group)
    }

    if (filters.warehouseCode) {
      filteredItems = filteredItems.filter((item) => item.warehouseCode === filters.warehouseCode)
    }

    if (filters.lowStock) {
      filteredItems = filteredItems.filter((item) => {
        // Mock current stock levels
        const currentStock = Math.floor(Math.random() * 200)
        return currentStock <= item.reorderPoint
      })
    }

    if (filters.outOfStock) {
      filteredItems = filteredItems.filter((item) => {
        // Mock current stock levels
        const currentStock = Math.floor(Math.random() * 200)
        return currentStock === 0
      })
    }

    // Sort items
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof Item]
      const bValue = b[sortBy as keyof Item]

      if (aValue === undefined && bValue === undefined) return 0
      if (aValue === undefined) return 1
      if (bValue === undefined) return -1

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = filteredItems.slice(startIndex, endIndex)

    return {
      items: paginatedItems,
      total: filteredItems.length,
      page,
      limit,
    }
  },

  // Get item by ID
  async getItemById(id: string): Promise<Item | null> {
    return mockItems.find((item) => item.id === id) || null
  },

  // Create new item
  async createItem(data: ItemFormData): Promise<Item> {
    const newItem: Item = {
      id: Date.now().toString(),
      ...data,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }

    mockItems.push(newItem)
    return newItem
  },

  // Update item
  async updateItem(id: string, data: Partial<ItemFormData>): Promise<Item | null> {
    const index = mockItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    mockItems[index] = {
      ...mockItems[index],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }

    return mockItems[index]
  },

  // Delete item
  async deleteItem(id: string): Promise<boolean> {
    const index = mockItems.findIndex((item) => item.id === id)
    if (index === -1) return false

    mockItems.splice(index, 1)
    return true
  },

  // Get item statistics
  async getItemStats(): Promise<ItemStats> {
    const totalItems = mockItems.length
    const activeItems = mockItems.filter((item) => item.status === 'active').length
    const inactiveItems = mockItems.filter((item) => item.status === 'inactive').length

    // Mock low stock and out of stock calculations
    const lowStockItems = mockItems.filter((item) => {
      const currentStock = Math.floor(Math.random() * 200)
      return currentStock <= item.reorderPoint
    }).length

    const outOfStockItems = mockItems.filter((item) => {
      const currentStock = Math.floor(Math.random() * 200)
      return currentStock === 0
    }).length

    const totalValue = mockItems.reduce((sum, item) => {
      const currentStock = Math.floor(Math.random() * 200)
      return sum + currentStock * item.standardCost
    }, 0)

    const averageCost = mockItems.reduce((sum, item) => sum + item.standardCost, 0) / totalItems

    // Group by type
    const itemsByType = mockItems.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by group
    const itemsByGroup = mockItems.reduce(
      (acc, item) => {
        acc[item.group] = (acc[item.group] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalItems,
      activeItems,
      inactiveItems,
      lowStockItems,
      outOfStockItems,
      totalValue,
      averageCost,
      itemsByType: itemsByType as any,
      itemsByGroup: itemsByGroup as any,
    }
  },

  // Search items
  async searchItems(query: string): Promise<Item[]> {
    const searchLower = query.toLowerCase()
    return mockItems.filter(
      (item) =>
        item.itemCode.toLowerCase().includes(searchLower) ||
        item.itemName.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower),
    )
  },

  // Get items by group
  async getItemsByGroup(group: string): Promise<Item[]> {
    return mockItems.filter((item) => item.group === group)
  },

  // Get low stock items
  async getLowStockItems(): Promise<Item[]> {
    return mockItems.filter((item) => {
      const currentStock = Math.floor(Math.random() * 200)
      return currentStock <= item.reorderPoint
    })
  },
}
