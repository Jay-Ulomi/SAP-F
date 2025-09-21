import type {
  GoodsIssue,
  GoodsIssueFormData,
  GoodsIssueFilters,
  GoodsIssueStats,
  GoodsIssuePagination
} from '../types'
import { IssueStatus } from '../types'

// Mock data for goods issues
const mockIssues: GoodsIssue[] = [
  {
    id: 1,
    documentNo: 'GI-2024-001',
    postingDate: '2024-01-15',
    documentDate: '2024-01-15',
    series: 'GI-2024',
    businessPartnerCode: 'CUST001',
    businessPartnerName: 'Acme Corporation',
    customer: 'Acme Corporation',
    warehouse: 'Main Warehouse',
    lineItems: [
      {
        itemCode: 'PROD001',
        description: 'Finished Product A',
        quantity: 50,
        unitPrice: 120.00,
        uomCode: 'PCS',
        accountName: 'COGS Account',
        dimension1: 'Sales-01',
        dimension2: 'Region-North',
        dimension3: 'Channel-Direct',
        dimension4: 'Team-Alpha',
        warehouse: 'Main Warehouse',
        project: 'Customer Project A',
        lineTotal: 6000.00
      },
      {
        itemCode: 'PROD002',
        description: 'Finished Product B',
        quantity: 30,
        unitPrice: 180.00,
        uomCode: 'PCS',
        accountName: 'COGS Account',
        dimension1: 'Sales-02',
        dimension2: 'Region-South',
        dimension3: 'Channel-Partner',
        dimension4: 'Team-Beta',
        warehouse: 'Main Warehouse',
        project: 'Customer Project B',
        lineTotal: 5400.00
      }
    ],
    itemsCount: 2,
    totalAmount: 11400.00,
    status: IssueStatus.ISSUED,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    documentNo: 'GI-2024-002',
    postingDate: '2024-01-14',
    documentDate: '2024-01-14',
    series: 'GI-2024',
    businessPartnerCode: 'CUST002',
    businessPartnerName: 'Global Tech Solutions',
    customer: 'Global Tech Solutions',
    warehouse: 'Secondary Warehouse',
    lineItems: [
      {
        itemCode: 'PROD003',
        description: 'Tech Solution Kit',
        quantity: 20,
        unitPrice: 250.00,
        uomCode: 'SET',
        accountName: 'COGS Account',
        dimension1: 'Sales-03',
        dimension2: 'Region-East',
        dimension3: 'Channel-Online',
        dimension4: 'Team-Gamma',
        warehouse: 'Secondary Warehouse',
        project: 'Tech Implementation',
        lineTotal: 5000.00
      }
    ],
    itemsCount: 1,
    totalAmount: 5000.00,
    status: IssueStatus.PENDING,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    documentNo: 'GI-2024-003',
    postingDate: '2024-01-13',
    documentDate: '2024-01-13',
    series: 'GI-2024',
    businessPartnerCode: 'CUST003',
    businessPartnerName: 'Premium Services Ltd',
    customer: 'Premium Services Ltd',
    warehouse: 'Main Warehouse',
    lineItems: [
      {
        itemCode: 'PROD004',
        description: 'Premium Service Package',
        quantity: 10,
        unitPrice: 500.00,
        uomCode: 'PKG',
        accountName: 'Premium COGS',
        dimension1: 'Sales-04',
        dimension2: 'Region-West',
        dimension3: 'Channel-Premium',
        dimension4: 'Team-Delta',
        warehouse: 'Main Warehouse',
        project: 'Premium Delivery',
        lineTotal: 5000.00
      }
    ],
    itemsCount: 1,
    totalAmount: 5000.00,
    status: IssueStatus.ISSUED,
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-13T09:00:00Z'
  }
]

