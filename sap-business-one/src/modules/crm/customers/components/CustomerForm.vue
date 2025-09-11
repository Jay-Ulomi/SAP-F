<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-sap-blue text-sap-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Basic Information Tab -->
    <div v-if="activeTab === 'basic'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Code *</label>
          <input
            v-model="formData.customerCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer code"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            v-model="formData.companyName"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select customer type</option>
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
            <option value="SME">SME</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="PARTNER">Partner</option>
            <option value="DISTRIBUTOR">Distributor</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PROSPECT">Prospect</option>
            <option value="LEAD">Lead</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
          <select
            v-model="formData.industry"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select industry</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="HEALTHCARE">Healthcare</option>
            <option value="FINANCE">Finance</option>
            <option value="MANUFACTURING">Manufacturing</option>
            <option value="RETAIL">Retail</option>
            <option value="EDUCATION">Education</option>
            <option value="CONSTRUCTION">Construction</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="ENERGY">Energy</option>
            <option value="TELECOMMUNICATIONS">Telecommunications</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Source *</label>
          <select
            v-model="formData.source"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select source</option>
            <option value="WEBSITE">Website</option>
            <option value="REFERRAL">Referral</option>
            <option value="COLD_CALL">Cold Call</option>
            <option value="TRADE_SHOW">Trade Show</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="ADVERTISING">Advertising</option>
            <option value="PARTNER">Partner</option>
            <option value="EXISTING_CUSTOMER">Existing Customer</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
          <select
            v-model="formData.priority"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To *</label>
          <input
            v-model="formData.assignedTo"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter assigned team/member"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
          <input
            v-model.number="formData.leadScore"
            type="number"
            min="0"
            max="100"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="0-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            v-model="formData.website"
            type="url"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="https://example.com"
          />
        </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer description"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter additional notes"
          />
        </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sap-blue text-white"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-sap-blue bg-white hover:bg-gray-100"
              >
                ×
              </button>
            </span>
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              type="text"
              class="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Add tag and press Enter"
            />
          </div>
        </div>
      </div>


    <!-- Primary Contact Tab -->
    <div v-if="activeTab === 'contact'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            v-model="formData.primaryContact.firstName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            v-model="formData.primaryContact.lastName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            v-model="formData.primaryContact.email"
            type="email"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            v-model="formData.primaryContact.phone"
            type="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            v-model="formData.primaryContact.mobile"
            type="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter mobile number"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            v-model="formData.primaryContact.position"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter job position"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            v-model="formData.primaryContact.department"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter department"
          />
        </div>
      </div>
    </div>

    <!-- Addresses Tab -->
    <div v-if="activeTab === 'addresses'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(address, index) in formData.addresses"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Address {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeAddress(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address Type *</label>
              <select
                v-model="address.type"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select address type</option>
                <option value="BILLING">Billing</option>
                <option value="SHIPPING">Shipping</option>
                <option value="BOTH">Both</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Street *</label>
              <input
                v-model="address.street"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter street address"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                v-model="address.city"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                v-model="address.state"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter state/province"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
              <input
                v-model="address.postalCode"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter postal code"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input
                v-model="address.country"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter country"
              />
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input
                  v-model="address.isDefault"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Set as default address</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addAddress"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Address
        </button>
      </div>
    </div>

    <!-- Financial Information Tab -->
    <div v-if="activeTab === 'financial'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Credit Limit</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              v-model.number="formData.financial.creditLimit"
              type="number"
              min="0"
              step="0.01"
              class="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Payment Terms *</label>
          <input
            v-model="formData.financial.paymentTerms"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="e.g., Net 30"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
          <select
            v-model="formData.financial.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select currency</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CHF">CHF (CHF)</option>
            <option value="CNY">CNY (¥)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
          <div class="relative">
            <input
              v-model.number="formData.financial.discountPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="block w-full pr-8 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Credit Rating *</label>
          <select
            v-model="formData.financial.creditRating"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select credit rating</option>
            <option value="A">A (Excellent)</option>
            <option value="B">B (Good)</option>
            <option value="C">C (Fair)</option>
            <option value="D">D (Poor)</option>
            <option value="E">E (Very Poor)</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="flex items-center">
            <input
              v-model="formData.financial.taxExemption"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Tax Exempt</span>
          </label>
        </div>

        <div v-if="formData.financial.taxExemption" class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tax Exemption Number</label>
          <input
            v-model="formData.financial.taxExemptionNumber"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter tax exemption number"
          />
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
        <span v-if="loading">Saving...</span>
        <span v-else>{{ customer ? 'Update Customer' : 'Create Customer' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Customer, CustomerFormData } from '../types'
import { Currency } from '../types'

// Props
interface Props {
  customer?: Customer | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customer: null,
  loading: false
})

// Emits
const emit = defineEmits<{
  submit: [data: CustomerFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contact', name: 'Primary Contact' },
  { id: 'addresses', name: 'Addresses' },
  { id: 'financial', name: 'Financial Information' }
]

const activeTab = ref('basic')

// Form data
const formData = ref<CustomerFormData>({
  customerCode: '',
  name: '',
  companyName: '',
  type: 'CORPORATE',
  status: 'PROSPECT',
  industry: 'TECHNOLOGY',
  source: 'WEBSITE',
  priority: 'MEDIUM',
  primaryContact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    position: '',
    department: ''
  },
  addresses: [
    {
      type: 'BOTH',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: true
    }
  ],
  financial: {
    creditLimit: 0,
    paymentTerms: 'Net 30',
    currency: Currency.USD,
    taxExemption: false,
    taxExemptionNumber: '',
    discountPercentage: 0,
    creditRating: 'B'
  },
  website: '',
  description: '',
  notes: '',
  tags: [],
  assignedTo: '',
  leadScore: 50
})

// Input fields for dynamic content
const newTag = ref('')

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.customerCode.trim() !== '' &&
    formData.value.name.trim() !== '' &&
    formData.value.type &&
    formData.value.status &&
    formData.value.industry &&
    formData.value.source &&
    formData.value.priority &&
    formData.value.primaryContact.firstName.trim() !== '' &&
    formData.value.primaryContact.lastName.trim() !== '' &&
    formData.value.primaryContact.email.trim() !== '' &&
    formData.value.addresses.length > 0 &&
    formData.value.addresses.every(addr =>
      addr.street.trim() !== '' &&
      addr.city.trim() !== '' &&
      addr.postalCode.trim() !== '' &&
      addr.country.trim() !== ''
    ) &&
    formData.value.financial.paymentTerms.trim() !== '' &&
    formData.value.financial.currency &&
    formData.value.financial.creditRating &&
    formData.value.assignedTo.trim() !== ''
  )
})

