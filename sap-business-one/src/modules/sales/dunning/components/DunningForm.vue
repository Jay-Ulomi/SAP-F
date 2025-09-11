<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Dunning Letter Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Customer Selection -->
        <div class="col-span-full">
          <label class="block text-sm font-medium text-gray-700 mb-2"> Customer * </label>
          <div class="relative">
            <input
              v-model="customerSearch"
              @input="searchCustomers"
              @focus="showCustomerDropdown = true"
              @blur="setTimeout(() => (showCustomerDropdown = false), 200)"
              type="text"
              placeholder="Search customers..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              v-if="showCustomerDropdown && filteredCustomers.length > 0"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              <div
                v-for="customer in filteredCustomers"
                :key="customer.code"
                @click="selectCustomer(customer)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div class="font-medium text-gray-900">{{ customer.name }}</div>
                <div class="text-sm text-gray-500">{{ customer.code }}</div>
              </div>
            </div>
          </div>
          <div
            v-if="selectedCustomer"
            class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-blue-900">{{ selectedCustomer.name }}</div>
                <div class="text-sm text-blue-700">{{ selectedCustomer.code }}</div>
              </div>
              <button
                @click="clearCustomer"
                type="button"
                class="text-blue-600 hover:text-blue-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Dunning Level -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Dunning Level * </label>
          <select
            v-model="formData.level"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="level in Object.values(DunningLevel)" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>

        <!-- Dunning Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Dunning Type * </label>
          <select
            v-model="formData.type"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="type in Object.values(DunningType)" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <!-- Currency -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Currency * </label>
          <select
            v-model="formData.currency"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="currency in Object.values(Currency)" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <!-- Exchange Rate -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Exchange Rate </label>
          <input
            v-model.number="formData.exchangeRate"
            type="number"
            step="0.0001"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Dunning Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Dunning Date * </label>
          <input
            v-model="formData.dunningDate"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Posting Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Posting Date * </label>
          <input
            v-model="formData.postingDate"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Reference -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Reference </label>
          <input
            v-model="formData.reference"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Remarks -->
        <div class="col-span-full">
          <label class="block text-sm font-medium text-gray-700 mb-2"> Remarks </label>
          <textarea
            v-model="formData.remarks"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Line Items Section -->
    <div class="border-t border-gray-200 pt-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900">Overdue Invoices</h4>
        <button
          @click="addLineItem"
          type="button"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Invoice
        </button>
      </div>

      <!-- Line Items Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Due Date
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Original Amount
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Outstanding Amount
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Days Overdue
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dunning Fee
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.lineItems" :key="index" class="hover:bg-gray-50">
              <!-- Invoice Selection -->
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="relative">
                  <input
                    v-model="item.invoiceNumber"
                    @input="searchInvoices(index)"
                    @focus="showInvoiceDropdowns[index] = true"
                    @blur="setTimeout(() => (showInvoiceDropdowns[index] = false), 200)"
                    type="text"
                    placeholder="Search invoices..."
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div
                    v-if="showInvoiceDropdowns[index] && filteredInvoices[index]?.length > 0"
                    class="absolute z-20 w-80 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    <div
                      v-for="invoice in filteredInvoices[index]"
                      :key="invoice.id"
                      @click="selectInvoice(index, invoice)"
                      class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div class="font-medium text-gray-900">{{ invoice.invoiceNumber }}</div>
                      <div class="text-sm text-gray-500">
                        Due: {{ formatDate(invoice.dueDate) }} | Amount:
                        {{ formatCurrency(invoice.totalAmount) }}
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Due Date -->
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(item.dueDate) }}
              </td>

              <!-- Original Amount -->
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.originalAmount) }}
              </td>

              <!-- Outstanding Amount -->
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.outstandingAmount) }}
              </td>

              <!-- Days Overdue -->
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.daysOverdue }}
              </td>

              <!-- Dunning Fee -->
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.dunningFee) }}
              </td>

              <!-- Actions -->
              <td class="px-3 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="removeLineItem(index)"
                  type="button"
                  class="text-red-600 hover:text-red-900"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="formData.lineItems.length === 0" class="text-center py-8">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No invoices added</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by adding overdue invoices to this dunning letter.
        </p>
      </div>
    </div>

    <!-- Totals Section -->
    <div v-if="formData.lineItems.length > 0" class="border-t border-gray-200 pt-6">
      <div class="flex justify-end">
        <div class="w-64 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Outstanding:</span>
            <span class="font-medium">{{ formatCurrency(totalOutstanding) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Dunning Fees:</span>
            <span class="font-medium">{{ formatCurrency(totalDunningFees) }}</span>
          </div>
          <div class="border-t border-gray-200 pt-2">
            <div class="flex justify-between text-base font-semibold">
              <span>Total Amount:</span>
              <span>{{ formatCurrency(totalAmount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        @click="$emit('cancel')"
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isValid"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="inline-flex items-center">
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
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>{{ isEditing ? 'Update Dunning Letter' : 'Create Dunning Letter' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { DunningLevel, DunningType, Currency } from '../types'
import type { DunningFormData, DunningLineItem, Customer } from '../types'

interface Props {
  initialData?: DunningFormData
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: DunningFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<DunningFormData>({
  customerCode: '',
  dunningDate: '',
  postingDate: '',
  level: DunningLevel.LEVEL_1,
  type: DunningType.OVERDUE_INVOICE,
  currency: Currency.USD,
  exchangeRate: 1,
  reference: '',
  remarks: '',
  lineItems: [],
})

// Customer search
const customerSearch = ref('')
const selectedCustomer = ref<Customer | null>(null)
const filteredCustomers = ref<Customer[]>([])
const showCustomerDropdown = ref(false)

// Invoice search
interface MockInvoice {
  id: string
  invoiceNumber: string
  dueDate: string
  totalAmount: number
  outstandingAmount: number
  daysOverdue: number
}

const filteredInvoices = ref<MockInvoice[][]>([])
const showInvoiceDropdowns = ref<boolean[]>([])

// Computed properties
const isEditing = computed(() => !!props.initialData)
const totalOutstanding = computed(() =>
  formData.value.lineItems.reduce((sum, item) => sum + (item.openAmount || 0), 0),
)
const totalDunningFees = computed(() =>
  formData.value.lineItems.reduce((sum, item) => sum + (item.dunningFee || 0), 0),
)
const totalAmount = computed(() => totalOutstanding.value + totalDunningFees.value)

const isValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.dunningDate &&
    formData.value.postingDate &&
    formData.value.lineItems.length > 0
  )
})

// Methods
const searchCustomers = async () => {
  if (customerSearch.value.length < 2) {
    filteredCustomers.value = []
    return
  }

  try {
    // TODO: Implement actual API call
    const mockCustomers: Customer[] = [
      {
        code: 'CUST001',
        name: 'Acme Corporation',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      },
      {
        code: 'CUST002',
        name: 'Tech Solutions Inc',
        address: {
          street: '456 Tech Ave',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA',
        },
      },
    ]
    filteredCustomers.value = mockCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(customerSearch.value.toLowerCase()) ||
        c.code.toLowerCase().includes(customerSearch.value.toLowerCase()),
    )
  } catch (error) {
    console.error('Error searching customers:', error)
    filteredCustomers.value = []
  }
}

const selectCustomer = (customer: Customer) => {
  selectedCustomer.value = customer
  formData.value.customerCode = customer.code
  customerSearch.value = customer.name
  showCustomerDropdown.value = false
  filteredCustomers.value = []
}

const clearCustomer = () => {
  selectedCustomer.value = null
  formData.value.customerCode = ''
  customerSearch.value = ''
}

const searchInvoices = async (index: number) => {
  const searchTerm = formData.value.lineItems[index]?.invoiceNumber || ''
  if (searchTerm.length < 2) {
    filteredInvoices.value[index] = []
    return
  }

  try {
    // TODO: Implement actual API call
    const mockInvoices: Invoice[] = [
      {
        id: 'INV001',
        invoiceNumber: 'INV-2024-001',
        dueDate: '2024-01-15',
        totalAmount: 1500,
        outstandingAmount: 1500,
        daysOverdue: 30,
      },
      {
        id: 'INV002',
        invoiceNumber: 'INV-2024-002',
        dueDate: '2024-01-20',
        totalAmount: 2500,
        outstandingAmount: 2500,
        daysOverdue: 25,
      },
    ]
    filteredInvoices.value[index] = mockInvoices.filter((inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  } catch (error) {
    console.error('Error searching invoices:', error)
    filteredInvoices.value[index] = []
  }
}

const selectInvoice = (index: number, invoice: Invoice) => {
  const item = formData.value.lineItems[index]
  if (item) {
    item.invoiceNumber = invoice.invoiceNumber
    item.dueDate = invoice.dueDate
    item.originalAmount = invoice.totalAmount
    item.outstandingAmount = invoice.outstandingAmount
    item.daysOverdue = invoice.daysOverdue
    item.dunningFee = calculateDunningFee(invoice.outstandingAmount, invoice.daysOverdue)
  }
  showInvoiceDropdowns.value[index] = false
  filteredInvoices.value[index] = []
}

const calculateDunningFee = (amount: number, daysOverdue: number): number => {
  // Simple dunning fee calculation: 5% for first level, 10% for second, 15% for third
  const level = formData.value.level
  const feePercentage =
    level === DunningLevel.FIRST ? 0.05 : level === DunningLevel.SECOND ? 0.1 : 0.15
  return amount * feePercentage
}

const addLineItem = () => {
  const newItem: Omit<DunningLineItem, 'id' | 'lineTotal'> = {
    invoiceNumber: '',
    dueDate: '',
    originalAmount: 0,
    outstandingAmount: 0,
    daysOverdue: 0,
    dunningFee: 0,
  }
  formData.value.lineItems.push(newItem)
  filteredInvoices.value.push([])
  showInvoiceDropdowns.value.push(false)
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
  filteredInvoices.value.splice(index, 1)
  showInvoiceDropdowns.value.splice(index, 1)
}

const handleSubmit = () => {
  if (!isValid.value) return

  // Calculate line totals
  const lineItemsWithTotals = formData.value.lineItems.map((item) => ({
    ...item,
    id: `temp-${Date.now()}-${Math.random()}`,
    lineTotal: (item.outstandingAmount || 0) + (item.dunningFee || 0),
  }))

  const submitData: DunningFormData = {
    ...formData.value,
    lineItems: lineItemsWithTotals,
  }

  emit('submit', submitData)
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount || 0)
}

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData }
      if (newData.customerCode) {
        // TODO: Fetch customer details
        selectedCustomer.value = {
          code: newData.customerCode,
          name: 'Customer Name', // TODO: Get from API
          address: { street: '', city: '', state: '', zipCode: '', country: '' },
        }
        customerSearch.value = selectedCustomer.value.name
      }
    }
  },
  { immediate: true },
)

// Initialize form
onMounted(() => {
  if (!props.initialData) {
    // Set default dates
    const today = new Date()
    formData.value.dunningDate = today.toISOString().split('T')[0]

    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + 30)
    formData.value.dueDate = dueDate.toISOString().split('T')[0]
  }
})
</script>
