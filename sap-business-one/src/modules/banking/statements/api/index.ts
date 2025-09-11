import type {
  BankStatement,
  StatementFormData,
  StatementFilters,
  StatementPagination,
  StatementStats,
  BankAccount,
  StatementTransaction,
  StatementSummary,
  TransactionFilters,
  TransactionPagination,
  TransactionStats,
} from '../types'
import {
  StatementStatus,
  StatementType,
  TransactionType,
  BankAccountType,
  Currency,
} from '../types'

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
    lastStatementDate: new Date('2024-01-31'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-31'),
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
    lastStatementDate: new Date('2024-01-31'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-31'),
  },
]

const mockTransactions: StatementTransaction[] = [
  {
    id: 'ST-1',
    transactionDate: new Date('2024-01-15'),
    valueDate: new Date('2024-01-15'),
    description: 'DEPOSIT - ABC Manufacturing Inc.',
    referenceNumber: 'DEP-2024-001',
    transactionType: TransactionType.DEPOSIT,
    amount: 15000.0,
    balance: 140000.0,
    isReconciled: true,
  },
  {
    id: 'ST-2',
    transactionDate: new Date('2024-01-16'),
    valueDate: new Date('2024-01-16'),
    description: 'WIRE TRANSFER - XYZ Services Ltd.',
    referenceNumber: 'WT-567890',
    transactionType: TransactionType.WIRE_TRANSFER,
    amount: 8500.0,
    balance: 131500.0,
    isReconciled: true,
  },
  {
    id: 'ST-3',
    transactionDate: new Date('2024-01-17'),
    valueDate: new Date('2024-01-17'),
    description: 'CHECK - CHK-2024-001',
    referenceNumber: 'CHK-2024-001',
    transactionType: TransactionType.CHECK,
    amount: -5000.0,
    balance: 126500.0,
    checkNumber: 'CHK-2024-001',
    payee: 'ABC Supplies Inc.',
    isReconciled: false,
  },
  {
    id: 'ST-4',
    transactionDate: new Date('2024-01-18'),
    valueDate: new Date('2024-01-18'),
    description: 'BANK FEE - Monthly Maintenance',
    referenceNumber: 'FEE-001',
    transactionType: TransactionType.FEE,
    amount: -25.0,
    balance: 126475.0,
    isReconciled: false,
    fees: [
      {
        id: 'FEE-1',
        feeType: 'Monthly Maintenance',
        description: 'Account maintenance fee',
        amount: 25.0,
        currency: 'USD',
      },
    ],
  },
  {
    id: 'ST-5',
    transactionDate: new Date('2024-01-19'),
    valueDate: new Date('2024-01-19'),
    description: 'INTEREST EARNED',
    referenceNumber: 'INT-001',
    transactionType: TransactionType.INTEREST,
    amount: 15.5,
    balance: 126490.5,
    isReconciled: false,
  },
  {
    id: 'ST-6',
    transactionDate: new Date('2024-01-20'),
    valueDate: new Date('2024-01-20'),
    description: 'ACH PAYMENT - Tech Solutions Corp.',
    referenceNumber: 'ACH-123456',
    transactionType: TransactionType.ACH,
    amount: -2500.0,
    balance: 123990.5,
    payee: 'Tech Solutions Corp.',
    isReconciled: false,
  },
  {
    id: 'ST-7',
    transactionDate: new Date('2024-01-25'),
    valueDate: new Date('2024-01-25'),
    description: 'ATM WITHDRAWAL',
    referenceNumber: 'ATM-789',
    transactionType: TransactionType.ATM,
    amount: -200.0,
    balance: 123790.5,
    isReconciled: false,
  },
  {
    id: 'ST-8',
    transactionDate: new Date('2024-01-28'),
    valueDate: new Date('2024-01-28'),
    description: 'DEBIT CARD PURCHASE - Office Supplies',
    referenceNumber: 'DC-456789',
    transactionType: TransactionType.DEBIT_CARD,
    amount: -150.0,
    balance: 123640.5,
    payee: 'Office Depot',
    category: 'Office Supplies',
    isReconciled: false,
  },
]

