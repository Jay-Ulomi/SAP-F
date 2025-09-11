import type {
  PaymentWizard,
  PaymentWizardFormData,
  PaymentWizardFilters,
  PaymentWizardPagination,
  PaymentWizardStats,
  PaymentStep,
  PaymentWizardStep,
} from '../types'
import { PaymentWizardStatus, PaymentWizardType, PaymentPriority, Currency } from '../types'

// Mock data
const mockPaymentSteps: PaymentStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Payment Details',
    description: 'Configure basic payment information',
    isRequired: true,
    isCompleted: false,
    isSkippable: false,
    validationRules: ['amount', 'currency', 'paymentMethod'],
    estimatedTime: 5,
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Recipients',
    description: 'Add payment recipients',
    isRequired: true,
    isCompleted: false,
    isSkippable: false,
    validationRules: ['recipients', 'amounts'],
    estimatedTime: 10,
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Payment Method',
    description: 'Select payment method and bank account',
    isRequired: true,
    isCompleted: false,
    isSkippable: false,
    validationRules: ['paymentMethod', 'bankAccount'],
    estimatedTime: 3,
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Schedule',
    description: 'Set payment schedule and timing',
    isRequired: false,
    isCompleted: false,
    isSkippable: true,
    validationRules: ['schedule'],
    estimatedTime: 2,
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Review & Approve',
    description: 'Review payment details and approve',
    isRequired: true,
    isCompleted: false,
    isSkippable: false,
    validationRules: ['approval'],
    estimatedTime: 5,
  },
]

const mockPaymentWizards: PaymentWizard[] = [
  {
    id: 'PW-1',
    wizardNumber: 'PW-2024-001',
    wizardType: PaymentWizardType.BATCH_PAYMENT,
    title: 'Monthly Vendor Payments',
    description: 'Process monthly payments to key vendors',
    status: PaymentWizardStatus.COMPLETED,
    priority: PaymentPriority.NORMAL,
    totalAmount: 125000.0,
    currency: 'USD',
    paymentCount: 15,
    completedPayments: 15,
    failedPayments: 0,
    createdBy: 'admin',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T11:30:00Z'),
    completedAt: new Date('2024-01-15T11:30:00Z'),
    approvedBy: 'manager',
    approvedAt: new Date('2024-01-15T11:00:00Z'),
    notes: 'All payments processed successfully',
  },
  {
    id: 'PW-2',
    wizardNumber: 'PW-2024-002',
    wizardType: PaymentWizardType.PAYROLL_PAYMENT,
    title: 'Q1 2024 Payroll',
    description: 'Quarterly payroll processing for all employees',
    status: PaymentWizardStatus.IN_PROGRESS,
    priority: PaymentPriority.HIGH,
    totalAmount: 250000.0,
    currency: 'USD',
    paymentCount: 45,
    completedPayments: 30,
    failedPayments: 2,
    createdBy: 'hr-admin',
    createdAt: new Date('2024-01-20T09:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
    notes: 'Processing employee payments',
  },
  {
    id: 'PW-3',
    wizardNumber: 'PW-2024-003',
    wizardType: PaymentWizardType.SINGLE_PAYMENT,
    title: 'Emergency Vendor Payment',
    description: 'Urgent payment to critical supplier',
    status: PaymentWizardStatus.PENDING_APPROVAL,
    priority: PaymentPriority.URGENT,
    totalAmount: 50000.0,
    currency: 'USD',
    paymentCount: 1,
    completedPayments: 0,
    failedPayments: 0,
    createdBy: 'procurement',
    createdAt: new Date('2024-01-22T16:00:00Z'),
    updatedAt: new Date('2024-01-22T16:00:00Z'),
    notes: 'Requires immediate approval',
  },
  {
    id: 'PW-4',
    wizardNumber: 'PW-2024-004',
    wizardType: PaymentWizardType.RECURRING_PAYMENT,
    title: 'Monthly Rent Payment',
    description: 'Automated monthly rent payment setup',
    status: PaymentWizardStatus.DRAFT,
    priority: PaymentPriority.NORMAL,
    totalAmount: 15000.0,
    currency: 'USD',
    paymentCount: 12,
    completedPayments: 0,
    failedPayments: 0,
    createdBy: 'admin',
    createdAt: new Date('2024-01-25T10:00:00Z'),
    updatedAt: new Date('2024-01-25T10:00:00Z'),
    notes: 'Setting up recurring payment schedule',
  },
]

// API Functions
export const getPaymentWizards = async (
  filters?: PaymentWizardFilters,
  pagination?: Partial<PaymentWizardPagination>,
): Promise<{ wizards: PaymentWizard[]; pagination: PaymentWizardPagination }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredWizards = [...mockPaymentWizards]

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredWizards = filteredWizards.filter((w) => w.status === filters.status)
    }
    if (filters.wizardType) {
      filteredWizards = filteredWizards.filter((w) => w.wizardType === filters.wizardType)
    }
    if (filters.priority) {
      filteredWizards = filteredWizards.filter((w) => w.priority === filters.priority)
    }
    if (filters.createdBy) {
      filteredWizards = filteredWizards.filter((w) => w.createdBy === filters.createdBy)
    }
    if (filters.dateFrom) {
      filteredWizards = filteredWizards.filter((w) => w.createdAt >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredWizards = filteredWizards.filter((w) => w.createdAt <= filters.dateTo!)
    }
    if (filters.amountMin) {
      filteredWizards = filteredWizards.filter((w) => w.totalAmount >= filters.amountMin!)
    }
    if (filters.amountMax) {
      filteredWizards = filteredWizards.filter((w) => w.totalAmount <= filters.amountMax!)
    }
  }

  // Apply pagination
  const page = pagination?.page || 1
  const limit = pagination?.limit || 10
  const total = filteredWizards.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedWizards = filteredWizards.slice(startIndex, endIndex)

  return {
    wizards: paginatedWizards,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export const getPaymentWizardById = async (id: string): Promise<PaymentWizard | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPaymentWizards.find((wizard) => wizard.id === id) || null
}

