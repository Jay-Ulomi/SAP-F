export interface LineItem {
  id: string
  itemCode: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
  uom: string
  dimension1?: string
  dimension2?: string
  dimension3?: string
  dimension4?: string
  warehouse?: string
  project?: string
  remarks?: string
}

export interface ServiceItem {
  id: string
  sno: number
  description: string
  discount: number
  total: number
  taxCode: string
  taxAmount: number
  dimension1?: string
  dimension2?: string
  dimension3?: string
  dimension4?: string
  warehouse?: string
  project?: string
}

export interface Quotation {
  id: string
  quotationNumber: string
  customerName: string
  customerCode: string
  contactPerson?: string
  customerAddress?: string
  quotationDate: string
  validUntil: string
  postingDate: string
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  type: 'Item' | 'Service'
  currency: string
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  relatedOpportunityId?: string
  freightType?: string
  freightAmount?: number
  lineItems: LineItem[]
  serviceItems: ServiceItem[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  terms?: string
  createdBy?: string
}

const mockQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QT-2024-001',
    customerName: 'Acme Corporation',
    customerCode: 'CUST001',
    contactPerson: 'John Doe',
    customerAddress: '123 Business St, New York, NY 10001',
    quotationDate: '2024-01-15',
    validUntil: '2024-02-15',
    postingDate: '2024-01-15',
    status: 'APPROVED',
    type: 'Item',
    currency: 'USD',
    exchangeRate: 1,
    salesPerson: 'Alice Johnson',
    reference: 'REF-001',
    remarks: 'Bulk order with special pricing',
    project: 'Project Alpha',
    relatedOpportunityId: 'OPP-001',
    freightType: 'Air Freight',
    freightAmount: 250.00,
    lineItems: [
      {
        id: '1',
        itemCode: 'LAPTOP-001',
        description: 'Business Laptop Pro',
        quantity: 10,
        unitPrice: 1299.99,
        discount: 5,
        discountType: 'PERCENTAGE',
        taxCode: 'OVAT-18',
        taxRate: 18,
        lineTotal: 12349.90,
        uom: 'pcs',
        dimension1: 'TECH',
        dimension2: 'CORP',
        dimension3: 'HARDWARE',
        dimension4: 'ELECTRONICS',
        warehouse: 'WH01',
        project: 'Project Alpha',
        remarks: 'Bulk purchase discount applied'
      },
      {
        id: '2',
        itemCode: 'MOUSE-002',
        description: 'Wireless Mouse',
        quantity: 10,
        unitPrice: 29.99,
        discount: 0,
        discountType: 'PERCENTAGE',
        taxCode: 'OVAT-18',
        taxRate: 18,
        lineTotal: 299.90,
        uom: 'pcs',
        dimension1: 'TECH',
        dimension2: 'CORP',
        dimension3: 'ACCESSORIES',
        dimension4: 'PERIPHERALS',
        warehouse: 'WH01',
        project: 'Project Alpha',
        remarks: 'Standard wireless mouse'
      }
    ],
    serviceItems: [],
    subtotal: 12649.80,
    taxAmount: 2276.96,
    discountAmount: 649.95,
    total: 14276.81,
    terms: 'Net 30 days. 2% discount if paid within 10 days.',
    createdBy: 'John Smith'
  },
  {
    id: '2',
    quotationNumber: 'QT-2024-002',
    customerName: 'TechStart Solutions',
    customerCode: 'CUST002',
    contactPerson: 'Jane Smith',
    customerAddress: '456 Innovation Ave, San Francisco, CA 94105',
    quotationDate: '2024-01-20',
    validUntil: '2024-02-20',
    postingDate: '2024-01-20',
    status: 'PENDING',
    type: 'Service',
    currency: 'USD',
    exchangeRate: 1,
    salesPerson: 'Bob Wilson',
    reference: 'REF-002',
    remarks: 'Custom service package',
    freightType: 'Road',
    freightAmount: 0,
    lineItems: [],
    serviceItems: [
      {
        id: '1',
        sno: 1,
        description: 'IT Consulting Services - Business Analysis and Requirements Gathering',
        discount: 0,
        total: 15000.00,
        taxCode: 'OVAT-18',
        taxAmount: 2700.00,
        dimension1: 'CONSULT',
        dimension2: 'BUSINESS',
        dimension3: 'ANALYSIS',
        dimension4: 'REQUIREMENTS',
        warehouse: 'SERVICES',
        project: 'Service Project'
      },
      {
        id: '2',
        sno: 2,
        description: 'System Integration - API Development and Database Migration',
        discount: 500.00,
        total: 8500.00,
        taxCode: 'OVAT-18',
        taxAmount: 1530.00,
        dimension1: 'INTEGRATION',
        dimension2: 'API',
        dimension3: 'DATABASE',
        dimension4: 'MIGRATION',
        warehouse: 'SERVICES',
        project: 'Service Project'
      }
    ],
    subtotal: 23000.00,
    taxAmount: 4230.00,
    discountAmount: 500.00,
    total: 26730.00,
    terms: 'Net 45 days',
    createdBy: 'Sarah Johnson'
  },
  {
    id: '3',
    quotationNumber: 'QT-2024-003',
    customerName: 'Global Enterprises Ltd',
    customerCode: 'CUST003',
    contactPerson: 'Mike Davis',
    customerAddress: '789 Commerce Blvd, Chicago, IL 60601',
    quotationDate: '2024-01-10',
    validUntil: '2024-01-25',
    postingDate: '2024-01-10',
    status: 'EXPIRED',
    type: 'Item',
    currency: 'USD',
    exchangeRate: 1,
    salesPerson: 'Carol Brown',
    reference: 'REF-003',
    remarks: 'Software licensing deal',
    freightType: 'Sea Freight',
    freightAmount: 100.00,
    lineItems: [
      {
        id: '6',
        itemCode: 'SOFT-001',
        description: 'Office Suite License - Microsoft Office Professional',
        quantity: 50,
        unitPrice: 299.99,
        discount: 10,
        discountType: 'PERCENTAGE',
        taxCode: 'OVAT-0',
        taxRate: 0,
        lineTotal: 13499.55,
        uom: 'license',
        dimension1: 'SOFTWARE',
        dimension2: 'OFFICE',
        dimension3: 'PRODUCTIVITY',
        dimension4: 'MICROSOFT',
        warehouse: 'WH02',
        project: 'Office Automation',
        remarks: 'Annual license with support'
      }
    ],
    serviceItems: [],
    subtotal: 14999.50,
    taxAmount: 0,
    discountAmount: 1499.95,
    total: 13499.55,
    terms: 'Payment upon delivery',
    createdBy: 'Mike Wilson'
  },
  {
    id: '4',
    quotationNumber: 'QT-2024-004',
    customerName: 'Innovation Labs Inc',
    customerCode: 'CUST004',
    contactPerson: 'Dr. Sarah Chen',
    customerAddress: '999 Research Drive, Boston, MA 02101',
    quotationDate: '2024-02-01',
    validUntil: '2024-03-01',
    postingDate: '2024-02-01',
    status: 'DRAFT',
    type: 'Item',
    currency: 'USD',
    exchangeRate: 1,
    salesPerson: 'David Lee',
    reference: 'REF-004',
    remarks: 'R&D Equipment and Software Bundle',
    project: 'Research Initiative 2024',
    relatedOpportunityId: 'OPP-004',
    freightType: 'Air Freight',
    freightAmount: 500.00,
    lineItems: [
      {
        id: '8',
        itemCode: 'SERVER-001',
        description: 'High-Performance Server - Dell PowerEdge R750',
        quantity: 2,
        unitPrice: 8999.99,
        discount: 8,
        discountType: 'PERCENTAGE',
        taxCode: 'OVAT-18',
        taxRate: 18,
        lineTotal: 16559.98,
        uom: 'units',
        dimension1: 'HARDWARE',
        dimension2: 'SERVER',
        dimension3: 'COMPUTE',
        dimension4: 'ENTERPRISE',
        warehouse: 'WH03',
        project: 'Research Initiative 2024',
        remarks: 'High-end configuration for ML workloads'
      },
      {
        id: '9',
        itemCode: 'STORAGE-001',
        description: 'NAS Storage System - 48TB RAID',
        quantity: 1,
        unitPrice: 4599.99,
        discount: 5,
        discountType: 'PERCENTAGE',
        taxCode: 'OVAT-18',
        taxRate: 18,
        lineTotal: 4369.99,
        uom: 'units',
        dimension1: 'HARDWARE',
        dimension2: 'STORAGE',
        dimension3: 'NAS',
        dimension4: 'ENTERPRISE',
        warehouse: 'WH03',
        project: 'Research Initiative 2024',
        remarks: 'Redundant storage for critical data'
      }
    ],
    serviceItems: [],
    subtotal: 22529.97,
    taxAmount: 4055.39,
    discountAmount: 1569.80,
    total: 25515.56,
    terms: 'Net 30 days. Installation and setup included.',
    createdBy: 'David Lee'
  }
]

