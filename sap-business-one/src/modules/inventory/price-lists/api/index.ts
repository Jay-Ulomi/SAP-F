import { PriceListType, PriceListStatus, PriceListCurrency, PriceListScope, PriceListPriority, PriceListUpdateFrequency, PriceListRounding } from '../types'
import type {
  PriceList,
  PriceListFormData,
  PriceListListParams,
  PriceListListResponse,
  PriceListStats,
  PriceListTemplate,
  PriceListHistory,
  PriceListValidation,
} from '../types'

// Mock data
const mockPriceLists: PriceList[] = [
  {
    id: '1',
    priceListCode: 'PL-001',
    priceListName: 'Standard Sales Price List',
    description: 'Standard pricing for all customers',
    type: PriceListType.SALES,
    status: PriceListStatus.ACTIVE,
    currency: PriceListCurrency.USD,
    scope: PriceListScope.GLOBAL,
    priority: PriceListPriority.MEDIUM,
    updateFrequency: PriceListUpdateFrequency.MONTHLY,
    rounding: PriceListRounding.ROUND_NEAREST,
    effectiveDate: new Date('2024-01-01'),
    expiryDate: new Date('2024-12-31'),
    totalItems: 150,
    activeItems: 145,
    inactiveItems: 5,
    averagePrice: 125.50,
    totalValue: 18825.00,
    isDefault: true,
    isSystem: false,
    createdBy: 'admin',
    createdDate: new Date('2024-01-01T08:00:00Z'),
    items: [
      {
        id: '1-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        unitOfMeasure: 'EA',
        basePrice: 1200.00,
        unitPrice: 1200.00,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: 1200.00,
        minimumQuantity: 1,
        maximumQuantity: 100,
        effectiveDate: new Date('2024-01-01'),
        expiryDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'admin',
        createdDate: new Date('2024-01-01T08:00:00Z'),
      },
      {
        id: '1-2',
        itemCode: 'ITEM002',
        itemName: 'Wireless Mouse',
        description: 'Logitech MX Master 3',
        unitOfMeasure: 'EA',
        basePrice: 100.00,
        unitPrice: 100.00,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: 100.00,
        minimumQuantity: 1,
        maximumQuantity: 500,
        effectiveDate: new Date('2024-01-01'),
        expiryDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'admin',
        createdDate: new Date('2024-01-01T08:00:00Z'),
      },
    ],
  },
  {
    id: '2',
    priceListCode: 'PL-002',
    priceListName: 'Premium Customer Price List',
    description: 'Special pricing for premium customers',
    type: PriceListType.SALES,
    status: PriceListStatus.ACTIVE,
    currency: PriceListCurrency.USD,
    scope: PriceListScope.CUSTOMER,
    priority: PriceListPriority.HIGH,
    updateFrequency: PriceListUpdateFrequency.WEEKLY,
    rounding: PriceListRounding.ROUND_DOWN,
    effectiveDate: new Date('2024-01-15'),
    expiryDate: new Date('2024-12-31'),
    customerCode: 'CUST001',
    customerName: 'Premium Customer Inc.',
    totalItems: 75,
    activeItems: 75,
    inactiveItems: 0,
    averagePrice: 95.25,
    totalValue: 7143.75,
    isDefault: false,
    isSystem: false,
    createdBy: 'admin',
    createdDate: new Date('2024-01-15T10:00:00Z'),
    items: [
      {
        id: '2-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        unitOfMeasure: 'EA',
        basePrice: 1200.00,
        unitPrice: 1080.00,
        discountPercentage: 10,
        discountAmount: 120.00,
        finalPrice: 1080.00,
        minimumQuantity: 1,
        maximumQuantity: 50,
        effectiveDate: new Date('2024-01-15'),
        expiryDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'admin',
        createdDate: new Date('2024-01-15T10:00:00Z'),
      },
    ],
  },
  {
    id: '3',
    priceListCode: 'PL-003',
    priceListName: 'Purchase Price List',
    description: 'Standard purchase pricing from vendors',
    type: PriceListType.PURCHASE,
    status: PriceListStatus.ACTIVE,
    currency: PriceListCurrency.USD,
    scope: PriceListScope.VENDOR,
    priority: PriceListPriority.MEDIUM,
    updateFrequency: PriceListUpdateFrequency.MONTHLY,
    rounding: PriceListRounding.ROUND_NEAREST,
    effectiveDate: new Date('2024-01-01'),
    expiryDate: new Date('2024-12-31'),
    vendorCode: 'VEND001',
    vendorName: 'Tech Supplier Corp.',
    totalItems: 200,
    activeItems: 195,
    inactiveItems: 5,
    averagePrice: 85.75,
    totalValue: 17150.00,
    isDefault: false,
    isSystem: false,
    createdBy: 'admin',
    createdDate: new Date('2024-01-01T09:00:00Z'),
    items: [
      {
        id: '3-1',
        itemCode: 'ITEM001',
        itemName: 'Laptop Computer',
        description: 'Dell Latitude 5520',
        unitOfMeasure: 'EA',
        basePrice: 1000.00,
        unitPrice: 1000.00,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: 1000.00,
        minimumQuantity: 10,
        maximumQuantity: 1000,
        effectiveDate: new Date('2024-01-01'),
        expiryDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'admin',
        createdDate: new Date('2024-01-01T09:00:00Z'),
      },
    ],
  },
  {
    id: '4',
    priceListCode: 'PL-004',
    priceListName: 'Promotional Price List',
    description: 'Limited time promotional pricing',
    type: PriceListType.PROMOTIONAL,
    status: PriceListStatus.ACTIVE,
    currency: PriceListCurrency.USD,
    scope: PriceListScope.GLOBAL,
    priority: PriceListPriority.HIGH,
    updateFrequency: PriceListUpdateFrequency.MANUAL,
    rounding: PriceListRounding.ROUND_UP,
    effectiveDate: new Date('2024-02-01'),
    expiryDate: new Date('2024-02-29'),
    totalItems: 25,
    activeItems: 25,
    inactiveItems: 0,
    averagePrice: 45.00,
    totalValue: 1125.00,
    isDefault: false,
    isSystem: false,
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T08:00:00Z'),
    items: [
      {
        id: '4-1',
        itemCode: 'ITEM003',
        itemName: 'USB Cable',
        description: 'USB-C to USB-A Cable',
        unitOfMeasure: 'EA',
        basePrice: 50.00,
        unitPrice: 35.00,
        discountPercentage: 30,
        discountAmount: 15.00,
        finalPrice: 35.00,
        minimumQuantity: 1,
        maximumQuantity: 100,
        effectiveDate: new Date('2024-02-01'),
        expiryDate: new Date('2024-02-29'),
        isActive: true,
        createdBy: 'admin',
        createdDate: new Date('2024-02-01T08:00:00Z'),
      },
    ],
  },
  {
    id: '5',
    priceListCode: 'PL-005',
    priceListName: 'Draft Price List',
    description: 'New price list under development',
    type: PriceListType.SALES,
    status: PriceListStatus.DRAFT,
    currency: PriceListCurrency.USD,
    scope: PriceListScope.ITEM_GROUP,
    priority: PriceListPriority.LOW,
    updateFrequency: PriceListUpdateFrequency.MANUAL,
    rounding: PriceListRounding.ROUND_NEAREST,
    effectiveDate: new Date('2024-03-01'),
    itemGroup: 'Electronics',
    totalItems: 50,
    activeItems: 0,
    inactiveItems: 50,
    averagePrice: 0,
    totalValue: 0,
    isDefault: false,
    isSystem: false,
    createdBy: 'admin',
    createdDate: new Date('2024-02-15T14:00:00Z'),
    items: [
      {
        id: '5-1',
        itemCode: 'ITEM004',
        itemName: 'Raw Material A',
        description: 'Steel Component',
        unitOfMeasure: 'KG',
        basePrice: 50.00,
        unitPrice: 50.00,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: 50.00,
        minimumQuantity: 100,
        maximumQuantity: 10000,
        effectiveDate: new Date('2024-03-01'),
        isActive: false,
        createdBy: 'admin',
        createdDate: new Date('2024-02-15T14:00:00Z'),
      },
    ],
  },
]

