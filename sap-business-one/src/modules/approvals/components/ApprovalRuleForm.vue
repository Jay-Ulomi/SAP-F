<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <!-- Error Message -->
    <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-800">{{ errors.general }}</p>
        </div>
      </div>
    </div>

    <!-- Basic Information Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Type -->
              <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Approval Type *
          </label>
          <select
            id="type"
            v-model="form.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.type }"
                >
                  <option value="">Select Approval Type</option>
                  <option value="OPEX">OPEX</option>
                  <option value="FUEL_STAFF">Fuel-Staff</option>
                  <option value="FUEL_BULK">Fuel-Bulk</option>
                  <option value="OPEX_UNCONTRACTED">OPEX Uncontracted</option>
                  <option value="CAPEX">CAPEX</option>
                </select>
          <div v-if="errors.type" class="mt-1 text-sm text-red-600">
            {{ errors.type }}
          </div>
              </div>

              <!-- Department -->
              <div>
          <label for="department" class="block text-sm font-medium text-gray-700 mb-1">
            Department *
          </label>
          <select
            id="department"
            v-model="form.department"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.department }"
                >
                  <option value="">Select Department</option>
                  <option value="SALES">Sales</option>
                  <option value="OPERATIONS">Operations</option>
                  <option value="HUMAN_RESOURCE">Human Resource</option>
                  <option value="FINANCE">Finance</option>
                  <option value="IT">IT</option>
                  <option value="MARKETING">Marketing</option>
                </select>
          <div v-if="errors.department" class="mt-1 text-sm text-red-600">
            {{ errors.department }}
          </div>
        </div>

        <!-- Document Type -->
        <div>
          <label for="documentType" class="block text-sm font-medium text-gray-700 mb-1">
            Document Type *
          </label>
          <select
            id="documentType"
            v-model="form.documentType"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.documentType }"
                >
                  <option value="">Select Document Type</option>
                  <option value="PURCHASE_REQUEST">Purchase Request</option>
                  <option value="PURCHASE_ORDER">Purchase Order</option>
                  <option value="GOODS_RECEIPT">Goods Receipt</option>
                  <option value="GOODS_ISSUE">Goods Issue</option>
                  <option value="AP_INVOICE">AP Invoice</option>
                  <option value="AP_CREDIT_MEMO">AP Credit Memo</option>
                  <option value="AR_INVOICE">AR Invoice</option>
                  <option value="AR_CREDIT_MEMO">AR Credit Memo</option>
                  <option value="DELIVERY">Delivery</option>
                  <option value="RETURN">Return</option>
                </select>
          <div v-if="errors.documentType" class="mt-1 text-sm text-red-600">
            {{ errors.documentType }}
          </div>
        </div>

        <!-- Initiator -->
        <div>
          <label for="initiator" class="block text-sm font-medium text-gray-700 mb-1">
            Initiator *
          </label>
          <select
            id="initiator"
            v-model="form.initiator"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.initiator }"
                >
                  <option value="">Select Initiator</option>
                  <option v-for="user in users" :key="user.id" :value="user.name">
                    {{ user.name }} ({{ user.department }})
                  </option>
                </select>
          <div v-if="errors.initiator" class="mt-1 text-sm text-red-600">
            {{ errors.initiator }}
          </div>
        </div>
      </div>
    </div>

    <!-- Amount Range Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Amount Thresholds</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="amountFrom" class="block text-sm font-medium text-gray-700 mb-1">
            Amount From *
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amountFrom"
              type="number"
              v-model.number="form.amountFrom"
              required
              placeholder="0"
              min="0"
              class="block w-full pl-7 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
              :class="{ 'border-red-500': errors.amountFrom }"
                  />
                </div>
          <div v-if="errors.amountFrom" class="mt-1 text-sm text-red-600">
            {{ errors.amountFrom }}
          </div>
        </div>

        <div>
          <label for="amountTo" class="block text-sm font-medium text-gray-700 mb-1">
            Amount To *
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amountTo"
              type="number"
              v-model.number="form.amountTo"
              required
              placeholder="1000000"
              min="0"
              class="block w-full pl-7 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
              :class="{ 'border-red-500': errors.amountTo }"
                  />
                </div>
          <div v-if="errors.amountTo" class="mt-1 text-sm text-red-600">
            {{ errors.amountTo }}
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Chain Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Approval Chain</h3>
      <p class="text-sm text-gray-600 mb-4">Define the approval hierarchy for this rule. Approvals will be processed sequentially from Approver 1 to Approver 5.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Approver 1 -->
        <div>
          <label for="approver1" class="block text-sm font-medium text-gray-700 mb-1">
            Primary Approver (Required)
          </label>
          <select
            id="approver1"
            v-model="form.approver1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
                >
                  <option value="">Select Primary Approver</option>
                  <option v-for="user in users" :key="user.id" :value="user.name">
                    {{ user.name }} ({{ user.role }}, {{ user.department }})
                  </option>
                </select>
              </div>

        <!-- Approver 2 -->
        <div>
          <label for="approver2" class="block text-sm font-medium text-gray-700 mb-1">
            Secondary Approver (Optional)
          </label>
          <select
            id="approver2"
            v-model="form.approver2"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
                >
                  <option value="">Select Secondary Approver</option>
                  <option v-for="user in users" :key="user.id" :value="user.name">
                    {{ user.name }} ({{ user.role }}, {{ user.department }})
                  </option>
                </select>
              </div>

        <!-- Approver 3 -->
        <div>
          <label for="approver3" class="block text-sm font-medium text-gray-700 mb-1">
            Third Approver (Optional)
          </label>
          <select
            id="approver3"
            v-model="form.approver3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
                >
            <option value="">Select Third Approver</option>
            <option v-for="user in users" :key="user.id" :value="user.name">
              {{ user.name }} ({{ user.role }}, {{ user.department }})
            </option>
          </select>
        </div>

        <!-- Approver 4 -->
        <div>
          <label for="approver4" class="block text-sm font-medium text-gray-700 mb-1">
            Fourth Approver (Optional)
          </label>
          <select
            id="approver4"
            v-model="form.approver4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          >
            <option value="">Select Fourth Approver</option>
            <option v-for="user in users" :key="user.id" :value="user.name">
              {{ user.name }} ({{ user.role }}, {{ user.department }})
            </option>
          </select>
        </div>

        <!-- Approver 5 -->
        <div>
          <label for="approver5" class="block text-sm font-medium text-gray-700 mb-1">
            Fifth Approver (Optional)
          </label>
          <select
            id="approver5"
            v-model="form.approver5"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          >
            <option value="">Select Fifth Approver</option>
            <option v-for="user in users" :key="user.id" :value="user.name">
              {{ user.name }} ({{ user.role }}, {{ user.department }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Rule Status Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Rule Status</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            id="status"
            v-model="form.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.status }"
          >
            <option value="">Select Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <div v-if="errors.status" class="mt-1 text-sm text-red-600">
            {{ errors.status }}
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Rule Preview</h3>
      <div class="text-sm text-gray-600">
        <p><strong>Type:</strong> {{ form.type || 'Not selected' }}</p>
        <p><strong>Department:</strong> {{ form.department || 'Not selected' }}</p>
        <p><strong>Document Type:</strong> {{ form.documentType || 'Not selected' }}</p>
        <p><strong>Initiator:</strong> {{ form.initiator || 'Not selected' }}</p>
        <p><strong>Amount Range:</strong> {{ formatCurrency(form.amountFrom) }} - {{ formatCurrency(form.amountTo) }}</p>
        <p><strong>Primary Approver:</strong> {{ form.approver1 || 'Not selected' }}</p>
        <p v-if="form.approver2"><strong>Secondary Approver:</strong> {{ form.approver2 }}</p>
        <p v-if="form.approver3"><strong>Third Approver:</strong> {{ form.approver3 }}</p>
        <p v-if="form.approver4"><strong>Fourth Approver:</strong> {{ form.approver4 }}</p>
        <p v-if="form.approver5"><strong>Fifth Approver:</strong> {{ form.approver5 }}</p>
        <p><strong>Status:</strong> {{ form.status || 'Not selected' }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isEditing ? 'Updating...' : 'Creating...' }}
          </span>
          <span v-else>
            {{ isEditing ? 'Update Approval Rule' : 'Create Approval Rule' }}
          </span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import type { ApprovalRule, ApprovalRuleFormData } from '../types'
import { ApprovalType, Department, ApprovalDocumentType, ApprovalStatus } from '../types'

// Props
interface Props {
  rule?: ApprovalRule | null
}

const props = withDefaults(defineProps<Props>(), {
  rule: null
})

// Emits
const emit = defineEmits<{
  close: []
  success: []
}>()

// Store
const approvalsStore = useApprovalsStore()

// Reactive state
const loading = ref(false)
const errors = reactive<Record<string, string>>({})

// Form data
const form = reactive<ApprovalRuleFormData>({
  type: ApprovalType.OPEX,
  department: Department.SALES,
  documentType: ApprovalDocumentType.PURCHASE_REQUEST,
  initiator: '',
  amountFrom: 0,
  amountTo: 0,
  approver1: '',
  approver2: '',
  approver3: '',
  approver4: '',
  approver5: '',
  status: ApprovalStatus.ACTIVE
})

// Computed
const isEditing = computed(() => props.rule !== null)
const users = computed(() => approvalsStore.users)

const isFormValid = computed(() => {
  return form.type && form.department && form.documentType && form.initiator &&
         form.amountFrom >= 0 && form.amountTo > 0 && form.amountFrom < form.amountTo &&
         form.status && form.approver1
})

// Methods
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })
}

