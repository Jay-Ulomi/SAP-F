import type {
  Reconciliation,
  ReconciliationFormData,
  ReconciliationFilters,
  ReconciliationPagination,
  ReconciliationStats,
  BankAccount,
  BankStatement,
  BankTransaction,
  BookTransaction,
  MatchedTransaction,
  ReconciliationDiscrepancy,
  TransactionFilters,
  TransactionPagination,
  TransactionStats,
} from '../types'
import {
  ReconciliationStatus,
  TransactionType,
  MatchStatus,
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

const mockBankTransactions: BankTransaction[] = [
  {
    id: 'BT-1',
    transactionDate: new Date('2024-01-15'),
    description: 'DEPOSIT - ABC Manufacturing Inc.',
    referenceNumber: 'DEP-2024-001',
    transactionType: TransactionType.DEPOSIT,
    amount: 15000.0,
    balance: 140000.0,
    isReconciled: true,
    matchedTransactionId: 'BK-1',
    matchStatus: MatchStatus.MATCHED,
  },
  {
    id: 'BT-2',
    transactionDate: new Date('2024-01-16'),
    description: 'WIRE TRANSFER - XYZ Services Ltd.',
    referenceNumber: 'WT-567890',
    transactionType: TransactionType.WIRE_TRANSFER,
    amount: 8500.0,
    balance: 131500.0,
    isReconciled: true,
    matchedTransactionId: 'BK-2',
    matchStatus: MatchStatus.MATCHED,
  },
  {
    id: 'BT-3',
    transactionDate: new Date('2024-01-17'),
    description: 'CHECK - CHK-2024-001',
    referenceNumber: 'CHK-2024-001',
    transactionType: TransactionType.CHECK,
    amount: -5000.0,
    balance: 126500.0,
    checkNumber: 'CHK-2024-001',
    payee: 'ABC Supplies Inc.',
    isReconciled: false,
    matchStatus: MatchStatus.UNMATCHED,
  },
  {
    id: 'BT-4',
    transactionDate: new Date('2024-01-18'),
    description: 'BANK FEE - Monthly Maintenance',
    referenceNumber: 'FEE-001',
    transactionType: TransactionType.FEE,
    amount: -25.0,
    balance: 126475.0,
    isReconciled: false,
    matchStatus: MatchStatus.UNMATCHED,
  },
  {
    id: 'BT-5',
    transactionDate: new Date('2024-01-19'),
    description: 'INTEREST EARNED',
    referenceNumber: 'INT-001',
    transactionType: TransactionType.INTEREST,
    amount: 15.5,
    balance: 126490.5,
    isReconciled: false,
    matchStatus: MatchStatus.UNMATCHED,
  },
]

const mockBookTransactions: BookTransaction[] = [
  {
    id: 'BK-1',
    transactionDate: new Date('2024-01-15'),
    description: 'Customer Payment - ABC Manufacturing',
    referenceNumber: 'INV-2024-001',
    transactionType: TransactionType.DEPOSIT,
    amount: 15000.0,
    accountId: 'BA-1',
    accountName: 'Main Business Checking',
    isReconciled: true,
    matchedTransactionId: 'BT-1',
    matchStatus: MatchStatus.MATCHED,
    sourceDocument: 'Invoice',
    sourceDocumentId: 'INV-2024-001',
  },
  {
    id: 'BK-2',
    transactionDate: new Date('2024-01-16'),
    description: 'Wire Transfer Received - XYZ Services',
    referenceNumber: 'WT-567890',
    transactionType: TransactionType.WIRE_TRANSFER,
    amount: 8500.0,
    accountId: 'BA-1',
    accountName: 'Main Business Checking',
    isReconciled: true,
    matchedTransactionId: 'BT-2',
    matchStatus: MatchStatus.MATCHED,
    sourceDocument: 'Wire Transfer',
    sourceDocumentId: 'WT-567890',
  },
  {
    id: 'BK-3',
    transactionDate: new Date('2024-01-17'),
    description: 'Check Payment - ABC Supplies',
    referenceNumber: 'CHK-2024-001',
    transactionType: TransactionType.CHECK,
    amount: -5000.0,
    accountId: 'BA-1',
    accountName: 'Main Business Checking',
    isReconciled: false,
    matchStatus: MatchStatus.UNMATCHED,
    sourceDocument: 'Check',
    sourceDocumentId: 'CHK-2024-001',
  },
  {
    id: 'BK-4',
    transactionDate: new Date('2024-01-20'),
    description: 'ACH Payment - Tech Solutions',
    referenceNumber: 'ACH-123456',
    transactionType: TransactionType.ACH,
    amount: -2500.0,
    accountId: 'BA-1',
    accountName: 'Main Business Checking',
    isReconciled: false,
    matchStatus: MatchStatus.UNMATCHED,
    sourceDocument: 'ACH',
    sourceDocumentId: 'ACH-123456',
  },
]

const mockReconciliations: Reconciliation[] = [
  {
    id: 'REC-1',
    reconciliationNumber: 'REC-2024-001',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    statementDate: new Date('2024-01-31'),
    reconciliationDate: new Date('2024-02-01'),
    beginningBalance: 125000.0,
    endingBalance: 126490.5,
    bookBalance: 126490.5,
    bankBalance: 126490.5,
    difference: 0.0,
    status: ReconciliationStatus.COMPLETED,
    bankTransactions: mockBankTransactions,
    bookTransactions: mockBookTransactions,
    matchedTransactions: [
      {
        id: 'MT-1',
        bankTransactionId: 'BT-1',
        bookTransactionId: 'BK-1',
        bankTransaction: mockBankTransactions[0],
        bookTransaction: mockBookTransactions[0],
        matchAmount: 15000.0,
        matchDate: new Date('2024-02-01'),
        matchType: 'AUTO',
        confidence: 0.95,
      },
      {
        id: 'MT-2',
        bankTransactionId: 'BT-2',
        bookTransactionId: 'BK-2',
        bankTransaction: mockBankTransactions[1],
        bookTransaction: mockBookTransactions[1],
        matchAmount: 8500.0,
        matchDate: new Date('2024-02-01'),
        matchType: 'AUTO',
        confidence: 0.98,
      },
    ],
    unmatchedBankTransactions: mockBankTransactions.slice(2),
    unmatchedBookTransactions: mockBookTransactions.slice(2),
    discrepancies: [],
    notes: 'January 2024 reconciliation completed successfully',
    createdBy: 'admin',
    createdAt: new Date('2024-02-01T10:00:00Z'),
    updatedAt: new Date('2024-02-01T15:30:00Z'),
    approvedBy: 'manager',
    approvedAt: new Date('2024-02-01T16:00:00Z'),
  },
]

// API Functions
export const getReconciliations = async (
  filters?: ReconciliationFilters,
  pagination?: Partial<ReconciliationPagination>,
): Promise<{ reconciliations: Reconciliation[]; pagination: ReconciliationPagination }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredReconciliations = [...mockReconciliations]

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredReconciliations = filteredReconciliations.filter((r) => r.status === filters.status)
    }
    if (filters.bankAccountId) {
      filteredReconciliations = filteredReconciliations.filter(
        (r) => r.bankAccountId === filters.bankAccountId,
      )
    }
    if (filters.dateFrom) {
      filteredReconciliations = filteredReconciliations.filter(
        (r) => r.statementDate >= filters.dateFrom!,
      )
    }
    if (filters.dateTo) {
      filteredReconciliations = filteredReconciliations.filter(
        (r) => r.statementDate <= filters.dateTo!,
      )
    }
    if (filters.hasDiscrepancies !== undefined) {
      filteredReconciliations = filteredReconciliations.filter(
        (r) => r.discrepancies.length > 0 === filters.hasDiscrepancies,
      )
    }
  }

  // Apply pagination
  const page = pagination?.page || 1
  const limit = pagination?.limit || 10
  const total = filteredReconciliations.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedReconciliations = filteredReconciliations.slice(startIndex, endIndex)

  return {
    reconciliations: paginatedReconciliations,
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

export const getReconciliationById = async (id: string): Promise<Reconciliation | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockReconciliations.find((reconciliation) => reconciliation.id === id) || null
}

