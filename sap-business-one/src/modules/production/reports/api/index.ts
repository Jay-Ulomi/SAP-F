import type { 
  ProductionReport, 
  ReportTemplate, 
  ReportSchedule,
  ReportSearchParams,
  ProductionOverview,
  EfficiencyAnalysis,
  CostAnalysis,
  QualityReport,
  ResourceUtilization,
  MaterialConsumption
} from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

// Mock report data
const mockProductionOverview: ProductionOverview = {
  totalOrders: 156,
  completedOrders: 128,
  inProgressOrders: 23,
  delayedOrders: 5,
  totalValue: 2450000,
  averageLeadTime: 4.2,
  onTimeDeliveryRate: 94.5,
  capacityUtilization: 87.3,
  ordersByStatus: {
    'Completed': 128,
    'In Progress': 23,
    'Delayed': 5
  },
  ordersByType: {
    'Standard': 98,
    'Rush': 34,
    'Custom': 24
  },
  dailyProduction: [
    { date: '2024-03-10', orders: 12, value: 185000, quantity: 245 },
    { date: '2024-03-11', orders: 15, value: 220000, quantity: 298 },
    { date: '2024-03-12', orders: 18, value: 275000, quantity: 332 },
    { date: '2024-03-13', orders: 14, value: 195000, quantity: 267 },
    { date: '2024-03-14', orders: 16, value: 240000, quantity: 301 },
    { date: '2024-03-15', orders: 20, value: 310000, quantity: 385 },
    { date: '2024-03-16', orders: 17, value: 265000, quantity: 343 }
  ]
}

const mockEfficiencyAnalysis: EfficiencyAnalysis = {
  overallEfficiency: 82.5,
  resourceEfficiency: {
    'Machine 1': 85.2,
    'Machine 2': 78.9,
    'Machine 3': 88.1,
    'Assembly Line 1': 79.5,
    'Assembly Line 2': 84.7
  },
  machineUptime: 94.2,
  setupTime: 45,
  runTime: 420,
  idleTime: 35,
  cycleTime: 12.5,
  throughput: 48.2,
  oeeScore: 78.9,
  efficiencyTrends: [
    { date: '2024-03-10', efficiency: 80.1, uptime: 92.5, quality: 96.2 },
    { date: '2024-03-11', efficiency: 82.3, uptime: 94.1, quality: 95.8 },
    { date: '2024-03-12', efficiency: 85.7, uptime: 95.3, quality: 97.1 },
    { date: '2024-03-13', efficiency: 78.9, uptime: 91.8, quality: 94.5 },
    { date: '2024-03-14', efficiency: 83.4, uptime: 93.7, quality: 96.8 },
    { date: '2024-03-15', efficiency: 87.2, uptime: 96.1, quality: 98.2 },
    { date: '2024-03-16', efficiency: 84.6, uptime: 94.8, quality: 97.5 }
  ]
}

const mockCostAnalysis: CostAnalysis = {
  totalCost: 1850000,
  materialCost: 1110000,
  laborCost: 555000,
  overheadCost: 185000,
  costPerUnit: 45.75,
  costVariance: -2.3,
  budgetVariance: 3.8,
  costByCategory: {
    'Raw Materials': 850000,
    'Components': 260000,
    'Direct Labor': 400000,
    'Indirect Labor': 155000,
    'Utilities': 95000,
    'Maintenance': 90000
  },
  costTrends: [
    { date: '2024-03-10', actual: 265000, budget: 270000, variance: -5000 },
    { date: '2024-03-11', actual: 278000, budget: 275000, variance: 3000 },
    { date: '2024-03-12', actual: 295000, budget: 290000, variance: 5000 },
    { date: '2024-03-13', actual: 252000, budget: 260000, variance: -8000 },
    { date: '2024-03-14', actual: 268000, budget: 265000, variance: 3000 },
    { date: '2024-03-15', actual: 315000, budget: 310000, variance: 5000 },
    { date: '2024-03-16', actual: 287000, budget: 285000, variance: 2000 }
  ]
}

