import { ReportType, ReportFormat, ReportStatus, ReportFrequency, ReportCategory } from '../types'
import type {
  InventoryReport,
  ReportFormData,
  ReportListParams,
  ReportListResponse,
  ReportStats,
  ReportTemplate,
  ReportExecution,
} from '../types'

// Mock data
const mockReports: InventoryReport[] = [
  {
    id: '1',
    reportName: 'Monthly Inventory Summary',
    reportType: ReportType.INVENTORY_SUMMARY,
    category: ReportCategory.OPERATIONAL,
    description: 'Comprehensive inventory summary report for the month',
    status: ReportStatus.COMPLETED,
    format: ReportFormat.PDF,
    frequency: ReportFrequency.MONTHLY,
    parameters: [
      {
        id: '1-1',
        name: 'warehouse',
        label: 'Warehouse',
        type: 'select',
        required: false,
        options: [
          { value: 'WH001', label: 'Main Warehouse' },
          { value: 'WH002', label: 'Branch Warehouse' },
        ],
      },
      {
        id: '1-2',
        name: 'includeZeroStock',
        label: 'Include Zero Stock Items',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    filters: {
      warehouse: 'WH001',
      includeZeroStock: false,
    },
    dateRange: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
    },
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    generatedBy: 'EMP001',
    generatedByName: 'John Smith',
    generatedDate: new Date('2024-01-31T10:00:00Z'),
    filePath: '/reports/inventory_summary_202401.pdf',
    fileSize: 2048576,
    recordCount: 150,
    executionTime: 45,
    isPublic: true,
    isScheduled: true,
    recipients: ['manager@company.com', 'inventory@company.com'],
    createdBy: 'admin',
    createdDate: new Date('2024-01-01T08:00:00Z'),
    scheduledDate: new Date('2024-02-01T08:00:00Z'),
    lastRunDate: new Date('2024-01-31T10:00:00Z'),
    nextRunDate: new Date('2024-02-29T08:00:00Z'),
  },
  {
    id: '2',
    reportName: 'Stock Movement Analysis',
    reportType: ReportType.STOCK_MOVEMENT,
    category: ReportCategory.ANALYTICAL,
    description: 'Detailed analysis of stock movements and trends',
    status: ReportStatus.RUNNING,
    format: ReportFormat.EXCEL,
    frequency: ReportFrequency.WEEKLY,
    parameters: [
      {
        id: '2-1',
        name: 'movementType',
        label: 'Movement Type',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'receipt', label: 'Goods Receipt' },
          { value: 'issue', label: 'Goods Issue' },
          { value: 'transfer', label: 'Transfer' },
          { value: 'adjustment', label: 'Adjustment' },
        ],
      },
      {
        id: '2-2',
        name: 'itemGroup',
        label: 'Item Group',
        type: 'select',
        required: false,
        options: [
          { value: 'RAW', label: 'Raw Materials' },
          { value: 'FIN', label: 'Finished Goods' },
          { value: 'WIP', label: 'Work in Progress' },
        ],
      },
    ],
    filters: {
      movementType: ['receipt', 'issue'],
      itemGroup: 'RAW',
    },
    dateRange: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-07'),
    },
    generatedBy: 'EMP002',
    generatedByName: 'Mike Johnson',
    generatedDate: new Date('2024-02-07T09:30:00Z'),
    executionTime: 120,
    isPublic: false,
    isScheduled: false,
    recipients: ['analyst@company.com'],
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T09:00:00Z'),
  },
  {
    id: '3',
    reportName: 'Inventory Valuation Report',
    reportType: ReportType.VALUATION_REPORT,
    category: ReportCategory.FINANCIAL,
    description: 'Financial valuation of inventory assets',
    status: ReportStatus.COMPLETED,
    format: ReportFormat.PDF,
    frequency: ReportFrequency.MONTHLY,
    parameters: [
      {
        id: '3-1',
        name: 'valuationMethod',
        label: 'Valuation Method',
        type: 'select',
        required: true,
        options: [
          { value: 'fifo', label: 'FIFO' },
          { value: 'lifo', label: 'LIFO' },
          { value: 'weighted_average', label: 'Weighted Average' },
          { value: 'standard_cost', label: 'Standard Cost' },
        ],
      },
      {
        id: '3-2',
        name: 'includeVariance',
        label: 'Include Variance Analysis',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
    ],
    filters: {
      valuationMethod: 'weighted_average',
      includeVariance: true,
    },
    dateRange: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
    },
    generatedBy: 'EMP003',
    generatedByName: 'Sarah Wilson',
    generatedDate: new Date('2024-01-31T15:00:00Z'),
    filePath: '/reports/valuation_report_202401.pdf',
    fileSize: 1536000,
    recordCount: 200,
    executionTime: 90,
    isPublic: true,
    isScheduled: true,
    recipients: ['finance@company.com', 'audit@company.com'],
    createdBy: 'admin',
    createdDate: new Date('2024-01-01T08:00:00Z'),
    scheduledDate: new Date('2024-02-01T15:00:00Z'),
    lastRunDate: new Date('2024-01-31T15:00:00Z'),
    nextRunDate: new Date('2024-02-29T15:00:00Z'),
  },
  {
    id: '4',
    reportName: 'ABC Analysis Report',
    reportType: ReportType.ABC_ANALYSIS,
    category: ReportCategory.ANALYTICAL,
    description: 'ABC analysis for inventory optimization',
    status: ReportStatus.DRAFT,
    format: ReportFormat.EXCEL,
    frequency: ReportFrequency.QUARTERLY,
    parameters: [
      {
        id: '4-1',
        name: 'analysisPeriod',
        label: 'Analysis Period (months)',
        type: 'number',
        required: true,
        defaultValue: 12,
        validation: {
          min: 1,
          max: 24,
          message: 'Period must be between 1 and 24 months',
        },
      },
      {
        id: '4-2',
        name: 'categoryThresholds',
        label: 'Category Thresholds',
        type: 'text',
        required: false,
        defaultValue: 'A:80%, B:15%, C:5%',
      },
    ],
    filters: {
      analysisPeriod: 12,
      categoryThresholds: 'A:80%, B:15%, C:5%',
    },
    dateRange: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
    generatedBy: 'EMP004',
    generatedByName: 'Tom Brown',
    isPublic: false,
    isScheduled: false,
    recipients: ['analyst@company.com'],
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T11:00:00Z'),
  },
  {
    id: '5',
    reportName: 'Warehouse Utilization Report',
    reportType: ReportType.WAREHOUSE_UTILIZATION,
    category: ReportCategory.OPERATIONAL,
    description: 'Warehouse space utilization and efficiency metrics',
    status: ReportStatus.FAILED,
    format: ReportFormat.PDF,
    frequency: ReportFrequency.WEEKLY,
    parameters: [
      {
        id: '5-1',
        name: 'warehouse',
        label: 'Warehouse',
        type: 'select',
        required: true,
        options: [
          { value: 'WH001', label: 'Main Warehouse' },
          { value: 'WH002', label: 'Branch Warehouse' },
          { value: 'WH003', label: 'Production Warehouse' },
        ],
      },
      {
        id: '5-2',
        name: 'includeLocations',
        label: 'Include Location Details',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
    ],
    filters: {
      warehouse: 'WH001',
      includeLocations: true,
    },
    dateRange: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-07'),
    },
    generatedBy: 'EMP005',
    generatedByName: 'Lisa Davis',
    generatedDate: new Date('2024-02-07T14:00:00Z'),
    executionTime: 30,
    errorMessage: 'Database connection timeout',
    isPublic: false,
    isScheduled: true,
    recipients: ['warehouse@company.com'],
    createdBy: 'admin',
    createdDate: new Date('2024-02-01T08:00:00Z'),
    scheduledDate: new Date('2024-02-08T08:00:00Z'),
    lastRunDate: new Date('2024-02-07T14:00:00Z'),
    nextRunDate: new Date('2024-02-14T08:00:00Z'),
  },
]

