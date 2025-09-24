<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Delivery Details</h2>
          <p class="text-sm text-gray-600 mt-1">Delivery #{{ delivery?.deliveryNumber }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            @click="$emit('edit')"
            class="btn-primary flex items-center justify-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit
          </button>
          <button
            @click="$emit('invoice')"
            class="btn-secondary flex items-center justify-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Create Invoice
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Basic Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Customer & Order Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery?.customerName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Sales Order</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery?.salesOrderNumber }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Delivery Address</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery?.deliveryAddress }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tracking Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery?.trackingNumber || 'Not assigned' }}</p>
            </div>
          </div>
        </div>

        <!-- Delivered Items -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Delivered Items</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in delivery?.items" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.itemName }}</div>
                    <div class="text-sm text-gray-500">{{ item.itemCode }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.orderedQuantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.deliveredQuantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.orderedQuantity - item.deliveredQuantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': item.deliveredQuantity >= item.orderedQuantity,
                        'bg-yellow-100 text-yellow-800': item.deliveredQuantity < item.orderedQuantity && item.deliveredQuantity > 0,
                        'bg-red-100 text-red-800': item.deliveredQuantity === 0
                      }"
                    >
                      {{ item.deliveredQuantity >= item.orderedQuantity ? 'Complete' : item.deliveredQuantity > 0 ? 'Partial' : 'Pending' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Delivery Notes -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6" v-if="delivery?.notes">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Delivery Notes</h3>
          <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ delivery.notes }}</p>
        </div>
      </div>

      <!-- Sidebar Information -->
      <div class="space-y-6">
        <!-- Delivery Status -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Delivery Status</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                :class="{
                  'bg-green-100 text-green-800': delivery?.status === 'DELIVERED',
                  'bg-blue-100 text-blue-800': delivery?.status === 'IN_TRANSIT',
                  'bg-yellow-100 text-yellow-800': delivery?.status === 'PROCESSING',
                  'bg-gray-100 text-gray-800': delivery?.status === 'PENDING',
                  'bg-red-100 text-red-800': delivery?.status === 'CANCELLED'
                }"
              >
                {{ formatStatus(delivery?.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Delivery Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(delivery?.deliveryDate) }}</p>
            </div>
            <div v-if="delivery?.estimatedDelivery">
              <label class="block text-sm font-medium text-gray-700">Estimated Delivery</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(delivery.estimatedDelivery) }}</p>
            </div>
            <div v-if="delivery?.actualDelivery">
              <label class="block text-sm font-medium text-gray-700">Actual Delivery</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(delivery.actualDelivery) }}</p>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
          <div class="space-y-3">
            <div v-if="delivery?.carrier">
              <label class="block text-sm font-medium text-gray-700">Carrier</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery.carrier }}</p>
            </div>
            <div v-if="delivery?.shippingMethod">
              <label class="block text-sm font-medium text-gray-700">Shipping Method</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery.shippingMethod }}</p>
            </div>
            <div v-if="delivery?.weight">
              <label class="block text-sm font-medium text-gray-700">Package Weight</label>
              <p class="mt-1 text-sm text-gray-900">{{ delivery.weight }} kg</p>
            </div>
            <div v-if="delivery?.shippingCost">
              <label class="block text-sm font-medium text-gray-700">Shipping Cost</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(delivery.shippingCost) }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div class="space-y-2">
            <button @click="$emit('print')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              Print Delivery Note
            </button>
            <button @click="$emit('track')" class="w-full btn-secondary text-left" v-if="delivery?.trackingNumber">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Track Package
            </button>
            <button @click="$emit('return')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
              </svg>
              Create Return
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DeliveryItem {
  id: string
  itemCode: string
  itemName: string
  orderedQuantity: number
  deliveredQuantity: number
}

interface Delivery {
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

interface Props {
  delivery: Delivery | null
}

defineProps<Props>()

defineEmits<{
  edit: []
  invoice: []
  print: []
  track: []
  return: []
}>()

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'PROCESSING':
      return 'Processing'
    case 'IN_TRANSIT':
      return 'In Transit'
    case 'DELIVERED':
      return 'Delivered'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}
</script>