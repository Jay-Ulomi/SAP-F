import type {
  Customer,
  CustomerFormData,
  CustomerFilters,
  CustomerStats,
  CustomerPagination
} from '../types'
import {
  CustomerStatus,
  CustomerType,
  CustomerIndustry,
  CustomerSource,
  CustomerPriority,
  Currency
} from '../types'

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: '1',
    customerCode: 'CUST001',
    name: 'John Smith',
    companyName: 'Tech Solutions Inc.',
    type: CustomerType.CORPORATE,
    status: CustomerStatus.ACTIVE,
    industry: CustomerIndustry.TECHNOLOGY,
    source: CustomerSource.WEBSITE,
    priority: CustomerPriority.HIGH,
    primaryContact: {
      id: 'contact1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techsolutions.com',
      phone: '+1-555-0123',
      position: 'CEO',
      department: 'Executive',
      isPrimary: true,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    contacts: [
      {
        id: 'contact1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@techsolutions.com',
        phone: '+1-555-0123',
        position: 'CEO',
        department: 'Executive',
        isPrimary: true,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'contact2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@techsolutions.com',
        phone: '+1-555-0124',
        position: 'CTO',
        department: 'Technology',
        isPrimary: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    ],
    addresses: [
      {
        id: 'addr1',
        type: 'BOTH',
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        isDefault: true,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    ],
    financial: {
      id: 'fin1',
      creditLimit: 100000,
      paymentTerms: 'Net 30',
      currency: Currency.USD,
      taxExemption: false,
      discountPercentage: 5,
      creditRating: 'A',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    statistics: {
      id: 'stats1',
      totalOrders: 25,
      totalRevenue: 250000,
      averageOrderValue: 10000,
      lastOrderDate: new Date('2024-06-15'),
      lastOrderValue: 15000,
      totalInvoices: 30,
      outstandingBalance: 15000,
      daysSinceLastOrder: 15,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    activities: [
      {
        id: 'act1',
        type: 'CALL',
        description: 'Follow-up call regarding new project requirements',
        date: new Date('2024-06-20'),
        duration: 30,
        outcome: 'Positive response, project discussion scheduled',
        nextAction: 'Schedule project meeting',
        nextActionDate: new Date('2024-06-25'),
        assignedTo: 'Sales Team',
        createdAt: new Date('2024-06-20'),
        updatedAt: new Date('2024-06-20')
      }
    ],
    website: 'https://techsolutions.com',
    description: 'Leading technology solutions provider',
    notes: 'High-value customer, excellent payment history',
    tags: ['enterprise', 'technology', 'high-value'],
    assignedTo: 'Sales Team',
    leadScore: 95,
    lastActivityDate: new Date('2024-06-20'),
    nextFollowUpDate: new Date('2024-06-25'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    convertedAt: new Date('2024-01-15'),
    lastContactDate: new Date('2024-06-20')
  },
  {
    id: '2',
    customerCode: 'CUST002',
    name: 'Maria Garcia',
    companyName: 'Healthcare Innovations',
    type: CustomerType.SME,
    status: CustomerStatus.ACTIVE,
    industry: CustomerIndustry.HEALTHCARE,
    source: CustomerSource.REFERRAL,
    priority: CustomerPriority.MEDIUM,
    primaryContact: {
      id: 'contact3',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@healthcareinnovations.com',
      phone: '+1-555-0125',
      position: 'Operations Manager',
      department: 'Operations',
      isPrimary: true,
      isActive: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    contacts: [
      {
        id: 'contact3',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@healthcareinnovations.com',
        phone: '+1-555-0125',
        position: 'Operations Manager',
        department: 'Operations',
        isPrimary: true,
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ],
    addresses: [
      {
        id: 'addr2',
        type: 'BOTH',
        street: '456 Health Avenue',
        city: 'Boston',
        state: 'MA',
        postalCode: '02108',
        country: 'USA',
        isDefault: true,
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ],
    financial: {
      id: 'fin2',
      creditLimit: 50000,
      paymentTerms: 'Net 15',
      currency: Currency.USD,
      taxExemption: true,
      taxExemptionNumber: 'TAX-EX-001',
      discountPercentage: 3,
      creditRating: 'B',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    statistics: {
      id: 'stats2',
      totalOrders: 12,
      totalRevenue: 75000,
      averageOrderValue: 6250,
      lastOrderDate: new Date('2024-05-20'),
      lastOrderValue: 8000,
      totalInvoices: 15,
      outstandingBalance: 5000,
      daysSinceLastOrder: 35,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    activities: [
      {
        id: 'act2',
        type: 'EMAIL',
        description: 'Product inquiry for new healthcare solution',
        date: new Date('2024-06-18'),
        outcome: 'Product demo scheduled',
        nextAction: 'Conduct product demonstration',
        nextActionDate: new Date('2024-06-22'),
        assignedTo: 'Sales Team',
        createdAt: new Date('2024-06-18'),
        updatedAt: new Date('2024-06-18')
      }
    ],
    website: 'https://healthcareinnovations.com',
    description: 'Innovative healthcare solutions provider',
    notes: 'Growing customer, interested in new products',
    tags: ['healthcare', 'SME', 'growing'],
    assignedTo: 'Sales Team',
    leadScore: 78,
    lastActivityDate: new Date('2024-06-18'),
    nextFollowUpDate: new Date('2024-06-22'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-18'),
    convertedAt: new Date('2024-02-01'),
    lastContactDate: new Date('2024-06-18')
  }
]

// Customer API service
export const customerApi = {
  // Get all customers with pagination and filters
  async getCustomers(
    page: number = 1,
    limit: number = 10,
    filters?: CustomerFilters
  ): Promise<{ customers: Customer[]; pagination: CustomerPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredCustomers = [...mockCustomers]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredCustomers = filteredCustomers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(searchLower) ||
            customer.companyName?.toLowerCase().includes(searchLower) ||
            customer.customerCode.toLowerCase().includes(searchLower) ||
            customer.primaryContact.email.toLowerCase().includes(searchLower) ||
            customer.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.status!.includes(customer.status)
        )
      }

      if (filters.type && filters.type.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.type!.includes(customer.type)
        )
      }

      if (filters.industry && filters.industry.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.industry!.includes(customer.industry)
        )
      }

      if (filters.source && filters.source.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.source!.includes(customer.source)
        )
      }

      if (filters.priority && filters.priority.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.priority!.includes(customer.priority)
        )
      }

      if (filters.assignedTo && filters.assignedTo.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.assignedTo!.includes(customer.assignedTo)
        )
      }

      if (filters.dateRange) {
        filteredCustomers = filteredCustomers.filter(
          (customer) =>
            customer.createdAt >= filters.dateRange!.start &&
            customer.createdAt <= filters.dateRange!.end
        )
      }

      if (filters.creditRating && filters.creditRating.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          filters.creditRating!.includes(customer.financial.creditRating)
        )
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          customer.tags.some((tag) => filters.tags!.includes(tag))
        )
      }
    }

    // Calculate pagination
    const total = filteredCustomers.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

    return {
      customers: paginatedCustomers,
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

  // Get customer by ID
  async getCustomerById(id: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockCustomers.find((customer) => customer.id === id) || null
  },

  // Create new customer
  async createCustomer(data: CustomerFormData): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCustomer: Customer = {
      id: `customer_${Date.now()}`,
      customerCode: data.customerCode,
      name: data.name,
      companyName: data.companyName,
      type: data.type,
      status: data.status,
      industry: data.industry,
      source: data.source,
      priority: data.priority,
      primaryContact: {
        id: `contact_${Date.now()}`,
        firstName: data.primaryContact.firstName,
        lastName: data.primaryContact.lastName,
        email: data.primaryContact.email,
        phone: data.primaryContact.phone,
        mobile: data.primaryContact.mobile,
        position: data.primaryContact.position,
        department: data.primaryContact.department,
        isPrimary: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      contacts: [
        {
          id: `contact_${Date.now()}`,
          firstName: data.primaryContact.firstName,
          lastName: data.primaryContact.lastName,
          email: data.primaryContact.email,
          phone: data.primaryContact.phone,
          mobile: data.primaryContact.mobile,
          position: data.primaryContact.position,
          department: data.primaryContact.department,
          isPrimary: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      addresses: data.addresses.map((address, index) => ({
        id: `addr_${Date.now()}_${index}`,
        type: address.type,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: address.isDefault,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      financial: {
        id: `fin_${Date.now()}`,
        creditLimit: data.financial.creditLimit,
        paymentTerms: data.financial.paymentTerms,
        currency: data.financial.currency,
        taxExemption: data.financial.taxExemption,
        taxExemptionNumber: data.financial.taxExemptionNumber,
        discountPercentage: data.financial.discountPercentage,
        creditRating: data.financial.creditRating,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statistics: {
        id: `stats_${Date.now()}`,
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalInvoices: 0,
        outstandingBalance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      activities: [],
      website: data.website,
      description: data.description,
      notes: data.notes,
      tags: data.tags,
      assignedTo: data.assignedTo,
      leadScore: data.leadScore,
      createdAt: new Date(),
      updatedAt: new Date(),
      convertedAt: new Date()
    }

    mockCustomers.push(newCustomer)
    return newCustomer
  },

  // Update customer
  async updateCustomer(id: string, data: Partial<CustomerFormData>): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === id)
    if (customerIndex === -1) {
      throw new Error('Customer not found')
    }

    const existingCustomer = mockCustomers[customerIndex]
    
    // Only update fields that are provided and maintain existing structure
    const updatedCustomer: Customer = {
      ...existingCustomer,
      ...(data.customerCode && { customerCode: data.customerCode }),
      ...(data.name && { name: data.name }),
      ...(data.companyName !== undefined && { companyName: data.companyName }),
      ...(data.type && { type: data.type }),
      ...(data.status && { status: data.status }),
      ...(data.industry && { industry: data.industry }),
      ...(data.source && { source: data.source }),
      ...(data.priority && { priority: data.priority }),
      ...(data.website !== undefined && { website: data.website }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.tags && { tags: data.tags }),
      ...(data.assignedTo && { assignedTo: data.assignedTo }),
      ...(data.leadScore && { leadScore: data.leadScore }),
      updatedAt: new Date()
    }

    mockCustomers[customerIndex] = updatedCustomer
    return updatedCustomer
  },

  // Delete customer
  async deleteCustomer(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === id)
    if (customerIndex === -1) {
      throw new Error('Customer not found')
    }

    mockCustomers.splice(customerIndex, 1)
  },

  // Duplicate customer
  async duplicateCustomer(
    id: string,
    newCustomerCode: string,
    newName: string
  ): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const originalCustomer = mockCustomers.find((customer) => customer.id === id)
    if (!originalCustomer) {
      throw new Error('Customer not found')
    }

    const duplicatedCustomer: Customer = {
      ...originalCustomer,
      id: `customer_${Date.now()}`,
      customerCode: newCustomerCode,
      name: newName,
      status: CustomerStatus.PROSPECT,
      statistics: {
        ...originalCustomer.statistics,
        id: `stats_${Date.now()}`,
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalInvoices: 0,
        outstandingBalance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      activities: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockCustomers.push(duplicatedCustomer)
    return duplicatedCustomer
  },

  // Get customer statistics
  async getCustomerStats(): Promise<CustomerStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalCustomers = mockCustomers.length
    const activeCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.ACTIVE).length
    const inactiveCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.INACTIVE).length
    const prospectCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.PROSPECT).length
    const leadCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.LEAD).length

    const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.statistics.totalRevenue, 0)
    const averageRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0

    const customersByType: Record<CustomerType, number> = {
      [CustomerType.INDIVIDUAL]: mockCustomers.filter((c) => c.type === CustomerType.INDIVIDUAL).length,
      [CustomerType.CORPORATE]: mockCustomers.filter((c) => c.type === CustomerType.CORPORATE).length,
      [CustomerType.SME]: mockCustomers.filter((c) => c.type === CustomerType.SME).length,
      [CustomerType.ENTERPRISE]: mockCustomers.filter((c) => c.type === CustomerType.ENTERPRISE).length,
      [CustomerType.PARTNER]: mockCustomers.filter((c) => c.type === CustomerType.PARTNER).length,
      [CustomerType.DISTRIBUTOR]: mockCustomers.filter((c) => c.type === CustomerType.DISTRIBUTOR).length
    }

    const customersByStatus: Record<CustomerStatus, number> = {
      [CustomerStatus.ACTIVE]: activeCustomers,
      [CustomerStatus.INACTIVE]: inactiveCustomers,
      [CustomerStatus.SUSPENDED]: mockCustomers.filter((c) => c.status === CustomerStatus.SUSPENDED).length,
      [CustomerStatus.PROSPECT]: prospectCustomers,
      [CustomerStatus.LEAD]: leadCustomers,
      [CustomerStatus.CANCELLED]: mockCustomers.filter((c) => c.status === CustomerStatus.CANCELLED).length
    }

    const customersByIndustry: Record<CustomerIndustry, number> = {
      [CustomerIndustry.TECHNOLOGY]: mockCustomers.filter((c) => c.industry === CustomerIndustry.TECHNOLOGY).length,
      [CustomerIndustry.HEALTHCARE]: mockCustomers.filter((c) => c.industry === CustomerIndustry.HEALTHCARE).length,
      [CustomerIndustry.FINANCE]: mockCustomers.filter((c) => c.industry === CustomerIndustry.FINANCE).length,
      [CustomerIndustry.MANUFACTURING]: mockCustomers.filter((c) => c.industry === CustomerIndustry.MANUFACTURING).length,
      [CustomerIndustry.RETAIL]: mockCustomers.filter((c) => c.industry === CustomerIndustry.RETAIL).length,
      [CustomerIndustry.EDUCATION]: mockCustomers.filter((c) => c.industry === CustomerIndustry.EDUCATION).length,
      [CustomerIndustry.CONSTRUCTION]: mockCustomers.filter((c) => c.industry === CustomerIndustry.CONSTRUCTION).length,
      [CustomerIndustry.TRANSPORTATION]: mockCustomers.filter((c) => c.industry === CustomerIndustry.TRANSPORTATION).length,
      [CustomerIndustry.ENERGY]: mockCustomers.filter((c) => c.industry === CustomerIndustry.ENERGY).length,
      [CustomerIndustry.TELECOMMUNICATIONS]: mockCustomers.filter((c) => c.industry === CustomerIndustry.TELECOMMUNICATIONS).length,
      [CustomerIndustry.OTHER]: mockCustomers.filter((c) => c.industry === CustomerIndustry.OTHER).length
    }

    const customersByPriority: Record<CustomerPriority, number> = {
      [CustomerPriority.LOW]: mockCustomers.filter((c) => c.priority === CustomerPriority.LOW).length,
      [CustomerPriority.MEDIUM]: mockCustomers.filter((c) => c.priority === CustomerPriority.MEDIUM).length,
      [CustomerPriority.HIGH]: mockCustomers.filter((c) => c.priority === CustomerPriority.HIGH).length,
      [CustomerPriority.CRITICAL]: mockCustomers.filter((c) => c.priority === CustomerPriority.CRITICAL).length
    }

    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      prospectCustomers,
      leadCustomers,
      totalRevenue,
      averageRevenue,
      customersByType,
      customersByStatus,
      customersByIndustry,
      customersByPriority
    }
  },

  // Business logic methods
  async activateCustomer(id: string): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) {
      throw new Error('Customer not found')
    }

    if (customer.status !== CustomerStatus.INACTIVE && customer.status !== CustomerStatus.SUSPENDED) {
      throw new Error('Customer cannot be activated')
    }

    customer.status = CustomerStatus.ACTIVE
    customer.updatedAt = new Date()

    return customer
  },

  async suspendCustomer(id: string): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) {
      throw new Error('Customer not found')
    }

    if (customer.status !== CustomerStatus.ACTIVE) {
      throw new Error('Customer cannot be suspended')
    }

    customer.status = CustomerStatus.SUSPENDED
    customer.updatedAt = new Date()

    return customer
  },

  async convertLeadToCustomer(id: string): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) {
      throw new Error('Customer not found')
    }

    if (customer.status !== CustomerStatus.LEAD) {
      throw new Error('Customer is not a lead')
    }

    customer.status = CustomerStatus.ACTIVE
    customer.convertedAt = new Date()
    customer.updatedAt = new Date()

    return customer
  }
}
