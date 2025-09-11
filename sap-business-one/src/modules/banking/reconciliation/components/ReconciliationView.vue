<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            Reconciliation {{ reconciliation.reconciliationNumber }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(reconciliation.statementDate) }} • {{ reconciliation.bankAccountName }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(reconciliation.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(reconciliation.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Reconciliation Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Balance Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Balance Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Statement Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(reconciliation.statementDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Reconciliation Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(reconciliation.reconciliationDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Beginning Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(reconciliation.beginningBalance) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Ending Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(reconciliation.endingBalance) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Book Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(reconciliation.bookBalance) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(reconciliation.bankBalance) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Difference:</span>
              <span
                class="text-sm font-bold"
                :class="reconciliation.difference >= 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ formatCurrency(reconciliation.difference) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Account & Status Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Account & Status Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Account:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ reconciliation.bankAccountName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Account ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ reconciliation.bankAccountId }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Status:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatStatus(reconciliation.status) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Created by:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ reconciliation.createdBy }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Created at:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(reconciliation.createdAt) }}
              </span>
            </div>
            <div v-if="reconciliation.approvedBy" class="flex justify-between">
              <span class="text-sm text-gray-500">Approved by:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ reconciliation.approvedBy }}
              </span>
            </div>
            <div v-if="reconciliation.approvedAt" class="flex justify-between">
              <span class="text-sm text-gray-500">Approved at:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(reconciliation.approvedAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Summary -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Transaction Summary
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-blue-600">
              {{ reconciliation.bankTransactions.length }}
            </p>
            <p class="text-sm text-blue-800">Bank Transactions</p>
          </div>
          <div class="bg-green-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-green-600">
              {{ reconciliation.bookTransactions.length }}
            </p>
            <p class="text-sm text-green-800">Book Transactions</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-purple-600">
              {{ reconciliation.matchedTransactions.length }}
            </p>
            <p class="text-sm text-purple-800">Matched Transactions</p>
          </div>
          <div class="bg-red-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-red-600">{{ reconciliation.discrepancies.length }}</p>
            <p class="text-sm text-red-800">Discrepancies</p>
          </div>
        </div>
      </div>

      <!-- Matched Transactions -->
      <div v-if="reconciliation.matchedTransactions.length > 0" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Matched Transactions
        </h4>
        <div class="space-y-3">
          <div
            v-for="match in reconciliation.matchedTransactions"
            :key="match.id"
            class="bg-green-50 rounded-lg p-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-900">Bank Transaction</p>
                <p class="text-xs text-gray-500">{{ match.bankTransaction.description }}</p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(match.bankTransaction.transactionDate) }} •
                  {{ formatCurrency(match.bankTransaction.amount) }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Book Transaction</p>
                <p class="text-xs text-gray-500">{{ match.bookTransaction.description }}</p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(match.bookTransaction.transactionDate) }} •
                  {{ formatCurrency(match.bookTransaction.amount) }}
                </p>
              </div>
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500">
              <span>Match Amount: {{ formatCurrency(match.matchAmount) }}</span>
              <span>Confidence: {{ Math.round(match.confidence * 100) }}%</span>
              <span>Type: {{ match.matchType }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Unmatched Transactions -->
      <div
        v-if="
          reconciliation.unmatchedBankTransactions.length > 0 ||
          reconciliation.unmatchedBookTransactions.length > 0
        "
        class="mt-8"
      >
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Unmatched Transactions
        </h4>

        <!-- Unmatched Bank Transactions -->
        <div v-if="reconciliation.unmatchedBankTransactions.length > 0" class="mb-6">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Bank Transactions</h5>
          <div class="space-y-2">
            <div
              v-for="transaction in reconciliation.unmatchedBankTransactions"
              :key="transaction.id"
              class="bg-yellow-50 rounded-lg p-3"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(transaction.transactionDate) }} •
                    {{ transaction.referenceNumber || 'No reference' }}
                  </p>
                </div>
                <span class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(transaction.amount) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Unmatched Book Transactions -->
        <div v-if="reconciliation.unmatchedBookTransactions.length > 0">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Book Transactions</h5>
          <div class="space-y-2">
            <div
              v-for="transaction in reconciliation.unmatchedBookTransactions"
              :key="transaction.id"
              class="bg-orange-50 rounded-lg p-3"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(transaction.transactionDate) }} •
                    {{ transaction.referenceNumber || 'No reference' }}
                  </p>
                </div>
                <span class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(transaction.amount) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Discrepancies -->
      <div v-if="reconciliation.discrepancies.length > 0" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Discrepancies
        </h4>
        <div class="space-y-3">
          <div
            v-for="discrepancy in reconciliation.discrepancies"
            :key="discrepancy.id"
            class="bg-red-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ discrepancy.description }}</p>
                <p class="text-xs text-gray-500">Type: {{ discrepancy.type }}</p>
                <p class="text-xs text-gray-500">Status: {{ discrepancy.status }}</p>
              </div>
              <div v-if="discrepancy.difference" class="text-right">
                <p class="text-sm font-bold text-red-600">
                  {{ formatCurrency(discrepancy.difference) }}
                </p>
              </div>
            </div>
            <div v-if="discrepancy.resolution" class="mt-2">
              <p class="text-xs text-gray-600">Resolution: {{ discrepancy.resolution }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div v-if="reconciliation.notes" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
        <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
          {{ reconciliation.notes }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reconciliation } from '../types'
import { ReconciliationStatus } from '../types'

interface Props {
  reconciliation: Reconciliation
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatStatus = (status: ReconciliationStatus) => {
  const statusMap = {
    [ReconciliationStatus.DRAFT]: 'Draft',
    [ReconciliationStatus.IN_PROGRESS]: 'In Progress',
    [ReconciliationStatus.COMPLETED]: 'Completed',
    [ReconciliationStatus.DISCREPANCY]: 'Discrepancy',
    [ReconciliationStatus.APPROVED]: 'Approved',
    [ReconciliationStatus.REJECTED]: 'Rejected',
  }
  return statusMap[status] || status
}

const getStatusClasses = (status: ReconciliationStatus) => {
  const statusClasses = {
    [ReconciliationStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [ReconciliationStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [ReconciliationStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [ReconciliationStatus.DISCREPANCY]: 'bg-red-100 text-red-800',
    [ReconciliationStatus.APPROVED]: 'bg-purple-100 text-purple-800',
    [ReconciliationStatus.REJECTED]: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
