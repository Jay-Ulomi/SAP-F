<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            Statement {{ statement.statementNumber }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(statement.statementDate) }} • {{ statement.bankAccountName }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(statement.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(statement.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Statement Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Statement Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Statement Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Statement Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(statement.statementDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Period:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(statement.periodStart) }} - {{ formatDate(statement.periodEnd) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Statement Type:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatStatementType(statement.statementType) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Transaction Count:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ statement.transactionCount }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Beginning Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(statement.beginningBalance) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Ending Balance:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatCurrency(statement.endingBalance) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Account & File Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Account & File Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Account:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ statement.bankAccountName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Account ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ statement.bankAccountId }}
              </span>
            </div>
            <div v-if="statement.fileName" class="flex justify-between">
              <span class="text-sm text-gray-500">File Name:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ statement.fileName }}
              </span>
            </div>
            <div v-if="statement.fileSize" class="flex justify-between">
              <span class="text-sm text-gray-500">File Size:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatFileSize(statement.fileSize) }}
              </span>
            </div>
            <div v-if="statement.uploadedBy" class="flex justify-between">
              <span class="text-sm text-gray-500">Uploaded by:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ statement.uploadedBy }}
              </span>
            </div>
            <div v-if="statement.uploadedAt" class="flex justify-between">
              <span class="text-sm text-gray-500">Uploaded at:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(statement.uploadedAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Summary -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Financial Summary
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-green-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-green-600">
              {{ formatCurrency(statement.totalDeposits) }}
            </p>
            <p class="text-sm text-green-800">Total Deposits</p>
          </div>
          <div class="bg-red-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-red-600">
              {{ formatCurrency(statement.totalWithdrawals) }}
            </p>
            <p class="text-sm text-red-800">Total Withdrawals</p>
          </div>
          <div class="bg-orange-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-orange-600">
              {{ formatCurrency(statement.totalFees) }}
            </p>
            <p class="text-sm text-orange-800">Total Fees</p>
          </div>
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-blue-600">
              {{ formatCurrency(statement.totalInterest) }}
            </p>
            <p class="text-sm text-blue-800">Interest Earned</p>
          </div>
        </div>
      </div>

      <!-- Transactions Summary -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Transactions Summary
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in statement.transactions.slice(0, 10)" :key="transaction.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.transactionDate) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-xs truncate">
                    {{ transaction.description }}
                  </div>
                  <div v-if="transaction.referenceNumber" class="text-xs text-gray-500">
                    Ref: {{ transaction.referenceNumber }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatTransactionType(transaction.transactionType) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    class="font-medium"
                    :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ formatCurrency(transaction.amount) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(transaction.balance) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="transaction.isReconciled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ transaction.isReconciled ? 'Reconciled' : 'Pending' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="statement.transactions.length > 10" class="mt-4 text-center">
          <p class="text-sm text-gray-500">
            Showing first 10 of {{ statement.transactions.length }} transactions
          </p>
        </div>
      </div>

      <!-- Notes & Metadata -->
      <div class="mt-8 space-y-4">
        <div v-if="statement.notes">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ statement.notes }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
          <div><span class="font-medium">Created at:</span> {{ formatDate(statement.createdAt) }}</div>
          <div><span class="font-medium">Updated at:</span> {{ formatDate(statement.updatedAt) }}</div>
          <div v-if="statement.processedBy">
            <span class="font-medium">Processed by:</span> {{ statement.processedBy }}
          </div>
          <div v-if="statement.processedAt">
            <span class="font-medium">Processed at:</span> {{ formatDate(statement.processedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BankStatement } from '../types'
import { StatementStatus, StatementType, TransactionType } from '../types'

interface Props {
  statement: BankStatement
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

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatStatus = (status: StatementStatus) => {
  const statusMap = {
    [StatementStatus.DRAFT]: 'Draft',
    [StatementStatus.PENDING]: 'Pending',
    [StatementStatus.PROCESSING]: 'Processing',
    [StatementStatus.COMPLETED]: 'Completed',
    [StatementStatus.FAILED]: 'Failed',
    [StatementStatus.CANCELLED]: 'Cancelled',
    [StatementStatus.RECONCILED]: 'Reconciled',
  }
  return statusMap[status] || status
}

const formatStatementType = (type: StatementType) => {
  const typeMap = {
    [StatementType.MONTHLY]: 'Monthly',
    [StatementType.QUARTERLY]: 'Quarterly',
    [StatementType.YEARLY]: 'Yearly',
    [StatementType.CUSTOM]: 'Custom',
    [StatementType.ON_DEMAND]: 'On Demand',
  }
  return typeMap[type] || type
}

const formatTransactionType = (type: TransactionType) => {
  const typeMap = {
    [TransactionType.DEPOSIT]: 'Deposit',
    [TransactionType.WITHDRAWAL]: 'Withdrawal',
    [TransactionType.TRANSFER_IN]: 'Transfer In',
    [TransactionType.TRANSFER_OUT]: 'Transfer Out',
    [TransactionType.FEE]: 'Fee',
    [TransactionType.INTEREST]: 'Interest',
    [TransactionType.CHECK]: 'Check',
    [TransactionType.WIRE_TRANSFER]: 'Wire Transfer',
    [TransactionType.ACH]: 'ACH',
    [TransactionType.DEBIT_CARD]: 'Debit Card',
    [TransactionType.CREDIT_CARD]: 'Credit Card',
    [TransactionType.ATM]: 'ATM',
    [TransactionType.OTHER]: 'Other',
  }
  return typeMap[type] || type
}

const getStatusClasses = (status: StatementStatus) => {
  const statusClasses = {
    [StatementStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [StatementStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [StatementStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
    [StatementStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [StatementStatus.FAILED]: 'bg-red-100 text-red-800',
    [StatementStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [StatementStatus.RECONCILED]: 'bg-purple-100 text-purple-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