export const createReconciliation = async (
  data: ReconciliationFormData,
): Promise<Reconciliation> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newReconciliation: Reconciliation = {
    id: `REC-${Date.now()}`,
    reconciliationNumber: `REC-2024-${String(mockReconciliations.length + 1).padStart(3, '0')}`,
    bankAccountId: data.bankAccountId,
    bankAccountName:
      mockBankAccounts.find((ba) => ba.id === data.bankAccountId)?.accountName || 'Unknown Account',
    statementDate: data.statementDate,
    reconciliationDate: data.reconciliationDate,
    beginningBalance: data.beginningBalance,
    endingBalance: data.endingBalance,
    bookBalance: data.beginningBalance,
    bankBalance: data.endingBalance,
    difference: data.endingBalance - data.beginningBalance,
    status: ReconciliationStatus.DRAFT,
    bankTransactions: [],
    bookTransactions: [],
    matchedTransactions: [],
    unmatchedBankTransactions: [],
    unmatchedBookTransactions: [],
    discrepancies: [],
    notes: data.notes,
    createdBy: 'current-user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockReconciliations.push(newReconciliation)
  return newReconciliation
}

export const updateReconciliation = async (
  id: string,
  data: Partial<ReconciliationFormData>,
): Promise<Reconciliation> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const reconciliationIndex = mockReconciliations.findIndex((r) => r.id === id)
  if (reconciliationIndex === -1) {
    throw new Error('Reconciliation not found')
  }

  const existingReconciliation = mockReconciliations[reconciliationIndex]
  const updatedReconciliation: Reconciliation = {
    ...existingReconciliation,
    ...data,
    updatedAt: new Date(),
  }

  mockReconciliations[reconciliationIndex] = updatedReconciliation
  return updatedReconciliation
}

