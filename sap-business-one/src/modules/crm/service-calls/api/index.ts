import type {
  ServiceCall,
  ServiceCallFormData,
  ServiceCallFilters,
  ServiceCallStats,
  ServiceCallPagination,
  ServiceCallStatus,
  ServiceCallPriority,
  ServiceCallType,
  ServiceCallCategory,
  ServiceCallSource,
  ServiceCallResolution,
} from '../types'
import {
  ServiceCallStatus as Status,
  ServiceCallPriority as Priority,
  ServiceCallType as Type,
  ServiceCallCategory as Category,
  ServiceCallSource as Source,
  ServiceCallResolution as Resolution,
  Currency,
} from '../types'

// Mock data for development
const mockServiceCalls: ServiceCall[] = [
  {
    id: 'sc-001',
    serviceCallCode: 'SC-2024-001',
    title: 'Database Connection Issue',
    description:
      'Users are experiencing intermittent database connection failures during peak hours.',
    status: Status.IN_PROGRESS,
    priority: Priority.HIGH,
    type: Type.TECHNICAL_SUPPORT,
    category: Category.DATABASE,
    source: Source.EMAIL,
    customerId: 'CUST-001',
    customerName: 'TechCorp Solutions',
    assignedTo: 'John Smith',
    contacts: [
      {
        id: 'contact-1',
        contactId: 'CONT-001',
        contactName: 'Sarah Johnson',
        contactEmail: 'sarah.johnson@techcorp.com',
        contactPhone: '+1-555-0101',
        role: 'REPORTER',
        isPrimary: true,
        notes: 'IT Manager',
      },
    ],
    activities: [
      {
        id: 'activity-1',
        type: 'NOTE',
        subject: 'Initial investigation started',
        description: 'Reviewing database logs and monitoring connection patterns',
        date: new Date('2024-01-15T09:00:00Z'),
        duration: 60,
        assignedTo: 'John Smith',
        outcome: 'NEUTRAL',
        notes: 'Found increased connection pool usage during peak hours',
      },
    ],
    financial: {
      totalCost: 450.0,
      laborCost: 400.0,
      materialCost: 0.0,
      travelCost: 0.0,
      otherCost: 50.0,
      billableAmount: 600.0,
      currency: Currency.USD,
      billingStatus: 'BILLABLE',
      billingNotes: 'Premium support rate applied',
    },
    timeline: {
      reportedDate: new Date('2024-01-15T08:00:00Z'),
      assignedDate: new Date('2024-01-15T08:30:00Z'),
      firstResponseDate: new Date('2024-01-15T09:00:00Z'),
      slaTargetDate: new Date('2024-01-17T08:00:00Z'),
      estimatedResolutionDate: new Date('2024-01-16T17:00:00Z'),
      slaCompliance: 'ON_TIME',
      notes: 'Within SLA timeframe',
    },
    sla: {
      slaLevel: 'PREMIUM',
      responseTime: 4,
      resolutionTime: 48,
      businessHours: true,
      priority: Priority.HIGH,
      category: Category.DATABASE,
      notes: 'Premium SLA with 4-hour response time',
    },
    estimatedHours: 8,
    actualHours: 6,
    tags: ['database', 'performance', 'connection'],
    notes: 'Critical issue affecting multiple users during business hours',
    attachments: ['db_logs.pdf', 'error_screenshots.zip'],
    relatedServiceCalls: ['sc-002'],
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T15:00:00Z'),
    createdBy: 'Sarah Johnson',
    updatedBy: 'John Smith',
  },
  {
    id: 'sc-002',
    serviceCallCode: 'SC-2024-002',
    title: 'User Access Permission Request',
    description: 'New employee needs access to financial reporting module',
    status: Status.OPEN,
    priority: Priority.MEDIUM,
    type: Type.USER_ACCESS,
    category: Category.USER_ACCESS,
    source: Source.WEB_FORM,
    customerId: 'CUST-001',
    customerName: 'TechCorp Solutions',
    assignedTo: 'Jane Doe',
    contacts: [
      {
        id: 'contact-2',
        contactId: 'CONT-002',
        contactName: 'Mike Wilson',
        contactEmail: 'mike.wilson@techcorp.com',
        contactPhone: '+1-555-0102',
        role: 'REPORTER',
        isPrimary: true,
        notes: 'HR Manager',
      },
    ],
    activities: [],
    financial: {
      totalCost: 0.0,
      laborCost: 0.0,
      materialCost: 0.0,
      travelCost: 0.0,
      otherCost: 0.0,
      billableAmount: 0.0,
      currency: Currency.USD,
      billingStatus: 'NOT_BILLABLE',
      billingNotes: 'Standard user access setup included in support contract',
    },
    timeline: {
      reportedDate: new Date('2024-01-16T10:00:00Z'),
      slaTargetDate: new Date('2024-01-18T10:00:00Z'),
      estimatedResolutionDate: new Date('2024-01-17T17:00:00Z'),
      slaCompliance: 'ON_TIME',
      notes: 'Standard access request processing',
    },
    sla: {
      slaLevel: 'STANDARD',
      responseTime: 24,
      resolutionTime: 72,
      businessHours: true,
      priority: Priority.MEDIUM,
      category: Category.USER_ACCESS,
      notes: 'Standard SLA for user access requests',
    },
    estimatedHours: 2,
    actualHours: 0,
    tags: ['user-access', 'permissions', 'onboarding'],
    notes: 'Standard user access setup for new employee',
    attachments: [],
    relatedServiceCalls: ['sc-001'],
    createdAt: new Date('2024-01-16T10:00:00Z'),
    updatedAt: new Date('2024-01-16T10:00:00Z'),
    createdBy: 'Mike Wilson',
    updatedBy: 'Mike Wilson',
  },
]

