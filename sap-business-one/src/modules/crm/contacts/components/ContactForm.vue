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
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Code *</label>
          <input
            v-model="formData.contactCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter contact code"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            v-model="formData.firstName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            v-model="formData.lastName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter last name"
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            v-model="formData.jobTitle"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            v-model="formData.department"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter department"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select contact type</option>
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
            <option value="PARTNER">Partner</option>
            <option value="VENDOR">Vendor</option>
            <option value="CUSTOMER">Customer</option>
            <option value="SUPPLIER">Supplier</option>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            v-model="formData.category"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select category</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="SUPPORT">Support</option>
            <option value="PARTNER">Partner</option>
            <option value="VENDOR">Vendor</option>
            <option value="CUSTOMER">Customer</option>
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
            <option value="EXISTING_CONTACT">Existing Contact</option>
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

        <div >
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
        <div >
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter contact description"
          />
        </div>

        <div >
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


    <!-- Communications Tab -->
    <div v-if="activeTab === 'communications'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(communication, index) in formData.communications"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Communication {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeCommunication(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                v-model="communication.type"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select type</option>
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone</option>
                <option value="MOBILE">Mobile</option>
                <option value="FAX">Fax</option>
                <option value="WEBSITE">Website</option>
                <option value="SOCIAL_MEDIA">Social Media</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Value *</label>
              <input
                v-model="communication.value"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter contact value"
              />
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input
                  v-model="communication.isPrimary"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Set as primary contact method</span>
              </label>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                v-model="communication.notes"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter notes about this contact method"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addCommunication"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Communication Method
        </button>
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
        <span v-else>{{ contact ? 'Update Contact' : 'Create Contact' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Contact, ContactFormData } from '../types'
import { ContactType, ContactStatus, ContactSource, ContactPriority, ContactCategory } from '../types'

// Props
interface Props {
  contact?: Contact | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  contact: null,
  loading: false
})

// Emits
const emit = defineEmits<{
  submit: [data: ContactFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'communications', name: 'Communications' },
  { id: 'addresses', name: 'Addresses' }
]

const activeTab = ref('basic')

// Form data
const formData = ref<ContactFormData>({
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
  jobTitle: '',
  department: '',
  type: ContactType.INDIVIDUAL,
  status: ContactStatus.PROSPECT,
  source: ContactSource.WEBSITE,
  priority: ContactPriority.MEDIUM,
  category: ContactCategory.SALES,
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
  communications: [
    {
      type: 'EMAIL',
      value: '',
      isPrimary: true,
      isVerified: false
    }
  ],
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
    formData.value.contactCode.trim() !== '' &&
    formData.value.firstName.trim() !== '' &&
    formData.value.lastName.trim() !== '' &&
    formData.value.type &&
    formData.value.status &&
    formData.value.source &&
    formData.value.priority &&
    formData.value.category &&
    formData.value.addresses.length > 0 &&
    formData.value.addresses.every(addr =>
      addr.street.trim() !== '' &&
      addr.city.trim() !== '' &&
      addr.postalCode.trim() !== '' &&
      addr.country.trim() !== ''
    ) &&
    formData.value.communications.length > 0 &&
    formData.value.communications.every(comm =>
      comm.value.trim() !== ''
    ) &&
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

const addCommunication = () => {
  formData.value.communications.push({
    type: 'PHONE',
    value: '',
    isPrimary: false,
    isVerified: false
  })
}

const removeCommunication = (index: number) => {
  if (formData.value.communications.length > 1) {
    formData.value.communications.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Initialize form data when contact prop changes
const initializeFormData = () => {
  if (props.contact) {
    formData.value = {
      contactCode: props.contact.contactCode,
      firstName: props.contact.firstName,
      lastName: props.contact.lastName,
      companyName: props.contact.companyName || '',
      jobTitle: props.contact.jobTitle || '',
      department: props.contact.department || '',
      type: props.contact.type,
      status: props.contact.status,
      source: props.contact.source,
      priority: props.contact.priority,
      category: props.contact.category,
      addresses: props.contact.addresses.map(addr => ({
        type: addr.type,
        street: addr.street,
        city: addr.city,
        state: addr.state || '',
        postalCode: addr.postalCode,
        country: addr.country,
        isDefault: addr.isDefault
      })),
      communications: props.contact.communications.map(comm => ({
        type: comm.type,
        value: comm.value,
        isPrimary: comm.isPrimary,
        isVerified: comm.isVerified,
        notes: comm.notes || ''
      })),
      website: props.contact.website || '',
      description: props.contact.description || '',
      notes: props.contact.notes || '',
      tags: [...props.contact.tags],
      assignedTo: props.contact.assignedTo,
      leadScore: props.contact.leadScore
    }
  }
}

// Watch for contact prop changes
watch(() => props.contact, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
