import type {
  Contact,
  ContactFormData,
  ContactFilters,
  ContactStats,
  ContactPagination
} from '../types'
import {
  ContactStatus,
  ContactType,
  ContactSource,
  ContactPriority,
  ContactCategory,
  Currency
} from '../types'

// Mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    contactCode: 'CONT001',
    firstName: 'John',
    lastName: 'Smith',
    companyName: 'Tech Solutions Inc.',
    jobTitle: 'Sales Manager',
    department: 'Sales',
    type: ContactType.CORPORATE,
    status: ContactStatus.ACTIVE,
    source: ContactSource.REFERRAL,
    priority: ContactPriority.HIGH,
    category: ContactCategory.SALES,
    addresses: [
      {
        id: 'addr1',
        type: 'BOTH',
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        isDefault: true,
        isVerified: true,
        verifiedAt: new Date('2024-01-15')
      }
    ],
    communications: [
      {
        id: 'comm1',
        type: 'EMAIL',
        value: 'john.smith@techsolutions.com',
        isPrimary: true,
        isVerified: true,
        verifiedAt: new Date('2024-01-15')
      },
      {
        id: 'comm2',
        type: 'PHONE',
        value: '+1-555-0123',
        isPrimary: false,
        isVerified: true,
        verifiedAt: new Date('2024-01-15')
      }
    ],
    relationships: [
      {
        id: 'rel1',
        type: 'CUSTOMER',
        entityId: 'cust001',
        entityName: 'Tech Solutions Inc.',
        entityType: 'Company',
        relationshipStrength: 'STRONG',
        startDate: new Date('2023-06-01')
      }
    ],
    activities: [
      {
        id: 'act1',
        type: 'CALL',
        description: 'Follow-up call about new product line',
        date: new Date('2024-01-20'),
        assignedTo: 'Sales Team',
        outcome: 'Interested in demo',
        nextAction: 'Schedule product demonstration',
        nextActionDate: new Date('2024-01-25')
      }
    ],
    financial: {
      creditLimit: 50000,
      paymentTerms: 'Net 30',
      currency: Currency.USD,
      discountPercentage: 5,
      creditRating: 'A',
      outstandingBalance: 0
    },
    statistics: {
      totalInteractions: 15,
      lastInteractionDate: new Date('2024-01-20'),
      daysSinceLastInteraction: 2,
      totalValue: 125000,
      averageInteractionValue: 8333,
      conversionRate: 0.8,
      lifetimeValue: 125000
    },
    website: 'https://techsolutions.com',
    description: 'Key decision maker for enterprise sales',
    notes: 'Very responsive to follow-ups',
    tags: ['enterprise', 'decision-maker', 'high-value'],
    assignedTo: 'Sales Team',
    leadScore: 85,
    nextFollowUpDate: new Date('2024-01-25'),
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-20'),
    convertedAt: new Date('2023-08-15'),
    lastContactDate: new Date('2024-01-20')
  },
  {
    id: '2',
    contactCode: 'CONT002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    companyName: 'Marketing Pro LLC',
    jobTitle: 'Marketing Director',
    department: 'Marketing',
    type: ContactType.CORPORATE,
    status: ContactStatus.PROSPECT,
    source: ContactSource.WEBSITE,
    priority: ContactPriority.MEDIUM,
    category: ContactCategory.MARKETING,
    addresses: [
      {
        id: 'addr2',
        type: 'BILLING',
        street: '456 Marketing Blvd',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'USA',
        isDefault: true,
        isVerified: false
      }
    ],
    communications: [
      {
        id: 'comm3',
        type: 'EMAIL',
        value: 'sarah.j@marketingpro.com',
        isPrimary: true,
        isVerified: false
      }
    ],
    relationships: [],
    activities: [
      {
        id: 'act2',
        type: 'EMAIL',
        description: 'Initial contact about marketing services',
        date: new Date('2024-01-18'),
        assignedTo: 'Marketing Team',
        outcome: 'Requested more information',
        nextAction: 'Send detailed proposal',
        nextActionDate: new Date('2024-01-22')
      }
    ],
    financial: {
      creditLimit: 25000,
      paymentTerms: 'Net 30',
      currency: Currency.USD,
      discountPercentage: 0,
      creditRating: 'B',
      outstandingBalance: 0
    },
    statistics: {
      totalInteractions: 3,
      lastInteractionDate: new Date('2024-01-18'),
      daysSinceLastInteraction: 4,
      totalValue: 0,
      averageInteractionValue: 0,
      conversionRate: 0,
      lifetimeValue: 0
    },
    website: 'https://marketingpro.com',
    description: 'Looking for comprehensive marketing solutions',
    notes: 'Budget constraints, needs ROI justification',
    tags: ['marketing', 'prospect', 'budget-conscious'],
    assignedTo: 'Marketing Team',
    leadScore: 65,
    nextFollowUpDate: new Date('2024-01-22'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    lastContactDate: new Date('2024-01-18')
  },
  {
    id: '3',
    contactCode: 'CONT003',
    firstName: 'Michael',
    lastName: 'Chen',
    companyName: 'Global Supply Co.',
    jobTitle: 'Procurement Manager',
    department: 'Procurement',
    type: ContactType.VENDOR,
    status: ContactStatus.ACTIVE,
    source: ContactSource.TRADE_SHOW,
    priority: ContactPriority.MEDIUM,
    category: ContactCategory.VENDOR,
    addresses: [
      {
        id: 'addr3',
        type: 'SHIPPING',
        street: '789 Supply Chain Way',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'USA',
        isDefault: true,
        isVerified: true,
        verifiedAt: new Date('2023-12-01')
      }
    ],
    communications: [
      {
        id: 'comm4',
        type: 'EMAIL',
        value: 'm.chen@globalsupply.com',
        isPrimary: true,
        isVerified: true,
        verifiedAt: new Date('2023-12-01')
      },
      {
        id: 'comm5',
        type: 'PHONE',
        value: '+1-555-0456',
        isPrimary: false,
        isVerified: true,
        verifiedAt: new Date('2023-12-01')
      }
    ],
    relationships: [
      {
        id: 'rel2',
        type: 'VENDOR',
        entityId: 'vend001',
        entityName: 'Global Supply Co.',
        entityType: 'Company',
        relationshipStrength: 'MODERATE',
        startDate: new Date('2023-09-01')
      }
    ],
    activities: [
      {
        id: 'act3',
        type: 'MEETING',
        description: 'Quarterly vendor review meeting',
        date: new Date('2024-01-15'),
        assignedTo: 'Procurement Team',
        outcome: 'Performance satisfactory',
        nextAction: 'Renew contract',
        nextActionDate: new Date('2024-03-01')
      }
    ],
    financial: {
      creditLimit: 100000,
      paymentTerms: 'Net 45',
      currency: Currency.USD,
      discountPercentage: 2,
      creditRating: 'A',
      outstandingBalance: 15000
    },
    statistics: {
      totalInteractions: 8,
      lastInteractionDate: new Date('2024-01-15'),
      daysSinceLastInteraction: 7,
      totalValue: 75000,
      averageInteractionValue: 9375,
      conversionRate: 0.9,
      lifetimeValue: 75000
    },
    website: 'https://globalsupply.com',
    description: 'Reliable supplier for raw materials',
    notes: 'Good quality, sometimes delayed shipping',
    tags: ['vendor', 'reliable', 'raw-materials'],
    assignedTo: 'Procurement Team',
    leadScore: 75,
    nextFollowUpDate: new Date('2024-03-01'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-15'),
    convertedAt: new Date('2023-10-01'),
    lastContactDate: new Date('2024-01-15')
  }
]

// API implementation
export const contactApi = {
  // Get contacts with pagination and filters
  async getContacts(
    page: number = 1,
    limit: number = 10,
    filters: ContactFilters = {}
  ): Promise<{ contacts: Contact[]; pagination: ContactPagination }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredContacts = [...mockContacts]

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredContacts = filteredContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.companyName?.toLowerCase().includes(searchTerm) ||
        contact.contactCode.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filteredContacts = filteredContacts.filter(contact => contact.status === filters.status)
    }

    if (filters.type) {
      filteredContacts = filteredContacts.filter(contact => contact.type === filters.type)
    }

    if (filters.category) {
      filteredContacts = filteredContacts.filter(contact => contact.category === filters.category)
    }

    if (filters.priority) {
      filteredContacts = filteredContacts.filter(contact => contact.priority === filters.priority)
    }

    if (filters.source) {
      filteredContacts = filteredContacts.filter(contact => contact.source === filters.source)
    }

    if (filters.assignedTo) {
      filteredContacts = filteredContacts.filter(contact => contact.assignedTo === filters.assignedTo)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredContacts = filteredContacts.filter(contact =>
        filters.tags!.some(tag => contact.tags.includes(tag))
      )
    }

    // Calculate pagination
    const total = filteredContacts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex)

    return {
      contacts: paginatedContacts,
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

  // Get contact by ID
  async getContactById(id: string): Promise<Contact | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockContacts.find(contact => contact.id === id) || null
  },

  // Create new contact
  async createContact(data: ContactFormData): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const newContact: Contact = {
      id: Date.now().toString(),
      ...data,
      addresses: data.addresses || [],
      communications: data.communications || [],
      relationships: [],
      activities: [],
      financial: {
        creditLimit: 0,
        paymentTerms: 'Net 30',
        currency: Currency.USD,
        discountPercentage: 0,
        creditRating: 'B',
        outstandingBalance: 0
      },
      statistics: {
        totalInteractions: 0,
        daysSinceLastInteraction: 0,
        totalValue: 0,
        averageInteractionValue: 0,
        conversionRate: 0,
        lifetimeValue: 0
      },
      tags: data.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastContactDate: new Date()
    }

    mockContacts.unshift(newContact)
    return newContact
  },

  // Update existing contact
  async updateContact(id: string, data: Partial<ContactFormData>): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const contactIndex = mockContacts.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
      throw new Error('Contact not found')
    }

    const updatedContact = {
      ...mockContacts[contactIndex],
      ...data,
      updatedAt: new Date()
    }

    mockContacts[contactIndex] = updatedContact
    return updatedContact
  },

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const contactIndex = mockContacts.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
      throw new Error('Contact not found')
    }

    mockContacts.splice(contactIndex, 1)
  },

  // Duplicate contact
  async duplicateContact(
    id: string,
    newContactCode: string,
    newFirstName: string,
    newLastName: string
  ): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const originalContact = mockContacts.find(contact => contact.id === id)
    if (!originalContact) {
      throw new Error('Contact not found')
    }

    const duplicatedContact: Contact = {
      ...originalContact,
      id: Date.now().toString(),
      contactCode: newContactCode,
      firstName: newFirstName,
      lastName: newLastName,
      status: ContactStatus.PROSPECT,
      createdAt: new Date(),
      updatedAt: new Date(),
      convertedAt: undefined,
      lastContactDate: new Date()
    }

    mockContacts.unshift(duplicatedContact)
    return duplicatedContact
  },

  // Get contact statistics
  async getContactStats(): Promise<ContactStats> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const totalContacts = mockContacts.length
    const activeContacts = mockContacts.filter(contact => contact.status === ContactStatus.ACTIVE).length
    const prospectContacts = mockContacts.filter(contact => contact.status === ContactStatus.PROSPECT).length
    const leadContacts = mockContacts.filter(contact => contact.status === ContactStatus.LEAD).length
    const customerContacts = mockContacts.filter(contact => contact.category === ContactCategory.CUSTOMER).length
    const vendorContacts = mockContacts.filter(contact => contact.category === ContactCategory.VENDOR).length
    const partnerContacts = mockContacts.filter(contact => contact.category === ContactCategory.PARTNER).length
    const highPriorityContacts = mockContacts.filter(contact => 
      contact.priority === ContactPriority.HIGH || contact.priority === ContactPriority.CRITICAL
    ).length
    const contactsNeedingFollowUp = mockContacts.filter(contact => 
      contact.nextFollowUpDate && contact.nextFollowUpDate <= new Date()
    ).length

    const totalLeadScore = mockContacts.reduce((sum, contact) => sum + contact.leadScore, 0)
    const averageLeadScore = totalContacts > 0 ? Math.round(totalLeadScore / totalContacts) : 0

    const totalValue = mockContacts.reduce((sum, contact) => sum + contact.statistics.totalValue, 0)
    const totalInteractions = mockContacts.reduce((sum, contact) => sum + contact.statistics.totalInteractions, 0)
    const conversionRate = totalInteractions > 0 ? 
      mockContacts.filter(contact => contact.status === ContactStatus.ACTIVE).length / totalInteractions : 0

    return {
      totalContacts,
      activeContacts,
      prospectContacts,
      leadContacts,
      customerContacts,
      vendorContacts,
      partnerContacts,
      highPriorityContacts,
      contactsNeedingFollowUp,
      averageLeadScore,
      conversionRate: Math.round(conversionRate * 100),
      totalValue
    }
  },

  // Business logic operations
  async activateContact(id: string): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const contact = mockContacts.find(contact => contact.id === id)
    if (!contact) {
      throw new Error('Contact not found')
    }

    contact.status = ContactStatus.ACTIVE
    contact.updatedAt = new Date()
    return contact
  },

  async suspendContact(id: string): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const contact = mockContacts.find(contact => contact.id === id)
    if (!contact) {
      throw new Error('Contact not found')
    }

    contact.status = ContactStatus.SUSPENDED
    contact.updatedAt = new Date()
    return contact
  },

  async convertLeadToContact(id: string): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const contact = mockContacts.find(contact => contact.id === id)
    if (!contact) {
      throw new Error('Contact not found')
    }

    contact.status = ContactStatus.ACTIVE
    contact.convertedAt = new Date()
    contact.updatedAt = new Date()
    return contact
  },

  // Validation
  validateContact(data: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.contactCode.trim()) {
      errors.push('Contact code is required')
    }

    if (!data.firstName.trim()) {
      errors.push('First name is required')
    }

    if (!data.lastName.trim()) {
      errors.push('Last name is required')
    }

    if (!data.type) {
      errors.push('Contact type is required')
    }

    if (!data.status) {
      errors.push('Contact status is required')
    }

    if (!data.source) {
      errors.push('Contact source is required')
    }

    if (!data.priority) {
      errors.push('Contact priority is required')
    }

    if (!data.category) {
      errors.push('Contact category is required')
    }

    if (!data.assignedTo.trim()) {
      errors.push('Assigned to is required')
    }

    if (data.leadScore < 0 || data.leadScore > 100) {
      errors.push('Lead score must be between 0 and 100')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
