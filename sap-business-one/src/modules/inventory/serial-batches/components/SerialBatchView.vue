<template>
  <div
    class="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-5xl shadow-lg rounded-md bg-white">
      <div class="mt-1">
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Serial/Batch Details - {{ header }}</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
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

        <div class="mt-6 space-y-6">
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Item Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Item</label>
                <p class="mt-1 text-sm text-gray-900">{{ item.itemCode }} - {{ item.itemName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Tracking Type</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(item.trackingType) }}</p>
              </div>
              <div v-if="item.serialNumber">
                <label class="block text-sm font-medium text-gray-500">Serial Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ item.serialNumber }}</p>
              </div>
              <div v-if="item.batchNumber">
                <label class="block text-sm font-medium text-gray-500">Batch Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ item.batchNumber }}</p>
              </div>
              <div v-if="item.lotNumber">
                <label class="block text-sm font-medium text-gray-500">Lot Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ item.lotNumber }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Location & Quantity</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Warehouse</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ item.warehouseCode }} - {{ item.warehouseName }}
                </p>
              </div>
              <div v-if="item.binCode">
                <label class="block text-sm font-medium text-gray-500">Bin</label>
                <p class="mt-1 text-sm text-gray-900">{{ item.binCode }} - {{ item.binName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Quantity</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ item.quantity }} {{ item.unitOfMeasure }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500"
                  >Available / Committed / Issued</label
                >
                <p class="mt-1 text-sm text-gray-900">
                  {{ item.availableQuantity }} / {{ item.committedQuantity }} /
                  {{ item.issuedQuantity }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Total Value</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(item.totalValue) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Dates & Quality</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="item.manufactureDate">
                <label class="block text-sm font-medium text-gray-500">Manufacture Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(item.manufactureDate) }}</p>
              </div>
              <div v-if="item.expiryDate">
                <label class="block text-sm font-medium text-gray-500">Expiry Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(item.expiryDate) }}</p>
              </div>
              <div v-if="item.admissionDate">
                <label class="block text-sm font-medium text-gray-500">Admission Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(item.admissionDate) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Quality Status</label>
                <span
                  :class="getQualityClass()"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ formatEnum(item.qualityStatus) }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4" v-if="item.remarks">
            <h3 class="text-base font-medium text-gray-900 mb-2">Remarks</h3>
            <p class="text-sm text-gray-900">{{ item.remarks }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SerialBatchItem } from '../types'

interface Props {
  item: SerialBatchItem
}
const props = defineProps<Props>()

defineEmits<{ close: [] }>()

const header = computed(
  () => props.item.serialNumber || props.item.batchNumber || props.item.itemCode,
)

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(date),
  )
const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
const formatEnum = (v: string): string =>
  v
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

const getQualityClass = (): string => {
  switch (props.item.qualityStatus) {
    case 'released':
      return 'bg-green-100 text-green-800'
    case 'on_hold':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
