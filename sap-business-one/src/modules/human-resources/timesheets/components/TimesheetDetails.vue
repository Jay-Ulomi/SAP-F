<template>
  <div class="space-y-6">
    <!-- Header with entry summary -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0 h-12 w-12">
            <div class="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span class="text-lg font-medium text-gray-700">{{ getInitials(entry.employeeName) }}</span>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">{{ entry.employeeName }}</h2>
            <p class="text-sm text-gray-600">{{ entry.employeeId }}</p>
            <p class="text-lg text-gray-800">{{ new Date(entry.date).toLocaleDateString() }}</p>
          </div>
        </div>
        <div class="text-right">
          <span
            :class="[
              'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
              entry.status === 'approved' ? 'bg-green-100 text-green-800' :
              entry.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
              entry.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800',
            ]"
          >
            {{ formatStatus(entry.status) }}
          </span>
          <div class="mt-2 text-right">
            <p class="text-2xl font-bold text-indigo-600">{{ totalHours }}h</p>
            <p class="text-sm text-gray-500">Total Hours</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Time Information</h3>
        <dl class="space-y-3">
          <div v-if="entry.startTime && entry.endTime">
            <dt class="text-sm font-medium text-gray-500">Working Hours</dt>
            <dd class="text-sm text-gray-900">{{ entry.startTime }} - {{ entry.endTime }}</dd>
          </div>
          <div v-if="entry.breakDuration">
            <dt class="text-sm font-medium text-gray-500">Break Duration</dt>
            <dd class="text-sm text-gray-900">{{ entry.breakDuration }} minutes</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Regular Hours</dt>
            <dd class="text-sm text-gray-900 font-semibold">{{ entry.regularHours }}h</dd>
          </div>
          <div v-if="entry.overtimeHours">
            <dt class="text-sm font-medium text-gray-500">Overtime Hours</dt>
            <dd class="text-sm text-gray-900 font-semibold text-orange-600">{{ entry.overtimeHours }}h</dd>
          </div>
          <div v-if="entry.workType">
            <dt class="text-sm font-medium text-gray-500">Work Type</dt>
            <dd class="text-sm text-gray-900 capitalize">{{ entry.workType.replace('_', ' ') }}</dd>
          </div>
          <div v-if="entry.location">
            <dt class="text-sm font-medium text-gray-500">Location</dt>
            <dd class="text-sm text-gray-900 capitalize">{{ entry.location.replace('_', ' ') }}</dd>
          </div>
        </dl>
      </div>

      <!-- Work Details -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Work Details</h3>
        <dl class="space-y-3">
          <div v-if="entry.project">
            <dt class="text-sm font-medium text-gray-500">Project</dt>
            <dd class="text-sm text-gray-900 font-medium">{{ entry.project }}</dd>
          </div>
          <div v-if="entry.task">
            <dt class="text-sm font-medium text-gray-500">Task/Activity</dt>
            <dd class="text-sm text-gray-900">{{ entry.task }}</dd>
          </div>
          <div v-if="entry.description">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="text-sm text-gray-900 whitespace-pre-wrap">{{ entry.description }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Billing and Status Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Billing Information -->
      <div v-if="entry.billable" class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Billable</dt>
            <dd class="text-sm text-gray-900">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Yes
              </span>
            </dd>
          </div>
          <div v-if="entry.billingRate">
            <dt class="text-sm font-medium text-gray-500">Billing Rate</dt>
            <dd class="text-sm text-gray-900 font-semibold">${{ entry.billingRate }}/hour</dd>
          </div>
          <div v-if="entry.billingRate">
            <dt class="text-sm font-medium text-gray-500">Total Billable Amount</dt>
            <dd class="text-lg font-bold text-green-600">
              ${{ ((entry.regularHours + (entry.overtimeHours || 0)) * entry.billingRate).toFixed(2) }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Status and Approval -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Status & Timeline</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Current Status</dt>
            <dd class="text-sm text-gray-900">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                  entry.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                  entry.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800',
                ]"
              >
                {{ formatStatus(entry.status) }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created</dt>
            <dd class="text-sm text-gray-900">{{ new Date(entry.createdAt || entry.date).toLocaleDateString() }}</dd>
          </div>
          <div v-if="entry.submittedAt">
            <dt class="text-sm font-medium text-gray-500">Submitted</dt>
            <dd class="text-sm text-gray-900">{{ new Date(entry.submittedAt).toLocaleDateString() }}</dd>
          </div>
          <div v-if="entry.approvedAt">
            <dt class="text-sm font-medium text-gray-500">Approved</dt>
            <dd class="text-sm text-gray-900">{{ new Date(entry.approvedAt).toLocaleDateString() }}</dd>
          </div>
          <div v-if="entry.approvedBy">
            <dt class="text-sm font-medium text-gray-500">Approved By</dt>
            <dd class="text-sm text-gray-900">{{ entry.approvedBy }}</dd>
          </div>
          <div v-if="entry.rejectionReason">
            <dt class="text-sm font-medium text-gray-500">Rejection Reason</dt>
            <dd class="text-sm text-red-600">{{ entry.rejectionReason }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Comments/Notes Section -->
    <div v-if="entry.comments && entry.comments.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
      <div class="space-y-4">
        <div v-for="comment in entry.comments" :key="comment.id" class="border-l-4 border-gray-200 pl-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ comment.author }}</p>
              <p class="text-xs text-gray-500">{{ new Date(comment.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 mt-1">{{ comment.text }}</p>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex justify-between items-center pt-4 border-t">
      <div>
        <button
          v-if="entry.status === 'draft'"
          @click="editEntry"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Edit Entry
        </button>
      </div>
      <div class="flex space-x-3">
        <button
          @click="exportEntry"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Export
        </button>
        <button
          @click="printEntry"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Print
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TimesheetEntry } from '../types'

interface Props {
  entry: TimesheetEntry
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [entry: TimesheetEntry]
  export: [entry: TimesheetEntry]
  print: [entry: TimesheetEntry]
}>()

const totalHours = computed(() => {
  return props.entry.regularHours + (props.entry.overtimeHours || 0)
})

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0, 2)
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function editEntry() {
  emit('edit', props.entry)
}

function exportEntry() {
  emit('export', props.entry)
}

function printEntry() {
  emit('print', props.entry)
  // Basic print functionality
  window.print()
}
</script>