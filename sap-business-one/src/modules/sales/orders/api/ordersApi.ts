export interface SalesOrderItem {
  id: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface SalesOrder {
  id: string
  orderNumber: string
  customerName: string
  customerCode: string
  orderDate: string
  deliveryDate: string
  status: 'OPEN' | 'CONFIRMED' | 'PARTIAL' | 'DELIVERED' | 'CANCELLED'
  items: SalesOrderItem[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
}

const mockSalesOrders: SalesOrder[] = [
  {
    id: '1',
    orderNumber: 'SO-2024-001',
    customerName: 'Acme Corporation',
    customerCode: 'CUST001',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-25',
    status: 'DELIVERED',
    items: [
      {
        id: '1',
        itemCode: 'LAPTOP-001',
        itemName: 'Business Laptop Pro',
        quantity: 10,
        unitPrice: 1299.99,
        lineTotal: 12999.90
      },
      {
        id: '2',
        itemCode: 'MOUSE-002',
        itemName: 'Wireless Mouse',
        quantity: 10,
        unitPrice: 29.99,
        lineTotal: 299.90
      }
    ],
    subtotal: 13299.80,
    taxAmount: 1196.98,
    discountAmount: 500.00,
    total: 13996.78
  },
  {
    id: '2',
    orderNumber: 'SO-2024-002',
    customerName: 'Beta Industries',
    customerCode: 'CUST004',
    orderDate: '2024-01-22',
    deliveryDate: '2024-01-30',
    status: 'PARTIAL',
    items: [
      {
        id: '3',
        itemCode: 'MONITOR-001',
        itemName: '27" 4K Monitor',
        quantity: 15,
        unitPrice: 499.99,
        lineTotal: 7499.85
      }
    ],
    subtotal: 7499.85,
    taxAmount: 674.99,
    discountAmount: 0,
    total: 8174.84
  },
  {
    id: '3',
    orderNumber: 'SO-2024-003',
    customerName: 'TechStart Solutions',
    customerCode: 'CUST002',
    orderDate: '2024-02-01',
    deliveryDate: '2024-02-10',
    status: 'CONFIRMED',
    items: [
      {
        id: '4',
        itemCode: 'SERVER-001',
        itemName: 'Enterprise Server',
        quantity: 2,
        unitPrice: 8999.99,
        lineTotal: 17999.98
      },
      {
        id: '5',
        itemCode: 'UPS-001',
        itemName: 'UPS Battery Backup',
        quantity: 2,
        unitPrice: 599.99,
        lineTotal: 1199.98
      }
    ],
    subtotal: 19199.96,
    taxAmount: 1727.99,
    discountAmount: 0,
    total: 20927.95
  }
]

class OrdersApiService {
  async getSalesOrders(): Promise<SalesOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSalesOrders), 500)
    })
  }

  async getSalesOrder(id: string): Promise<SalesOrder | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSalesOrders.find(o => o.id === id)), 300)
    })
  }

  async createSalesOrder(order: Omit<SalesOrder, 'id'>): Promise<SalesOrder> {
    return new Promise((resolve) => {
      const newOrder: SalesOrder = {
        ...order,
        id: Date.now().toString()
      }
      mockSalesOrders.unshift(newOrder)
      setTimeout(() => resolve(newOrder), 300)
    })
  }

  async updateSalesOrder(id: string, order: Partial<SalesOrder>): Promise<SalesOrder | undefined> {
    return new Promise((resolve) => {
      const index = mockSalesOrders.findIndex(o => o.id === id)
      if (index !== -1) {
        mockSalesOrders[index] = { ...mockSalesOrders[index], ...order }
        setTimeout(() => resolve(mockSalesOrders[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteSalesOrder(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockSalesOrders.findIndex(o => o.id === id)
      if (index !== -1) {
        mockSalesOrders.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }
}

export const ordersApi = new OrdersApiService()