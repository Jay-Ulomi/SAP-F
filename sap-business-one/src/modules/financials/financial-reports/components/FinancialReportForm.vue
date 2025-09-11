<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          id="category"
          v-model="formData.category"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select category</option>
          <option v-for="category in reportCategories" :key="category" :value="category">
            {{ formatCategory(category) }}
          </option>
        </select>
      </div>

      <div>
        <label for="format" class="block text-sm font-medium text-gray-700 mb-1">
          Output Format *
        </label>
        <select
          id="format"
          v-model="formData.format"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select format</option>
          <option v-for="format in reportFormats" :key="format" :value="format">
            {{ format }}
          </option>
        </select>
      </div>

      <div>
        <label for="period" class="block text-sm font-medium text-gray-700 mb-1">
          Report Period *
        </label>
        <select
          id="period"
          v-model="formData.period"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select period</option>
          <option v-for="period in reportPeriods" :key="period" :value="period">
            {{ formatPeriod(period) }}
          </option>
        </select>
      </div>

      <div>
        <label for="fiscalYear" class="block text-sm font-medium text-gray-700 mb-1">
          Fiscal Year *
        </label>
        <input
          id="fiscalYear"
          v-model="formData.fiscalYear"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="e.g., 2024"
        />
      </div>

      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
          Start Date *
        </label>
        <input
          id="startDate"
          v-model="formData.startDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        />
      </div>

      <div>
        <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
          End Date *
        </label>
        <input
          id="endDate"
          v-model="formData.endDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        />
      </div>
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        id="description"
        v-model="formData.description"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Enter report description"
      ></textarea>
    </div>

    <!-- Report Parameters -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Report Parameters</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center">
          <input
            id="includeZeroBalances"
            v-model="formData.parameters.includeZeroBalances"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="includeZeroBalances" class="ml-2 text-sm text-gray-700">
            Include Zero Balances
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="includeClosedAccounts"
            v-model="formData.parameters.includeClosedAccounts"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="includeClosedAccounts" class="ml-2 text-sm text-gray-700">
            Include Closed Accounts
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="includeAdjustments"
            v-model="formData.parameters.includeAdjustments"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="includeAdjustments" class="ml-2 text-sm text-gray-700">
            Include Adjustments
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="showComparisons"
            v-model="formData.parameters.showComparisons"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="showComparisons" class="ml-2 text-sm text-gray-700"> Show Comparisons </label>
        </div>

        <div class="flex items-center">
          <input
            id="includeCharts"
            v-model="formData.parameters.includeCharts"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="includeCharts" class="ml-2 text-sm text-gray-700"> Include Charts </label>
        </div>

        <div class="flex items-center">
          <input
            id="includeNotes"
            v-model="formData.parameters.includeNotes"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="includeNotes" class="ml-2 text-sm text-gray-700"> Include Notes </label>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="comparisonPeriods" class="block text-sm font-medium text-gray-700 mb-1">
            Comparison Periods
          </label>
          <input
            id="comparisonPeriods"
            v-model.number="formData.parameters.comparisonPeriods"
            type="number"
            min="0"
            max="12"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="orientation" class="block text-sm font-medium text-gray-700 mb-1">
            Page Orientation
          </label>
          <select
            id="orientation"
            v-model="formData.parameters.orientation"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="PORTRAIT">Portrait</option>
            <option value="LANDSCAPE">Landscape</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Report Filters -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Report Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="accountGroups" class="block text-sm font-medium text-gray-700 mb-1">
            Account Groups
          </label>
          <input
            id="accountGroups"
            v-model="filterInputs.accountGroups"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Comma-separated account groups"
          />
        </div>

        <div>
          <label for="costCenters" class="block text-sm font-medium text-gray-700 mb-1">
            Cost Centers
          </label>
          <input
            id="costCenters"
            v-model="filterInputs.costCenters"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Comma-separated cost centers"
          />
        </div>

        <div>
          <label for="businessPartners" class="block text-sm font-medium text-gray-700 mb-1">
            Business Partners
          </label>
          <input
            id="businessPartners"
            v-model="filterInputs.businessPartners"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Comma-separated business partners"
          />
        </div>

        <div>
          <label for="currencies" class="block text-sm font-medium text-gray-700 mb-1">
            Currencies
          </label>
          <input
            id="currencies"
            v-model="filterInputs.currencies"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Comma-separated currencies"
          />
        </div>
      </div>
    </div>

    <!-- Scheduling -->
    <div class="border border-gray-200 rounded-lg p-4">
      <div class="flex items-center mb-4">
        <input
          id="isRecurring"
          v-model="formData.isRecurring"
          type="checkbox"
          class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
        />
        <label for="isRecurring" class="ml-2 text-sm font-medium text-gray-700">
          Schedule Recurring Report
        </label>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
        Additional Notes
      </label>
      <textarea
        id="notes"
        v-model="formData.notes"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Enter any additional notes or instructions"
      ></textarea>
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
        <span v-if="loading">{{ initialData ? 'Updating...' : 'Creating...' }}</span>
        <span v-else>{{ initialData ? 'Update' : 'Create' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { FinancialReportFormData, FinancialReport } from '../types'
import { ReportCategory, ReportFormat, ReportPeriod } from '../types'

interface Props {
  initialData?: FinancialReport
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: FinancialReportFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
  loading: false,
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<FinancialReportFormData>({
  name: '',
  description: '',
  category: ReportCategory.BALANCE_SHEET,
  format: ReportFormat.PDF,
  period: ReportPeriod.MONTHLY,
  fiscalYear: new Date().getFullYear().toString(),
  startDate: '',
  endDate: '',
  parameters: {
    includeZeroBalances: false,
    includeClosedAccounts: false,
    includeAdjustments: false,
    showComparisons: false,
    comparisonPeriods: 0,
    includeCharts: true,
    includeNotes: true,
    pageBreak: false,
    orientation: 'PORTRAIT',
    paperSize: 'A4',
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  },
  filters: {
    accountGroups: [],
    costCenters: [],
    profitCenters: [],
    businessPartners: [],
    documentTypes: [],
    currencies: [],
  },
  isRecurring: false,
  notes: '',
})

// Filter inputs for UI (comma-separated strings)
const filterInputs = ref({
  accountGroups: '',
  costCenters: '',
  profitCenters: '',
  businessPartners: '',
  documentTypes: '',
  currencies: '',
})

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.category &&
    formData.value.format &&
    formData.value.period &&
    formData.value.fiscalYear.trim() !== '' &&
    formData.value.startDate &&
    formData.value.endDate
  )
})

