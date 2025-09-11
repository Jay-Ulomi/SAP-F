import type {
  ReportConfig,
  ReportData,
  ReportFormData,
  ReportListFilters,
  ReportStats,
  ReportPagination,
  OpportunityMetrics,
  LeadMetrics,
  PipelineMetrics,
  TeamMetrics,
  RevenueMetrics,
  ChartData,
  TableData,
  ReportSummary,
} from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

// Mock data
const mockReports: ReportConfig[] = [
  {
    id: 'R-1',
    name: 'Monthly Opportunity Performance',
    type: ReportType.OPPORTUNITY_PERFORMANCE,
    description: 'Comprehensive monthly opportunity analysis',
    period: ReportPeriod.MONTHLY,
    filters: {
      opportunityStatus: ['OPEN', 'QUALIFIED'],
      dateRange: {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
      },
    },
    metrics: ['totalOpportunities', 'totalValue', 'winRate', 'averageSalesCycle'],
    groupBy: ['status', 'assignedTo'],
    sortBy: 'totalValue',
    sortOrder: 'DESC',
    isScheduled: true,
    scheduleConfig: {
      frequency: 'MONTHLY',
      dayOfMonth: 1,
      time: '09:00',
      recipients: ['manager@company.com'],
      format: ReportFormat.PDF,
      isActive: true,
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin',
  },
  {
    id: 'R-2',
    name: 'Pipeline Bottleneck Analysis',
    type: ReportType.PIPELINE_ANALYSIS,
    description: 'Identify pipeline stages with longest delays',
    period: ReportPeriod.WEEKLY,
    filters: {
      pipelineId: ['P-1'],
    },
    metrics: ['stageMetrics', 'bottlenecks', 'progressionRates'],
    groupBy: ['stage'],
    sortBy: 'averageStageTime',
    sortOrder: 'DESC',
    isScheduled: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    createdBy: 'sales_manager',
  },
]

const generateMockOpportunityMetrics = (): OpportunityMetrics => ({
  totalOpportunities: 150,
  totalValue: 2500000,
  averageValue: 16667,
  wonOpportunities: 45,
  lostOpportunities: 25,
  winRate: 64.3,
  averageSalesCycle: 45,
  pipelineVelocity: 1.2,
  conversionRate: 30.0,
  forecastAccuracy: 87.5,
})

const generateMockLeadMetrics = (): LeadMetrics => ({
  totalLeads: 300,
  qualifiedLeads: 180,
  convertedLeads: 90,
  leadConversionRate: 50.0,
  averageQualificationTime: 7,
  leadsBySource: [
    { source: 'Website', count: 120, conversionRate: 55.0 },
    { source: 'Referral', count: 80, conversionRate: 62.5 },
    { source: 'Cold Call', count: 60, conversionRate: 35.0 },
    { source: 'Trade Show', count: 40, conversionRate: 70.0 },
  ],
  leadsByStatus: [
    { status: 'New', count: 60, percentage: 20.0 },
    { status: 'Contacted', count: 90, percentage: 30.0 },
    { status: 'Qualified', count: 120, percentage: 40.0 },
    { status: 'Converted', count: 30, percentage: 10.0 },
  ],
})

const generateMockPipelineMetrics = (): PipelineMetrics => ({
  stageMetrics: [
    {
      stageId: 'S-1',
      stageName: 'Lead Qualification',
      opportunityCount: 45,
      totalValue: 750000,
      averageValue: 16667,
      averageStageTime: 5,
      conversionRate: 78.0,
      dropOffRate: 22.0,
    },
    {
      stageId: 'S-2',
      stageName: 'Discovery',
      opportunityCount: 35,
      totalValue: 650000,
      averageValue: 18571,
      averageStageTime: 8,
      conversionRate: 71.0,
      dropOffRate: 29.0,
    },
    {
      stageId: 'S-3',
      stageName: 'Proposal',
      opportunityCount: 25,
      totalValue: 500000,
      averageValue: 20000,
      averageStageTime: 12,
      conversionRate: 68.0,
      dropOffRate: 32.0,
    },
  ],
  bottlenecks: [
    {
      stageId: 'S-3',
      stageName: 'Proposal',
      avgTime: 12,
      reason: 'Approval process delays',
    },
  ],
  progressionRates: [
    { fromStage: 'S-1', toStage: 'S-2', rate: 78.0 },
    { fromStage: 'S-2', toStage: 'S-3', rate: 71.0 },
    { fromStage: 'S-3', toStage: 'S-4', rate: 68.0 },
  ],
})

const generateMockTeamMetrics = (): TeamMetrics => ({
  memberPerformance: [
    {
      userId: 'U-1',
      userName: 'John Smith',
      opportunitiesAssigned: 25,
      opportunitiesWon: 15,
      opportunitiesLost: 5,
      totalValue: 450000,
      winRate: 75.0,
      averageDealSize: 18000,
      activitiesCompleted: 120,
    },
    {
      userId: 'U-2',
      userName: 'Jane Doe',
      opportunitiesAssigned: 30,
      opportunitiesWon: 18,
      opportunitiesLost: 7,
      totalValue: 540000,
      winRate: 72.0,
      averageDealSize: 18000,
      activitiesCompleted: 145,
    },
  ],
  teamTotals: {
    totalOpportunities: 150,
    totalValue: 2500000,
    teamWinRate: 64.3,
    averageDealSize: 16667,
  },
})

const generateMockRevenueMetrics = (): RevenueMetrics => ({
  actualRevenue: 1800000,
  forecastRevenue: 2100000,
  committedRevenue: 1500000,
  bestCaseRevenue: 2400000,
  worstCaseRevenue: 1200000,
  revenueByPeriod: [
    { period: 'Q1', actual: 450000, forecast: 500000, variance: -50000, variancePercentage: -10.0 },
    { period: 'Q2', actual: 520000, forecast: 525000, variance: -5000, variancePercentage: -0.95 },
    { period: 'Q3', actual: 480000, forecast: 475000, variance: 5000, variancePercentage: 1.05 },
    {
      period: 'Q4',
      actual: 350000,
      forecast: 600000,
      variance: -250000,
      variancePercentage: -41.67,
    },
  ],
  revenueBySource: [
    { source: 'Website', amount: 720000, percentage: 40.0 },
    { source: 'Referral', amount: 540000, percentage: 30.0 },
    { source: 'Cold Call', amount: 360000, percentage: 20.0 },
    { source: 'Trade Show', amount: 180000, percentage: 10.0 },
  ],
  revenueByStage: [
    { stage: 'Qualified', amount: 750000, probability: 25.0 },
    { stage: 'Proposal', amount: 600000, probability: 50.0 },
    { stage: 'Negotiation', amount: 450000, probability: 75.0 },
  ],
})

const generateMockCharts = (type: ReportType): ChartData[] => {
  const charts: ChartData[] = []

  if (type === ReportType.OPPORTUNITY_PERFORMANCE) {
    charts.push({
      id: 'chart-1',
      title: 'Opportunities by Status',
      type: 'PIE',
      data: {
        labels: ['Open', 'Qualified', 'Won', 'Lost'],
        datasets: [
          {
            label: 'Opportunities',
            data: [50, 35, 45, 20],
            backgroundColor: ['#3B82F6', '#10B981', '#059669', '#EF4444'],
          },
        ],
      },
    })

    charts.push({
      id: 'chart-2',
      title: 'Revenue Trend',
      type: 'LINE',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Actual Revenue',
            data: [300000, 320000, 280000, 350000, 380000, 400000],
            borderColor: '#059669',
            fill: false,
          },
          {
            label: 'Forecast Revenue',
            data: [310000, 315000, 290000, 340000, 375000, 390000],
            borderColor: '#3B82F6',
            fill: false,
          },
        ],
      },
    })
  }

  return charts
}

