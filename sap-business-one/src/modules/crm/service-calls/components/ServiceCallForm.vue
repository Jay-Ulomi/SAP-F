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
          <label class="block text-sm font-medium text-gray-700 mb-1">Service Call Code *</label>
          <input
            v-model="formData.serviceCallCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter service call code"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter service call title"
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
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
            <option value="CANCELLED">Cancelled</option>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select type</option>
            <option value="TECHNICAL_SUPPORT">Technical Support</option>
            <option value="BUG_REPORT">Bug Report</option>
            <option value="FEATURE_REQUEST">Feature Request</option>
            <option value="TRAINING">Training</option>
            <option value="CONSULTATION">Consultation</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INSTALLATION">Installation</option>
            <option value="UPGRADE">Upgrade</option>
            <option value="OTHER">Other</option>
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
            <option value="SOFTWARE">Software</option>
            <option value="HARDWARE">Hardware</option>
            <option value="NETWORK">Network</option>
            <option value="DATABASE">Database</option>
            <option value="SECURITY">Security</option>
            <option value="USER_ACCESS">User Access</option>
            <option value="INTEGRATION">Integration</option>
            <option value="REPORTING">Reporting</option>
            <option value="WORKFLOW">Workflow</option>
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
            <option value="PHONE">Phone</option>
            <option value="EMAIL">Email</option>
            <option value="WEB_FORM">Web Form</option>
            <option value="SELF_SERVICE">Self Service</option>
            <option value="WALK_IN">Walk In</option>
            <option value="REFERRAL">Referral</option>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
          <input
            v-model.number="formData.estimatedHours"
            type="number"
            min="0"
            step="0.5"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter estimated hours"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Actual Hours</label>
          <input
            v-model.number="formData.actualHours"
            type="number"
            min="0"
            step="0.5"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter actual hours"
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
            placeholder="Enter service call description"
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
                <option value="REPORTER">Reporter</option>
                <option value="ASSIGNEE">Assignee</option>
                <option value="WATCHER">Watcher</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
              <div class="flex items-center">
                <input
                  v-model="contact.isPrimary"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label class="ml-2 text-sm text-gray-700">Mark as primary contact</label>
              </div>
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
        <span v-else>{{ serviceCall ? 'Update Service Call' : 'Create Service Call' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ServiceCall, ServiceCallFormData } from '../types'
import {
  ServiceCallStatus,
  ServiceCallType,
  ServiceCallCategory,
  ServiceCallPriority,
  ServiceCallSource,
} from '../types'

// Props
interface Props {
  serviceCall?: ServiceCall | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  serviceCall: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  submit: [data: ServiceCallFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contacts', name: 'Contacts' },
]

const activeTab = ref('basic')

// Form data
const formData = ref<ServiceCallFormData>({
  serviceCallCode: '',
  title: '',
  description: '',
  status: ServiceCallStatus.OPEN,
  priority: ServiceCallPriority.MEDIUM,
  type: ServiceCallType.TECHNICAL_SUPPORT,
  category: ServiceCallCategory.SOFTWARE,
  source: ServiceCallSource.EMAIL,
  customerId: '',
  customerName: '',
  assignedTo: '',
  contacts: [
    {
      contactId: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      role: 'REPORTER',
      isPrimary: true,
    },
  ],
  estimatedHours: 0,
  actualHours: 0,
  tags: [],
  notes: '',
})

// Input fields for dynamic content
const newTag = ref('')

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.serviceCallCode.trim() !== '' &&
    formData.value.title.trim() !== '' &&
    formData.value.status &&
    formData.value.type &&
    formData.value.category &&
    formData.value.source &&
    formData.value.customerId.trim() !== '' &&
    formData.value.customerName.trim() !== '' &&
    formData.value.assignedTo.trim() !== '' &&
    formData.value.contacts.length > 0 &&
    formData.value.contacts.every(
      (contact) =>
        contact.contactId.trim() !== '' &&
        contact.contactName.trim() !== '' &&
        contact.contactEmail.trim() !== '' &&
        contact.role,
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
    contactId: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    role: 'REPORTER',
    isPrimary: false,
  })
}

const removeContact = (index: number) => {
  if (formData.value.contacts.length > 1) {
    formData.value.contacts.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Initialize form data when serviceCall prop changes
const initializeFormData = () => {
  if (props.serviceCall) {
    formData.value = {
      serviceCallCode: props.serviceCall.serviceCallCode,
      title: props.serviceCall.title,
      description: props.serviceCall.description || '',
      status: props.serviceCall.status,
      priority: props.serviceCall.priority,
      type: props.serviceCall.type,
      category: props.serviceCall.category,
      source: props.serviceCall.source,
      customerId: props.serviceCall.customerId,
      customerName: props.serviceCall.customerName,
      assignedTo: props.serviceCall.assignedTo,
      contacts: props.serviceCall.contacts.map((contact) => ({
        contactId: contact.contactId,
        contactName: contact.contactName,
        contactEmail: contact.contactEmail,
        contactPhone: contact.contactPhone,
        role: contact.role,
        isPrimary: contact.isPrimary,
      })),
      estimatedHours: props.serviceCall.estimatedHours,
      actualHours: props.serviceCall.actualHours,
      tags: [...props.serviceCall.tags],
      notes: props.serviceCall.notes || '',
    }
  }
}

// Watch for serviceCall prop changes
watch(() => props.serviceCall, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
