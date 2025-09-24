export interface DeliveryItem {
  id: string
  itemCode: string
  itemName: string
  orderedQuantity: number
  deliveredQuantity: number
}

export interface Delivery {
  id: string
  deliveryNumber: string
  customerName: string
  salesOrderNumber: string
  deliveryAddress: string
  deliveryDate: string
  estimatedDelivery?: string
  actualDelivery?: string
  status: 'PENDING' | 'PROCESSING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'
  items: DeliveryItem[]
  trackingNumber?: string
  carrier?: string
  shippingMethod?: string
  weight?: number
  shippingCost?: number
  notes?: string
}

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    deliveryNumber: 'DL-2024-001',
    customerName: 'Acme Corporation',
    salesOrderNumber: 'SO-2024-001',
    deliveryAddress: '123 Business St, New York, NY 10001',
    deliveryDate: '2024-01-25',
    estimatedDelivery: '2024-01-27',
    actualDelivery: '2024-01-26',
    status: 'DELIVERED',
    items: [
      {
        id: '1',
        itemCode: 'LAPTOP-001',
        itemName: 'Business Laptop Pro',
        orderedQuantity: 10,
        deliveredQuantity: 10
      },
      {
        id: '2',
        itemCode: 'MOUSE-002',
        itemName: 'Wireless Mouse',
        orderedQuantity: 10,
        deliveredQuantity: 10
      }
    ],
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS',
    shippingMethod: 'Express',
    weight: 25.5,
    shippingCost: 125.50,
    notes: 'Delivered to reception desk. Signed by J. Doe.'
  },
  {
    id: '2',
    deliveryNumber: 'DL-2024-002',
    customerName: 'Beta Industries',
    salesOrderNumber: 'SO-2024-002',
    deliveryAddress: '789 Industrial Park, Detroit, MI 48201',
    deliveryDate: '2024-01-28',
    estimatedDelivery: '2024-01-30',
    status: 'IN_TRANSIT',
    items: [
      {
        id: '3',
        itemCode: 'MONITOR-001',
        itemName: '27" 4K Monitor',
        orderedQuantity: 15,
        deliveredQuantity: 8
      }
    ],
    trackingNumber: 'FDX123456789',
    carrier: 'FedEx',
    shippingMethod: 'Standard',
    weight: 45.0,
    shippingCost: 89.99
  },
  {
    id: '3',
    deliveryNumber: 'DL-2024-003',
    customerName: 'TechStart Solutions',
    salesOrderNumber: 'SO-2024-003',
    deliveryAddress: '456 Innovation Ave, San Francisco, CA 94105',
    deliveryDate: '2024-02-12',
    estimatedDelivery: '2024-02-15',
    status: 'PROCESSING',
    items: [
      {
        id: '4',
        itemCode: 'SERVER-001',
        itemName: 'Enterprise Server',
        orderedQuantity: 2,
        deliveredQuantity: 0
      }
    ],
    carrier: 'DHL',
    shippingMethod: 'Freight',
    weight: 85.0,
    shippingCost: 250.00,
    notes: 'Large item - requires freight delivery'
  }
]

class DeliveriesApiService {
  async getDeliveries(): Promise<Delivery[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDeliveries), 500)
    })
  }

  async getDelivery(id: string): Promise<Delivery | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDeliveries.find(d => d.id === id)), 300)
    })
  }

  async createDelivery(delivery: Omit<Delivery, 'id'>): Promise<Delivery> {
    return new Promise((resolve) => {
      const newDelivery: Delivery = {
        ...delivery,
        id: Date.now().toString()
      }
      mockDeliveries.unshift(newDelivery)
      setTimeout(() => resolve(newDelivery), 300)
    })
  }

  async updateDelivery(id: string, delivery: Partial<Delivery>): Promise<Delivery | undefined> {
    return new Promise((resolve) => {
      const index = mockDeliveries.findIndex(d => d.id === id)
      if (index !== -1) {
        mockDeliveries[index] = { ...mockDeliveries[index], ...delivery }
        setTimeout(() => resolve(mockDeliveries[index]), 300)
      } else {
        setTimeout(() => resolve(undefined), 300)
      }
    })
  }

  async deleteDelivery(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = mockDeliveries.findIndex(d => d.id === id)
      if (index !== -1) {
        mockDeliveries.splice(index, 1)
        setTimeout(() => resolve(true), 300)
      } else {
        setTimeout(() => resolve(false), 300)
      }
    })
  }
}

export const deliveriesApi = new DeliveriesApiService()