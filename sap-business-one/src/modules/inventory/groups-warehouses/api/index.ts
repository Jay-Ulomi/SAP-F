import type {
  ItemGroup,
  Warehouse,
  Location,
  ItemGroupFormData,
  WarehouseFormData,
  LocationFormData,
  GroupsWarehousesSearchParams,
  GroupsWarehousesResponse,
  GroupsWarehousesStatsResponse,
  Status,
  WarehouseType,
  LocationType,
} from '../types'

// Mock data
const mockItemGroups: ItemGroup[] = [
  {
    id: '1',
    groupCode: 'RAW-MAT',
    groupName: 'Raw Materials',
    description: 'Raw materials and components used in production',
    level: 1,
    isLeaf: false,
    itemCount: 45,
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedBy: 'admin',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    groupCode: 'FIN-GOODS',
    groupName: 'Finished Goods',
    description: 'Completed products ready for sale',
    level: 1,
    isLeaf: false,
    itemCount: 23,
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '3',
    groupCode: 'SPARE-PARTS',
    groupName: 'Spare Parts',
    description: 'Replacement parts and components',
    level: 1,
    isLeaf: true,
    itemCount: 12,
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '4',
    groupCode: 'SERVICES',
    groupName: 'Services',
    description: 'Service items and labor',
    level: 1,
    isLeaf: true,
    itemCount: 8,
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
]

const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    warehouseCode: 'MAIN-WH',
    warehouseName: 'Main Warehouse',
    description: 'Primary storage facility',
    type: 'main' as WarehouseType,
    address: {
      street: '123 Industrial Blvd',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
    },
    contactInfo: {
      phone: '+1-555-0123',
      email: 'main-warehouse@company.com',
      manager: 'John Smith',
    },
    capacity: {
      totalCapacity: 10000,
      usedCapacity: 7500,
      availableCapacity: 2500,
    },
    status: 'active' as Status,
    isDefault: true,
    createdBy: 'admin',
    createdAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '2',
    warehouseCode: 'SEC-WH',
    warehouseName: 'Secondary Warehouse',
    description: 'Secondary storage facility',
    type: 'secondary' as WarehouseType,
    address: {
      street: '456 Storage Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702',
      country: 'USA',
    },
    contactInfo: {
      phone: '+1-555-0124',
      email: 'secondary-warehouse@company.com',
      manager: 'Jane Doe',
    },
    capacity: {
      totalCapacity: 5000,
      usedCapacity: 3000,
      availableCapacity: 2000,
    },
    status: 'active' as Status,
    isDefault: false,
    createdBy: 'admin',
    createdAt: '2024-01-12T11:00:00Z',
  },
  {
    id: '3',
    warehouseCode: 'RETAIL-WH',
    warehouseName: 'Retail Warehouse',
    description: 'Retail distribution center',
    type: 'retail' as WarehouseType,
    address: {
      street: '789 Commerce St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703',
      country: 'USA',
    },
    contactInfo: {
      phone: '+1-555-0125',
      email: 'retail-warehouse@company.com',
      manager: 'Bob Johnson',
    },
    capacity: {
      totalCapacity: 3000,
      usedCapacity: 1800,
      availableCapacity: 1200,
    },
    status: 'active' as Status,
    isDefault: false,
    createdBy: 'admin',
    createdAt: '2024-01-14T13:00:00Z',
  },
]