const resetForm = () => {
  Object.assign(form, {
    type: ApprovalType.OPEX,
    department: Department.SALES,
    documentType: ApprovalDocumentType.PURCHASE_REQUEST,
    initiator: '',
    amountFrom: 0,
    amountTo: 0,
    approver1: '',
    approver2: '',
    approver3: '',
    approver4: '',
    approver5: '',
    status: ApprovalStatus.ACTIVE
  })
  clearErrors()
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const validateForm = (): boolean => {
  clearErrors()
  let isValid = true

  if (!form.type) {
    errors.type = 'Type is required'
    isValid = false
  }

  if (!form.department) {
    errors.department = 'Department is required'
    isValid = false
  }

  if (!form.documentType) {
    errors.documentType = 'Document type is required'
    isValid = false
  }

  if (!form.initiator) {
    errors.initiator = 'Initiator is required'
    isValid = false
  }

  if (form.amountFrom < 0) {
    errors.amountFrom = 'Amount from must be non-negative'
    isValid = false
  }

  if (form.amountTo <= 0) {
    errors.amountTo = 'Amount to must be greater than 0'
    isValid = false
  }

  if (form.amountFrom >= form.amountTo) {
    errors.amountTo = 'Amount to must be greater than amount from'
    isValid = false
  }

  if (!form.status) {
    errors.status = 'Status is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    loading.value = true
    clearErrors()

    if (isEditing.value && props.rule) {
      await approvalsStore.updateApprovalRule(props.rule.id, form)
    } else {
      await approvalsStore.createApprovalRule(form)
    }

    emit('success')
    closeForm()
  } catch (error) {
    console.error('Error saving approval rule:', error)
    // Set a general error message
    errors.general = 'Failed to save approval rule. Please try again.'
  } finally {
    loading.value = false
  }
}

const closeForm = () => {
  resetForm()
  emit('close')
}

// Watch for rule changes (for editing)
watch(
  () => props.rule,
  (newRule) => {
    if (newRule) {
      Object.assign(form, {
        type: newRule.type,
        department: newRule.department,
        documentType: newRule.documentType,
        initiator: newRule.initiator,
        amountFrom: newRule.amountFrom,
        amountTo: newRule.amountTo,
        approver1: newRule.approver1 || '',
        approver2: newRule.approver2 || '',
        approver3: newRule.approver3 || '',
        approver4: newRule.approver4 || '',
        approver5: newRule.approver5 || '',
        status: newRule.status
      })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Lifecycle
onMounted(async () => {
  try {
    await approvalsStore.fetchUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})
</script>