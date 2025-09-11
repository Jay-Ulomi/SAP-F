<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            type="button"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Basic Information Tab -->
      <div v-if="activeTab === 'basic'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <select
              v-model="formData.title"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
              <option value="Sir">Sir</option>
              <option value="Lady">Lady</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              v-model="formData.firstName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="John"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              v-model="formData.lastName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Smith"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              v-model="formData.position"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Sales Manager"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              v-model="formData.department"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Sales"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              v-model="formData.companyName"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="ABC Corporation"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional notes about this contact"
          ></textarea>
        </div>
      </div>

      <!-- Contact Information Tab -->
      <div v-if="activeTab === 'contact'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Contact Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="john.smith@company.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              v-model="formData.phone"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-0123"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              v-model="formData.mobile"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-0124"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
            <input
              v-model="formData.fax"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-0125"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Preferred Contact Method *</label
            >
            <select
              v-model="formData.preferredContactMethod"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Method</option>
              <option value="EMAIL">Email</option>
              <option value="PHONE">Phone</option>
              <option value="MOBILE">Mobile</option>
              <option value="FAX">Fax</option>
              <option value="MAIL">Mail</option>
              <option value="IN_PERSON">In Person</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skype</label>
            <input
              v-model="formData.skype"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="username"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Business Card</label>
          <input
            v-model="formData.businessCard"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Card Reference"
          />
        </div>
      </div>

      <!-- Address Information Tab -->
      <div v-if="activeTab === 'addresses'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Address Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
            <input
              v-model="formData.addressLine1"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="123 Business Ave"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <input
              v-model="formData.addressLine2"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Suite 100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              v-model="formData.city"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="New York"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
            <input
              v-model="formData.state"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="NY"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              v-model="formData.postalCode"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="10001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              v-model="formData.country"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="USA"
            />
          </div>
        </div>
      </div>

      <!-- Classification & Settings Tab -->
      <div v-if="activeTab === 'classification'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Classification & Settings</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contact Types *</label>
            <div class="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
              <label v-for="type in contactTypes" :key="type" class="flex items-center">
                <input
                  v-model="formData.contactType"
                  type="checkbox"
                  :value="type"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">{{ formatContactType(type) }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              v-model="formData.status"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="FORMER_EMPLOYEE">Former Employee</option>
              <option value="ON_LEAVE">On Leave</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              v-model="formData.category"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Category</option>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="PARTNER">Partner</option>
              <option value="INTERNAL">Internal</option>
              <option value="PROSPECT">Prospect</option>
            </select>
          </div>

          <div class="flex items-center">
            <input
              v-model="formData.isPrimary"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Primary Contact</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="formData.doNotContact"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Do Not Contact</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="formData.marketingOptIn"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Marketing Opt-in</label>
          </div>
        </div>
      </div>

      <!-- Additional Details Tab -->
      <div v-if="activeTab === 'additional'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Additional Details</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
            <input
              v-model="formData.birthday"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Anniversary</label>
            <input
              v-model="formData.anniversary"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              v-model="formData.language"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="English"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <input
              v-model="formData.timezone"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="America/New_York"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              v-model="formData.linkedIn"
              type="url"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              v-model="formData.website"
              type="url"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="website.com"
            />
          </div>
        </div>

        <!-- Tags -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in formData.tags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sap-blue text-white"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(tag)"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-sap-blue bg-white hover:bg-gray-100"
              >
                ×
              </button>
            </span>
          </div>
          <div class="flex">
            <input
              v-model="tagInput"
              type="text"
              @keydown.enter.prevent="addTag"
              class="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              @click="addTag"
              class="px-3 py-2 bg-sap-blue text-white text-sm font-medium rounded-r-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="handleCancel"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="props.loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Contact' : 'Create Contact' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import { ContactType, ContactStatus, ContactCategory, PreferredContactMethod } from '../types'
import type { ContactPerson, ContactPersonFormData } from '../types'

interface Props {
  contact?: ContactPerson | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ContactPersonFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  contact: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.contact)

// Tab management
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contact', name: 'Contact Information' },
  { id: 'addresses', name: 'Addresses' },
  { id: 'classification', name: 'Classification & Settings' },
  { id: 'additional', name: 'Additional Details' },
]

