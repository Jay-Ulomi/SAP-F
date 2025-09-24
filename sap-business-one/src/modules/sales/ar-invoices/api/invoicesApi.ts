export interface InvoiceItem {
  id: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  taxAmount: number
  lineTotal: number
}

export interface Payment {
  id: string
  paymentDate: string
  paymentMethod: string
  amount: number
  reference: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  customerCode: string
  billingAddress: string
  invoiceDate: string
  dueDate: string
  paidDate?: string
  status: 'DRAFT' | 'SENT' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED'
  items: InvoiceItem[]
  payments?: Payment[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  balanceDue: number
  deliveryNumber?: string
  poNumber?: string
  terms?: string
  notes?: string
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'Acme Corporation',
    customerCode: 'CUST001',
    billingAddress: '123 Business St, New York, NY 10001',
    invoiceDate: '2024-01-26',
    dueDate: '2024-02-25',
    paidDate: '2024-02-10',
    status: 'PAID',
    items: [
      {
        id: '1',
        itemCode: 'LAPTOP-001',
        itemName: 'Business Laptop Pro',
        quantity: 10,
        unitPrice: 1299.99,
        taxAmount: 116.99,
        lineTotal: 12999.90
      },
      {
        id: '2',
        itemCode: 'MOUSE-002',
        itemName: 'Wireless Mouse',
        quantity: 10,
        unitPrice: 29.99,
        taxAmount: 2.70,
        lineTotal: 299.90
      }
    ],
    payments: [
      {
        id: '1',
        paymentDate: '2024-02-10',
        paymentMethod: 'Wire Transfer',
        amount: 13996.78,
        reference: 'WT-2024-0210-001'
      }
    ],
    subtotal: 13299.80,
    taxAmount: 1196.98,
    discountAmount: 500.00,
    totalAmount: 13996.78,
    balanceDue: 0,
    deliveryNumber: 'DL-2024-001',
    poNumber: 'PO-ACME-2024-145',
    terms: 'Net 30 days',
    notes: 'Thank you for your business!'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerName: 'TechStart Solutions',
    customerCode: 'CUST002',
    billingAddress: '456 Innovation Ave, San Francisco, CA 94105',
    invoiceDate: '2024-01-28',
    dueDate: '2024-02-28',
    status: 'PARTIAL',
    items: [
      {
        id: '3',
        itemCode: 'SERVER-001',
        itemName: 'Enterprise Server',
        quantity: 2,
        unitPrice: 8999.99,
        taxAmount: 809.99,
        lineTotal: 17999.98
      }
    ],
    payments: [
      {
        id: '2',
        paymentDate: '2024-02-05',
        paymentMethod: 'Check',
        amount: 10000.00,
        reference: 'CHK-4567'
      }
    ],
    subtotal: 17999.98,
    taxAmount: 1619.99,
    discountAmount: 0,
    totalAmount: 19619.97,
    balanceDue: 9619.97,
    terms: 'Net 30 days'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customerName: 'Global Enterprises Ltd',
    customerCode: 'CUST003',
    billingAddress: '789 Commerce Blvd, Chicago, IL 60601',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'OVERDUE',
    items: [
      {
        id: '4',
        itemCode: 'SOFT-001',
        itemName: 'Office Suite License',
        quantity: 25,
        unitPrice: 299.99,
        taxAmount: 26.99,
        lineTotal: 7499.75
      }
    ],
    subtotal: 7499.75,
    taxAmount: 674.98,
    discountAmount: 0,
    totalAmount: 8174.73,
    balanceDue: 8174.73
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    customerName: 'Beta Industries',
    customerCode: 'CUST004',
    billingAddress: '789 Industrial Park, Detroit, MI 48201',
    invoiceDate: '2024-02-01',
    dueDate: '2024-03-01',
    status: 'SENT',
    items: [
      {
        id: '5',
        itemCode: 'MONITOR-001',
        itemName: '27" 4K Monitor',
        quantity: 13,
        unitPrice: 499.99,
        taxAmount: 44.99,
        lineTotal: 6499.87
      }
    ],
    subtotal: 6499.87,
    taxAmount: 584.99,
    discountAmount: 0,
    totalAmount: 7084.86,
    balanceDue: 7084.86,
    deliveryNumber: 'DL-2024-002'
  }
]

class InvoicesApiService {
  async getArInvoices(): Promise<Invoice[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInvoices), 500)
    })
  }

  async getArInvoice(id: string): Promise<Invoice | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInvoices.find(i => i.id === id)), 300)
    })
  }

  async createArInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
    return new Promise((resolve) => {
      const newInvoice: Invoice = {
        ...invoice,
        id: Date.now().toString()
      }
      mockInvoices.unshift(newInvoice)
      setTimeout(() => resolve(newInvoice), 300)
    })
  }

  async updateArInvoice(id: string, invoice: Partial<Invoice>): Promise<Invoice | undefined> {
    return new Promise((resolve) => {
      const index = mockInvoices.findIndex(i => i.id === id)
      if (index !== -1) {
        mockInvoices[index] = { ...mockInvoices[index], ...invoice }
        setTimeout(() => resolve(mockInvoices[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteArInvoice(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockInvoices.findIndex(i => i.id === id)
      if (index !== -1) {
        mockInvoices.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }

  async recordPayment(invoiceId: string, payment: Omit<Payment, 'id'>): Promise<Payment | undefined> {
    return new Promise((resolve) => {
      const invoice = mockInvoices.find(i => i.id === invoiceId)
      if (invoice) {
        const newPayment: Payment = {
          ...payment,
          id: Date.now().toString()
        }

        if (!invoice.payments) {
          invoice.payments = []
        }
        invoice.payments.push(newPayment)

        const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0)
        invoice.balanceDue = invoice.totalAmount - totalPaid

        if (invoice.balanceDue <= 0) {
          invoice.status = 'PAID'
          invoice.paidDate = payment.paymentDate
        } else if (totalPaid > 0) {
          invoice.status = 'PARTIAL'
        }

        setTimeout(() => resolve(newPayment), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }
}

export const invoicesApi = new InvoicesApiService()