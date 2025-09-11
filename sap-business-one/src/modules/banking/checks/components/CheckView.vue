<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Check {{ check.checkNumber }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(check.checkDate) }} • {{ check.vendorName }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(check.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(check.status) }}
          </span>
        </div>
      </div>
    </div>
    <!-- Check Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Check Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Check Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(check.checkDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Due Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(check.dueDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Amount:</span>
              <span class="text-sm font-bold text-red-600">
                {{ formatCurrency(check.amount, check.currency) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Check Type:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCheckType(check.checkType) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Purpose:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCheckPurpose(check.checkPurpose) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Vendor & Bank Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Vendor & Bank Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Vendor:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ check.vendorName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Vendor ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ check.vendorId }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Account:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ check.bankAccountName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Reference:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ check.referenceNumber || 'N/A' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Currency:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ check.currency }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Applied Purchase Orders -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Applied Purchase Orders
        </h4>
        <div v-if="check.appliedPurchaseOrders.length > 0" class="space-y-3">
          <div
            v-for="po in check.appliedPurchaseOrders"
            :key="po.poId"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ po.poNumber }}
                </p>
                <p class="text-xs text-gray-500">PO Date: {{ formatDate(po.poDate) }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(po.appliedAmount, check.currency) }}
                </p>
                <p class="text-xs text-gray-500">
                  Applied: {{ formatCurrency(po.appliedAmount, check.currency) }}
                </p>
              </div>
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500">
              <span>Original: {{ formatCurrency(po.originalAmount, check.currency) }}</span>
              <span v-if="po.discountAmount > 0">
                Discount: {{ formatCurrency(po.discountAmount, check.currency) }}
              </span>
              <span v-if="po.writeOffAmount > 0">
                Write-off: {{ formatCurrency(po.writeOffAmount, check.currency) }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-500">
          <p class="text-sm">No purchase orders applied to this check</p>
        </div>
      </div>
      <!-- Fees -->
      <div v-if="check.fees.length > 0" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Check Fees</h4>
        <div class="space-y-3">
          <div
            v-for="fee in check.fees"
            :key="fee.id"
            class="flex justify-between items-center bg-red-50 rounded-lg p-3"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ fee.description }}</p>
              <p class="text-xs text-gray-500">{{ fee.feeType }}</p>
            </div>
            <span class="text-sm font-medium text-red-600">
              {{ formatCurrency(fee.amount, check.currency) }}
            </span>
          </div>
        </div>
      </div>
      <!-- Notes & Metadata -->
      <div class="mt-8 space-y-4">
        <div v-if="check.description">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
            Description
          </h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ check.description }}
          </p>
        </div>
        <div v-if="check.notes">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ check.notes }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
          <div><span class="font-medium">Created by:</span> {{ check.createdBy }}</div>
          <div><span class="font-medium">Created at:</span> {{ formatDate(check.createdAt) }}</div>
          <div><span class="font-medium">Updated at:</span> {{ formatDate(check.updatedAt) }}</div>
          <div v-if="check.approvedBy">
            <span class="font-medium">Approved by:</span> {{ check.approvedBy }}
          </div>
          <div v-if="check.approvedAt">
            <span class="font-medium">Approved at:</span> {{ formatDate(check.approvedAt) }}
          </div>
          <div v-if="check.printedAt">
            <span class="font-medium">Printed at:</span> {{ formatDate(check.printedAt) }}
          </div>
          <div v-if="check.issuedAt">
            <span class="font-medium">Issued at:</span> {{ formatDate(check.issuedAt) }}
          </div>
          <div v-if="check.cashedAt">
            <span class="font-medium">Cashed at:</span> {{ formatDate(check.cashedAt) }}
          </div>
          <div v-if="check.clearedAt">
            <span class="font-medium">Cleared at:</span> {{ formatDate(check.clearedAt) }}
          </div>
          <div v-if="check.stoppedAt">
            <span class="font-medium">Stopped at:</span> {{ formatDate(check.stoppedAt) }}
          </div>
          <div v-if="check.voidedAt">
            <span class="font-medium">Voided at:</span> {{ formatDate(check.voidedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Check } from '../types'
import { CheckType, CheckStatus, CheckPurpose } from '../types'

interface Props {
  check: Check
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatStatus = (status: CheckStatus) => {
  const statusMap = {
    [CheckStatus.DRAFT]: 'Draft',
    [CheckStatus.PENDING_APPROVAL]: 'Pending Approval',
    [CheckStatus.APPROVED]: 'Approved',
    [CheckStatus.PRINTED]: 'Printed',
    [CheckStatus.ISSUED]: 'Issued',
    [CheckStatus.CASHED]: 'Cashed',
    [CheckStatus.CLEARED]: 'Cleared',
    [CheckStatus.STOPPED]: 'Stopped',
    [CheckStatus.VOIDED]: 'Voided',
    [CheckStatus.RETURNED]: 'Returned',
    [CheckStatus.EXPIRED]: 'Expired',
  }
  return statusMap[status] || status
}

const formatCheckType = (type: CheckType) => {
  const typeMap = {
    [CheckType.BUSINESS_CHECK]: 'Business Check',
    [CheckType.PERSONAL_CHECK]: 'Personal Check',
    [CheckType.CASHIERS_CHECK]: "Cashier's Check",
    [CheckType.CERTIFIED_CHECK]: 'Certified Check',
    [CheckType.TRAVELERS_CHECK]: "Traveler's Check",
    [CheckType.MONEY_ORDER]: 'Money Order',
    [CheckType.OTHER]: 'Other',
  }
  return typeMap[type] || type
}

const formatCheckPurpose = (purpose: CheckPurpose) => {
  const purposeMap = {
    [CheckPurpose.VENDOR_PAYMENT]: 'Vendor Payment',
    [CheckPurpose.SUPPLIER_PAYMENT]: 'Supplier Payment',
    [CheckPurpose.EMPLOYEE_PAYROLL]: 'Employee Payroll',
    [CheckPurpose.EXPENSE_REIMBURSEMENT]: 'Expense Reimbursement',
    [CheckPurpose.LOAN_PAYMENT]: 'Loan Payment',
    [CheckPurpose.TAX_PAYMENT]: 'Tax Payment',
    [CheckPurpose.INSURANCE_PAYMENT]: 'Insurance Payment',
    [CheckPurpose.UTILITY_PAYMENT]: 'Utility Payment',
    [CheckPurpose.RENT_PAYMENT]: 'Rent Payment',
    [CheckPurpose.DIVIDEND_PAYMENT]: 'Dividend Payment',
    [CheckPurpose.REFUND]: 'Refund',
    [CheckPurpose.OTHER]: 'Other',
  }
  return purposeMap[purpose] || purpose
}

const getStatusClasses = (status: CheckStatus) => {
  const statusClasses = {
    [CheckStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [CheckStatus.PENDING_APPROVAL]: 'bg-yellow-100 text-yellow-800',
    [CheckStatus.APPROVED]: 'bg-blue-100 text-blue-800',
    [CheckStatus.PRINTED]: 'bg-indigo-100 text-indigo-800',
    [CheckStatus.ISSUED]: 'bg-purple-100 text-purple-800',
    [CheckStatus.CASHED]: 'bg-orange-100 text-orange-800',
    [CheckStatus.CLEARED]: 'bg-green-100 text-green-800',
    [CheckStatus.STOPPED]: 'bg-red-100 text-red-800',
    [CheckStatus.VOIDED]: 'bg-red-100 text-red-800',
    [CheckStatus.RETURNED]: 'bg-orange-100 text-orange-800',
    [CheckStatus.EXPIRED]: 'bg-gray-100 text-gray-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
