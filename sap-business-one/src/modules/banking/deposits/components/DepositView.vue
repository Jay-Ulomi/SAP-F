<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Deposit {{ deposit.depositNumber }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(deposit.depositDate) }} • {{ deposit.customerName }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(deposit.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(deposit.status) }}
          </span>
        </div>
      </div>
    </div>
    <!-- Deposit Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Deposit Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Deposit Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(deposit.depositDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Received Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(deposit.receivedDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Amount:</span>
              <span class="text-sm font-bold text-green-600">
                {{ formatCurrency(deposit.amount, deposit.currency) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Deposit Type:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDepositType(deposit.depositType) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Source:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDepositSource(deposit.depositSource) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Customer & Bank Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Customer & Bank Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Customer:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ deposit.customerName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Customer ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ deposit.customerId }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Account:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ deposit.bankAccountName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Reference:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ deposit.referenceNumber || 'N/A' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Currency:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ deposit.currency }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Applied Invoices -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Applied Invoices
        </h4>
        <div v-if="deposit.appliedInvoices.length > 0" class="space-y-3">
          <div
            v-for="invoice in deposit.appliedInvoices"
            :key="invoice.invoiceId"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ invoice.invoiceNumber }}
                </p>
                <p class="text-xs text-gray-500">
                  Invoice Date: {{ formatDate(invoice.invoiceDate) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(invoice.appliedAmount, deposit.currency) }}
                </p>
                <p class="text-xs text-gray-500">
                  Applied: {{ formatCurrency(invoice.appliedAmount, deposit.currency) }}
                </p>
              </div>
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500">
              <span>Original: {{ formatCurrency(invoice.originalAmount, deposit.currency) }}</span>
              <span v-if="invoice.discountAmount > 0">
                Discount: {{ formatCurrency(invoice.discountAmount, deposit.currency) }}
              </span>
              <span v-if="invoice.writeOffAmount > 0">
                Write-off: {{ formatCurrency(invoice.writeOffAmount, deposit.currency) }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-500">
          <p class="text-sm">No invoices applied to this deposit</p>
        </div>
      </div>
      <!-- Fees -->
      <div v-if="deposit.fees.length > 0" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Deposit Fees</h4>
        <div class="space-y-3">
          <div
            v-for="fee in deposit.fees"
            :key="fee.id"
            class="flex justify-between items-center bg-red-50 rounded-lg p-3"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ fee.description }}</p>
              <p class="text-xs text-gray-500">{{ fee.feeType }}</p>
            </div>
            <span class="text-sm font-medium text-red-600">
              {{ formatCurrency(fee.amount, deposit.currency) }}
            </span>
          </div>
        </div>
      </div>
      <!-- Notes & Metadata -->
      <div class="mt-8 space-y-4">
        <div v-if="deposit.description">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
            Description
          </h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ deposit.description }}
          </p>
        </div>
        <div v-if="deposit.notes">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ deposit.notes }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
          <div><span class="font-medium">Created by:</span> {{ deposit.createdBy }}</div>
          <div>
            <span class="font-medium">Created at:</span> {{ formatDate(deposit.createdAt) }}
          </div>
          <div>
            <span class="font-medium">Updated at:</span> {{ formatDate(deposit.updatedAt) }}
          </div>
          <div v-if="deposit.processedDate">
            <span class="font-medium">Processed at:</span> {{ formatDate(deposit.processedDate) }}
          </div>
          <div v-if="deposit.clearedDate">
            <span class="font-medium">Cleared at:</span> {{ formatDate(deposit.clearedDate) }}
          </div>
          <div v-if="deposit.reconciledDate">
            <span class="font-medium">Reconciled at:</span> {{ formatDate(deposit.reconciledDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Deposit } from '../types'
import { DepositType, DepositStatus, DepositSource } from '../types'

interface Props {
  deposit: Deposit
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatStatus = (status: DepositStatus) => {
  const statusMap = {
    [DepositStatus.PENDING]: 'Pending',
    [DepositStatus.PROCESSING]: 'Processing',
    [DepositStatus.COMPLETED]: 'Completed',
    [DepositStatus.FAILED]: 'Failed',
    [DepositStatus.CANCELLED]: 'Cancelled',
    [DepositStatus.RETURNED]: 'Returned',
    [DepositStatus.ON_HOLD]: 'On Hold',
    [DepositStatus.RECONCILED]: 'Reconciled',
  }
  return statusMap[status] || status
}

const formatDepositType = (type: DepositType) => {
  const typeMap = {
    [DepositType.CASH]: 'Cash',
    [DepositType.CHECK]: 'Check',
    [DepositType.WIRE_TRANSFER]: 'Wire Transfer',
    [DepositType.ACH]: 'ACH',
    [DepositType.CREDIT_CARD]: 'Credit Card',
    [DepositType.DEBIT_CARD]: 'Debit Card',
    [DepositType.ELECTRONIC_TRANSFER]: 'Electronic Transfer',
    [DepositType.MONEY_ORDER]: 'Money Order',
    [DepositType.OTHER]: 'Other',
  }
  return typeMap[type] || type
}

const formatDepositSource = (source: DepositSource) => {
  const sourceMap = {
    [DepositSource.CUSTOMER_PAYMENT]: 'Customer Payment',
    [DepositSource.VENDOR_REFUND]: 'Vendor Refund',
    [DepositSource.INTEREST]: 'Interest',
    [DepositSource.DIVIDEND]: 'Dividend',
    [DepositSource.LOAN_PROCEEDS]: 'Loan Proceeds',
    [DepositSource.INVESTMENT_RETURN]: 'Investment Return',
    [DepositSource.SALE_PROCEEDS]: 'Sale Proceeds',
    [DepositSource.OTHER_INCOME]: 'Other Income',
  }
  return sourceMap[source] || source
}

const getStatusClasses = (status: DepositStatus) => {
  const statusClasses = {
    [DepositStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [DepositStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
    [DepositStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [DepositStatus.FAILED]: 'bg-red-100 text-red-800',
    [DepositStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [DepositStatus.RETURNED]: 'bg-orange-100 text-orange-800',
    [DepositStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
    [DepositStatus.RECONCILED]: 'bg-purple-100 text-purple-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