// Methods
const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const addAddress = () => {
  formData.value.addresses.push({
    type: 'SHIPPING',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  })
}

const removeAddress = (index: number) => {
  if (formData.value.addresses.length > 1) {
    formData.value.addresses.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Initialize form data when customer prop changes
const initializeFormData = () => {
  if (props.customer) {
    formData.value = {
      customerCode: props.customer.customerCode,
      name: props.customer.name,
      companyName: props.customer.companyName || '',
      type: props.customer.type,
      status: props.customer.status,
      industry: props.customer.industry,
      source: props.customer.source,
      priority: props.customer.priority,
      primaryContact: {
        firstName: props.customer.primaryContact.firstName,
        lastName: props.customer.primaryContact.lastName,
        email: props.customer.primaryContact.email,
        phone: props.customer.primaryContact.phone || '',
        mobile: props.customer.primaryContact.mobile || '',
        position: props.customer.primaryContact.position || '',
        department: props.customer.primaryContact.department || ''
      },
      addresses: props.customer.addresses.map(addr => ({
        type: addr.type,
        street: addr.street,
        city: addr.city,
        state: addr.state || '',
        postalCode: addr.postalCode,
        country: addr.country,
        isDefault: addr.isDefault
      })),
      financial: {
        creditLimit: props.customer.financial.creditLimit,
        paymentTerms: props.customer.financial.paymentTerms,
        currency: props.customer.financial.currency,
        taxExemption: props.customer.financial.taxExemption,
        taxExemptionNumber: props.customer.financial.taxExemptionNumber || '',
        discountPercentage: props.customer.financial.discountPercentage,
        creditRating: props.customer.financial.creditRating
      },
      website: props.customer.website || '',
      description: props.customer.description || '',
      notes: props.customer.notes || '',
      tags: [...props.customer.tags],
      assignedTo: props.customer.assignedTo,
      leadScore: props.customer.leadScore
    }
  }
}

// Watch for customer prop changes
watch(() => props.customer, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
