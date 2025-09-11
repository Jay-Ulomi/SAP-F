// Resource Costs API

import type { ResourceCost, ResourceCostStats } from '../types'

const mockCosts: ResourceCost[] = [
  {
    id: 'COST001',
    resourceId: 'RES001',
    resourceCode: 'RES001',
    resourceName: 'CNC Machine 1',
    costType: 'standard',
    costPeriod: 'hourly',
    standardRate: 150,
    overtimeRate: 225,
    actualRate: 156,
    variance: 6,
    variancePercent: 4,
    effectiveFrom: '2024-01-01',
    currency: 'USD',
    isActive: true,
    costBreakdown: {
      labor: 75,
      materials: 25,
      overhead: 40,
      other: 10,
    },
    createdBy: 'admin',
    createdAt: '2024-01-01T08:00:00Z',
  },
  {
    id: 'COST002',
    resourceId: 'RES002',
    resourceCode: 'RES002',
    resourceName: 'Assembly Line A',
    costType: 'actual',
    costPeriod: 'hourly',
    standardRate: 120,
    overtimeRate: 180,
    actualRate: 125,
    variance: 5,
    variancePercent: 4.2,
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31',
    currency: 'USD',
    isActive: true,
    costBreakdown: {
      labor: 60,
      materials: 30,
      overhead: 25,
      other: 5,
    },
    createdBy: 'supervisor',
    createdAt: '2024-01-05T10:00:00Z',
    lastUpdated: '2024-01-15T14:30:00Z',
    lastUpdatedBy: 'supervisor',
  },
  {
    id: 'COST003',
    resourceId: 'RES003',
    resourceCode: 'RES003',
    resourceName: 'Quality Station',
    costType: 'planned',
    costPeriod: 'daily',
    standardRate: 800,
    overtimeRate: 1200,
    variance: -20,
    variancePercent: -2.5,
    effectiveFrom: '2024-02-01',
    currency: 'USD',
    isActive: true,
    costBreakdown: {
      labor: 400,
      materials: 150,
      overhead: 200,
      other: 50,
    },
    createdBy: 'quality_manager',
    createdAt: '2024-01-20T09:15:00Z',
  },
]

export const costsAPI = {
  async getCosts() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      items: mockCosts,
      total: mockCosts.length,
    }
  },

  async getCostStats(): Promise<ResourceCostStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      totalCostPerHour: 2350,
      averageCostPerHour: 156,
      costVariance: 122,
      costVariancePercent: 5.2,
      activeCostRates: 15,
      costsByType: { 
        standard: 1, 
        actual: 1, 
        planned: 1, 
        budgeted: 0 
      },
    }
  },
}