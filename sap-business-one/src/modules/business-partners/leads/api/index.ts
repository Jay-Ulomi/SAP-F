import type { Lead, LeadFormData, LeadFilters, LeadStats, LeadPagination } from '../types'
import { LeadStatus, LeadSource, LeadPriority, LeadType, Currency } from '../types'

// Mock data
const mockLeads: Lead[] = [
  {
    id: '1',
    leadCode: 'LEAD-001',
    companyName: 'TechStart Inc.',
    leadName: 'John Smith',
    status: LeadStatus.NEW,
    source: LeadSource.WEBSITE,
    priority: LeadPriority.HIGH,
    type: LeadType.POTENTIAL_CUSTOMER,
    industry: 'Technology',
    website: 'www.techstart.com',
    phone: '+1-555-0101',
    email: 'john.smith@techstart.com',
    addresses: [
      {
        id: 'addr-1',
        type: 'BILLING',
        addressLine1: '123 Innovation Drive',
        addressLine2: 'Suite 200',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        isDefault: true,
        phone: '+1-555-0101',
        email: 'billing@techstart.com',
      },
    ],
    contacts: [
      {
        id: 'cont-1',
        firstName: 'John',
        lastName: 'Smith',
        position: 'CEO',
        email: 'john.smith@techstart.com',
        phone: '+1-555-0101',
        mobile: '+1-555-0102',
        isPrimary: true,
        notes: 'Main decision maker',
      },
    ],
    financial: {
      estimatedValue: 50000,
      currency: Currency.USD,
      probability: 75,
      expectedCloseDate: '2024-03-15',
      budget: 60000,
      decisionMaker: 'John Smith',
    },
    activities: [
      {
        id: 'act-1',
        type: 'CALL',
        subject: 'Initial Contact',
        description: 'Made first contact with John Smith',
        date: '2024-01-15T10:00:00Z',
        assignedTo: 'Mike Johnson',
        status: 'COMPLETED',
        notes: 'Lead showed interest in our solution',
      },
    ],
    notes: 'High potential lead from website inquiry',
    tags: ['technology', 'startup', 'high-value'],
    assignedSalesRep: 'Mike Johnson',
    assignedTo: 'Mike Johnson',
    campaign: 'Website Lead Generation',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    lastActivityDate: '2024-01-15T00:00:00Z',
    nextFollowUpDate: '2024-01-22T00:00:00Z',
  },
  {
    id: '2',
    leadCode: 'LEAD-002',
    companyName: 'Global Manufacturing Co.',
    leadName: 'Sarah Johnson',
    status: LeadStatus.CONTACTED,
    source: LeadSource.REFERRAL,
    priority: LeadPriority.MEDIUM,
    type: LeadType.PROSPECT,
    industry: 'Manufacturing',
    phone: '+1-555-0201',
    email: 'sarah.johnson@gmco.com',
    addresses: [
      {
        id: 'addr-2',
        type: 'BILLING',
        addressLine1: '456 Industrial Blvd',
        city: 'Detroit',
        state: 'MI',
        postalCode: '48201',
        country: 'USA',
        isDefault: true,
        phone: '+1-555-0201',
      },
    ],
    contacts: [
      {
        id: 'cont-2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        position: 'Operations Manager',
        email: 'sarah.johnson@gmco.com',
        phone: '+1-555-0201',
        isPrimary: true,
      },
    ],
    financial: {
      estimatedValue: 25000,
      currency: Currency.USD,
      probability: 60,
      expectedCloseDate: '2024-04-01',
      budget: 30000,
      decisionMaker: 'Sarah Johnson',
    },
    activities: [
      {
        id: 'act-2',
        type: 'EMAIL',
        subject: 'Follow-up Email',
        description: 'Sent product information and pricing',
        date: '2024-01-16T14:00:00Z',
        assignedTo: 'Lisa Chen',
        status: 'COMPLETED',
      },
    ],
    notes: 'Referred by existing customer',
    tags: ['manufacturing', 'referral', 'medium-value'],
    assignedSalesRep: 'Lisa Chen',
    assignedTo: 'Lisa Chen',
    campaign: 'Customer Referral Program',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
    lastActivityDate: '2024-01-16T00:00:00Z',
    nextFollowUpDate: '2024-01-23T00:00:00Z',
  },
]

