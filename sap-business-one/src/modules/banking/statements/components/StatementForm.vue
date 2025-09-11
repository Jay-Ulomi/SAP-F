<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Bank Account *</label>
        <select
          v-model="formData.bankAccountId"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Bank Account</option>
          <option value="BA-1">Main Business Checking</option>
          <option value="BA-2">Business Savings</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Statement Type *</label>
        <select
          v-model="formData.statementType"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Statement Type</option>
          <option value="MONTHLY">Monthly</option>
          <option value="QUARTERLY">Quarterly</option>
          <option value="YEARLY">Yearly</option>
          <option value="CUSTOM">Custom</option>
          <option value="ON_DEMAND">On Demand</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Statement Date *</label>
        <input
          v-model="formData.statementDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Period Start *</label>
        <input
          v-model="formData.periodStart"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Period End *</label>
        <input
          v-model="formData.periodEnd"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Beginning Balance *</label>
        <input
          v-model.number="formData.beginningBalance"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Ending Balance *</label>
        <input
          v-model.number="formData.endingBalance"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
      </div>
    </div>

    <!-- Balance Summary -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-900 mb-3">Balance Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-sm text-gray-500">Beginning Balance</p>
          <p class="text-lg font-semibold text-gray-900">
            ${{ formatNumber(formData.beginningBalance || 0) }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">Ending Balance</p>
          <p class="text-lg font-semibold text-gray-900">
            ${{ formatNumber(formData.endingBalance || 0) }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">Net Change</p>
          <p
            class="text-lg font-semibold"
            :class="
              (formData.endingBalance || 0) - (formData.beginningBalance || 0) >= 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            ${{ formatNumber((formData.endingBalance || 0) - (formData.beginningBalance || 0)) }}
          </p>
        </div>
      </div>
    </div>

    <!-- File Upload Section -->
    <div v-if="!statement" class="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="mt-4">
          <label for="file-upload" class="cursor-pointer">
            <span class="mt-2 block text-sm font-medium text-gray-900">
              Upload Bank Statement File
            </span>
            <span class="mt-1 block text-sm text-gray-500">
              PDF, CSV, or OFX files up to 10MB
            </span>
            <input
              id="file-upload"
              ref="fileInput"
              type="file"
              accept=".pdf,.csv,.ofx"
              @change="handleFileUpload"
              class="sr-only"
            />
          </label>
        </div>
        <div v-if="selectedFile" class="mt-4">
          <p class="text-sm text-gray-600">
            Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
          </p>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Notes</label>
      <textarea
        v-model="formData.notes"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Additional notes for this statement"
      />
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ statement ? 'Update Statement' : 'Create Statement' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { BankStatement, StatementFormData } from '../types'
import { StatementType } from '../types'

interface Props {
  statement?: BankStatement | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: StatementFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)

// Form data
const formData = ref<StatementFormData>({
  bankAccountId: '',
  statementType: StatementType.MONTHLY,
  statementDate: new Date(),
  periodStart: new Date(),
  periodEnd: new Date(),
  beginningBalance: 0,
  endingBalance: 0,
  notes: '',
})

// Watch for initial data changes
watch(
  () => props.statement,
  (newStatement) => {
    if (newStatement) {
      formData.value = {
        bankAccountId: newStatement.bankAccountId,
        statementType: newStatement.statementType,
        statementDate: newStatement.statementDate,
        periodStart: newStatement.periodStart,
        periodEnd: newStatement.periodEnd,
        beginningBalance: newStatement.beginningBalance,
        endingBalance: newStatement.endingBalance,
        notes: newStatement.notes || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates on mount
onMounted(() => {
  if (!formData.value.statementDate) {
    formData.value.statementDate = new Date()
  }
  if (!formData.value.periodStart) {
    formData.value.periodStart = new Date()
  }
  if (!formData.value.periodEnd) {
    formData.value.periodEnd = new Date()
  }
})

// File upload handling
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

// Form submission
const handleSubmit = () => {
  emit('submit', formData.value)
}

// Utility functions
const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
