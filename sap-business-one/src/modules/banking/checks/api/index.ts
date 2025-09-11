import type {
  Check,
  CheckFormData,
  CheckFilters,
  CheckPagination,
  CheckStats,
  BankAccount,
  Vendor,
  PurchaseOrder,
  AppliedPurchaseOrder,
  CheckFee,
  CheckBatch,
} from '../types'
import { CheckType, CheckStatus, CheckPurpose, BankAccountType, Currency } from '../types'

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

const mockVendors: Vendor[] = [
  {
    id: 'V-1',
    vendorCode: 'VEND001',
    vendorName: 'ABC Supplies Inc.',
    contactPerson: 'John Smith',
    email: 'john@abcsupplies.com',
    phone: '+1-555-0123',
    address: '123 Industrial Blvd, Detroit, MI 48201',
    taxId: '12-3456789',
    paymentTerms: 'NET_30',
    creditLimit: 100000,
    currentBalance: 25000,
  },
  {
    id: 'V-2',
    vendorCode: 'VEND002',
    vendorName: 'XYZ Services Ltd.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@xyzservices.com',
    phone: '+1-555-0456',
    address: '456 Service Ave, Chicago, IL 60601',
    taxId: '98-7654321',
    paymentTerms: 'NET_15',
    creditLimit: 75000,
    currentBalance: 15000,
  },
  {
    id: 'V-3',
    vendorCode: 'VEND003',
    vendorName: 'Tech Solutions Corp.',
    contactPerson: 'Mike Davis',
    email: 'mike@techsolutions.com',
    phone: '+1-555-0789',
    address: '789 Tech Park, Austin, TX 73301',
    taxId: '45-6789012',
    paymentTerms: 'NET_30',
    creditLimit: 150000,
    currentBalance: 45000,
  },
]

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-1',
    poNumber: 'PO-2024-001',
    vendorId: 'V-1',
    vendorName: 'ABC Supplies Inc.',
    poDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-14'),
    totalAmount: 15000.0,
    paidAmount: 0,
    remainingAmount: 15000.0,
    status: 'OPEN',
  },
  {
    id: 'PO-2',
    poNumber: 'PO-2024-002',
    vendorId: 'V-2',
    vendorName: 'XYZ Services Ltd.',
    poDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-19'),
    totalAmount: 8500.0,
    paidAmount: 0,
    remainingAmount: 8500.0,
    status: 'OPEN',
  },
  {
    id: 'PO-3',
    poNumber: 'PO-2024-003',
    vendorId: 'V-3',
    vendorName: 'Tech Solutions Corp.',
    poDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-24'),
    totalAmount: 22000.0,
    paidAmount: 5000.0,
    remainingAmount: 17000.0,
    status: 'PARTIALLY_PAID',
  },
]