const mockLocations: Location[] = [
  {
    id: '1',
    locationCode: 'A-01-01',
    locationName: 'Aisle A, Rack 01, Shelf 01',
    description: 'Main storage area - Aisle A',
    warehouseId: '1',
    warehouseCode: 'MAIN-WH',
    type: 'shelf' as LocationType,
    level: 3,
    isLeaf: true,
    capacity: {
      totalCapacity: 100,
      usedCapacity: 75,
      availableCapacity: 25,
    },
    coordinates: {
      x: 1,
      y: 1,
      z: 1,
    },
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-10T09:30:00Z',
  },
  {
    id: '2',
    locationCode: 'A-01-02',
    locationName: 'Aisle A, Rack 01, Shelf 02',
    description: 'Main storage area - Aisle A',
    warehouseId: '1',
    warehouseCode: 'MAIN-WH',
    type: 'shelf' as LocationType,
    level: 3,
    isLeaf: true,
    capacity: {
      totalCapacity: 100,
      usedCapacity: 60,
      availableCapacity: 40,
    },
    coordinates: {
      x: 1,
      y: 1,
      z: 2,
    },
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-10T09:30:00Z',
  },
  {
    id: '3',
    locationCode: 'B-01-01',
    locationName: 'Aisle B, Rack 01, Shelf 01',
    description: 'Secondary storage area - Aisle B',
    warehouseId: '2',
    warehouseCode: 'SEC-WH',
    type: 'shelf' as LocationType,
    level: 3,
    isLeaf: true,
    capacity: {
      totalCapacity: 80,
      usedCapacity: 50,
      availableCapacity: 30,
    },
    coordinates: {
      x: 2,
      y: 1,
      z: 1,
    },
    status: 'active' as Status,
    createdBy: 'admin',
    createdAt: '2024-01-12T11:30:00Z',
  },
]

