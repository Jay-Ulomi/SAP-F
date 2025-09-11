<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ entry ? 'Edit Timesheet Entry' : 'Create New Timesheet Entry' }}
      </h3>
      <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
          <select
            v-model="formData.employeeId"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            :disabled="!!entry"
          >
            <option value="">Select Employee</option>
            <option value="EMP001">John Doe (EMP001)</option>
            <option value="EMP002">Jane Smith (EMP002)</option>
            <option value="EMP003">Mike Johnson (EMP003)</option>
            <option value="EMP004">Sarah Wilson (EMP004)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
          <input
            type="date"
            v-model="formData.date"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <!-- Time Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Working Hours</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              v-model="formData.startTime"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              v-model="formData.endTime"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @blur="calculateHours"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Break Duration (minutes)</label>
            <input
              type="number"
              v-model.number="formData.breakDuration"
              min="0"
              step="15"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @blur="calculateHours"
              placeholder="0"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Regular Hours *</label>
            <input
              type="number"
              v-model.number="formData.regularHours"
              min="0"
              max="24"
              step="0.25"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Overtime Hours</label>
            <input
              type="number"
              v-model.number="formData.overtimeHours"
              min="0"
              max="24"
              step="0.25"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <!-- Work Details -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Work Details</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project</label>
            <select
              v-model="formData.project"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Project</option>
              <option value="Project Alpha">Project Alpha</option>
              <option value="Project Beta">Project Beta</option>
              <option value="Project Gamma">Project Gamma</option>
              <option value="General">General</option>
              <option value="Training">Training</option>
              <option value="Meeting">Meeting</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Task/Activity</label>
            <input
              type="text"
              v-model="formData.task"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Specific task or activity"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
            <select
              v-model="formData.workType"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="regular">Regular Work</option>
              <option value="overtime">Overtime</option>
              <option value="holiday">Holiday Work</option>
              <option value="training">Training</option>
              <option value="meeting">Meeting</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              v-model="formData.location"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="office">Office</option>
              <option value="home">Work from Home</option>
              <option value="client_site">Client Site</option>
              <option value="travel">Travel</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Detailed description of work performed..."
          ></textarea>
        </div>
      </div>

      <!-- Billable Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Billing Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <input
              id="billable"
              type="checkbox"
              v-model="formData.billable"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="billable" class="ml-2 block text-sm text-gray-900">
              This work is billable to client
            </label>
          </div>
          <div v-if="formData.billable">
            <label class="block text-sm font-medium text-gray-700 mb-2">Billing Rate (per hour)</label>
            <input
              type="number"
              v-model.number="formData.billingRate"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Status</h4>
        
        <div>
          <select
            v-model="formData.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="submitted">Submit for Approval</option>
          </select>
          <p class="mt-2 text-sm text-gray-500">
            Draft entries can be edited. Submitted entries will require manager approval.
          </p>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : (entry ? 'Update Entry' : 'Create Entry') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { TimesheetEntry, TimesheetFormData } from '../types'

interface Props {
  entry?: TimesheetEntry
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: TimesheetFormData]
  cancel: []
}>()

const formData = ref<TimesheetFormData>({
  employeeId: '',
  employeeName: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '09:00',
  endTime: '17:00',
  breakDuration: 60,
  regularHours: 8,
  overtimeHours: 0,
  project: '',
  task: '',
  workType: 'regular',
  location: 'office',
  description: '',
  billable: false,
  billingRate: 0,
  status: 'draft'
})

// Employee name mapping (in real app, this would come from employee store)
const employeeNames: Record<string, string> = {
  'EMP001': 'John Doe',
  'EMP002': 'Jane Smith',
  'EMP003': 'Mike Johnson',
  'EMP004': 'Sarah Wilson'
}

watch(() => formData.value.employeeId, (newEmployeeId) => {
  formData.value.employeeName = employeeNames[newEmployeeId] || ''
})

function calculateHours() {
  if (formData.value.startTime && formData.value.endTime) {
    const start = new Date(`2000-01-01T${formData.value.startTime}`)
    const end = new Date(`2000-01-01T${formData.value.endTime}`)
    
    if (end > start) {
      const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
      const workMinutes = totalMinutes - (formData.value.breakDuration || 0)
      const hours = Math.max(0, workMinutes / 60)
      
      if (hours <= 8) {
        formData.value.regularHours = Math.round(hours * 4) / 4 // Round to nearest 0.25
        formData.value.overtimeHours = 0
      } else {
        formData.value.regularHours = 8
        formData.value.overtimeHours = Math.round((hours - 8) * 4) / 4
      }
    }
  }
}

function handleSubmit() {
  // Validate required fields
  if (!formData.value.employeeId || !formData.value.date || !formData.value.regularHours) {
    alert('Please fill in all required fields')
    return
  }

  // Validate hours
  if (formData.value.regularHours < 0 || formData.value.regularHours > 24) {
    alert('Regular hours must be between 0 and 24')
    return
  }

  if ((formData.value.overtimeHours || 0) < 0 || (formData.value.overtimeHours || 0) > 24) {
    alert('Overtime hours must be between 0 and 24')
    return
  }

  // Validate total hours
  const totalHours = formData.value.regularHours + (formData.value.overtimeHours || 0)
  if (totalHours > 24) {
    alert('Total hours cannot exceed 24 per day')
    return
  }

  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.entry) {
    // Pre-fill form with existing entry data
    formData.value = {
      employeeId: props.entry.employeeId,
      employeeName: props.entry.employeeName,
      date: props.entry.date.split('T')[0],
      startTime: props.entry.startTime || '09:00',
      endTime: props.entry.endTime || '17:00',
      breakDuration: props.entry.breakDuration || 60,
      regularHours: props.entry.regularHours,
      overtimeHours: props.entry.overtimeHours || 0,
      project: props.entry.project || '',
      task: props.entry.task || '',
      workType: props.entry.workType || 'regular',
      location: props.entry.location || 'office',
      description: props.entry.description || '',
      billable: props.entry.billable || false,
      billingRate: props.entry.billingRate || 0,
      status: props.entry.status
    }
  }
})
</script>