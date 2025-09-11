import { ValuationMethod, ValuationStatus, ValuationType, ValuationFrequency } from '../types'
import type {
  InventoryValuation,
  ValuationFormData,
  ValuationListParams,
  ValuationListResponse,
  ValuationStats,
} from '../types'

// Mock data
const mockValuations: InventoryValuation[] = [
  {
    id: '1',
    valuationNumber: 'VAL-2024-001',
    type: ValuationType.PERIODIC,
    status: ValuationStatus.COMPLETED,
    method: ValuationMethod.WEIGHTED_AVERAGE,
    frequency: ValuationFrequency.MONTHLY,
    date: new Date('2024-01-31'),
    effectiveDate: new Date('2024-01-31'),
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-01-31'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    totalItems: 150,
    totalQuantity: 2500,
    totalValue: 125000.0,
    previousTotalValue: 120000.0,
    variance: 5000.0,
    variancePercentage: 4.17,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP001',
    performedByName: 'John Smith',
    approvedBy: 'MGR001',
    approvedByName: 'Jane Manager',
    department: 'Inventory',
    remarks: 'Monthly inventory valuation completed',
    items: [
      {
        id: '1-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC001',
        locationName: 'Storage Area A',
        quantityOnHand: 25,
        unitCost: 200.0,
        totalValue: 5000.0,
        valuationMethod: ValuationMethod.WEIGHTED_AVERAGE,
        lastValuationDate: new Date('2024-01-31'),
        previousUnitCost: 195.0,
        previousTotalValue: 4875.0,
        variance: 125.0,
        variancePercentage: 2.56,
        batchNumber: 'BATCH001',
        remarks: 'Price increase due to supplier changes',
      },
      {
        id: '1-2',
        itemCode: 'ITEM002',
        itemName: 'Wireless Mouse',
        description: 'Logitech MX Master 3',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC001',
        locationName: 'Storage Area A',
        quantityOnHand: 50,
        unitCost: 100.0,
        totalValue: 5000.0,
        valuationMethod: ValuationMethod.WEIGHTED_AVERAGE,
        lastValuationDate: new Date('2024-01-31'),
        previousUnitCost: 98.0,
        previousTotalValue: 4900.0,
        variance: 100.0,
        variancePercentage: 2.04,
        batchNumber: 'BATCH002',
        remarks: 'Standard price adjustment',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-31T08:00:00Z'),
    approvedDate: new Date('2024-01-31T10:30:00Z'),
    completedDate: new Date('2024-01-31T15:45:00Z'),
  },
  {
    id: '2',
    valuationNumber: 'VAL-2024-002',
    type: ValuationType.CONTINUOUS,
    status: ValuationStatus.IN_PROGRESS,
    method: ValuationMethod.FIFO,
    frequency: ValuationFrequency.DAILY,
    date: new Date('2024-02-01'),
    effectiveDate: new Date('2024-02-01'),
    periodStart: new Date('2024-02-01'),
    periodEnd: new Date('2024-02-01'),
    warehouseCode: 'WH002',
    warehouseName: 'Branch Warehouse',
    totalItems: 75,
    totalQuantity: 1200,
    totalValue: 85000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP002',
    performedByName: 'Mike Johnson',
    department: 'Inventory',
    remarks: 'Daily continuous valuation in progress',
    items: [
      {
        id: '2-1',
        itemCode: 'ITEM003',
        itemName: 'USB Cable',
        description: 'USB-C to USB-A Cable',
        warehouseCode: 'WH002',
        warehouseName: 'Branch Warehouse',
        locationCode: 'LOC003',
        locationName: 'Storage Area B',
        quantityOnHand: 100,
        unitCost: 50.0,
        totalValue: 5000.0,
        valuationMethod: ValuationMethod.FIFO,
        batchNumber: 'BATCH003',
        remarks: 'FIFO valuation in progress',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T09:00:00Z'),
  },
  {
    id: '3',
    valuationNumber: 'VAL-2024-003',
    type: ValuationType.MANUAL,
    status: ValuationStatus.PENDING,
    method: ValuationMethod.STANDARD_COST,
    frequency: ValuationFrequency.ON_DEMAND,
    date: new Date('2024-02-02'),
    effectiveDate: new Date('2024-02-02'),
    periodStart: new Date('2024-02-02'),
    periodEnd: new Date('2024-02-02'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC002',
    locationName: 'Storage Area B',
    totalItems: 30,
    totalQuantity: 500,
    totalValue: 35000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP003',
    performedByName: 'Sarah Wilson',
    department: 'Inventory',
    remarks: 'Manual valuation for specific items',
    items: [
      {
        id: '3-1',
        itemCode: 'ITEM004',
        itemName: 'Raw Material A',
        description: 'Steel Component',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC002',
        locationName: 'Storage Area B',
        quantityOnHand: 50,
        unitCost: 200.0,
        totalValue: 10000.0,
        valuationMethod: ValuationMethod.STANDARD_COST,
        batchNumber: 'BATCH004',
        remarks: 'Standard cost valuation',
      },
      {
        id: '3-2',
        itemCode: 'ITEM005',
        itemName: 'Raw Material B',
        description: 'Aluminum Component',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC002',
        locationName: 'Storage Area B',
        quantityOnHand: 25,
        unitCost: 300.0,
        totalValue: 7500.0,
        valuationMethod: ValuationMethod.STANDARD_COST,
        batchNumber: 'BATCH005',
        remarks: 'Standard cost valuation',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-02T11:00:00Z'),
  },
  {
    id: '4',
    valuationNumber: 'VAL-2024-004',
    type: ValuationType.ADJUSTMENT,
    status: ValuationStatus.DRAFT,
    method: ValuationMethod.MOVING_AVERAGE,
    frequency: ValuationFrequency.ON_DEMAND,
    date: new Date('2024-02-03'),
    effectiveDate: new Date('2024-02-03'),
    periodStart: new Date('2024-02-03'),
    periodEnd: new Date('2024-02-03'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    totalItems: 20,
    totalQuantity: 300,
    totalValue: 25000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP004',
    performedByName: 'Tom Brown',
    department: 'Inventory',
    remarks: 'Adjustment valuation for price corrections',
    items: [
      {
        id: '4-1',
        itemCode: 'ITEM006',
        itemName: 'Maintenance Tool',
        description: 'Specialized Equipment',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC007',
        locationName: 'Maintenance Area',
        quantityOnHand: 5,
        unitCost: 200.0,
        totalValue: 1000.0,
        valuationMethod: ValuationMethod.MOVING_AVERAGE,
        batchNumber: 'BATCH006',
        remarks: 'Moving average adjustment',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-03T14:00:00Z'),
  },
  {
    id: '5',
    valuationNumber: 'VAL-2024-005',
    type: ValuationType.AUTOMATIC,
    status: ValuationStatus.CANCELLED,
    method: ValuationMethod.LIFO,
    frequency: ValuationFrequency.WEEKLY,
    date: new Date('2024-02-04'),
    effectiveDate: new Date('2024-02-04'),
    periodStart: new Date('2024-02-04'),
    periodEnd: new Date('2024-02-04'),
    warehouseCode: 'WH003',
    warehouseName: 'Production Warehouse',
    totalItems: 10,
    totalQuantity: 150,
    totalValue: 15000.0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP005',
    performedByName: 'Lisa Davis',
    department: 'Inventory',
    remarks: 'Automatic valuation cancelled due to system error',
    items: [
      {
        id: '5-1',
        itemCode: 'ITEM007',
        itemName: 'Production Material',
        description: 'Manufacturing Component',
        warehouseCode: 'WH003',
        warehouseName: 'Production Warehouse',
        locationCode: 'LOC008',
        locationName: 'Production Floor',
        quantityOnHand: 15,
        unitCost: 200.0,
        totalValue: 3000.0,
        valuationMethod: ValuationMethod.LIFO,
        batchNumber: 'BATCH007',
        remarks: 'LIFO valuation cancelled',
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-04T16:00:00Z'),
  },
]

// API functions
export const valuationApi = {
  // Get all valuations with pagination and filters
  async getValuations(params: ValuationListParams = {}): Promise<ValuationListResponse> {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockValuations]

    // Apply filters
    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.method) {
      filteredItems = filteredItems.filter((item) => item.method === filters.method)
    }
    if (filters.frequency) {
      filteredItems = filteredItems.filter((item) => item.frequency === filters.frequency)
    }
    if (filters.warehouseCode) {
      filteredItems = filteredItems.filter((item) => item.warehouseCode === filters.warehouseCode)
    }
    if (filters.locationCode) {
      filteredItems = filteredItems.filter((item) => item.locationCode === filters.locationCode)
    }
    if (filters.performedBy) {
      filteredItems = filteredItems.filter((item) => item.performedBy === filters.performedBy)
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
          item.valuationNumber.toLowerCase().includes(searchLower) ||
          item.performedByName.toLowerCase().includes(searchLower) ||
          item.warehouseName?.toLowerCase().includes(searchLower) ||
          item.locationName?.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof InventoryValuation]
      const bValue = b[sortBy as keyof InventoryValuation]

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
    const stats: ValuationStats = {
      totalValuations: mockValuations.length,
      pendingValuations: mockValuations.filter((item) => item.status === ValuationStatus.PENDING)
        .length,
      inProgressValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.IN_PROGRESS,
      ).length,
      completedValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.COMPLETED,
      ).length,
      approvedValuations: mockValuations.filter((item) => item.status === ValuationStatus.APPROVED)
        .length,
      cancelledValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.CANCELLED,
      ).length,
      totalInventoryValue: mockValuations.reduce((sum, item) => sum + item.totalValue, 0),
      averageValuationTime: 2.5, // Mock value in hours
      lastValuationDate: mockValuations[0]?.date,
      nextScheduledValuation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
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

  // Get single valuation by ID
  async getValuation(id: string): Promise<InventoryValuation | null> {
    return mockValuations.find((item) => item.id === id) || null
  },

  // Create new valuation
  async createValuation(data: ValuationFormData): Promise<InventoryValuation> {
    const newId = (mockValuations.length + 1).toString()
    const valuationNumber = `VAL-2024-${newId.padStart(3, '0')}`

    const newValuation: InventoryValuation = {
      id: newId,
      valuationNumber,
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : undefined,
      locationName: data.locationCode ? 'Location Name' : undefined,
      performedByName: 'Employee Name', // Mock employee name
      totalItems: data.items.length,
      totalQuantity: data.items.reduce((sum, item) => sum + item.quantityOnHand, 0),
      totalValue: data.items.reduce((sum, item) => sum + item.quantityOnHand * item.unitCost, 0),
      items: data.items.map((item, index) => ({
        ...item,
        id: `${newId}-${index + 1}`,
        totalValue: item.quantityOnHand * item.unitCost,
        warehouseName: 'Main Warehouse',
        locationName: item.locationCode ? 'Location Name' : undefined,
      })),
      createdBy: 'admin',
      createdDate: new Date(),
      status: ValuationStatus.DRAFT,
    }

    mockValuations.unshift(newValuation)
    return newValuation
  },

  // Update valuation
  async updateValuation(id: string, data: Partial<ValuationFormData>): Promise<InventoryValuation> {
    const index = mockValuations.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Valuation not found')
    }

    const updatedValuation: InventoryValuation = {
      ...mockValuations[index],
      ...data,
      totalItems: data.items ? data.items.length : mockValuations[index].totalItems,
      totalQuantity: data.items
        ? data.items.reduce((sum, item) => sum + item.quantityOnHand, 0)
        : mockValuations[index].totalQuantity,
      totalValue: data.items
        ? data.items.reduce((sum, item) => sum + item.quantityOnHand * item.unitCost, 0)
        : mockValuations[index].totalValue,
      items: data.items
        ? data.items.map((item, itemIndex) => ({
            ...item,
            id: `${id}-${itemIndex + 1}`,
            totalValue: item.quantityOnHand * item.unitCost,
            warehouseName: 'Main Warehouse',
            locationName: item.locationCode ? 'Location Name' : undefined,
          }))
        : mockValuations[index].items,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockValuations[index] = updatedValuation
    return updatedValuation
  },

  // Delete valuation
  async deleteValuation(id: string): Promise<void> {
    const index = mockValuations.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Valuation not found')
    }
    mockValuations.splice(index, 1)
  },

  // Approve valuation
  async approveValuation(id: string): Promise<InventoryValuation> {
    const index = mockValuations.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Valuation not found')
    }

    mockValuations[index] = {
      ...mockValuations[index],
      status: ValuationStatus.APPROVED,
      approvedBy: 'admin',
      approvedByName: 'Admin User',
      approvedDate: new Date(),
    }

    return mockValuations[index]
  },

  // Complete valuation
  async completeValuation(id: string): Promise<InventoryValuation> {
    const index = mockValuations.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Valuation not found')
    }

    mockValuations[index] = {
      ...mockValuations[index],
      status: ValuationStatus.COMPLETED,
      completedDate: new Date(),
    }

    return mockValuations[index]
  },

  // Get statistics
  async getStats(): Promise<ValuationStats> {
    return {
      totalValuations: mockValuations.length,
      pendingValuations: mockValuations.filter((item) => item.status === ValuationStatus.PENDING)
        .length,
      inProgressValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.IN_PROGRESS,
      ).length,
      completedValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.COMPLETED,
      ).length,
      approvedValuations: mockValuations.filter((item) => item.status === ValuationStatus.APPROVED)
        .length,
      cancelledValuations: mockValuations.filter(
        (item) => item.status === ValuationStatus.CANCELLED,
      ).length,
      totalInventoryValue: mockValuations.reduce((sum, item) => sum + item.totalValue, 0),
      averageValuationTime: 2.5, // Mock value in hours
      lastValuationDate: mockValuations[0]?.date,
      nextScheduledValuation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    }
  },
}
