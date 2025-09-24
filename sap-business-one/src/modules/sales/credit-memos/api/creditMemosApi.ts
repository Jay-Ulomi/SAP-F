export interface CreditMemoItem {
  id: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  creditAmount: number
}

export interface CreditMemo {
  id: string
  creditMemoNumber: string
  customerName: string
  originalInvoiceNumber: string
  creditDate: string
  processedDate?: string
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSED'
  reason: string
  rmaNumber?: string
  items: CreditMemoItem[]
  subtotal: number
  taxCredit: number
  totalCredit: number
  refundAmount?: number
  approvedBy?: string
  notes?: string
}

const mockCreditMemos: CreditMemo[] = [
  {
    id: '1',
    creditMemoNumber: 'CM-2024-001',
    customerName: 'Beta Industries',
    originalInvoiceNumber: 'INV-2024-002',
    creditDate: '2024-02-01',
    processedDate: '2024-02-02',
    status: 'PROCESSED',
    reason: 'Damaged items - 2 monitors arrived with cracked screens',
    rmaNumber: 'RMA-2024-001',
    items: [
      {
        id: '1',
        itemCode: 'MONITOR-001',
        itemName: '27" 4K Monitor',
        quantity: 2,
        unitPrice: 499.99,
        creditAmount: 999.98
      }
    ],
    subtotal: 999.98,
    taxCredit: 89.99,
    totalCredit: 1089.97,
    refundAmount: 1089.97,
    approvedBy: 'Manager: Robert Chen',
    notes: 'Customer has been refunded via original payment method'
  },
  {
    id: '2',
    creditMemoNumber: 'CM-2024-002',
    customerName: 'Acme Corporation',
    originalInvoiceNumber: 'INV-2024-001',
    creditDate: '2024-02-05',
    status: 'PENDING',
    reason: 'Price adjustment - promotional discount not applied',
    items: [
      {
        id: '2',
        itemCode: 'LAPTOP-001',
        itemName: 'Business Laptop Pro',
        quantity: 10,
        unitPrice: 100.00,
        creditAmount: 1000.00
      }
    ],
    subtotal: 1000.00,
    taxCredit: 90.00,
    totalCredit: 1090.00,
    notes: 'Awaiting management approval for price adjustment'
  },
  {
    id: '3',
    creditMemoNumber: 'CM-2024-003',
    customerName: 'TechStart Solutions',
    originalInvoiceNumber: 'INV-2024-004',
    creditDate: '2024-02-08',
    status: 'APPROVED',
    reason: 'Product defect discovered after installation',
    rmaNumber: 'RMA-2024-003',
    items: [
      {
        id: '3',
        itemCode: 'SERVER-001',
        itemName: 'Enterprise Server',
        quantity: 1,
        unitPrice: 8999.99,
        creditAmount: 8999.99
      }
    ],
    subtotal: 8999.99,
    taxCredit: 809.99,
    totalCredit: 9809.98,
    approvedBy: 'Manager: Sarah Wilson'
  }
]

class CreditMemosApiService {
  async getCreditMemos(): Promise<CreditMemo[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCreditMemos), 500)
    })
  }

  async getCreditMemo(id: string): Promise<CreditMemo | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCreditMemos.find(c => c.id === id)), 300)
    })
  }

  async createCreditMemo(creditMemo: Omit<CreditMemo, 'id'>): Promise<CreditMemo> {
    return new Promise((resolve) => {
      const newCreditMemo: CreditMemo = {
        ...creditMemo,
        id: Date.now().toString()
      }
      mockCreditMemos.unshift(newCreditMemo)
      setTimeout(() => resolve(newCreditMemo), 300)
    })
  }

  async updateCreditMemo(id: string, creditMemo: Partial<CreditMemo>): Promise<CreditMemo | undefined> {
    return new Promise((resolve) => {
      const index = mockCreditMemos.findIndex(c => c.id === id)
      if (index !== -1) {
        mockCreditMemos[index] = { ...mockCreditMemos[index], ...creditMemo }
        setTimeout(() => resolve(mockCreditMemos[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteCreditMemo(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockCreditMemos.findIndex(c => c.id === id)
      if (index !== -1) {
        mockCreditMemos.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }
}

export const creditMemosApi = new CreditMemosApiService()