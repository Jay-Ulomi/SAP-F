<template>
  <div class="max-w-4xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="accountCode" class="block text-sm font-medium text-gray-700 mb-1">
              Account Code *
            </label>
            <input
              id="accountCode"
              v-model="formData.accountCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.accountCode }"
              placeholder="e.g., 1000"
              maxlength="20"
            />
            <p v-if="errors.accountCode" class="mt-1 text-sm text-red-600">
              {{ errors.accountCode }}
            </p>
          </div>

          <div>
            <label for="accountName" class="block text-sm font-medium text-gray-700 mb-1">
              Account Name *
            </label>
            <input
              id="accountName"
              v-model="formData.accountName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.accountName }"
              placeholder="e.g., Cash and Cash Equivalents"
              maxlength="100"
            />
            <p v-if="errors.accountName" class="mt-1 text-sm text-red-600">
              {{ errors.accountName }}
            </p>
          </div>

          <div>
            <label for="accountType" class="block text-sm font-medium text-gray-700 mb-1">
              Account Type *
            </label>
            <select
              id="accountType"
              v-model="formData.accountType"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.accountType }"
            >
              <option value="">Select Account Type</option>
              <option v-for="type in accountTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <p v-if="errors.accountType" class="mt-1 text-sm text-red-600">
              {{ errors.accountType }}
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
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
            <p v-if="errors.currency" class="mt-1 text-sm text-red-600">
              {{ errors.currency }}
            </p>
          </div>

          <div>
            <label for="parentAccount" class="block text-sm font-medium text-gray-700 mb-1">
              Parent Account
            </label>
            <select
              id="parentAccount"
              v-model="formData.parentAccount"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">No Parent Account</option>
              <option v-for="account in parentAccounts" :key="account.id" :value="account.id">
                {{ account.accountCode }} - {{ account.accountName }}
              </option>
            </select>
          </div>

          <div>
            <label for="taxCode" class="block text-sm font-medium text-gray-700 mb-1">
              Tax Code
            </label>
            <input
              id="taxCode"
              v-model="formData.taxCode"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="e.g., VAT20"
              maxlength="20"
            />
          </div>
        </div>

        <div class="mt-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter account description..."
            maxlength="500"
          ></textarea>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              id="reconciliationAccount"
              v-model="formData.reconciliationAccount"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="reconciliationAccount" class="ml-2 block text-sm text-gray-900">
              Reconciliation Account
            </label>
            <span class="ml-2 text-xs text-gray-500">
              (Can be reconciled with bank statements)
            </span>
          </div>

          <div class="flex items-center">
            <input
              id="blockedForManualEntry"
              v-model="formData.blockedForManualEntry"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="blockedForManualEntry" class="ml-2 block text-sm text-gray-900">
              Blocked for Manual Entry
            </label>
            <span class="ml-2 text-xs text-gray-500"> (Prevents manual journal entries) </span>
          </div>

          <div class="flex items-center">
            <input
              id="allowReconciliation"
              v-model="formData.allowReconciliation"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="allowReconciliation" class="ml-2 block text-sm text-gray-900">
              Allow Reconciliation
            </label>
            <span class="ml-2 text-xs text-gray-500">
              (Can be reconciled with other accounts)
            </span>
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
          :disabled="loading || !isFormValid"
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
import type { ChartAccount, ChartAccountFormData } from '../types'
import { AccountType } from '../types'
import { chartAccountsApi } from '../api/chartAccountsApi'

interface Props {
  initialData?: ChartAccount
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ChartAccountFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<ChartAccountFormData>({
  accountCode: '',
  accountName: '',
  accountType: AccountType.ASSET,
  parentAccount: '',
  description: '',
  currency: 'USD',
  taxCode: '',
  reconciliationAccount: false,
  blockedForManualEntry: false,
  allowReconciliation: false,
})

// Validation errors
const errors = ref<Partial<Record<keyof ChartAccountFormData, string>>>({})

// Parent accounts for dropdown
const parentAccounts = ref<ChartAccount[]>([])

// Computed
const isEdit = computed(() => !!props.initialData)
const accountTypes = computed(() => Object.values(AccountType))
const isFormValid = computed(() => {
  return (
    formData.value.accountCode.trim() !== '' &&
    formData.value.accountName.trim() !== '' &&
    formData.value.accountType &&
    formData.value.currency
  )
})

// Methods
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.accountCode.trim()) {
    errors.value.accountCode = 'Account code is required'
  } else if (formData.value.accountCode.length < 3) {
    errors.value.accountCode = 'Account code must be at least 3 characters'
  }

  if (!formData.value.accountName.trim()) {
    errors.value.accountName = 'Account name is required'
  }

  if (!formData.value.accountType) {
    errors.value.accountType = 'Account type is required'
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    // Validate account code uniqueness
    const isValid = await chartAccountsApi.validateAccountCode(
      formData.value.accountCode,
      props.initialData?.id,
    )

    if (!isValid) {
      errors.value.accountCode = 'Account code must be unique'
      return
    }

    emit('submit', { ...formData.value })
  } catch (error) {
    console.error('Validation error:', error)
  }
}

const loadParentAccounts = async () => {
  try {
    const accounts = await chartAccountsApi.getParentAccounts()
    parentAccounts.value = accounts
  } catch (error) {
    console.error('Failed to load parent accounts:', error)
  }
}

// Initialize form with initial data
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      accountCode: props.initialData.accountCode,
      accountName: props.initialData.accountName,
      accountType: props.initialData.accountType,
      parentAccount: props.initialData.parentAccount || '',
      description: props.initialData.description || '',
      currency: props.initialData.currency,
      taxCode: props.initialData.taxCode || '',
      reconciliationAccount: props.initialData.reconciliationAccount,
      blockedForManualEntry: props.initialData.blockedForManualEntry,
      allowReconciliation: props.initialData.allowReconciliation,
    }
  }
}

// Watch for initial data changes
watch(() => props.initialData, initializeForm, { immediate: true })

// Load parent accounts on mount
onMounted(() => {
  loadParentAccounts()
})
</script>
