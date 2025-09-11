import { TrackingType, SerialBatchStatus, SerialBatchLocationType, QualityStatus } from '../types'
import type {
  SerialBatchItem,
  SerialBatchFormData,
  SerialBatchListParams,
  SerialBatchListResponse,
  SerialBatchStats,
} from '../types'

// Mock data
const mockSerialBatches: SerialBatchItem[] = [
  {
    id: '1',
    trackingType: TrackingType.SERIAL,
    itemCode: 'ITEM001',
    itemName: 'Laptop Computer',
    description: 'Dell Latitude 5520',
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationType: SerialBatchLocationType.BIN,
    binCode: 'BIN001',
    binName: 'Electronics Bin',
    unitOfMeasure: 'EA',
    quantity: 1,
    availableQuantity: 1,
    committedQuantity: 0,
    issuedQuantity: 0,
    unitCost: 1000,
    totalValue: 1000,
    serialNumber: 'SN-0001-5520',
    manufactureDate: new Date('2024-01-10'),
    admissionDate: new Date('2024-01-15'),
    qualityStatus: QualityStatus.RELEASED,
    remarks: 'New serial in stock',
    createdBy: 'admin',
    createdDate: new Date('2024-01-15T09:00:00Z'),
  },
  {
    id: '2',
    trackingType: TrackingType.BATCH,
    itemCode: 'ITEM004',
    itemName: 'Raw Material A',
    description: 'Steel Component',
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationType: SerialBatchLocationType.WAREHOUSE,
    unitOfMeasure: 'KG',
    quantity: 1000,
    availableQuantity: 980,
    committedQuantity: 20,
    issuedQuantity: 0,
    unitCost: 50,
    totalValue: 50000,
    batchNumber: 'BATCH-STEEL-2401',
    manufactureDate: new Date('2023-12-20'),
    admissionDate: new Date('2024-01-05'),
    qualityStatus: QualityStatus.RELEASED,
    remarks: 'Bulk material',
    createdBy: 'admin',
    createdDate: new Date('2024-01-05T08:00:00Z'),
  },
  {
    id: '3',
    trackingType: TrackingType.BATCH,
    itemCode: 'ITEM003',
    itemName: 'USB Cable',
    warehouseCode: 'WH002',
    warehouseName: 'Branch Warehouse',
    locationType: SerialBatchLocationType.BIN,
    binCode: 'BIN010',
    binName: 'Accessories',
    unitOfMeasure: 'EA',
    quantity: 500,
    availableQuantity: 450,
    committedQuantity: 50,
    issuedQuantity: 0,
    unitCost: 10,
    totalValue: 5000,
    batchNumber: 'BATCH-USB-2402',
    manufactureDate: new Date('2024-02-01'),
    admissionDate: new Date('2024-02-03'),
    expiryDate: new Date('2026-02-01'),
    qualityStatus: QualityStatus.ON_HOLD,
    remarks: 'QC pending',
    createdBy: 'admin',
    createdDate: new Date('2024-02-03T10:00:00Z'),
  },
  {
    id: '4',
    trackingType: TrackingType.SERIAL,
    itemCode: 'ITEM002',
    itemName: 'Wireless Mouse',
    warehouseCode: 'WH001',
    warehouseName: 'Main Warehouse',
    locationType: SerialBatchLocationType.BIN,
    binCode: 'BIN001',
    binName: 'Electronics Bin',
    unitOfMeasure: 'EA',
    quantity: 1,
    availableQuantity: 0,
    committedQuantity: 0,
    issuedQuantity: 1,
    unitCost: 80,
    totalValue: 80,
    serialNumber: 'SN-LOGI-0003',
    manufactureDate: new Date('2023-11-11'),
    admissionDate: new Date('2023-12-01'),
    qualityStatus: QualityStatus.RELEASED,
    remarks: 'Issued to Sales Order SO-1001',
    createdBy: 'admin',
    createdDate: new Date('2023-12-01T09:00:00Z'),
    modifiedBy: 'admin',
    modifiedDate: new Date('2024-01-20T15:00:00Z'),
  },
  {
    id: '5',
    trackingType: TrackingType.BATCH,
    itemCode: 'ITEM010',
    itemName: 'Chemical X',
    warehouseCode: 'WH003',
    warehouseName: 'Production Warehouse',
    locationType: SerialBatchLocationType.WAREHOUSE,
    unitOfMeasure: 'L',
    quantity: 200,
    availableQuantity: 150,
    committedQuantity: 10,
    issuedQuantity: 40,
    unitCost: 25,
    totalValue: 5000,
    batchNumber: 'CHEM-X-2402',
    manufactureDate: new Date('2024-02-05'),
    admissionDate: new Date('2024-02-06'),
    expiryDate: new Date('2025-02-05'),
    qualityStatus: QualityStatus.RELEASED,
    remarks: 'Handle with care',
    createdBy: 'admin',
    createdDate: new Date('2024-02-06T11:00:00Z'),
  },
]

