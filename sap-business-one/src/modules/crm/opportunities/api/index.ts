import type {
  Opportunity,
  OpportunityFormData,
  OpportunityFilters,
  OpportunityStats,
  OpportunityPagination
} from '../types'
import {
  OpportunityStatus,
  OpportunityType,
  OpportunityStage,
  OpportunityPriority,
  OpportunitySource,
  Currency
} from '../types'

// Mock data
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    opportunityCode: 'OPP001',
    title: 'Enterprise Software License Renewal',
    description: 'Annual renewal of enterprise software licenses for Tech Solutions Inc.',
    status: OpportunityStatus.NEGOTIATION,
    type: OpportunityType.RENEWAL,
    stage: OpportunityStage.NEGOTIATION,
    priority: OpportunityPriority.HIGH,
    source: OpportunitySource.EXISTING_CUSTOMER,
    customerId: 'CUST001',
    customerName: 'Tech Solutions Inc.',
    customerType: 'EXISTING',
    assignedTo: 'Sales Team A',
    contacts: [
      {
        id: 'cont1',
        contactId: 'CONT001',
        contactName: 'John Smith',
        contactEmail: 'john.smith@techsolutions.com',
        contactPhone: '+1-555-0123',
        role: 'DECISION_MAKER',
        influence: 'HIGH',
        notes: 'CTO, very interested in new features'
      }
    ],
    products: [
      {
        id: 'prod1',
        productId: 'PROD001',
        productName: 'Enterprise Software Suite',
        productCode: 'ESS-ENT',
        quantity: 100,
        unitPrice: 500,
        discount: 15,
        totalPrice: 42500,
        currency: Currency.USD,
        notes: 'Annual license renewal'
      }
    ],
    activities: [
      {
        id: 'act1',
        type: 'MEETING',
        subject: 'Product Demo and Q&A',
        description: 'Demonstrated new features and addressed technical questions',
        date: new Date('2024-01-20T10:00:00'),
        duration: 90,
        outcome: 'POSITIVE',
        nextAction: 'Send proposal',
        nextActionDate: new Date('2024-01-25T14:00:00'),
        notes: 'Client showed strong interest in new features'
      }
    ],
    financial: {
      totalValue: 50000,
      currency: Currency.USD,
      probability: 85,
      expectedRevenue: 42500,
      actualRevenue: 0,
      costOfSale: 5000,
      grossProfit: 37500,
      netProfit: 32500,
      discount: 15,
      notes: 'High probability due to existing relationship'
    },
    timeline: {
      discoveryDate: new Date('2024-01-01T09:00:00'),
      qualificationDate: new Date('2024-01-05T14:00:00'),
      proposalDate: new Date('2024-01-25T10:00:00'),
      negotiationStartDate: new Date('2024-01-20T10:00:00'),
      expectedCloseDate: new Date('2024-02-15T17:00:00'),
      estimatedDuration: 45,
      notes: 'Standard renewal cycle'
    },
    tags: ['renewal', 'enterprise', 'high-value', 'existing-customer'],
    notes: 'Strong renewal opportunity with potential for upsell',
    attachments: ['proposal.pdf', 'contract-draft.docx'],
    relatedOpportunities: ['OPP002'],
    createdAt: new Date('2024-01-01T09:00:00'),
    updatedAt: new Date('2024-01-20T15:00:00')
  },
  {
    id: '2',
    opportunityCode: 'OPP002',
    title: 'New Business Development',
    description: 'New software implementation for manufacturing company',
    status: OpportunityStatus.QUALIFIED,
    type: OpportunityType.NEW_BUSINESS,
    stage: OpportunityStage.QUALIFICATION,
    priority: OpportunityPriority.MEDIUM,
    source: OpportunitySource.REFERRAL,
    customerId: 'CUST002',
    customerName: 'Manufacturing Plus Ltd.',
    customerType: 'PROSPECT',
    assignedTo: 'Sales Team B',
    contacts: [
      {
        id: 'cont2',
        contactId: 'CONT002',
        contactName: 'Sarah Johnson',
        contactEmail: 'sarah.johnson@manufacturingplus.com',
        contactPhone: '+1-555-0456',
        role: 'DECISION_MAKER',
        influence: 'HIGH',
        notes: 'Operations Director, looking for efficiency improvements'
      }
    ],
    products: [
      {
        id: 'prod2',
        productId: 'PROD002',
        productName: 'Manufacturing Management System',
        productCode: 'MMS-STD',
        quantity: 1,
        unitPrice: 25000,
        discount: 10,
        totalPrice: 22500,
        currency: Currency.USD,
        notes: 'New implementation'
      }
    ],
    activities: [
      {
        id: 'act2',
        type: 'DEMO',
        subject: 'System Demonstration',
        description: 'Demonstrated key features and benefits',
        date: new Date('2024-01-18T14:00:00'),
        duration: 60,
        outcome: 'POSITIVE',
        nextAction: 'Follow-up call',
        nextActionDate: new Date('2024-01-23T10:00:00'),
        notes: 'Client needs more information about integration'
      }
    ],
    financial: {
      totalValue: 25000,
      currency: Currency.USD,
      probability: 60,
      expectedRevenue: 15000,
      actualRevenue: 0,
      costOfSale: 3000,
      grossProfit: 12000,
      netProfit: 9000,
      discount: 10,
      notes: 'Medium probability, new customer'
    },
    timeline: {
      discoveryDate: new Date('2024-01-10T11:00:00'),
      qualificationDate: new Date('2024-01-18T14:00:00'),
      expectedCloseDate: new Date('2024-03-15T17:00:00'),
      estimatedDuration: 65,
      notes: 'New customer sales cycle'
    },
    tags: ['new-business', 'manufacturing', 'referral'],
    notes: 'Promising prospect with clear pain points',
    attachments: ['demo-presentation.pdf'],
    relatedOpportunities: [],
    createdAt: new Date('2024-01-10T11:00:00'),
    updatedAt: new Date('2024-01-18T16:00:00')
  }
]