export const deleteReconciliation = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const reconciliationIndex = mockReconciliations.findIndex((r) => r.id === id)
  if (reconciliationIndex === -1) {
    throw new Error('Reconciliation not found')
  }

  mockReconciliations.splice(reconciliationIndex, 1)
}

export const getReconciliationStats = async (): Promise<ReconciliationStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalReconciliations = mockReconciliations.length
  const completedReconciliations = mockReconciliations.filter(
    (r) => r.status === ReconciliationStatus.COMPLETED,
  ).length
  const pendingReconciliations = mockReconciliations.filter(
    (r) => r.status === ReconciliationStatus.IN_PROGRESS,
  ).length
  const reconciliationsWithDiscrepancies = mockReconciliations.filter(
    (r) => r.discrepancies.length > 0,
  ).length
  const totalDiscrepancies = mockReconciliations.reduce((sum, r) => sum + r.discrepancies.length, 0)
  const resolvedDiscrepancies = mockReconciliations.reduce(
    (sum, r) => sum + r.discrepancies.filter((d) => d.status === 'RESOLVED').length,
    0,
  )
  const averageReconciliationTime = 2.5 // hours

  const reconciliationsByStatus = Object.values(ReconciliationStatus).reduce(
    (acc, status) => {
      acc[status] = mockReconciliations.filter((r) => r.status === status).length
      return acc
    },
    {} as Record<ReconciliationStatus, number>,
  )

  return {
    totalReconciliations,
    completedReconciliations,
    pendingReconciliations,
    reconciliationsWithDiscrepancies,
    totalDiscrepancies,
    resolvedDiscrepancies,
    averageReconciliationTime,
    reconciliationsByStatus,
  }
}

export const startReconciliation = async (id: string): Promise<Reconciliation> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const reconciliationIndex = mockReconciliations.findIndex((r) => r.id === id)
  if (reconciliationIndex === -1) {
    throw new Error('Reconciliation not found')
  }

  const updatedReconciliation: Reconciliation = {
    ...mockReconciliations[reconciliationIndex],
    status: ReconciliationStatus.IN_PROGRESS,
    updatedAt: new Date(),
  }

  mockReconciliations[reconciliationIndex] = updatedReconciliation
  return updatedReconciliation
}

