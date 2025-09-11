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
            <label class="block text-sm font-medium text-gray-700 mb-1">Address Name *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Main Office"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              v-model="formData.description"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Primary business location"
            />
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
              <option value="DEFAULT">Default</option>
              <option value="VERIFIED">Verified</option>
              <option value="UNVERIFIED">Unverified</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address Types *</label>
          <div class="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            <label v-for="type in addressTypes" :key="type" class="flex items-center">
              <input
                v-model="formData.addressType"
                type="checkbox"
                :value="type"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">{{ formatAddressType(type) }}</span>
            </label>
          </div>
        </div>
        <div class="mt-4 flex items-center space-x-6">
          <div class="flex items-center">
            <input
              v-model="formData.isDefault"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Default Address</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="formData.isVerified"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Verified Address</label>
          </div>
        </div>
      </div>

      <!-- Address Details Tab -->
      <div v-if="activeTab === 'address'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Address Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
            <input
              v-model="formData.addressLine1"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="123 Business Plaza"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              v-model="formData.city"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="New York"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
            <input
              v-model="formData.state"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="NY"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
            <input
              v-model="formData.postalCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="10001"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select
              v-model="formData.country"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="CH">Switzerland</option>
              <option value="AT">Austria</option>
              <option value="AU">Australia</option>
              <option value="NZ">New Zealand</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              <option value="MX">Mexico</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Contact Information Tab -->
      <div v-if="activeTab === 'contact'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input
              v-model="formData.contactPerson"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="John Smith"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="office@company.com"
            />
          </div>
        </div>
      </div>

      <!-- Business Information Tab -->
      <div v-if="activeTab === 'business'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Business Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company ID</label>
            <input
              v-model="formData.companyId"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="comp-001"
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
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
            <input
              v-model="formData.taxId"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="12-3456789"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Business License</label>
            <input
              v-model="formData.businessLicense"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="BL-001234"
            />
          </div>
        </div>
      </div>

      <!-- Geographic Information Tab -->
      <div v-if="activeTab === 'geographic'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Geographic Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              v-model="formData.latitude"
              type="number"
              step="0.000001"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="40.7589"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              v-model="formData.longitude"
              type="number"
              step="0.000001"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="-73.9851"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              v-model="formData.timezone"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Timezone</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="Asia/Shanghai">Asia/Shanghai</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Additional Details Tab -->
      <div v-if="activeTab === 'additional'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Additional Details</h3>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional notes about this address..."
          ></textarea>
        </div>
        <!-- Tags -->
        <div class="mb-6">
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
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Address' : 'Create Address' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import { AddressType, AddressStatus, Country } from '../types'
import type { Address, AddressFormData } from '../types'

interface Props {
  address?: Address | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: AddressFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  address: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.address)

// Tab management
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'address', name: 'Address Details' },
  { id: 'contact', name: 'Contact Information' },
  { id: 'business', name: 'Business Information' },
  { id: 'geographic', name: 'Geographic Information' },
  { id: 'additional', name: 'Additional Details' },
]

// Form data
const formData = reactive<AddressFormData>({
  name: '',
  description: '',
  addressType: [],
  status: AddressStatus.ACTIVE,
  isDefault: false,
  isVerified: false,
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: Country.US,
  contactPerson: '',
  phone: '',
  email: '',
  companyId: '',
  companyName: '',
  taxId: '',
  businessLicense: '',
  latitude: undefined,
  longitude: undefined,
  timezone: '',
  notes: '',
  tags: [],
})

// Tag input
const tagInput = ref('')

// Available address types
const addressTypes = Object.values(AddressType)

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
  Object.assign(formData, {
    name: '',
    description: '',
    addressType: [],
    status: AddressStatus.ACTIVE,
    isDefault: false,
    isVerified: false,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: Country.US,
    contactPerson: '',
    phone: '',
    email: '',
    companyId: '',
    companyName: '',
    taxId: '',
    businessLicense: '',
    latitude: undefined,
    longitude: undefined,
    timezone: '',
    notes: '',
    tags: [],
  })
}

const handleSubmit = () => {
  emit('submit', { ...formData })
}

const handleCancel = () => {
  emit('cancel')
}

// Watch for address changes to populate form
watch(
  () => props.address,
  (address) => {
    if (address) {
      Object.assign(formData, {
        name: address.name,
        description: address.description || '',
        addressType: [...address.addressType],
        status: address.status,
        isDefault: address.isDefault,
        isVerified: address.isVerified,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        contactPerson: address.contactPerson || '',
        phone: address.phone || '',
        email: address.email || '',
        companyId: address.companyId || '',
        companyName: address.companyName || '',
        taxId: address.taxId || '',
        businessLicense: address.businessLicense || '',
        latitude: address.latitude,
        longitude: address.longitude,
        timezone: address.timezone || '',
        notes: address.notes || '',
        tags: [...address.tags],
      })
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

// Utility functions
const formatAddressType = (type: string): string => {
  switch (type) {
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'BUSINESS':
      return 'Business'
    case 'RESIDENTIAL':
      return 'Residential'
    case 'WAREHOUSE':
      return 'Warehouse'
    case 'BRANCH':
      return 'Branch'
    case 'HEADQUARTERS':
      return 'Headquarters'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}
</script>
