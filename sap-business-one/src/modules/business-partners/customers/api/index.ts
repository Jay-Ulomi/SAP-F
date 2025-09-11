import type {
  Customer,
  CustomerFormData,
  CustomerFilters,
  CustomerStats,
  CustomerPagination,
} from '../types'
import { CustomerStatus, CustomerType, PaymentTerms, Currency, TaxExemption } from '../types'

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    customerCode: 'CUST-001',
    customerName: 'ABC Corporation',
    companyName: 'ABC Corporation Ltd.',
    status: CustomerStatus.ACTIVE,
    type: CustomerType.PREMIUM,
    industry: 'Technology',
    website: 'www.abccorp.com',
    phone: '+1-555-0101',
    email: 'contact@abccorp.com',
    fax: '+1-555-0102',
    addresses: [
      {
        id: 'addr-1',
        type: 'BILLING',
        addressLine1: '123 Business Ave',
        addressLine2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        isDefault: true,
        phone: '+1-555-0101',
        email: 'billing@abccorp.com',
      },
      {
        id: 'addr-2',
        type: 'SHIPPING',
        addressLine1: '456 Warehouse Blvd',
        city: 'Newark',
        state: 'NJ',
        postalCode: '07101',
        country: 'USA',
        isDefault: false,
        phone: '+1-555-0103',
      },
    ],
    contacts: [
      {
        id: 'cont-1',
        firstName: 'John',
        lastName: 'Smith',
        position: 'Procurement Manager',
        email: 'john.smith@abccorp.com',
        phone: '+1-555-0104',
        mobile: '+1-555-0105',
        isPrimary: true,
        notes: 'Main contact for all orders',
      },
      {
        id: 'cont-2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        position: 'Accounts Payable',
        email: 'sarah.johnson@abccorp.com',
        phone: '+1-555-0106',
        isPrimary: false,
      },
    ],
    financial: {
      creditLimit: 50000,
      currentBalance: 12500,
      availableCredit: 37500,
      paymentTerms: PaymentTerms.NET_30,
      currency: Currency.USD,
      taxExemption: TaxExemption.NONE,
      discountPercent: 5,
      lastPaymentDate: '2024-01-15',
      lastPaymentAmount: 8500,
    },
    statistics: {
      totalOrders: 45,
      totalRevenue: 125000,
      averageOrderValue: 2778,
      lastOrderDate: '2024-01-20',
      daysSinceLastOrder: 5,
      returnRate: 2.5,
      customerLifetimeValue: 150000,
    },
    notes: 'Premium customer with excellent payment history',
    tags: ['premium', 'technology', 'reliable'],
    assignedSalesRep: 'Mike Johnson',
    source: 'Website',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    lastActivityDate: '2024-01-20T00:00:00Z',
  },
  {
    id: '2',
    customerCode: 'CUST-002',
    customerName: 'XYZ Industries',
    companyName: 'XYZ Industries Inc.',
    status: CustomerStatus.ACTIVE,
    type: CustomerType.WHOLESALE,
    industry: 'Manufacturing',
    website: 'www.xyzindustries.com',
    phone: '+1-555-0201',
    email: 'info@xyzindustries.com',
    addresses: [
      {
        id: 'addr-3',
        type: 'BOTH',
        addressLine1: '789 Industrial Park',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'USA',
        isDefault: true,
        phone: '+1-555-0201',
        email: 'info@xyzindustries.com',
      },
    ],
    contacts: [
      {
        id: 'cont-3',
        firstName: 'Robert',
        lastName: 'Wilson',
        position: 'Purchasing Director',
        email: 'robert.wilson@xyzindustries.com',
        phone: '+1-555-0202',
        isPrimary: true,
      },
    ],
    financial: {
      creditLimit: 75000,
      currentBalance: 0,
      availableCredit: 75000,
      paymentTerms: PaymentTerms.NET_45,
      currency: Currency.USD,
      taxExemption: TaxExemption.NONE,
      discountPercent: 8,
      lastPaymentDate: '2024-01-10',
      lastPaymentAmount: 15000,
    },
    statistics: {
      totalOrders: 28,
      totalRevenue: 89000,
      averageOrderValue: 3179,
      lastOrderDate: '2024-01-18',
      daysSinceLastOrder: 7,
      returnRate: 1.8,
      customerLifetimeValue: 95000,
    },
    notes: 'Wholesale customer with large volume orders',
    tags: ['wholesale', 'manufacturing', 'high-volume'],
    assignedSalesRep: 'Lisa Chen',
    source: 'Trade Show',
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
    lastActivityDate: '2024-01-18T00:00:00Z',
  },
  {
    id: '3',
    customerCode: 'CUST-003',
    customerName: 'Global Retail',
    companyName: 'Global Retail Solutions',
    status: CustomerStatus.PENDING_APPROVAL,
    type: CustomerType.RETAIL,
    industry: 'Retail',
    website: 'www.globalretail.com',
    phone: '+1-555-0301',
    email: 'sales@globalretail.com',
    addresses: [
      {
        id: 'addr-4',
        type: 'BILLING',
        addressLine1: '321 Retail Plaza',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'USA',
        isDefault: true,
        phone: '+1-555-0301',
        email: 'sales@globalretail.com',
      },
    ],
    contacts: [
      {
        id: 'cont-4',
        firstName: 'Maria',
        lastName: 'Garcia',
        position: 'Store Manager',
        email: 'maria.garcia@globalretail.com',
        phone: '+1-555-0302',
        isPrimary: true,
      },
    ],
    financial: {
      creditLimit: 25000,
      currentBalance: 0,
      availableCredit: 25000,
      paymentTerms: PaymentTerms.NET_30,
      currency: Currency.USD,
      taxExemption: TaxExemption.NONE,
      discountPercent: 3,
      lastPaymentDate: undefined,
      lastPaymentAmount: undefined,
    },
    statistics: {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      lastOrderDate: undefined,
      daysSinceLastOrder: 0,
      returnRate: 0,
      customerLifetimeValue: 0,
    },
    notes: 'New retail customer pending approval',
    tags: ['retail', 'new-customer', 'pending'],
    assignedSalesRep: 'David Brown',
    source: 'Cold Call',
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
    lastActivityDate: '2024-01-22T00:00:00Z',
  },
]