export const completeReconciliation = async (id: string): Promise<Reconciliation> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const reconciliationIndex = mockReconciliations.findIndex((r) => r.id === id)
  if (reconciliationIndex === -1) {
    throw new Error('Reconciliation not found')
  }

  const updatedReconciliation: Reconciliation = {
    ...mockReconciliations[reconciliationIndex],
    status: ReconciliationStatus.COMPLETED,
    updatedAt: new Date(),
  }

  mockReconciliations[reconciliationIndex] = updatedReconciliation
  return updatedReconciliation
}

export const approveReconciliation = async (id: string): Promise<Reconciliation> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const reconciliationIndex = mockReconciliations.findIndex((r) => r.id === id)
  if (reconciliationIndex === -1) {
    throw new Error('Reconciliation not found')
  }

  const updatedReconciliation: Reconciliation = {
    ...mockReconciliations[reconciliationIndex],
    status: ReconciliationStatus.APPROVED,
    approvedBy: 'current-user',
    approvedAt: new Date(),
    updatedAt: new Date(),
  }

  mockReconciliations[reconciliationIndex] = updatedReconciliation
  return updatedReconciliation
}

export const matchTransactions = async (
  bankTransactionId: string,
  bookTransactionId: string,
): Promise<MatchedTransaction> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const bankTransaction = mockBankTransactions.find((t) => t.id === bankTransactionId)
  const bookTransaction = mockBookTransactions.find((t) => t.id === bookTransactionId)

  if (!bankTransaction || !bookTransaction) {
    throw new Error('Transaction not found')
  }

  const matchedTransaction: MatchedTransaction = {
    id: `MT-${Date.now()}`,
    bankTransactionId,
    bookTransactionId,
    bankTransaction,
    bookTransaction,
    matchAmount: Math.min(Math.abs(bankTransaction.amount), Math.abs(bookTransaction.amount)),
    matchDate: new Date(),
    matchType: 'MANUAL',
    confidence: 0.85,
  }

  // Update transaction statuses
  bankTransaction.isReconciled = true
  bankTransaction.matchedTransactionId = matchedTransaction.id
  bankTransaction.matchStatus = MatchStatus.MATCHED

  bookTransaction.isReconciled = true
  bookTransaction.matchedTransactionId = matchedTransaction.id
  bookTransaction.matchStatus = MatchStatus.MATCHED

  return matchedTransaction
}

export const unmatchTransactions = async (
  bankTransactionId: string,
  bookTransactionId: string,
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const bankTransaction = mockBankTransactions.find((t) => t.id === bankTransactionId)
  const bookTransaction = mockBookTransactions.find((t) => t.id === bookTransactionId)

  if (bankTransaction) {
    bankTransaction.isReconciled = false
    bankTransaction.matchedTransactionId = undefined
    bankTransaction.matchStatus = MatchStatus.UNMATCHED
  }

  if (bookTransaction) {
    bookTransaction.isReconciled = false
    bookTransaction.matchedTransactionId = undefined
    bookTransaction.matchStatus = MatchStatus.UNMATCHED
  }
}

// Supporting data functions
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockBankAccounts
}

export const getBankTransactions = async (
  bankAccountId: string,
  filters?: TransactionFilters,
): Promise<BankTransaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  let filteredTransactions = mockBankTransactions.filter(
    (t) => t.transactionDate >= new Date('2024-01-01'),
  )

  if (filters) {
    if (filters.transactionType) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionType === filters.transactionType,
      )
    }
    if (filters.matchStatus) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.matchStatus === filters.matchStatus,
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
  }

  return filteredTransactions
}

export const getBookTransactions = async (
  bankAccountId: string,
  filters?: TransactionFilters,
): Promise<BookTransaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  let filteredTransactions = mockBookTransactions.filter((t) => t.accountId === bankAccountId)

  if (filters) {
    if (filters.transactionType) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionType === filters.transactionType,
      )
    }
    if (filters.matchStatus) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.matchStatus === filters.matchStatus,
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
  }

  return filteredTransactions
}