// API Functions
export const groupsWarehousesApi = {
  // Get all groups, warehouses, and locations
  async getGroupsWarehouses(
    params: GroupsWarehousesSearchParams = {},
  ): Promise<GroupsWarehousesResponse> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', filters = {} } = params

    // Combine all data
    let allData: (ItemGroup | Warehouse | Location)[] = [
      ...mockItemGroups,
      ...mockWarehouses,
      ...mockLocations,
    ]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      allData = allData.filter((item) =>
        'groupName' in item
          ? item.groupName.toLowerCase().includes(searchLower) ||
            item.groupCode.toLowerCase().includes(searchLower)
          : 'warehouseName' in item
            ? item.warehouseName.toLowerCase().includes(searchLower) ||
              item.warehouseCode.toLowerCase().includes(searchLower)
            : item.locationName.toLowerCase().includes(searchLower) ||
              item.locationCode.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      allData = allData.filter((item) => item.status === filters.status)
    }

    if (filters.type) {
      if (filters.type === 'item_group') {
        allData = allData.filter((item) => 'groupName' in item)
      } else if (filters.type === 'warehouse') {
        allData = allData.filter((item) => 'warehouseName' in item)
      } else if (filters.type === 'location') {
        allData = allData.filter((item) => 'locationName' in item)
      }
    }

    if (filters.warehouseType) {
      allData = allData.filter((item) =>
        'warehouseName' in item ? item.type === filters.warehouseType : true,
      )
    }

    if (filters.locationType) {
      allData = allData.filter((item) =>
        'locationName' in item ? item.type === filters.locationType : true,
      )
    }

    if (filters.warehouseId) {
      allData = allData.filter((item) =>
        'locationName' in item ? item.warehouseId === filters.warehouseId : true,
      )
    }

    // Sort data
    allData.sort((a, b) => {
      const aValue = a[sortBy as keyof (ItemGroup | Warehouse | Location)]
      const bValue = b[sortBy as keyof (ItemGroup | Warehouse | Location)]

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
    const total = allData.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const data = allData.slice(startIndex, endIndex)

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    }
  },

  // Get stats
  async getStats(): Promise<GroupsWarehousesStatsResponse> {
    const totalGroups = mockItemGroups.length
    const activeGroups = mockItemGroups.filter((g) => g.status === 'active').length
    const totalWarehouses = mockWarehouses.length
    const activeWarehouses = mockWarehouses.filter((w) => w.status === 'active').length
    const totalLocations = mockLocations.length
    const activeLocations = mockLocations.filter((l) => l.status === 'active').length

    const totalCapacity = mockWarehouses.reduce(
      (sum, w) => sum + (w.capacity?.totalCapacity || 0),
      0,
    )
    const usedCapacity = mockWarehouses.reduce((sum, w) => sum + (w.capacity?.usedCapacity || 0), 0)
    const availableCapacity = totalCapacity - usedCapacity

    return {
      stats: {
        totalGroups,
        activeGroups,
        totalWarehouses,
        activeWarehouses,
        totalLocations,
        activeLocations,
        totalCapacity,
        usedCapacity,
        availableCapacity,
      },
    }
  },

  // Item Groups CRUD
  async getItemGroups(): Promise<ItemGroup[]> {
    return mockItemGroups
  },

  async getItemGroup(id: string): Promise<ItemGroup | null> {
    return mockItemGroups.find((g) => g.id === id) || null
  },

  async createItemGroup(data: ItemGroupFormData): Promise<ItemGroup> {
    const newGroup: ItemGroup = {
      id: Date.now().toString(),
      ...data,
      level: 1,
      isLeaf: true,
      itemCount: 0,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockItemGroups.push(newGroup)
    return newGroup
  },

  async updateItemGroup(id: string, data: Partial<ItemGroupFormData>): Promise<ItemGroup> {
    const index = mockItemGroups.findIndex((g) => g.id === id)
    if (index === -1) throw new Error('Item group not found')

    mockItemGroups[index] = {
      ...mockItemGroups[index],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    return mockItemGroups[index]
  },

  async deleteItemGroup(id: string): Promise<void> {
    const index = mockItemGroups.findIndex((g) => g.id === id)
    if (index === -1) throw new Error('Item group not found')
    mockItemGroups.splice(index, 1)
  },

  // Warehouses CRUD
  async getWarehouses(): Promise<Warehouse[]> {
    return mockWarehouses
  },

  async getWarehouse(id: string): Promise<Warehouse | null> {
    return mockWarehouses.find((w) => w.id === id) || null
  },

  async createWarehouse(data: WarehouseFormData): Promise<Warehouse> {
    const newWarehouse: Warehouse = {
      id: Date.now().toString(),
      ...data,
      capacity: {
        totalCapacity: data.capacity?.totalCapacity || 0,
        usedCapacity: 0,
        availableCapacity: data.capacity?.totalCapacity || 0,
      },
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockWarehouses.push(newWarehouse)
    return newWarehouse
  },

  async updateWarehouse(id: string, data: Partial<WarehouseFormData>): Promise<Warehouse> {
    const index = mockWarehouses.findIndex((w) => w.id === id)
    if (index === -1) throw new Error('Warehouse not found')

    mockWarehouses[index] = {
      ...mockWarehouses[index],
      ...data,
      capacity: {
        totalCapacity:
          data.capacity?.totalCapacity || mockWarehouses[index].capacity?.totalCapacity || 0,
        usedCapacity: mockWarehouses[index].capacity?.usedCapacity || 0,
        availableCapacity: mockWarehouses[index].capacity?.availableCapacity || 0,
      },
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    return mockWarehouses[index]
  },

  async deleteWarehouse(id: string): Promise<void> {
    const index = mockWarehouses.findIndex((w) => w.id === id)
    if (index === -1) throw new Error('Warehouse not found')
    mockWarehouses.splice(index, 1)
  },

  // Locations CRUD
  async getLocations(): Promise<Location[]> {
    return mockLocations
  },

  async getLocation(id: string): Promise<Location | null> {
    return mockLocations.find((l) => l.id === id) || null
  },

  async createLocation(data: LocationFormData): Promise<Location> {
    const warehouse = mockWarehouses.find((w) => w.id === data.warehouseId)
    if (!warehouse) throw new Error('Warehouse not found')

    const newLocation: Location = {
      id: Date.now().toString(),
      ...data,
      warehouseCode: warehouse.warehouseCode,
      level: 1,
      isLeaf: true,
      capacity: {
        totalCapacity: data.capacity?.totalCapacity || 0,
        usedCapacity: 0,
        availableCapacity: data.capacity?.totalCapacity || 0,
      },
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockLocations.push(newLocation)
    return newLocation
  },

  async updateLocation(id: string, data: Partial<LocationFormData>): Promise<Location> {
    const index = mockLocations.findIndex((l) => l.id === id)
    if (index === -1) throw new Error('Location not found')

    mockLocations[index] = {
      ...mockLocations[index],
      ...data,
      capacity: {
        totalCapacity:
          data.capacity?.totalCapacity || mockLocations[index].capacity?.totalCapacity || 0,
        usedCapacity: mockLocations[index].capacity?.usedCapacity || 0,
        availableCapacity: mockLocations[index].capacity?.availableCapacity || 0,
      },
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    return mockLocations[index]
  },

  async deleteLocation(id: string): Promise<void> {
    const index = mockLocations.findIndex((l) => l.id === id)
    if (index === -1) throw new Error('Location not found')
    mockLocations.splice(index, 1)
  },
}
