import type {
  Deposit,
  DepositFormData,
  DepositFilters,
  DepositPagination,
  DepositStats,
  BankAccount,
  Customer,
  Invoice,
  AppliedInvoice,
  DepositFee,
  DepositBatch,
} from '../types'
import { DepositType, DepositStatus, DepositSource, BankAccountType, Currency } from '../types'

// Mock data
const mockBankAccounts: BankAccount[] = [
  {
    id: 'BA-1',
    accountNumber: '1234567890',
    accountName: 'Main Business Checking',
    bankName: 'First National Bank',
    bankCode: 'FNB001',
    accountType: BankAccountType.BUSINESS_CHECKING,
    currency: 'USD',
    balance: 125000.0,
    availableBalance: 120000.0,
    isActive: true,
    lastReconciliationDate: new Date('2024-01-15'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'BA-2',
    accountNumber: '0987654321',
    accountName: 'Business Savings',
    bankName: 'First National Bank',
    bankCode: 'FNB001',
    accountType: BankAccountType.BUSINESS_SAVINGS,
    currency: 'USD',
    balance: 50000.0,
    availableBalance: 50000.0,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
]

const mockCustomers: Customer[] = [
  {
    id: 'C-1',
    customerCode: 'CUST001',
    customerName: 'ABC Manufacturing Inc.',
    contactPerson: 'John Smith',
    email: 'john@abcmanufacturing.com',
    phone: '+1-555-0123',
    address: '123 Industrial Blvd, Detroit, MI 48201',
    taxId: '12-3456789',
    creditLimit: 100000,
    currentBalance: 25000,
  },
  {
    id: 'C-2',
    customerCode: 'CUST002',
    customerName: 'XYZ Services Ltd.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@xyzservices.com',
    phone: '+1-555-0456',
    address: '456 Service Ave, Chicago, IL 60601',
    taxId: '98-7654321',
    creditLimit: 75000,
    currentBalance: 15000,
  },
  {
    id: 'C-3',
    customerCode: 'CUST003',
    customerName: 'Tech Solutions Corp.',
    contactPerson: 'Mike Davis',
    email: 'mike@techsolutions.com',
    phone: '+1-555-0789',
    address: '789 Tech Park, Austin, TX 73301',
    taxId: '45-6789012',
    creditLimit: 150000,
    currentBalance: 45000,
  },
]

const mockInvoices: Invoice[] = [
  {
    id: 'INV-1',
    invoiceNumber: 'INV-2024-001',
    customerId: 'C-1',
    customerName: 'ABC Manufacturing Inc.',
    invoiceDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-14'),
    totalAmount: 15000.0,
    paidAmount: 0,
    remainingAmount: 15000.0,
    status: 'OPEN',
  },
  {
    id: 'INV-2',
    invoiceNumber: 'INV-2024-002',
    customerId: 'C-2',
    customerName: 'XYZ Services Ltd.',
    invoiceDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-19'),
    totalAmount: 8500.0,
    paidAmount: 0,
    remainingAmount: 8500.0,
    status: 'OPEN',
  },
  {
    id: 'INV-3',
    invoiceNumber: 'INV-2024-003',
    customerId: 'C-3',
    customerName: 'Tech Solutions Corp.',
    invoiceDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-24'),
    totalAmount: 22000.0,
    paidAmount: 5000.0,
    remainingAmount: 17000.0,
    status: 'PARTIALLY_PAID',
  },
]

const mockDeposits: Deposit[] = [
  {
    id: 'DEP-1',
    depositNumber: 'DEP-2024-001',
    depositDate: new Date('2024-01-15'),
    receivedDate: new Date('2024-01-15'),
    customerId: 'C-1',
    customerName: 'ABC Manufacturing Inc.',
    depositType: DepositType.CHECK,
    depositSource: DepositSource.CUSTOMER_PAYMENT,
    amount: 15000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'CHK-001234',
    description: 'Payment for Invoice INV-2024-001',
    appliedInvoices: [
      {
        id: 'AI-1',
        invoiceId: 'INV-1',
        invoiceNumber: 'INV-2024-001',
        invoiceDate: new Date('2024-01-15'),
        originalAmount: 15000.0,
        appliedAmount: 15000.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [],
    status: DepositStatus.COMPLETED,
    notes: 'Check cleared successfully',
    createdBy: 'admin',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z'),
    processedDate: new Date('2024-01-15T14:30:00Z'),
    clearedDate: new Date('2024-01-16T09:00:00Z'),
  },
  {
    id: 'DEP-2',
    depositNumber: 'DEP-2024-002',
    depositDate: new Date('2024-01-20'),
    receivedDate: new Date('2024-01-20'),
    customerId: 'C-2',
    customerName: 'XYZ Services Ltd.',
    depositType: DepositType.WIRE_TRANSFER,
    depositSource: DepositSource.CUSTOMER_PAYMENT,
    amount: 8500.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'WT-567890',
    description: 'Wire transfer for services',
    appliedInvoices: [
      {
        id: 'AI-2',
        invoiceId: 'INV-2',
        invoiceNumber: 'INV-2024-002',
        invoiceDate: new Date('2024-01-20'),
        originalAmount: 8500.0,
        appliedAmount: 8500.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [
      {
        id: 'FEE-1',
        feeType: 'Wire Transfer Fee',
        description: 'Bank wire transfer processing fee',
        amount: 25.0,
        currency: 'USD',
      },
    ],
    status: DepositStatus.COMPLETED,
    notes: 'Wire transfer received and processed',
    createdBy: 'admin',
    createdAt: new Date('2024-01-20T11:15:00Z'),
    updatedAt: new Date('2024-01-20T15:45:00Z'),
    processedDate: new Date('2024-01-20T15:45:00Z'),
    clearedDate: new Date('2024-01-20T15:45:00Z'),
  },
  {
    id: 'DEP-3',
    depositNumber: 'DEP-2024-003',
    depositDate: new Date('2024-01-25'),
    receivedDate: new Date('2024-01-25'),
    customerId: 'C-3',
    customerName: 'Tech Solutions Corp.',
    depositType: DepositType.ACH,
    depositSource: DepositSource.CUSTOMER_PAYMENT,
    amount: 5000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'ACH-123456',
    description: 'Partial payment for Invoice INV-2024-003',
    appliedInvoices: [
      {
        id: 'AI-3',
        invoiceId: 'INV-3',
        invoiceNumber: 'INV-2024-003',
        invoiceDate: new Date('2024-01-25'),
        originalAmount: 22000.0,
        appliedAmount: 5000.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [],
    status: DepositStatus.PROCESSING,
    notes: 'ACH transfer in progress',
    createdBy: 'admin',
    createdAt: new Date('2024-01-25T09:30:00Z'),
    updatedAt: new Date('2024-01-25T09:30:00Z'),
  },
]

// API Functions
export const getDeposits = async (
  filters?: DepositFilters,
  pagination?: Partial<DepositPagination>,
): Promise<{ deposits: Deposit[]; pagination: DepositPagination }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredDeposits = [...mockDeposits]

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredDeposits = filteredDeposits.filter((d) => d.status === filters.status)
    }
    if (filters.depositType) {
      filteredDeposits = filteredDeposits.filter((d) => d.depositType === filters.depositType)
    }
    if (filters.depositSource) {
      filteredDeposits = filteredDeposits.filter((d) => d.depositSource === filters.depositSource)
    }
    if (filters.customerId) {
      filteredDeposits = filteredDeposits.filter((d) => d.customerId === filters.customerId)
    }
    if (filters.bankAccountId) {
      filteredDeposits = filteredDeposits.filter((d) => d.bankAccountId === filters.bankAccountId)
    }
    if (filters.dateFrom) {
      filteredDeposits = filteredDeposits.filter((d) => d.depositDate >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredDeposits = filteredDeposits.filter((d) => d.depositDate <= filters.dateTo!)
    }
    if (filters.amountMin) {
      filteredDeposits = filteredDeposits.filter((d) => d.amount >= filters.amountMin!)
    }
    if (filters.amountMax) {
      filteredDeposits = filteredDeposits.filter((d) => d.amount <= filters.amountMax!)
    }
  }

  // Apply pagination
  const page = pagination?.page || 1
  const limit = pagination?.limit || 10
  const total = filteredDeposits.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedDeposits = filteredDeposits.slice(startIndex, endIndex)

  return {
    deposits: paginatedDeposits,
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

export const getDepositById = async (id: string): Promise<Deposit | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockDeposits.find((deposit) => deposit.id === id) || null
}

export const createDeposit = async (data: DepositFormData): Promise<Deposit> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newDeposit: Deposit = {
    id: `DEP-${Date.now()}`,
    depositNumber: `DEP-2024-${String(mockDeposits.length + 1).padStart(3, '0')}`,
    depositDate: data.depositDate,
    receivedDate: data.receivedDate,
    customerId: data.customerId,
    customerName:
      mockCustomers.find((c) => c.id === data.customerId)?.customerName || 'Unknown Customer',
    depositType: data.depositType,
    depositSource: data.depositSource,
    amount: data.amount,
    currency: data.currency,
    bankAccountId: data.bankAccountId,
    bankAccountName:
      mockBankAccounts.find((ba) => ba.id === data.bankAccountId)?.accountName || 'Unknown Account',
    referenceNumber: data.referenceNumber,
    description: data.description,
    appliedInvoices: data.appliedInvoices.map((ai, index) => ({
      id: `AI-${Date.now()}-${index}`,
      invoiceId: ai.invoiceId,
      invoiceNumber:
        mockInvoices.find((inv) => inv.id === ai.invoiceId)?.invoiceNumber || 'Unknown',
      invoiceDate: mockInvoices.find((inv) => inv.id === ai.invoiceId)?.invoiceDate || new Date(),
      originalAmount: mockInvoices.find((inv) => inv.id === ai.invoiceId)?.totalAmount || 0,
      appliedAmount: ai.appliedAmount,
      discountAmount: ai.discountAmount,
      writeOffAmount: ai.writeOffAmount,
    })),
    fees: [],
    status: DepositStatus.PENDING,
    notes: data.notes,
    createdBy: 'current-user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockDeposits.push(newDeposit)
  return newDeposit
}

export const updateDeposit = async (
  id: string,
  data: Partial<DepositFormData>,
): Promise<Deposit> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const depositIndex = mockDeposits.findIndex((deposit) => deposit.id === id)
  if (depositIndex === -1) {
    throw new Error('Deposit not found')
  }

  const existingDeposit = mockDeposits[depositIndex]
  const updatedDeposit: Deposit = {
    ...existingDeposit,
    ...data,
    appliedInvoices: data.appliedInvoices
      ? data.appliedInvoices.map((ai, index) => ({
          id: `AI-${Date.now()}-${index}`,
          invoiceId: ai.invoiceId,
          invoiceNumber:
            mockInvoices.find((inv) => inv.id === ai.invoiceId)?.invoiceNumber || 'Unknown',
          invoiceDate:
            mockInvoices.find((inv) => inv.id === ai.invoiceId)?.invoiceDate || new Date(),
          originalAmount: mockInvoices.find((inv) => inv.id === ai.invoiceId)?.totalAmount || 0,
          appliedAmount: ai.appliedAmount,
          discountAmount: ai.discountAmount,
          writeOffAmount: ai.writeOffAmount,
        }))
      : existingDeposit.appliedInvoices,
    updatedAt: new Date(),
  }

  mockDeposits[depositIndex] = updatedDeposit
  return updatedDeposit
}

export const deleteDeposit = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const depositIndex = mockDeposits.findIndex((deposit) => deposit.id === id)
  if (depositIndex === -1) {
    throw new Error('Deposit not found')
  }

  mockDeposits.splice(depositIndex, 1)
}

export const getDepositStats = async (): Promise<DepositStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalDeposits = mockDeposits.length
  const totalAmount = mockDeposits.reduce((sum, deposit) => sum + deposit.amount, 0)
  const pendingDeposits = mockDeposits.filter((d) => d.status === DepositStatus.PENDING).length
  const completedDeposits = mockDeposits.filter((d) => d.status === DepositStatus.COMPLETED).length
  const failedDeposits = mockDeposits.filter((d) => d.status === DepositStatus.FAILED).length
  const averageDepositAmount = totalDeposits > 0 ? totalAmount / totalDeposits : 0

  const depositsByType = Object.values(DepositType).reduce(
    (acc, type) => {
      acc[type] = mockDeposits.filter((d) => d.depositType === type).length
      return acc
    },
    {} as Record<DepositType, number>,
  )

  const depositsBySource = Object.values(DepositSource).reduce(
    (acc, source) => {
      acc[source] = mockDeposits.filter((d) => d.depositSource === source).length
      return acc
    },
    {} as Record<DepositSource, number>,
  )

  return {
    totalDeposits,
    totalAmount,
    pendingDeposits,
    completedDeposits,
    failedDeposits,
    averageDepositAmount,
    depositsByType,
    depositsBySource,
  }
}

export const processDeposit = async (id: string): Promise<Deposit> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const depositIndex = mockDeposits.findIndex((deposit) => deposit.id === id)
  if (depositIndex === -1) {
    throw new Error('Deposit not found')
  }

  const updatedDeposit: Deposit = {
    ...mockDeposits[depositIndex],
    status: DepositStatus.PROCESSING,
    processedDate: new Date(),
    updatedAt: new Date(),
  }

  mockDeposits[depositIndex] = updatedDeposit
  return updatedDeposit
}

export const clearDeposit = async (id: string): Promise<Deposit> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const depositIndex = mockDeposits.findIndex((deposit) => deposit.id === id)
  if (depositIndex === -1) {
    throw new Error('Deposit not found')
  }

  const updatedDeposit: Deposit = {
    ...mockDeposits[depositIndex],
    status: DepositStatus.COMPLETED,
    clearedDate: new Date(),
    updatedAt: new Date(),
  }

  mockDeposits[depositIndex] = updatedDeposit
  return updatedDeposit
}

export const reconcileDeposit = async (id: string): Promise<Deposit> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const depositIndex = mockDeposits.findIndex((deposit) => deposit.id === id)
  if (depositIndex === -1) {
    throw new Error('Deposit not found')
  }

  const updatedDeposit: Deposit = {
    ...mockDeposits[depositIndex],
    status: DepositStatus.RECONCILED,
    reconciledDate: new Date(),
    updatedAt: new Date(),
  }

  mockDeposits[depositIndex] = updatedDeposit
  return updatedDeposit
}

// Supporting data functions
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockBankAccounts
}

export const getCustomers = async (): Promise<Customer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockCustomers
}

export const getInvoices = async (customerId?: string): Promise<Invoice[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  if (customerId) {
    return mockInvoices.filter((invoice) => invoice.customerId === customerId)
  }
  return mockInvoices
}