export const createPaymentWizard = async (data: PaymentWizardFormData): Promise<PaymentWizard> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newWizard: PaymentWizard = {
    id: `PW-${Date.now()}`,
    wizardNumber: `PW-2024-${String(mockPaymentWizards.length + 1).padStart(3, '0')}`,
    wizardType: data.wizardType,
    title: data.title,
    description: data.description,
    status: PaymentWizardStatus.DRAFT,
    priority: data.priority,
    totalAmount: 0,
    currency: data.currency,
    paymentCount: 0,
    completedPayments: 0,
    failedPayments: 0,
    createdBy: 'current-user',
    createdAt: new Date(),
    updatedAt: new Date(),
    notes: data.notes,
  }

  mockPaymentWizards.push(newWizard)
  return newWizard
}

export const updatePaymentWizard = async (
  id: string,
  data: Partial<PaymentWizardFormData>,
): Promise<PaymentWizard> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const wizardIndex = mockPaymentWizards.findIndex((w) => w.id === id)
  if (wizardIndex === -1) {
    throw new Error('Payment wizard not found')
  }

  const existingWizard = mockPaymentWizards[wizardIndex]
  const updatedWizard: PaymentWizard = {
    ...existingWizard,
    ...data,
    updatedAt: new Date(),
  }

  mockPaymentWizards[wizardIndex] = updatedWizard
  return updatedWizard
}

export const deletePaymentWizard = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const wizardIndex = mockPaymentWizards.findIndex((w) => w.id === id)
  if (wizardIndex === -1) {
    throw new Error('Payment wizard not found')
  }

  mockPaymentWizards.splice(wizardIndex, 1)
}