// API functions
export const serviceCallApi = {
  // Get all service calls with pagination and filters
  async getServiceCalls(
    page: number = 1,
    limit: number = 10,
    filters: ServiceCallFilters = {},
  ): Promise<{ serviceCalls: ServiceCall[]; pagination: ServiceCallPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredServiceCalls = [...mockServiceCalls]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) =>
          sc.title.toLowerCase().includes(searchLower) ||
          sc.description.toLowerCase().includes(searchLower) ||
          sc.serviceCallCode.toLowerCase().includes(searchLower) ||
          sc.customerName.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filteredServiceCalls = filteredServiceCalls.filter((sc) => sc.status === filters.status)
    }

    if (filters.priority) {
      filteredServiceCalls = filteredServiceCalls.filter((sc) => sc.priority === filters.priority)
    }

    if (filters.type) {
      filteredServiceCalls = filteredServiceCalls.filter((sc) => sc.type === filters.type)
    }

    if (filters.category) {
      filteredServiceCalls = filteredServiceCalls.filter((sc) => sc.category === filters.category)
    }

    if (filters.source) {
      filteredServiceCalls = filteredServiceCalls.filter((sc) => sc.source === filters.source)
    }

    if (filters.assignedTo) {
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) => sc.assignedTo === filters.assignedTo,
      )
    }

    if (filters.customerId) {
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) => sc.customerId === filters.customerId,
      )
    }

    if (filters.reportedDateFrom) {
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) => sc.timeline.reportedDate >= filters.reportedDateFrom!,
      )
    }

    if (filters.reportedDateTo) {
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) => sc.timeline.reportedDate <= filters.reportedDateTo!,
      )
    }

    if (filters.slaCompliance) {
      filteredServiceCalls = filteredServiceCalls.filter(
        (sc) => sc.timeline.slaCompliance === filters.slaCompliance,
      )
    }

    // Calculate pagination
    const total = filteredServiceCalls.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedServiceCalls = filteredServiceCalls.slice(startIndex, endIndex)

    const pagination: ServiceCallPagination = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }

    return {
      serviceCalls: paginatedServiceCalls,
      pagination,
    }
  },

  // Get service call by ID
  async getServiceCallById(id: string): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const serviceCall = mockServiceCalls.find((sc) => sc.id === id)
    if (!serviceCall) {
      throw new Error('Service call not found')
    }

    return serviceCall
  },

  // Create new service call
  async createServiceCall(data: ServiceCallFormData): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const newServiceCall: ServiceCall = {
      id: `sc-${Date.now()}`,
      serviceCallCode: data.serviceCallCode,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      type: data.type,
      category: data.category,
      source: data.source,
      customerId: data.customerId,
      customerName: data.customerName,
      assignedTo: data.assignedTo,
      contacts: data.contacts.map((contact, index) => ({
        ...contact,
        id: `contact-${Date.now()}-${index}`,
        isPrimary: index === 0,
      })),
      activities: [],
      financial: {
        totalCost: 0,
        laborCost: 0,
        materialCost: 0,
        travelCost: 0,
        otherCost: 0,
        billableAmount: 0,
        currency: Currency.USD,
        billingStatus: 'NOT_BILLABLE',
      },
      timeline: {
        reportedDate: new Date(),
        slaCompliance: 'NOT_APPLICABLE',
      },
      sla: {
        slaLevel: 'STANDARD',
        responseTime: 24,
        resolutionTime: 72,
        businessHours: true,
        priority: data.priority,
        category: data.category,
      },
      estimatedHours: data.estimatedHours,
      actualHours: data.actualHours,
      tags: data.tags,
      notes: data.notes,
      attachments: [],
      relatedServiceCalls: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Current User',
      updatedBy: 'Current User',
    }

    mockServiceCalls.unshift(newServiceCall)
    return newServiceCall
  },

  // Update service call
  async updateServiceCall(id: string, data: Partial<ServiceCallFormData>): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    const updatedServiceCall = {
      ...mockServiceCalls[index],
      ...data,
      updatedAt: new Date(),
      updatedBy: 'Current User',
    }

    mockServiceCalls[index] = updatedServiceCall
    return updatedServiceCall
  },

  // Delete service call
  async deleteServiceCall(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    mockServiceCalls.splice(index, 1)
  },

  // Duplicate service call
  async duplicateServiceCall(
    id: string,
    newServiceCallCode: string,
    newTitle: string,
    newCustomerName: string,
  ): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const originalServiceCall = mockServiceCalls.find((sc) => sc.id === id)
    if (!originalServiceCall) {
      throw new Error('Service call not found')
    }

    const duplicatedServiceCall: ServiceCall = {
      ...originalServiceCall,
      id: `sc-${Date.now()}`,
      serviceCallCode: newServiceCallCode,
      title: newTitle,
      customerName: newCustomerName,
      status: Status.OPEN,
      timeline: {
        ...originalServiceCall.timeline,
        reportedDate: new Date(),
        assignedDate: undefined,
        firstResponseDate: undefined,
        resolutionDate: undefined,
        closedDate: undefined,
        slaBreachDate: undefined,
        estimatedResolutionDate: undefined,
        actualResolutionDate: undefined,
        totalResolutionTime: undefined,
        slaCompliance: 'NOT_APPLICABLE',
      },
      activities: [],
      financial: {
        ...originalServiceCall.financial,
        totalCost: 0,
        laborCost: 0,
        materialCost: 0,
        travelCost: 0,
        otherCost: 0,
        billableAmount: 0,
        billingStatus: 'NOT_BILLABLE',
      },
      estimatedHours: originalServiceCall.estimatedHours,
      actualHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Current User',
      updatedBy: 'Current User',
    }

    mockServiceCalls.unshift(duplicatedServiceCall)
    return duplicatedServiceCall
  },

  // Get service call statistics
  async getServiceCallStats(): Promise<ServiceCallStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalServiceCalls = mockServiceCalls.length
    const openServiceCalls = mockServiceCalls.filter(
      (sc) => sc.status === Status.OPEN || sc.status === Status.IN_PROGRESS,
    ).length
    const resolvedServiceCalls = mockServiceCalls.filter(
      (sc) => sc.status === Status.RESOLVED,
    ).length
    const closedServiceCalls = mockServiceCalls.filter((sc) => sc.status === Status.CLOSED).length

    const totalCost = mockServiceCalls.reduce((sum, sc) => sum + sc.financial.totalCost, 0)
    const averageCost = totalServiceCalls > 0 ? totalCost / totalServiceCalls : 0

    const priorityDistribution = {
      [Priority.LOW]: mockServiceCalls.filter((sc) => sc.priority === Priority.LOW).length,
      [Priority.MEDIUM]: mockServiceCalls.filter((sc) => sc.priority === Priority.MEDIUM).length,
      [Priority.HIGH]: mockServiceCalls.filter((sc) => sc.priority === Priority.HIGH).length,
      [Priority.CRITICAL]: mockServiceCalls.filter((sc) => sc.priority === Priority.CRITICAL)
        .length,
    }

    const categoryDistribution = {
      [Category.SOFTWARE]: mockServiceCalls.filter((sc) => sc.category === Category.SOFTWARE)
        .length,
      [Category.HARDWARE]: mockServiceCalls.filter((sc) => sc.category === Category.HARDWARE)
        .length,
      [Category.NETWORK]: mockServiceCalls.filter((sc) => sc.category === Category.NETWORK).length,
      [Category.DATABASE]: mockServiceCalls.filter((sc) => sc.category === Category.DATABASE)
        .length,
      [Category.SECURITY]: mockServiceCalls.filter((sc) => sc.category === Category.SECURITY)
        .length,
      [Category.USER_ACCESS]: mockServiceCalls.filter((sc) => sc.category === Category.USER_ACCESS)
        .length,
      [Category.INTEGRATION]: mockServiceCalls.filter((sc) => sc.category === Category.INTEGRATION)
        .length,
      [Category.REPORTING]: mockServiceCalls.filter((sc) => sc.category === Category.REPORTING)
        .length,
      [Category.WORKFLOW]: mockServiceCalls.filter((sc) => sc.category === Category.WORKFLOW)
        .length,
      [Category.OTHER]: mockServiceCalls.filter((sc) => sc.category === Category.OTHER).length,
    }

    const statusDistribution = {
      [Status.OPEN]: mockServiceCalls.filter((sc) => sc.status === Status.OPEN).length,
      [Status.IN_PROGRESS]: mockServiceCalls.filter((sc) => sc.status === Status.IN_PROGRESS)
        .length,
      [Status.ON_HOLD]: mockServiceCalls.filter((sc) => sc.status === Status.ON_HOLD).length,
      [Status.RESOLVED]: mockServiceCalls.filter((sc) => sc.status === Status.RESOLVED).length,
      [Status.CLOSED]: mockServiceCalls.filter((sc) => sc.status === Status.CLOSED).length,
      [Status.CANCELLED]: mockServiceCalls.filter((sc) => sc.status === Status.CANCELLED).length,
    }

    // Calculate average resolution time (simplified)
    const resolvedCalls = mockServiceCalls.filter((sc) => sc.timeline.actualResolutionDate)
    const averageResolutionTime = resolvedCalls.length > 0 ? 24 : 0 // Simplified calculation

    // Calculate SLA compliance rate
    const slaCompliantCalls = mockServiceCalls.filter(
      (sc) => sc.timeline.slaCompliance === 'ON_TIME',
    ).length
    const slaComplianceRate =
      totalServiceCalls > 0 ? (slaCompliantCalls / totalServiceCalls) * 100 : 0

    return {
      totalServiceCalls,
      openServiceCalls,
      resolvedServiceCalls,
      closedServiceCalls,
      averageResolutionTime,
      slaComplianceRate,
      totalCost,
      averageCost,
      priorityDistribution,
      categoryDistribution,
      statusDistribution,
    }
  },

  // Business logic functions
  async updateStatus(id: string, newStatus: ServiceCallStatus): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    const updatedServiceCall = {
      ...mockServiceCalls[index],
      status: newStatus,
      updatedAt: new Date(),
      updatedBy: 'Current User',
    }

    // Update timeline based on status change
    if (newStatus === Status.IN_PROGRESS && !updatedServiceCall.timeline.assignedDate) {
      updatedServiceCall.timeline.assignedDate = new Date()
    }

    if (newStatus === Status.RESOLVED && !updatedServiceCall.timeline.resolutionDate) {
      updatedServiceCall.timeline.resolutionDate = new Date()
      updatedServiceCall.timeline.actualResolutionDate = new Date()
    }

    if (newStatus === Status.CLOSED && !updatedServiceCall.timeline.closedDate) {
      updatedServiceCall.timeline.closedDate = new Date()
    }

    mockServiceCalls[index] = updatedServiceCall
    return updatedServiceCall
  },

  async updatePriority(id: string, newPriority: ServiceCallPriority): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    const updatedServiceCall = {
      ...mockServiceCalls[index],
      priority: newPriority,
      updatedAt: new Date(),
      updatedBy: 'Current User',
    }

    mockServiceCalls[index] = updatedServiceCall
    return updatedServiceCall
  },

  async assignServiceCall(id: string, assignedTo: string): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    const updatedServiceCall = {
      ...mockServiceCalls[index],
      assignedTo,
      timeline: {
        ...mockServiceCalls[index].timeline,
        assignedDate: new Date(),
      },
      updatedAt: new Date(),
      updatedBy: 'Current User',
    }

    mockServiceCalls[index] = updatedServiceCall
    return updatedServiceCall
  },

  async addActivity(id: string, activity: Omit<ServiceCallActivity, 'id'>): Promise<ServiceCall> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockServiceCalls.findIndex((sc) => sc.id === id)
    if (index === -1) {
      throw new Error('Service call not found')
    }

    const newActivity: ServiceCallActivity = {
      ...activity,
      id: `activity-${Date.now()}`,
    }

    const updatedServiceCall = {
      ...mockServiceCalls[index],
      activities: [...mockServiceCalls[index].activities, newActivity],
      updatedAt: new Date(),
      updatedBy: 'Current User',
    }

    mockServiceCalls[index] = updatedServiceCall
    return updatedServiceCall
  },
}
