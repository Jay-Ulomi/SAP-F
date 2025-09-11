<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
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

    <!-- Basic Information -->
    <div v-if="activeTab === 'basic'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lead Code *</label>
          <input
            v-model="formData.leadCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter lead code"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter lead title"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="DISQUALIFIED">Disqualified</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
          <select
            v-model="formData.priority"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
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
            <option value="WEBSITE">Website</option>
            <option value="REFERRAL">Referral</option>
            <option value="COLD_CALL">Cold Call</option>
            <option value="TRADE_SHOW">Trade Show</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="EMAIL_CAMPAIGN">Email Campaign</option>
            <option value="PARTNER">Partner</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To *</label>
          <input
            v-model="formData.assignedTo"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter assignee"
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
            placeholder="Enter description"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter notes"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tag, i) in formData.tags"
            :key="i"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sap-blue text-white"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeTag(i)"
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

    <!-- Company & Contact -->
    <div v-if="activeTab === 'company'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input
            v-model="formData.company.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input
            v-model="formData.company.industry"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Industry"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
          <select
            v-model="formData.company.size"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="SMB">SMB</option>
            <option value="MID_MARKET">Mid Market</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            v-model="formData.company.website"
            type="url"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="https://"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            v-model="formData.company.country"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Country"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
          <input
            v-model="formData.contact.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Contact name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            v-model="formData.contact.email"
            type="email"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Contact email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            v-model="formData.contact.phone"
            type="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Contact phone"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="formData.contact.title"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Job title"
          />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Notes</label>
          <input
            v-model="formData.contact.notes"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional details"
          />
        </div>
      </div>
    </div>

    <!-- Actions -->
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
        <span v-else>{{ lead ? 'Update Lead' : 'Create Lead' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Lead, LeadFormData } from '../types'
import { LeadStatus, LeadPriority, LeadSource } from '../types'

interface Props {
  lead?: Lead | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { lead: null, loading: false })
const emit = defineEmits<{ submit: [data: LeadFormData]; cancel: [] }>()

const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'company', name: 'Company & Contact' },
]
const activeTab = ref('basic')

const formData = ref<LeadFormData>({
  leadCode: '',
  title: '',
  description: '',
  status: LeadStatus.NEW,
  priority: LeadPriority.MEDIUM,
  source: LeadSource.WEBSITE,
  assignedTo: '',
  company: { name: '' },
  contact: { id: `temp-${Date.now()}`, name: '', email: '' },
  tags: [],
  notes: '',
})

const newTag = ref('')

const isFormValid = computed(() => {
  return (
    formData.value.leadCode.trim() !== '' &&
    formData.value.title.trim() !== '' &&
    formData.value.assignedTo.trim() !== '' &&
    formData.value.company.name.trim() !== '' &&
    formData.value.contact.name.trim() !== '' &&
    formData.value.contact.email.trim() !== ''
  )
})

const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}
const removeTag = (i: number) => formData.value.tags.splice(i, 1)

const handleSubmit = () => {
  if (isFormValid.value) emit('submit', { ...formData.value })
}

const initialize = () => {
  if (!props.lead) return
  formData.value = {
    leadCode: props.lead.leadCode,
    title: props.lead.title,
    description: props.lead.description || '',
    status: props.lead.status,
    priority: props.lead.priority,
    source: props.lead.source,
    assignedTo: props.lead.assignedTo,
    company: { ...props.lead.company },
    contact: { ...props.lead.contact },
    tags: [...props.lead.tags],
    notes: props.lead.notes || '',
  }
}

watch(() => props.lead, initialize, { immediate: true })
onMounted(initialize)
</script>