// API implementation
export const opportunityApi = {
  // Get opportunities with pagination and filters
  async getOpportunities(
    page: number = 1,
    limit: number = 10,
    filters: OpportunityFilters = {}
  ): Promise<{ opportunities: Opportunity[]; pagination: OpportunityPagination }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredOpportunities = [...mockOpportunities]

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredOpportunities = filteredOpportunities.filter(opportunity =>
        opportunity.title.toLowerCase().includes(searchTerm) ||
        opportunity.description?.toLowerCase().includes(searchTerm) ||
        opportunity.opportunityCode.toLowerCase().includes(searchTerm) ||
        opportunity.customerName.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.status === filters.status)
    }

    if (filters.type) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.type === filters.type)
    }

    if (filters.stage) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.stage === filters.stage)
    }

    if (filters.priority) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.priority === filters.priority)
    }

    if (filters.source) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.source === filters.source)
    }

    if (filters.assignedTo) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.assignedTo === filters.assignedTo)
    }

    if (filters.customerType) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.customerType === filters.customerType)
    }

    if (filters.dateFrom) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.createdAt >= filters.dateFrom!)
    }

    if (filters.dateTo) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.createdAt <= filters.dateTo!)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredOpportunities = filteredOpportunities.filter(opportunity =>
        filters.tags!.some(tag => opportunity.tags.includes(tag))
      )
    }

    if (filters.minValue) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.financial.totalValue >= filters.minValue!)
    }

    if (filters.maxValue) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => opportunity.financial.totalValue <= filters.maxValue!)
    }

    // Calculate pagination
    const total = filteredOpportunities.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOpportunities = filteredOpportunities.slice(startIndex, endIndex)

    return {
      opportunities: paginatedOpportunities,
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

  // Get opportunity by ID
  async getOpportunityById(id: string): Promise<Opportunity | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockOpportunities.find(opportunity => opportunity.id === id) || null
  },

  // Create new opportunity
  async createOpportunity(data: OpportunityFormData): Promise<Opportunity> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const newOpportunity: Opportunity = {
      id: Date.now().toString(),
      ...data,
      contacts: data.contacts || [],
      products: data.products || [],
      activities: [],
      financial: {
        totalValue: 0,
        currency: Currency.USD,
        probability: 0,
        expectedRevenue: 0,
        actualRevenue: 0,
        costOfSale: 0,
        grossProfit: 0,
        netProfit: 0,
        discount: 0
      },
      timeline: {
        discoveryDate: new Date(),
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        estimatedDuration: 30
      },
      tags: data.tags || [],
      attachments: [],
      relatedOpportunities: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockOpportunities.unshift(newOpportunity)
    return newOpportunity
  },

  // Update existing opportunity
  async updateOpportunity(id: string, data: Partial<OpportunityFormData>): Promise<Opportunity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const opportunityIndex = mockOpportunities.findIndex(opportunity => opportunity.id === id)
    if (opportunityIndex === -1) {
      throw new Error('Opportunity not found')
    }

    const updatedOpportunity = {
      ...mockOpportunities[opportunityIndex],
      ...data,
      updatedAt: new Date()
    }

    mockOpportunities[opportunityIndex] = updatedOpportunity
    return updatedOpportunity
  },

  // Delete opportunity
  async deleteOpportunity(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const opportunityIndex = mockOpportunities.findIndex(opportunity => opportunity.id === id)
    if (opportunityIndex === -1) {
      throw new Error('Opportunity not found')
    }

    mockOpportunities.splice(opportunityIndex, 1)
  },

  // Duplicate opportunity
  async duplicateOpportunity(
    id: string,
    newOpportunityCode: string,
    newTitle: string,
    newCustomerName: string
  ): Promise<Opportunity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const originalOpportunity = mockOpportunities.find(opportunity => opportunity.id === id)
    if (!originalOpportunity) {
      throw new Error('Opportunity not found')
    }

    const duplicatedOpportunity: Opportunity = {
      ...originalOpportunity,
      id: Date.now().toString(),
      opportunityCode: newOpportunityCode,
      title: newTitle,
      customerName: newCustomerName,
      status: OpportunityStatus.LEAD,
      stage: OpportunityStage.DISCOVERY,
      createdAt: new Date(),
      updatedAt: new Date(),
      closedAt: undefined,
      wonAt: undefined,
      lostAt: undefined
    }

    mockOpportunities.unshift(duplicatedOpportunity)
    return duplicatedOpportunity
  },

  // Get opportunity statistics
  async getOpportunityStats(): Promise<OpportunityStats> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const totalOpportunities = mockOpportunities.length
    const openOpportunities = mockOpportunities.filter(opportunity => 
      opportunity.status !== OpportunityStatus.CLOSED_WON && 
      opportunity.status !== OpportunityStatus.CLOSED_LOST
    ).length
    const closedWonOpportunities = mockOpportunities.filter(opportunity => 
      opportunity.status === OpportunityStatus.CLOSED_WON
    ).length
    const closedLostOpportunities = mockOpportunities.filter(opportunity => 
      opportunity.status === OpportunityStatus.CLOSED_LOST
    ).length

    const totalPipelineValue = mockOpportunities.reduce((sum, opportunity) => 
      sum + opportunity.financial.totalValue, 0
    )
    const weightedPipelineValue = mockOpportunities.reduce((sum, opportunity) => 
      sum + (opportunity.financial.totalValue * opportunity.financial.probability / 100), 0
    )

    const averageDealSize = totalOpportunities > 0 ? totalPipelineValue / totalOpportunities : 0

    const now = new Date()
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

    const opportunitiesThisMonth = mockOpportunities.filter(opportunity => 
      opportunity.createdAt >= oneMonthAgo
    ).length
    const opportunitiesThisQuarter = mockOpportunities.filter(opportunity => 
      opportunity.createdAt >= threeMonthsAgo
    ).length
    const opportunitiesThisYear = mockOpportunities.filter(opportunity => 
      opportunity.createdAt >= oneYearAgo
    ).length

    const winRate = closedWonOpportunities + closedLostOpportunities > 0 ? 
      (closedWonOpportunities / (closedWonOpportunities + closedLostOpportunities)) * 100 : 0

    const conversionRate = totalOpportunities > 0 ? 
      (closedWonOpportunities / totalOpportunities) * 100 : 0

    // Calculate average sales cycle (simplified)
    const closedOpportunities = mockOpportunities.filter(opportunity => 
      opportunity.status === OpportunityStatus.CLOSED_WON || 
      opportunity.status === OpportunityStatus.CLOSED_LOST
    )
    const averageSalesCycle = closedOpportunities.length > 0 ? 
      closedOpportunities.reduce((sum, opportunity) => {
        if (opportunity.closedAt) {
          const duration = opportunity.closedAt.getTime() - opportunity.createdAt.getTime()
          return sum + duration / (1000 * 60 * 60 * 24) // Convert to days
        }
        return sum
      }, 0) / closedOpportunities.length : 0

    return {
      totalOpportunities,
      openOpportunities,
      closedWonOpportunities,
      closedLostOpportunities,
      totalPipelineValue,
      weightedPipelineValue: Math.round(weightedPipelineValue),
      averageDealSize: Math.round(averageDealSize),
      averageSalesCycle: Math.round(averageSalesCycle),
      winRate: Math.round(winRate),
      conversionRate: Math.round(conversionRate),
      opportunitiesThisMonth,
      opportunitiesThisQuarter,
      opportunitiesThisYear
    }
  },

  // Business logic operations
  async advanceStage(id: string, newStage: OpportunityStage): Promise<Opportunity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const opportunity = mockOpportunities.find(opportunity => opportunity.id === id)
    if (!opportunity) {
      throw new Error('Opportunity not found')
    }

    opportunity.stage = newStage
    opportunity.updatedAt = new Date()

    // Update status based on stage
    if (newStage === OpportunityStage.CLOSED) {
      opportunity.status = OpportunityStatus.CLOSED_WON
      opportunity.closedAt = new Date()
      opportunity.wonAt = new Date()
    }

    return opportunity
  },

  async closeOpportunity(id: string, won: boolean): Promise<Opportunity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const opportunity = mockOpportunities.find(opportunity => opportunity.id === id)
    if (!opportunity) {
      throw new Error('Opportunity not found')
    }

    opportunity.stage = OpportunityStage.CLOSED
    opportunity.status = won ? OpportunityStatus.CLOSED_WON : OpportunityStatus.CLOSED_LOST
    opportunity.closedAt = new Date()
    
    if (won) {
      opportunity.wonAt = new Date()
    } else {
      opportunity.lostAt = new Date()
    }

    opportunity.updatedAt = new Date()
    return opportunity
  },

  // Validation
  validateOpportunity(data: OpportunityFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.opportunityCode.trim()) {
      errors.push('Opportunity code is required')
    }

    if (!data.title.trim()) {
      errors.push('Title is required')
    }

    if (!data.status) {
      errors.push('Opportunity status is required')
    }

    if (!data.type) {
      errors.push('Opportunity type is required')
    }

    if (!data.stage) {
      errors.push('Opportunity stage is required')
    }

    if (!data.priority) {
      errors.push('Opportunity priority is required')
    }

    if (!data.source) {
      errors.push('Opportunity source is required')
    }

    if (!data.customerId.trim()) {
      errors.push('Customer ID is required')
    }

    if (!data.customerName.trim()) {
      errors.push('Customer name is required')
    }

    if (!data.customerType) {
      errors.push('Customer type is required')
    }

    if (!data.assignedTo.trim()) {
      errors.push('Assigned to is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