const mockStatements: BankStatement[] = [
  {
    id: 'STMT-1',
    statementNumber: 'STMT-2024-001',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    statementType: StatementType.MONTHLY,
    statementDate: new Date('2024-01-31'),
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-01-31'),
    beginningBalance: 125000.0,
    endingBalance: 123640.5,
    totalDeposits: 23500.0,
    totalWithdrawals: 24859.5,
    totalFees: 25.0,
    totalInterest: 15.5,
    transactionCount: 8,
    transactions: mockTransactions,
    status: StatementStatus.COMPLETED,
    fileName: 'statement_2024_01.pdf',
    fileSize: 245760,
    uploadedBy: 'admin',
    uploadedAt: new Date('2024-02-01T10:00:00Z'),
    processedBy: 'system',
    processedAt: new Date('2024-02-01T10:05:00Z'),
    notes: 'January 2024 monthly statement',
    createdAt: new Date('2024-02-01T10:00:00Z'),
    updatedAt: new Date('2024-02-01T10:05:00Z'),
  },
  {
    id: 'STMT-2',
    statementNumber: 'STMT-2024-002',
    bankAccountId: 'BA-2',
    bankAccountName: 'Business Savings',
    statementType: StatementType.MONTHLY,
    statementDate: new Date('2024-01-31'),
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-01-31'),
    beginningBalance: 48000.0,
    endingBalance: 50000.0,
    totalDeposits: 2000.0,
    totalWithdrawals: 0.0,
    totalFees: 0.0,
    totalInterest: 0.0,
    transactionCount: 1,
    transactions: [
      {
        id: 'ST-SAV-1',
        transactionDate: new Date('2024-01-15'),
        valueDate: new Date('2024-01-15'),
        description: 'TRANSFER FROM CHECKING',
        referenceNumber: 'TRF-001',
        transactionType: TransactionType.TRANSFER_IN,
        amount: 2000.0,
        balance: 50000.0,
        isReconciled: true,
      },
    ],
    status: StatementStatus.COMPLETED,
    fileName: 'savings_statement_2024_01.pdf',
    fileSize: 128000,
    uploadedBy: 'admin',
    uploadedAt: new Date('2024-02-01T10:00:00Z'),
    processedBy: 'system',
    processedAt: new Date('2024-02-01T10:05:00Z'),
    notes: 'January 2024 savings statement',
    createdAt: new Date('2024-02-01T10:00:00Z'),
    updatedAt: new Date('2024-02-01T10:05:00Z'),
  },
]

// API Functions
export const getStatements = async (
  filters?: StatementFilters,
  pagination?: Partial<StatementPagination>,
): Promise<{ statements: BankStatement[]; pagination: StatementPagination }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredStatements = [...mockStatements]

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredStatements = filteredStatements.filter((s) => s.status === filters.status)
    }
    if (filters.statementType) {
      filteredStatements = filteredStatements.filter(
        (s) => s.statementType === filters.statementType,
      )
    }
    if (filters.bankAccountId) {
      filteredStatements = filteredStatements.filter(
        (s) => s.bankAccountId === filters.bankAccountId,
      )
    }
    if (filters.dateFrom) {
      filteredStatements = filteredStatements.filter((s) => s.statementDate >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredStatements = filteredStatements.filter((s) => s.statementDate <= filters.dateTo!)
    }
    if (filters.periodStart) {
      filteredStatements = filteredStatements.filter((s) => s.periodStart >= filters.periodStart!)
    }
    if (filters.periodEnd) {
      filteredStatements = filteredStatements.filter((s) => s.periodEnd <= filters.periodEnd!)
    }
  }

  // Apply pagination
  const page = pagination?.page || 1
  const limit = pagination?.limit || 10
  const total = filteredStatements.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedStatements = filteredStatements.slice(startIndex, endIndex)

  return {
    statements: paginatedStatements,
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

export const getStatementById = async (id: string): Promise<BankStatement | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockStatements.find((statement) => statement.id === id) || null
}

export const createStatement = async (data: StatementFormData): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newStatement: BankStatement = {
    id: `STMT-${Date.now()}`,
    statementNumber: `STMT-2024-${String(mockStatements.length + 1).padStart(3, '0')}`,
    bankAccountId: data.bankAccountId,
    bankAccountName:
      mockBankAccounts.find((ba) => ba.id === data.bankAccountId)?.accountName || 'Unknown Account',
    statementType: data.statementType,
    statementDate: data.statementDate,
    periodStart: data.periodStart,
    periodEnd: data.periodEnd,
    beginningBalance: data.beginningBalance,
    endingBalance: data.endingBalance,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalFees: 0,
    totalInterest: 0,
    transactionCount: 0,
    transactions: [],
    status: StatementStatus.DRAFT,
    notes: data.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockStatements.push(newStatement)
  return newStatement
}

