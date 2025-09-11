import type {
  Activity,
  ActivityFormData,
  ActivityFilters,
  ActivityStats,
  ActivityPagination
} from '../types'
import {
  ActivityStatus,
  ActivityType,
  ActivityCategory,
  ActivityPriority,
  ActivityOutcome,
  Currency
} from '../types'

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    activityCode: 'ACT001',
    title: 'Product Demo for Tech Solutions Inc.',
    description: 'Demonstrate new product features to key decision makers',
    type: ActivityType.DEMO,
    status: ActivityStatus.COMPLETED,
    priority: ActivityPriority.HIGH,
    category: ActivityCategory.SALES,
    outcome: ActivityOutcome.SUCCESSFUL,
    startDate: new Date('2024-01-20T10:00:00'),
    endDate: new Date('2024-01-20T11:30:00'),
    dueDate: new Date('2024-01-20T11:30:00'),
    assignedTo: 'Sales Team',
    participants: [
      {
        id: 'part1',
        type: 'CUSTOMER',
        entityId: 'cust001',
        entityName: 'Tech Solutions Inc.',
        entityType: 'Company',
        role: 'ATTENDEE',
        response: 'ACCEPTED'
      },
      {
        id: 'part2',
        type: 'CONTACT',
        entityId: 'cont001',
        entityName: 'John Smith',
        entityType: 'Sales Manager',
        role: 'REQUIRED',
        response: 'ACCEPTED'
      }
    ],
    location: {
      id: 'loc1',
      type: 'PHYSICAL',
      address: '123 Business Ave, New York, NY 10001',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    resources: [
      {
        id: 'res1',
        type: 'EQUIPMENT',
        name: 'Projector',
        description: 'High-definition projector for demo',
        quantity: 1,
        unit: 'piece',
        cost: 50,
        currency: Currency.USD
      }
    ],
    financial: {
      budget: 500,
      actualCost: 450,
      currency: Currency.USD,
      revenue: 50000,
      profit: 49550,
      expenses: 450
    },
    metrics: {
      duration: 90,
      participants: 2,
      materialsUsed: 1,
      followUpRequired: true,
      followUpDate: new Date('2024-01-25T14:00:00'),
      satisfactionScore: 9
    },
    tags: ['demo', 'high-value', 'decision-maker'],
    notes: 'Excellent engagement from the client. They showed strong interest in the premium package.',
    attachments: ['demo-presentation.pdf', 'product-specs.pdf'],
    relatedActivities: ['ACT002'],
    createdAt: new Date('2024-01-15T09:00:00'),
    updatedAt: new Date('2024-01-20T12:00:00'),
    completedAt: new Date('2024-01-20T11:30:00')
  },
  {
    id: '2',
    activityCode: 'ACT002',
    title: 'Follow-up Call with Tech Solutions',
    description: 'Follow-up call to discuss proposal and next steps',
    type: ActivityType.CALL,
    status: ActivityStatus.PLANNED,
    priority: ActivityPriority.HIGH,
    category: ActivityCategory.SALES,
    startDate: new Date('2024-01-25T14:00:00'),
    endDate: new Date('2024-01-25T14:30:00'),
    dueDate: new Date('2024-01-25T14:30:00'),
    assignedTo: 'Sales Team',
    participants: [
      {
        id: 'part3',
        type: 'CONTACT',
        entityId: 'cont001',
        entityName: 'John Smith',
        entityType: 'Sales Manager',
        role: 'REQUIRED',
        response: 'NO_RESPONSE'
      }
    ],
    location: {
      id: 'loc2',
      type: 'VIRTUAL',
      virtualMeetingUrl: 'https://meet.google.com/abc-defg-hij',
      virtualMeetingId: 'abc-defg-hij'
    },
    resources: [],
    financial: {
      budget: 0,
      actualCost: 0,
      currency: Currency.USD,
      revenue: 0,
      profit: 0,
      expenses: 0
    },
    metrics: {
      duration: 30,
      participants: 1,
      materialsUsed: 0,
      followUpRequired: false
    },
    tags: ['follow-up', 'proposal', 'high-value'],
    notes: 'Prepare proposal document and pricing details',
    attachments: [],
    relatedActivities: ['ACT001'],
    createdAt: new Date('2024-01-20T12:00:00'),
    updatedAt: new Date('2024-01-20T12:00:00')
  },
  {
    id: '3',
    activityCode: 'ACT003',
    title: 'Marketing Campaign Planning Meeting',
    description: 'Quarterly marketing campaign planning session',
    type: ActivityType.MEETING,
    status: ActivityStatus.IN_PROGRESS,
    priority: ActivityPriority.MEDIUM,
    category: ActivityCategory.MARKETING,
    startDate: new Date('2024-01-22T13:00:00'),
    endDate: new Date('2024-01-22T15:00:00'),
    dueDate: new Date('2024-01-22T15:00:00'),
    assignedTo: 'Marketing Team',
    participants: [
      {
        id: 'part4',
        type: 'EMPLOYEE',
        entityId: 'emp001',
        entityName: 'Marketing Team',
        entityType: 'Department',
        role: 'ORGANIZER',
        response: 'ACCEPTED'
      },
      {
        id: 'part5',
        type: 'EMPLOYEE',
        entityId: 'emp002',
        entityName: 'Sales Team',
        entityType: 'Department',
        role: 'REQUIRED',
        response: 'ACCEPTED'
      }
    ],
    location: {
      id: 'loc3',
      type: 'HYBRID',
      address: 'Conference Room A, 456 Office Blvd',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      virtualMeetingUrl: 'https://zoom.us/j/123456789'
    },
    resources: [
      {
        id: 'res2',
        type: 'ROOM',
        name: 'Conference Room A',
        description: 'Large conference room with AV equipment',
        quantity: 1,
        unit: 'room',
        cost: 100,
        currency: Currency.USD
      }
    ],
    financial: {
      budget: 1000,
      actualCost: 100,
      currency: Currency.USD,
      revenue: 0,
      profit: -100,
      expenses: 100
    },
    metrics: {
      duration: 120,
      participants: 2,
      materialsUsed: 1,
      followUpRequired: true,
      followUpDate: new Date('2024-01-29T10:00:00')
    },
    tags: ['planning', 'quarterly', 'marketing'],
    notes: 'Discuss Q2 marketing strategies and budget allocation',
    attachments: ['q1-results.pdf', 'q2-planning-template.xlsx'],
    relatedActivities: [],
    createdAt: new Date('2024-01-18T10:00:00'),
    updatedAt: new Date('2024-01-22T13:30:00')
  }
]