export const getPaymentWizardStats = async (): Promise<PaymentWizardStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalWizards = mockPaymentWizards.length
  const activeWizards = mockPaymentWizards.filter(
    (w) => w.status === PaymentWizardStatus.IN_PROGRESS,
  ).length
  const completedWizards = mockPaymentWizards.filter(
    (w) => w.status === PaymentWizardStatus.COMPLETED,
  ).length
  const failedWizards = mockPaymentWizards.filter(
    (w) => w.status === PaymentWizardStatus.FAILED,
  ).length
  const totalAmount = mockPaymentWizards.reduce((sum, w) => sum + w.totalAmount, 0)
  const averageWizardAmount = totalWizards > 0 ? totalAmount / totalWizards : 0
  const averageCompletionTime = 45 // minutes

  const wizardsByType = Object.values(PaymentWizardType).reduce(
    (acc, type) => {
      acc[type] = mockPaymentWizards.filter((w) => w.wizardType === type).length
      return acc
    },
    {} as Record<PaymentWizardType, number>,
  )

  const wizardsByStatus = Object.values(PaymentWizardStatus).reduce(
    (acc, status) => {
      acc[status] = mockPaymentWizards.filter((w) => w.status === status).length
      return acc
    },
    {} as Record<PaymentWizardStatus, number>,
  )

  const wizardsByPriority = Object.values(PaymentPriority).reduce(
    (acc, priority) => {
      acc[priority] = mockPaymentWizards.filter((w) => w.priority === priority).length
      return acc
    },
    {} as Record<PaymentPriority, number>,
  )

  return {
    totalWizards,
    activeWizards,
    completedWizards,
    failedWizards,
    totalAmount,
    averageWizardAmount,
    averageCompletionTime,
    wizardsByType,
    wizardsByStatus,
    wizardsByPriority,
  }
}

export const startPaymentWizard = async (id: string): Promise<PaymentWizard> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const wizardIndex = mockPaymentWizards.findIndex((w) => w.id === id)
  if (wizardIndex === -1) {
    throw new Error('Payment wizard not found')
  }

  const updatedWizard: PaymentWizard = {
    ...mockPaymentWizards[wizardIndex],
    status: PaymentWizardStatus.IN_PROGRESS,
    updatedAt: new Date(),
  }

  mockPaymentWizards[wizardIndex] = updatedWizard
  return updatedWizard
}

export const completePaymentWizard = async (id: string): Promise<PaymentWizard> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const wizardIndex = mockPaymentWizards.findIndex((w) => w.id === id)
  if (wizardIndex === -1) {
    throw new Error('Payment wizard not found')
  }

  const updatedWizard: PaymentWizard = {
    ...mockPaymentWizards[wizardIndex],
    status: PaymentWizardStatus.COMPLETED,
    completedAt: new Date(),
    updatedAt: new Date(),
  }

  mockPaymentWizards[wizardIndex] = updatedWizard
  return updatedWizard
}

export const approvePaymentWizard = async (id: string): Promise<PaymentWizard> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const wizardIndex = mockPaymentWizards.findIndex((w) => w.id === id)
  if (wizardIndex === -1) {
    throw new Error('Payment wizard not found')
  }

  const updatedWizard: PaymentWizard = {
    ...mockPaymentWizards[wizardIndex],
    status: PaymentWizardStatus.APPROVED,
    approvedBy: 'current-user',
    approvedAt: new Date(),
    updatedAt: new Date(),
  }

  mockPaymentWizards[wizardIndex] = updatedWizard
  return updatedWizard
}

// Supporting data functions
export const getPaymentSteps = async (): Promise<PaymentStep[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockPaymentSteps
}

export const getPaymentWizardSteps = async (wizardId: string): Promise<PaymentWizardStep[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Generate wizard steps based on the wizard
  const wizard = mockPaymentWizards.find((w) => w.id === wizardId)
  if (!wizard) {
    return []
  }

  return mockPaymentSteps.map((step) => ({
    id: `${wizardId}-${step.id}`,
    wizardId,
    stepId: step.id,
    stepNumber: step.stepNumber,
    title: step.title,
    description: step.description,
    isCompleted: step.stepNumber <= 3, // Mock some completed steps
    completedAt: step.stepNumber <= 3 ? new Date() : undefined,
    data: {},
    validationErrors: [],
  }))
}
