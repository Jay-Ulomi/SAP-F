<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Deposit Date *</label>
        <input
          v-model="formData.depositDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Received Date *</label>
        <input
          v-model="formData.receivedDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Customer *</label>
        <select
          v-model="formData.customerId"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Customer</option>
          <option value="C-1">ABC Manufacturing Inc.</option>
          <option value="C-2">XYZ Services Ltd.</option>
          <option value="C-3">Tech Solutions Corp.</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Deposit Type *</label>
        <select
          v-model="formData.depositType"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Deposit Type</option>
          <option value="CASH">Cash</option>
          <option value="CHECK">Check</option>
          <option value="WIRE_TRANSFER">Wire Transfer</option>
          <option value="ACH">ACH</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="ELECTRONIC_TRANSFER">Electronic Transfer</option>
          <option value="MONEY_ORDER">Money Order</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Deposit Source *</label>
        <select
          v-model="formData.depositSource"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Source</option>
          <option value="CUSTOMER_PAYMENT">Customer Payment</option>
          <option value="VENDOR_REFUND">Vendor Refund</option>
          <option value="INTEREST">Interest</option>
          <option value="DIVIDEND">Dividend</option>
          <option value="LOAN_PROCEEDS">Loan Proceeds</option>
          <option value="INVESTMENT_RETURN">Investment Return</option>
          <option value="SALE_PROCEEDS">Sale Proceeds</option>
          <option value="OTHER_INCOME">Other Income</option>
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
        placeholder="Enter deposit description"
      />
    </div>

    <!-- Applied Invoices -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Applied Invoices</h3>
        <button
          type="button"
          @click="addInvoice"
          class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Invoice
        </button>
      </div>

      <div v-if="formData.appliedInvoices.length > 0" class="space-y-4">
        <div
          v-for="(invoice, index) in formData.appliedInvoices"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice</label>
              <select
                v-model="invoice.invoiceId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Invoice</option>
                <option value="INV-1">INV-2024-001 - ABC Manufacturing</option>
                <option value="INV-2">INV-2024-002 - XYZ Services</option>
                <option value="INV-3">INV-2024-003 - Tech Solutions</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Applied Amount</label>
              <input
                v-model.number="invoice.appliedAmount"
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
                v-model.number="invoice.discountAmount"
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
                @click="removeInvoice(index)"
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
        <span v-else>{{ deposit ? 'Update Deposit' : 'Create Deposit' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Deposit, DepositFormData, AppliedInvoiceFormData } from '../types'
import { DepositType, DepositSource, Currency } from '../types'

interface Props {
  deposit?: Deposit | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: DepositFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<DepositFormData>({
  depositDate: new Date(),
  receivedDate: new Date(),
  customerId: '',
  depositType: DepositType.CASH,
  depositSource: DepositSource.CUSTOMER_PAYMENT,
  amount: 0,
  currency: Currency.USD,
  bankAccountId: '',
  referenceNumber: '',
  description: '',
  appliedInvoices: [],
  notes: '',
})

// Watch for initial data changes
watch(
  () => props.deposit,
  (newDeposit) => {
    if (newDeposit) {
      formData.value = {
        depositDate: newDeposit.depositDate,
        receivedDate: newDeposit.receivedDate,
        customerId: newDeposit.customerId,
        depositType: newDeposit.depositType,
        depositSource: newDeposit.depositSource,
        amount: newDeposit.amount,
        currency: newDeposit.currency,
        bankAccountId: newDeposit.bankAccountId,
        referenceNumber: newDeposit.referenceNumber || '',
        description: newDeposit.description,
        appliedInvoices: newDeposit.appliedInvoices.map((ai) => ({
          invoiceId: ai.invoiceId,
          appliedAmount: ai.appliedAmount,
          discountAmount: ai.discountAmount,
          writeOffAmount: ai.writeOffAmount,
        })),
        notes: newDeposit.notes || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates on mount
onMounted(() => {
  if (!formData.value.depositDate) {
    formData.value.depositDate = new Date()
  }
  if (!formData.value.receivedDate) {
    formData.value.receivedDate = new Date()
  }
})

// Invoice management
const addInvoice = () => {
  formData.value.appliedInvoices.push({
    invoiceId: '',
    appliedAmount: 0,
    discountAmount: 0,
    writeOffAmount: 0,
  })
}

const removeInvoice = (index: number) => {
  formData.value.appliedInvoices.splice(index, 1)
}

// Form submission
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