// API implementation
export const activityApi = {
  // Get activities with pagination and filters
  async getActivities(
    page: number = 1,
    limit: number = 10,
    filters: ActivityFilters = {}
  ): Promise<{ activities: Activity[]; pagination: ActivityPagination }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredActivities = [...mockActivities]

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredActivities = filteredActivities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm) ||
        activity.description?.toLowerCase().includes(searchTerm) ||
        activity.activityCode.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filteredActivities = filteredActivities.filter(activity => activity.status === filters.status)
    }

    if (filters.type) {
      filteredActivities = filteredActivities.filter(activity => activity.type === filters.type)
    }

    if (filters.category) {
      filteredActivities = filteredActivities.filter(activity => activity.category === filters.category)
    }

    if (filters.priority) {
      filteredActivities = filteredActivities.filter(activity => activity.priority === filters.priority)
    }

    if (filters.assignedTo) {
      filteredActivities = filteredActivities.filter(activity => activity.assignedTo === filters.assignedTo)
    }

    if (filters.dateFrom) {
      filteredActivities = filteredActivities.filter(activity => activity.startDate >= filters.dateFrom!)
    }

    if (filters.dateTo) {
      filteredActivities = filteredActivities.filter(activity => activity.startDate <= filters.dateTo!)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredActivities = filteredActivities.filter(activity =>
        filters.tags!.some(tag => activity.tags.includes(tag))
      )
    }

    if (filters.outcome) {
      filteredActivities = filteredActivities.filter(activity => activity.outcome === filters.outcome)
    }

    // Calculate pagination
    const total = filteredActivities.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedActivities = filteredActivities.slice(startIndex, endIndex)

    return {
      activities: paginatedActivities,
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

  // Get activity by ID
  async getActivityById(id: string): Promise<Activity | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockActivities.find(activity => activity.id === id) || null
  },

  // Create new activity
  async createActivity(data: ActivityFormData): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const newActivity: Activity = {
      id: Date.now().toString(),
      ...data,
      participants: data.participants || [],
      location: data.location,
      resources: [],
      financial: {
        budget: 0,
        actualCost: 0,
        currency: Currency.USD,
        revenue: 0,
        profit: 0,
        expenses: 0
      },
      metrics: {
        duration: 0,
        participants: data.participants?.length || 0,
        materialsUsed: 0,
        followUpRequired: false
      },
      tags: data.tags || [],
      attachments: [],
      relatedActivities: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockActivities.unshift(newActivity)
    return newActivity
  },

  // Update existing activity
  async updateActivity(id: string, data: Partial<ActivityFormData>): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const activityIndex = mockActivities.findIndex(activity => activity.id === id)
    if (activityIndex === -1) {
      throw new Error('Activity not found')
    }

    const updatedActivity = {
      ...mockActivities[activityIndex],
      ...data,
      updatedAt: new Date()
    }

    mockActivities[activityIndex] = updatedActivity
    return updatedActivity
  },

  // Delete activity
  async deleteActivity(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const activityIndex = mockActivities.findIndex(activity => activity.id === id)
    if (activityIndex === -1) {
      throw new Error('Activity not found')
    }

    mockActivities.splice(activityIndex, 1)
  },

  // Duplicate activity
  async duplicateActivity(
    id: string,
    newActivityCode: string,
    newTitle: string,
    newStartDate: Date
  ): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const originalActivity = mockActivities.find(activity => activity.id === id)
    if (!originalActivity) {
      throw new Error('Activity not found')
    }

    const duplicatedActivity: Activity = {
      ...originalActivity,
      id: Date.now().toString(),
      activityCode: newActivityCode,
      title: newTitle,
      startDate: newStartDate,
      endDate: new Date(newStartDate.getTime() + (originalActivity.endDate.getTime() - originalActivity.startDate.getTime())),
      dueDate: new Date(newStartDate.getTime() + (originalActivity.dueDate.getTime() - originalActivity.startDate.getTime())),
      status: ActivityStatus.PLANNED,
      outcome: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: undefined,
      cancelledAt: undefined
    }

    mockActivities.unshift(duplicatedActivity)
    return duplicatedActivity
  },

  // Get activity statistics
  async getActivityStats(): Promise<ActivityStats> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const totalActivities = mockActivities.length
    const plannedActivities = mockActivities.filter(activity => activity.status === ActivityStatus.PLANNED).length
    const inProgressActivities = mockActivities.filter(activity => activity.status === ActivityStatus.IN_PROGRESS).length
    const completedActivities = mockActivities.filter(activity => activity.status === ActivityStatus.COMPLETED).length
    const cancelledActivities = mockActivities.filter(activity => activity.status === ActivityStatus.CANCELLED).length
    const overdueActivities = mockActivities.filter(activity => 
      activity.status !== ActivityStatus.COMPLETED && 
      activity.status !== ActivityStatus.CANCELLED &&
      activity.dueDate < new Date()
    ).length

    const highPriorityActivities = mockActivities.filter(activity => 
      activity.priority === ActivityPriority.HIGH || activity.priority === ActivityPriority.CRITICAL
    ).length

    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const activitiesThisWeek = mockActivities.filter(activity => 
      activity.startDate >= oneWeekAgo
    ).length

    const activitiesThisMonth = mockActivities.filter(activity => 
      activity.startDate >= oneMonthAgo
    ).length

    const completedActivitiesList = mockActivities.filter(activity => 
      activity.status === ActivityStatus.COMPLETED && activity.completedAt
    )

    const averageCompletionTime = completedActivitiesList.length > 0 ? 
      completedActivitiesList.reduce((sum, activity) => {
        const duration = activity.completedAt!.getTime() - activity.createdAt.getTime()
        return sum + duration
      }, 0) / completedActivitiesList.length / (1000 * 60 * 60 * 24) : 0 // in days

    const successRate = completedActivitiesList.length > 0 ? 
      (completedActivitiesList.filter(activity => activity.outcome === ActivityOutcome.SUCCESSFUL).length / completedActivitiesList.length) * 100 : 0

    const totalRevenue = mockActivities.reduce((sum, activity) => sum + activity.financial.revenue, 0)

    return {
      totalActivities,
      plannedActivities,
      inProgressActivities,
      completedActivities,
      cancelledActivities,
      overdueActivities,
      highPriorityActivities,
      activitiesThisWeek,
      activitiesThisMonth,
      averageCompletionTime: Math.round(averageCompletionTime * 10) / 10,
      successRate: Math.round(successRate),
      totalRevenue
    }
  },

  // Business logic operations
  async startActivity(id: string): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const activity = mockActivities.find(activity => activity.id === id)
    if (!activity) {
      throw new Error('Activity not found')
    }

    activity.status = ActivityStatus.IN_PROGRESS
    activity.updatedAt = new Date()
    return activity
  },

  async completeActivity(id: string, outcome: ActivityOutcome): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const activity = mockActivities.find(activity => activity.id === id)
    if (!activity) {
      throw new Error('Activity not found')
    }

    activity.status = ActivityStatus.COMPLETED
    activity.outcome = outcome
    activity.completedAt = new Date()
    activity.updatedAt = new Date()
    return activity
  },

  async cancelActivity(id: string): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const activity = mockActivities.find(activity => activity.id === id)
    if (!activity) {
      throw new Error('Activity not found')
    }

    activity.status = ActivityStatus.CANCELLED
    activity.cancelledAt = new Date()
    activity.updatedAt = new Date()
    return activity
  },

  // Validation
  validateActivity(data: ActivityFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.activityCode.trim()) {
      errors.push('Activity code is required')
    }

    if (!data.title.trim()) {
      errors.push('Title is required')
    }

    if (!data.type) {
      errors.push('Activity type is required')
    }

    if (!data.status) {
      errors.push('Activity status is required')
    }

    if (!data.priority) {
      errors.push('Activity priority is required')
    }

    if (!data.category) {
      errors.push('Activity category is required')
    }

    if (!data.startDate) {
      errors.push('Start date is required')
    }

    if (!data.endDate) {
      errors.push('End date is required')
    }

    if (!data.dueDate) {
      errors.push('Due date is required')
    }

    if (!data.assignedTo.trim()) {
      errors.push('Assigned to is required')
    }

    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      errors.push('Start date must be before end date')
    }

    if (data.dueDate && data.startDate && data.dueDate < data.startDate) {
      errors.push('Due date must be after start date')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
