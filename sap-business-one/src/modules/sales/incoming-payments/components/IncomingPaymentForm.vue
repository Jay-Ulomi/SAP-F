<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Payment Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
        <div class="relative">
          <input
            v-model="formData.customerCode"
            @input="handleCustomerSearch"
            @focus="showCustomerDropdown = true"
            @blur="setTimeout(() => (showCustomerDropdown = false), 200)"
            type="text"
            placeholder="Search customer..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
            required
          />
          <div
            v-if="showCustomerDropdown && filteredCustomers.length > 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
          >
            <div
              v-for="customer in filteredCustomers"
              :key="customer.code"
              @click="selectCustomer(customer)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
            >
              <div class="font-medium text-gray-900">{{ customer.code }}</div>
              <div class="text-xs text-gray-500">{{ customer.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
        <input
          v-model="formData.paymentDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Posting Date *</label>
        <input
          v-model="formData.postingDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
        <select
          v-model="formData.method"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          required
        >
          <option value="">Select Method</option>
          <option v-for="method in paymentMethods" :key="method" :value="method">
            {{ formatPaymentMethod(method) }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Type *</label>
        <select
          v-model="formData.type"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          required
        >
          <option value="">Select Type</option>
          <option v-for="type in paymentTypes" :key="type" :value="type">
            {{ formatPaymentType(type) }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
        <select
          v-model="formData.currency"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          required
        >
          <option value="">Select Currency</option>
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
        <input
          v-model.number="formData.exchangeRate"
          type="number"
          step="0.0001"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Reference</label>
        <input
          v-model="formData.reference"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Project</label>
        <input
          v-model="formData.project"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Sales Person</label>
        <input
          v-model="formData.salesPerson"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        />
      </div>
    </div>

    <!-- Payment Details -->
    <div class="border-t pt-4">
      <h4 class="text-md font-medium text-gray-900 mb-3">Payment Details</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-if="formData.method === 'CHECK'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Check Number</label>
          <input
            v-model="formData.checkNumber"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['BANK_TRANSFER', 'WIRE_TRANSFER', 'ACH'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
          <input
            v-model="formData.bankAccount"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['BANK_TRANSFER', 'WIRE_TRANSFER', 'ACH'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Bank Code</label>
          <input
            v-model="formData.bankCode"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['CREDIT_CARD', 'DEBIT_CARD'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
          <input
            v-model="formData.transactionId"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['CREDIT_CARD', 'DEBIT_CARD'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Authorization Code</label>
          <input
            v-model="formData.authorizationCode"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['CREDIT_CARD', 'DEBIT_CARD'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
          <input
            v-model="formData.cardType"
            type="text"
            placeholder="e.g., Visa, MasterCard"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div v-if="['CREDIT_CARD', 'DEBIT_CARD'].includes(formData.method)">
          <label class="block text-sm font-medium text-gray-700 mb-1">Last 4 Digits</label>
          <input
            v-model="formData.cardLastFour"
            type="text"
            maxlength="4"
            placeholder="1234"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-lg font-medium text-gray-900">Payment Line Items</h4>
        <button
          type="button"
          @click="addLineItem"
          class="px-3 py-1.5 bg-sap-blue text-white text-sm rounded-lg hover:bg-sap-blue-dark transition-colors duration-200"
        >
          Add Item
        </button>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Item" to add invoices or documents to this payment.
      </div>

      <div v-if="formData.lineItems.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Amount
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open Amount
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Amount
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-3 py-2">
                <div class="relative">
                  <input
                    v-model="item.invoiceId"
                    @input="handleInvoiceSearch(index)"
                    @focus="showInvoiceDropdowns[index] = true"
                    @blur="setTimeout(() => (showInvoiceDropdowns[index] = false), 200)"
                    type="text"
                    placeholder="Search invoice..."
                    class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    required
                  />
                  <div
                    v-if="showInvoiceDropdowns[index] && filteredInvoices[index]?.length > 0"
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                  >
                    <div
                      v-for="invoice in filteredInvoices[index]"
                      :key="invoice.id"
                      @click="selectInvoice(index, invoice)"
                      class="px-2 py-1.5 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                    >
                      <div class="font-medium text-gray-900">{{ invoice.docNum }}</div>
                      <div class="text-xs text-gray-500">{{ invoice.customerName }}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.invoiceDate"
                  type="date"
                  class="block w-32 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.dueDate"
                  type="date"
                  class="block w-32 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.originalAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.openAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.paymentAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.discountAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.remarks"
                  type="text"
                  placeholder="Remarks"
                  class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800 text-sm"
                  :disabled="formData.lineItems.length === 1"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals Summary -->
    <div v-if="formData.lineItems.length > 0" class="mt-6 border-t pt-4">
      <div class="flex justify-end">
        <div class="w-64 space-y-2">
          <div class="flex justify-between text-sm">
            <span>Total Payment:</span>
            <span class="font-medium">{{ formatCurrency(totalPayment) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Total Discount:</span>
            <span class="font-medium">{{ formatCurrency(totalDiscount) }}</span>
          </div>
          <div class="flex justify-between text-base font-bold border-t pt-2">
            <span>Net Amount:</span>
            <span>{{ formatCurrency(netAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Remarks -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
      <textarea
        v-model="formData.remarks"
        rows="3"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        placeholder="Additional notes or comments..."
      ></textarea>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useIncomingPaymentsStore } from '../stores/incomingPaymentsStore'
import type { IncomingPaymentFormData, IncomingPayment, Customer, PaymentLineItem } from '../types'
import { PaymentStatus, PaymentMethod, PaymentType, Currency } from '../types'

interface Props {
  initialData?: IncomingPayment
  isEditing?: boolean
}

interface Emits {
  (e: 'saved', data: IncomingPayment): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

const store = useIncomingPaymentsStore()

// Form data
const formData = ref<IncomingPaymentFormData>({
  customerCode: '',
  paymentDate: '',
  postingDate: '',
  method: PaymentMethod.CASH,
  type: PaymentType.CUSTOMER_PAYMENT,
  currency: Currency.USD,
  exchangeRate: 1,
  reference: '',
  remarks: '',
  project: '',
  salesPerson: '',
  checkNumber: '',
  bankAccount: '',
  bankCode: '',
  transactionId: '',
  authorizationCode: '',
  cardType: '',
  cardLastFour: '',
  lineItems: [] as Omit<PaymentLineItem, 'id' | 'lineTotal'>[],
})

// UI state
const loading = ref(false)
const showCustomerDropdown = ref(false)
const showInvoiceDropdowns = ref<boolean[]>([])
const filteredCustomers = ref<Customer[]>([])
const filteredInvoices = ref<Array<Array<{ id: string; docNum: string; customerName: string; openAmount: number }>>>([])

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.paymentDate &&
    formData.value.postingDate &&
    formData.value.method &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every((item) => item.invoiceId && item.paymentAmount > 0)
  )
})

const totalPayment = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + item.paymentAmount, 0)
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + item.discountAmount, 0)
})

const netAmount = computed(() => totalPayment.value - totalDiscount.value)

// Constants
const paymentMethods = Object.values(PaymentMethod)
const paymentTypes = Object.values(PaymentType)
const currencies = Object.values(Currency)

// Methods
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      customerCode: props.initialData.customerCode,
      paymentDate: props.initialData.paymentDate,
      postingDate: props.initialData.postingDate,
      method: props.initialData.method,
      type: props.initialData.type,
      currency: props.initialData.currency,
      exchangeRate: props.initialData.exchangeRate,
      reference: props.initialData.reference || '',
      remarks: props.initialData.remarks || '',
      project: props.initialData.project || '',
      salesPerson: props.initialData.salesPerson || '',
      checkNumber: props.initialData.checkNumber || '',
      bankAccount: props.initialData.bankAccount || '',
      bankCode: props.initialData.bankCode || '',
      transactionId: props.initialData.transactionId || '',
      authorizationCode: props.initialData.authorizationCode || '',
      cardType: props.initialData.cardType || '',
      cardLastFour: props.initialData.cardLastFour || '',
      lineItems: props.initialData.lineItems.map((item) => ({
        invoiceId: item.invoiceId,
        invoiceNumber: item.invoiceNumber,
        invoiceDate: item.invoiceDate,
        dueDate: item.dueDate,
        originalAmount: item.originalAmount,
        openAmount: item.openAmount,
        paymentAmount: item.paymentAmount,
        discountAmount: item.discountAmount,
        taxAmount: item.taxAmount,
        remarks: item.remarks || '',
      })),
    }
  } else {
    // Set default dates
    const today = new Date().toISOString().split('T')[0]
    formData.value.paymentDate = today
    formData.value.postingDate = today
  }
}

const addLineItem = () => {
  formData.value.lineItems.push({
    invoiceId: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    originalAmount: 0,
    openAmount: 0,
    paymentAmount: 0,
    discountAmount: 0,
    taxAmount: 0,
    remarks: '',
  })
  showInvoiceDropdowns.value.push(false)
  filteredInvoices.value.push([])
}

const removeLineItem = (index: number) => {
  if (formData.value.lineItems.length > 1) {
    formData.value.lineItems.splice(index, 1)
    showInvoiceDropdowns.value.splice(index, 1)
    filteredInvoices.value.splice(index, 1)
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.paymentAmount && item.discountAmount) {
    // Ensure payment amount doesn't exceed open amount
    if (item.paymentAmount > item.openAmount) {
      item.paymentAmount = item.openAmount
    }
  }
}

const handleCustomerSearch = async () => {
  if (formData.value.customerCode.length >= 2) {
    await store.fetchCustomers(formData.value.customerCode)
    filteredCustomers.value = store.customers
  } else {
    filteredCustomers.value = []
  }
}

const selectCustomer = (customer: Customer) => {
  formData.value.customerCode = customer.code
  filteredCustomers.value = []
}

const handleInvoiceSearch = async (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.invoiceId.length >= 2) {
    const invoices = await store.fetchInvoices(item.invoiceId)
    filteredInvoices.value[index] = invoices
  } else {
    filteredInvoices.value[index] = []
  }
}

const selectInvoice = (index: number, invoice: { id: string; docNum: string; customerName: string; openAmount: number }) => {
  formData.value.lineItems[index].invoiceId = invoice.id
  formData.value.lineItems[index].invoiceNumber = invoice.docNum
  formData.value.lineItems[index].openAmount = invoice.openAmount
  formData.value.lineItems[index].paymentAmount = invoice.openAmount
  formData.value.lineItems[index].originalAmount = invoice.openAmount
  filteredInvoices.value[index] = []

  // Set default dates
  const today = new Date().toISOString().split('T')[0]
  formData.value.lineItems[index].invoiceDate = today
  formData.value.lineItems[index].dueDate = today
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    let result
    if (props.isEditing && props.initialData) {
      result = await store.updateIncomingPayment(props.initialData.id, formData.value)
    } else {
      result = await store.createIncomingPayment(formData.value)
    }

    if (result.success) {
      emit('saved', result.data)
    }
  } catch (error) {
    console.error('Error saving payment:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatPaymentMethod = (method: PaymentMethod) => {
  return method.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPaymentType = (type: PaymentType) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Lifecycle
onMounted(async () => {
  initializeForm()
})

// Watch for changes
watch(
  () => formData.value.lineItems.length,
  (newLength) => {
    // Ensure showInvoiceDropdowns and filteredInvoices arrays match lineItems length
    while (showInvoiceDropdowns.value.length < newLength) {
      showInvoiceDropdowns.value.push(false)
    }
    while (filteredInvoices.value.length < newLength) {
      filteredInvoices.value.push([])
    }
  },
)
</script>