const mockQualityReport: QualityReport = {
  qualityScore: 96.8,
  defectRate: 2.1,
  reworkRate: 1.3,
  scrapRate: 0.8,
  yieldRate: 97.9,
  customerComplaints: 3,
  qualityTrends: [
    { date: '2024-03-10', score: 95.2, defects: 8, rework: 5 },
    { date: '2024-03-11', score: 96.1, defects: 6, rework: 4 },
    { date: '2024-03-12', score: 97.8, defects: 4, rework: 2 },
    { date: '2024-03-13', score: 94.9, defects: 9, rework: 6 },
    { date: '2024-03-14', score: 96.7, defects: 5, rework: 3 },
    { date: '2024-03-15', score: 98.1, defects: 3, rework: 1 },
    { date: '2024-03-16', score: 97.4, defects: 4, rework: 2 }
  ],
  defectsByCategory: {
    'Dimensional': 12,
    'Surface Finish': 8,
    'Assembly': 6,
    'Electrical': 4,
    'Other': 3
  },
  qualityByProduct: [
    { product: 'Gaming Laptop Pro 15"', score: 98.2, defectRate: 1.8 },
    { product: 'Business Tablet 10"', score: 96.5, defectRate: 3.5 },
    { product: 'Workstation Desktop', score: 95.8, defectRate: 4.2 }
  ]
}

const mockResourceUtilization: ResourceUtilization = {
  totalResources: 25,
  activeResources: 23,
  utilizationRate: 87.3,
  resourcesByType: {
    'Machines': 12,
    'Assembly Lines': 6,
    'Quality Stations': 4,
    'Packaging Lines': 3
  },
  utilizationByResource: [
    { resource: 'CNC Machine 1', type: 'Machine', utilization: 92.5, capacity: 480, efficiency: 88.2 },
    { resource: 'CNC Machine 2', type: 'Machine', utilization: 87.3, capacity: 480, efficiency: 85.6 },
    { resource: 'Assembly Line A', type: 'Assembly', utilization: 94.1, capacity: 600, efficiency: 91.3 },
    { resource: 'Assembly Line B', type: 'Assembly', utilization: 89.7, capacity: 600, efficiency: 87.9 },
    { resource: 'Quality Station 1', type: 'Quality', utilization: 76.4, capacity: 200, efficiency: 94.2 },
    { resource: 'Packaging Line 1', type: 'Packaging', utilization: 82.8, capacity: 800, efficiency: 89.5 }
  ],
  capacityPlanning: [
    { date: '2024-03-10', capacity: 12000, demand: 9800, utilization: 81.7 },
    { date: '2024-03-11', capacity: 12000, demand: 10500, utilization: 87.5 },
    { date: '2024-03-12', capacity: 12000, demand: 11200, utilization: 93.3 },
    { date: '2024-03-13', capacity: 12000, demand: 9600, utilization: 80.0 },
    { date: '2024-03-14', capacity: 12000, demand: 10800, utilization: 90.0 },
    { date: '2024-03-15', capacity: 12000, demand: 11800, utilization: 98.3 },
    { date: '2024-03-16', capacity: 12000, demand: 10900, utilization: 90.8 }
  ]
}

const mockMaterialConsumption: MaterialConsumption = {
  totalConsumption: 45000,
  consumptionByMaterial: [
    { material: 'Steel Sheets', planned: 12000, actual: 12350, variance: 350, cost: 247000 },
    { material: 'Aluminum Profiles', planned: 8500, actual: 8200, variance: -300, cost: 164000 },
    { material: 'Electronic Components', planned: 15000, actual: 14800, variance: -200, cost: 592000 },
    { material: 'Plastic Housings', planned: 6000, actual: 6150, variance: 150, cost: 123000 },
    { material: 'Fasteners', planned: 25000, actual: 24900, variance: -100, cost: 49800 }
  ],
  consumptionTrends: [
    { date: '2024-03-10', planned: 6200, actual: 6350, variance: 150 },
    { date: '2024-03-11', planned: 6800, actual: 6650, variance: -150 },
    { date: '2024-03-12', planned: 7200, actual: 7400, variance: 200 },
    { date: '2024-03-13', planned: 5900, actual: 5850, variance: -50 },
    { date: '2024-03-14', planned: 6500, actual: 6720, variance: 220 },
    { date: '2024-03-15', planned: 7800, actual: 7950, variance: 150 },
    { date: '2024-03-16', planned: 7100, actual: 7080, variance: -20 }
  ],
  wasteAnalysis: [
    { material: 'Steel Sheets', waste: 240, wasteRate: 1.9, cost: 4800 },
    { material: 'Aluminum Profiles', waste: 165, wasteRate: 2.0, cost: 3300 },
    { material: 'Plastic Housings', waste: 95, wasteRate: 1.5, cost: 1900 },
    { material: 'Electronic Components', waste: 45, wasteRate: 0.3, cost: 1800 },
    { material: 'Fasteners', waste: 125, wasteRate: 0.5, cost: 250 }
  ]
}

