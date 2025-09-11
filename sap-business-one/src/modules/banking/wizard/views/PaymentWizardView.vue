<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Payment Wizard</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Wizard
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Wizards</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.totalWizards || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Wizards</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.activeWizards || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed Wizards</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.completedWizards || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Amount</p>
            <p class="text-xl font-bold text-gray-900">
              ${{ formatNumber(stats?.totalAmount || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search wizards..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        />
        <select
          v-model="filters.status"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="PENDING_APPROVAL">Pending Approval</option>
          <option value="APPROVED">Approved</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select
          v-model="filters.wizardType"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="SINGLE_PAYMENT">Single Payment</option>
          <option value="BATCH_PAYMENT">Batch Payment</option>
          <option value="RECURRING_PAYMENT">Recurring Payment</option>
          <option value="PAYROLL_PAYMENT">Payroll Payment</option>
          <option value="VENDOR_PAYMENT">Vendor Payment</option>
          <option value="CUSTOMER_REFUND">Customer Refund</option>
          <option value="TAX_PAYMENT">Tax Payment</option>
          <option value="LOAN_PAYMENT">Loan Payment</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Wizards Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Payment Wizards</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Wizard
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Progress
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">Loading wizards...</td>
            </tr>
            <tr v-else-if="wizards.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">No wizards found.</td>
            </tr>
            <tr v-for="wizard in wizards" :key="wizard.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ wizard.title }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ wizard.wizardNumber }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatWizardType(wizard.wizardType) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getPriorityClass(wizard.priority)"
                >
                  {{ formatPriority(wizard.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ formatNumber(wizard.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      class="bg-indigo-600 h-2 rounded-full"
                      :style="{ width: `${calculateProgress(wizard)}%` }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-500">{{ calculateProgress(wizard) }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusClass(wizard.status)"
                >
                  {{ formatStatus(wizard.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewWizard(wizard)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="editWizard(wizard)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="startWizard(wizard.id)"
                    v-if="wizard.status === 'DRAFT'"
                    class="text-green-600 hover:text-green-900"
                    title="Start"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="approveWizard(wizard.id)"
                    v-if="wizard.status === 'PENDING_APPROVAL'"
                    class="text-green-600 hover:text-green-900"
                    title="Approve"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteWizard(wizard.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingWizard ? 'Edit Payment Wizard' : 'Create New Payment Wizard' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <PaymentWizardForm
          :wizard="editingWizard"
          :loading="loading"
          @submit="handleSubmitWizard"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Wizard Modal -->
    <div
      v-if="viewingWizard"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">View Payment Wizard Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <PaymentWizardView :wizard="viewingWizard" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { usePaymentWizardStore } from '../stores'
import type { PaymentWizard, PaymentWizardFormData } from '../types'
const PaymentWizardForm = defineAsyncComponent(() => import('../components/PaymentWizardForm.vue'))
const PaymentWizardView = defineAsyncComponent(() => import('../components/PaymentWizardView.vue'))

const wizardStore = usePaymentWizardStore()

const showCreateModal = ref(false)
const editingWizard = ref<PaymentWizard | null>(null)
const viewingWizard = ref<PaymentWizard | null>(null)
const searchQuery = ref('')
const filters = ref({
  status: '',
  wizardType: '',
})

const wizards = computed(() => wizardStore.wizards)
const loading = computed(() => wizardStore.loading)
const stats = computed(() => wizardStore.stats)

const openCreateModal = () => {
  editingWizard.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingWizard.value = null
}

const closeViewModal = () => {
  viewingWizard.value = null
}

const viewWizard = (wizard: PaymentWizard) => {
  viewingWizard.value = wizard
}

const editWizard = (wizard: PaymentWizard) => {
  editingWizard.value = wizard
  showCreateModal.value = true
}

const handleSubmitWizard = async (data: PaymentWizardFormData) => {
  try {
    if (editingWizard.value) {
      await wizardStore.updateWizard(editingWizard.value.id, data)
    } else {
      await wizardStore.createWizard(data)
    }
    closeCreateModal()
    await wizardStore.loadWizards()
    await wizardStore.loadStats()
  } catch (error) {
    console.error('Failed to save wizard:', error)
  }
}

const deleteWizard = async (id: string) => {
  if (!confirm('Delete this payment wizard?')) return
  try {
    await wizardStore.deleteWizard(id)
    await wizardStore.loadWizards()
    await wizardStore.loadStats()
  } catch (error) {
    console.error('Failed to delete wizard:', error)
  }
}

const startWizard = async (id: string) => {
  try {
    await wizardStore.startWizard(id)
    await wizardStore.loadWizards()
    await wizardStore.loadStats()
  } catch (error) {
    console.error('Failed to start wizard:', error)
  }
}

const approveWizard = async (id: string) => {
  try {
    await wizardStore.approveWizard(id)
    await wizardStore.loadWizards()
    await wizardStore.loadStats()
  } catch (error) {
    console.error('Failed to approve wizard:', error)
  }
}

const applyFilters = () => {
  // Implementation for applying filters
  console.log('Apply filters:', filters.value)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = { status: '', wizardType: '' }
}

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatWizardType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPriority = (priority: string) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()
}

const getStatusClass = (status: string) => {
  const classes = {
    DRAFT: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    PENDING_APPROVAL: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    PROCESSING: 'bg-indigo-100 text-indigo-800',
    COMPLETED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority: string) => {
  const classes = {
    LOW: 'bg-gray-100 text-gray-800',
    NORMAL: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  }
  return classes[priority as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const calculateProgress = (wizard: PaymentWizard) => {
  if (wizard.paymentCount === 0) return 0
  return Math.round((wizard.completedPayments / wizard.paymentCount) * 100)
}

onMounted(() => {
  // Load initial data
  wizardStore.loadWizards()
  wizardStore.loadStats()
})
</script>