const reportCategories = computed(() => Object.values(ReportCategory))
const reportFormats = computed(() => Object.values(ReportFormat))
const reportPeriods = computed(() => Object.values(ReportPeriod))

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        name: newData.name,
        description: newData.description || '',
        category: newData.category,
        format: newData.format,
        period: newData.period,
        fiscalYear: newData.fiscalYear,
        startDate: newData.startDate,
        endDate: newData.endDate,
        parameters: {
          includeZeroBalances: newData.parameters.includeZeroBalances,
          includeClosedAccounts: newData.parameters.includeClosedAccounts,
          includeAdjustments: newData.parameters.includeAdjustments,
          showComparisons: newData.parameters.showComparisons,
          comparisonPeriods: newData.parameters.comparisonPeriods,
          includeCharts: newData.parameters.includeCharts,
          includeNotes: newData.parameters.includeNotes,
          pageBreak: newData.parameters.pageBreak,
          orientation: newData.parameters.orientation,
          paperSize: newData.parameters.paperSize,
          margins: { ...newData.parameters.margins },
        },
        filters: {
          accountGroups: newData.filters.accountGroups || [],
          costCenters: newData.filters.costCenters || [],
          profitCenters: newData.filters.profitCenters || [],
          businessPartners: newData.filters.businessPartners || [],
          documentTypes: newData.filters.documentTypes || [],
          currencies: newData.filters.currencies || [],
        },
        isRecurring: newData.isRecurring,
        notes: newData.notes || '',
      }

      // Update filter inputs
      filterInputs.value = {
        accountGroups: newData.filters.accountGroups?.join(', ') || '',
        costCenters: newData.filters.costCenters?.join(', ') || '',
        profitCenters: newData.filters.profitCenters?.join(', ') || '',
        businessPartners: newData.filters.businessPartners?.join(', ') || '',
        documentTypes: newData.filters.documentTypes?.join(', ') || '',
        currencies: newData.filters.currencies?.join(', ') || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    formData.value.startDate = firstDayOfMonth.toISOString().split('T')[0]
    formData.value.endDate = lastDayOfMonth.toISOString().split('T')[0]
  }
})

// Methods
const handleSubmit = () => {
  if (!isFormValid.value) return

  // Convert comma-separated strings to arrays
  const submitData: FinancialReportFormData = {
    ...formData.value,
    filters: {
      ...formData.value.filters,
      accountGroups: filterInputs.value.accountGroups
        ? filterInputs.value.accountGroups.split(',').map((s) => s.trim())
        : undefined,
      costCenters: filterInputs.value.costCenters
        ? filterInputs.value.costCenters.split(',').map((s) => s.trim())
        : undefined,
      profitCenters: filterInputs.value.profitCenters
        ? filterInputs.value.profitCenters.split(',').map((s) => s.trim())
        : undefined,
      businessPartners: filterInputs.value.businessPartners
        ? filterInputs.value.businessPartners.split(',').map((s) => s.trim())
        : undefined,
      documentTypes: filterInputs.value.documentTypes
        ? filterInputs.value.documentTypes.split(',').map((s) => s.trim())
        : undefined,
      currencies: filterInputs.value.currencies
        ? filterInputs.value.currencies.split(',').map((s) => s.trim())
        : undefined,
    },
  }

  emit('submit', submitData)
}

const formatCategory = (category: ReportCategory): string => {
  return category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPeriod = (period: ReportPeriod): string => {
  return period.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
