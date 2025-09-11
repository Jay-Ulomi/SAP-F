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
          <label class="block text-sm font-medium text-gray-700 mb-1">Activity Code *</label>
          <input
            v-model="formData.activityCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter activity code"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter activity title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Activity Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select activity type</option>
            <option value="CALL">Call</option>
            <option value="EMAIL">Email</option>
            <option value="MEETING">Meeting</option>
            <option value="VISIT">Visit</option>
            <option value="QUOTE">Quote</option>
            <option value="ORDER">Order</option>
            <option value="COMPLAINT">Complaint</option>
            <option value="SUPPORT">Support</option>
            <option value="FOLLOW_UP">Follow-up</option>
            <option value="PRESENTATION">Presentation</option>
            <option value="DEMO">Demo</option>
            <option value="TRAINING">Training</option>
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
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="OVERDUE">Overdue</option>
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
            <option value="ADMINISTRATIVE">Administrative</option>
            <option value="TRAINING">Training</option>
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
            placeholder="Enter assigned team/member"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input
            v-model="formData.startDate"
            type="datetime-local"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
          <input
            v-model="formData.endDate"
            type="datetime-local"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
          <input
            v-model="formData.dueDate"
            type="datetime-local"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter activity description"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter additional notes"
          />
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
    

    <!-- Participants Tab -->
    <div v-if="activeTab === 'participants'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(participant, index) in formData.participants"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Participant {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeParticipant(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                v-model="participant.type"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select type</option>
                <option value="CONTACT">Contact</option>
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">Vendor</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="PARTNER">Partner</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Entity ID *</label>
              <input
                v-model="participant.entityId"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter entity ID"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Entity Name *</label>
              <input
                v-model="participant.entityName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter entity name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Entity Type *</label>
              <input
                v-model="participant.entityType"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter entity type"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                v-model="participant.role"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select role</option>
                <option value="ORGANIZER">Organizer</option>
                <option value="ATTENDEE">Attendee</option>
                <option value="REQUIRED">Required</option>
                <option value="OPTIONAL">Optional</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Response</label>
              <select
                v-model="participant.response"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="NO_RESPONSE">No Response</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="DECLINED">Declined</option>
                <option value="TENTATIVE">Tentative</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                v-model="participant.notes"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter participant notes"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addParticipant"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Participant
        </button>
      </div>
    </div>

    <!-- Location Tab -->
    <div v-if="activeTab === 'location'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location Type *</label>
          <select
            v-model="formData.location.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select location type</option>
            <option value="PHYSICAL">Physical</option>
            <option value="VIRTUAL">Virtual</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>

        <div v-if="formData.location.type === 'PHYSICAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            v-model="formData.location.address"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter street address"
          />
        </div>

        <div v-if="formData.location.type === 'PHYSICAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            v-model="formData.location.city"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter city"
          />
        </div>

        <div v-if="formData.location.type === 'PHYSICAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
          <input
            v-model="formData.location.state"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter state/province"
          />
        </div>

        <div v-if="formData.location.type === 'PHYSICAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <input
            v-model="formData.location.postalCode"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter postal code"
          />
        </div>

        <div v-if="formData.location.type === 'PHYSICAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            v-model="formData.location.country"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter country"
          />
        </div>

        <div v-if="formData.location.type === 'VIRTUAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Virtual Meeting URL</label>
          <input
            v-model="formData.location.virtualMeetingUrl"
            type="url"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="https://meet.google.com/abc-defg-hij"
          />
        </div>

        <div v-if="formData.location.type === 'VIRTUAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Virtual Meeting ID</label>
          <input
            v-model="formData.location.virtualMeetingId"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter meeting ID"
          />
        </div>

        <div v-if="formData.location.type === 'VIRTUAL' || formData.location.type === 'HYBRID'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Virtual Meeting Password</label>
          <input
            v-model="formData.location.virtualMeetingPassword"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter meeting password"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Location Notes</label>
          <input
            v-model="formData.location.notes"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter location notes"
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
        <span v-else>{{ activity ? 'Update Activity' : 'Create Activity' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Activity, ActivityFormData } from '../types'
import { ActivityType, ActivityStatus, ActivityPriority, ActivityCategory } from '../types'

// Props
interface Props {
  activity?: Activity | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  activity: null,
  loading: false
})

// Emits
const emit = defineEmits<{
  submit: [data: ActivityFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'participants', name: 'Participants' },
  { id: 'location', name: 'Location' }
]

const activeTab = ref('basic')

// Form data
const formData = ref<ActivityFormData>({
  activityCode: '',
  title: '',
  description: '',
  type: ActivityType.MEETING,
  status: ActivityStatus.PLANNED,
  priority: ActivityPriority.MEDIUM,
  category: ActivityCategory.SALES,
  startDate: new Date(),
  endDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  assignedTo: '',
  participants: [
    {
      type: 'EMPLOYEE',
      entityId: '',
      entityName: '',
      entityType: '',
      role: 'ORGANIZER',
      response: 'NO_RESPONSE'
    }
  ],
  location: {
    type: 'PHYSICAL',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    virtualMeetingUrl: '',
    virtualMeetingId: '',
    virtualMeetingPassword: '',
    notes: ''
  },
  tags: [],
  notes: ''
})

// Input fields for dynamic content
const newTag = ref('')

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.activityCode.trim() !== '' &&
    formData.value.title.trim() !== '' &&
    formData.value.type &&
    formData.value.status &&
    formData.value.priority &&
    formData.value.category &&
    formData.value.startDate &&
    formData.value.endDate &&
    formData.value.dueDate &&
    formData.value.assignedTo.trim() !== '' &&
    formData.value.participants.length > 0 &&
    formData.value.participants.every(participant =>
      participant.type &&
      participant.entityId.trim() !== '' &&
      participant.entityName.trim() !== '' &&
      participant.entityType.trim() !== '' &&
      participant.role
    ) &&
    formData.value.location.type &&
    formData.value.startDate < formData.value.endDate &&
    formData.value.startDate <= formData.value.dueDate
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

const addParticipant = () => {
  formData.value.participants.push({
    type: 'CONTACT',
    entityId: '',
    entityName: '',
    entityType: '',
    role: 'ATTENDEE',
    response: 'NO_RESPONSE'
  })
}

const removeParticipant = (index: number) => {
  if (formData.value.participants.length > 1) {
    formData.value.participants.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Initialize form data when activity prop changes
const initializeFormData = () => {
  if (props.activity) {
    formData.value = {
      activityCode: props.activity.activityCode,
      title: props.activity.title,
      description: props.activity.description || '',
      type: props.activity.type,
      status: props.activity.status,
      priority: props.activity.priority,
      category: props.activity.category,
      startDate: props.activity.startDate,
      endDate: props.activity.endDate,
      dueDate: props.activity.dueDate,
      assignedTo: props.activity.assignedTo,
      participants: props.activity.participants.map(participant => ({
        type: participant.type,
        entityId: participant.entityId,
        entityName: participant.entityName,
        entityType: participant.entityType,
        role: participant.role,
        response: participant.response,
        notes: participant.notes || ''
      })),
      location: {
        type: props.activity.location.type,
        address: props.activity.location.address || '',
        city: props.activity.location.city || '',
        state: props.activity.location.state || '',
        postalCode: props.activity.location.postalCode || '',
        country: props.activity.location.country || '',
        virtualMeetingUrl: props.activity.location.virtualMeetingUrl || '',
        virtualMeetingId: props.activity.location.virtualMeetingId || '',
        virtualMeetingPassword: props.activity.location.virtualMeetingPassword || '',
        notes: props.activity.location.notes || ''
      },
      tags: [...props.activity.tags],
      notes: props.activity.notes || ''
    }
  }
}

// Watch for activity prop changes
watch(() => props.activity, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
