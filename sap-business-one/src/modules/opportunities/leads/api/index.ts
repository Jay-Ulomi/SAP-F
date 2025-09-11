import type { Lead, LeadFormData, LeadFilters, LeadStats, LeadPagination } from '../types'
import { LeadStatus, LeadPriority, LeadSource } from '../types'

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'L-1',
    leadCode: 'LEAD-2024-001',
    title: 'ERP for Retail Chain',
    description: 'Multi-store ERP implementation',
    status: LeadStatus.QUALIFIED,
    priority: LeadPriority.HIGH,
    source: LeadSource.REFERRAL,
    assignedTo: 'Jane Doe',
    company: {
      name: 'RetailWorks Inc',
      industry: 'Retail',
      size: 'MID_MARKET',
      website: 'https://retailworks.example.com',
      country: 'US',
    },
    contact: {
      id: 'LC-1',
      name: 'Peter Miles',
      email: 'peter.miles@retailworks.com',
      phone: '+1-555-0101',
      title: 'Operations Director',
    },
    activities: [
      {
        id: 'LA-1',
        type: 'CALL',
        subject: 'Discovery call',
        date: new Date('2024-01-10'),
        notes: 'Discussed overall scope and goals',
        outcome: 'POSITIVE',
        nextAction: 'Schedule demo',
        nextActionDate: new Date('2024-01-17'),
      },
    ],
    tags: ['retail', 'erp'],
    notes: 'High potential account',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'L-2',
    leadCode: 'LEAD-2024-002',
    title: 'Cloud migration inquiry',
    status: LeadStatus.NEW,
    priority: LeadPriority.MEDIUM,
    source: LeadSource.WEBSITE,
    assignedTo: 'John Smith',
    company: { name: 'FinServe LLC', industry: 'Finance', size: 'SMB', country: 'US' },
    contact: { id: 'LC-2', name: 'Anna Lee', email: 'anna@finserve.com' },
    activities: [],
    tags: ['cloud'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
]

export const leadApi = {
  async getLeads(
    page: number = 1,
    limit: number = 10,
    filters?: LeadFilters,
  ): Promise<{ leads: Lead[]; pagination: LeadPagination }> {
    await new Promise((r) => setTimeout(r, 200))

    let leads = [...mockLeads]

    // Filters
    if (filters) {
      if (filters.search) {
        const s = filters.search.toLowerCase()
        leads = leads.filter(
          (l) =>
            l.title.toLowerCase().includes(s) ||
            l.leadCode.toLowerCase().includes(s) ||
            l.company.name.toLowerCase().includes(s) ||
            l.contact.name.toLowerCase().includes(s),
        )
      }
      if (filters.status) leads = leads.filter((l) => l.status === filters.status)
      if (filters.priority) leads = leads.filter((l) => l.priority === filters.priority)
      if (filters.source) leads = leads.filter((l) => l.source === filters.source)
      if (filters.assignedTo) leads = leads.filter((l) => l.assignedTo === filters.assignedTo)
      if (filters.tags && filters.tags.length)
        leads = leads.filter((l) => filters.tags!.some((t) => l.tags.includes(t)))
      if (filters.dateFrom) leads = leads.filter((l) => l.createdAt >= filters.dateFrom!)
      if (filters.dateTo) leads = leads.filter((l) => l.createdAt <= filters.dateTo!)
    }

    const total = leads.length
    const totalPages = Math.ceil(total / limit) || 1
    const start = (page - 1) * limit
    const slice = leads.slice(start, start + limit)

    return {
      leads: slice,
      pagination: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
    }
  },

  async getLeadById(id: string): Promise<Lead | null> {
    await new Promise((r) => setTimeout(r, 120))
    return mockLeads.find((l) => l.id === id) || null
  },

  async createLead(data: LeadFormData): Promise<Lead> {
    await new Promise((r) => setTimeout(r, 200))
    const lead: Lead = {
      id: `L-${Date.now()}`,
      ...data,
      activities: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockLeads.unshift(lead)
    return lead
  },

  async updateLead(id: string, data: Partial<LeadFormData>): Promise<Lead | null> {
    await new Promise((r) => setTimeout(r, 200))
    const idx = mockLeads.findIndex((l) => l.id === id)
    if (idx === -1) return null
    const updated: Lead = { ...mockLeads[idx], ...data, updatedAt: new Date() }
    mockLeads[idx] = updated
    return updated
  },

  async deleteLead(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 120))
    const idx = mockLeads.findIndex((l) => l.id === id)
    if (idx === -1) return false
    mockLeads.splice(idx, 1)
    return true
  },

  async getLeadStats(): Promise<LeadStats> {
    await new Promise((r) => setTimeout(r, 120))
    const totalLeads = mockLeads.length
    const newLeads = mockLeads.filter((l) => l.status === LeadStatus.NEW).length
    const contactedLeads = mockLeads.filter((l) => l.status === LeadStatus.CONTACTED).length
    const qualifiedLeads = mockLeads.filter((l) => l.status === LeadStatus.QUALIFIED).length
    const disqualifiedLeads = mockLeads.filter((l) => l.status === LeadStatus.DISQUALIFIED).length
    const convertedLeads = mockLeads.filter((l) => l.status === LeadStatus.CONVERTED).length
    const conversionRate = totalLeads ? Math.round((convertedLeads / totalLeads) * 100) : 0
    return {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      disqualifiedLeads,
      convertedLeads,
      conversionRate,
    }
  },

  validateLead(data: LeadFormData): string[] {
    const errors: string[] = []
    if (!data.leadCode?.trim()) errors.push('Lead code is required')
    if (!data.title?.trim()) errors.push('Title is required')
    if (!data.contact?.name?.trim()) errors.push('Contact name is required')
    if (!data.contact?.email?.trim()) errors.push('Contact email is required')
    if (!data.company?.name?.trim()) errors.push('Company name is required')
    if (!data.assignedTo?.trim()) errors.push('Assigned to is required')
    return errors
  },
}
