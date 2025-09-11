// Resource Capacities API

import type {
  ResourceCapacity,
  ResourceCapacityFormData,
  CapacitySearchParams,
  ResourceCapacityStats,
} from '../types'

// Mock data
const mockCapacities: ResourceCapacity[] = [
  {
    id: 'CAP001',
    resourceId: 'RES001',
    resourceCode: 'RES001',
    resourceName: 'CNC Machine 1',
    resourceType: 'machine',
    periodStart: '2024-01-01',
    periodEnd: '2024-01-31',
    capacityType: 'monthly',
    totalCapacity: 720,
    availableCapacity: 540,
    allocatedCapacity: 180,
    utilizationRate: 75,
    capacityUnit: 'hours',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    workingHoursPerDay: 8,
    efficiency: 92,
    overCapacityAllowed: true,
    maxOverCapacity: 10,
    priority: 1,
    status: 'active',
    lastCalculated: '2024-01-01T08:00:00Z',
    createdBy: 'admin',
    createdAt: '2024-01-01T08:00:00Z',
  },
  {
    id: 'CAP002',
    resourceId: 'RES002',
    resourceCode: 'RES002',
    resourceName: 'Assembly Line A',
    resourceType: 'line',
    periodStart: '2024-02-01',
    periodEnd: '2024-02-29',
    capacityType: 'monthly',
    totalCapacity: 640,
    availableCapacity: 450,
    allocatedCapacity: 190,
    utilizationRate: 82,
    capacityUnit: 'hours',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    workingHoursPerDay: 8,
    shiftPattern: '2 Shifts',
    efficiency: 88,
    overCapacityAllowed: false,
    priority: 2,
    status: 'active',
    lastCalculated: '2024-02-01T06:00:00Z',
    createdBy: 'supervisor',
    createdAt: '2024-01-25T14:30:00Z',
  },
  {
    id: 'CAP003',
    resourceId: 'RES003',
    resourceCode: 'RES003',
    resourceName: 'Quality Station',
    resourceType: 'station',
    periodStart: '2024-01-15',
    periodEnd: '2024-04-15',
    capacityType: 'weekly',
    totalCapacity: 200,
    availableCapacity: 160,
    allocatedCapacity: 40,
    utilizationRate: 68,
    capacityUnit: 'hours',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    workingHoursPerDay: 6,
    efficiency: 95,
    overCapacityAllowed: true,
    maxOverCapacity: 15,
    priority: 1,
    status: 'active',
    notes: 'Quality control capacity planning for Q1',
    restrictions: ['Certified operators only', 'Limited access during shifts'],
    lastCalculated: '2024-01-15T12:00:00Z',
    createdBy: 'quality_manager',
    createdAt: '2024-01-10T11:00:00Z',
  },
]

export const capacitiesAPI = {
  async getCapacities(params?: CapacitySearchParams) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      items: mockCapacities,
      total: mockCapacities.length,
      page: params?.page || 1,
      totalPages: 1,
    }
  },

  async getCapacityStats(): Promise<ResourceCapacityStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      totalCapacities: mockCapacities.length,
      totalCapacityHours: 2840,
      totalAllocatedHours: 2130,
      totalAvailableHours: 710,
      averageUtilization: 75,
      overAllocatedCapacities: 0,
      underUtilizedCapacities: 2,
      capacitiesByType: { 
        daily: 0, 
        weekly: 1, 
        monthly: 2, 
        yearly: 0 
      },
      capacitiesByStatus: { 
        draft: 0, 
        active: 3, 
        paused: 0, 
        completed: 0, 
        cancelled: 0 
      },
    }
  },

  async createCapacity(data: ResourceCapacityFormData) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newCapacity: ResourceCapacity = {
      id: `CAP${String(mockCapacities.length + 1).padStart(3, '0')}`,
      ...data,
      resourceCode: 'RES001',
      resourceName: 'Resource',
      resourceType: 'machine',
      allocatedCapacity: 0,
      utilizationRate: 0,
      lastCalculated: new Date().toISOString(),
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    mockCapacities.push(newCapacity)
    return newCapacity
  },
}