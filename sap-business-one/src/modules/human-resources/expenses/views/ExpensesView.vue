<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Expense Management</h1>
        <p class="text-sm text-gray-600">Manage employee expense reports and reimbursements</p>
      </div>
      <div class="flex space-x-3">
        <button @click="openCreateModal" class="btn-primary">New Expense Report</button>
        <button @click="openUploadModal" class="btn-secondary flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Expenses CSV
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Reports</p>
            <p class="text-xl font-bold text-gray-900">{{ expenseStore.expenses.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Approval</p>
            <p class="text-xl font-bold text-gray-900">{{ expenseStore.getPendingExpenses().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Approved</p>
            <p class="text-xl font-bold text-gray-900">{{ expenseStore.getApprovedExpenses().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Amount</p>
            <p class="text-xl font-bold text-gray-900">${{ expenseStore.getTotalExpenseAmount().toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search expenses..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="travel">Travel</option>
            <option value="accommodation">Accommodation</option>
            <option value="meals">Meals</option>
            <option value="transportation">Transportation</option>
            <option value="office_supplies">Office Supplies</option>
            <option value="training">Training</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Expense Reports Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Expense Reports</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="expense in filteredExpenses" :key="expense.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ expense.title }}</div>
                  <div class="text-sm text-gray-500">{{ expense.reportNumber }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ expense.employeeName }}</div>
                  <div class="text-sm text-gray-500">{{ expense.departmentName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ expense.currency }} {{ expense.totalAmount.toLocaleString() }}</div>
                <div v-if="expense.approvedAmount && expense.approvedAmount !== expense.totalAmount" class="text-sm text-green-600">
                  {{ expense.currency }} {{ expense.approvedAmount.toLocaleString() }} approved
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.items.length }} item{{ expense.items.length !== 1 ? 's' : '' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(expense.status),
                  ]"
                >
                  {{ formatStatus(expense.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(expense.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewExpense(expense)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button
                    v-if="canEdit(expense)"
                    @click="editExpense(expense)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="canSubmit(expense)"
                    @click="handleSubmitExpense(expense.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Submit
                  </button>
                  <button
                    v-if="canApprove(expense)"
                    @click="showApproveModal(expense)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Approve
                  </button>
                  <button
                    v-if="canReject(expense)"
                    @click="showRejectModal(expense)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                  <button
                    v-if="canMarkPaid(expense)"
                    @click="handleMarkAsPaid(expense.id)"
                    class="text-purple-600 hover:text-purple-900"
                  >
                    Mark Paid
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredExpenses.length === 0" class="text-center py-8">
          <p class="text-gray-500">No expense reports found.</p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <ExpenseForm
          :expense="selectedExpense"
          :loading="loading"
          @submit="handleSaveExpense"
          @cancel="closeModals"
        />
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal && selectedExpense" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white min-h-[calc(100vh-2rem)]">
        <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h3 class="text-lg font-medium text-gray-900">Expense Report Details</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <ExpenseDetails
            :expense="selectedExpense"
            @edit="handleEditFromDetails"
            @export="handleExportFromDetails"
            @print="handlePrintFromDetails"
          />
        </div>
      </div>
    </div>

    <!-- Approve Modal -->
    <div v-if="showApproveExpenseModal && selectedExpense" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Approve Expense Report</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Approved Amount (Original: {{ selectedExpense.currency }} {{ selectedExpense.totalAmount.toLocaleString() }})
            </label>
            <input
              type="number"
              v-model.number="approvedAmount"
              :max="selectedExpense.totalAmount"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleApproveExpense"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {{ loading ? 'Approving...' : 'Approve' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectExpenseModal && selectedExpense" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Reject Expense Report</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
          <textarea
            v-model="rejectionReason"
            required
            rows="4"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Please provide a reason for rejecting this expense report"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleRejectExpense"
            :disabled="loading || !rejectionReason.trim()"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {{ loading ? 'Rejecting...' : 'Reject' }}
          </button>
        </div>
      </div>
    </div>

    <!-- CSV Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium text-gray-900">Upload Expenses - CSV File</h3>
          <button @click="closeUploadModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <ExpenseCSVUpload
          @upload-complete="handleUploadComplete"
          @cancel="closeUploadModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseDetails from '../components/ExpenseDetails.vue'
import ExpenseCSVUpload from '../components/ExpenseCSVUpload.vue'
import type { ExpenseReport, ExpenseReportFormData } from '../types'
import { ExpenseStatus } from '../types'

const expenseStore = useExpenseStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showApproveExpenseModal = ref(false)
const showRejectExpenseModal = ref(false)
const showUploadModal = ref(false)
const selectedExpense = ref<ExpenseReport | null>(null)
const approvedAmount = ref(0)
const rejectionReason = ref('')

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')

const filteredExpenses = computed(() => {
  let filtered = expenseStore.expenses

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      expense =>
        expense.title.toLowerCase().includes(query) ||
        expense.reportNumber.toLowerCase().includes(query) ||
        expense.employeeName.toLowerCase().includes(query) ||
        expense.departmentName.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(expense => expense.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(expense => 
      expense.items.some(item => item.category === filterType.value)
    )
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

// Utility functions
function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'submitted': return 'bg-blue-100 text-blue-800'
    case 'approved': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    case 'paid': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Permission checks
function canEdit(expense: ExpenseReport): boolean {
  return ['draft', 'rejected'].includes(expense.status)
}

function canSubmit(expense: ExpenseReport): boolean {
  return expense.status === 'draft' && expense.items.length > 0
}

function canApprove(expense: ExpenseReport): boolean {
  return expense.status === 'submitted'
}

function canReject(expense: ExpenseReport): boolean {
  return expense.status === 'submitted'
}

function canMarkPaid(expense: ExpenseReport): boolean {
  return expense.status === 'approved'
}

// Modal controls
function openCreateModal() {
  selectedExpense.value = null
  showCreateModal.value = true
}

function openUploadModal() {
  showUploadModal.value = true
}

function closeUploadModal() {
  showUploadModal.value = false
}

function viewExpense(expense: ExpenseReport) {
  selectedExpense.value = expense
  showViewModal.value = true
}

function editExpense(expense: ExpenseReport) {
  selectedExpense.value = expense
  showEditModal.value = true
}

function showApproveModal(expense: ExpenseReport) {
  selectedExpense.value = expense
  approvedAmount.value = expense.totalAmount
  showApproveExpenseModal.value = true
}

function showRejectModal(expense: ExpenseReport) {
  selectedExpense.value = expense
  rejectionReason.value = ''
  showRejectExpenseModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showApproveExpenseModal.value = false
  showRejectExpenseModal.value = false
  selectedExpense.value = null
  approvedAmount.value = 0
  rejectionReason.value = ''
}

// Event handlers
function handleEditFromDetails(expense: ExpenseReport) {
  closeModals()
  editExpense(expense)
}

function handleExportFromDetails(expense: ExpenseReport) {
  console.log('Exporting expense:', expense.reportNumber)
  // TODO: Implement export functionality
}

function handlePrintFromDetails(expense: ExpenseReport) {
  console.log('Printing expense:', expense.reportNumber)
  window.print()
}

// CRUD handlers
async function handleSaveExpense(data: ExpenseReportFormData) {
  loading.value = true
  try {
    if (selectedExpense.value) {
      await expenseStore.updateExpense(selectedExpense.value.id, data)
    } else {
      await expenseStore.createExpense(data)
    }
    closeModals()
  } catch (error) {
    console.error('Error saving expense:', error)
  } finally {
    loading.value = false
  }
}

async function handleSubmitExpense(id: string) {
  if (confirm('Are you sure you want to submit this expense report for approval?')) {
    try {
      await expenseStore.submitExpense(id)
    } catch (error) {
      console.error('Error submitting expense:', error)
    }
  }
}

async function handleApproveExpense() {
  if (!selectedExpense.value) return

  loading.value = true
  try {
    await expenseStore.approveExpense(selectedExpense.value.id, approvedAmount.value)
    closeModals()
  } catch (error) {
    console.error('Error approving expense:', error)
  } finally {
    loading.value = false
  }
}

async function handleRejectExpense() {
  if (!selectedExpense.value) return

  loading.value = true
  try {
    await expenseStore.rejectExpense(selectedExpense.value.id, rejectionReason.value)
    closeModals()
  } catch (error) {
    console.error('Error rejecting expense:', error)
  } finally {
    loading.value = false
  }
}

async function handleMarkAsPaid(id: string) {
  if (confirm('Are you sure you want to mark this expense report as paid?')) {
    try {
      await expenseStore.markAsPaid(id)
    } catch (error) {
      console.error('Error marking expense as paid:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterStatus.value = ''
  filterType.value = ''
}

async function handleUploadComplete(uploadResult: any) {
  console.log('CSV upload completed:', uploadResult)
  closeUploadModal()
  // Refresh the expenses list
  await expenseStore.fetchExpenses()
}

onMounted(() => {
  expenseStore.fetchExpenses()
  expenseStore.fetchStats()
})
</script>