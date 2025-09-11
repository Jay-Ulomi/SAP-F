// Activity Status Enum
export enum ActivityStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
  OVERDUE = 'OVERDUE'
}

// Activity Type Enum
export enum ActivityType {
  CALL = 'CALL',
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  VISIT = 'VISIT',
  QUOTE = 'QUOTE',
  ORDER = 'ORDER',
  COMPLAINT = 'COMPLAINT',
  SUPPORT = 'SUPPORT',
  FOLLOW_UP = 'FOLLOW_UP',
  PRESENTATION = 'PRESENTATION',
  DEMO = 'DEMO',
  TRAINING = 'TRAINING'
}

// Activity Priority Enum
export enum ActivityPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Activity Category Enum
export enum ActivityCategory {
  SALES = 'SALES',
  MARKETING = 'MARKETING',
  SUPPORT = 'SUPPORT',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER'
}

// Activity Outcome Enum
export enum ActivityOutcome {
  SUCCESSFUL = 'SUCCESSFUL',
  PARTIALLY_SUCCESSFUL = 'PARTIALLY_SUCCESSFUL',
  UNSUCCESSFUL = 'UNSUCCESSFUL',
  RESCHEDULED = 'RESCHEDULED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

// Currency Enum
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
  JPY = 'JPY',
  CHF = 'CHF',
  CNY = 'CNY'
}

// Activity Participant Interface
export interface ActivityParticipant {
  id: string
  type: 'CONTACT' | 'CUSTOMER' | 'VENDOR' | 'EMPLOYEE' | 'PARTNER'
  entityId: string
  entityName: string
  entityType: string
  role: 'ORGANIZER' | 'ATTENDEE' | 'REQUIRED' | 'OPTIONAL'
  response: 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'NO_RESPONSE'
  notes?: string
}

// Activity Location Interface
export interface ActivityLocation {
  id: string
  type: 'PHYSICAL' | 'VIRTUAL' | 'HYBRID'
  address?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  virtualMeetingUrl?: string
  virtualMeetingId?: string
  virtualMeetingPassword?: string
  notes?: string
}

// Activity Resource Interface
export interface ActivityResource {
  id: string
  type: 'EQUIPMENT' | 'MATERIAL' | 'ROOM' | 'VEHICLE' | 'OTHER'
  name: string
  description?: string
  quantity: number
  unit: string
  cost: number
  currency: Currency
  notes?: string
}

// Activity Financial Interface
export interface ActivityFinancial {
  budget: number
  actualCost: number
  currency: Currency
  revenue: number
  profit: number
  expenses: number
  notes?: string
}

// Activity Metrics Interface
export interface ActivityMetrics {
  duration: number // in minutes
  participants: number
  materialsUsed: number
  followUpRequired: boolean
  followUpDate?: Date
  satisfactionScore?: number // 1-10
  notes?: string
}

// Main Activity Interface
export interface Activity {
  id: string
  activityCode: string
  title: string
  description?: string
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  category: ActivityCategory
  outcome?: ActivityOutcome
  startDate: Date
  endDate: Date
  dueDate: Date
  assignedTo: string
  participants: ActivityParticipant[]
  location: ActivityLocation
  resources: ActivityResource[]
  financial: ActivityFinancial
  metrics: ActivityMetrics
  tags: string[]
  notes?: string
  attachments: string[]
  relatedActivities: string[]
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  cancelledAt?: Date
}

// Activity Form Data Interface
export interface ActivityFormData {
  activityCode: string
  title: string
  description?: string
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  category: ActivityCategory
  startDate: Date
  endDate: Date
  dueDate: Date
  assignedTo: string
  participants: ActivityParticipant[]
  location: ActivityLocation
  tags: string[]
  notes?: string
}

// Activity Filters Interface
export interface ActivityFilters {
  search?: string
  status?: ActivityStatus
  type?: ActivityType
  category?: ActivityCategory
  priority?: ActivityPriority
  assignedTo?: string
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
  outcome?: ActivityOutcome
}

// Activity Statistics Interface
export interface ActivityStats {
  totalActivities: number
  plannedActivities: number
  inProgressActivities: number
  completedActivities: number
  cancelledActivities: number
  overdueActivities: number
  highPriorityActivities: number
  activitiesThisWeek: number
  activitiesThisMonth: number
  averageCompletionTime: number
  successRate: number
  totalRevenue: number
}

// Activity Pagination Interface
export interface ActivityPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