const generateMockTables = (type: ReportType): TableData[] => {
  const tables: TableData[] = []

  if (type === ReportType.TEAM_PERFORMANCE) {
    tables.push({
      id: 'table-1',
      title: 'Team Performance Summary',
      headers: [
        { key: 'userName', label: 'Sales Rep', type: 'text' },
        { key: 'opportunitiesAssigned', label: 'Assigned', type: 'number' },
        { key: 'opportunitiesWon', label: 'Won', type: 'number' },
        { key: 'winRate', label: 'Win Rate', type: 'percentage' },
        { key: 'totalValue', label: 'Total Value', type: 'currency' },
      ],
      rows: [
        {
          userName: 'John Smith',
          opportunitiesAssigned: 25,
          opportunitiesWon: 15,
          winRate: 75.0,
          totalValue: 450000,
        },
        {
          userName: 'Jane Doe',
          opportunitiesAssigned: 30,
          opportunitiesWon: 18,
          winRate: 72.0,
          totalValue: 540000,
        },
      ],
      totals: {
        userName: 'Total',
        opportunitiesAssigned: 55,
        opportunitiesWon: 33,
        winRate: 73.5,
        totalValue: 990000,
      },
    })
  }

  return tables
}

const generateMockSummary = (): ReportSummary => ({
  keyInsights: [
    'Win rate increased by 5% compared to last month',
    'Pipeline velocity improved by 20% in Q3',
    'Lead conversion rate from website traffic is highest at 55%',
  ],
  recommendations: [
    'Focus on reducing time in Proposal stage',
    'Increase investment in referral programs',
    'Provide additional training for cold calling techniques',
  ],
  trends: [
    {
      metric: 'Win Rate',
      trend: 'UP',
      changePercentage: 5.2,
      description: 'Consistent improvement over last 3 months',
    },
    {
      metric: 'Average Deal Size',
      trend: 'DOWN',
      changePercentage: -3.1,
      description: 'Slight decline in average opportunity value',
    },
  ],
  alerts: [
    {
      type: 'WARNING',
      message: 'Pipeline conversion rate below target',
      metric: 'Conversion Rate',
      value: 30.0,
      threshold: 35.0,
    },
  ],
})

