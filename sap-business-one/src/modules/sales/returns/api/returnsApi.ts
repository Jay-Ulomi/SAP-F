export interface ReturnItem {
  id: string
  itemCode: string
  itemName: string
  returnedQuantity: number
  condition: 'GOOD' | 'DAMAGED' | 'DEFECTIVE'
  restockable: boolean
  creditAmount: number
}

export interface Return {
  id: string
  returnNumber: string
  customerName: string
  originalInvoiceNumber: string
  rmaNumber: string
  returnDate: string
  receivedDate?: string
  status: 'PENDING' | 'APPROVED' | 'RECEIVED' | 'INSPECTING' | 'REJECTED' | 'CANCELLED'
  returnReason: string
  items: ReturnItem[]
  totalCreditAmount: number
  restockingFee: number
  customerNotes?: string
  inspectionNotes?: string
  processedBy?: string
}

const mockReturns: Return[] = [
  {
    id: '1',
    returnNumber: 'RET-2024-001',
    customerName: 'Beta Industries',
    originalInvoiceNumber: 'INV-2024-002',
    rmaNumber: 'RMA-2024-001',
    returnDate: '2024-01-31',
    receivedDate: '2024-02-01',
    status: 'APPROVED',
    returnReason: 'Damaged items received',
    items: [
      {
        id: '1',
        itemCode: 'MONITOR-001',
        itemName: '27" 4K Monitor',
        returnedQuantity: 2,
        condition: 'DAMAGED',
        restockable: false,
        creditAmount: 999.98
      }
    ],
    totalCreditAmount: 999.98,
    restockingFee: 0,
    customerNotes: 'Two monitors arrived with visible cracks on the screen. Photos attached.',
    inspectionNotes: 'Confirmed physical damage. Items cannot be restocked. Full credit approved.',
    processedBy: 'QA Team - Alex Martinez'
  },
  {
    id: '2',
    returnNumber: 'RET-2024-002',
    customerName: 'TechStart Solutions',
    originalInvoiceNumber: 'INV-2024-004',
    rmaNumber: 'RMA-2024-002',
    returnDate: '2024-02-03',
    status: 'INSPECTING',
    returnReason: 'Wrong items delivered',
    items: [
      {
        id: '2',
        itemCode: 'KEYBOARD-003',
        itemName: 'Mechanical Keyboard',
        returnedQuantity: 5,
        condition: 'GOOD',
        restockable: true,
        creditAmount: 449.95
      }
    ],
    totalCreditAmount: 449.95,
    restockingFee: 44.99,
    customerNotes: 'Received mechanical keyboards instead of wireless keyboards ordered.',
    processedBy: 'Returns Dept - Maria Lopez'
  },
  {
    id: '3',
    returnNumber: 'RET-2024-003',
    customerName: 'Global Enterprises Ltd',
    originalInvoiceNumber: 'INV-2024-003',
    rmaNumber: 'RMA-2024-003',
    returnDate: '2024-02-10',
    status: 'PENDING',
    returnReason: 'Product not as described',
    items: [
      {
        id: '3',
        itemCode: 'SOFT-001',
        itemName: 'Office Suite License',
        returnedQuantity: 10,
        condition: 'GOOD',
        restockable: true,
        creditAmount: 2999.90
      }
    ],
    totalCreditAmount: 2999.90,
    restockingFee: 299.99,
    customerNotes: 'Licenses were for wrong version of software'
  },
  {
    id: '4',
    returnNumber: 'RET-2024-004',
    customerName: 'Acme Corporation',
    originalInvoiceNumber: 'INV-2024-005',
    rmaNumber: 'RMA-2024-004',
    returnDate: '2024-02-12',
    receivedDate: '2024-02-13',
    status: 'RECEIVED',
    returnReason: 'Customer changed requirements',
    items: [
      {
        id: '4',
        itemCode: 'LAPTOP-001',
        itemName: 'Business Laptop Pro',
        returnedQuantity: 3,
        condition: 'GOOD',
        restockable: true,
        creditAmount: 3899.97
      }
    ],
    totalCreditAmount: 3899.97,
    restockingFee: 194.99,
    customerNotes: 'Project requirements changed, no longer need these specific models',
    processedBy: 'Returns Dept - John Kim'
  }
]

class ReturnsApiService {
  async getReturns(): Promise<Return[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockReturns), 500)
    })
  }

  async getReturn(id: string): Promise<Return | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockReturns.find(r => r.id === id)), 300)
    })
  }

  async createReturn(returnItem: Omit<Return, 'id'>): Promise<Return> {
    return new Promise((resolve) => {
      const newReturn: Return = {
        ...returnItem,
        id: Date.now().toString()
      }
      mockReturns.unshift(newReturn)
      setTimeout(() => resolve(newReturn), 300)
    })
  }

  async updateReturn(id: string, returnItem: Partial<Return>): Promise<Return | undefined> {
    return new Promise((resolve) => {
      const index = mockReturns.findIndex(r => r.id === id)
      if (index !== -1) {
        mockReturns[index] = { ...mockReturns[index], ...returnItem }
        setTimeout(() => resolve(mockReturns[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteReturn(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockReturns.findIndex(r => r.id === id)
      if (index !== -1) {
        mockReturns.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }
}

export const returnsApi = new ReturnsApiService()