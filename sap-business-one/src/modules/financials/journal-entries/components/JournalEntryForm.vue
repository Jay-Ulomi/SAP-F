<template>
  <div class="max-w-6xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Header Information -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Journal Entry Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label for="reference" class="block text-sm font-medium text-gray-700 mb-1">
              Reference *
            </label>
            <input
              id="reference"
              v-model="formData.reference"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.reference }"
              placeholder="e.g., JE-2024-001"
              maxlength="50"
            />
            <p v-if="errors.reference" class="mt-1 text-sm text-red-600">
              {{ errors.reference }}
            </p>
          </div>

          <div>
            <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
              Posting Date *
            </label>
            <input
              id="postingDate"
              v-model="formData.postingDate"
              type="date"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.postingDate }"
            />
            <p v-if="errors.postingDate" class="mt-1 text-sm text-red-600">
              {{ errors.postingDate }}
            </p>
          </div>

          <div>
            <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              v-model="formData.dueDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
              Entry Type *
            </label>
            <select
              id="type"
              v-model="formData.type"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.type }"
            >
              <option value="">Select Type</option>
              <option v-for="type in entryTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-600">
              {{ errors.type }}
            </p>
          </div>

          <div>
            <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
              Currency *
            </label>
            <select
              id="currency"
              v-model="formData.currency"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.currency }"
            >
              <option value="">Select Currency</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
            <p v-if="errors.currency" class="mt-1 text-sm text-red-600">
              {{ errors.currency }}
            </p>
          </div>

          <div>
            <label for="exchangeRate" class="block text-sm font-medium text-gray-700 mb-1">
              Exchange Rate *
            </label>
            <input
              id="exchangeRate"
              v-model.number="formData.exchangeRate"
              type="number"
              required
              step="0.0001"
              min="0"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.exchangeRate }"
              placeholder="1.0000"
            />
            <p v-if="errors.exchangeRate" class="mt-1 text-sm text-red-600">
              {{ errors.exchangeRate }}
            </p>
          </div>
        </div>

        <div class="mt-4">
          <label for="memo" class="block text-sm font-medium text-gray-700 mb-1"> Memo * </label>
          <textarea
            id="memo"
            v-model="formData.memo"
            rows="3"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.memo }"
            placeholder="Enter journal entry description..."
            maxlength="500"
          ></textarea>
          <p v-if="errors.memo" class="mt-1 text-sm text-red-600">
            {{ errors.memo }}
          </p>
        </div>
      </div>

      <!-- Line Items -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Line Items</h3>
          <button type="button" @click="addLineItem" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <div class="overflow-x-auto">
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
                  Memo
                </th>
                <th
                  class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tax Code
                </th>
                <th
                  class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(line, index) in formData.lineItems" :key="index" class="hover:bg-gray-50">
                <td class="px-3 py-2">
                  <select
                    v-model="line.accountId"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :class="{ 'border-red-500': lineErrors[index]?.accountId }"
                  >
                    <option value="">Select Account</option>
                    <option
                      v-for="account in availableAccounts"
                      :key="account.id"
                      :value="account.id"
                    >
                      {{ account.accountCode }} - {{ account.accountName }}
                    </option>
                  </select>
                  <p v-if="lineErrors[index]?.accountId" class="mt-1 text-xs text-red-600">
                    {{ lineErrors[index].accountId }}
                  </p>
                </td>
                <td class="px-3 py-2">
                  <input
                    v-model.number="line.debitAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :class="{ 'border-red-500': lineErrors[index]?.debitAmount }"
                    placeholder="0.00"
                  />
                  <p v-if="lineErrors[index]?.debitAmount" class="mt-1 text-xs text-red-600">
                    {{ lineErrors[index].debitAmount }}
                  </p>
                </td>
                <td class="px-3 py-2">
                  <input
                    v-model.number="line.creditAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :class="{ 'border-red-500': lineErrors[index]?.creditAmount }"
                    placeholder="0.00"
                  />
                  <p v-if="lineErrors[index]?.creditAmount" class="mt-1 text-xs text-red-600">
                    {{ lineErrors[index].creditAmount }}
                  </p>
                </td>
                <td class="px-3 py-2">
                  <input
                    v-model="line.memo"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Line memo"
                    maxlength="100"
                  />
                </td>
                <td class="px-3 py-2">
                  <input
                    v-model="line.taxCode"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Tax code"
                    maxlength="20"
                  />
                </td>
                <td class="px-3 py-2">
                  <button
                    type="button"
                    @click="removeLineItem(index)"
                    class="text-red-600 hover:text-red-800"
                    :disabled="formData.lineItems.length <= 1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span class="text-sm font-medium text-gray-700">Total Debit:</span>
              <span class="ml-2 text-lg font-semibold text-gray-900">
                {{ formatCurrency(totalDebit) }}
              </span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Total Credit:</span>
              <span class="ml-2 text-lg font-semibold text-gray-900">
                {{ formatCurrency(totalCredit) }}
              </span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Balance:</span>
              <span class="ml-2 text-lg font-semibold" :class="balanceClass">
                {{ formatCurrency(balance) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading || !isBalanced"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">{{ isEdit ? 'Updating...' : 'Creating...' }}</span>
          <span v-else>{{ isEdit ? 'Update' : 'Create' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { JournalEntry, JournalEntryFormData, JournalEntryLineFormData } from '../types'
import { JournalEntryType } from '../types'
import { journalEntriesApi } from '../api/journalEntriesApi'

interface Props {
  initialData?: JournalEntry
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: JournalEntryFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<JournalEntryFormData>({
  reference: '',
  postingDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  memo: '',
  type: JournalEntryType.GENERAL,
  currency: 'USD',
  exchangeRate: 1.0,
  lineItems: [
    {
      accountId: '',
      debitAmount: 0,
      creditAmount: 0,
      memo: '',
      taxCode: '',
      taxAmount: 0,
    },
  ],
})

// Validation errors
const errors = ref<Partial<Record<keyof JournalEntryFormData, string>>>({})
const lineErrors = ref<{ [key: number]: Partial<Record<keyof JournalEntryLineFormData, string>> }>(
  {},
)

// Available accounts for dropdown (mock data for now)
const availableAccounts = ref([
  { id: '1', accountCode: '1000', accountName: 'Cash and Cash Equivalents' },
  { id: '2', accountCode: '1100', accountName: 'Accounts Receivable' },
  { id: '3', accountCode: '2000', accountName: 'Accounts Payable' },
  { id: '4', accountCode: '3000', accountName: 'Common Stock' },
  { id: '5', accountCode: '4000', accountName: 'Revenue' },
  { id: '6', accountCode: '5000', accountName: 'Cost of Goods Sold' },
  { id: '7', accountCode: '6000', accountName: 'Operating Expenses' },
])

// Computed
const isEdit = computed(() => !!props.initialData)
const entryTypes = computed(() => Object.values(JournalEntryType))

const totalDebit = computed(() =>
  formData.value.lineItems.reduce((sum, line) => sum + (line.debitAmount || 0), 0),
)

const totalCredit = computed(() =>
  formData.value.lineItems.reduce((sum, line) => sum + (line.creditAmount || 0), 0),
)

const balance = computed(() => totalDebit.value - totalCredit.value)
const isBalanced = computed(() => Math.abs(balance.value) < 0.01)

const balanceClass = computed(() => {
  if (isBalanced.value) return 'text-green-600'
  if (balance.value > 0) return 'text-red-600'
  return 'text-blue-600'
})

// Methods
const addLineItem = () => {
  formData.value.lineItems.push({
    accountId: '',
    debitAmount: 0,
    creditAmount: 0,
    memo: '',
    taxCode: '',
    taxAmount: 0,
  })
}

const removeLineItem = (index: number) => {
  if (formData.value.lineItems.length > 1) {
    formData.value.lineItems.splice(index, 1)
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  lineErrors.value = {}

  // Validate header fields
  if (!formData.value.reference.trim()) {
    errors.value.reference = 'Reference is required'
  }

  if (!formData.value.postingDate) {
    errors.value.postingDate = 'Posting date is required'
  }

  if (!formData.value.memo.trim()) {
    errors.value.memo = 'Memo is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Entry type is required'
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
  }

  if (!formData.value.exchangeRate || formData.value.exchangeRate <= 0) {
    errors.value.exchangeRate = 'Exchange rate must be greater than 0'
  }

  // Validate line items
  formData.value.lineItems.forEach((line, index) => {
    if (!line.accountId) {
      lineErrors.value[index] = { ...lineErrors.value[index], accountId: 'Account is required' }
    }

    if ((line.debitAmount || 0) === 0 && (line.creditAmount || 0) === 0) {
      lineErrors.value[index] = {
        ...lineErrors.value[index],
        debitAmount: 'Either debit or credit amount is required',
      }
    }

    if ((line.debitAmount || 0) > 0 && (line.creditAmount || 0) > 0) {
      lineErrors.value[index] = {
        ...lineErrors.value[index],
        debitAmount: 'Cannot have both debit and credit amounts',
      }
    }
  })

  // Check if balanced
  if (!isBalanced.value) {
    errors.value.memo = 'Journal entry must be balanced (debits = credits)'
  }

  return Object.keys(errors.value).length === 0 && Object.keys(lineErrors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    // Validate with API
    const validationResult = await journalEntriesApi.validateJournalEntry(formData.value)

    if (!validationResult.isValid) {
      // Handle validation errors from API
      validationResult.errors.forEach((error) => {
        // You could map these to specific fields or show as general errors
        console.error('API Validation Error:', error)
      })
      return
    }

    emit('submit', { ...formData.value })
  } catch (error) {
    console.error('Validation error:', error)
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency || 'USD',
  }).format(amount)
}

// Initialize form with initial data
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      reference: props.initialData.reference,
      postingDate: props.initialData.postingDate,
      dueDate: props.initialData.dueDate || '',
      memo: props.initialData.memo,
      type: props.initialData.type,
      currency: props.initialData.currency,
      exchangeRate: props.initialData.exchangeRate,
      lineItems: props.initialData.lineItems.map((line) => ({
        accountId: line.accountId,
        debitAmount: line.debitAmount,
        creditAmount: line.creditAmount,
        memo: line.memo || '',
        taxCode: line.taxCode || '',
        taxAmount: line.taxAmount,
      })),
    }
  }
}

// Watch for initial data changes
watch(() => props.initialData, initializeForm, { immediate: true })

// Load available accounts on mount
onMounted(async () => {
  try {
    // In a real app, you'd fetch accounts from the API
    // const accounts = await chartAccountsApi.getChartAccounts()
    // availableAccounts.value = accounts.data
  } catch (error) {
    console.error('Failed to load accounts:', error)
  }
})
</script>
