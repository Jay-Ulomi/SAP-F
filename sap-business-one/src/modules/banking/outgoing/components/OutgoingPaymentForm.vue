<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Payment Date *</label>
        <input
          v-model="formData.paymentDate"
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
        <label class="block text-sm font-medium text-gray-700">Payment Type *</label>
        <select
          v-model="formData.paymentType"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Payment Type</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CHECK">Check</option>
          <option value="CASH">Cash</option>
          <option value="WIRE_TRANSFER">Wire Transfer</option>
          <option value="ACH">ACH</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="PAYPAL">PayPal</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Payment Purpose *</label>
        <select
          v-model="formData.paymentPurpose"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Purpose</option>
          <option value="VENDOR_PAYMENT">Vendor Payment</option>
          <option value="SUPPLIER_PAYMENT">Supplier Payment</option>
          <option value="EXPENSE_REIMBURSEMENT">Expense Reimbursement</option>
          <option value="LOAN_PAYMENT">Loan Payment</option>
          <option value="TAX_PAYMENT">Tax Payment</option>
          <option value="INSURANCE_PAYMENT">Insurance Payment</option>
          <option value="UTILITY_PAYMENT">Utility Payment</option>
          <option value="RENT_PAYMENT">Rent Payment</option>
          <option value="SALARY_PAYMENT">Salary Payment</option>
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
        placeholder="Enter payment description"
      />
    </div>

    <div>
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900">Applied Purchase Orders</h4>
        <button
          type="button"
          @click="addPurchaseOrder"
          class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add PO
        </button>
      </div>

      <div
        v-if="formData.appliedPurchaseOrders.length === 0"
        class="text-center py-4 text-gray-500"
      >
        <p class="text-sm">No purchase orders applied</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(po, index) in formData.appliedPurchaseOrders"
          :key="index"
          class="bg-gray-50 rounded-lg p-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">PO ID</label>
              <input
                v-model="po.poId"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="PO-2024-001"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Applied Amount</label>
              <input
                v-model.number="po.appliedAmount"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Discount</label>
              <input
                v-model.number="po.discountAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex items-end">
              <button
                type="button"
                @click="removePurchaseOrder(index)"
                class="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
        <span v-else>{{ payment ? 'Update Payment' : 'Create Payment' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {
  OutgoingPayment,
  OutgoingPaymentFormData,
  AppliedPurchaseOrderFormData,
} from '../types'

interface Props {
  payment?: OutgoingPayment | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: OutgoingPaymentFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  payment: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const formData = ref<OutgoingPaymentFormData>({
  paymentDate: new Date(),
  dueDate: new Date(),
  vendorId: '',
  paymentType: 'BANK_TRANSFER' as any,
  paymentPurpose: 'VENDOR_PAYMENT' as any,
  amount: 0,
  currency: 'USD',
  bankAccountId: '',
  referenceNumber: '',
  description: '',
  appliedPurchaseOrders: [],
  notes: '',
})

const addPurchaseOrder = () => {
  const newPO: AppliedPurchaseOrderFormData = {
    poId: '',
    appliedAmount: 0,
    discountAmount: 0,
    writeOffAmount: 0,
  }
  formData.value.appliedPurchaseOrders.push(newPO)
}

const removePurchaseOrder = (index: number) => {
  formData.value.appliedPurchaseOrders.splice(index, 1)
}

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.payment) {
    formData.value = {
      paymentDate: new Date(props.payment.paymentDate),
      dueDate: new Date(props.payment.dueDate),
      vendorId: props.payment.vendorId,
      paymentType: props.payment.paymentType,
      paymentPurpose: props.payment.paymentPurpose,
      amount: props.payment.amount,
      currency: props.payment.currency,
      bankAccountId: props.payment.bankAccountId,
      referenceNumber: props.payment.referenceNumber || '',
      description: props.payment.description,
      appliedPurchaseOrders: props.payment.appliedPurchaseOrders.map((apo) => ({
        poId: apo.poId,
        appliedAmount: apo.appliedAmount,
        discountAmount: apo.discountAmount,
        writeOffAmount: apo.writeOffAmount,
      })),
      notes: props.payment.notes || '',
    }
  }
})
</script>
