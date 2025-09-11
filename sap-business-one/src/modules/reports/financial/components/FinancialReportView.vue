<template>
  <div class="p-6 space-y-6">
    <!-- Report Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ report.name }}</h2>
          <p class="text-gray-600 mt-1">{{ report.description || 'No description' }}</p>
        </div>
        <div class="flex space-x-2">
          <span :class="getStatusBadgeClass(report.status)">
            {{ formatStatus(report.status) }}
          </span>
          <button
            @click="exportReport"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Report Type</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatReportType(report.type) }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Period</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ formatDate(report.dateFrom) }} - {{ formatDate(report.dateTo) }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Currency</label>
          <p class="mt-1 text-sm text-gray-900">{{ report.currency }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Created</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(report.createdAt) }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Total Amount</label>
          <p class="mt-1 text-sm font-bold text-gray-900">{{ formatCurrency(report.totalAmount) }}</p>
        </div>
        <div v-if="report.createdBy">
          <label class="block text-sm font-medium text-gray-700">Created By</label>
          <p class="mt-1 text-sm text-gray-900">{{ report.createdBy }}</p>
        </div>
      </div>
    </div>

    <!-- Account Summary -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Account Summary</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">Total Assets</p>
              <p class="text-lg font-bold text-green-900">{{ formatCurrency(totals.assets) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 p-4 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">Total Liabilities</p>
              <p class="text-lg font-bold text-red-900">{{ formatCurrency(totals.liabilities) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-blue-800">Total Equity</p>
              <p class="text-lg font-bold text-blue-900">{{ formatCurrency(totals.equity) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Account Details</h3>
      </div>
      
      <div v-if="report.lineItems.length === 0" class="p-8 text-center text-gray-500">
        No line items found in this report.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debit
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in report.lineItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ item.accountCode }}</div>
                  <div class="text-sm text-gray-500">{{ item.accountName }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description }}</div>
                <div v-if="item.notes" class="text-xs text-gray-500 mt-1">{{ item.notes }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getCategoryBadgeClass(item.category)">
                  {{ formatAccountCategory(item.category) }}
                </span>
                <div v-if="item.subCategory" class="text-xs text-gray-500 mt-1">
                  {{ item.subCategory }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                <span v-if="item.debitAmount > 0" class="font-medium">
                  {{ formatCurrency(item.debitAmount) }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                <span v-if="item.creditAmount > 0" class="font-medium">
                  {{ formatCurrency(item.creditAmount) }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                <span :class="item.balance >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formatCurrency(item.balance) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div v-if="item.reference">{{ item.reference }}</div>
                <div v-if="item.documentNumber" class="text-xs">
                  {{ item.documentType }} #{{ item.documentNumber }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex justify-end">
          <div class="w-80">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total Debits:</span>
              <span class="font-medium">{{ formatCurrency(totals.debits) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total Credits:</span>
              <span class="font-medium">{{ formatCurrency(totals.credits) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
              <span>Net Balance:</span>
              <span :class="totals.netBalance >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatCurrency(totals.netBalance) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes Section -->
    <div v-if="report.notes" class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3">Notes</h3>
      <div class="prose prose-sm text-gray-600">
        <p>{{ report.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FinancialReport } from '../types'
import { AccountCategory } from '../types'

// Props
interface Props {
  report: FinancialReport
}

const props = defineProps<Props>()

// Computed totals
const totals = computed(() => {
  const lineItems = props.report.lineItems
  
  return {
    debits: lineItems.reduce((sum, item) => sum + item.debitAmount, 0),
    credits: lineItems.reduce((sum, item) => sum + item.creditAmount, 0),
    netBalance: lineItems.reduce((sum, item) => sum + item.balance, 0),
    assets: lineItems
      .filter(item => item.category === AccountCategory.ASSETS)
      .reduce((sum, item) => sum + item.balance, 0),
    liabilities: lineItems
      .filter(item => item.category === AccountCategory.LIABILITIES)
      .reduce((sum, item) => sum + Math.abs(item.balance), 0),
    equity: lineItems
      .filter(item => item.category === AccountCategory.EQUITY)
      .reduce((sum, item) => sum + Math.abs(item.balance), 0),
  }
})

// Methods
const exportReport = () => {
  console.log('Exporting report:', props.report)
  // Implementation for export functionality
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.report.currency,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatReportType = (type: string): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatAccountCategory = (category: string): string => {
  return category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'COMPLETED':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'PENDING':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'DRAFT':
      return `${baseClasses} bg-gray-100 text-gray-800`
    case 'FAILED':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getCategoryBadgeClass = (category: string) => {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium'
  switch (category) {
    case 'ASSETS':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'LIABILITIES':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'EQUITY':
      return `${baseClasses} bg-blue-100 text-blue-800`
    case 'REVENUE':
      return `${baseClasses} bg-purple-100 text-purple-800`
    case 'EXPENSES':
    case 'COGS':
      return `${baseClasses} bg-orange-100 text-orange-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}
</script>