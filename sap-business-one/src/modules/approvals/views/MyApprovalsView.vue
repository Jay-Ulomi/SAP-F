<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">My Approvals</h1>
        <p class="mt-2 text-sm text-gray-700">
          Documents requiring your approval and your approval history.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="refreshData"
          :disabled="loading"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <ArrowPathIcon v-if="!loading" class="w-4 h-4 mr-2" />
          <div v-else class="w-4 h-4 mr-2 animate-spin border-2 border-gray-300 border-t-gray-700 rounded-full"></div>
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-yellow-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Pending My Approval
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ myPendingApprovals.length }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Approved Today
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.approvedToday || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Rejected Today
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.rejectedToday || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CalendarDaysIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    This Month
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ thisMonthCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-8">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          v-model="activeTab"
          class="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="pending">Pending My Approval</option>
          <option value="history">My Approval History</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'pending'"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Pending My Approval
              <span
                v-if="myPendingApprovals.length > 0"
                class="ml-2 bg-red-100 text-red-600 py-0.5 px-2.5 rounded-full text-xs font-medium"
              >
                {{ myPendingApprovals.length }}
              </span>
            </button>
            <button
              @click="activeTab = 'history'"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              My Approval History
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Pending Approvals Tab -->
    <div v-if="activeTab === 'pending'" class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Documents Awaiting Your Approval</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Review and approve/reject documents assigned to you.
          </p>
        </div>

        <div v-if="loading" class="px-4 py-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-sm text-gray-500">Loading pending approvals...</p>
        </div>

        <div v-else-if="myPendingApprovals.length === 0" class="px-4 py-8 text-center">
          <CheckCircleIcon class="mx-auto h-12 w-12 text-green-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
          <p class="mt-1 text-sm text-gray-500">You have no pending approvals at this time.</p>
        </div>

        <ul v-else class="divide-y divide-gray-200">
          <li v-for="instance in myPendingApprovals" :key="instance.id" class="px-4 py-6 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getPriorityBadgeClass(instance.amount)
                      ]"
                    >
                      {{ getPriorityText(instance.amount) }}
                    </span>
                  </div>
                  <div class="ml-4 flex-1 min-w-0">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ instance.documentId }}
                      </p>
                      <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {{ formatDocumentType(instance.documentType) }}
                      </span>
                    </div>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <p class="truncate">
                        Initiated by {{ instance.initiatorName }} • {{ formatDepartment(instance.department) }}
                      </p>
                      <span class="mx-2">•</span>
                      <p class="font-medium text-green-600">
                        {{ formatCurrency(instance.amount) }}
                      </p>
                    </div>
                    <div class="mt-1 text-xs text-gray-400">
                      Submitted {{ formatRelativeTime(instance.createdAt) }}
                    </div>
                  </div>
                </div>

                <!-- My Approval Step -->
                <div class="mt-4 bg-blue-50 rounded-lg p-3">
                  <div class="flex items-center">
                    <UserIcon class="h-5 w-5 text-blue-600" />
                    <span class="ml-2 text-sm font-medium text-blue-900">
                      Your Approval Required (Level {{ getCurrentApprovalLevel(instance) }})
                    </span>
                  </div>
                  <div class="mt-2">
                    <div class="flex space-x-3">
                      <button
                        @click="showApprovalModal(instance, 'APPROVE')"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckIcon class="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        @click="showApprovalModal(instance, 'REJECT')"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XMarkIcon class="h-4 w-4 mr-1" />
                        Reject
                      </button>
                      <button
                        @click="viewInstanceDetails(instance)"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <EyeIcon class="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Approval History Tab -->
    <div v-if="activeTab === 'history'" class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">My Approval History</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Documents you have previously approved or rejected.
          </p>
        </div>

        <!-- History filters -->
        <div class="px-4 py-4 border-b border-gray-200">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label for="historyAction" class="block text-sm font-medium text-gray-700">Action</label>
              <select
                id="historyAction"
                v-model="historyFilters.action"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Actions</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label for="historyDateRange" class="block text-sm font-medium text-gray-700">Date Range</label>
              <select
                id="historyDateRange"
                v-model="historyFilters.dateRange"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div>
              <label for="historySearch" class="block text-sm font-medium text-gray-700">Search</label>
              <input
                id="historySearch"
                type="text"
                v-model="historyFilters.search"
                placeholder="Document ID, initiator..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div v-if="approvalHistory.length === 0" class="px-4 py-8 text-center">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No approval history</h3>
          <p class="mt-1 text-sm text-gray-500">You haven't approved or rejected any documents yet.</p>
        </div>

        <ul v-else class="divide-y divide-gray-200">
          <li v-for="history in filteredHistory" :key="history.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      history.action === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ history.action }}
                  </span>
                  <div class="ml-4 flex-1 min-w-0">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ history.documentId }}
                      </p>
                      <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {{ formatDocumentType(history.documentType) }}
                      </span>
                    </div>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <p class="truncate">{{ formatRelativeTime(history.timestamp) }}</p>
                      <span v-if="history.comments" class="mx-2">•</span>
                      <p v-if="history.comments" class="truncate italic">{{ history.comments }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Approval Action Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ modalAction === 'APPROVE' ? 'Approve Document' : 'Reject Document' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-600">Document: {{ selectedInstance?.documentId }}</p>
            <p class="text-sm text-gray-600">Amount: {{ formatCurrency(selectedInstance?.amount || 0) }}</p>
          </div>

          <div class="mb-4">
            <label for="comments" class="block text-sm font-medium text-gray-700 mb-2">
              Comments {{ modalAction === 'REJECT' ? '(Required)' : '(Optional)' }}
            </label>
            <textarea
              id="comments"
              v-model="approvalComments"
              rows="3"
              :required="modalAction === 'REJECT'"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :placeholder="modalAction === 'APPROVE' ? 'Optional approval comments...' : 'Please provide reason for rejection...'"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="submitApproval"
              :disabled="modalAction === 'REJECT' && !approvalComments.trim()"
              :class="[
                'px-4 py-2 text-sm font-medium text-white rounded-md',
                modalAction === 'APPROVE'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              ]"
            >
              {{ modalAction === 'APPROVE' ? 'Approve' : 'Reject' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import type { ApprovalInstance, ApprovalAction, ApprovalHistory } from '../types'
import {
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarDaysIcon,
  UserIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

// Store
const approvalsStore = useApprovalsStore()

// Reactive state
const activeTab = ref('pending')
const showModal = ref(false)
const modalAction = ref<'APPROVE' | 'REJECT'>('APPROVE')
const selectedInstance = ref<ApprovalInstance | null>(null)
const approvalComments = ref('')

const historyFilters = ref({
  action: '',
  dateRange: 'month',
  search: ''
})

// Computed
const loading = computed(() => approvalsStore.loading)
const myPendingApprovals = computed(() => approvalsStore.myPendingApprovals)
const approvalHistory = computed(() => approvalsStore.approvalHistory)
const stats = computed(() => approvalsStore.stats)

const thisMonthCount = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()

  return approvalHistory.value.filter(history => {
    const historyDate = new Date(history.timestamp)
    return historyDate.getMonth() === thisMonth && historyDate.getFullYear() === thisYear
  }).length
})

const filteredHistory = computed(() => {
  let history = approvalHistory.value

  if (historyFilters.value.action) {
    history = history.filter(h => h.action === historyFilters.value.action)
  }

  if (historyFilters.value.search) {
    const search = historyFilters.value.search.toLowerCase()
    history = history.filter(h =>
      h.documentId.toLowerCase().includes(search) ||
      h.approverName.toLowerCase().includes(search)
    )
  }

  return history
})

// Methods
const refreshData = async () => {
  try {
    await Promise.all([
      approvalsStore.fetchApprovalInstances(),
      approvalsStore.fetchStats()
    ])
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}

const getCurrentApprovalLevel = (instance: ApprovalInstance): number => {
  const currentUserId = 'current-user-id' // Get from auth store
  const myApproval = instance.approvals.find(approval => approval.approverId === currentUserId)
  return myApproval?.level || instance.currentLevel
}

const getPriorityBadgeClass = (amount: number): string => {
  if (amount > 1000000) return 'bg-red-100 text-red-800'
  if (amount > 500000) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getPriorityText = (amount: number): string => {
  if (amount > 1000000) return 'High Priority'
  if (amount > 500000) return 'Medium Priority'
  return 'Normal Priority'
}

const showApprovalModal = (instance: ApprovalInstance, action: 'APPROVE' | 'REJECT') => {
  selectedInstance.value = instance
  modalAction.value = action
  approvalComments.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedInstance.value = null
  approvalComments.value = ''
}

const submitApproval = async () => {
  if (!selectedInstance.value) return

  try {
    const currentUserId = 'current-user-id' // Get from auth store
    const currentUserName = 'Current User' // Get from auth store

    const approvalAction: ApprovalAction = {
      action: modalAction.value,
      approverId: currentUserId,
      approverName: currentUserName,
      comments: approvalComments.value.trim() || undefined
    }

    await approvalsStore.processApproval(selectedInstance.value.id, approvalAction)
    await refreshData()
    closeModal()
  } catch (error) {
    console.error('Error submitting approval:', error)
  }
}

const viewInstanceDetails = (instance: ApprovalInstance) => {
  // Implement view details logic
  console.log('View instance details:', instance)
}

const formatDocumentType = (type: string): string => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatDepartment = (department: string): string => {
  return department.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days ago`

  return date.toLocaleDateString()
}

// Lifecycle
onMounted(async () => {
  await refreshData()
})
</script>