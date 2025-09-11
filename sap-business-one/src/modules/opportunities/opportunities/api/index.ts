import type {
  Opportunity,
  OpportunityFormData,
  OpportunityFilters,
  OpportunityStats,
  OpportunityPagination,
} from '../types'
import {
  OpportunityStatus,
  OpportunityStage,
  OpportunityType,
  OpportunityPriority,
  OpportunitySource,
  Currency,
} from '../types'

// Mock data for opportunities
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    opportunityCode: 'OPP-2024-001',
    title: 'Enterprise Software Implementation',
    description: 'Full-scale ERP implementation for manufacturing company',
    status: OpportunityStatus.QUALIFIED,
    type: OpportunityType.NEW_BUSINESS,
    stage: OpportunityStage.PROPOSAL,
    priority: OpportunityPriority.HIGH,
    source: OpportunitySource.REFERRAL,
    customerId: 'CUST-001',
    customerName: 'TechCorp Manufacturing',
    customerType: 'EXISTING',
    assignedTo: 'John Smith',
    contacts: [
      {
        id: '1',
        contactId: 'CONT-001',
        contactName: 'Sarah Johnson',
        contactEmail: 'sarah.johnson@techcorp.com',
        contactPhone: '+1-555-0123',
        role: 'DECISION_MAKER',
        influence: 'HIGH',
        notes: 'CEO and final decision maker',
      },
    ],
    products: [
      {
        id: '1',
        productId: 'PROD-001',
        productName: 'SAP Business One Professional',
        productCode: 'SAP-B1-PRO',
        quantity: 25,
        unitPrice: 2500,
        discount: 10,
        totalPrice: 56250,
        currency: Currency.USD,
        notes: 'Professional licenses for core users',
      },
    ],
    activities: [
      {
        id: '1',
        type: 'MEETING',
        subject: 'Initial Discovery Meeting',
        description: 'Understanding business requirements and current processes',
        date: new Date('2024-01-15'),
        duration: 120,
        outcome: 'POSITIVE',
        nextAction: 'Prepare detailed proposal',
        nextActionDate: new Date('2024-01-22'),
        notes: 'Client showed strong interest and budget approval',
      },
    ],
    financial: {
      totalValue: 150000,
      currency: Currency.USD,
      probability: 75,
      expectedRevenue: 112500,
      actualRevenue: 0,
      costOfSale: 15000,
      grossProfit: 97500,
      netProfit: 82500,
      discount: 10,
      notes: 'High-value opportunity with good probability',
    },
    timeline: {
      discoveryDate: new Date('2024-01-10'),
      qualificationDate: new Date('2024-01-15'),
      proposalDate: new Date('2024-01-22'),
      expectedCloseDate: new Date('2024-03-15'),
      estimatedDuration: 65,
      notes: 'Standard sales cycle for enterprise deals',
    },
    tags: ['enterprise', 'manufacturing', 'erp'],
    notes: 'High priority opportunity with strong potential',
    attachments: ['proposal-draft.pdf', 'requirements-doc.docx'],
    relatedOpportunities: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    opportunityCode: 'OPP-2024-002',
    title: 'Cloud Migration Services',
    description: 'Migration of legacy systems to cloud infrastructure',
    status: OpportunityStatus.PROPOSAL,
    type: OpportunityType.EXISTING_BUSINESS,
    stage: OpportunityStage.NEGOTIATION,
    priority: OpportunityPriority.MEDIUM,
    source: OpportunitySource.EXISTING_CUSTOMER,
    customerId: 'CUST-002',
    customerName: 'Global Retail Inc',
    customerType: 'EXISTING',
    assignedTo: 'Jane Doe',
    contacts: [
      {
        id: '2',
        contactId: 'CONT-002',
        contactName: 'Mike Chen',
        contactEmail: 'mike.chen@globalretail.com',
        contactPhone: '+1-555-0456',
        role: 'TECHNICAL_EVALUATOR',
        influence: 'HIGH',
        notes: 'CTO responsible for technical decisions',
      },
    ],
    products: [
      {
        id: '2',
        productId: 'PROD-002',
        productName: 'Cloud Migration Package',
        productCode: 'CLOUD-MIG',
        quantity: 1,
        unitPrice: 75000,
        discount: 5,
        totalPrice: 71250,
        currency: Currency.USD,
        notes: 'Complete migration service package',
      },
    ],
    activities: [
      {
        id: '2',
        type: 'DEMO',
        subject: 'Cloud Platform Demo',
        description: 'Demonstrated cloud migration capabilities',
        date: new Date('2024-01-18'),
        duration: 90,
        outcome: 'POSITIVE',
        nextAction: 'Technical evaluation meeting',
        nextActionDate: new Date('2024-01-25'),
        notes: 'Technical team was impressed with capabilities',
      },
    ],
    financial: {
      totalValue: 75000,
      currency: Currency.USD,
      probability: 60,
      expectedRevenue: 45000,
      actualRevenue: 0,
      costOfSale: 8000,
      grossProfit: 37000,
      netProfit: 29000,
      discount: 5,
      notes: 'Medium probability with existing customer',
    },
    timeline: {
      discoveryDate: new Date('2024-01-05'),
      qualificationDate: new Date('2024-01-12'),
      proposalDate: new Date('2024-01-18'),
      negotiationStartDate: new Date('2024-01-20'),
      expectedCloseDate: new Date('2024-02-28'),
      estimatedDuration: 55,
      notes: 'Faster cycle due to existing relationship',
    },
    tags: ['cloud', 'migration', 'existing-customer'],
    notes: 'Existing customer with good relationship',
    attachments: ['migration-plan.pdf'],
    relatedOpportunities: [],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    opportunityCode: 'OPP-2024-003',
    title: 'Mobile App Development',
    description: 'Custom mobile application for customer engagement',
    status: OpportunityStatus.LEAD,
    type: OpportunityType.NEW_BUSINESS,
    stage: OpportunityStage.DISCOVERY,
    priority: OpportunityPriority.LOW,
    source: OpportunitySource.WEBSITE,
    customerId: 'CUST-003',
    customerName: 'StartupXYZ',
    customerType: 'PROSPECT',
    assignedTo: 'Bob Wilson',
    contacts: [
      {
        id: '3',
        contactId: 'CONT-003',
        contactName: 'Alex Rodriguez',
        contactEmail: 'alex@startupxyz.com',
        contactPhone: '+1-555-0789',
        role: 'DECISION_MAKER',
        influence: 'HIGH',
        notes: 'Founder and CEO',
      },
    ],
    products: [
      {
        id: '3',
        productId: 'PROD-003',
        productName: 'Mobile App Development',
        productCode: 'MOBILE-DEV',
        quantity: 1,
        unitPrice: 45000,
        discount: 0,
        totalPrice: 45000,
        currency: Currency.USD,
        notes: 'Custom mobile application development',
      },
    ],
    activities: [
      {
        id: '3',
        type: 'CALL',
        subject: 'Initial Qualification Call',
        description: 'Understanding project requirements and budget',
        date: new Date('2024-01-19'),
        duration: 45,
        outcome: 'NEUTRAL',
        nextAction: 'Send project proposal',
        nextActionDate: new Date('2024-01-26'),
        notes: 'Budget constraints mentioned, need to adjust proposal',
      },
    ],
    financial: {
      totalValue: 45000,
      currency: Currency.USD,
      probability: 30,
      expectedRevenue: 13500,
      actualRevenue: 0,
      costOfSale: 5000,
      grossProfit: 8500,
      netProfit: 3500,
      discount: 0,
      notes: 'Lower probability due to budget constraints',
    },
    timeline: {
      discoveryDate: new Date('2024-01-19'),
      expectedCloseDate: new Date('2024-04-15'),
      estimatedDuration: 85,
      notes: 'Longer cycle expected due to budget approval process',
    },
    tags: ['mobile', 'startup', 'custom-development'],
    notes: 'Early stage opportunity with budget concerns',
    attachments: [],
    relatedOpportunities: [],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-20'),
  },
]