// Goods Issue API service
export const goodsIssueApi = {
  // Get all issues with pagination and filters
  async getIssues(
    page: number = 1,
    limit: number = 10,
    filters?: GoodsIssueFilters
  ): Promise<{ issues: GoodsIssue[]; pagination: GoodsIssuePagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredIssues = [...mockIssues]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredIssues = filteredIssues.filter(
          (issue) =>
            issue.documentNo.toLowerCase().includes(searchLower) ||
            issue.customer.toLowerCase().includes(searchLower) ||
            issue.warehouse.toLowerCase().includes(searchLower) ||
            issue.businessPartnerName.toLowerCase().includes(searchLower)
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredIssues = filteredIssues.filter((issue) =>
          filters.status!.includes(issue.status!)
        )
      }

      if (filters.customer) {
        filteredIssues = filteredIssues.filter((issue) =>
          issue.customer.toLowerCase().includes(filters.customer!.toLowerCase())
        )
      }

      if (filters.warehouse) {
        filteredIssues = filteredIssues.filter((issue) =>
          issue.warehouse.toLowerCase().includes(filters.warehouse!.toLowerCase())
        )
      }

      if (filters.dateRange) {
        filteredIssues = filteredIssues.filter((issue) => {
          const issueDate = new Date(issue.postingDate)
          return issueDate >= filters.dateRange!.start && issueDate <= filters.dateRange!.end
        })
      }
    }

    // Calculate pagination
    const total = filteredIssues.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedIssues = filteredIssues.slice(startIndex, endIndex)

    return {
      issues: paginatedIssues,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }
  },

  // Get issue by ID
  async getIssueById(id: string): Promise<GoodsIssue | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockIssues.find((issue) => issue.id === parseInt(id)) || null
  },

  // Create new issue
  async createIssue(data: GoodsIssueFormData): Promise<GoodsIssue> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalAmount = data.lineItems.reduce((sum, item) => sum + item.lineTotal, 0)

    const newIssue: GoodsIssue = {
      id: Math.max(...mockIssues.map(i => i.id!)) + 1,
      documentNo: `GI-2024-${String(mockIssues.length + 1).padStart(3, '0')}`,
      postingDate: data.postingDate,
      documentDate: data.documentDate,
      series: data.series,
      businessPartnerCode: data.businessPartnerCode,
      businessPartnerName: data.businessPartnerName,
      customer: data.customer,
      warehouse: data.warehouse,
      lineItems: data.lineItems,
      itemsCount: data.lineItems.length,
      totalAmount,
      status: IssueStatus.DRAFT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockIssues.push(newIssue)
    return newIssue
  },

  // Update issue
  async updateIssue(id: string, data: Partial<GoodsIssueFormData>): Promise<GoodsIssue> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const issueIndex = mockIssues.findIndex((issue) => issue.id === parseInt(id))
    if (issueIndex === -1) {
      throw new Error('Issue not found')
    }

    const existingIssue = mockIssues[issueIndex]
    const totalAmount = data.lineItems ? data.lineItems.reduce((sum, item) => sum + item.lineTotal, 0) : existingIssue.totalAmount

    const updatedIssue: GoodsIssue = {
      ...existingIssue,
      ...(data.postingDate && { postingDate: data.postingDate }),
      ...(data.documentDate && { documentDate: data.documentDate }),
      ...(data.series && { series: data.series }),
      ...(data.businessPartnerCode && { businessPartnerCode: data.businessPartnerCode }),
      ...(data.businessPartnerName && { businessPartnerName: data.businessPartnerName }),
      ...(data.customer && { customer: data.customer }),
      ...(data.warehouse && { warehouse: data.warehouse }),
      ...(data.lineItems && {
        lineItems: data.lineItems,
        itemsCount: data.lineItems.length,
        totalAmount
      }),
      updatedAt: new Date().toISOString()
    }

    mockIssues[issueIndex] = updatedIssue
    return updatedIssue
  },

  // Delete issue
  async deleteIssue(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const issueIndex = mockIssues.findIndex((issue) => issue.id === parseInt(id))
    if (issueIndex === -1) {
      throw new Error('Issue not found')
    }

    mockIssues.splice(issueIndex, 1)
  },

  // Get issue statistics
  async getIssueStats(): Promise<GoodsIssueStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalIssues = mockIssues.length
    const issuedGoods = mockIssues.filter((i) => i.status === IssueStatus.ISSUED).length
    const pendingIssues = mockIssues.filter((i) => i.status === IssueStatus.PENDING).length
    const draftIssues = mockIssues.filter((i) => i.status === IssueStatus.DRAFT).length
    const cancelledIssues = mockIssues.filter((i) => i.status === IssueStatus.CANCELLED).length

    const totalValue = mockIssues.reduce((sum, issue) => sum + issue.totalAmount, 0)
    const averageValue = totalIssues > 0 ? totalValue / totalIssues : 0

    return {
      totalIssues,
      issuedGoods,
      pendingIssues,
      draftIssues,
      cancelledIssues,
      totalValue,
      averageValue
    }
  },

  // Business logic methods
  async completeIssue(id: string): Promise<GoodsIssue> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const issue = mockIssues.find((i) => i.id === parseInt(id))
    if (!issue) {
      throw new Error('Issue not found')
    }

    if (issue.status !== IssueStatus.PENDING && issue.status !== IssueStatus.DRAFT) {
      throw new Error('Issue cannot be completed')
    }

    issue.status = IssueStatus.ISSUED
    issue.updatedAt = new Date().toISOString()

    return issue
  },

  async cancelIssue(id: string): Promise<GoodsIssue> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const issue = mockIssues.find((i) => i.id === parseInt(id))
    if (!issue) {
      throw new Error('Issue not found')
    }

    if (issue.status === IssueStatus.ISSUED) {
      throw new Error('Cannot cancel issued goods')
    }

    issue.status = IssueStatus.CANCELLED
    issue.updatedAt = new Date().toISOString()

    return issue
  }
}