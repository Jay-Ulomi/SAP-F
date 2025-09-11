<template>
  <div class="space-y-6">
    <!-- Header with expense summary -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ expense.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">Report ID: {{ expense.reportNumber }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <span
              :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                getStatusColor(expense.status)
              ]"
            >
              {{ formatStatus(expense.status) }}
            </span>
            <span class="text-sm text-gray-500">
              Created {{ new Date(expense.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-indigo-600">{{ expense.currency }} {{ expense.totalAmount.toLocaleString() }}</p>
          <p class="text-sm text-gray-500">Total Amount</p>
          <p v-if="expense.approvedAmount && expense.approvedAmount !== expense.totalAmount" class="text-lg font-semibold text-green-600 mt-2">
            {{ expense.currency }} {{ expense.approvedAmount.toLocaleString() }} Approved
          </p>
        </div>
      </div>
    </div>

    <!-- Employee and Department Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Employee Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Employee</dt>
            <dd class="text-sm text-gray-900">{{ expense.employeeName }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Department</dt>
            <dd class="text-sm text-gray-900">{{ expense.departmentName }}</dd>
          </div>
        </dl>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Report Status</h3>
        <dl class="space-y-3">
          <div v-if="expense.submittedDate">
            <dt class="text-sm font-medium text-gray-500">Submitted Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(expense.submittedDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="expense.approvedDate">
            <dt class="text-sm font-medium text-gray-500">Approved By</dt>
            <dd class="text-sm text-gray-900">{{ expense.approvedBy }}</dd>
          </div>
          <div v-if="expense.approvedDate">
            <dt class="text-sm font-medium text-gray-500">Approved Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(expense.approvedDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="expense.rejectedDate">
            <dt class="text-sm font-medium text-gray-500">Rejected By</dt>
            <dd class="text-sm text-gray-900">{{ expense.rejectedBy }}</dd>
          </div>
          <div v-if="expense.rejectedDate">
            <dt class="text-sm font-medium text-gray-500">Rejected Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(expense.rejectedDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="expense.paidDate">
            <dt class="text-sm font-medium text-gray-500">Paid Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(expense.paidDate).toLocaleDateString() }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Rejection Reason -->
    <div v-if="expense.rejectionReason" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <h4 class="text-sm font-medium text-red-800">Rejection Reason</h4>
      <p class="text-sm text-red-700 mt-1">{{ expense.rejectionReason }}</p>
    </div>

    <!-- Description -->
    <div v-if="expense.description" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Description</h3>
      <p class="text-gray-700 whitespace-pre-wrap">{{ expense.description }}</p>
    </div>

    <!-- Expense Items -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Expense Items ({{ expense.items.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in expense.items" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(item.date).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatCategory(item.category) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ item.description }}</div>
                  <div v-if="item.notes" class="text-sm text-gray-500">{{ item.notes }}</div>
                  <div v-if="item.isPersonal" class="text-xs text-red-600 mt-1">Personal Expense</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.currency }} {{ item.amount.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPaymentMethod(item.paymentMethod) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.vendorName || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div v-if="item.receiptUrl" class="flex items-center space-x-2">
                  <a 
                    :href="item.receiptUrl" 
                    target="_blank"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View Receipt
                  </a>
                </div>
                <div v-else-if="item.receiptNumber" class="text-sm text-gray-500">
                  #{{ item.receiptNumber }}
                </div>
                <div v-else class="text-sm text-gray-400">
                  No receipt
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Total Expenses:</span>
          <span class="font-medium text-gray-900">{{ expense.currency }} {{ totalExpenses.toLocaleString() }}</span>
        </div>
        <div v-if="personalExpenses > 0" class="flex justify-between items-center">
          <span class="text-gray-600">Personal Expenses:</span>
          <span class="font-medium text-red-600">-{{ expense.currency }} {{ personalExpenses.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between items-center pt-2 border-t border-gray-300">
          <span class="text-lg font-semibold text-gray-700">Total Amount:</span>
          <span class="text-lg font-bold text-indigo-600">{{ expense.currency }} {{ expense.totalAmount.toLocaleString() }}</span>
        </div>
        <div v-if="expense.approvedAmount && expense.approvedAmount !== expense.totalAmount" class="flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-700">Approved Amount:</span>
          <span class="text-lg font-bold text-green-600">{{ expense.currency }} {{ expense.approvedAmount.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex justify-end space-x-3 pt-4">
      <button
        @click="printExpense"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Print
      </button>
      <button
        @click="exportExpense"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Export
      </button>
      <button
        v-if="canEdit"
        @click="editExpense"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Edit Report
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ExpenseReport } from '../types'

interface Props {
  expense: ExpenseReport
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [expense: ExpenseReport]
  export: [expense: ExpenseReport]
  print: [expense: ExpenseReport]
}>()

const canEdit = computed(() => {
  return ['draft', 'rejected'].includes(props.expense.status)
})

const totalExpenses = computed(() => {
  return props.expense.items.reduce((sum, item) => sum + item.amount, 0)
})

const personalExpenses = computed(() => {
  return props.expense.items
    .filter(item => item.isPersonal)
    .reduce((sum, item) => sum + item.amount, 0)
})

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatCategory(category: string): string {
  return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatPaymentMethod(method: string): string {
  return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'submitted': return 'bg-blue-100 text-blue-800'
    case 'approved': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    case 'paid': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function editExpense() {
  emit('edit', props.expense)
}

function exportExpense() {
  emit('export', props.expense)
}

function printExpense() {
  emit('print', props.expense)
  window.print()
}
</script>