// API functions
export const priceListsApi = {
  // Get all price lists with pagination and filters
  async getPriceLists(params: PriceListListParams = {}): Promise<PriceListListResponse> {
    const { page = 1, limit = 10, sortBy = 'createdDate', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockPriceLists]

    // Apply filters
    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.currency) {
      filteredItems = filteredItems.filter((item) => item.currency === filters.currency)
    }
    if (filters.scope) {
      filteredItems = filteredItems.filter((item) => item.scope === filters.scope)
    }
    if (filters.priority) {
      filteredItems = filteredItems.filter((item) => item.priority === filters.priority)
    }
    if (filters.warehouseCode) {
      filteredItems = filteredItems.filter((item) => item.warehouseCode === filters.warehouseCode)
    }
    if (filters.customerCode) {
      filteredItems = filteredItems.filter((item) => item.customerCode === filters.customerCode)
    }
    if (filters.vendorCode) {
      filteredItems = filteredItems.filter((item) => item.vendorCode === filters.vendorCode)
    }
    if (filters.itemGroup) {
      filteredItems = filteredItems.filter((item) => item.itemGroup === filters.itemGroup)
    }
    if (filters.itemCategory) {
      filteredItems = filteredItems.filter((item) => item.itemCategory === filters.itemCategory)
    }
    if (filters.isDefault !== undefined) {
      filteredItems = filteredItems.filter((item) => item.isDefault === filters.isDefault)
    }
    if (filters.isSystem !== undefined) {
      filteredItems = filteredItems.filter((item) => item.isSystem === filters.isSystem)
    }
    if (filters.effectiveDateFrom) {
      filteredItems = filteredItems.filter((item) => item.effectiveDate >= filters.effectiveDateFrom!)
    }
    if (filters.effectiveDateTo) {
      filteredItems = filteredItems.filter((item) => item.effectiveDate <= filters.effectiveDateTo!)
    }
    if (filters.expiryDateFrom) {
      filteredItems = filteredItems.filter((item) => item.expiryDate && item.expiryDate >= filters.expiryDateFrom!)
    }
    if (filters.expiryDateTo) {
      filteredItems = filteredItems.filter((item) => item.expiryDate && item.expiryDate <= filters.expiryDateTo!)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredItems = filteredItems.filter(
        (item) =>
          item.priceListCode.toLowerCase().includes(searchLower) ||
          item.priceListName.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.customerName?.toLowerCase().includes(searchLower) ||
          item.vendorName?.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof PriceList]
      const bValue = b[sortBy as keyof PriceList]

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
    const stats: PriceListStats = {
      totalPriceLists: mockPriceLists.length,
      activePriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.ACTIVE).length,
      inactivePriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.INACTIVE).length,
      draftPriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.DRAFT).length,
      expiredPriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.EXPIRED).length,
      totalItems: mockPriceLists.reduce((sum, item) => sum + item.totalItems, 0),
      averageItemsPerList: Math.round(mockPriceLists.reduce((sum, item) => sum + item.totalItems, 0) / mockPriceLists.length),
      totalValue: mockPriceLists.reduce((sum, item) => sum + item.totalValue, 0),
      lastUpdated: mockPriceLists[0]?.modifiedDate || mockPriceLists[0]?.createdDate,
      nextScheduledUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
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

  // Get single price list by ID
  async getPriceList(id: string): Promise<PriceList | null> {
    return mockPriceLists.find((item) => item.id === id) || null
  },

  // Create new price list
  async createPriceList(data: PriceListFormData): Promise<PriceList> {
    const newId = (mockPriceLists.length + 1).toString()
    const priceListCode = `PL-${newId.padStart(3, '0')}`

    const newPriceList: PriceList = {
      id: newId,
      priceListCode,
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : undefined,
      customerName: data.customerCode ? 'Customer Name' : undefined,
      vendorName: data.vendorCode ? 'Vendor Name' : undefined,
      totalItems: data.items.length,
      activeItems: data.items.filter((item) => item.isActive !== false).length,
      inactiveItems: data.items.filter((item) => item.isActive === false).length,
      averagePrice: data.items.length > 0 ? data.items.reduce((sum, item) => sum + item.unitPrice, 0) / data.items.length : 0,
      totalValue: data.items.reduce((sum, item) => sum + (item.unitPrice * (item.minimumQuantity || 1)), 0),
      isSystem: false,
      items: data.items.map((item, index) => ({
        ...item,
        id: `${newId}-${index + 1}`,
        finalPrice: item.unitPrice - (item.discountAmount || 0),
        isActive: item.isActive !== false,
        createdBy: 'admin',
        createdDate: new Date(),
      })),
      createdBy: 'admin',
      createdDate: new Date(),
    }

    mockPriceLists.unshift(newPriceList)
    return newPriceList
  },

  // Update price list
  async updatePriceList(id: string, data: Partial<PriceListFormData>): Promise<PriceList> {
    const index = mockPriceLists.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Price list not found')
    }

    const updatedPriceList: PriceList = {
      ...mockPriceLists[index],
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : mockPriceLists[index].warehouseName,
      customerName: data.customerCode ? 'Customer Name' : mockPriceLists[index].customerName,
      vendorName: data.vendorCode ? 'Vendor Name' : mockPriceLists[index].vendorName,
      totalItems: data.items ? data.items.length : mockPriceLists[index].totalItems,
      activeItems: data.items ? data.items.filter((item) => item.isActive !== false).length : mockPriceLists[index].activeItems,
      inactiveItems: data.items ? data.items.filter((item) => item.isActive === false).length : mockPriceLists[index].inactiveItems,
      averagePrice: data.items && data.items.length > 0 ? data.items.reduce((sum, item) => sum + item.unitPrice, 0) / data.items.length : mockPriceLists[index].averagePrice,
      totalValue: data.items ? data.items.reduce((sum, item) => sum + (item.unitPrice * (item.minimumQuantity || 1)), 0) : mockPriceLists[index].totalValue,
      items: data.items
        ? data.items.map((item, itemIndex) => ({
            ...item,
            id: `${id}-${itemIndex + 1}`,
            finalPrice: item.unitPrice - (item.discountAmount || 0),
            isActive: item.isActive !== false,
            createdBy: mockPriceLists[index].createdBy,
            createdDate: mockPriceLists[index].createdDate,
            modifiedBy: 'admin',
            modifiedDate: new Date(),
          }))
        : mockPriceLists[index].items,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockPriceLists[index] = updatedPriceList
    return updatedPriceList
  },

  // Delete price list
  async deletePriceList(id: string): Promise<void> {
    const index = mockPriceLists.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Price list not found')
    }
    mockPriceLists.splice(index, 1)
  },

  // Get statistics
  async getStats(): Promise<PriceListStats> {
    return {
      totalPriceLists: mockPriceLists.length,
      activePriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.ACTIVE).length,
      inactivePriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.INACTIVE).length,
      draftPriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.DRAFT).length,
      expiredPriceLists: mockPriceLists.filter((item) => item.status === PriceListStatus.EXPIRED).length,
      totalItems: mockPriceLists.reduce((sum, item) => sum + item.totalItems, 0),
      averageItemsPerList: Math.round(mockPriceLists.reduce((sum, item) => sum + item.totalItems, 0) / mockPriceLists.length),
      totalValue: mockPriceLists.reduce((sum, item) => sum + item.totalValue, 0),
      lastUpdated: mockPriceLists[0]?.modifiedDate || mockPriceLists[0]?.createdDate,
      nextScheduledUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    }
  },
}
