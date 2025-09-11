<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Report Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Report Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Report Name *
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter report name"
          />
        </div>

        <!-- Report Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Report Type *
          </label>
          <select
            id="type"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Type</option>
            <option v-for="type in reportTypes" :key="type" :value="type">
              {{ formatReportType(type) }}
            </option>
          </select>
        </div>

        <!-- Currency -->
        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
            Currency *
          </label>
          <select
            id="currency"
            v-model="formData.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <!-- Date From -->
        <div>
          <label for="dateFrom" class="block text-sm font-medium text-gray-700 mb-1">
            Date From *
          </label>
          <input
            id="dateFrom"
            v-model="formData.dateFrom"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Date To -->
        <div>
          <label for="dateTo" class="block text-sm font-medium text-gray-700 mb-1">
            Date To *
          </label>
          <input
            id="dateTo"
            v-model="formData.dateTo"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="mt-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter report description"
        ></textarea>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-medium text-gray-900">Account Line Items</h3>
        <button
          type="button"
          @click="addLineItem"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Line
        </button>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Line" to add account entries to this report.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Account
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Debit
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Credit
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Balance
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-3 py-2">
                <div class="space-y-1">
                  <input
                    v-model="item.accountCode"
                    type="text"
                    placeholder="Account Code"
                    class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    required
                  />
                  <input
                    v-model="item.accountName"
                    type="text"
                    placeholder="Account Name"
                    class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    required
                  />
                </div>
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.description"
                  type="text"
                  placeholder="Description"
                  class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                />
              </td>
              <td class="px-3 py-2">
                <select
                  v-model="item.category"
                  class="block w-32 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @change="calculateBalance(index)"
                >
                  <option value="">Select</option>
                  <option v-for="category in accountCategories" :key="category" :value="category">
                    {{ formatAccountCategory(category) }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.debitAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  @input="calculateBalance(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.creditAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  @input="calculateBalance(index)"
                />
              </td>
              <td class="px-3 py-2 text-sm font-medium">
                {{ formatCurrency(item.balance) }}
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.reference"
                  type="text"
                  placeholder="Ref #"
                  class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals Summary -->
      <div v-if="formData.lineItems.length > 0" class="mt-6 border-t pt-4">
        <div class="flex justify-end">
          <div class="w-80 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Total Debits:</span>
              <span class="font-medium">{{ formatCurrency(totalDebits) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Total Credits:</span>
              <span class="font-medium">{{ formatCurrency(totalCredits) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span>Net Balance:</span>
              <span :class="netBalance >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatCurrency(netBalance) }}
              </span>
            </div>
            <div v-if="Math.abs(totalDebits - totalCredits) > 0.01" class="text-sm text-red-600">
              Warning: Debits and credits don't balance (difference: {{ formatCurrency(Math.abs(totalDebits - totalCredits)) }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Notes</h3>
      <textarea
        v-model="formData.notes"
        rows="4"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Enter any additional notes or comments about this report..."
      ></textarea>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Saving...
        </span>
        <span v-else>Save Report</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { FinancialReport, FinancialReportFormData, FinancialLineItem } from '../types'
import { ReportType, Currency, AccountCategory } from '../types'

// Props and Events
interface Props {
  report?: FinancialReport | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  report: null,
  loading: false,
})

const emit = defineEmits<{
  submit: [data: FinancialReportFormData]
  cancel: []
}>()

// Form Data
const formData = ref<FinancialReportFormData>({
  name: '',
  description: '',
  type: ReportType.BALANCE_SHEET,
  dateFrom: '',
  dateTo: '',
  currency: Currency.USD,
  lineItems: [],
  notes: '',
})

// Constants
const reportTypes = Object.values(ReportType)
const currencies = Object.values(Currency)
const accountCategories = Object.values(AccountCategory)

// Watch for report changes
watch(
  () => props.report,
  (newReport) => {
    if (newReport) {
      formData.value = {
        name: newReport.name,
        description: newReport.description || '',
        type: newReport.type,
        dateFrom: newReport.dateFrom,
        dateTo: newReport.dateTo,
        currency: newReport.currency,
        lineItems: newReport.lineItems.map((item) => ({
          accountCode: item.accountCode,
          accountName: item.accountName,
          description: item.description,
          debitAmount: item.debitAmount,
          creditAmount: item.creditAmount,
          balance: item.balance,
          category: item.category,
          subCategory: item.subCategory,
          reference: item.reference,
          documentNumber: item.documentNumber,
          documentType: item.documentType,
          notes: item.notes,
        })),
        notes: newReport.notes || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates
onMounted(() => {
  if (!props.report) {
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    
    formData.value.dateFrom = firstOfMonth.toISOString().split('T')[0]
    formData.value.dateTo = today.toISOString().split('T')[0]
  }
})

// Line Items Management
const addLineItem = () => {
  formData.value.lineItems.push({
    accountCode: '',
    accountName: '',
    description: '',
    debitAmount: 0,
    creditAmount: 0,
    balance: 0,
    category: AccountCategory.ASSETS,
    subCategory: '',
    reference: '',
    documentNumber: '',
    documentType: '',
    notes: '',
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const calculateBalance = (index: number) => {
  const item = formData.value.lineItems[index]
  // For assets and expenses, debit increases balance
  // For liabilities, equity, and revenue, credit increases balance
  if (item.category === AccountCategory.ASSETS || item.category === AccountCategory.EXPENSES || item.category === AccountCategory.COGS) {
    item.balance = item.debitAmount - item.creditAmount
  } else {
    item.balance = item.creditAmount - item.debitAmount
  }
}

// Calculations
const totalDebits = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + (item.debitAmount || 0), 0)
})

const totalCredits = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + (item.creditAmount || 0), 0)
})

const netBalance = computed(() => {
  return totalDebits.value - totalCredits.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.type &&
    formData.value.dateFrom &&
    formData.value.dateTo &&
    formData.value.currency &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) => item.accountCode && item.accountName && item.description && item.category,
    )
  )
})

// Form Submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatReportType = (type: ReportType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatAccountCategory = (category: AccountCategory): string => {
  return category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>