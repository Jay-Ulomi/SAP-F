<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Approval Settings</h1>
        <p class="mt-2 text-sm text-gray-700">
          Configure global approval workflow settings and preferences.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="saveSettings"
          :disabled="loading || !hasChanges"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <CheckIcon v-if="!loading" class="w-4 h-4 mr-2" />
          <div v-else class="w-4 h-4 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
          Save Settings
        </button>
      </div>
    </div>

    <!-- Settings Sections -->
    <div class="mt-8 space-y-8">
      <!-- General Settings -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Basic approval workflow configuration.
          </p>
        </div>
        <div class="px-4 py-5 sm:p-6 space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="defaultApprovalMode" class="block text-sm font-medium text-gray-700">
                Default Approval Mode
              </label>
              <select
                id="defaultApprovalMode"
                v-model="settings.general.defaultApprovalMode"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="sequential">Sequential (One by one)</option>
                <option value="parallel">Parallel (All at once)</option>
                <option value="any">Any (First approval wins)</option>
              </select>
              <p class="mt-2 text-sm text-gray-500">
                How multiple approvers should be handled by default.
              </p>
            </div>

            <div>
              <label for="autoReminder" class="block text-sm font-medium text-gray-700">
                Auto-reminder Frequency
              </label>
              <select
                id="autoReminder"
                v-model="settings.general.autoReminderFrequency"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="none">Disabled</option>
                <option value="daily">Daily</option>
                <option value="every-2-days">Every 2 days</option>
                <option value="weekly">Weekly</option>
              </select>
              <p class="mt-2 text-sm text-gray-500">
                Frequency of automatic reminder emails for pending approvals.
              </p>
            </div>

            <div>
              <label for="escalationDelay" class="block text-sm font-medium text-gray-700">
                Escalation Delay (hours)
              </label>
              <input
                id="escalationDelay"
                type="number"
                v-model.number="settings.general.escalationDelayHours"
                min="1"
                max="168"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p class="mt-2 text-sm text-gray-500">
                Hours before escalating to next approver or manager.
              </p>
            </div>

            <div>
              <label for="maxApprovalLevels" class="block text-sm font-medium text-gray-700">
                Maximum Approval Levels
              </label>
              <input
                id="maxApprovalLevels"
                type="number"
                v-model.number="settings.general.maxApprovalLevels"
                min="1"
                max="10"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p class="mt-2 text-sm text-gray-500">
                Maximum number of approval levels allowed in a workflow.
              </p>
            </div>
          </div>

          <!-- Toggle Settings -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Allow Self-Approval</h4>
                <p class="text-sm text-gray-500">Allow users to approve their own requests</p>
              </div>
              <button
                type="button"
                @click="settings.general.allowSelfApproval = !settings.general.allowSelfApproval"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.general.allowSelfApproval ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.general.allowSelfApproval ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Require Comments on Rejection</h4>
                <p class="text-sm text-gray-500">Force approvers to provide comments when rejecting</p>
              </div>
              <button
                type="button"
                @click="settings.general.requireCommentsOnRejection = !settings.general.requireCommentsOnRejection"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.general.requireCommentsOnRejection ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.general.requireCommentsOnRejection ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Auto-Approve Weekend Requests</h4>
                <p class="text-sm text-gray-500">Automatically approve low-value requests on weekends</p>
              </div>
              <button
                type="button"
                @click="settings.general.autoApproveWeekends = !settings.general.autoApproveWeekends"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.general.autoApproveWeekends ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.general.autoApproveWeekends ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Notifications -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Email Notifications</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Configure email notification preferences for approval workflow events.
          </p>
        </div>
        <div class="px-4 py-5 sm:p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">New Approval Request</h4>
                <p class="text-sm text-gray-500">Notify approvers when new requests are submitted</p>
              </div>
              <button
                type="button"
                @click="settings.notifications.newRequest = !settings.notifications.newRequest"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.notifications.newRequest ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.notifications.newRequest ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Approval Decision</h4>
                <p class="text-sm text-gray-500">Notify initiators when requests are approved/rejected</p>
              </div>
              <button
                type="button"
                @click="settings.notifications.decision = !settings.notifications.decision"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.notifications.decision ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.notifications.decision ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Escalation Alerts</h4>
                <p class="text-sm text-gray-500">Notify managers when approvals are escalated</p>
              </div>
              <button
                type="button"
                @click="settings.notifications.escalation = !settings.notifications.escalation"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.notifications.escalation ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.notifications.escalation ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Daily Digest</h4>
                <p class="text-sm text-gray-500">Send daily summary of pending approvals</p>
              </div>
              <button
                type="button"
                @click="settings.notifications.dailyDigest = !settings.notifications.dailyDigest"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.notifications.dailyDigest ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.notifications.dailyDigest ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="digestTime" class="block text-sm font-medium text-gray-700">
                Daily Digest Time
              </label>
              <input
                id="digestTime"
                type="time"
                v-model="settings.notifications.digestTime"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="emailTemplate" class="block text-sm font-medium text-gray-700">
                Email Template Style
              </label>
              <select
                id="emailTemplate"
                v-model="settings.notifications.emailTemplate"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- SLA Settings -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">SLA Configuration</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Set service level agreements for different approval types.
          </p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="space-y-6">
            <div v-for="sla in settings.sla" :key="sla.type" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ formatType(sla.type) }}</h4>
                <p class="text-sm text-gray-500">{{ getSLADescription(sla.type) }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <div>
                  <label :for="`sla-${sla.type}`" class="sr-only">SLA Hours</label>
                  <div class="flex items-center space-x-2">
                    <input
                      :id="`sla-${sla.type}`"
                      type="number"
                      v-model.number="sla.hours"
                      min="1"
                      max="168"
                      class="w-16 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <span class="text-sm text-gray-500">hours</span>
                  </div>
                </div>
                <button
                  type="button"
                  @click="sla.enabled = !sla.enabled"
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    sla.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      sla.enabled ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration Settings -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Integration Settings</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Configure integrations with external systems and APIs.
          </p>
        </div>
        <div class="px-4 py-5 sm:p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Microsoft Teams Integration</h4>
                <p class="text-sm text-gray-500">Send approval notifications to Teams channels</p>
              </div>
              <button
                type="button"
                @click="settings.integrations.teamsEnabled = !settings.integrations.teamsEnabled"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.integrations.teamsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.integrations.teamsEnabled ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Slack Integration</h4>
                <p class="text-sm text-gray-500">Send approval notifications to Slack channels</p>
              </div>
              <button
                type="button"
                @click="settings.integrations.slackEnabled = !settings.integrations.slackEnabled"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.integrations.slackEnabled ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.integrations.slackEnabled ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Webhook Notifications</h4>
                <p class="text-sm text-gray-500">Send approval events to external webhooks</p>
              </div>
              <button
                type="button"
                @click="settings.integrations.webhooksEnabled = !settings.integrations.webhooksEnabled"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  settings.integrations.webhooksEnabled ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    settings.integrations.webhooksEnabled ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>

          <div v-if="settings.integrations.webhooksEnabled" class="space-y-4">
            <div>
              <label for="webhookUrl" class="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <input
                id="webhookUrl"
                type="url"
                v-model="settings.integrations.webhookUrl"
                placeholder="https://your-system.com/webhook"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="webhookSecret" class="block text-sm font-medium text-gray-700">
                Webhook Secret (Optional)
              </label>
              <input
                id="webhookSecret"
                type="password"
                v-model="settings.integrations.webhookSecret"
                placeholder="Secret for request signing"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 flex justify-end space-x-3">
      <button
        @click="resetToDefaults"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Reset to Defaults
      </button>
      <button
        @click="saveSettings"
        :disabled="loading || !hasChanges"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Save Settings' }}
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccessMessage" class="mt-4 rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">
            Settings saved successfully!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { CheckIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

// Reactive state
const loading = ref(false)
const showSuccessMessage = ref(false)
const originalSettings = ref({})

const settings = reactive({
  general: {
    defaultApprovalMode: 'sequential',
    autoReminderFrequency: 'daily',
    escalationDelayHours: 24,
    maxApprovalLevels: 5,
    allowSelfApproval: false,
    requireCommentsOnRejection: true,
    autoApproveWeekends: false
  },
  notifications: {
    newRequest: true,
    decision: true,
    escalation: true,
    dailyDigest: true,
    digestTime: '09:00',
    emailTemplate: 'standard'
  },
  sla: [
    { type: 'OPEX', hours: 24, enabled: true },
    { type: 'FUEL_STAFF', hours: 12, enabled: true },
    { type: 'FUEL_BULK', hours: 48, enabled: true },
    { type: 'CAPEX', hours: 72, enabled: true }
  ],
  integrations: {
    teamsEnabled: false,
    slackEnabled: false,
    webhooksEnabled: false,
    webhookUrl: '',
    webhookSecret: ''
  }
})

// Computed
const hasChanges = computed(() => {
  return JSON.stringify(settings) !== JSON.stringify(originalSettings.value)
})

// Methods
const saveSettings = async () => {
  try {
    loading.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    originalSettings.value = JSON.parse(JSON.stringify(settings))
    showSuccessMessage.value = true

    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)

  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    loading.value = false
  }
}

const resetToDefaults = () => {
  if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
    Object.assign(settings, {
      general: {
        defaultApprovalMode: 'sequential',
        autoReminderFrequency: 'daily',
        escalationDelayHours: 24,
        maxApprovalLevels: 5,
        allowSelfApproval: false,
        requireCommentsOnRejection: true,
        autoApproveWeekends: false
      },
      notifications: {
        newRequest: true,
        decision: true,
        escalation: true,
        dailyDigest: true,
        digestTime: '09:00',
        emailTemplate: 'standard'
      },
      sla: [
        { type: 'OPEX', hours: 24, enabled: true },
        { type: 'FUEL_STAFF', hours: 12, enabled: true },
        { type: 'FUEL_BULK', hours: 48, enabled: true },
        { type: 'CAPEX', hours: 72, enabled: true }
      ],
      integrations: {
        teamsEnabled: false,
        slackEnabled: false,
        webhooksEnabled: false,
        webhookUrl: '',
        webhookSecret: ''
      }
    })
  }
}

const formatType = (type: string): string => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const getSLADescription = (type: string): string => {
  const descriptions: Record<string, string> = {
    'OPEX': 'Operational expense approvals',
    'FUEL_STAFF': 'Staff fuel allowance requests',
    'FUEL_BULK': 'Bulk fuel purchase orders',
    'CAPEX': 'Capital expenditure approvals'
  }
  return descriptions[type] || 'General approval type'
}

// Lifecycle
onMounted(() => {
  originalSettings.value = JSON.parse(JSON.stringify(settings))
})
</script>