export const updateStatement = async (
  id: string,
  data: Partial<StatementFormData>,
): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const statementIndex = mockStatements.findIndex((s) => s.id === id)
  if (statementIndex === -1) {
    throw new Error('Statement not found')
  }

  const existingStatement = mockStatements[statementIndex]
  const updatedStatement: BankStatement = {
    ...existingStatement,
    ...data,
    updatedAt: new Date(),
  }

  mockStatements[statementIndex] = updatedStatement
  return updatedStatement
}

export const deleteStatement = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const statementIndex = mockStatements.findIndex((s) => s.id === id)
  if (statementIndex === -1) {
    throw new Error('Statement not found')
  }

  mockStatements.splice(statementIndex, 1)
}

export const getStatementStats = async (): Promise<StatementStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalStatements = mockStatements.length
  const totalTransactions = mockStatements.reduce((sum, s) => sum + s.transactionCount, 0)
  const totalDeposits = mockStatements.reduce((sum, s) => sum + s.totalDeposits, 0)
  const totalWithdrawals = mockStatements.reduce((sum, s) => sum + s.totalWithdrawals, 0)
  const totalFees = mockStatements.reduce((sum, s) => sum + s.totalFees, 0)
  const totalInterest = mockStatements.reduce((sum, s) => sum + s.totalInterest, 0)
  const pendingStatements = mockStatements.filter(
    (s) => s.status === StatementStatus.PENDING,
  ).length
  const completedStatements = mockStatements.filter(
    (s) => s.status === StatementStatus.COMPLETED,
  ).length
  const failedStatements = mockStatements.filter((s) => s.status === StatementStatus.FAILED).length
  const reconciledStatements = mockStatements.filter(
    (s) => s.status === StatementStatus.RECONCILED,
  ).length
  const averageStatementPeriod = 30 // days

  const statementsByType = Object.values(StatementType).reduce(
    (acc, type) => {
      acc[type] = mockStatements.filter((s) => s.statementType === type).length
      return acc
    },
    {} as Record<StatementType, number>,
  )

  const statementsByStatus = Object.values(StatementStatus).reduce(
    (acc, status) => {
      acc[status] = mockStatements.filter((s) => s.status === status).length
      return acc
    },
    {} as Record<StatementStatus, number>,
  )

  return {
    totalStatements,
    totalTransactions,
    totalDeposits,
    totalWithdrawals,
    totalFees,
    totalInterest,
    pendingStatements,
    completedStatements,
    failedStatements,
    reconciledStatements,
    averageStatementPeriod,
    statementsByType,
    statementsByStatus,
  }
}

export const processStatement = async (id: string): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const statementIndex = mockStatements.findIndex((s) => s.id === id)
  if (statementIndex === -1) {
    throw new Error('Statement not found')
  }

  const updatedStatement: BankStatement = {
    ...mockStatements[statementIndex],
    status: StatementStatus.PROCESSING,
    processedBy: 'system',
    processedAt: new Date(),
    updatedAt: new Date(),
  }

  mockStatements[statementIndex] = updatedStatement
  return updatedStatement
}

export const completeStatement = async (id: string): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const statementIndex = mockStatements.findIndex((s) => s.id === id)
  if (statementIndex === -1) {
    throw new Error('Statement not found')
  }

  const updatedStatement: BankStatement = {
    ...mockStatements[statementIndex],
    status: StatementStatus.COMPLETED,
    processedBy: 'system',
    processedAt: new Date(),
    updatedAt: new Date(),
  }

  mockStatements[statementIndex] = updatedStatement
  return updatedStatement
}

export const reconcileStatement = async (id: string): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const statementIndex = mockStatements.findIndex((s) => s.id === id)
  if (statementIndex === -1) {
    throw new Error('Statement not found')
  }

  const updatedStatement: BankStatement = {
    ...mockStatements[statementIndex],
    status: StatementStatus.RECONCILED,
    updatedAt: new Date(),
  }

  mockStatements[statementIndex] = updatedStatement
  return updatedStatement
}