// Mock API client
const apiClient = {
  get: async (url: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url === '/api/leads') {
      return { data: mockLeads, total: mockLeads.length }
    }

    if (url.startsWith('/api/leads/')) {
      const id = url.split('/').pop()
      const lead = mockLeads.find((l) => l.id === id)
      if (lead) {
        return { data: lead }
      }
      throw new Error('Lead not found')
    }

    if (url === '/api/leads/stats') {
      const stats: LeadStats = {
        totalLeads: mockLeads.length,
        newLeads: mockLeads.filter((l) => l.status === LeadStatus.NEW).length,
        contactedLeads: mockLeads.filter((l) => l.status === LeadStatus.CONTACTED).length,
        qualifiedLeads: mockLeads.filter((l) => l.status === LeadStatus.QUALIFIED).length,
        proposalSentLeads: mockLeads.filter((l) => l.status === LeadStatus.PROPOSAL_SENT).length,
        negotiationLeads: mockLeads.filter((l) => l.status === LeadStatus.NEGOTIATION).length,
        wonLeads: mockLeads.filter((l) => l.status === LeadStatus.WON).length,
        lostLeads: mockLeads.filter((l) => l.status === LeadStatus.LOST).length,
        disqualifiedLeads: mockLeads.filter((l) => l.status === LeadStatus.DISQUALIFIED).length,
        totalEstimatedValue: mockLeads.reduce((sum, l) => sum + l.financial.estimatedValue, 0),
        averageProbability:
          mockLeads.reduce((sum, l) => sum + l.financial.probability, 0) / mockLeads.length,
        leadsWithFollowUp: mockLeads.filter((l) => l.nextFollowUpDate).length,
        newLeadsThisMonth: mockLeads.filter((l) => {
          const created = new Date(l.createdAt)
          const now = new Date()
          return (
            created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
          )
        }).length,
        newLeadsThisQuarter: mockLeads.filter((l) => {
          const created = new Date(l.createdAt)
          const now = new Date()
          const quarter = Math.floor(now.getMonth() / 3)
          const createdQuarter = Math.floor(created.getMonth() / 3)
          return createdQuarter === quarter && created.getFullYear() === now.getFullYear()
        }).length,
        newLeadsThisYear: mockLeads.filter((l) => {
          const created = new Date(l.createdAt)
          const now = new Date()
          return created.getFullYear() === now.getFullYear()
        }).length,
      }
      return { data: stats }
    }

    throw new Error('Endpoint not found')
  },

  post: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (url === '/api/leads') {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastActivityDate: new Date().toISOString(),
      }
      mockLeads.push(newLead)
      return { data: newLead }
    }

    throw new Error('Endpoint not found')
  },

  put: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (url.startsWith('/api/leads/')) {
      const id = url.split('/').pop()
      const leadIndex = mockLeads.findIndex((l) => l.id === id)

      if (leadIndex === -1) {
        throw new Error('Lead not found')
      }

      const updatedLead: Lead = {
        ...mockLeads[leadIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      }

      mockLeads[leadIndex] = updatedLead
      return { data: updatedLead }
    }

    throw new Error('Endpoint not found')
  },

  delete: async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url.startsWith('/api/leads/')) {
      const id = url.split('/').pop()
      const leadIndex = mockLeads.findIndex((l) => l.id === id)

      if (leadIndex === -1) {
        throw new Error('Lead not found')
      }

      mockLeads.splice(leadIndex, 1)
      return { success: true }
    }

    throw new Error('Endpoint not found')
  },
}

