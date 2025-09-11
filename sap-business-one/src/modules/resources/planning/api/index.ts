// Resource Planning API

import type { ResourcePlan, PlanningStats } from '../types'

const mockPlans: ResourcePlan[] = [
  {
    id: 'PLAN001',
    resourceId: 'RES001',
    resourceCode: 'RES001',
    resourceName: 'CNC Machine 1',
    planType: 'production',
    planningHorizon: 'medium',
    planningUnit: 'hours',
    planStart: '2024-01-01',
    planEnd: '2024-03-31',
    targetCapacity: 2000,
    targetUtilization: 85,
    targetEfficiency: 95,
    bufferCapacity: 10,
    constraints: 'Limited to single shift operations during maintenance periods',
    requirements: 'Requires certified operators for high-precision work',
    allowOvercapacity: true,
    autoAdjust: true,
    considerSeasonality: false,
    priority: 1,
    status: 'active',
    notes: 'Q1 production plan for high-precision components',
    actualCapacity: 1850,
    actualUtilization: 78,
    actualEfficiency: 92,
    progress: 65,
    createdBy: 'admin',
    createdAt: '2024-01-01T08:00:00Z',
    lastCalculated: '2024-01-15T10:30:00Z',
  },
  {
    id: 'PLAN002',
    resourceId: 'RES002',
    resourceCode: 'RES002',
    resourceName: 'Assembly Line A',
    planType: 'capacity',
    planningHorizon: 'short',
    planningUnit: 'hours',
    planStart: '2024-02-01',
    planEnd: '2024-02-29',
    targetCapacity: 1600,
    targetUtilization: 90,
    targetEfficiency: 88,
    bufferCapacity: 5,
    allowOvercapacity: false,
    autoAdjust: true,
    considerSeasonality: true,
    priority: 2,
    status: 'approved',
    notes: 'February capacity planning for assembly operations',
    actualCapacity: 1580,
    actualUtilization: 89,
    actualEfficiency: 87,
    progress: 45,
    createdBy: 'supervisor',
    createdAt: '2024-01-20T14:00:00Z',
    lastCalculated: '2024-02-01T08:00:00Z',
  },
  {
    id: 'PLAN003',
    resourceId: 'RES003',
    resourceCode: 'RES003',
    resourceName: 'Quality Station',
    planType: 'maintenance',
    planningHorizon: 'long',
    planningUnit: 'days',
    planStart: '2024-03-01',
    planEnd: '2024-12-31',
    targetCapacity: 300,
    targetUtilization: 70,
    targetEfficiency: 95,
    bufferCapacity: 15,
    constraints: 'Scheduled maintenance every 3 months',
    requirements: 'Quality certification required for all operations',
    allowOvercapacity: false,
    autoAdjust: false,
    considerSeasonality: false,
    priority: 3,
    status: 'draft',
    notes: 'Annual maintenance and quality assurance planning',
    createdBy: 'quality_manager',
    createdAt: '2024-01-25T11:15:00Z',
  },
]

export const planningAPI = {
  async getPlans() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      items: mockPlans,
      total: mockPlans.length,
    }
  },

  async getPlanningStats(): Promise<PlanningStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      activePlans: 12,
      scheduledTasks: 148,
      optimization: 92,
      conflicts: 3,
    }
  },
}