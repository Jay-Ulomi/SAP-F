<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ expense ? 'Edit Expense Report' : 'New Expense Report' }}
      </h2>
      <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 class="font-medium text-gray-900">Report Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Title *</label>
            <input
              type="text"
              v-model="form.title"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Business Trip to New York"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
            <select
              v-model="form.currency"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Brief description of the expense report"
          ></textarea>
        </div>
      </div>

      <!-- Expense Items -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-medium text-gray-900">Expense Items</h3>
          <button
            type="button"
            @click="addExpenseItem"
            class="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
          >
            Add Item
          </button>
        </div>

        <div v-if="form.items.length === 0" class="text-center py-8 text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No expense items added yet. Click "Add Item" to get started.</p>
        </div>

        <div v-for="(item, index) in form.items" :key="index" class="border border-gray-200 rounded-lg p-4 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900">Item {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeExpenseItem(index)"
              class="text-red-600 hover:text-red-800"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                v-model="item.date"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                v-model="item.category"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="travel">Travel</option>
                <option value="accommodation">Accommodation</option>
                <option value="meals">Meals</option>
                <option value="transportation">Transportation</option>
                <option value="office_supplies">Office Supplies</option>
                <option value="training">Training</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
              <input
                type="number"
                v-model.number="item.amount"
                step="0.01"
                min="0"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <input
                type="text"
                v-model="item.description"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Description of the expense"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                v-model="item.paymentMethod"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="company_card">Company Card</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
              <input
                type="text"
                v-model="item.vendorName"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Vendor or merchant name"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Number</label>
              <input
                type="text"
                v-model="item.receiptNumber"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Receipt or invoice number"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              v-model="item.notes"
              rows="2"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Additional notes for this expense"
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="item.isPersonal"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">
              This is a personal expense (will be deducted from reimbursement)
            </label>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="form.items.length > 0" class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-medium text-gray-900 mb-2">Summary</h3>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Total Amount:</span>
          <span class="text-xl font-semibold text-gray-900">
            {{ form.currency }} {{ totalAmount.toLocaleString() }}
          </span>
        </div>
        <div v-if="personalAmount > 0" class="flex justify-between items-center text-sm">
          <span class="text-gray-500">Personal Expenses:</span>
          <span class="text-red-600">-{{ form.currency }} {{ personalAmount.toLocaleString() }}</span>
        </div>
        <div v-if="personalAmount > 0" class="flex justify-between items-center font-medium pt-2 border-t border-gray-300 mt-2">
          <span class="text-gray-700">Reimbursable Amount:</span>
          <span class="text-green-600">{{ form.currency }} {{ reimbursableAmount.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading || form.items.length === 0"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : expense ? 'Update Report' : 'Create Report' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ExpenseReport, ExpenseReportFormData, ExpenseItem } from '../types'
import { ExpenseType, PaymentMethod } from '../types'

interface Props {
  expense?: ExpenseReport
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: ExpenseReportFormData]
  cancel: []
}>()

const form = ref<ExpenseReportFormData>({
  title: '',
  description: '',
  currency: 'USD',
  items: []
})

const totalAmount = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.amount || 0), 0)
})

const personalAmount = computed(() => {
  return form.value.items
    .filter(item => item.isPersonal)
    .reduce((sum, item) => sum + (item.amount || 0), 0)
})

const reimbursableAmount = computed(() => {
  return totalAmount.value - personalAmount.value
})

function addExpenseItem() {
  form.value.items.push({
    date: new Date().toISOString().split('T')[0],
    category: ExpenseType.OTHER,
    description: '',
    amount: 0,
    currency: form.value.currency,
    paymentMethod: PaymentMethod.CASH,
    vendorName: '',
    receiptNumber: '',
    notes: '',
    isPersonal: false
  })
}

function removeExpenseItem(index: number) {
  form.value.items.splice(index, 1)
}

function handleSubmit() {
  emit('submit', form.value)
}

onMounted(() => {
  if (props.expense) {
    form.value = {
      title: props.expense.title,
      description: props.expense.description || '',
      currency: props.expense.currency,
      items: props.expense.items.map(item => ({
        date: item.date,
        category: item.category,
        description: item.description,
        amount: item.amount,
        currency: item.currency,
        paymentMethod: item.paymentMethod,
        vendorName: item.vendorName || '',
        receiptNumber: item.receiptNumber || '',
        notes: item.notes || '',
        isPersonal: item.isPersonal
      }))
    }
  }
})
</script>