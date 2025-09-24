<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Sales Quotation Details</h2>
          <p class="text-sm text-gray-600 mt-1">Quotation #{{ quotation?.quotationNumber }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <button @click="$emit('edit')" class="btn-primary flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            Edit
          </button>
          <button @click="$emit('convert')" class="btn-secondary flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              ></path>
            </svg>
            Convert to Order
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Basic Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Customer & Basic Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quotation Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation?.customerName || '—' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Code</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation?.customerCode || '—' }}</p>
            </div>
            <div v-if="quotation?.contactPerson">
              <label class="block text-sm font-medium text-gray-700">Contact Person</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.contactPerson }}</p>
            </div>
            <div v-if="quotation?.salesPerson">
              <label class="block text-sm font-medium text-gray-700">Sales Employee</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.salesPerson }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Document Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation?.quotationDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Valid Until</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation?.validUntil) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Posting Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation?.postingDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Quotation Type</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation?.type || 'Item' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Currency</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation?.currency || 'USD' }}</p>
            </div>
            <div v-if="quotation?.exchangeRate && quotation.exchangeRate !== 1">
              <label class="block text-sm font-medium text-gray-700">Exchange Rate</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.exchangeRate }}</p>
            </div>
            <div v-if="quotation?.reference">
              <label class="block text-sm font-medium text-gray-700">Reference No.</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.reference }}</p>
            </div>
            <div v-if="quotation?.project">
              <label class="block text-sm font-medium text-gray-700">Project</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.project }}</p>
            </div>
            <div v-if="quotation?.relatedOpportunityId">
              <label class="block text-sm font-medium text-gray-700">Opportunity ID</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.relatedOpportunityId }}</p>
            </div>
            <div v-if="quotation?.customerAddress" class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Customer Address</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.customerAddress }}</p>
            </div>
            <div v-if="quotation?.remarks" class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Remarks</label>
              <p class="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{{ quotation.remarks }}</p>
            </div>
          </div>
        </div>

        <!-- Line Items / Service Items -->
        <div
          v-if="
            (quotation?.type === 'Item' && quotation?.lineItems?.length > 0) ||
            (quotation?.type === 'Service' && quotation?.serviceItems?.length > 0)
          "
          class="bg-white rounded-lg shadow border p-4 sm:p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ quotation?.type === 'Item' ? 'Line Items' : 'Service Items' }}
          </h3>
          <div class="overflow-x-auto">
            <!-- Line Items Table (for Item type quotations) -->
            <table v-if="quotation?.type === 'Item'" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Qty
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UoM
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tax
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                  >
                    WH
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell"
                  >
                    Dimensions
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell"
                  >
                    Project
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in quotation?.lineItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.description }}</div>
                    <div class="text-sm text-gray-500">{{ item.itemCode }}</div>
                    <div v-if="item.remarks" class="text-xs text-gray-400 mt-1">{{ item.remarks }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.quantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.uom }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.unitPrice) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.discount }}{{ item.discountType === 'PERCENTAGE' ? '%' : '' }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.taxCode }} ({{ item.taxRate }}%)
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.lineTotal) }}
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell"
                  >
                    {{ item.warehouse || '-' }}
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden xl:table-cell"
                  >
                    <div class="space-y-1">
                      <div v-if="item.dimension1" class="text-xs"><span class="font-medium">D1:</span> {{ item.dimension1 }}</div>
                      <div v-if="item.dimension2" class="text-xs"><span class="font-medium">D2:</span> {{ item.dimension2 }}</div>
                      <div v-if="item.dimension3" class="text-xs"><span class="font-medium">D3:</span> {{ item.dimension3 }}</div>
                      <div v-if="item.dimension4" class="text-xs"><span class="font-medium">D4:</span> {{ item.dimension4 }}</div>
                      <div v-if="!item.dimension1 && !item.dimension2 && !item.dimension3 && !item.dimension4">-</div>
                    </div>
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell"
                  >
                    {{ item.project || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Service Items Table (for Service type quotations) -->
            <table v-else class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tax Code
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tax Amount
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                  >
                    Dimensions
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                  >
                    WH
                  </th>
                  <th
                    class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell"
                  >
                    Project
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="service in quotation?.serviceItems"
                  :key="service.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ service.sno }}
                  </td>
                  <td class="px-3 sm:px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ service.description }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(service.discount) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(service.total) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ service.taxCode }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(service.taxAmount) }}
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden lg:table-cell"
                  >
                    <div class="space-y-1">
                      <div v-if="service.dimension1" class="text-xs"><span class="font-medium">D1:</span> {{ service.dimension1 }}</div>
                      <div v-if="service.dimension2" class="text-xs"><span class="font-medium">D2:</span> {{ service.dimension2 }}</div>
                      <div v-if="service.dimension3" class="text-xs"><span class="font-medium">D3:</span> {{ service.dimension3 }}</div>
                      <div v-if="service.dimension4" class="text-xs"><span class="font-medium">D4:</span> {{ service.dimension4 }}</div>
                      <div v-if="!service.dimension1 && !service.dimension2 && !service.dimension3 && !service.dimension4">-</div>
                    </div>
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell"
                  >
                    {{ service.warehouse || '-' }}
                  </td>
                  <td
                    class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell"
                  >
                    {{ service.project || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals Summary - Matching Form Exactly -->
          <div class="mt-6 border-t pt-4">
            <div class="flex justify-end">
              <div class="w-80 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-700">Subtotal:</span>
                  <span class="font-medium text-gray-900">{{ formatCurrency(calculateSubtotal()) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-700">Discount Total:</span>
                  <span class="font-medium text-gray-900">{{ formatCurrency(calculateDiscountTotal()) }}</span>
                </div>
                <div class="flex justify-between text-sm" v-if="quotation?.freightType">
                  <span class="text-gray-700">Freight Type:</span>
                  <span class="text-sm text-gray-900">{{ quotation.freightType }}</span>
                </div>
                <div class="flex justify-between text-sm" v-if="quotation?.freightAmount">
                  <span class="text-gray-700">Freight Amount:</span>
                  <span class="font-medium text-gray-900">{{ formatCurrency(quotation.freightAmount) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-700">Tax Total:</span>
                  <span class="font-medium text-gray-900">{{ formatCurrency(calculateTaxTotal()) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span class="text-gray-900">Total Amount:</span>
                  <span class="text-gray-900">{{ formatCurrency(calculateTotalAmount()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Information -->
      <div class="space-y-6">
        <!-- Status & Dates -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Status & Summary</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                :class="{
                  'bg-green-100 text-green-800': quotation?.status === 'APPROVED',
                  'bg-yellow-100 text-yellow-800': quotation?.status === 'PENDING',
                  'bg-red-100 text-red-800': quotation?.status === 'REJECTED',
                  'bg-blue-100 text-blue-800': quotation?.status === 'DRAFT',
                  'bg-gray-100 text-gray-800': quotation?.status === 'EXPIRED',
                }"
              >
                {{ formatStatus(quotation?.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Quote Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation?.quotationDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Valid Until</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation?.validUntil) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Total Amount</label>
              <p class="mt-1 text-lg font-bold text-blue-600">{{ formatCurrency(calculateTotalAmount()) }}</p>
            </div>
            <div v-if="quotation?.createdBy">
              <label class="block text-sm font-medium text-gray-700">Created By</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.createdBy }}</p>
            </div>
          </div>
        </div>

        <!-- Freight Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6" v-if="quotation?.freightType || quotation?.freightAmount">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping & Freight</h3>
          <div class="space-y-3">
            <div v-if="quotation?.freightType">
              <label class="block text-sm font-medium text-gray-700">Freight Type</label>
              <p class="mt-1 text-sm text-gray-900">{{ quotation.freightType }}</p>
            </div>
            <div v-if="quotation?.freightAmount">
              <label class="block text-sm font-medium text-gray-700">Freight Amount</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(quotation.freightAmount) }}</p>
            </div>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6" v-if="quotation?.terms">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
          <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ quotation.terms }}</p>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div class="space-y-2">
            <button @click="$emit('edit')" class="w-full btn-secondary text-left">
              <svg
                class="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit Quotation
            </button>
            <button @click="$emit('convert')" class="w-full btn-secondary text-left">
              <svg
                class="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
              Convert to Order
            </button>
            <button @click="$emit('print')" class="w-full btn-secondary text-left">
              <svg
                class="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                ></path>
              </svg>
              Print Quotation
            </button>
            <button @click="$emit('email')" class="w-full btn-secondary text-left">
              <svg
                class="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Email to Customer
            </button>
            <button @click="$emit('duplicate')" class="w-full btn-secondary text-left">
              <svg
                class="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              Duplicate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Quotation } from '../api/quotationsApi'

interface Props {
  quotation: Quotation | null
}

const props = defineProps<Props>()

defineEmits<{
  edit: []
  convert: []
  print: []
  email: []
  duplicate: []
}>()

const formatCurrency = (amount: number | string | null | undefined): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount)
  if (!isFinite(numericAmount)) {
    return '—'
  }

  const currencyCode =
    (props.quotation?.currency && String(props.quotation.currency).trim()) || 'USD'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(numericAmount)
  } catch {
    return `${currencyCode} ${numericAmount.toFixed(2)}`
  }
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string | undefined): string => {
  if (!status) return 'Unknown'
  switch (status) {
    case 'DRAFT':
      return 'Draft'
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'REJECTED':
      return 'Rejected'
    case 'EXPIRED':
      return 'Expired'
    default:
      return status
  }
}

// Calculation functions matching the form logic
const calculateSubtotal = (): number => {
  if (!props.quotation) return 0

  if (props.quotation.type === 'Item') {
    return props.quotation.lineItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice)
    }, 0)
  } else {
    return props.quotation.serviceItems.reduce((sum, service) => {
      return sum + service.total
    }, 0)
  }
}

const calculateDiscountTotal = (): number => {
  if (!props.quotation) return 0

  if (props.quotation.type === 'Item') {
    return props.quotation.lineItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice * (item.discount / 100))
    }, 0)
  } else {
    return props.quotation.serviceItems.reduce((sum, service) => {
      return sum + service.discount
    }, 0)
  }
}

const calculateTaxTotal = (): number => {
  if (!props.quotation) return 0

  if (props.quotation.type === 'Item') {
    return props.quotation.lineItems.reduce((sum, item) => {
      const lineSubtotal = item.quantity * item.unitPrice
      const lineDiscount = lineSubtotal * (item.discount / 100)
      const taxableAmount = lineSubtotal - lineDiscount
      return sum + (taxableAmount * (item.taxRate / 100))
    }, 0)
  } else {
    return props.quotation.serviceItems.reduce((sum, service) => {
      return sum + service.taxAmount
    }, 0)
  }
}

const calculateTotalAmount = (): number => {
  const subtotal = calculateSubtotal()
  const discount = calculateDiscountTotal()
  const tax = calculateTaxTotal()
  const freight = props.quotation?.freightAmount || 0

  return subtotal - discount + tax + freight
}
</script>
