// Resource Master Data API

import type {
  Resource,
  ResourceFormData,
  ResourceSearchParams,
  ResourceStats,
  ResourceType,
  ResourceStatus,
  ResourceCategory,
} from '../types'

// Mock data
const mockResources: Resource[] = [
  {
    id: 'RES001',
    resourceCode: 'RES001',
    resourceName: 'CNC Machine 1',
    description: 'High-precision CNC milling machine',
    type: 'machine' as ResourceType,
    status: 'available' as ResourceStatus,
    category: 'production' as ResourceCategory,
    groupId: 'GRP001',
    groupName: 'Machining Center',
    costCenterId: 'CC001',
    costCenterName: 'Production Floor A',
    departmentId: 'DEPT001',
    departmentName: 'Manufacturing',
    locationId: 'LOC001',
    locationName: 'Building A - Floor 1',
    capacityPerDay: 16,
    capacityUnit: 'hours',
    standardCostPerHour: 150,
    overtimeCostPerHour: 225,
    efficiency: 92,
    utilizationRate: 85,
    maintenanceSchedule: 'Monthly',
    nextMaintenanceDate: '2024-02-01',
    specifications: {
      model: 'DMG MORI NLX 2500',
      manufacturer: 'DMG MORI',
      serialNumber: 'NLX2500-2023-001',
      purchaseDate: '2023-01-15',
      warrantyExpiry: '2026-01-15',
    },
    restrictions: ['Requires certified operator', 'Maximum part size: 500mm'],
    notes: 'Primary machine for precision parts',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'RES002',
    resourceCode: 'RES002',
    resourceName: 'Senior Technician - John Doe',
    description: 'Experienced manufacturing technician',
    type: 'labor' as ResourceType,
    status: 'in_use' as ResourceStatus,
    category: 'production' as ResourceCategory,
    groupId: 'GRP002',
    groupName: 'Technical Staff',
    costCenterId: 'CC001',
    costCenterName: 'Production Floor A',
    departmentId: 'DEPT001',
    departmentName: 'Manufacturing',
    locationId: 'LOC001',
    locationName: 'Building A - Floor 1',
    capacityPerDay: 8,
    capacityUnit: 'hours',
    standardCostPerHour: 75,
    overtimeCostPerHour: 112.5,
    efficiency: 95,
    utilizationRate: 90,
    skills: ['CNC Operation', 'Quality Control', 'CAD/CAM', 'Welding'],
    certifications: ['ISO 9001', 'Six Sigma Green Belt', 'CNC Programming'],
    notes: 'Team lead for morning shift',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2020-06-01T08:00:00Z',
  },
  {
    id: 'RES003',
    resourceCode: 'RES003',
    resourceName: '3D Printer Station',
    description: 'Industrial 3D printing system',
    type: 'equipment' as ResourceType,
    status: 'available' as ResourceStatus,
    category: 'production' as ResourceCategory,
    groupId: 'GRP003',
    groupName: 'Additive Manufacturing',
    costCenterId: 'CC002',
    costCenterName: 'R&D Center',
    departmentId: 'DEPT002',
    departmentName: 'Research & Development',
    locationId: 'LOC002',
    locationName: 'Building B - Floor 2',
    capacityPerDay: 24,
    capacityUnit: 'hours',
    standardCostPerHour: 80,
    efficiency: 88,
    utilizationRate: 65,
    specifications: {
      model: 'Stratasys F900',
      manufacturer: 'Stratasys',
      serialNumber: 'F900-2023-042',
      purchaseDate: '2023-03-20',
      warrantyExpiry: '2025-03-20',
    },
    maintenanceSchedule: 'Quarterly',
    nextMaintenanceDate: '2024-03-01',
    notes: 'Used for prototyping and small batch production',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2023-03-20T14:00:00Z',
  },
]