export const serialBatchesApi = {
  async getSerials(params: SerialBatchListParams = {}): Promise<SerialBatchListResponse> {
    const { page = 1, limit = 10, sortBy = 'createdDate', sortOrder = 'desc', filters = {} } = params

    let filtered = [...mockSerialBatches]

    if (filters.trackingType) filtered = filtered.filter((i) => i.trackingType === filters.trackingType)
    if (filters.status) {
      // Map status logically to quantities
      filtered = filtered.filter((i) => {
        switch (filters.status) {
          case SerialBatchStatus.ACTIVE:
            return i.availableQuantity > 0
          case SerialBatchStatus.INACTIVE:
            return i.availableQuantity === 0 && i.issuedQuantity === 0
          case SerialBatchStatus.ISSUED:
            return i.issuedQuantity > 0
          case SerialBatchStatus.RECEIVED:
            return !!i.admissionDate
          case SerialBatchStatus.RESERVED:
            return i.committedQuantity > 0
          case SerialBatchStatus.EXPIRED:
            return !!i.expiryDate && i.expiryDate < new Date()
          default:
            return true
        }
      })
    }
    if (filters.warehouseCode) filtered = filtered.filter((i) => i.warehouseCode === filters.warehouseCode)
    if (filters.binCode) filtered = filtered.filter((i) => i.binCode === filters.binCode)
    if (filters.itemCode) filtered = filtered.filter((i) => i.itemCode === filters.itemCode)
    if (filters.itemGroup) filtered = filtered.filter((i) => i.description?.toLowerCase().includes(filters.itemGroup!.toLowerCase()))
    if (filters.qualityStatus) filtered = filtered.filter((i) => i.qualityStatus === filters.qualityStatus)
    if (filters.dateFrom) filtered = filtered.filter((i) => i.createdDate >= filters.dateFrom!)
    if (filters.dateTo) filtered = filtered.filter((i) => i.createdDate <= filters.dateTo!)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(
        (i) =>
          i.itemCode.toLowerCase().includes(q) ||
          i.itemName.toLowerCase().includes(q) ||
          i.serialNumber?.toLowerCase().includes(q) ||
          i.batchNumber?.toLowerCase().includes(q) ||
          i.warehouseName.toLowerCase().includes(q) ||
          i.binName?.toLowerCase().includes(q),
      )
    }

    filtered.sort((a, b) => {
      const av = a[sortBy as keyof SerialBatchItem]
      const bv = b[sortBy as keyof SerialBatchItem]
      if (av === undefined || bv === undefined) return 0
      if (av < bv) return sortOrder === 'asc' ? -1 : 1
      if (av > bv) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const items = filtered.slice(start, start + limit)

    const stats: SerialBatchStats = {
      totalTrackedItems: mockSerialBatches.length,
      totalSerials: mockSerialBatches.filter((i) => i.trackingType === TrackingType.SERIAL).length,
      totalBatches: mockSerialBatches.filter((i) => i.trackingType === TrackingType.BATCH).length,
      expiringSoon: mockSerialBatches.filter((i) => i.expiryDate && i.expiryDate > new Date() && i.expiryDate < new Date(Date.now() + 30 * 86400000)).length,
      expired: mockSerialBatches.filter((i) => i.expiryDate && i.expiryDate < new Date()).length,
      totalValue: mockSerialBatches.reduce((sum, i) => sum + i.totalValue, 0),
    }

    return { items, total, page, limit, totalPages, stats }
  },

  async getSerial(id: string): Promise<SerialBatchItem | null> {
    return mockSerialBatches.find((i) => i.id === id) || null
  },

  async createSerial(data: SerialBatchFormData): Promise<SerialBatchItem> {
    const newId = (mockSerialBatches.length + 1).toString()
    const newItem: SerialBatchItem = {
      id: newId,
      trackingType: data.trackingType,
      itemCode: data.itemCode,
      itemName: data.itemName,
      warehouseCode: data.warehouseCode,
      warehouseName: 'Warehouse Name',
      locationType: data.locationType,
      binCode: data.binCode,
      unitOfMeasure: data.unitOfMeasure,
      quantity: data.quantity,
      availableQuantity: data.quantity,
      committedQuantity: 0,
      issuedQuantity: 0,
      unitCost: data.unitCost,
      totalValue: data.quantity * data.unitCost,
      serialNumber: data.serialNumber,
      batchNumber: data.batchNumber,
      lotNumber: data.lotNumber,
      manufactureDate: data.manufactureDate,
      expiryDate: data.expiryDate,
      admissionDate: data.admissionDate || new Date(),
      qualityStatus: data.qualityStatus,
      remarks: data.remarks,
      createdBy: 'admin',
      createdDate: new Date(),
    }
    mockSerialBatches.unshift(newItem)
    return newItem
  },

  async updateSerial(id: string, data: Partial<SerialBatchFormData>): Promise<SerialBatchItem> {
    const idx = mockSerialBatches.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error('Serial/Batch not found')
    const updated: SerialBatchItem = {
      ...mockSerialBatches[idx],
      ...data,
      totalValue: (data.quantity ?? mockSerialBatches[idx].quantity) * (data.unitCost ?? mockSerialBatches[idx].unitCost),
      modifiedBy: 'admin',
      modifiedDate: new Date(),
    }
    mockSerialBatches[idx] = updated
    return updated
  },

  async deleteSerial(id: string): Promise<void> {
    const idx = mockSerialBatches.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error('Serial/Batch not found')
    mockSerialBatches.splice(idx, 1)
  },

  async getStats(): Promise<SerialBatchStats> {
    return {
      totalTrackedItems: mockSerialBatches.length,
      totalSerials: mockSerialBatches.filter((i) => i.trackingType === TrackingType.SERIAL).length,
      totalBatches: mockSerialBatches.filter((i) => i.trackingType === TrackingType.BATCH).length,
      expiringSoon: mockSerialBatches.filter((i) => i.expiryDate && i.expiryDate > new Date() && i.expiryDate < new Date(Date.now() + 30 * 86400000)).length,
      expired: mockSerialBatches.filter((i) => i.expiryDate && i.expiryDate < new Date()).length,
      totalValue: mockSerialBatches.reduce((sum, i) => sum + i.totalValue, 0),
    }
  },
}
