import type {
  ContactPerson,
  ContactPersonFormData,
  ContactPersonFilters,
  ContactPersonStats,
  ContactPersonPagination,
} from '../types'
import {
  ContactType,
  ContactStatus,
  ContactCategory,
  PreferredContactMethod,
} from '../types'

// Mock data
const mockContacts: ContactPerson[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    title: 'Mr.',
    position: 'Sales Manager',
    department: 'Sales',
    companyId: 'cust-001',
    companyName: 'ABC Corporation',
    contactType: [ContactType.PRIMARY, ContactType.DECISION_MAKER],
    status: ContactStatus.ACTIVE,
    category: ContactCategory.CUSTOMER,
    isPrimary: true,
    preferredContactMethod: PreferredContactMethod.EMAIL,
    email: 'john.smith@abccorp.com',
    phone: '+1-555-0123',
    mobile: '+1-555-0124',
    addressLine1: '123 Business Ave',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    notes: 'Key decision maker for enterprise sales',
    tags: ['enterprise', 'decision-maker', 'sales'],
    birthday: '1980-05-15',
    language: 'English',
    timezone: 'America/New_York',
    doNotContact: false,
    marketingOptIn: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
    relatedCustomerIds: ['cust-001'],
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'Ms.',
    position: 'Accounts Payable Manager',
    department: 'Finance',
    companyId: 'vend-001',
    companyName: 'XYZ Supplies',
    contactType: [ContactType.BILLING, ContactType.ACCOUNTS_PAYABLE],
    status: ContactStatus.ACTIVE,
    category: ContactCategory.VENDOR,
    isPrimary: true,
    preferredContactMethod: PreferredContactMethod.PHONE,
    email: 'sarah.johnson@xyzsupplies.com',
    phone: '+1-555-0456',
    addressLine1: '456 Vendor Street',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60601',
    country: 'USA',
    notes: 'Primary contact for billing and payments',
    tags: ['billing', 'finance', 'vendor'],
    language: 'English',
    timezone: 'America/Chicago',
    doNotContact: false,
    marketingOptIn: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
    relatedVendorIds: ['vend-001'],
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Chen',
    title: 'Dr.',
    position: 'Technical Director',
    department: 'Engineering',
    companyId: 'part-001',
    companyName: 'Tech Partners Inc',
    contactType: [ContactType.TECHNICAL, ContactType.DECISION_MAKER],
    status: ContactStatus.ACTIVE,
    category: ContactCategory.PARTNER,
    isPrimary: true,
    preferredContactMethod: PreferredContactMethod.EMAIL,
    email: 'michael.chen@techpartners.com',
    phone: '+1-555-0789',
    mobile: '+1-555-0790',
    addressLine1: '789 Tech Boulevard',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    country: 'USA',
    notes: 'Technical lead for partnership projects',
    tags: ['technical', 'engineering', 'partner'],
    linkedIn: 'linkedin.com/in/michaelchen',
    website: 'techpartners.com',
    language: 'English',
    timezone: 'America/Los_Angeles',
    doNotContact: false,
    marketingOptIn: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    title: 'Ms.',
    position: 'Marketing Manager',
    department: 'Marketing',
    companyId: 'lead-001',
    companyName: 'Growth Prospects LLC',
    contactType: [ContactType.SALES, ContactType.DECISION_MAKER],
    status: ContactStatus.ACTIVE,
    category: ContactCategory.PROSPECT,
    isPrimary: true,
    preferredContactMethod: PreferredContactMethod.MOBILE,
    email: 'emily.davis@growthprospects.com',
    phone: '+1-555-0321',
    mobile: '+1-555-0322',
    addressLine1: '321 Prospect Lane',
    city: 'Boston',
    state: 'MA',
    postalCode: '02101',
    country: 'USA',
    notes: 'Interested in enterprise marketing solutions',
    tags: ['prospect', 'marketing', 'enterprise'],
    birthday: '1985-08-22',
    language: 'English',
    timezone: 'America/New_York',
    doNotContact: false,
    marketingOptIn: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
    relatedLeadIds: ['lead-001'],
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    title: 'Mr.',
    position: 'IT Support Specialist',
    department: 'IT',
    companyId: 'int-001',
    companyName: 'Internal Company',
    contactType: [ContactType.SUPPORT, ContactType.TECHNICAL],
    status: ContactStatus.ACTIVE,
    category: ContactCategory.INTERNAL,
    isPrimary: false,
    preferredContactMethod: PreferredContactMethod.EMAIL,
    email: 'david.wilson@internal.com',
    phone: '+1-555-0654',
    mobile: '+1-555-0655',
    addressLine1: '100 Internal Drive',
    city: 'Austin',
    state: 'TX',
    postalCode: '73301',
    country: 'USA',
    notes: 'Internal IT support contact',
    tags: ['internal', 'it', 'support'],
    language: 'English',
    timezone: 'America/Chicago',
    doNotContact: false,
    marketingOptIn: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    updatedBy: 'System',
  },
]

