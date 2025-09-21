<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Pending Approvals</h1>
        <p class="mt-2 text-sm text-gray-700">
          View and process documents awaiting approval across the organization.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="refreshInstances"
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
                    Total Pending
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ approvalInstances.length }}
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
                <ExclamationTriangleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    High Priority
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ highPriorityCount }}
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
                <UserIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Awaiting Me
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
                <CalendarDaysIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Due Today
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ dueTodayCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-8 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              v-model="filters.department"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              <option value="SALES">Sales</option>
              <option value="OPERATIONS">Operations</option>
              <option value="HUMAN_RESOURCE">Human Resource</option>
              <option value="FINANCE">Finance</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
            </select>
          </div>

          <div>
            <label for="documentType" class="block text-sm font-medium text-gray-700">Document Type</label>
            <select
              id="documentType"
              v-model="filters.documentType"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Document Types</option>
              <option value="PURCHASE_REQUEST">Purchase Request</option>
              <option value="PURCHASE_ORDER">Purchase Order</option>
              <option value="AP_INVOICE">AP Invoice</option>
              <option value="AR_INVOICE">AR Invoice</option>
              <option value="DELIVERY">Delivery</option>
              <option value="RETURN">Return</option>
            </select>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              v-model="filters.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div>
            <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
            <input
              id="search"
              type="text"
              v-model="filters.search"
              placeholder="Document ID, initiator..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Instances Table -->
    <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Approval Instances</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Documents currently in the approval workflow.
        </p>
      </div>

      <div v-if="loading" class="px-4 py-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-sm text-gray-500">Loading approval instances...</p>
      </div>

      <div v-else-if="filteredInstances.length === 0" class="px-4 py-8 text-center">
        <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No approval instances</h3>
        <p class="mt-1 text-sm text-gray-500">No documents are currently awaiting approval.</p>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="instance in filteredInstances" :key="instance.id" class="px-4 py-6 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusBadgeClass(instance.status)
                    ]"
                  >
                    {{ formatStatus(instance.status) }}
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
                      {{ instance.initiatorName }} • {{ formatDepartment(instance.department) }}
                    </p>
                    <span class="mx-2">•</span>
                    <p class="font-medium text-green-600">
                      {{ formatCurrency(instance.amount) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Approval Progress -->
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Approval Progress</span>
                  <span class="text-gray-600">Level {{ instance.currentLevel }} of {{ instance.maxLevel }}</span>
                </div>
                <div class="mt-2">
                  <div class="bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${(instance.currentLevel / instance.maxLevel) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Current Approvers -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="approval in instance.approvals"
                    :key="approval.level"
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                      getApprovalBadgeClass(approval.status)
                    ]"
                  >
                    {{ approval.approverName }}
                    <CheckIcon v-if="approval.status === 'APPROVED'" class="ml-1 h-3 w-3" />
                    <XMarkIcon v-else-if="approval.status === 'REJECTED'" class="ml-1 h-3 w-3" />
                    <ClockIcon v-else class="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 ml-4">
              <div class="flex space-x-2">
                <button
                  @click="viewInstance(instance)"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <EyeIcon class="h-4 w-4 mr-1" />
                  View
                </button>
                <button
                  v-if="canApprove(instance)"
                  @click="processApproval(instance, 'APPROVE')"
                  class="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckIcon class="h-4 w-4 mr-1" />
                  Approve
                </button>
                <button
                  v-if="canApprove(instance)"
                  @click="processApproval(instance, 'REJECT')"
                  class="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <XMarkIcon class="h-4 w-4 mr-1" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="mt-6">
      <nav class="flex items-center justify-between">
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import type { ApprovalInstance, ApprovalAction } from '../types'
import {
  ArrowPathIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarDaysIcon,
  DocumentIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

// Store
const approvalsStore = useApprovalsStore()

// Reactive state
const filters = ref({
  department: '',
  documentType: '',
  status: '',
  search: ''
})

// Computed
const loading = computed(() => approvalsStore.loading)
const approvalInstances = computed(() => approvalsStore.approvalInstances)
const myPendingApprovals = computed(() => approvalsStore.myPendingApprovals)
const pagination = computed(() => approvalsStore.pagination)

const filteredInstances = computed(() => {
  let instances = approvalInstances.value

  if (filters.value.department) {
    instances = instances.filter(instance => instance.department === filters.value.department)
  }

  if (filters.value.documentType) {
    instances = instances.filter(instance => instance.documentType === filters.value.documentType)
  }

  if (filters.value.status) {
    instances = instances.filter(instance => instance.status === filters.value.status)
  }

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    instances = instances.filter(instance =>
      instance.documentId.toLowerCase().includes(search) ||
      instance.initiatorName.toLowerCase().includes(search)
    )
  }

  return instances
})

const highPriorityCount = computed(() => {
  return approvalInstances.value.filter(instance =>
    instance.amount > 1000000 && instance.status === 'PENDING_APPROVAL'
  ).length
})

const dueTodayCount = computed(() => {
  const today = new Date()
  return approvalInstances.value.filter(instance => {
    const createdDate = new Date(instance.createdAt)
    const daysDiff = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysDiff >= 1 && instance.status === 'PENDING_APPROVAL'
  }).length
})

// Methods
const refreshInstances = async () => {
  try {
    await approvalsStore.fetchApprovalInstances()
  } catch (error) {
    console.error('Error refreshing instances:', error)
  }
}

const changePage = async (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    await approvalsStore.fetchApprovalInstances({ page, limit: pagination.value.limit })
  }
}

const viewInstance = (instance: ApprovalInstance) => {
  // Implement view instance logic
  console.log('View instance:', instance)
}

const canApprove = (instance: ApprovalInstance): boolean => {
  // This would check if current user can approve this instance
  const currentUserId = 'current-user-id' // Get from auth store
  return instance.status === 'PENDING_APPROVAL' &&
         instance.approvals.some(approval =>
           approval.approverId === currentUserId && approval.status === 'PENDING'
         )
}

const processApproval = async (instance: ApprovalInstance, action: 'APPROVE' | 'REJECT') => {
  try {
    const approvalAction: ApprovalAction = {
      action,
      approverId: 'current-user-id', // Get from auth store
      approverName: 'Current User', // Get from auth store
      comments: action === 'REJECT' ? 'Rejected via pending approvals view' : 'Approved via pending approvals view'
    }

    await approvalsStore.processApproval(instance.id, approvalAction)
    await refreshInstances()
  } catch (error) {
    console.error('Error processing approval:', error)
  }
}

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'PENDING_APPROVAL':
      return 'bg-yellow-100 text-yellow-800'
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getApprovalBadgeClass = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700'
    case 'APPROVED':
      return 'bg-green-100 text-green-700'
    case 'REJECTED':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
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

// Watchers
watch(filters, async () => {
  // Reset to first page when filters change
  if (pagination.value.page !== 1) {
    await changePage(1)
  }
}, { deep: true })

// Lifecycle
onMounted(async () => {
  await refreshInstances()
})
</script>