// Mock reports
const mockReports: ProductionReport[] = [
  {
    id: 'report-001',
    name: 'Weekly Production Overview',
    type: ReportType.PRODUCTION_OVERVIEW,
    period: ReportPeriod.THIS_WEEK,
    dateFrom: '2024-03-10T00:00:00Z',
    dateTo: '2024-03-16T23:59:59Z',
    data: mockProductionOverview,
    generatedAt: '2024-03-16T18:00:00Z',
    generatedBy: 'John Smith'
  },
  {
    id: 'report-002',
    name: 'Monthly Efficiency Analysis',
    type: ReportType.EFFICIENCY_ANALYSIS,
    period: ReportPeriod.THIS_MONTH,
    dateFrom: '2024-03-01T00:00:00Z',
    dateTo: '2024-03-31T23:59:59Z',
    data: mockEfficiencyAnalysis,
    generatedAt: '2024-03-15T14:30:00Z',
    generatedBy: 'Jane Doe'
  },
  {
    id: 'report-003',
    name: 'Cost Analysis Report',
    type: ReportType.COST_ANALYSIS,
    period: ReportPeriod.THIS_MONTH,
    dateFrom: '2024-03-01T00:00:00Z',
    dateTo: '2024-03-31T23:59:59Z',
    data: mockCostAnalysis,
    generatedAt: '2024-03-14T16:45:00Z',
    generatedBy: 'Mike Johnson'
  }
]

// Mock templates
const mockTemplates: ReportTemplate[] = [
  {
    id: 'template-001',
    name: 'Daily Production Summary',
    type: ReportType.PRODUCTION_OVERVIEW,
    description: 'Daily overview of production activities and metrics',
    parameters: [
      { name: 'date', type: 'date', label: 'Report Date', required: true },
      { name: 'department', type: 'select', label: 'Department', required: false, options: ['All', 'Assembly', 'Machining', 'Quality'] }
    ],
    isActive: true,
    createdBy: 'System Admin',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'template-002',
    name: 'Weekly Efficiency Report',
    type: ReportType.EFFICIENCY_ANALYSIS,
    description: 'Weekly analysis of production efficiency and OEE',
    parameters: [
      { name: 'weekOf', type: 'date', label: 'Week Starting', required: true },
      { name: 'resources', type: 'multiselect', label: 'Resources', required: false, options: ['Machine 1', 'Machine 2', 'Assembly Line A'] }
    ],
    isActive: true,
    createdBy: 'System Admin',
    createdAt: '2024-01-15T00:00:00Z'
  }
]

