<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Sales Order #{{ salesOrder.docNum }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ salesOrder.customerName }} • {{ formatDate(salesOrder.orderDate) }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Entry: {{ salesOrder.docEntry }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': salesOrder.status === 'DRAFT',
              'bg-blue-100 text-blue-800': salesOrder.status === 'OPEN',
              'bg-yellow-100 text-yellow-800': salesOrder.status === 'RELEASED',
              'bg-orange-100 text-orange-800': salesOrder.status === 'PARTIALLY_DELIVERED',
              'bg-green-100 text-green-800': salesOrder.status === 'FULLY_DELIVERED',
              'bg-red-100 text-red-800': salesOrder.status === 'CANCELLED',
              'bg-slate-100 text-slate-800': salesOrder.status === 'CLOSED',
            }"
          >
            {{ formatOrderStatus(salesOrder.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatOrderType(salesOrder.type) }}
          </span>
          <span
            v-if="salesOrder.approvalStatus"
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': salesOrder.approvalStatus === 'PENDING',
              'bg-green-100 text-green-800': salesOrder.approvalStatus === 'APPROVED',
              'bg-red-100 text-red-800': salesOrder.approvalStatus === 'REJECTED',
            }"
          >
            {{ formatApprovalStatus(salesOrder.approvalStatus) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Sales Order Details -->
    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <!-- Left Column - Basic Info -->
        <div class="xl:col-span-2 space-y-4 sm:space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Basic Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Order Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(salesOrder.orderDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Delivery Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(salesOrder.deliveryDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Posting Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(salesOrder.postingDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Sales Person:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.salesPerson || 'Not assigned' }}
                </span>
              </div>
              <div v-if="salesOrder.reference">
                <span class="text-xs text-gray-500">Reference:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.reference }}
                </span>
              </div>
              <div v-if="salesOrder.project">
                <span class="text-xs text-gray-500">Project:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.project }}
                </span>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Customer Information
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Customer Code:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.customerCode }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Customer Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.customerName }}
                </span>
              </div>
              <div v-if="salesOrder.contactPerson">
                <span class="text-xs text-gray-500">Contact Person:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.contactPerson }}
                </span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <span class="text-xs text-gray-500">Address:</span>
                <div class="mt-1 text-sm text-gray-900">
                  {{ salesOrder.customerAddress.street }}<br />
                  {{ salesOrder.customerAddress.city
                  }}{{
                    salesOrder.customerAddress.state ? ', ' + salesOrder.customerAddress.state : ''
                  }}
                  {{ salesOrder.customerAddress.postalCode }}<br />
                  {{ salesOrder.customerAddress.country }}
                </div>
              </div>
            </div>
          </div>

          <!-- Line Items -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Line Items ({{ salesOrder.lineItems.length }})
            </h3>
            <div class="space-y-3">
              <div
                v-for="item in salesOrder.lineItems"
                :key="item.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ item.description }}</h4>
                  <span class="text-sm text-gray-500">{{ item.itemCode }}</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span class="text-gray-500">Qty:</span>
                    <span class="ml-1 text-gray-900">{{ item.quantity }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Price:</span>
                    <span class="ml-1 text-gray-900">{{
                      formatCurrency(item.unitPrice, salesOrder.currency)
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Discount:</span>
                    <span class="ml-1 text-gray-900"
                      >{{ item.discount }}{{ item.discountType === 'PERCENTAGE' ? '%' : '' }}</span
                    >
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">Total:</span>
                    <span class="ml-1 text-sm font-medium text-gray-900">{{
                      formatCurrency(item.lineTotal, salesOrder.currency)
                    }}</span>
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs mt-2">
                  <div>
                    <span class="text-gray-500">Delivered:</span>
                    <span class="ml-1 text-gray-900">{{ item.deliveredQuantity }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Remaining:</span>
                    <span class="ml-1 text-gray-900">{{ item.remainingQuantity }}</span>
                  </div>
                  <div v-if="item.warehouseCode">
                    <span class="text-gray-500">Warehouse:</span>
                    <span class="ml-1 text-gray-900">{{ item.warehouseCode }}</span>
                  </div>
                </div>
                <div v-if="item.remarks" class="mt-2 text-xs text-gray-600">
                  <span class="text-gray-500">Remarks:</span>
                  <span class="ml-1">{{ item.remarks }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Remarks -->
          <div v-if="salesOrder.remarks" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Remarks</h3>
            <p class="text-sm text-gray-700">{{ salesOrder.remarks }}</p>
          </div>
        </div>

        <!-- Right Column - Financial, Tax, System -->
        <div class="space-y-4 sm:space-y-6">
          <!-- Financial Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Financial
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Currency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.currency }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Exchange Rate:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.exchangeRate }}
                </span>
              </div>
              <div class="border-t border-gray-200 pt-2">
                <span class="text-xs text-gray-500">Subtotal:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(salesOrder.subtotal, salesOrder.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Discount Total:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(salesOrder.discountTotal, salesOrder.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Tax Total:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(salesOrder.taxTotal, salesOrder.currency) }}
                </span>
              </div>
              <div class="border-t border-gray-200 pt-2">
                <span class="text-xs text-gray-500 font-medium">Total Amount:</span>
                <span class="ml-2 text-sm font-bold text-gray-900">
                  {{ formatCurrency(salesOrder.totalAmount, salesOrder.currency) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Tax Summary -->
          <div v-if="salesOrder.taxSummary.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Tax Summary
            </h3>
            <div class="space-y-2">
              <div
                v-for="tax in salesOrder.taxSummary"
                :key="tax.taxCode"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600">{{ tax.taxCode }} ({{ tax.taxRate }}%)</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(tax.taxAmount, salesOrder.currency) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Document References -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Document References
            </h3>
            <div class="space-y-3">
              <div v-if="salesOrder.baseDocumentType">
                <span class="text-xs text-gray-500">Base Document:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.baseDocumentType }} #{{ salesOrder.baseDocumentNumber }}
                </span>
              </div>
              <div v-if="salesOrder.relatedQuotationId">
                <span class="text-xs text-gray-500">Related Quotation:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.relatedQuotationId }}
                </span>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              System Information
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Created By:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.createdBy }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Created:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(salesOrder.createdAt) }}
                </span>
              </div>
              <div v-if="salesOrder.updatedBy">
                <span class="text-xs text-gray-500">Updated By:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.updatedBy }}
                </span>
              </div>
              <div v-if="salesOrder.updatedAt">
                <span class="text-xs text-gray-500">Updated:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(salesOrder.updatedAt) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Approval Information -->
          <div v-if="salesOrder.approvalStatus" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Approval</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span
                  class="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': salesOrder.approvalStatus === 'PENDING',
                    'bg-green-100 text-green-800': salesOrder.approvalStatus === 'APPROVED',
                    'bg-red-100 text-red-800': salesOrder.approvalStatus === 'REJECTED',
                  }"
                >
                  {{ formatApprovalStatus(salesOrder.approvalStatus) }}
                </span>
              </div>
              <div v-if="salesOrder.approvedBy">
                <span class="text-xs text-gray-500">Approved By:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ salesOrder.approvedBy }}
                </span>
              </div>
              <div v-if="salesOrder.approvedAt">
                <span class="text-xs text-gray-500">Approved At:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(salesOrder.approvedAt) }}
                </span>
              </div>
              <div v-if="salesOrder.approvalNotes">
                <span class="text-xs text-gray-500">Notes:</span>
                <p class="mt-1 text-sm text-gray-700">{{ salesOrder.approvalNotes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SalesOrder } from '../types'
import { OrderStatus, OrderType } from '../types'

// Props
interface Props {
  salesOrder: SalesOrder
}

defineProps<Props>()

// Utility functions
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatOrderStatus = (status: OrderStatus) => {
  const statusMap: Record<OrderStatus, string> = {
    DRAFT: 'Draft',
    OPEN: 'Open',
    RELEASED: 'Released',
    PARTIALLY_DELIVERED: 'Partially Delivered',
    FULLY_DELIVERED: 'Fully Delivered',
    CANCELLED: 'Cancelled',
    CLOSED: 'Closed',
  }
  return statusMap[status] || status
}

const formatOrderType = (type: OrderType) => {
  const typeMap: Record<OrderType, string> = {
    STANDARD: 'Standard',
    DROP_SHIP: 'Drop Ship',
    SPECIAL_ORDER: 'Special Order',
    CONSIGNMENT: 'Consignment',
  }
  return typeMap[type] || type
}

const formatApprovalStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
  }
  return statusMap[status] || status
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
</script>