class QuotationsApiService {
  async getQuotations(): Promise<Quotation[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockQuotations), 500)
    })
  }

  async getQuotation(id: string): Promise<Quotation | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockQuotations.find(q => q.id === id)), 300)
    })
  }

  async createQuotation(quotation: Omit<Quotation, 'id' | 'quotationNumber'>): Promise<Quotation> {
    return new Promise((resolve) => {
      const newId = Date.now().toString()
      const quotationNumber = `QT-${new Date().getFullYear()}-${String(mockQuotations.length + 1).padStart(3, '0')}`

      const newQuotation: Quotation = {
        ...quotation,
        id: newId,
        quotationNumber,
        status: quotation.status || 'DRAFT',
        createdBy: quotation.createdBy || 'System User',
        subtotal: quotation.subtotal || 0,
        taxAmount: quotation.taxAmount || 0,
        discountAmount: quotation.discountAmount || 0,
        total: quotation.total || 0
      }

      mockQuotations.unshift(newQuotation)
      setTimeout(() => resolve(newQuotation), 300)
    })
  }

  async updateQuotation(id: string, quotation: Partial<Quotation>): Promise<Quotation | undefined> {
    return new Promise((resolve) => {
      const index = mockQuotations.findIndex(q => q.id === id)
      if (index !== -1) {
        mockQuotations[index] = { ...mockQuotations[index], ...quotation }
        setTimeout(() => resolve(mockQuotations[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteQuotation(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockQuotations.findIndex(q => q.id === id)
      if (index !== -1) {
        mockQuotations.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }

  async updateQuotationStatus(id: string, status: Quotation['status']): Promise<Quotation | undefined> {
    return new Promise((resolve) => {
      const index = mockQuotations.findIndex(q => q.id === id)
      if (index !== -1) {
        mockQuotations[index].status = status
        setTimeout(() => resolve(mockQuotations[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async getQuotationsByCustomer(customerCode: string): Promise<Quotation[]> {
    return new Promise((resolve) => {
      const customerQuotations = mockQuotations.filter(q => q.customerCode === customerCode)
      setTimeout(() => resolve(customerQuotations), 300)
    })
  }

  async getQuotationsByStatus(status: Quotation['status']): Promise<Quotation[]> {
    return new Promise((resolve) => {
      const statusQuotations = mockQuotations.filter(q => q.status === status)
      setTimeout(() => resolve(statusQuotations), 300)
    })
  }

  async searchQuotations(searchTerm: string): Promise<Quotation[]> {
    return new Promise((resolve) => {
      const searchResults = mockQuotations.filter(q =>
        q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.reference && q.reference.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setTimeout(() => resolve(searchResults), 300)
    })
  }
}

export const quotationsApi = new QuotationsApiService()
