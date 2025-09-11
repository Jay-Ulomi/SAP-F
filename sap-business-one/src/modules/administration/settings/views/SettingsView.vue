<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">System Settings</h1>
        <p class="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>
      <button
        @click="saveAllSettings"
        :disabled="!hasChanges || loading"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>

    <!-- Settings Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- General Settings Tab -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  v-model="settings.general.companyName"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                <input
                  v-model="settings.general.taxId"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                <select
                  v-model="settings.general.defaultCurrency"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select
                  v-model="settings.general.timeZone"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">GMT</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">System Preferences</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  id="maintenance-mode"
                  v-model="settings.general.maintenanceMode"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="maintenance-mode" class="ml-2 block text-sm text-gray-900">
                  Enable Maintenance Mode
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="debug-mode"
                  v-model="settings.general.debugMode"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="debug-mode" class="ml-2 block text-sm text-gray-900">
                  Enable Debug Mode
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings Tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
                <input
                  v-model="settings.security.minPasswordLength"
                  type="number"
                  min="6"
                  max="20"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password Expiry (days)</label>
                <input
                  v-model="settings.security.passwordExpiryDays"
                  type="number"
                  min="0"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                <input
                  v-model="settings.security.maxLoginAttempts"
                  type="number"
                  min="3"
                  max="10"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                <input
                  v-model="settings.security.sessionTimeout"
                  type="number"
                  min="15"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Security Features</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  id="require-2fa"
                  v-model="settings.security.require2FA"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="require-2fa" class="ml-2 block text-sm text-gray-900">
                  Require Two-Factor Authentication for all users
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="password-complexity"
                  v-model="settings.security.passwordComplexity"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="password-complexity" class="ml-2 block text-sm text-gray-900">
                  Enforce password complexity requirements
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="ip-whitelist"
                  v-model="settings.security.enableIPWhitelist"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="ip-whitelist" class="ml-2 block text-sm text-gray-900">
                  Enable IP Address Whitelist
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Settings Tab -->
        <div v-if="activeTab === 'email'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">SMTP Configuration</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SMTP Server</label>
                <input
                  v-model="settings.email.smtpHost"
                  type="text"
                  placeholder="smtp.example.com"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Port</label>
                <input
                  v-model="settings.email.smtpPort"
                  type="number"
                  placeholder="587"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  v-model="settings.email.smtpUser"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  v-model="settings.email.smtpPassword"
                  type="password"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                <input
                  v-model="settings.email.fromEmail"
                  type="email"
                  placeholder="noreply@company.com"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                <input
                  v-model="settings.email.fromName"
                  type="text"
                  placeholder="Company Name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Email Features</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  id="use-ssl"
                  v-model="settings.email.useSSL"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="use-ssl" class="ml-2 block text-sm text-gray-900">
                  Use SSL/TLS encryption
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="email-notifications"
                  v-model="settings.email.enableNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="email-notifications" class="ml-2 block text-sm text-gray-900">
                  Enable email notifications
                </label>
              </div>
            </div>
            
            <div class="mt-4">
              <button
                @click="testEmailConfiguration"
                :disabled="loading"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Test Email Configuration
              </button>
            </div>
          </div>
        </div>

        <!-- API Settings Tab -->
        <div v-if="activeTab === 'api'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">API Configuration</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  id="enable-api"
                  v-model="settings.api.enableAPI"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="enable-api" class="ml-2 block text-sm text-gray-900">
                  Enable API Access
                </label>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rate Limit (requests/minute)</label>
                  <input
                    v-model="settings.api.rateLimit"
                    type="number"
                    min="10"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Version</label>
                  <select
                    v-model="settings.api.version"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="v1">Version 1.0</option>
                    <option value="v2">Version 2.0</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Master API Key</span>
                <button
                  @click="regenerateAPIKey"
                  class="text-sm text-sap-blue hover:text-sap-dark-blue"
                >
                  Regenerate
                </button>
              </div>
              <div class="font-mono text-sm text-gray-600 bg-white p-2 rounded border">
                {{ settings.api.masterKey }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useSettingsStore } from '../stores'

// Store
const settingsStore = useSettingsStore()

// Reactive data
const activeTab = ref('general')
const hasChanges = ref(false)

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'security', name: 'Security' },
  { id: 'email', name: 'Email' },
  { id: 'api', name: 'API' },
]

// Settings form
const settings = reactive({
  general: {
    companyName: 'SAP Business One Demo',
    taxId: 'TAX123456789',
    defaultCurrency: 'USD',
    timeZone: 'America/New_York',
    maintenanceMode: false,
    debugMode: false,
  },
  security: {
    minPasswordLength: 8,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 60,
    require2FA: false,
    passwordComplexity: true,
    enableIPWhitelist: false,
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'noreply@company.com',
    fromName: 'SAP Business One',
    useSSL: true,
    enableNotifications: true,
  },
  api: {
    enableAPI: true,
    rateLimit: 100,
    version: 'v2',
    masterKey: 'sk_live_1234567890abcdef',
  },
})

// Computed properties
const loading = computed(() => settingsStore.loading)

// Methods
const saveAllSettings = async () => {
  try {
    await settingsStore.saveSettings(settings)
    hasChanges.value = false
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}

const testEmailConfiguration = async () => {
  try {
    await settingsStore.testEmailConfiguration(settings.email)
    alert('Test email sent successfully!')
  } catch (error) {
    alert('Failed to send test email. Please check your configuration.')
  }
}

const regenerateAPIKey = () => {
  if (confirm('Are you sure you want to regenerate the API key? This will invalidate the current key.')) {
    settings.api.masterKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    hasChanges.value = true
  }
}

// Watch for changes
const watchSettings = () => {
  // Simple change detection
  const originalSettings = JSON.stringify(settings)
  setInterval(() => {
    hasChanges.value = JSON.stringify(settings) !== originalSettings
  }, 1000)
}

// Initialize
onMounted(async () => {
  await settingsStore.loadSettings()
  watchSettings()
})
</script>