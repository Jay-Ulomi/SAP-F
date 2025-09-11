<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Check Date *</label>
        <input
          v-model="formData.checkDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Due Date *</label>
        <input
          v-model="formData.dueDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Vendor *</label>
        <select
          v-model="formData.vendorId"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Vendor</option>
          <option value="V-1">ABC Supplies Inc.</option>
          <option value="V-2">XYZ Services Ltd.</option>
          <option value="V-3">Tech Solutions Corp.</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Check Type *</label>
        <select
          v-model="formData.checkType"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Check Type</option>
          <option value="BUSINESS_CHECK">Business Check</option>
          <option value="PERSONAL_CHECK">Personal Check</option>
          <option value="CASHIERS_CHECK">Cashier's Check</option>
          <option value="CERTIFIED_CHECK">Certified Check</option>
          <option value="TRAVELERS_CHECK">Traveler's Check</option>
          <option value="MONEY_ORDER">Money Order</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Check Purpose *</label>
        <select
          v-model="formData.checkPurpose"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Purpose</option>
          <option value="VENDOR_PAYMENT">Vendor Payment</option>
          <option value="SUPPLIER_PAYMENT">Supplier Payment</option>
          <option value="EMPLOYEE_PAYROLL">Employee Payroll</option>
          <option value="EXPENSE_REIMBURSEMENT">Expense Reimbursement</option>
          <option value="LOAN_PAYMENT">Loan Payment</option>
          <option value="TAX_PAYMENT">Tax Payment</option>
          <option value="INSURANCE_PAYMENT">Insurance Payment</option>
          <option value="UTILITY_PAYMENT">Utility Payment</option>
          <option value="RENT_PAYMENT">Rent Payment</option>
          <option value="DIVIDEND_PAYMENT">Dividend Payment</option>
          <option value="REFUND">Refund</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Amount *</label>
        <input
          v-model.number="formData.amount"
          type="number"
          step="0.01"
          min="0"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Currency *</label>
        <select
          v-model="formData.currency"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="CAD">CAD ($)</option>
        </select>
      </div>

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
        <label class="block text-sm font-medium text-gray-700">Reference Number</label>
        <input
          v-model="formData.referenceNumber"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter reference number"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Description *</label>
      <textarea
        v-model="formData.description"
        rows="3"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter check description"
      />
    </div>

    <!-- Applied Purchase Orders -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Applied Purchase Orders</h3>
        <button
          type="button"
          @click="addPurchaseOrder"
          class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add PO
        </button>
      </div>

      <div v-if="formData.appliedPurchaseOrders.length > 0" class="space-y-4">
        <div
          v-for="(po, index) in formData.appliedPurchaseOrders"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Purchase Order</label>
              <select
                v-model="po.poId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select PO</option>
                <option value="PO-1">PO-2024-001 - ABC Supplies</option>
                <option value="PO-2">PO-2024-002 - XYZ Services</option>
                <option value="PO-3">PO-2024-003 - Tech Solutions</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Applied Amount</label>
              <input
                v-model.number="po.appliedAmount"
                type="number"
                step="0.01"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Discount Amount</label>
              <input
                v-model.number="po.discountAmount"
                type="number"
                step="0.01"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
            <div class="flex items-end">
              <button
                type="button"
                @click="removePurchaseOrder(index)"
                class="w-full px-3 py-2 text-sm text-red-600 hover:text-red-800 focus:outline-none"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Notes</label>
      <textarea
        v-model="formData.notes"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Additional notes"
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
        <span v-else>{{ check ? 'Update Check' : 'Create Check' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Check, CheckFormData, AppliedPurchaseOrderFormData } from '../types'
import { CheckType, CheckPurpose, Currency } from '../types'

interface Props {
  check?: Check | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: CheckFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<CheckFormData>({
  checkDate: new Date(),
  dueDate: new Date(),
  vendorId: '',
  checkType: CheckType.BUSINESS_CHECK,
  checkPurpose: CheckPurpose.VENDOR_PAYMENT,
  amount: 0,
  currency: Currency.USD,
  bankAccountId: '',
  referenceNumber: '',
  description: '',
  appliedPurchaseOrders: [],
  notes: '',
})

// Watch for initial data changes
watch(
  () => props.check,
  (newCheck) => {
    if (newCheck) {
      formData.value = {
        checkDate: newCheck.checkDate,
        dueDate: newCheck.dueDate,
        vendorId: newCheck.vendorId,
        checkType: newCheck.checkType,
        checkPurpose: newCheck.checkPurpose,
        amount: newCheck.amount,
        currency: newCheck.currency,
        bankAccountId: newCheck.bankAccountId,
        referenceNumber: newCheck.referenceNumber || '',
        description: newCheck.description,
        appliedPurchaseOrders: newCheck.appliedPurchaseOrders.map((apo) => ({
          poId: apo.poId,
          appliedAmount: apo.appliedAmount,
          discountAmount: apo.discountAmount,
          writeOffAmount: apo.writeOffAmount,
        })),
        notes: newCheck.notes || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates on mount
onMounted(() => {
  if (!formData.value.checkDate) {
    formData.value.checkDate = new Date()
  }
  if (!formData.value.dueDate) {
    formData.value.dueDate = new Date()
  }
})

// Purchase order management
const addPurchaseOrder = () => {
  formData.value.appliedPurchaseOrders.push({
    poId: '',
    appliedAmount: 0,
    discountAmount: 0,
    writeOffAmount: 0,
  })
}

const removePurchaseOrder = (index: number) => {
  formData.value.appliedPurchaseOrders.splice(index, 1)
}

// Form submission
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
