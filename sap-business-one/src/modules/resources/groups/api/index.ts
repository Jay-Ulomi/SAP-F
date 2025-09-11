// Resource Groups API

import type {
  ResourceGroup,
  ResourceGroupFormData,
  ResourceGroupSearchParams,
  ResourceGroupStats,
  GroupType,
  GroupStatus,
} from '../types'

// Mock data
const mockResourceGroups: ResourceGroup[] = [
  {
    id: 'GRP001',
    groupCode: 'GRP001',
    groupName: 'Machining Center',
    description: 'CNC machines and related equipment',
    type: 'production' as GroupType,
    status: 'active' as GroupStatus,
    departmentId: 'DEPT001',
    departmentName: 'Manufacturing',
    costCenterId: 'CC001',
    costCenterName: 'Production Floor A',
    totalResources: 8,
    availableResources: 6,
    totalCapacity: 128,
    usedCapacity: 96,
    efficiency: 92,
    standardCostPerHour: 1200,
    overtimeCostPerHour: 1800,
    shiftPattern: '3 Shifts - 24/7',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    operatingHours: {
      start: '00:00',
      end: '23:59',
    },
    resources: [
      { id: 'RES001', code: 'RES001', name: 'CNC Machine 1', type: 'machine', status: 'available' },
      { id: 'RES002', code: 'RES002', name: 'CNC Machine 2', type: 'machine', status: 'in_use' },
      { id: 'RES003', code: 'RES003', name: 'CNC Machine 3', type: 'machine', status: 'available' },
    ],
    restrictions: ['Requires certified operators', 'Scheduled maintenance every Sunday night'],
    notes: 'Primary production group for precision parts',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2023-01-01T08:00:00Z',
  },
  {
    id: 'GRP002',
    groupCode: 'GRP002',
    groupName: 'Assembly Line A',
    description: 'Main assembly line for product assembly',
    type: 'production' as GroupType,
    status: 'active' as GroupStatus,
    departmentId: 'DEPT001',
    departmentName: 'Manufacturing',
    costCenterId: 'CC002',
    costCenterName: 'Assembly Floor',
    totalResources: 15,
    availableResources: 12,
    totalCapacity: 120,
    usedCapacity: 90,
    efficiency: 88,
    standardCostPerHour: 750,
    overtimeCostPerHour: 1125,
    shiftPattern: '2 Shifts',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    operatingHours: {
      start: '06:00',
      end: '22:00',
    },
    resources: [
      { id: 'RES010', code: 'RES010', name: 'Assembly Station 1', type: 'equipment', status: 'available' },
      { id: 'RES011', code: 'RES011', name: 'Assembly Station 2', type: 'equipment', status: 'in_use' },
      { id: 'RES012', code: 'RES012', name: 'Assembly Worker Team A', type: 'labor', status: 'available' },
    ],
    notes: 'Handles main product assembly operations',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'GRP003',
    groupCode: 'GRP003',
    groupName: 'Quality Control Team',
    description: 'Quality inspection and testing resources',
    type: 'quality' as GroupType,
    status: 'active' as GroupStatus,
    departmentId: 'DEPT003',
    departmentName: 'Quality Assurance',
    costCenterId: 'CC003',
    costCenterName: 'QA Department',
    totalResources: 5,
    availableResources: 4,
    totalCapacity: 40,
    usedCapacity: 32,
    efficiency: 95,
    standardCostPerHour: 600,
    overtimeCostPerHour: 900,
    shiftPattern: '1 Shift',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    operatingHours: {
      start: '08:00',
      end: '17:00',
    },
    resources: [
      { id: 'RES020', code: 'RES020', name: 'Testing Equipment A', type: 'equipment', status: 'available' },
      { id: 'RES021', code: 'RES021', name: 'QC Inspector Team', type: 'labor', status: 'available' },
    ],
    notes: 'Performs quality checks and certifications',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2023-02-01T09:00:00Z',
  },
]