export const uploadStatement = async (data: any): Promise<BankStatement> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const newStatement: BankStatement = {
    id: `STMT-${Date.now()}`,
    statementNumber: `STMT-2024-${String(mockStatements.length + 1).padStart(3, '0')}`,
    bankAccountId: data.bankAccountId,
    bankAccountName:
      mockBankAccounts.find((ba) => ba.id === data.bankAccountId)?.accountName || 'Unknown Account',
    statementType: data.statementType,
    statementDate: data.statementDate,
    periodStart: data.periodStart,
    periodEnd: data.periodEnd,
    beginningBalance: 0,
    endingBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalFees: 0,
    totalInterest: 0,
    transactionCount: 0,
    transactions: [],
    status: StatementStatus.PENDING,
    fileName: data.file.name,
    fileSize: data.file.size,
    uploadedBy: 'current-user',
    uploadedAt: new Date(),
    notes: data.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockStatements.push(newStatement)
  return newStatement
}

// Supporting data functions
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockBankAccounts
}

export const getStatementTransactions = async (
  statementId: string,
  filters?: TransactionFilters,
): Promise<StatementTransaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const statement = mockStatements.find((s) => s.id === statementId)
  if (!statement) {
    return []
  }

  let filteredTransactions = [...statement.transactions]

  if (filters) {
    if (filters.transactionType) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionType === filters.transactionType,
      )
    }
    if (filters.dateFrom) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionDate >= filters.dateFrom!,
      )
    }
    if (filters.dateTo) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionDate <= filters.dateTo!,
      )
    }
    if (filters.amountMin) {
      filteredTransactions = filteredTransactions.filter(
        (t) => Math.abs(t.amount) >= filters.amountMin!,
      )
    }
    if (filters.amountMax) {
      filteredTransactions = filteredTransactions.filter(
        (t) => Math.abs(t.amount) <= filters.amountMax!,
      )
    }
    if (filters.isReconciled !== undefined) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.isReconciled === filters.isReconciled,
      )
    }
  }

  return filteredTransactions
}

export const getTransactionStats = async (statementId: string): Promise<TransactionStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const statement = mockStatements.find((s) => s.id === statementId)
  if (!statement) {
    return {
      totalTransactions: 0,
      totalAmount: 0,
      averageTransactionAmount: 0,
      transactionsByType: {} as Record<TransactionType, number>,
      transactionsByMonth: {},
      topPayees: [],
      topCategories: [],
    }
  }

  const transactions = statement.transactions
  const totalTransactions = transactions.length
  const totalAmount = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const averageTransactionAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0

  const transactionsByType = Object.values(TransactionType).reduce(
    (acc, type) => {
      acc[type] = transactions.filter((t) => t.transactionType === type).length
      return acc
    },
    {} as Record<TransactionType, number>,
  )

  const transactionsByMonth = transactions.reduce(
    (acc, t) => {
      const month = t.transactionDate.toISOString().substring(0, 7)
      acc[month] = (acc[month] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const payeeCounts = transactions.reduce(
    (acc, t) => {
      if (t.payee) {
        acc[t.payee] = acc[t.payee] || { count: 0, totalAmount: 0 }
        acc[t.payee].count++
        acc[t.payee].totalAmount += Math.abs(t.amount)
      }
      return acc
    },
    {} as Record<string, { count: number; totalAmount: number }>,
  )

  const topPayees = Object.entries(payeeCounts)
    .map(([payee, data]) => ({ payee, count: data.count, totalAmount: data.totalAmount }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const categoryCounts = transactions.reduce(
    (acc, t) => {
      if (t.category) {
        acc[t.category] = acc[t.category] || { count: 0, totalAmount: 0 }
        acc[t.category].count++
        acc[t.category].totalAmount += Math.abs(t.amount)
      }
      return acc
    },
    {} as Record<string, { count: number; totalAmount: number }>,
  )

  const topCategories = Object.entries(categoryCounts)
    .map(([category, data]) => ({ category, count: data.count, totalAmount: data.totalAmount }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totalTransactions,
    totalAmount,
    averageTransactionAmount,
    transactionsByType,
    transactionsByMonth,
    topPayees,
    topCategories,
  }
}