// Mock API client
const apiClient = {
  get: async (url: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url === '/api/contacts') {
      return { data: mockContacts, total: mockContacts.length }
    }

    if (url.startsWith('/api/contacts/')) {
      const id = url.split('/').pop()
      const contact = mockContacts.find((c) => c.id === id)
      if (contact) {
        return { data: contact }
      }
      throw new Error('Contact not found')
    }

    if (url === '/api/contacts/stats') {
      const stats: ContactPersonStats = {
        totalContacts: mockContacts.length,
        activeContacts: mockContacts.filter((c) => c.status === ContactStatus.ACTIVE).length,
        primaryContacts: mockContacts.filter((c) => c.isPrimary).length,
        customerContacts: mockContacts.filter((c) => c.category === ContactCategory.CUSTOMER).length,
        vendorContacts: mockContacts.filter((c) => c.category === ContactCategory.VENDOR).length,
        partnerContacts: mockContacts.filter((c) => c.category === ContactCategory.PARTNER).length,
        internalContacts: mockContacts.filter((c) => c.category === ContactCategory.INTERNAL).length,
        prospectContacts: mockContacts.filter((c) => c.category === ContactCategory.PROSPECT).length,
        contactsByType: {
          [ContactType.PRIMARY]: mockContacts.filter((c) => c.contactType.includes(ContactType.PRIMARY)).length,
          [ContactType.BILLING]: mockContacts.filter((c) => c.contactType.includes(ContactType.BILLING)).length,
          [ContactType.SHIPPING]: mockContacts.filter((c) => c.contactType.includes(ContactType.SHIPPING)).length,
          [ContactType.TECHNICAL]: mockContacts.filter((c) => c.contactType.includes(ContactType.TECHNICAL)).length,
          [ContactType.DECISION_MAKER]: mockContacts.filter((c) => c.contactType.includes(ContactType.DECISION_MAKER)).length,
          [ContactType.ACCOUNTS_PAYABLE]: mockContacts.filter((c) => c.contactType.includes(ContactType.ACCOUNTS_PAYABLE)).length,
          [ContactType.ACCOUNTS_RECEIVABLE]: mockContacts.filter((c) => c.contactType.includes(ContactType.ACCOUNTS_RECEIVABLE)).length,
          [ContactType.SALES]: mockContacts.filter((c) => c.contactType.includes(ContactType.SALES)).length,
          [ContactType.SUPPORT]: mockContacts.filter((c) => c.contactType.includes(ContactType.SUPPORT)).length,
          [ContactType.OTHER]: mockContacts.filter((c) => c.contactType.includes(ContactType.OTHER)).length,
        },
        contactsByStatus: {
          [ContactStatus.ACTIVE]: mockContacts.filter((c) => c.status === ContactStatus.ACTIVE).length,
          [ContactStatus.INACTIVE]: mockContacts.filter((c) => c.status === ContactStatus.INACTIVE).length,
          [ContactStatus.FORMER_EMPLOYEE]: mockContacts.filter((c) => c.status === ContactStatus.FORMER_EMPLOYEE).length,
          [ContactStatus.ON_LEAVE]: mockContacts.filter((c) => c.status === ContactStatus.ON_LEAVE).length,
        },
        contactsByCategory: {
          [ContactCategory.CUSTOMER]: mockContacts.filter((c) => c.category === ContactCategory.CUSTOMER).length,
          [ContactCategory.VENDOR]: mockContacts.filter((c) => c.category === ContactCategory.VENDOR).length,
          [ContactCategory.PARTNER]: mockContacts.filter((c) => c.category === ContactCategory.PARTNER).length,
          [ContactCategory.INTERNAL]: mockContacts.filter((c) => c.category === ContactCategory.INTERNAL).length,
          [ContactCategory.PROSPECT]: mockContacts.filter((c) => c.category === ContactCategory.PROSPECT).length,
        },
        contactsByPreferredMethod: {
          [PreferredContactMethod.EMAIL]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.EMAIL).length,
          [PreferredContactMethod.PHONE]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.PHONE).length,
          [PreferredContactMethod.MOBILE]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.MOBILE).length,
          [PreferredContactMethod.FAX]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.FAX).length,
          [PreferredContactMethod.MAIL]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.MAIL).length,
          [PreferredContactMethod.IN_PERSON]: mockContacts.filter((c) => c.preferredContactMethod === PreferredContactMethod.IN_PERSON).length,
        },
        contactsWithEmail: mockContacts.filter((c) => c.email).length,
        contactsWithPhone: mockContacts.filter((c) => c.phone).length,
        contactsWithAddress: mockContacts.filter((c) => c.addressLine1).length,
        newContactsThisMonth: mockContacts.filter((c) => {
          const created = new Date(c.createdAt)
          const now = new Date()
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
        }).length,
        newContactsThisQuarter: mockContacts.filter((c) => {
          const created = new Date(c.createdAt)
          const now = new Date()
          const quarter = Math.floor(now.getMonth() / 3)
          const createdQuarter = Math.floor(created.getMonth() / 3)
          return createdQuarter === quarter && created.getFullYear() === now.getFullYear()
        }).length,
        newContactsThisYear: mockContacts.filter((c) => {
          const created = new Date(c.createdAt)
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

    if (url === '/api/contacts') {
      const newContact: ContactPerson = {
        id: `contact-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User',
        updatedBy: 'Current User',
      }
      mockContacts.push(newContact)
      return { data: newContact }
    }

    throw new Error('Endpoint not found')
  },

  put: async (url: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (url.startsWith('/api/contacts/')) {
      const id = url.split('/').pop()
      const contactIndex = mockContacts.findIndex((c) => c.id === id)

      if (contactIndex === -1) {
        throw new Error('Contact not found')
      }

      const updatedContact: ContactPerson = {
        ...mockContacts[contactIndex],
        ...data,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Current User',
      }

      mockContacts[contactIndex] = updatedContact
      return { data: updatedContact }
    }

    throw new Error('Endpoint not found')
  },

  delete: async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (url.startsWith('/api/contacts/')) {
      const id = url.split('/').pop()
      const contactIndex = mockContacts.findIndex((c) => c.id === id)

      if (contactIndex === -1) {
        throw new Error('Contact not found')
      }

      mockContacts.splice(contactIndex, 1)
      return { success: true }
    }

    throw new Error('Endpoint not found')
  },
}

// Contact Persons API service
export const contactPersonApi = {
  // Get all contacts with optional filtering
  getContacts: async (
    filters?: ContactPersonFilters,
    pagination?: { page: number; limit: number },
  ): Promise<{ data: ContactPerson[]; total: number }> => {
    try {
      let filteredContacts = [...mockContacts]

      // Apply filters
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        filteredContacts = filteredContacts.filter(
          (contact) =>
            contact.firstName.toLowerCase().includes(search) ||
            contact.lastName.toLowerCase().includes(search) ||
            contact.email.toLowerCase().includes(search) ||
            contact.companyName?.toLowerCase().includes(search) ||
            contact.position?.toLowerCase().includes(search),
        )
      }

      if (filters?.contactType && filters.contactType.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          contact.contactType.some((type) => filters.contactType!.includes(type)),
        )
      }

      if (filters?.status && filters.status.length > 0) {
        filteredContacts = filteredContacts.filter((contact) => filters.status!.includes(contact.status))
      }

      if (filters?.category && filters.category.length > 0) {
        filteredContacts = filteredContacts.filter((contact) => filters.category!.includes(contact.category))
      }

      if (filters?.companyId) {
        filteredContacts = filteredContacts.filter((contact) => contact.companyId === filters.companyId)
      }

      if (filters?.isPrimary !== undefined) {
        filteredContacts = filteredContacts.filter((contact) => contact.isPrimary === filters.isPrimary)
      }

      if (filters?.preferredContactMethod && filters.preferredContactMethod.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          filters.preferredContactMethod!.includes(contact.preferredContactMethod),
        )
      }

      if (filters?.hasEmail !== undefined) {
        if (filters.hasEmail) {
          filteredContacts = filteredContacts.filter((contact) => contact.email)
        } else {
          filteredContacts = filteredContacts.filter((contact) => !contact.email)
        }
      }

      if (filters?.hasPhone !== undefined) {
        if (filters.hasPhone) {
          filteredContacts = filteredContacts.filter((contact) => contact.phone)
        } else {
          filteredContacts = filteredContacts.filter((contact) => !contact.phone)
        }
      }

      if (filters?.tags && filters.tags.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          filters.tags!.some((tag) => contact.tags.includes(tag)),
        )
      }

      if (filters?.department && filters.department.length > 0) {
        filteredContacts = filteredContacts.filter((contact) =>
          contact.department && filters.department!.includes(contact.department),
        )
      }

      if (filters?.doNotContact !== undefined) {
        filteredContacts = filteredContacts.filter((contact) => contact.doNotContact === filters.doNotContact)
      }

      if (filters?.marketingOptIn !== undefined) {
        filteredContacts = filteredContacts.filter((contact) => contact.marketingOptIn === filters.marketingOptIn)
      }

      if (filters?.createdDateRange) {
        filteredContacts = filteredContacts.filter((contact) => {
          const created = new Date(contact.createdAt)
          const start = new Date(filters.createdDateRange!.start)
          const end = new Date(filters.createdDateRange!.end)
          return created >= start && created <= end
        })
      }

      const total = filteredContacts.length

      // Apply pagination
      if (pagination) {
        const start = (pagination.page - 1) * pagination.limit
        const end = start + pagination.limit
        filteredContacts = filteredContacts.slice(start, end)
      }

      return { data: filteredContacts, total }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw error
    }
  },

  // Get a single contact by ID
  getContact: async (id: string): Promise<ContactPerson> => {
    try {
      const response = await apiClient.get(`/api/contacts/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching contact:', error)
      throw error
    }
  },

  // Create a new contact
  createContact: async (data: ContactPersonFormData): Promise<ContactPerson> => {
    try {
      const response = await apiClient.post('/api/contacts', data)
      return response.data
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error
    }
  },

  // Update an existing contact
  updateContact: async (id: string, data: Partial<ContactPersonFormData>): Promise<ContactPerson> => {
    try {
      const response = await apiClient.put(`/api/contacts/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating contact:', error)
      throw error
    }
  },

  // Delete a contact
  deleteContact: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/contacts/${id}`)
    } catch (error) {
      console.error('Error deleting contact:', error)
      throw error
    }
  },

  // Get contact statistics
  getContactStats: async (): Promise<ContactPersonStats> => {
    try {
      const response = await apiClient.get('/api/contacts/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching contact stats:', error)
      throw error
    }
  },

  // Validate contact data
  validateContact: async (data: ContactPersonFormData): Promise<{ valid: boolean; errors: string[] }> => {
    const errors: string[] = []

    if (!data.firstName?.trim()) {
      errors.push('First name is required')
    }

    if (!data.lastName?.trim()) {
      errors.push('Last name is required')
    }

    if (!data.email?.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email format is invalid')
    }

    if (data.contactType.length === 0) {
      errors.push('At least one contact type must be selected')
    }

    if (data.birthday && new Date(data.birthday) > new Date()) {
      errors.push('Birthday cannot be in the future')
    }

    if (data.anniversary && new Date(data.anniversary) > new Date()) {
      errors.push('Anniversary cannot be in the future')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  },

  // Set primary contact for a company
  setPrimaryContact: async (contactId: string, companyId: string): Promise<ContactPerson> => {
    try {
      // Remove primary from other contacts in the same company
      mockContacts.forEach((contact) => {
        if (contact.companyId === companyId && contact.id !== contactId) {
          contact.isPrimary = false
          contact.updatedAt = new Date().toISOString()
          contact.updatedBy = 'Current User'
        }
      })

      // Set the specified contact as primary
      const contact = mockContacts.find((c) => c.id === contactId)
      if (!contact) {
        throw new Error('Contact not found')
      }

      contact.isPrimary = true
      contact.updatedAt = new Date().toISOString()
      contact.updatedBy = 'Current User'

      return contact
    } catch (error) {
      console.error('Error setting primary contact:', error)
      throw error
    }
  },

  // Duplicate contact
  duplicateContact: async (id: string, newFirstName: string, newLastName: string, newEmail: string): Promise<ContactPerson> => {
    try {
      const originalContact = mockContacts.find((c) => c.id === id)
      if (!originalContact) {
        throw new Error('Contact not found')
      }

      const duplicatedContact: ContactPerson = {
        ...originalContact,
        id: `contact-${Date.now()}`,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        isPrimary: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User',
        updatedBy: 'Current User',
      }

      mockContacts.push(duplicatedContact)
      return duplicatedContact
    } catch (error) {
      console.error('Error duplicating contact:', error)
      throw error
    }
  },
}