// Helper function to filter resource groups
function filterResourceGroups(groups: ResourceGroup[], filters: ResourceGroupSearchParams['filters']) {
  if (!filters) return groups

  return groups.filter((group) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (
        !group.groupCode.toLowerCase().includes(searchLower) &&
        !group.groupName.toLowerCase().includes(searchLower) &&
        !group.description?.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    if (filters.type && group.type !== filters.type) return false
    if (filters.status && group.status !== filters.status) return false
    if (filters.departmentId && group.departmentId !== filters.departmentId) return false
    if (filters.parentGroupId && group.parentGroupId !== filters.parentGroupId) return false
    if (filters.minResources && group.totalResources < filters.minResources) return false
    if (filters.maxResources && group.totalResources > filters.maxResources) return false

    return true
  })
}

// API functions
export const resourceGroupsAPI = {
  // Get all resource groups with filters
  async getResourceGroups(params?: ResourceGroupSearchParams) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filtered = filterResourceGroups(mockResourceGroups, params?.filters)

    // Sorting
    if (params?.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[params.sortBy as keyof ResourceGroup]
        const bValue = b[params.sortBy as keyof ResourceGroup]
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

  // Get resource group by ID
  async getResourceGroupById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const group = mockResourceGroups.find((g) => g.id === id)
    if (!group) {
      throw new Error('Resource group not found')
    }
    return group
  },

  // Create new resource group
  async createResourceGroup(data: ResourceGroupFormData) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newGroup: ResourceGroup = {
      id: `GRP${String(mockResourceGroups.length + 1).padStart(3, '0')}`,
      ...data,
      parentGroupName: data.parentGroupId ? 'Parent Group' : undefined,
      departmentName: 'Department',
      costCenterName: 'Cost Center',
      totalResources: 0,
      availableResources: 0,
      totalCapacity: 0,
      usedCapacity: 0,
      efficiency: 100,
      resources: [],
      isActive: true,
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockResourceGroups.push(newGroup)
    return newGroup
  },

  // Update resource group
  async updateResourceGroup(id: string, data: Partial<ResourceGroupFormData>) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockResourceGroups.findIndex((g) => g.id === id)
    if (index === -1) {
      throw new Error('Resource group not found')
    }
    mockResourceGroups[index] = {
      ...mockResourceGroups[index],
      ...data,
      updatedBy: 'current-user',
      updatedAt: new Date().toISOString(),
    }
    return mockResourceGroups[index]
  },

  // Delete resource group
  async deleteResourceGroup(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockResourceGroups.findIndex((g) => g.id === id)
    if (index === -1) {
      throw new Error('Resource group not found')
    }
    mockResourceGroups.splice(index, 1)
    return { success: true }
  },

  // Get resource group statistics
  async getResourceGroupStats(): Promise<ResourceGroupStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const stats: ResourceGroupStats = {
      totalGroups: mockResourceGroups.length,
      activeGroups: mockResourceGroups.filter((g) => g.status === 'active').length,
      totalResources: mockResourceGroups.reduce((sum, g) => sum + g.totalResources, 0),
      availableResources: mockResourceGroups.reduce((sum, g) => sum + g.availableResources, 0),
      totalCapacity: mockResourceGroups.reduce((sum, g) => sum + g.totalCapacity, 0),
      usedCapacity: mockResourceGroups.reduce((sum, g) => sum + g.usedCapacity, 0),
      averageEfficiency:
        mockResourceGroups.reduce((sum, g) => sum + g.efficiency, 0) / mockResourceGroups.length,
      groupsByType: mockResourceGroups.reduce(
        (acc, g) => {
          acc[g.type] = (acc[g.type] || 0) + 1
          return acc
        },
        {} as Record<GroupType, number>,
      ),
    }

    return stats
  },

  // Add resource to group
  async addResourceToGroup(groupId: string, resourceId: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const group = mockResourceGroups.find((g) => g.id === groupId)
    if (!group) {
      throw new Error('Resource group not found')
    }
    // Simulate adding resource
    group.totalResources++
    group.availableResources++
    return { success: true, group }
  },

  // Remove resource from group
  async removeResourceFromGroup(groupId: string, resourceId: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const group = mockResourceGroups.find((g) => g.id === groupId)
    if (!group) {
      throw new Error('Resource group not found')
    }
    // Simulate removing resource
    if (group.totalResources > 0) {
      group.totalResources--
      group.availableResources = Math.max(0, group.availableResources - 1)
    }
    return { success: true, group }
  },
}