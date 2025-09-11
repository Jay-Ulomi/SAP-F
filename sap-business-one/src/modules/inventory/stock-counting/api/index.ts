import { CountingType, CountingMethod, CountingStatus, CountingFrequency, VarianceType } from '../types'
import type {
  StockCounting,
  CountingFormData,
  CountingListParams,
  CountingListResponse,
  CountingStats,
  CountingTemplate,
  CountingExecution,
} from '../types'

// Mock data
const mockCountings: StockCounting[] = [
  {
    id: '1',
    countingNumber: 'SC-2024-001',
    type: CountingType.PERIODIC,
    method: CountingMethod.MANUAL,
    status: CountingStatus.COMPLETED,
    frequency: CountingFrequency.MONTHLY,
    date: new Date('2024-01-31'),
    startDate: new Date('2024-01-31T08:00:00Z'),
    endDate: new Date('2024-01-31T17:00:00Z'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC001',
    locationName: 'Storage Area A',
    totalItems: 150,
    countedItems: 150,
    pendingItems: 0,
    totalVariance: 25,
    totalVarianceValue: 1250.00,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP001',
    performedByName: 'John Smith',
    department: 'Inventory',
    remarks: 'Monthly stock counting completed successfully',
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
        binCode: 'BIN001',
        binName: 'Electronics Bin',
        unitOfMeasure: 'EA',
        systemQuantity: 25,
        countedQuantity: 24,
        variance: -1,
        varianceType: VarianceType.NEGATIVE,
        variancePercentage: -4.0,
        unitCost: 200.00,
        varianceValue: -200.00,
        batchNumber: 'BATCH001',
        remarks: 'One unit missing - investigation required',
        countedBy: 'EMP001',
        countedByName: 'John Smith',
        countedDate: new Date('2024-01-31T10:30:00Z'),
        isApproved: true,
        approvedBy: 'MGR001',
        approvedByName: 'Jane Manager',
        approvedDate: new Date('2024-01-31T11:00:00Z'),
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
        binCode: 'BIN001',
        binName: 'Electronics Bin',
        unitOfMeasure: 'EA',
        systemQuantity: 50,
        countedQuantity: 52,
        variance: 2,
        varianceType: VarianceType.POSITIVE,
        variancePercentage: 4.0,
        unitCost: 100.00,
        varianceValue: 200.00,
        batchNumber: 'BATCH002',
        remarks: 'Extra units found - possible receipt not recorded',
        countedBy: 'EMP001',
        countedByName: 'John Smith',
        countedDate: new Date('2024-01-31T10:45:00Z'),
        isApproved: true,
        approvedBy: 'MGR001',
        approvedByName: 'Jane Manager',
        approvedDate: new Date('2024-01-31T11:00:00Z'),
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-31T08:00:00Z'),
    postedDate: new Date('2024-01-31T12:00:00Z'),
    postedBy: 'admin',
    postedByName: 'Admin User',
  },
  {
    id: '2',
    countingNumber: 'SC-2024-002',
    type: CountingType.CYCLE,
    method: CountingMethod.BARCODE,
    status: CountingStatus.IN_PROGRESS,
    frequency: CountingFrequency.WEEKLY,
    date: new Date('2024-02-01'),
    startDate: new Date('2024-02-01T09:00:00Z'),
    endDate: new Date('2024-02-01T17:00:00Z'),
    warehouseCode: 'WH002',
    warehouseName: 'Branch Warehouse',
    locationCode: 'LOC003',
    locationName: 'Storage Area B',
    totalItems: 75,
    countedItems: 45,
    pendingItems: 30,
    totalVariance: 0,
    totalVarianceValue: 0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP002',
    performedByName: 'Mike Johnson',
    department: 'Inventory',
    remarks: 'Weekly cycle counting in progress',
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
        binCode: 'BIN003',
        binName: 'Cables Bin',
        unitOfMeasure: 'EA',
        systemQuantity: 100,
        countedQuantity: 100,
        variance: 0,
        varianceType: VarianceType.ZERO,
        variancePercentage: 0.0,
        unitCost: 50.00,
        varianceValue: 0.00,
        batchNumber: 'BATCH003',
        countedBy: 'EMP002',
        countedByName: 'Mike Johnson',
        countedDate: new Date('2024-02-01T10:00:00Z'),
        isApproved: false,
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T09:00:00Z'),
  },
  {
    id: '3',
    countingNumber: 'SC-2024-003',
    type: CountingType.SPOT,
    method: CountingMethod.MANUAL,
    status: CountingStatus.DRAFT,
    frequency: CountingFrequency.ON_DEMAND,
    date: new Date('2024-02-02'),
    startDate: new Date('2024-02-02T14:00:00Z'),
    endDate: new Date('2024-02-02T16:00:00Z'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationCode: 'LOC002',
    locationName: 'Storage Area B',
    totalItems: 20,
    countedItems: 0,
    pendingItems: 20,
    totalVariance: 0,
    totalVarianceValue: 0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP003',
    performedByName: 'Sarah Wilson',
    department: 'Inventory',
    remarks: 'Spot counting for specific items',
    items: [],
    createdBy: 'admin',
    createdDate: new Date('2024-02-02T14:00:00Z'),
  },
  {
    id: '4',
    countingNumber: 'SC-2024-004',
    type: CountingType.FULL,
    method: CountingMethod.RFID,
    status: CountingStatus.POSTED,
    frequency: CountingFrequency.QUARTERLY,
    date: new Date('2024-01-15'),
    startDate: new Date('2024-01-15T08:00:00Z'),
    endDate: new Date('2024-01-15T18:00:00Z'),
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    totalItems: 500,
    countedItems: 500,
    pendingItems: 0,
    totalVariance: -15,
    totalVarianceValue: -750.00,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP004',
    performedByName: 'Tom Brown',
    department: 'Inventory',
    remarks: 'Quarterly full warehouse counting completed',
    items: [
      {
        id: '4-1',
        itemCode: 'ITEM004',
        itemName: 'Raw Material A',
        description: 'Steel Component',
        warehouseCode: 'WH001',
        warehouseName: 'Main Warehouse',
        locationCode: 'LOC002',
        locationName: 'Storage Area B',
        binCode: 'BIN004',
        binName: 'Raw Materials Bin',
        unitOfMeasure: 'KG',
        systemQuantity: 1000,
        countedQuantity: 985,
        variance: -15,
        varianceType: VarianceType.NEGATIVE,
        variancePercentage: -1.5,
        unitCost: 50.00,
        varianceValue: -750.00,
        batchNumber: 'BATCH004',
        remarks: 'Material shrinkage detected',
        countedBy: 'EMP004',
        countedByName: 'Tom Brown',
        countedDate: new Date('2024-01-15T15:30:00Z'),
        isApproved: true,
        approvedBy: 'MGR001',
        approvedByName: 'Jane Manager',
        approvedDate: new Date('2024-01-15T16:00:00Z'),
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-01-15T08:00:00Z'),
    postedDate: new Date('2024-01-15T19:00:00Z'),
    postedBy: 'admin',
    postedByName: 'Admin User',
  },
  {
    id: '5',
    countingNumber: 'SC-2024-005',
    type: CountingType.PARTIAL,
    method: CountingMethod.AUTOMATED,
    status: CountingStatus.CANCELLED,
    frequency: CountingFrequency.ON_DEMAND,
    date: new Date('2024-02-03'),
    startDate: new Date('2024-02-03T10:00:00Z'),
    endDate: new Date('2024-02-03T12:00:00Z'),
    warehouseCode: 'WH003',
    warehouseName: 'Production Warehouse',
    locationCode: 'LOC008',
    locationName: 'Production Floor',
    totalItems: 30,
    countedItems: 10,
    pendingItems: 20,
    totalVariance: 0,
    totalVarianceValue: 0,
    currency: 'USD',
    exchangeRate: 1.0,
    performedBy: 'EMP005',
    performedByName: 'Lisa Davis',
    department: 'Inventory',
    remarks: 'Automated counting cancelled due to system error',
    items: [
      {
        id: '5-1',
        itemCode: 'ITEM005',
        itemName: 'Production Material',
        description: 'Manufacturing Component',
        warehouseCode: 'WH003',
        warehouseName: 'Production Warehouse',
        locationCode: 'LOC008',
        locationName: 'Production Floor',
        binCode: 'BIN005',
        binName: 'Production Bin',
        unitOfMeasure: 'EA',
        systemQuantity: 15,
        countedQuantity: 15,
        variance: 0,
        varianceType: VarianceType.ZERO,
        variancePercentage: 0.0,
        unitCost: 200.00,
        varianceValue: 0.00,
        batchNumber: 'BATCH005',
        countedBy: 'EMP005',
        countedByName: 'Lisa Davis',
        countedDate: new Date('2024-02-03T10:30:00Z'),
        isApproved: false,
      },
    ],
    createdBy: 'admin',
    createdDate: new Date('2024-02-03T10:00:00Z'),
  },
]

// API functions
export const countingApi = {
  // Get all countings with pagination and filters
  async getCountings(params: CountingListParams = {}): Promise<CountingListResponse> {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockCountings]

    // Apply filters
    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.method) {
      filteredItems = filteredItems.filter((item) => item.method === filters.method)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
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
    if (filters.itemGroup) {
      filteredItems = filteredItems.filter((item) => item.itemGroup === filters.itemGroup)
    }
    if (filters.itemCategory) {
      filteredItems = filteredItems.filter((item) => item.itemCategory === filters.itemCategory)
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
          item.countingNumber.toLowerCase().includes(searchLower) ||
          item.performedByName.toLowerCase().includes(searchLower) ||
          item.warehouseName.toLowerCase().includes(searchLower) ||
          item.locationName?.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof StockCounting]
      const bValue = b[sortBy as keyof StockCounting]

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
    const stats: CountingStats = {
      totalCountings: mockCountings.length,
      draftCountings: mockCountings.filter((item) => item.status === CountingStatus.DRAFT).length,
      inProgressCountings: mockCountings.filter((item) => item.status === CountingStatus.IN_PROGRESS).length,
      completedCountings: mockCountings.filter((item) => item.status === CountingStatus.COMPLETED).length,
      postedCountings: mockCountings.filter((item) => item.status === CountingStatus.POSTED).length,
      cancelledCountings: mockCountings.filter((item) => item.status === CountingStatus.CANCELLED).length,
      totalItemsCounted: mockCountings.reduce((sum, item) => sum + item.countedItems, 0),
      totalVarianceValue: mockCountings.reduce((sum, item) => sum + item.totalVarianceValue, 0),
      averageVariancePercentage: 0.5, // Mock value
      lastCountingDate: mockCountings[0]?.date,
      nextScheduledCounting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
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

  // Get single counting by ID
  async getCounting(id: string): Promise<StockCounting | null> {
    return mockCountings.find((item) => item.id === id) || null
  },

  // Create new counting
  async createCounting(data: CountingFormData): Promise<StockCounting> {
    const newId = (mockCountings.length + 1).toString()
    const countingNumber = `SC-2024-${newId.padStart(3, '0')}`

    const newCounting: StockCounting = {
      id: newId,
      countingNumber,
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : 'Unknown Warehouse',
      locationName: data.locationCode ? 'Location Name' : undefined,
      performedByName: 'Employee Name', // Mock employee name
      totalItems: data.items.length,
      countedItems: 0,
      pendingItems: data.items.length,
      totalVariance: 0,
      totalVarianceValue: 0,
      items: data.items.map((item, index) => ({
        ...item,
        id: `${newId}-${index + 1}`,
        warehouseName: 'Main Warehouse',
        locationName: item.locationCode ? 'Location Name' : undefined,
        binName: item.binCode ? 'Bin Name' : undefined,
        variance: 0,
        varianceType: VarianceType.ZERO,
        variancePercentage: 0,
        varianceValue: 0,
        countedBy: data.performedBy,
        countedByName: 'Employee Name',
        countedDate: new Date(),
        isApproved: false,
      })),
      createdBy: 'admin',
      createdDate: new Date(),
      status: CountingStatus.DRAFT,
    }

    mockCountings.unshift(newCounting)
    return newCounting
  },

  // Update counting
  async updateCounting(id: string, data: Partial<CountingFormData>): Promise<StockCounting> {
    const index = mockCountings.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Counting not found')
    }

    const updatedCounting: StockCounting = {
      ...mockCountings[index],
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : mockCountings[index].warehouseName,
      locationName: data.locationCode ? 'Location Name' : mockCountings[index].locationName,
      totalItems: data.items ? data.items.length : mockCountings[index].totalItems,
      items: data.items
        ? data.items.map((item, itemIndex) => ({
            ...item,
            id: `${id}-${itemIndex + 1}`,
            warehouseName: 'Main Warehouse',
            locationName: item.locationCode ? 'Location Name' : undefined,
            binName: item.binCode ? 'Bin Name' : undefined,
            variance: 0,
            varianceType: VarianceType.ZERO,
            variancePercentage: 0,
            varianceValue: 0,
            countedBy: data.performedBy || mockCountings[index].performedBy,
            countedByName: 'Employee Name',
            countedDate: new Date(),
            isApproved: false,
          }))
        : mockCountings[index].items,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockCountings[index] = updatedCounting
    return updatedCounting
  },

  // Delete counting
  async deleteCounting(id: string): Promise<void> {
    const index = mockCountings.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Counting not found')
    }
    mockCountings.splice(index, 1)
  },

  // Post counting
  async postCounting(id: string): Promise<StockCounting> {
    const index = mockCountings.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Counting not found')
    }

    mockCountings[index] = {
      ...mockCountings[index],
      status: CountingStatus.POSTED,
      postedBy: 'admin',
      postedByName: 'Admin User',
      postedDate: new Date(),
    }

    return mockCountings[index]
  },

  // Get statistics
  async getStats(): Promise<CountingStats> {
    return {
      totalCountings: mockCountings.length,
      draftCountings: mockCountings.filter((item) => item.status === CountingStatus.DRAFT).length,
      inProgressCountings: mockCountings.filter((item) => item.status === CountingStatus.IN_PROGRESS).length,
      completedCountings: mockCountings.filter((item) => item.status === CountingStatus.COMPLETED).length,
      postedCountings: mockCountings.filter((item) => item.status === CountingStatus.POSTED).length,
      cancelledCountings: mockCountings.filter((item) => item.status === CountingStatus.CANCELLED).length,
      totalItemsCounted: mockCountings.reduce((sum, item) => sum + item.countedItems, 0),
      totalVarianceValue: mockCountings.reduce((sum, item) => sum + item.totalVarianceValue, 0),
      averageVariancePercentage: 0.5, // Mock value
      lastCountingDate: mockCountings[0]?.date,
      nextScheduledCounting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    }
  },
}