// Helper function to filter resources
function filterResources(resources: Resource[], filters: ResourceSearchParams['filters']) {
  if (!filters) return resources

  return resources.filter((resource) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (
        !resource.resourceCode.toLowerCase().includes(searchLower) &&
        !resource.resourceName.toLowerCase().includes(searchLower) &&
        !resource.description?.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    if (filters.type && resource.type !== filters.type) return false
    if (filters.status && resource.status !== filters.status) return false
    if (filters.category && resource.category !== filters.category) return false
    if (filters.groupId && resource.groupId !== filters.groupId) return false
    if (filters.departmentId && resource.departmentId !== filters.departmentId) return false
    if (filters.locationId && resource.locationId !== filters.locationId) return false
    if (filters.minCapacity && resource.capacityPerDay < filters.minCapacity) return false
    if (filters.maxCapacity && resource.capacityPerDay > filters.maxCapacity) return false

    return true
  })
}

// API functions
export const resourceMasterDataAPI = {
  // Get all resources with filters
  async getResources(params?: ResourceSearchParams) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filtered = filterResources(mockResources, params?.filters)

    // Sorting
    if (params?.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Resource]
        const bValue = b[params.sortBy as keyof Resource]
        const order = params.sortOrder === 'desc' ? -1 : 1
        return aValue > bValue ? order : -order
      })
    }

    // Pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const items = filtered.slice(start, start + limit)

    return {
      items,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    }
  },

  // Get resource by ID
  async getResourceById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const resource = mockResources.find((r) => r.id === id)
    if (!resource) {
      throw new Error('Resource not found')
    }
    return resource
  },

  // Create new resource
  async createResource(data: ResourceFormData) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newResource: Resource = {
      id: `RES${String(mockResources.length + 1).padStart(3, '0')}`,
      ...data,
      groupName: 'Production Group',
      costCenterName: 'Main Center',
      departmentName: 'Manufacturing',
      locationName: 'Main Floor',
      utilizationRate: 0,
      isActive: true,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockResources.push(newResource)
    return newResource
  },

  // Update resource
  async updateResource(id: string, data: Partial<ResourceFormData>) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockResources.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Resource not found')
    }
    mockResources[index] = {
      ...mockResources[index],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    return mockResources[index]
  },

  // Delete resource
  async deleteResource(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockResources.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error('Resource not found')
    }
    mockResources.splice(index, 1)
    return { success: true }
  },

  // Get resource statistics
  async getResourceStats(): Promise<ResourceStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const stats: ResourceStats = {
      totalResources: mockResources.length,
      availableResources: mockResources.filter((r) => r.status === 'available').length,
      inUseResources: mockResources.filter((r) => r.status === 'in_use').length,
      maintenanceResources: mockResources.filter((r) => r.status === 'maintenance').length,
      averageUtilization:
        mockResources.reduce((sum, r) => sum + r.utilizationRate, 0) / mockResources.length,
      averageEfficiency:
        mockResources.reduce((sum, r) => sum + r.efficiency, 0) / mockResources.length,
      totalCapacity: mockResources.reduce((sum, r) => sum + r.capacityPerDay, 0),
      usedCapacity: mockResources
        .filter((r) => r.status === 'in_use')
        .reduce((sum, r) => sum + r.capacityPerDay, 0),
      resourcesByType: mockResources.reduce(
        (acc, r) => {
          acc[r.type] = (acc[r.type] || 0) + 1
          return acc
        },
        {} as Record<ResourceType, number>,
      ),
      resourcesByCategory: mockResources.reduce(
        (acc, r) => {
          acc[r.category] = (acc[r.category] || 0) + 1
          return acc
        },
        {} as Record<ResourceCategory, number>,
      ),
    }

    return stats
  },

  // Check resource availability
  async checkAvailability(resourceId: string, date: string, hours: number) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const resource = mockResources.find((r) => r.id === resourceId)
    if (!resource) {
      throw new Error('Resource not found')
    }
    // Simplified availability check
    return {
      available: resource.status === 'available' && hours <= resource.capacityPerDay,
      resource,
      requestedHours: hours,
      availableHours: resource.status === 'available' ? resource.capacityPerDay : 0,
    }
  },
}