const mockChecks: Check[] = [
  {
    id: 'CHK-1',
    checkNumber: 'CHK-2024-001',
    checkDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-14'),
    vendorId: 'V-1',
    vendorName: 'ABC Supplies Inc.',
    checkType: CheckType.BUSINESS_CHECK,
    checkPurpose: CheckPurpose.VENDOR_PAYMENT,
    amount: 15000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'PO-2024-001',
    description: 'Payment for Purchase Order PO-2024-001',
    appliedPurchaseOrders: [
      {
        id: 'APO-1',
        poId: 'PO-1',
        poNumber: 'PO-2024-001',
        poDate: new Date('2024-01-15'),
        originalAmount: 15000.0,
        appliedAmount: 15000.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [],
    status: CheckStatus.CLEARED,
    notes: 'Check cleared successfully',
    createdBy: 'admin',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
    approvedBy: 'manager',
    approvedAt: new Date('2024-01-15T11:00:00Z'),
    printedAt: new Date('2024-01-15T12:00:00Z'),
    issuedAt: new Date('2024-01-15T13:00:00Z'),
    cashedAt: new Date('2024-01-18T10:00:00Z'),
    clearedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: 'CHK-2',
    checkNumber: 'CHK-2024-002',
    checkDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-19'),
    vendorId: 'V-2',
    vendorName: 'XYZ Services Ltd.',
    checkType: CheckType.BUSINESS_CHECK,
    checkPurpose: CheckPurpose.SUPPLIER_PAYMENT,
    amount: 8500.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'PO-2024-002',
    description: 'Payment for services rendered',
    appliedPurchaseOrders: [
      {
        id: 'APO-2',
        poId: 'PO-2',
        poNumber: 'PO-2024-002',
        poDate: new Date('2024-01-20'),
        originalAmount: 8500.0,
        appliedAmount: 8500.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [
      {
        id: 'FEE-1',
        feeType: 'Check Processing Fee',
        description: 'Bank check processing fee',
        amount: 2.0,
        currency: 'USD',
      },
    ],
    status: CheckStatus.ISSUED,
    notes: 'Check issued and mailed',
    createdBy: 'admin',
    createdAt: new Date('2024-01-20T11:15:00Z'),
    updatedAt: new Date('2024-01-20T15:45:00Z'),
    approvedBy: 'manager',
    approvedAt: new Date('2024-01-20T12:00:00Z'),
    printedAt: new Date('2024-01-20T13:00:00Z'),
    issuedAt: new Date('2024-01-20T15:45:00Z'),
  },
  {
    id: 'CHK-3',
    checkNumber: 'CHK-2024-003',
    checkDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-24'),
    vendorId: 'V-3',
    vendorName: 'Tech Solutions Corp.',
    checkType: CheckType.BUSINESS_CHECK,
    checkPurpose: CheckPurpose.VENDOR_PAYMENT,
    amount: 5000.0,
    currency: 'USD',
    bankAccountId: 'BA-1',
    bankAccountName: 'Main Business Checking',
    referenceNumber: 'PO-2024-003',
    description: 'Partial payment for Purchase Order PO-2024-003',
    appliedPurchaseOrders: [
      {
        id: 'APO-3',
        poId: 'PO-3',
        poNumber: 'PO-2024-003',
        poDate: new Date('2024-01-25'),
        originalAmount: 22000.0,
        appliedAmount: 5000.0,
        discountAmount: 0,
        writeOffAmount: 0,
      },
    ],
    fees: [],
    status: CheckStatus.APPROVED,
    notes: 'Check approved, ready for printing',
    createdBy: 'admin',
    createdAt: new Date('2024-01-25T09:30:00Z'),
    updatedAt: new Date('2024-01-25T10:00:00Z'),
    approvedBy: 'manager',
    approvedAt: new Date('2024-01-25T10:00:00Z'),
  },
]

// API Functions
export const getChecks = async (
  filters?: CheckFilters,
  pagination?: Partial<CheckPagination>,
): Promise<{ checks: Check[]; pagination: CheckPagination }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredChecks = [...mockChecks]

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredChecks = filteredChecks.filter((c) => c.status === filters.status)
    }
    if (filters.checkType) {
      filteredChecks = filteredChecks.filter((c) => c.checkType === filters.checkType)
    }
    if (filters.checkPurpose) {
      filteredChecks = filteredChecks.filter((c) => c.checkPurpose === filters.checkPurpose)
    }
    if (filters.vendorId) {
      filteredChecks = filteredChecks.filter((c) => c.vendorId === filters.vendorId)
    }
    if (filters.bankAccountId) {
      filteredChecks = filteredChecks.filter((c) => c.bankAccountId === filters.bankAccountId)
    }
    if (filters.dateFrom) {
      filteredChecks = filteredChecks.filter((c) => c.checkDate >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filteredChecks = filteredChecks.filter((c) => c.checkDate <= filters.dateTo!)
    }
    if (filters.amountMin) {
      filteredChecks = filteredChecks.filter((c) => c.amount >= filters.amountMin!)
    }
    if (filters.amountMax) {
      filteredChecks = filteredChecks.filter((c) => c.amount <= filters.amountMax!)
    }
  }

  // Apply pagination
  const page = pagination?.page || 1
  const limit = pagination?.limit || 10
  const total = filteredChecks.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedChecks = filteredChecks.slice(startIndex, endIndex)

  return {
    checks: paginatedChecks,
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

export const getCheckById = async (id: string): Promise<Check | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockChecks.find((check) => check.id === id) || null
}

export const createCheck = async (data: CheckFormData): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newCheck: Check = {
    id: `CHK-${Date.now()}`,
    checkNumber: `CHK-2024-${String(mockChecks.length + 1).padStart(3, '0')}`,
    checkDate: data.checkDate,
    dueDate: data.dueDate,
    vendorId: data.vendorId,
    vendorName: mockVendors.find((v) => v.id === data.vendorId)?.vendorName || 'Unknown Vendor',
    checkType: data.checkType,
    checkPurpose: data.checkPurpose,
    amount: data.amount,
    currency: data.currency,
    bankAccountId: data.bankAccountId,
    bankAccountName:
      mockBankAccounts.find((ba) => ba.id === data.bankAccountId)?.accountName || 'Unknown Account',
    referenceNumber: data.referenceNumber,
    description: data.description,
    appliedPurchaseOrders: data.appliedPurchaseOrders.map((apo, index) => ({
      id: `APO-${Date.now()}-${index}`,
      poId: apo.poId,
      poNumber: mockPurchaseOrders.find((po) => po.id === apo.poId)?.poNumber || 'Unknown',
      poDate: mockPurchaseOrders.find((po) => po.id === apo.poId)?.poDate || new Date(),
      originalAmount: mockPurchaseOrders.find((po) => po.id === apo.poId)?.totalAmount || 0,
      appliedAmount: apo.appliedAmount,
      discountAmount: apo.discountAmount,
      writeOffAmount: apo.writeOffAmount,
    })),
    fees: [],
    status: CheckStatus.DRAFT,
    notes: data.notes,
    createdBy: 'current-user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks.push(newCheck)
  return newCheck
}

export const updateCheck = async (id: string, data: Partial<CheckFormData>): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const existingCheck = mockChecks[checkIndex]
  const updatedCheck: Check = {
    ...existingCheck,
    ...data,
    appliedPurchaseOrders: data.appliedPurchaseOrders
      ? data.appliedPurchaseOrders.map((apo, index) => ({
          id: `APO-${Date.now()}-${index}`,
          poId: apo.poId,
          poNumber: mockPurchaseOrders.find((po) => po.id === apo.poId)?.poNumber || 'Unknown',
          poDate: mockPurchaseOrders.find((po) => po.id === apo.poId)?.poDate || new Date(),
          originalAmount: mockPurchaseOrders.find((po) => po.id === apo.poId)?.totalAmount || 0,
          appliedAmount: apo.appliedAmount,
          discountAmount: apo.discountAmount,
          writeOffAmount: apo.writeOffAmount,
        }))
      : existingCheck.appliedPurchaseOrders,
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const deleteCheck = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  mockChecks.splice(checkIndex, 1)
}

export const getCheckStats = async (): Promise<CheckStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalChecks = mockChecks.length
  const totalAmount = mockChecks.reduce((sum, check) => sum + check.amount, 0)
  const pendingChecks = mockChecks.filter((c) => c.status === CheckStatus.PENDING_APPROVAL).length
  const approvedChecks = mockChecks.filter((c) => c.status === CheckStatus.APPROVED).length
  const issuedChecks = mockChecks.filter((c) => c.status === CheckStatus.ISSUED).length
  const cashedChecks = mockChecks.filter((c) => c.status === CheckStatus.CASHED).length
  const clearedChecks = mockChecks.filter((c) => c.status === CheckStatus.CLEARED).length
  const stoppedChecks = mockChecks.filter((c) => c.status === CheckStatus.STOPPED).length
  const voidedChecks = mockChecks.filter((c) => c.status === CheckStatus.VOIDED).length
  const averageCheckAmount = totalChecks > 0 ? totalAmount / totalChecks : 0

  const checksByType = Object.values(CheckType).reduce(
    (acc, type) => {
      acc[type] = mockChecks.filter((c) => c.checkType === type).length
      return acc
    },
    {} as Record<CheckType, number>,
  )

  const checksByPurpose = Object.values(CheckPurpose).reduce(
    (acc, purpose) => {
      acc[purpose] = mockChecks.filter((c) => c.checkPurpose === purpose).length
      return acc
    },
    {} as Record<CheckPurpose, number>,
  )

  return {
    totalChecks,
    totalAmount,
    pendingChecks,
    approvedChecks,
    issuedChecks,
    cashedChecks,
    clearedChecks,
    stoppedChecks,
    voidedChecks,
    averageCheckAmount,
    checksByType,
    checksByPurpose,
  }
}

export const approveCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.APPROVED,
    approvedBy: 'current-user',
    approvedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const printCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.PRINTED,
    printedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const issueCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.ISSUED,
    issuedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const cashCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.CASHED,
    cashedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const clearCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.CLEARED,
    clearedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const stopCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.STOPPED,
    stoppedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

export const voidCheck = async (id: string): Promise<Check> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const checkIndex = mockChecks.findIndex((check) => check.id === id)
  if (checkIndex === -1) {
    throw new Error('Check not found')
  }

  const updatedCheck: Check = {
    ...mockChecks[checkIndex],
    status: CheckStatus.VOIDED,
    voidedAt: new Date(),
    updatedAt: new Date(),
  }

  mockChecks[checkIndex] = updatedCheck
  return updatedCheck
}

// Supporting data functions
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockBankAccounts
}

export const getVendors = async (): Promise<Vendor[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockVendors
}

export const getPurchaseOrders = async (vendorId?: string): Promise<PurchaseOrder[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  if (vendorId) {
    return mockPurchaseOrders.filter((po) => po.vendorId === vendorId)
  }
  return mockPurchaseOrders
}
