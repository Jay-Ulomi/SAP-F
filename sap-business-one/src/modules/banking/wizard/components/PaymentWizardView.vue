<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ wizard.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ wizard.wizardNumber }} • {{ formatDate(wizard.createdAt) }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(wizard.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(wizard.status) }}
          </span>
          <span
            :class="getPriorityClasses(wizard.priority)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatPriority(wizard.priority) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Wizard Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Wizard Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Wizard Type:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatWizardType(wizard.wizardType) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Status:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatStatus(wizard.status) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Priority:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatPriority(wizard.priority) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Currency:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ wizard.currency }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Created by:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ wizard.createdBy }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Created at:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(wizard.createdAt) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Payment Statistics -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Payment Statistics
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Total Amount:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(wizard.totalAmount, wizard.currency) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Payment Count:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ wizard.paymentCount }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Completed:</span>
              <span class="text-sm font-medium text-green-600">
                {{ wizard.completedPayments }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Failed:</span>
              <span class="text-sm font-medium text-red-600">
                {{ wizard.failedPayments }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Success Rate:</span>
              <span class="text-sm font-medium text-gray-900"> {{ calculateSuccessRate() }}% </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Progress</h4>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${calculateProgress()}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-sm text-gray-500 mt-2">
          <span
            >{{ wizard.completedPayments }} of {{ wizard.paymentCount }} payments completed</span
          >
          <span>{{ calculateProgress() }}%</span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="wizard.description" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Description</h4>
        <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
          {{ wizard.description }}
        </p>
      </div>

      <!-- Notes -->
      <div v-if="wizard.notes" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
        <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
          {{ wizard.notes }}
        </p>
      </div>

      <!-- Approval Information -->
      <div v-if="wizard.approvedBy" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
          Approval Information
        </h4>
        <div class="bg-green-50 rounded-lg p-3">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <p class="text-sm font-medium text-green-800">Approved by {{ wizard.approvedBy }}</p>
              <p class="text-xs text-green-600">
                {{ formatDate(wizard.approvedAt!) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Metadata -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
        <div><span class="font-medium">Updated at:</span> {{ formatDate(wizard.updatedAt) }}</div>
        <div v-if="wizard.completedAt">
          <span class="font-medium">Completed at:</span> {{ formatDate(wizard.completedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaymentWizard } from '../types'
import { PaymentWizardStatus, PaymentWizardType, PaymentPriority } from '../types'

interface Props {
  wizard: PaymentWizard
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatStatus = (status: PaymentWizardStatus) => {
  const statusMap = {
    [PaymentWizardStatus.DRAFT]: 'Draft',
    [PaymentWizardStatus.IN_PROGRESS]: 'In Progress',
    [PaymentWizardStatus.PENDING_APPROVAL]: 'Pending Approval',
    [PaymentWizardStatus.APPROVED]: 'Approved',
    [PaymentWizardStatus.PROCESSING]: 'Processing',
    [PaymentWizardStatus.COMPLETED]: 'Completed',
    [PaymentWizardStatus.FAILED]: 'Failed',
    [PaymentWizardStatus.CANCELLED]: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatWizardType = (type: PaymentWizardType) => {
  const typeMap = {
    [PaymentWizardType.SINGLE_PAYMENT]: 'Single Payment',
    [PaymentWizardType.BATCH_PAYMENT]: 'Batch Payment',
    [PaymentWizardType.RECURRING_PAYMENT]: 'Recurring Payment',
    [PaymentWizardType.PAYROLL_PAYMENT]: 'Payroll Payment',
    [PaymentWizardType.VENDOR_PAYMENT]: 'Vendor Payment',
    [PaymentWizardType.CUSTOMER_REFUND]: 'Customer Refund',
    [PaymentWizardType.TAX_PAYMENT]: 'Tax Payment',
    [PaymentWizardType.LOAN_PAYMENT]: 'Loan Payment',
  }
  return typeMap[type] || type
}

const formatPriority = (priority: PaymentPriority) => {
  const priorityMap = {
    [PaymentPriority.LOW]: 'Low',
    [PaymentPriority.NORMAL]: 'Normal',
    [PaymentPriority.HIGH]: 'High',
    [PaymentPriority.URGENT]: 'Urgent',
  }
  return priorityMap[priority] || priority
}

const getStatusClasses = (status: PaymentWizardStatus) => {
  const statusClasses = {
    [PaymentWizardStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [PaymentWizardStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [PaymentWizardStatus.PENDING_APPROVAL]: 'bg-yellow-100 text-yellow-800',
    [PaymentWizardStatus.APPROVED]: 'bg-green-100 text-green-800',
    [PaymentWizardStatus.PROCESSING]: 'bg-indigo-100 text-indigo-800',
    [PaymentWizardStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [PaymentWizardStatus.FAILED]: 'bg-red-100 text-red-800',
    [PaymentWizardStatus.CANCELLED]: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClasses = (priority: PaymentPriority) => {
  const priorityClasses = {
    [PaymentPriority.LOW]: 'bg-gray-100 text-gray-800',
    [PaymentPriority.NORMAL]: 'bg-blue-100 text-blue-800',
    [PaymentPriority.HIGH]: 'bg-orange-100 text-orange-800',
    [PaymentPriority.URGENT]: 'bg-red-100 text-red-800',
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
}

const calculateProgress = () => {
  const wizard = defineProps<Props>().wizard
  if (wizard.paymentCount === 0) return 0
  return Math.round((wizard.completedPayments / wizard.paymentCount) * 100)
}

const calculateSuccessRate = () => {
  const wizard = defineProps<Props>().wizard
  if (wizard.paymentCount === 0) return 0
  return Math.round((wizard.completedPayments / wizard.paymentCount) * 100)
}
</script>
