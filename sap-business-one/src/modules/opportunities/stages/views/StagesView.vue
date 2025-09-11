<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Opportunity Stages</h1>
      <div class="flex space-x-3">
        <button
          @click="refreshData"
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Info Card -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Pipeline Stages Management</h3>
        <p class="mt-1 text-sm text-gray-500">
          This module provides a view of opportunity stages from the sales pipeline.
        </p>
        <div class="mt-4">
          <a
            href="/opportunities/pipeline"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Go to Pipeline Management
          </a>
        </div>
      </div>
    </div>

    <!-- Sample Stages -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white shadow rounded-lg overflow-hidden border-l-4 border-blue-500">
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-medium text-gray-900">Lead Qualification</h3>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">#1</span>
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
              >
                Active
              </span>
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div>Initial lead assessment and validation</div>
            <div class="flex justify-between">
              <span>Probability:</span>
              <span class="font-medium">10%</span>
            </div>
            <div class="flex justify-between">
              <span>Duration:</span>
              <span class="font-medium">3 days</span>
            </div>
            <div class="flex justify-between">
              <span>Code:</span>
              <span class="font-mono text-xs">LEAD_QUAL</span>
            </div>
          </div>

          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
              >
                Default
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden border-l-4 border-green-500">
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-medium text-gray-900">Discovery</h3>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">#2</span>
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
              >
                Active
              </span>
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div>Understanding customer needs and requirements</div>
            <div class="flex justify-between">
              <span>Probability:</span>
              <span class="font-medium">25%</span>
            </div>
            <div class="flex justify-between">
              <span>Duration:</span>
              <span class="font-medium">5 days</span>
            </div>
            <div class="flex justify-between">
              <span>Code:</span>
              <span class="font-mono text-xs">DISCOVERY</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden border-l-4 border-yellow-500">
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-medium text-gray-900">Proposal</h3>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">#3</span>
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
              >
                Active
              </span>
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div>Solution presentation and proposal development</div>
            <div class="flex justify-between">
              <span>Probability:</span>
              <span class="font-medium">50%</span>
            </div>
            <div class="flex justify-between">
              <span>Duration:</span>
              <span class="font-medium">7 days</span>
            </div>
            <div class="flex justify-between">
              <span>Code:</span>
              <span class="font-mono text-xs">PROPOSAL</span>
            </div>
          </div>

          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800"
              >
                Approval Required
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const refreshData = () => {
  // Placeholder for refresh functionality
  console.log('Refresh data')
}
</script>