// Form data
const formData = reactive<ContactPersonFormData>({
  firstName: '',
  lastName: '',
  title: '',
  position: '',
  department: '',
  companyId: '',
  companyName: '',
  contactType: [],
  status: ContactStatus.ACTIVE,
  category: ContactCategory.CUSTOMER,
  isPrimary: false,
  preferredContactMethod: PreferredContactMethod.EMAIL,
  email: '',
  phone: '',
  mobile: '',
  fax: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  notes: '',
  tags: [],
  birthday: '',
  anniversary: '',
  businessCard: '',
  linkedIn: '',
  website: '',
  skype: '',
  language: '',
  timezone: '',
  doNotContact: false,
  marketingOptIn: false,
  relatedCustomerIds: [],
  relatedVendorIds: [],
  relatedLeadIds: [],
})

// Tag input
const tagInput = ref('')

// Available contact types
const contactTypes = Object.values(ContactType)

// Methods
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  }
}

const resetForm = () => {
  formData.firstName = ''
  formData.lastName = ''
  formData.title = ''
  formData.position = ''
  formData.department = ''
  formData.companyId = ''
  formData.companyName = ''
  formData.contactType = []
  formData.status = ContactStatus.ACTIVE
  formData.category = ContactCategory.CUSTOMER
  formData.isPrimary = false
  formData.preferredContactMethod = PreferredContactMethod.EMAIL
  formData.email = ''
  formData.phone = ''
  formData.mobile = ''
  formData.fax = ''
  formData.addressLine1 = ''
  formData.addressLine2 = ''
  formData.city = ''
  formData.state = ''
  formData.postalCode = ''
  formData.country = ''
  formData.notes = ''
  formData.tags = []
  formData.birthday = ''
  formData.anniversary = ''
  formData.businessCard = ''
  formData.linkedIn = ''
  formData.website = ''
  formData.skype = ''
  formData.language = ''
  formData.timezone = ''
  formData.doNotContact = false
  formData.marketingOptIn = false
  formData.relatedCustomerIds = []
  formData.relatedVendorIds = []
  formData.relatedLeadIds = []
}

// Watch for contact changes to populate form
watch(
  () => props.contact,
  (contact) => {
    if (contact) {
      // Populate form with contact data
      formData.firstName = contact.firstName
      formData.lastName = contact.lastName
      formData.title = contact.title || ''
      formData.position = contact.position || ''
      formData.department = contact.department || ''
      formData.companyId = contact.companyId || ''
      formData.companyName = contact.companyName || ''
      formData.contactType = [...contact.contactType]
      formData.status = contact.status
      formData.category = contact.category
      formData.isPrimary = contact.isPrimary
      formData.preferredContactMethod = contact.preferredContactMethod
      formData.email = contact.email
      formData.phone = contact.phone || ''
      formData.mobile = contact.mobile || ''
      formData.fax = contact.fax || ''
      formData.addressLine1 = contact.addressLine1 || ''
      formData.addressLine2 = contact.addressLine2 || ''
      formData.city = contact.city || ''
      formData.state = contact.state || ''
      formData.postalCode = contact.postalCode || ''
      formData.country = contact.country || ''
      formData.notes = contact.notes || ''
      formData.tags = [...contact.tags]
      formData.birthday = contact.birthday || ''
      formData.anniversary = contact.anniversary || ''
      formData.businessCard = contact.businessCard || ''
      formData.linkedIn = contact.linkedIn || ''
      formData.website = contact.website || ''
      formData.skype = contact.skype || ''
      formData.language = contact.language || ''
      formData.timezone = contact.timezone || ''
      formData.doNotContact = contact.doNotContact
      formData.marketingOptIn = contact.marketingOptIn
      formData.relatedCustomerIds = contact.relatedCustomerIds || []
      formData.relatedVendorIds = contact.relatedVendorIds || []
      formData.relatedLeadIds = contact.relatedLeadIds || []
    } else {
      // Reset form for new contact
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  try {
    // Validate required fields
    if (!formData.firstName.trim()) {
      alert('First name is required')
      return
    }
    if (!formData.lastName.trim()) {
      alert('Last name is required')
      return
    }
    if (!formData.email.trim()) {
      alert('Email is required')
      return
    }
    if (formData.contactType.length === 0) {
      alert('At least one contact type must be selected')
      return
    }

    emit('submit', { ...formData })
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form')
  }
}

const handleCancel = () => {
  emit('cancel')
}

// Utility functions
const formatContactType = (type: string): string => {
  switch (type) {
    case 'PRIMARY':
      return 'Primary'
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'TECHNICAL':
      return 'Technical'
    case 'DECISION_MAKER':
      return 'Decision Maker'
    case 'ACCOUNTS_PAYABLE':
      return 'Accounts Payable'
    case 'ACCOUNTS_RECEIVABLE':
      return 'Accounts Receivable'
    case 'SALES':
      return 'Sales'
    case 'SUPPORT':
      return 'Support'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}
</script>
