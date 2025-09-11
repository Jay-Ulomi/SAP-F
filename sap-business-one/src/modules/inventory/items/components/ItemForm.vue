<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div
      class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
    >
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">
            {{ isEditing ? 'Edit Item' : 'Create New Item' }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                @click="activeTab = tab.id"
                :class="[
                  activeTab === tab.id
                    ? 'border-sap-blue text-sap-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Basic Information Tab -->
          <div v-if="activeTab === 'basic'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Item Code *</label>
                  <input
                    v-model="formData.itemCode"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter item code"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    v-model="formData.itemName"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
                  <select
                    v-model="formData.type"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="inventory">Inventory</option>
                    <option value="service">Service</option>
                    <option value="asset">Asset</option>
                    <option value="consumable">Consumable</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    v-model="formData.status"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="discontinued">Discontinued</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Item Group *</label>
                  <select
                    v-model="formData.group"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="raw_materials">Raw Materials</option>
                    <option value="finished_goods">Finished Goods</option>
                    <option value="semi_finished">Semi-Finished</option>
                    <option value="spare_parts">Spare Parts</option>
                    <option value="consumables">Consumables</option>
                    <option value="services">Services</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Unit of Measure *</label
                  >
                  <select
                    v-model="formData.unitOfMeasure"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="piece">Piece</option>
                    <option value="kilogram">Kilogram</option>
                    <option value="liter">Liter</option>
                    <option value="meter">Meter</option>
                    <option value="hour">Hour</option>
                    <option value="box">Box</option>
                    <option value="pallet">Pallet</option>
                  </select>
                </div>
                <div class="md:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter item description"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing & Costing Tab -->
          <div v-if="activeTab === 'pricing'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Pricing & Costing</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Base Unit Price *</label
                  >
                  <input
                    v-model.number="formData.baseUnitPrice"
                    type="number"
                    step="0.01"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Standard Cost</label>
                  <input
                    v-model.number="formData.standardCost"
                    type="number"
                    step="0.01"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Valuation Method *</label
                  >
                  <select
                    v-model="formData.valuationMethod"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="fifo">FIFO</option>
                    <option value="lifo">LIFO</option>
                    <option value="average">Average</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tax Code</label>
                  <select
                    v-model="formData.taxCode"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="">Select Tax Code</option>
                    <option value="VAT_STANDARD">VAT Standard (20%)</option>
                    <option value="VAT_REDUCED">VAT Reduced (10%)</option>
                    <option value="VAT_ZERO">VAT Zero (0%)</option>
                    <option value="EXEMPT">Exempt</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Inventory Tab -->
          <div v-if="activeTab === 'inventory'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Inventory Management</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Minimum Stock Level</label
                  >
                  <input
                    v-model.number="formData.minStockLevel"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Maximum Stock Level</label
                  >
                  <input
                    v-model.number="formData.maxStockLevel"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                  <input
                    v-model.number="formData.reorderPoint"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Reorder Quantity</label
                  >
                  <input
                    v-model.number="formData.reorderQuantity"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                  <select
                    v-model="formData.warehouseCode"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="">Select Warehouse</option>
                    <option value="MAIN">Main Warehouse</option>
                    <option value="SECONDARY">Secondary Warehouse</option>
                    <option value="STORAGE">Storage Facility</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Information Tab -->
          <div v-if="activeTab === 'additional'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Additional Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    v-model="formData.barcode"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter barcode"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <select
                    v-model="formData.supplierCode"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="">Select Supplier</option>
                    <option value="SUP-001">ABC Suppliers Ltd.</option>
                    <option value="SUP-002">XYZ Manufacturing Inc.</option>
                    <option value="SUP-003">Global Parts Co.</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    v-model.number="formData.weight"
                    type="number"
                    step="0.01"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    v-model="formData.location"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter location"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    v-model="formData.notes"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter additional notes"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md shadow-sm hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : isEditing ? 'Update Item' : 'Create Item' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type {
  Item,
  ItemFormData,
  ItemType,
  ItemStatus,
  ItemGroup,
  UnitOfMeasure,
  ValuationMethod,
} from '../types'

interface Props {
  item?: Item | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

const emit = defineEmits<{
  close: []
  submit: [data: ItemFormData]
}>()

// Tabs configuration
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'pricing', name: 'Pricing & Costing' },
  { id: 'inventory', name: 'Inventory' },
  { id: 'additional', name: 'Additional Info' },
]

// Active tab
const activeTab = ref('basic')

// Form data
const formData = ref<ItemFormData>({
  itemCode: '',
  itemName: '',
  description: '',
  type: 'inventory' as ItemType,
  status: 'active' as ItemStatus,
  group: 'raw_materials' as ItemGroup,
  unitOfMeasure: 'piece' as UnitOfMeasure,
  baseUnitPrice: 0,
  standardCost: 0,
  valuationMethod: 'fifo' as ValuationMethod,
  taxCode: '',
  minStockLevel: 0,
  maxStockLevel: 0,
  reorderPoint: 0,
  reorderQuantity: 0,
  supplierCode: '',
  barcode: '',
  weight: 0,
  warehouseCode: '',
  location: '',
  notes: '',
})

// Computed
const isEditing = computed(() => !!props.item)

// Watch for item changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formData.value = {
        itemCode: newItem.itemCode,
        itemName: newItem.itemName,
        description: newItem.description || '',
        type: newItem.type,
        status: newItem.status,
        group: newItem.group,
        unitOfMeasure: newItem.unitOfMeasure,
        baseUnitPrice: newItem.baseUnitPrice,
        standardCost: newItem.standardCost || 0,
        valuationMethod: newItem.valuationMethod,
        taxCode: newItem.taxCode || '',
        minStockLevel: newItem.minStockLevel || 0,
        maxStockLevel: newItem.maxStockLevel || 0,
        reorderPoint: newItem.reorderPoint || 0,
        reorderQuantity: newItem.reorderQuantity || 0,
        supplierCode: newItem.supplierCode || '',
        barcode: newItem.barcode || '',
        weight: newItem.weight || 0,
        warehouseCode: newItem.warehouseCode || '',
        location: newItem.location || '',
        notes: newItem.notes || '',
      }
    } else {
      // Reset form for new item
      formData.value = {
        itemCode: '',
        itemName: '',
        description: '',
        type: 'inventory' as ItemType,
        status: 'active' as ItemStatus,
        group: 'raw_materials' as ItemGroup,
        unitOfMeasure: 'piece' as UnitOfMeasure,
        baseUnitPrice: 0,
        standardCost: 0,
        valuationMethod: 'fifo' as ValuationMethod,
        taxCode: '',
        minStockLevel: 0,
        maxStockLevel: 0,
        reorderPoint: 0,
        reorderQuantity: 0,
        supplierCode: '',
        barcode: '',
        weight: 0,
        warehouseCode: '',
        location: '',
        notes: '',
      }
    }
  },
  { immediate: true },
)

// Methods
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
