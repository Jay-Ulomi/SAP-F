<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Demand Forecasts</h1>
        <p class="text-gray-600 mt-1">Manage demand forecasting models and predictions</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New Forecast
      </button>
    </div>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Forecasts</dt>
                <dd class="text-lg font-medium text-gray-900">{{ forecasts.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Accuracy</dt>
                <dd class="text-lg font-medium text-gray-900">{{ averageAccuracy.toFixed(1) }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Best Method</dt>
                <dd class="text-lg font-medium text-gray-900">{{ mostAccurateMethod }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Models</dt>
                <dd class="text-lg font-medium text-gray-900">{{ activeForecasts }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search Items</label>
          <input
            type="text"
            v-model="filters.search"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            placeholder="Search items..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Method</label>
          <select
            v-model="filters.method"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Methods</option>
            <option value="moving_average">Moving Average</option>
            <option value="exponential_smoothing">Exponential Smoothing</option>
            <option value="linear_regression">Linear Regression</option>
            <option value="seasonal_decomposition">Seasonal Decomposition</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Period Type</label>
          <select
            v-model="filters.periodType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Types</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
          <select
            v-model="filters.warehouseCode"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Warehouses</option>
            <option v-for="wh in warehouses" :key="wh.code" :value="wh.code">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Forecasts Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Forecasts ({{ forecasts.length }})</h3>
        <div class="flex space-x-2">
          <button
            @click="exportForecasts"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Export
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAPE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="forecast in forecasts" :key="forecast.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ forecast.itemName }}</div>
                  <div class="text-sm text-gray-500">{{ forecast.itemCode }}</div>
                  <div v-if="forecast.warehouseName" class="text-xs text-gray-400">{{ forecast.warehouseName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatMethod(forecast.method) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ formatPeriodType(forecast.periodType) }}</div>
                <div class="text-xs text-gray-500">
                  {{ new Date(forecast.startDate).toLocaleDateString() }} - 
                  {{ new Date(forecast.endDate).toLocaleDateString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">{{ forecast.accuracy.toFixed(1) }}%</div>
                  <div class="ml-2 flex-shrink-0">
                    <div
                      :class="[
                        'h-2 w-16 rounded-full',
                        getAccuracyColor(forecast.accuracy)
                      ]"
                    >
                      <div
                        class="h-2 bg-current rounded-full"
                        :style="{ width: forecast.accuracy + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ forecast.mape.toFixed(2) }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(forecast.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="viewForecast(forecast)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
                <button
                  @click="runForecast(forecast)"
                  class="text-green-600 hover:text-green-900"
                >
                  Run
                </button>
                <button
                  @click="editForecast(forecast)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  @click="deleteForecast(forecast)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="forecasts.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                No forecasts found. Create your first forecast model.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ selectedForecast ? 'Edit Forecast' : 'New Forecast Model' }}
          </h2>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
              <input
                type="text"
                v-model="form.itemCode"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter item code"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
              <select
                v-model="form.warehouseCode"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Warehouses</option>
                <option v-for="wh in warehouses" :key="wh.code" :value="wh.code">
                  {{ wh.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Forecasting Method *</label>
              <select
                v-model="form.method"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="moving_average">Moving Average</option>
                <option value="exponential_smoothing">Exponential Smoothing</option>
                <option value="linear_regression">Linear Regression</option>
                <option value="seasonal_decomposition">Seasonal Decomposition</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Period Type *</label>
              <select
                v-model="form.periodType"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                v-model="form.startDate"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                v-model="form.endDate"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : selectedForecast ? 'Update Forecast' : 'Create Forecast' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useMRPStore } from '../../stores/mrpStore'
import type { Forecast, ForecastFormData, MRPSearchParams, ForecastMethod } from '../../types'

const mrpStore = useMRPStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedForecast = ref<Forecast | null>(null)

const form = ref<ForecastFormData>({
  itemCode: '',
  warehouseCode: '',
  method: 'moving_average',
  periodType: 'weekly',
  startDate: '',
  endDate: '',
  parameters: {}
})

const filters = reactive<MRPSearchParams & { method?: ForecastMethod; periodType?: string }>({
  search: '',
  method: undefined,
  periodType: '',
  warehouseCode: ''
})

const forecasts = computed(() => mrpStore.forecasts)
const warehouses = computed(() => mrpStore.warehouses)
const loading = computed(() => mrpStore.loading)

const averageAccuracy = computed(() => {
  if (forecasts.value.length === 0) return 0
  return forecasts.value.reduce((sum, f) => sum + f.accuracy, 0) / forecasts.value.length
})

const mostAccurateMethod = computed(() => {
  if (forecasts.value.length === 0) return 'N/A'
  const methods = forecasts.value.reduce((acc, f) => {
    if (!acc[f.method]) acc[f.method] = { total: 0, count: 0 }
    acc[f.method].total += f.accuracy
    acc[f.method].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)
  
  let bestMethod = 'N/A'
  let bestAccuracy = 0
  Object.entries(methods).forEach(([method, stats]) => {
    const avg = stats.total / stats.count
    if (avg > bestAccuracy) {
      bestAccuracy = avg
      bestMethod = formatMethod(method)
    }
  })
  return bestMethod
})

const activeForecasts = computed(() => {
  return forecasts.value.filter(f => 
    new Date(f.endDate) >= new Date()
  ).length
})

function formatMethod(method: string): string {
  return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatPeriodType(type: string): string {
  return type.replace(/\b\w/g, l => l.toUpperCase())
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 90) return 'text-green-500 bg-green-100'
  if (accuracy >= 75) return 'text-yellow-500 bg-yellow-100'
  if (accuracy >= 60) return 'text-orange-500 bg-orange-100'
  return 'text-red-500 bg-red-100'
}

function resetFilters() {
  Object.assign(filters, {
    search: '',
    method: undefined,
    periodType: '',
    warehouseCode: ''
  })
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  selectedForecast.value = null
  resetForm()
}

function resetForm() {
  Object.assign(form.value, {
    itemCode: '',
    warehouseCode: '',
    method: 'moving_average',
    periodType: 'weekly',
    startDate: '',
    endDate: '',
    parameters: {}
  })
}

function editForecast(forecast: Forecast) {
  selectedForecast.value = forecast
  Object.assign(form.value, {
    itemCode: forecast.itemCode,
    warehouseCode: forecast.warehouseCode || '',
    method: forecast.method,
    periodType: forecast.periodType,
    startDate: forecast.startDate.split('T')[0],
    endDate: forecast.endDate.split('T')[0],
    parameters: forecast.parameters
  })
  showEditModal.value = true
}

function viewForecast(forecast: Forecast) {
  console.log('View forecast:', forecast.id)
}

async function runForecast(forecast: Forecast) {
  if (confirm(`Run forecast model for ${forecast.itemName}?`)) {
    try {
      await mrpStore.runForecast(forecast.id)
      await loadForecasts()
    } catch (error) {
      console.error('Failed to run forecast:', error)
    }
  }
}

async function deleteForecast(forecast: Forecast) {
  if (confirm(`Are you sure you want to delete the forecast for ${forecast.itemName}?`)) {
    console.log('Delete forecast:', forecast.id)
  }
}

async function handleSubmit() {
  try {
    if (selectedForecast.value) {
      // Update forecast logic would go here
      console.log('Update forecast')
    } else {
      await mrpStore.createForecast(form.value)
    }
    closeModals()
    await loadForecasts()
  } catch (error) {
    console.error('Failed to save forecast:', error)
  }
}

function exportForecasts() {
  console.log('Export forecasts')
}

async function loadForecasts() {
  const searchParams: MRPSearchParams = {
    ...filters,
    page: 1,
    limit: 50
  }
  
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key as keyof MRPSearchParams] === '' || searchParams[key as keyof MRPSearchParams] === undefined) {
      delete searchParams[key as keyof MRPSearchParams]
    }
  })
  
  try {
    await mrpStore.fetchForecasts(searchParams)
  } catch (error) {
    console.error('Failed to load forecasts:', error)
  }
}

async function loadInitialData() {
  try {
    await Promise.all([
      mrpStore.fetchMasterData(),
      loadForecasts()
    ])
  } catch (error) {
    console.error('Failed to load initial data:', error)
  }
}

watch(filters, () => {
  loadForecasts()
}, { deep: true })

onMounted(() => {
  loadInitialData()
})
</script>