// API Service
export const opportunityApi = {
  // Get all opportunities with pagination and filtering
  async getOpportunities(
    page: number = 1,
    limit: number = 10,
    filters?: OpportunityFilters,
  ): Promise<{ opportunities: Opportunity[]; pagination: OpportunityPagination }> {
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay

    let filteredOpportunities = [...mockOpportunities]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredOpportunities = filteredOpportunities.filter(
          (opp) =>
            opp.title.toLowerCase().includes(searchLower) ||
            opp.opportunityCode.toLowerCase().includes(searchLower) ||
            opp.customerName.toLowerCase().includes(searchLower) ||
            opp.description?.toLowerCase().includes(searchLower),
        )
      }

      if (filters.status) {
        filteredOpportunities = filteredOpportunities.filter((opp) => opp.status === filters.status)
      }

      if (filters.type) {
        filteredOpportunities = filteredOpportunities.filter((opp) => opp.type === filters.type)
      }

      if (filters.stage) {
        filteredOpportunities = filteredOpportunities.filter((opp) => opp.stage === filters.stage)
      }

      if (filters.priority) {
        filteredOpportunities = filteredOpportunities.filter(
          (opp) => opp.priority === filters.priority,
        )
      }

      if (filters.source) {
        filteredOpportunities = filteredOpportunities.filter((opp) => opp.source === filters.source)
      }

      if (filters.assignedTo) {
        filteredOpportunities = filteredOpportunities.filter(
          (opp) => opp.assignedTo === filters.assignedTo,
        )
      }

      if (filters.customerType) {
        filteredOpportunities = filteredOpportunities.filter(
          (opp) => opp.customerType === filters.customerType,
        )
      }

      if (filters.minValue) {
        filteredOpportunities = filteredOpportunities.filter(
          (opp) => opp.financial.totalValue >= filters.minValue!,
        )
      }

      if (filters.maxValue) {
        filteredOpportunities = filteredOpportunities.filter(
          (opp) => opp.financial.totalValue <= filters.maxValue!,
        )
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredOpportunities = filteredOpportunities.filter((opp) =>
          filters.tags!.some((tag) => opp.tags.includes(tag)),
        )
      }
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
        hasPrev: page > 1,
      },
    }
  },

  // Get opportunity by ID
  async getOpportunityById(id: string): Promise<Opportunity | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockOpportunities.find((opp) => opp.id === id) || null
  },

  // Create new opportunity
  async createOpportunity(data: OpportunityFormData): Promise<Opportunity> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newOpportunity: Opportunity = {
      id: Date.now().toString(),
      ...data,
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
        discount: 0,
      },
      timeline: {
        expectedCloseDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        estimatedDuration: 90,
      },
      attachments: [],
      relatedOpportunities: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockOpportunities.push(newOpportunity)
    return newOpportunity
  },

  // Update opportunity
  async updateOpportunity(
    id: string,
    data: Partial<OpportunityFormData>,
  ): Promise<Opportunity | null> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockOpportunities.findIndex((opp) => opp.id === id)
    if (index === -1) return null

    const updatedOpportunity = {
      ...mockOpportunities[index],
      ...data,
      updatedAt: new Date(),
    }

    mockOpportunities[index] = updatedOpportunity
    return updatedOpportunity
  },

  // Delete opportunity
  async deleteOpportunity(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockOpportunities.findIndex((opp) => opp.id === id)
    if (index === -1) return false

    mockOpportunities.splice(index, 1)
    return true
  },

  // Get opportunity statistics
  async getOpportunityStats(): Promise<OpportunityStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalOpportunities = mockOpportunities.length
    const openOpportunities = mockOpportunities.filter(
      (opp) =>
        opp.status !== OpportunityStatus.CLOSED_WON && opp.status !== OpportunityStatus.CLOSED_LOST,
    ).length
    const closedWonOpportunities = mockOpportunities.filter(
      (opp) => opp.status === OpportunityStatus.CLOSED_WON,
    ).length
    const closedLostOpportunities = mockOpportunities.filter(
      (opp) => opp.status === OpportunityStatus.CLOSED_LOST,
    ).length

    const totalPipelineValue = mockOpportunities
      .filter(
        (opp) =>
          opp.status !== OpportunityStatus.CLOSED_WON &&
          opp.status !== OpportunityStatus.CLOSED_LOST,
      )
      .reduce((sum, opp) => sum + opp.financial.totalValue, 0)

    const weightedPipelineValue = mockOpportunities
      .filter(
        (opp) =>
          opp.status !== OpportunityStatus.CLOSED_WON &&
          opp.status !== OpportunityStatus.CLOSED_LOST,
      )
      .reduce((sum, opp) => sum + (opp.financial.totalValue * opp.financial.probability) / 100, 0)

    const averageDealSize =
      totalOpportunities > 0
        ? mockOpportunities.reduce((sum, opp) => sum + opp.financial.totalValue, 0) /
          totalOpportunities
        : 0

    const winRate =
      closedWonOpportunities + closedLostOpportunities > 0
        ? (closedWonOpportunities / (closedWonOpportunities + closedLostOpportunities)) * 100
        : 0

    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
    const thisYear = new Date(now.getFullYear(), 0, 1)

    const opportunitiesThisMonth = mockOpportunities.filter(
      (opp) => opp.createdAt >= thisMonth,
    ).length
    const opportunitiesThisQuarter = mockOpportunities.filter(
      (opp) => opp.createdAt >= thisQuarter,
    ).length
    const opportunitiesThisYear = mockOpportunities.filter(
      (opp) => opp.createdAt >= thisYear,
    ).length

    return {
      totalOpportunities,
      openOpportunities,
      closedWonOpportunities,
      closedLostOpportunities,
      totalPipelineValue,
      weightedPipelineValue,
      averageDealSize,
      averageSalesCycle: 65, // Mock value
      winRate,
      conversionRate: 25, // Mock value
      opportunitiesThisMonth,
      opportunitiesThisQuarter,
      opportunitiesThisYear,
    }
  },

  // Business logic functions
  async advanceStage(id: string, newStage: OpportunityStage): Promise<Opportunity | null> {
    const opportunity = await this.getOpportunityById(id)
    if (!opportunity) return null

    return this.updateOpportunity(id, { stage: newStage })
  },

  async closeOpportunity(id: string, won: boolean): Promise<Opportunity | null> {
    const opportunity = await this.getOpportunityById(id)
    if (!opportunity) return null

    const status = won ? OpportunityStatus.CLOSED_WON : OpportunityStatus.CLOSED_LOST
    const now = new Date()

    // Update the opportunity with new status and stage
    const updatedOpportunity = {
      ...opportunity,
      status,
      stage: OpportunityStage.CLOSED,
      closedAt: now,
      ...(won ? { wonAt: now } : { lostAt: now }),
    }

    // Update in mock data
    const index = mockOpportunities.findIndex((opp) => opp.id === id)
    if (index !== -1) {
      mockOpportunities[index] = updatedOpportunity
    }

    return updatedOpportunity
  },

  async duplicateOpportunity(id: string): Promise<Opportunity | null> {
    const original = await this.getOpportunityById(id)
    if (!original) return null

    const duplicatedData: OpportunityFormData = {
      opportunityCode: `${original.opportunityCode}-COPY`,
      title: `${original.title} (Copy)`,
      description: original.description,
      status: OpportunityStatus.LEAD,
      type: original.type,
      stage: OpportunityStage.DISCOVERY,
      priority: original.priority,
      source: original.source,
      customerId: original.customerId,
      customerName: original.customerName,
      customerType: original.customerType,
      assignedTo: original.assignedTo,
      contacts: original.contacts.map((contact) => ({ ...contact, id: `temp-${Date.now()}` })),
      products: original.products.map((product) => ({ ...product, id: `temp-${Date.now()}` })),
      tags: [...original.tags],
      notes: original.notes,
    }

    return this.createOpportunity(duplicatedData)
  },

  // Validation
  validateOpportunity(data: OpportunityFormData): string[] {
    const errors: string[] = []

    if (!data.opportunityCode?.trim()) {
      errors.push('Opportunity code is required')
    }

    if (!data.title?.trim()) {
      errors.push('Title is required')
    }

    if (!data.customerName?.trim()) {
      errors.push('Customer name is required')
    }

    if (!data.assignedTo?.trim()) {
      errors.push('Assigned to is required')
    }

    if (data.contacts.length === 0) {
      errors.push('At least one contact is required')
    }

    return errors
  },
}