export const reportsApi = {
  async getReports(
    page: number = 1,
    limit: number = 10,
    filters?: ReportListFilters,
  ): Promise<{ reports: ReportConfig[]; pagination: ReportPagination }> {
    await new Promise((r) => setTimeout(r, 200))

    let reports = [...mockReports]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const s = filters.search.toLowerCase()
        reports = reports.filter(
          (r) => r.name.toLowerCase().includes(s) || r.description?.toLowerCase().includes(s),
        )
      }
      if (filters.type) reports = reports.filter((r) => r.type === filters.type)
      if (filters.period) reports = reports.filter((r) => r.period === filters.period)
      if (filters.createdBy) reports = reports.filter((r) => r.createdBy === filters.createdBy)
      if (filters.isScheduled !== undefined)
        reports = reports.filter((r) => r.isScheduled === filters.isScheduled)
      if (filters.dateFrom) reports = reports.filter((r) => r.createdAt >= filters.dateFrom!)
      if (filters.dateTo) reports = reports.filter((r) => r.createdAt <= filters.dateTo!)
    }

    const total = reports.length
    const totalPages = Math.ceil(total / limit) || 1
    const start = (page - 1) * limit
    const slice = reports.slice(start, start + limit)

    return {
      reports: slice,
      pagination: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
    }
  },

  async getReportById(id: string): Promise<ReportConfig | null> {
    await new Promise((r) => setTimeout(r, 120))
    return mockReports.find((r) => r.id === id) || null
  },

  async createReport(data: ReportFormData): Promise<ReportConfig> {
    await new Promise((r) => setTimeout(r, 300))
    const report: ReportConfig = {
      id: `R-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current_user',
    }
    mockReports.unshift(report)
    return report
  },

  async updateReport(id: string, data: Partial<ReportFormData>): Promise<ReportConfig | null> {
    await new Promise((r) => setTimeout(r, 200))
    const idx = mockReports.findIndex((r) => r.id === id)
    if (idx === -1) return null
    const updated: ReportConfig = { ...mockReports[idx], ...data, updatedAt: new Date() }
    mockReports[idx] = updated
    return updated
  },

  async deleteReport(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 120))
    const idx = mockReports.findIndex((r) => r.id === id)
    if (idx === -1) return false
    mockReports.splice(idx, 1)
    return true
  },

  async generateReport(configId: string): Promise<ReportData> {
    await new Promise((r) => setTimeout(r, 1000)) // Simulate generation time

    const config = mockReports.find((r) => r.id === configId)
    if (!config) throw new Error('Report configuration not found')

    const reportData: ReportData = {
      id: `RD-${Date.now()}`,
      configId: config.id,
      name: config.name,
      type: config.type,
      generatedAt: new Date(),
      period: {
        startDate: config.customDateRange?.startDate || new Date('2024-01-01'),
        endDate: config.customDateRange?.endDate || new Date('2024-01-31'),
      },
      metrics: {
        opportunities: generateMockOpportunityMetrics(),
        leads: generateMockLeadMetrics(),
        pipeline: generateMockPipelineMetrics(),
        team: generateMockTeamMetrics(),
        revenue: generateMockRevenueMetrics(),
      },
      charts: generateMockCharts(config.type),
      tables: generateMockTables(config.type),
      summary: generateMockSummary(),
    }

    return reportData
  },

  async getReportStats(): Promise<ReportStats> {
    await new Promise((r) => setTimeout(r, 120))
    return {
      totalReports: mockReports.length,
      scheduledReports: mockReports.filter((r) => r.isScheduled).length,
      reportsThisMonth: mockReports.filter((r) => r.createdAt.getMonth() === new Date().getMonth())
        .length,
      mostUsedType: ReportType.OPPORTUNITY_PERFORMANCE,
      averageGenerationTime: 2.5,
    }
  },

  async exportReport(reportId: string, format: ReportFormat): Promise<Blob> {
    await new Promise((r) => setTimeout(r, 500))

    // Mock export - in real implementation, this would generate actual file
    const mockData = `Mock ${format} export for report ${reportId}`
    return new Blob([mockData], {
      type: format === ReportFormat.PDF ? 'application/pdf' : 'application/octet-stream',
    })
  },

  validateReport(data: ReportFormData): string[] {
    const errors: string[] = []
    if (!data.name?.trim()) errors.push('Report name is required')
    if (!data.type) errors.push('Report type is required')
    if (!data.metrics?.length) errors.push('At least one metric is required')
    if (data.period === ReportPeriod.CUSTOM && !data.customDateRange)
      errors.push('Custom date range is required for custom period')
    return errors
  },
}