// API functions
export const reportsApi = {
  // Get all reports with pagination and filters
  async getReports(params: ReportListParams = {}): Promise<ReportListResponse> {
    const { page = 1, limit = 10, sortBy = 'createdDate', sortOrder = 'desc', filters = {} } = params

    let filteredItems = [...mockReports]

    // Apply filters
    if (filters.reportType) {
      filteredItems = filteredItems.filter((item) => item.reportType === filters.reportType)
    }
    if (filters.category) {
      filteredItems = filteredItems.filter((item) => item.category === filters.category)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.format) {
      filteredItems = filteredItems.filter((item) => item.format === filters.format)
    }
    if (filters.frequency) {
      filteredItems = filteredItems.filter((item) => item.frequency === filters.frequency)
    }
    if (filters.generatedBy) {
      filteredItems = filteredItems.filter((item) => item.generatedBy === filters.generatedBy)
    }
    if (filters.dateFrom) {
      filteredItems = filteredItems.filter((item) => item.createdDate >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredItems = filteredItems.filter((item) => item.createdDate <= filters.dateTo!)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredItems = filteredItems.filter(
        (item) =>
          item.reportName.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.generatedByName.toLowerCase().includes(searchLower),
      )
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      const aValue = a[sortBy as keyof InventoryReport]
      const bValue = b[sortBy as keyof InventoryReport]

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
    const stats: ReportStats = {
      totalReports: mockReports.length,
      draftReports: mockReports.filter((item) => item.status === ReportStatus.DRAFT).length,
      scheduledReports: mockReports.filter((item) => item.status === ReportStatus.SCHEDULED).length,
      runningReports: mockReports.filter((item) => item.status === ReportStatus.RUNNING).length,
      completedReports: mockReports.filter((item) => item.status === ReportStatus.COMPLETED).length,
      failedReports: mockReports.filter((item) => item.status === ReportStatus.FAILED).length,
      cancelledReports: mockReports.filter((item) => item.status === ReportStatus.CANCELLED).length,
      totalGeneratedToday: mockReports.filter((item) => {
        const today = new Date()
        const reportDate = new Date(item.generatedDate || item.createdDate)
        return reportDate.toDateString() === today.toDateString()
      }).length,
      averageExecutionTime: mockReports.reduce((sum, item) => sum + (item.executionTime || 0), 0) / mockReports.length,
      lastGeneratedDate: mockReports[0]?.generatedDate,
      nextScheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
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

  // Get single report by ID
  async getReport(id: string): Promise<InventoryReport | null> {
    return mockReports.find((item) => item.id === id) || null
  },

  // Create new report
  async createReport(data: ReportFormData): Promise<InventoryReport> {
    const newId = (mockReports.length + 1).toString()

    const newReport: InventoryReport = {
      id: newId,
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : undefined,
      locationName: data.locationCode ? 'Location Name' : undefined,
      generatedByName: 'Employee Name', // Mock employee name
      status: ReportStatus.DRAFT,
      parameters: [], // Will be populated based on report type
      createdBy: 'admin',
      createdDate: new Date(),
    }

    mockReports.unshift(newReport)
    return newReport
  },

  // Update report
  async updateReport(id: string, data: Partial<ReportFormData>): Promise<InventoryReport> {
    const index = mockReports.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Report not found')
    }

    const updatedReport: InventoryReport = {
      ...mockReports[index],
      ...data,
      warehouseName: data.warehouseCode ? 'Main Warehouse' : mockReports[index].warehouseName,
      locationName: data.locationCode ? 'Location Name' : mockReports[index].locationName,
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }

    mockReports[index] = updatedReport
    return updatedReport
  },

  // Delete report
  async deleteReport(id: string): Promise<void> {
    const index = mockReports.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Report not found')
    }
    mockReports.splice(index, 1)
  },

  // Execute report
  async executeReport(id: string): Promise<ReportExecution> {
    const report = mockReports.find((item) => item.id === id)
    if (!report) {
      throw new Error('Report not found')
    }

    // Simulate report execution
    const execution: ReportExecution = {
      id: `exec-${Date.now()}`,
      reportId: id,
      reportName: report.reportName,
      status: ReportStatus.RUNNING,
      startTime: new Date(),
      generatedBy: 'admin',
      generatedByName: 'Admin User',
    }

    // Simulate async execution
    setTimeout(() => {
      const reportIndex = mockReports.findIndex((item) => item.id === id)
      if (reportIndex !== -1) {
        mockReports[reportIndex] = {
          ...mockReports[reportIndex],
          status: ReportStatus.COMPLETED,
          generatedDate: new Date(),
          filePath: `/reports/${report.reportName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.${report.format}`,
          fileSize: Math.floor(Math.random() * 5000000) + 1000000, // 1-5MB
          recordCount: Math.floor(Math.random() * 1000) + 100,
          executionTime: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
        }
      }
    }, 2000)

    return execution
  },

  // Get report templates
  async getReportTemplates(): Promise<ReportTemplate[]> {
    return [
      {
        id: '1',
        name: 'Standard Inventory Summary',
        description: 'Basic inventory summary template',
        reportType: ReportType.INVENTORY_SUMMARY,
        category: ReportCategory.OPERATIONAL,
        parameters: [
          {
            id: '1-1',
            name: 'warehouse',
            label: 'Warehouse',
            type: 'select',
            required: false,
            options: [
              { value: 'WH001', label: 'Main Warehouse' },
              { value: 'WH002', label: 'Branch Warehouse' },
            ],
          },
        ],
        defaultFilters: {},
        isSystem: true,
        isActive: true,
        createdBy: 'system',
        createdDate: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: '2',
        name: 'Financial Valuation Report',
        description: 'Financial valuation template',
        reportType: ReportType.VALUATION_REPORT,
        category: ReportCategory.FINANCIAL,
        parameters: [
          {
            id: '2-1',
            name: 'valuationMethod',
            label: 'Valuation Method',
            type: 'select',
            required: true,
            options: [
              { value: 'fifo', label: 'FIFO' },
              { value: 'lifo', label: 'LIFO' },
              { value: 'weighted_average', label: 'Weighted Average' },
            ],
          },
        ],
        defaultFilters: {
          valuationMethod: 'weighted_average',
        },
        isSystem: true,
        isActive: true,
        createdBy: 'system',
        createdDate: new Date('2024-01-01T00:00:00Z'),
      },
    ]
  },

  // Get statistics
  async getStats(): Promise<ReportStats> {
    return {
      totalReports: mockReports.length,
      draftReports: mockReports.filter((item) => item.status === ReportStatus.DRAFT).length,
      scheduledReports: mockReports.filter((item) => item.status === ReportStatus.SCHEDULED).length,
      runningReports: mockReports.filter((item) => item.status === ReportStatus.RUNNING).length,
      completedReports: mockReports.filter((item) => item.status === ReportStatus.COMPLETED).length,
      failedReports: mockReports.filter((item) => item.status === ReportStatus.FAILED).length,
      cancelledReports: mockReports.filter((item) => item.status === ReportStatus.CANCELLED).length,
      totalGeneratedToday: mockReports.filter((item) => {
        const today = new Date()
        const reportDate = new Date(item.generatedDate || item.createdDate)
        return reportDate.toDateString() === today.toDateString()
      }).length,
      averageExecutionTime: mockReports.reduce((sum, item) => sum + (item.executionTime || 0), 0) / mockReports.length,
      lastGeneratedDate: mockReports[0]?.generatedDate,
      nextScheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    }
  },
}