// API Service
export const customerApi = {
  // CRUD Operations
  async getCustomers(
    filters?: CustomerFilters,
    pagination?: Partial<CustomerPagination>,
  ): Promise<{ customers: Customer[]; pagination: CustomerPagination }> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredCustomers = [...mockCustomers]

    // Apply filters
    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.customerName.toLowerCase().includes(search) ||
          customer.customerCode.toLowerCase().includes(search) ||
          customer.companyName?.toLowerCase().includes(search) ||
          customer.email.toLowerCase().includes(search),
      )
    }

    if (filters?.status?.length) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        filters.status!.includes(customer.status),
      )
    }

    if (filters?.type?.length) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        filters.type!.includes(customer.type),
      )
    }

    if (filters?.industry?.length) {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.industry && filters.industry!.includes(customer.industry),
      )
    }

    if (filters?.assignedSalesRep?.length) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.assignedSalesRep &&
          filters.assignedSalesRep!.includes(customer.assignedSalesRep),
      )
    }

    if (filters?.hasOutstandingBalance !== undefined) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        filters.hasOutstandingBalance
          ? customer.financial.currentBalance > 0
          : customer.financial.currentBalance === 0,
      )
    }

    if (filters?.creditLimitRange) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.financial.creditLimit >= filters.creditLimitRange!.min &&
          customer.financial.creditLimit <= filters.creditLimitRange!.max,
      )
    }

    if (filters?.tags?.length) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.tags.some((tag) => filters.tags!.includes(tag)),
      )
    }

    // Apply pagination
    const page = pagination?.page || 1
    const limit = pagination?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

    return {
      customers: paginatedCustomers,
      pagination: {
        page,
        limit,
        total: filteredCustomers.length,
        totalPages: Math.ceil(filteredCustomers.length / limit),
      },
    }
  },

  async getCustomer(id: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockCustomers.find((customer) => customer.id === id) || null
  },

  async createCustomer(customerData: CustomerFormData): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customerData,
      addresses: customerData.addresses.map((addr, index) => ({
        ...addr,
        id: `addr-${Date.now()}-${index}`,
      })),
      contacts: customerData.contacts.map((cont, index) => ({
        ...cont,
        id: `cont-${Date.now()}-${index}`,
      })),
      financial: {
        creditLimit: customerData.creditLimit,
        currentBalance: customerData.currentBalance,
        availableCredit: customerData.creditLimit - customerData.currentBalance,
        paymentTerms: customerData.paymentTerms,
        currency: customerData.currency,
        taxExemption: customerData.taxExemption,
        taxExemptionNumber: customerData.taxExemptionNumber,
        discountPercent: customerData.discountPercent,
      },
      statistics: {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        daysSinceLastOrder: 0,
        returnRate: 0,
        customerLifetimeValue: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    mockCustomers.push(newCustomer)
    return newCustomer
  },

  async updateCustomer(
    id: string,
    customerData: Partial<CustomerFormData>,
  ): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === id)
    if (customerIndex === -1) return null

    const existingCustomer = mockCustomers[customerIndex]

    // Handle addresses and contacts separately to preserve IDs
    const updatedAddresses = customerData.addresses
      ? customerData.addresses.map((addr, index) => ({
          ...addr,
          id: existingCustomer.addresses[index]?.id || `addr-${Date.now()}-${index}`,
        }))
      : existingCustomer.addresses

    const updatedContacts = customerData.contacts
      ? customerData.contacts.map((cont, index) => ({
          ...cont,
          id: existingCustomer.contacts[index]?.id || `cont-${Date.now()}-${index}`,
        }))
      : existingCustomer.contacts

    const updatedCustomer: Customer = {
      ...existingCustomer,
      ...customerData,
      addresses: updatedAddresses,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString(),
    }

    mockCustomers[customerIndex] = updatedCustomer
    return updatedCustomer
  },

  async deleteCustomer(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customerIndex = mockCustomers.findIndex((customer) => customer.id === id)
    if (customerIndex === -1) return false

    mockCustomers.splice(customerIndex, 1)
    return true
  },

  // Business Logic Operations
  async activateCustomer(id: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.status = CustomerStatus.ACTIVE
    customer.updatedAt = new Date().toISOString()
    return customer
  },

  async suspendCustomer(id: string, reason?: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.status = CustomerStatus.SUSPENDED
    customer.notes = reason
      ? `${customer.notes || ''}\nSuspended: ${reason}`.trim()
      : customer.notes
    customer.updatedAt = new Date().toISOString()
    return customer
  },

  async blockCustomer(id: string, reason?: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.status = CustomerStatus.BLOCKED
    customer.notes = reason ? `${customer.notes || ''}\nBlocked: ${reason}`.trim() : customer.notes
    customer.updatedAt = new Date().toISOString()
    return customer
  },

  async approveCustomer(id: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.status = CustomerStatus.ACTIVE
    customer.updatedAt = new Date().toISOString()
    return customer
  },

  async updateCreditLimit(id: string, newLimit: number): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.financial.creditLimit = newLimit
    customer.financial.availableCredit = newLimit - customer.financial.currentBalance
    customer.updatedAt = new Date().toISOString()
    return customer
  },

  async recordPayment(id: string, amount: number): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) return null

    customer.financial.currentBalance = Math.max(0, customer.financial.currentBalance - amount)
    customer.financial.availableCredit =
      customer.financial.creditLimit - customer.financial.currentBalance
    customer.financial.lastPaymentDate = new Date().toISOString()
    customer.financial.lastPaymentAmount = amount
    customer.updatedAt = new Date().toISOString()
    customer.lastActivityDate = new Date().toISOString()
    return customer
  },

  // Utility Operations
  async copyCustomer(id: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const originalCustomer = mockCustomers.find((c) => c.id === id)
    if (!originalCustomer) return null

    const copiedCustomer: Customer = {
      ...originalCustomer,
      id: Date.now().toString(),
      customerCode: `${originalCustomer.customerCode}-COPY`,
      customerName: `${originalCustomer.customerName} (Copy)`,
      status: CustomerStatus.PENDING_APPROVAL,
      addresses: originalCustomer.addresses.map((addr, index) => ({
        ...addr,
        id: `addr-${Date.now()}-${index}`,
        isDefault: index === 0,
      })),
      contacts: originalCustomer.contacts.map((cont, index) => ({
        ...cont,
        id: `cont-${Date.now()}-${index}`,
        isPrimary: index === 0,
      })),
      financial: {
        ...originalCustomer.financial,
        currentBalance: 0,
        availableCredit: originalCustomer.financial.creditLimit,
      },
      statistics: {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        daysSinceLastOrder: 0,
        returnRate: 0,
        customerLifetimeValue: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    }

    mockCustomers.push(copiedCustomer)
    return copiedCustomer
  },

  async mergeCustomers(primaryId: string, secondaryId: string): Promise<Customer | null> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const primaryCustomer = mockCustomers.find((c) => c.id === primaryId)
    const secondaryCustomer = mockCustomers.find((c) => c.id === secondaryId)

    if (!primaryCustomer || !secondaryCustomer) return null

    // Merge addresses and contacts
    const mergedAddresses = [...primaryCustomer.addresses, ...secondaryCustomer.addresses]
    const mergedContacts = [...primaryCustomer.contacts, ...secondaryCustomer.contacts]

    // Update primary customer with merged data
    const mergedCustomer: Customer = {
      ...primaryCustomer,
      addresses: mergedAddresses,
      contacts: mergedContacts,
      notes:
        `${primaryCustomer.notes || ''}\nMerged with ${secondaryCustomer.customerName} on ${new Date().toLocaleDateString()}`.trim(),
      updatedAt: new Date().toISOString(),
    }

    // Remove secondary customer
    const secondaryIndex = mockCustomers.findIndex((c) => c.id === secondaryId)
    if (secondaryIndex !== -1) {
      mockCustomers.splice(secondaryIndex, 1)
    }

    // Update primary customer
    const primaryIndex = mockCustomers.findIndex((c) => c.id === primaryId)
    mockCustomers[primaryIndex] = mergedCustomer

    return mergedCustomer
  },

  // Statistics and Analytics
  async getCustomerStats(): Promise<CustomerStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalCustomers = mockCustomers.length
    const activeCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.ACTIVE).length
    const inactiveCustomers = mockCustomers.filter(
      (c) => c.status === CustomerStatus.INACTIVE,
    ).length
    const suspendedCustomers = mockCustomers.filter(
      (c) => c.status === CustomerStatus.SUSPENDED,
    ).length
    const pendingApprovalCustomers = mockCustomers.filter(
      (c) => c.status === CustomerStatus.PENDING_APPROVAL,
    ).length
    const blockedCustomers = mockCustomers.filter((c) => c.status === CustomerStatus.BLOCKED).length

    const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.statistics.totalRevenue, 0)
    const averageCreditLimit =
      mockCustomers.reduce((sum, c) => sum + c.financial.creditLimit, 0) / totalCustomers
    const customersWithOutstandingBalance = mockCustomers.filter(
      (c) => c.financial.currentBalance > 0,
    ).length

    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
    const thisYear = new Date(now.getFullYear(), 0, 1)

    const newCustomersThisMonth = mockCustomers.filter(
      (c) => new Date(c.createdAt) >= thisMonth,
    ).length
    const newCustomersThisQuarter = mockCustomers.filter(
      (c) => new Date(c.createdAt) >= thisQuarter,
    ).length
    const newCustomersThisYear = mockCustomers.filter(
      (c) => new Date(c.createdAt) >= thisYear,
    ).length

    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      suspendedCustomers,
      pendingApprovalCustomers,
      blockedCustomers,
      totalRevenue,
      averageCreditLimit,
      customersWithOutstandingBalance,
      newCustomersThisMonth,
      newCustomersThisQuarter,
      newCustomersThisYear,
    }
  },

  // Validation
  async validateCustomer(
    customerData: CustomerFormData,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const errors: string[] = []

    if (!customerData.customerCode.trim()) {
      errors.push('Customer code is required')
    }

    if (!customerData.customerName.trim()) {
      errors.push('Customer name is required')
    }

    if (!customerData.email.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.push('Invalid email format')
    }

    if (!customerData.phone.trim()) {
      errors.push('Phone is required')
    }

    if (customerData.creditLimit < 0) {
      errors.push('Credit limit cannot be negative')
    }

    if (customerData.discountPercent < 0 || customerData.discountPercent > 100) {
      errors.push('Discount percent must be between 0 and 100')
    }

    if (customerData.addresses.length === 0) {
      errors.push('At least one address is required')
    }

    if (customerData.contacts.length === 0) {
      errors.push('At least one contact is required')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // Filter-specific getters
  getCustomerStatuses(): CustomerStatus[] {
    return Object.values(CustomerStatus)
  },

  getCustomerTypes(): CustomerType[] {
    return Object.values(CustomerType)
  },

  getPaymentTerms(): PaymentTerms[] {
    return Object.values(PaymentTerms)
  },

  getCurrencies(): Currency[] {
    return Object.values(Currency)
  },

  getTaxExemptions(): TaxExemption[] {
    return Object.values(TaxExemption)
  },

  getIndustries(): string[] {
    const industries = mockCustomers
      .map((c) => c.industry)
      .filter((industry): industry is string => industry !== undefined)
    return [...new Set(industries)]
  },

  getSalesReps(): string[] {
    const salesReps = mockCustomers
      .map((c) => c.assignedSalesRep)
      .filter((rep): rep is string => rep !== undefined)
    return [...new Set(salesReps)]
  },

  getSources(): string[] {
    const sources = mockCustomers
      .map((c) => c.source)
      .filter((source): source is string => source !== undefined)
    return [...new Set(sources)]
  },
}
