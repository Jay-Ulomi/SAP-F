<template>
  <div class="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50" @click.self="$emit('close')">
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-5xl shadow-lg rounded-md bg-white">
      <div class="mt-1">
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">{{ isEditing ? 'Edit' : 'Create' }} Serial/Batch</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
          <!-- Basic Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tracking Type *</label>
                <select v-model="formData.trackingType" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm">
                  <option value="serial">Serial</option>
                  <option value="batch">Batch</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Item Code *</label>
                <input v-model="formData.itemCode" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                <input v-model="formData.itemName" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Warehouse Code *</label>
                <input v-model="formData.warehouseCode" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location Type *</label>
                <select v-model="formData.locationType" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm">
                  <option value="warehouse">Warehouse</option>
                  <option value="bin">Bin</option>
                </select>
              </div>
              <div v-if="formData.locationType === 'bin'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bin Code</label>
                <input v-model="formData.binCode" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">UoM *</label>
                <input v-model="formData.unitOfMeasure" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input v-model.number="formData.quantity" required min="0" step="0.01" type="number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Unit Cost *</label>
                <input v-model.number="formData.unitCost" required min="0" step="0.01" type="number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
            </div>
          </div>

          <!-- Identification -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Identification</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="formData.trackingType === 'serial'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
                <input v-model="formData.serialNumber" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div v-if="formData.trackingType === 'batch'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Batch Number *</label>
                <input v-model="formData.batchNumber" required type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lot Number</label>
                <input v-model="formData.lotNumber" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Manufacture Date</label>
                <input :value="formatDateForInput(formData.manufactureDate)" @input="handleDateInput($event, 'manufactureDate')" type="date" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input :value="formatDateForInput(formData.expiryDate)" @input="handleDateInput($event, 'expiryDate')" type="date" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                <input :value="formatDateForInput(formData.admissionDate)" @input="handleDateInput($event, 'admissionDate')" type="date" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quality Status *</label>
                <select v-model="formData.qualityStatus" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm">
                  <option value="released">Released</option>
                  <option value="on_hold">On Hold</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea v-model="formData.remarks" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm" />
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Cancel</button>
            <button type="submit" :disabled="!isFormValid" class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { TrackingType, SerialBatchLocationType, QualityStatus } from '../types'
import type { SerialBatchItem, SerialBatchFormData } from '../types'

interface Props { item?: SerialBatchItem | null; loading?: boolean }
const props = withDefaults(defineProps<Props>(), { item: null, loading: false })
const emit = defineEmits<{ close: []; submit: [data: SerialBatchFormData] }>()

const formData = ref<SerialBatchFormData>({
  trackingType: TrackingType.SERIAL,
  itemCode: '',
  itemName: '',
  warehouseCode: '',
  locationType: SerialBatchLocationType.WAREHOUSE,
  unitOfMeasure: 'EA',
  quantity: 1,
  unitCost: 0,
  qualityStatus: QualityStatus.RELEASED,
})

const isEditing = computed(() => !!props.item)
const isFormValid = computed(() => !!formData.value.itemCode && !!formData.value.itemName && !!formData.value.warehouseCode && formData.value.quantity >= 0 && formData.value.unitCost >= 0 && (
  (formData.value.trackingType === TrackingType.SERIAL && !!formData.value.serialNumber) ||
  (formData.value.trackingType === TrackingType.BATCH && !!formData.value.batchNumber)
))

const formatDateForInput = (date?: Date) => (date ? new Date(date).toISOString().split('T')[0] : '')
const handleDateInput = (e: Event, field: 'manufactureDate' | 'expiryDate' | 'admissionDate') => {
  const t = e.target as HTMLInputElement
  formData.value[field] = t.value ? new Date(t.value) : undefined
}

const handleSubmit = () => { if (isFormValid.value) emit('submit', formData.value) }

watch(
  () => props.item,
  (it) => {
    if (it) {
      formData.value = {
        trackingType: it.trackingType,
        itemCode: it.itemCode,
        itemName: it.itemName,
        warehouseCode: it.warehouseCode,
        locationType: it.locationType,
        binCode: it.binCode,
        unitOfMeasure: it.unitOfMeasure,
        quantity: it.quantity,
        unitCost: it.unitCost,
        serialNumber: it.serialNumber,
        batchNumber: it.batchNumber,
        lotNumber: it.lotNumber,
        manufactureDate: it.manufactureDate,
        expiryDate: it.expiryDate,
        admissionDate: it.admissionDate,
        qualityStatus: it.qualityStatus,
        remarks: it.remarks,
      }
    } else {
      formData.value = {
        trackingType: TrackingType.SERIAL,
        itemCode: '',
        itemName: '',
        warehouseCode: '',
        locationType: SerialBatchLocationType.WAREHOUSE,
        unitOfMeasure: 'EA',
        quantity: 1,
        unitCost: 0,
        qualityStatus: QualityStatus.RELEASED,
      }
    }
  },
  { immediate: true },
)
</script>