// Mock schedules
const mockSchedules: ReportSchedule[] = [
  {
    id: 'schedule-001',
    name: 'Daily Production Report',
    reportType: ReportType.PRODUCTION_OVERVIEW,
    period: ReportPeriod.TODAY,
    schedule: '0 8 * * *', // Daily at 8 AM
    recipients: ['manager@company.com', 'supervisor@company.com'],
    format: ReportFormat.PDF,
    parameters: { department: 'All' },
    isActive: true,
    lastRun: '2024-03-16T08:00:00Z',
    nextRun: '2024-03-17T08:00:00Z',
    createdBy: 'System Admin',
    createdAt: '2024-01-15T00:00:00Z'
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const productionReportsAPI = {
  // Get all reports with optional search params
  async getReports(params?: ReportSearchParams) {
    await delay(800)
    
    let filtered = [...mockReports]
    
    // Apply filters
    if (params?.filters) {
      const { filters } = params
      
      if (filters.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(report => 
          report.name.toLowerCase().includes(search) ||
          report.type.toLowerCase().includes(search)
        )
      }
      
      if (filters.type) {
        filtered = filtered.filter(report => report.type === filters.type)
      }
      
      if (filters.period) {
        filtered = filtered.filter(report => report.period === filters.period)
      }
      
      if (filters.generatedBy) {
        filtered = filtered.filter(report => report.generatedBy === filters.generatedBy)
      }
      
      if (filters.dateFrom) {
        filtered = filtered.filter(report => 
          new Date(report.dateFrom) >= new Date(filters.dateFrom!)
        )
      }
      
      if (filters.dateTo) {
        filtered = filtered.filter(report => 
          new Date(report.dateTo) <= new Date(filters.dateTo!)
        )
      }
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filtered.sort((a, b) => {
        const aVal = (a as any)[params.sortBy!]
        const bVal = (b as any)[params.sortBy!]
        
        if (params.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1
        }
        return aVal > bVal ? 1 : -1
      })
    }
    
    // Apply pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      items: filtered.slice(startIndex, endIndex),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  },

  // Get single report by ID
  async getReport(id: string): Promise<ProductionReport> {
    await delay(500)
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    return report
  },

  // Generate new report
  async generateReport(type: ReportType, period: ReportPeriod, dateFrom: string, dateTo: string, filters?: Record<string, any>): Promise<ProductionReport> {
    await delay(2000)
    
    let data: any
    switch (type) {
      case ReportType.PRODUCTION_OVERVIEW:
        data = mockProductionOverview
        break
      case ReportType.EFFICIENCY_ANALYSIS:
        data = mockEfficiencyAnalysis
        break
      case ReportType.COST_ANALYSIS:
        data = mockCostAnalysis
        break
      case ReportType.QUALITY_REPORT:
        data = mockQualityReport
        break
      case ReportType.RESOURCE_UTILIZATION:
        data = mockResourceUtilization
        break
      case ReportType.MATERIAL_CONSUMPTION:
        data = mockMaterialConsumption
        break
      default:
        data = mockProductionOverview
    }
    
    const newReport: ProductionReport = {
      id: `report-${Date.now()}`,
      name: `${type.replace('_', ' ')} Report`,
      type,
      period,
      dateFrom,
      dateTo,
      filters,
      data,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Current User'
    }
    
    mockReports.unshift(newReport)
    return newReport
  },

  // Export report
  async exportReport(id: string, format: ReportFormat): Promise<Blob> {
    await delay(1500)
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    // Mock export data
    const mockData = `Exported ${report.name} in ${format} format`
    return new Blob([mockData], { type: 'text/plain' })
  },

  // Delete report
  async deleteReport(id: string): Promise<void> {
    await delay(500)
    
    const index = mockReports.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Report not found')
    }
    
    mockReports.splice(index, 1)
  },

  // Get report templates
  async getTemplates(): Promise<ReportTemplate[]> {
    await delay(600)
    return [...mockTemplates]
  },

  // Get report schedules
  async getSchedules(): Promise<ReportSchedule[]> {
    await delay(600)
    return [...mockSchedules]
  },

  // Create report schedule
  async createSchedule(data: Omit<ReportSchedule, 'id' | 'createdAt' | 'createdBy'>): Promise<ReportSchedule> {
    await delay(800)
    
    const newSchedule: ReportSchedule = {
      ...data,
      id: `schedule-${Date.now()}`,
      createdBy: 'Current User',
      createdAt: new Date().toISOString()
    }
    
    mockSchedules.push(newSchedule)
    return newSchedule
  },

  // Delete schedule
  async deleteSchedule(id: string): Promise<void> {
    await delay(500)
    
    const index = mockSchedules.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Schedule not found')
    }
    
    mockSchedules.splice(index, 1)
  }
}