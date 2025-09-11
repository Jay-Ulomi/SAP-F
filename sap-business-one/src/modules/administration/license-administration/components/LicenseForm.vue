<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic License Information -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">License Information</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">License Name *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter license name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">License Key *</label>
          <input
            v-model="form.licenseKey"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter license key"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">License Type *</label>
          <select
            v-model="form.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select license type</option>
            <option value="USER">User License</option>
            <option value="SERVER">Server License</option>
            <option value="MODULE">Module License</option>
            <option value="ADDON">Add-on License</option>
            <option value="DEVELOPER">Developer License</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="form.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
          <input
            v-model="form.expiryDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">License Cost</label>
          <input
            v-model="form.cost"
            type="number"
            min="0"
            step="0.01"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>

    <!-- User Allocation -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">User Allocation</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Maximum Users *</label>
          <input
            v-model="form.maxUsers"
            type="number"
            min="1"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter maximum number of users"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Currently Assigned Users</label>
          <input
            v-model="form.assignedUsers"
            type="number"
            min="0"
            :max="form.maxUsers"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="0"
          />
        </div>
      </div>

      <div class="mt-4">
        <div class="bg-white rounded-lg p-4 border">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Usage:</span>
            <span class="font-medium">{{ form.assignedUsers || 0 }} / {{ form.maxUsers || 0 }} users</span>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="{
                  'bg-green-500': usagePercentage <= 70,
                  'bg-yellow-500': usagePercentage > 70 && usagePercentage <= 90,
                  'bg-red-500': usagePercentage > 90
                }"
                :style="{ width: usagePercentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- License Details -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Additional Details</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
          <input
            v-model="form.vendor"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter vendor name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Version</label>
          <input
            v-model="form.version"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter version"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter license description"
          ></textarea>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="form.notes"
            rows="2"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter any additional notes"
          ></textarea>
        </div>
      </div>

      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input
            id="auto-renewal"
            v-model="form.autoRenewal"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="auto-renewal" class="ml-2 block text-sm text-gray-900">
            Enable auto-renewal
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="send-notifications"
            v-model="form.sendNotifications"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="send-notifications" class="ml-2 block text-sm text-gray-900">
            Send expiration notifications
          </label>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">{{ license ? 'Updating...' : 'Creating...' }}</span>
        <span v-else>{{ license ? 'Update License' : 'Create License' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'

interface License {
  id: string
  name: string
  licenseKey: string
  type: string
  status: string
  expiryDate: string
  assignedUsers: number
  maxUsers: number
  cost: number
  vendor?: string
  version?: string
  description?: string
  notes?: string
  autoRenewal?: boolean
  sendNotifications?: boolean
}

interface Props {
  license?: License | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: Partial<License>): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const form = reactive({
  name: '',
  licenseKey: '',
  type: '',
  status: 'ACTIVE',
  expiryDate: '',
  assignedUsers: 0,
  maxUsers: 1,
  cost: 0,
  vendor: '',
  version: '',
  description: '',
  notes: '',
  autoRenewal: false,
  sendNotifications: true,
})

// Computed
const usagePercentage = computed(() => {
  if (!form.maxUsers) return 0
  return Math.min((form.assignedUsers / form.maxUsers) * 100, 100)
})

// Handle form submission
const handleSubmit = () => {
  const data = { ...form }
  emit('submit', data)
}

// Watch for license prop changes
watch(
  () => props.license,
  (newLicense) => {
    if (newLicense) {
      // Populate form with license data
      Object.assign(form, {
        name: newLicense.name,
        licenseKey: newLicense.licenseKey,
        type: newLicense.type,
        status: newLicense.status,
        expiryDate: newLicense.expiryDate,
        assignedUsers: newLicense.assignedUsers,
        maxUsers: newLicense.maxUsers,
        cost: newLicense.cost,
        vendor: newLicense.vendor || '',
        version: newLicense.version || '',
        description: newLicense.description || '',
        notes: newLicense.notes || '',
        autoRenewal: newLicense.autoRenewal || false,
        sendNotifications: newLicense.sendNotifications !== false,
      })
    } else {
      // Reset form for new license
      Object.assign(form, {
        name: '',
        licenseKey: '',
        type: '',
        status: 'ACTIVE',
        expiryDate: '',
        assignedUsers: 0,
        maxUsers: 1,
        cost: 0,
        vendor: '',
        version: '',
        description: '',
        notes: '',
        autoRenewal: false,
        sendNotifications: true,
      })
    }
  },
  { immediate: true }
)
</script>