// Lead API service
export const leadApi = {
  // Get all leads with optional filtering
  getLeads: async (
    filters?: LeadFilters,
    pagination?: { page: number; limit: number },
  ): Promise<{ data: Lead[]; total: number }> => {
    try {
      let filteredLeads = [...mockLeads]

      // Apply filters
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        filteredLeads = filteredLeads.filter(
          (lead) =>
            lead.companyName.toLowerCase().includes(search) ||
            lead.leadName.toLowerCase().includes(search) ||
            lead.leadCode.toLowerCase().includes(search),
        )
      }

      if (filters?.status && filters.status.length > 0) {
        filteredLeads = filteredLeads.filter((lead) => filters.status!.includes(lead.status))
      }

      if (filters?.source && filters.source.length > 0) {
        filteredLeads = filteredLeads.filter((lead) => filters.source!.includes(lead.source))
      }

      if (filters?.priority && filters.priority.length > 0) {
        filteredLeads = filteredLeads.filter((lead) => filters.priority!.includes(lead.priority))
      }

      if (filters?.type && filters.type.length > 0) {
        filteredLeads = filteredLeads.filter((lead) => filters.type!.includes(lead.type))
      }

      if (filters?.industry && filters.industry.length > 0) {
        filteredLeads = filteredLeads.filter(
          (lead) => lead.industry && filters.industry!.includes(lead.industry),
        )
      }

      if (filters?.assignedSalesRep && filters.assignedSalesRep.length > 0) {
        filteredLeads = filteredLeads.filter(
          (lead) =>
            lead.assignedSalesRep && filters.assignedSalesRep!.includes(lead.assignedSalesRep),
        )
      }

      if (filters?.assignedTo && filters.assignedTo.length > 0) {
        filteredLeads = filteredLeads.filter(
          (lead) => lead.assignedTo && filters.assignedTo!.includes(lead.assignedTo),
        )
      }

      if (filters?.campaign && filters.campaign.length > 0) {
        filteredLeads = filteredLeads.filter(
          (lead) => lead.campaign && filters.campaign!.includes(lead.campaign),
        )
      }

      if (filters?.hasFollowUp !== undefined) {
        if (filters.hasFollowUp) {
          filteredLeads = filteredLeads.filter((lead) => lead.nextFollowUpDate)
        } else {
          filteredLeads = filteredLeads.filter((lead) => !lead.nextFollowUpDate)
        }
      }

      if (filters?.estimatedValueRange) {
        filteredLeads = filteredLeads.filter(
          (lead) =>
            lead.financial.estimatedValue >= filters.estimatedValueRange!.min &&
            lead.financial.estimatedValue <= filters.estimatedValueRange!.max,
        )
      }

      if (filters?.expectedCloseDateRange) {
        filteredLeads = filteredLeads.filter((lead) => {
          if (!lead.financial.expectedCloseDate) return false
          const closeDate = new Date(lead.financial.expectedCloseDate)
          const fromDate = new Date(filters.expectedCloseDateRange!.from)
          const toDate = new Date(filters.expectedCloseDateRange!.to)
          return closeDate >= fromDate && closeDate <= toDate
        })
      }

      if (filters?.tags && filters.tags.length > 0) {
        filteredLeads = filteredLeads.filter((lead) =>
          filters.tags!.some((tag) => lead.tags.includes(tag)),
        )
      }

      const total = filteredLeads.length

      // Apply pagination
      if (pagination) {
        const start = (pagination.page - 1) * pagination.limit
        const end = start + pagination.limit
        filteredLeads = filteredLeads.slice(start, end)
      }

      return { data: filteredLeads, total }
    } catch (error) {
      console.error('Error fetching leads:', error)
      throw error
    }
  },

  // Get a single lead by ID
  getLead: async (id: string): Promise<Lead> => {
    try {
      const response = await apiClient.get(`/api/leads/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching lead:', error)
      throw error
    }
  },

  // Create a new lead
  createLead: async (data: LeadFormData): Promise<Lead> => {
    try {
      const response = await apiClient.post('/api/leads', data)
      return response.data
    } catch (error) {
      console.error('Error creating lead:', error)
      throw error
    }
  },

  // Update an existing lead
  updateLead: async (id: string, data: Partial<LeadFormData>): Promise<Lead> => {
    try {
      const response = await apiClient.put(`/api/leads/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating lead:', error)
      throw error
    }
  },

  // Delete a lead
  deleteLead: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/leads/${id}`)
    } catch (error) {
      console.error('Error deleting lead:', error)
      throw error
    }
  },

  // Get lead statistics
  getLeadStats: async (): Promise<LeadStats> => {
    try {
      const response = await apiClient.get('/api/leads/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching lead stats:', error)
      throw error
    }
  },

  // Validate lead data
  validateLead: async (data: LeadFormData): Promise<{ valid: boolean; errors: string[] }> => {
    const errors: string[] = []

    if (!data.leadCode?.trim()) {
      errors.push('Lead code is required')
    }

    if (!data.companyName?.trim()) {
      errors.push('Company name is required')
    }

    if (!data.leadName?.trim()) {
      errors.push('Lead name is required')
    }

    if (!data.phone?.trim()) {
      errors.push('Phone is required')
    }

    if (!data.email?.trim()) {
      errors.push('Email is required')
    }

    if (data.financial.estimatedValue < 0) {
      errors.push('Estimated value cannot be negative')
    }

    if (data.financial.probability < 0 || data.financial.probability > 100) {
      errors.push('Probability must be between 0 and 100')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  },

  // Convert lead to customer
  convertLeadToCustomer: async (
    leadId: string,
  ): Promise<{ success: boolean; customerId?: string }> => {
    try {
      // This would typically create a customer record and mark the lead as won
      const lead = mockLeads.find((l) => l.id === leadId)
      if (!lead) {
        throw new Error('Lead not found')
      }

      // Update lead status to won
      lead.status = LeadStatus.WON
      lead.updatedAt = new Date().toISOString()

      // In a real implementation, this would create a customer record
      // For now, we'll just return success
      return { success: true, customerId: `cust-${leadId}` }
    } catch (error) {
      console.error('Error converting lead to customer:', error)
      throw error
    }
  },

  // Schedule follow-up
  scheduleFollowUp: async (leadId: string, followUpDate: string, notes?: string): Promise<Lead> => {
    try {
      const lead = mockLeads.find((l) => l.id === leadId)
      if (!lead) {
        throw new Error('Lead not found')
      }

      lead.nextFollowUpDate = followUpDate
      lead.updatedAt = new Date().toISOString()

      // Add activity
      lead.activities.push({
        id: `act-${Date.now()}`,
        type: 'FOLLOW_UP',
        subject: 'Follow-up Scheduled',
        description: `Follow-up scheduled for ${followUpDate}`,
        date: new Date().toISOString(),
        assignedTo: lead.assignedTo || 'System',
        status: 'PENDING',
        notes,
      })

      return lead
    } catch (error) {
      console.error('Error scheduling follow-up:', error)
      throw error
    }
  },
}
