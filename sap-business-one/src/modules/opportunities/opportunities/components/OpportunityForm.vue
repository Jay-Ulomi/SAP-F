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
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Opportunity Code *</label>
          <input
            v-model="formData.opportunityCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter opportunity code"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter opportunity title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select status</option>
            <option value="LEAD">Lead</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="CLOSED_WON">Closed Won</option>
            <option value="CLOSED_LOST">Closed Lost</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
          <select
            v-model="formData.stage"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select stage</option>
            <option value="DISCOVERY">Discovery</option>
            <option value="QUALIFICATION">Qualification</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="CLOSING">Closing</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select type</option>
            <option value="NEW_BUSINESS">New Business</option>
            <option value="EXISTING_BUSINESS">Existing Business</option>
            <option value="UPSELL">Upsell</option>
            <option value="CROSS_SELL">Cross Sell</option>
            <option value="RENEWAL">Renewal</option>
            <option value="PARTNERSHIP">Partnership</option>
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
            <option value="EMAIL_CAMPAIGN">Email Campaign</option>
            <option value="PARTNER">Partner</option>
            <option value="EXISTING_CUSTOMER">Existing Customer</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer ID *</label>
          <input
            v-model="formData.customerId"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer ID"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
          <input
            v-model="formData.customerName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Type *</label>
          <select
            v-model="formData.customerType"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select customer type</option>
            <option value="EXISTING">Existing</option>
            <option value="PROSPECT">Prospect</option>
            <option value="PARTNER">Partner</option>
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
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter opportunity description"
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

      <div class="md:col-span-2">
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

    <!-- Contacts Tab -->
    <div v-if="activeTab === 'contacts'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(contact, index) in formData.contacts"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Contact {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeContact(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact ID *</label>
              <input
                v-model="contact.contactId"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact ID"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input
                v-model="contact.contactName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input
                v-model="contact.contactEmail"
                type="email"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact email"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                v-model="contact.contactPhone"
                type="tel"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact phone"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                v-model="contact.role"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select role</option>
                <option value="DECISION_MAKER">Decision Maker</option>
                <option value="INFLUENCER">Influencer</option>
                <option value="END_USER">End User</option>
                <option value="TECHNICAL_EVALUATOR">Technical Evaluator</option>
                <option value="ECONOMIC_BUYER">Economic Buyer</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Influence *</label>
              <select
                v-model="contact.influence"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select influence</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                v-model="contact.notes"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact notes"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addContact"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Contact
        </button>
      </div>
    </div>

    <!-- Products Tab -->
    <div v-if="activeTab === 'products'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(product, index) in formData.products"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Product {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeProduct(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
              <input
                v-model="product.productId"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter product ID"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                v-model="product.productName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Code *</label>
              <input
                v-model="product.productCode"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter product code"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                v-model.number="product.quantity"
                type="number"
                min="1"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Unit Price *</label>
              <input
                v-model.number="product.unitPrice"
                type="number"
                min="0"
                step="0.01"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter unit price"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                v-model.number="product.discount"
                type="number"
                min="0"
                max="100"
                step="0.01"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter discount percentage"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                v-model="product.notes"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter product notes"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addProduct"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Product
        </button>
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
        <span v-else>{{ opportunity ? 'Update Opportunity' : 'Create Opportunity' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Opportunity, OpportunityFormData } from '../types'
import {
  OpportunityStatus,
  OpportunityType,
  OpportunityStage,
  OpportunityPriority,
  OpportunitySource,
  Currency,
} from '../types'

// Props
interface Props {
  opportunity?: Opportunity | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  opportunity: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  submit: [data: OpportunityFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contacts', name: 'Contacts' },
  { id: 'products', name: 'Products' },
]

const activeTab = ref('basic')

// Form data
const formData = ref<OpportunityFormData>({
  opportunityCode: '',
  title: '',
  description: '',
  status: OpportunityStatus.LEAD,
  type: OpportunityType.NEW_BUSINESS,
  stage: OpportunityStage.DISCOVERY,
  priority: OpportunityPriority.MEDIUM,
  source: OpportunitySource.WEBSITE,
  customerId: '',
  customerName: '',
  customerType: 'PROSPECT',
  assignedTo: '',
  contacts: [
    {
      id: 'temp-1',
      contactId: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      role: 'DECISION_MAKER',
      influence: 'HIGH',
    },
  ],
  products: [
    {
      id: 'temp-1',
      productId: '',
      productName: '',
      productCode: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      totalPrice: 0,
      currency: Currency.USD,
    },
  ],
  tags: [],
  notes: '',
})

// Input fields for dynamic content
const newTag = ref('')

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.opportunityCode.trim() !== '' &&
    formData.value.title.trim() !== '' &&
    formData.value.status &&
    formData.value.type &&
    formData.value.stage &&
    formData.value.priority &&
    formData.value.source &&
    formData.value.customerId.trim() !== '' &&
    formData.value.customerName.trim() !== '' &&
    formData.value.customerType &&
    formData.value.assignedTo.trim() !== '' &&
    formData.value.contacts.length > 0 &&
    formData.value.contacts.every(
      (contact) =>
        contact.contactId.trim() !== '' &&
        contact.contactName.trim() !== '' &&
        contact.contactEmail.trim() !== '' &&
        contact.role &&
        contact.influence,
    ) &&
    formData.value.products.length > 0 &&
    formData.value.products.every(
      (product) =>
        product.productId.trim() !== '' &&
        product.productName.trim() !== '' &&
        product.productCode.trim() !== '' &&
        product.quantity > 0 &&
        product.unitPrice >= 0,
    )
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

const addContact = () => {
  formData.value.contacts.push({
    id: `temp-${Date.now()}`,
    contactId: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    role: 'DECISION_MAKER',
    influence: 'HIGH',
  })
}

const removeContact = (index: number) => {
  if (formData.value.contacts.length > 1) {
    formData.value.contacts.splice(index, 1)
  }
}

const addProduct = () => {
  formData.value.products.push({
    id: `temp-${Date.now()}`,
    productId: '',
    productName: '',
    productCode: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    totalPrice: 0,
    currency: Currency.USD,
  })
}

const removeProduct = (index: number) => {
  if (formData.value.products.length > 1) {
    formData.value.products.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Initialize form data when opportunity prop changes
const initializeFormData = () => {
  if (props.opportunity) {
    formData.value = {
      opportunityCode: props.opportunity.opportunityCode,
      title: props.opportunity.title,
      description: props.opportunity.description || '',
      status: props.opportunity.status,
      type: props.opportunity.type,
      stage: props.opportunity.stage,
      priority: props.opportunity.priority,
      source: props.opportunity.source,
      customerId: props.opportunity.customerId,
      customerName: props.opportunity.customerName,
      customerType: props.opportunity.customerType,
      assignedTo: props.opportunity.assignedTo,
      contacts: props.opportunity.contacts.map((contact) => ({
        id: contact.id,
        contactId: contact.contactId,
        contactName: contact.contactName,
        contactEmail: contact.contactEmail,
        contactPhone: contact.contactPhone,
        role: contact.role,
        influence: contact.influence,
        notes: contact.notes || '',
      })),
      products: props.opportunity.products.map((product) => ({
        id: product.id,
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        discount: product.discount,
        totalPrice: product.totalPrice,
        currency: product.currency,
        notes: product.notes || '',
      })),
      tags: [...props.opportunity.tags],
      notes: props.opportunity.notes || '',
    }
  }
}

// Watch for opportunity prop changes
watch(() => props.opportunity, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
