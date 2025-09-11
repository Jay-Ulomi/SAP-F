<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">MRP Planning Wizard</h1>
      <p class="text-gray-600 mt-2">Step-by-step guide to create and run a comprehensive MRP plan</p>
    </div>

    <!-- Progress Steps -->
    <div class="mb-8">
      <div class="flex items-center justify-center">
        <ol class="flex items-center w-full max-w-2xl">
          <li v-for="(step, index) in steps" :key="step.id" class="flex items-center">
            <div 
              :class="[
                'flex items-center justify-center w-10 h-10 rounded-full border-2',
                step.isCompleted 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : step.isActive 
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 text-gray-500'
              ]"
            >
              <svg v-if="step.isCompleted" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
            </div>
            <div v-if="index < steps.length - 1" :class="['w-full h-1 mx-4', step.isCompleted ? 'bg-green-600' : 'bg-gray-300']"></div>
          </li>
        </ol>
      </div>
      <div class="flex justify-center mt-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900">{{ currentStep.title }}</h3>
          <p class="text-sm text-gray-600">{{ currentStep.description }}</p>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="bg-white shadow rounded-lg p-6">
      <!-- Step 1: Planning Scope -->
      <div v-if="currentStepIndex === 0" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Define Planning Scope</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="wizardData.planningScope.includeAll"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-900">Include all items and warehouses</span>
            </label>
          </div>
        </div>

        <div v-if="!wizardData.planningScope.includeAll" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Items</label>
            <div class="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
              <div v-for="item in items.slice(0, 10)" :key="item.code" class="flex items-center">
                <input
                  type="checkbox"
                  :value="item.code"
                  v-model="wizardData.planningScope.itemCodes"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-900">{{ item.name }} ({{ item.code }})</span>
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Warehouses</label>
            <div class="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
              <div v-for="warehouse in warehouses" :key="warehouse.code" class="flex items-center">
                <input
                  type="checkbox"
                  :value="warehouse.code"
                  v-model="wizardData.planningScope.warehouseCodes"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-900">{{ warehouse.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Planning Period -->
      <div v-if="currentStepIndex === 1" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Set Planning Period</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input
              type="date"
              v-model="wizardData.planningPeriod.startDate"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
            <input
              type="date"
              v-model="wizardData.planningPeriod.endDate"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bucket Size *</label>
            <select
              v-model="wizardData.planningPeriod.bucketSize"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Step 3: Demand Sources -->
      <div v-if="currentStepIndex === 2" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Configure Demand Sources</h4>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.demandSources.customerOrders"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Customer Orders</label>
              <p class="text-sm text-gray-500">Include confirmed sales orders in demand calculation</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.demandSources.forecasts"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Demand Forecasts</label>
              <p class="text-sm text-gray-500">Include statistical forecasts based on historical data</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.demandSources.safetyStock"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Safety Stock</label>
              <p class="text-sm text-gray-500">Maintain minimum stock levels as defined in item master</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.demandSources.transferOrders"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Transfer Orders</label>
              <p class="text-sm text-gray-500">Include inter-warehouse transfer requirements</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Supply Parameters -->
      <div v-if="currentStepIndex === 3" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Supply Parameters</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lead Time Buffer (days)</label>
            <input
              type="number"
              v-model.number="wizardData.supplyParameters.leadTimeBuffer"
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Safety Stock Multiplier</label>
            <input
              type="number"
              v-model.number="wizardData.supplyParameters.safetyStockMultiplier"
              step="0.1"
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lot Sizing Rule</label>
            <select
              v-model="wizardData.supplyParameters.lotSizing"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="lot_for_lot">Lot for Lot</option>
              <option value="fixed_order_quantity">Fixed Order Quantity</option>
              <option value="economic_order_quantity">Economic Order Quantity</option>
            </select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.supplyParameters.minimumOrderQuantity"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label class="ml-2 text-sm text-gray-900">Respect minimum order quantities</label>
          </div>
        </div>
      </div>

      <!-- Step 5: Constraints -->
      <div v-if="currentStepIndex === 4" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Planning Constraints</h4>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.constraints.supplierCapacity"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Supplier Capacity Constraints</label>
              <p class="text-sm text-gray-500">Consider supplier delivery capacity limitations</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.constraints.productionCapacity"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Production Capacity Constraints</label>
              <p class="text-sm text-gray-500">Consider manufacturing capacity limitations</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.constraints.warehouseCapacity"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Warehouse Capacity Constraints</label>
              <p class="text-sm text-gray-500">Consider storage space limitations</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.constraints.budgetConstraints"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div class="ml-3">
              <label class="text-sm font-medium text-gray-900">Budget Constraints</label>
              <p class="text-sm text-gray-500">Limit recommendations based on budget</p>
            </div>
          </div>
        </div>
        
        <div v-if="wizardData.constraints.budgetConstraints" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Budget</label>
          <input
            type="number"
            v-model.number="wizardData.constraints.maxBudget"
            min="0"
            class="w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter budget limit"
          />
        </div>
      </div>

      <!-- Step 6: Notifications -->
      <div v-if="currentStepIndex === 5" class="space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Notification Settings</h4>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="wizardData.notifications.emailNotifications"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label class="ml-2 text-sm text-gray-900">Enable email notifications</label>
          </div>
          
          <div v-if="wizardData.notifications.emailNotifications" class="ml-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
              <div class="space-y-2">
                <div v-for="(email, index) in wizardData.notifications.emailAddresses" :key="index" class="flex items-center space-x-2">
                  <input
                    type="email"
                    v-model="wizardData.notifications.emailAddresses[index]"
                    class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="user@company.com"
                  />
                  <button
                    type="button"
                    @click="removeEmailAddress(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addEmailAddress"
                  class="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  + Add Email Address
                </button>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="wizardData.notifications.notifyOnCompletion"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label class="ml-2 text-sm text-gray-900">Notify on plan completion</label>
              </div>
              
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="wizardData.notifications.notifyOnErrors"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label class="ml-2 text-sm text-gray-900">Notify on errors</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-8">
      <button
        @click="previousStep"
        :disabled="currentStepIndex === 0"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      
      <div class="space-x-3">
        <button
          v-if="currentStepIndex < steps.length - 1"
          @click="nextStep"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Next
        </button>
        <button
          v-else
          @click="createPlan"
          :disabled="loading"
          class="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {{ loading ? 'Creating Plan...' : 'Create MRP Plan' }}
        </button>
      </div>
    </div>

    <!-- Summary Panel -->
    <div v-if="currentStepIndex === steps.length - 1" class="mt-8 bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Plan Summary</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h5 class="font-medium text-gray-700">Scope</h5>
          <p>{{ wizardData.planningScope.includeAll ? 'All items and warehouses' : `${wizardData.planningScope.itemCodes.length} items, ${wizardData.planningScope.warehouseCodes.length} warehouses` }}</p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Period</h5>
          <p>{{ wizardData.planningPeriod.startDate }} to {{ wizardData.planningPeriod.endDate }} ({{ wizardData.planningPeriod.bucketSize }})</p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Demand Sources</h5>
          <p>{{ enabledDemandSources.join(', ') || 'None selected' }}</p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Constraints</h5>
          <p>{{ enabledConstraints.join(', ') || 'None selected' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useMRPStore } from '../../stores/mrpStore'
import type { WizardData, PlanningWizardStep } from '../../types'
import { useRouter } from 'vue-router'

const mrpStore = useMRPStore()
const router = useRouter()

const currentStepIndex = ref(0)
const loading = ref(false)

const steps = ref<PlanningWizardStep[]>([
  { id: '1', title: 'Planning Scope', description: 'Select items and warehouses to include', isCompleted: false, isActive: true, isOptional: false },
  { id: '2', title: 'Planning Period', description: 'Define the planning timeframe', isCompleted: false, isActive: false, isOptional: false },
  { id: '3', title: 'Demand Sources', description: 'Configure demand inputs', isCompleted: false, isActive: false, isOptional: false },
  { id: '4', title: 'Supply Parameters', description: 'Set supply chain parameters', isCompleted: false, isActive: false, isOptional: false },
  { id: '5', title: 'Constraints', description: 'Apply planning constraints', isCompleted: false, isActive: false, isOptional: true },
  { id: '6', title: 'Notifications', description: 'Configure notifications', isCompleted: false, isActive: false, isOptional: true }
])

const wizardData = reactive<WizardData>({
  planningScope: {
    itemCodes: [],
    warehouseCodes: [],
    includeAll: true
  },
  planningPeriod: {
    startDate: '',
    endDate: '',
    bucketSize: 'weekly'
  },
  demandSources: {
    customerOrders: true,
    forecasts: true,
    safetyStock: true,
    transferOrders: false
  },
  supplyParameters: {
    leadTimeBuffer: 0,
    safetyStockMultiplier: 1.0,
    minimumOrderQuantity: true,
    lotSizing: 'lot_for_lot'
  },
  constraints: {
    supplierCapacity: false,
    productionCapacity: false,
    warehouseCapacity: false,
    budgetConstraints: false,
    maxBudget: 0
  },
  notifications: {
    emailNotifications: false,
    emailAddresses: [''],
    notifyOnCompletion: true,
    notifyOnErrors: true
  }
})

const items = computed(() => mrpStore.items)
const warehouses = computed(() => mrpStore.warehouses)
const currentStep = computed(() => steps.value[currentStepIndex.value])

const enabledDemandSources = computed(() => {
  const sources = []
  if (wizardData.demandSources.customerOrders) sources.push('Customer Orders')
  if (wizardData.demandSources.forecasts) sources.push('Forecasts')
  if (wizardData.demandSources.safetyStock) sources.push('Safety Stock')
  if (wizardData.demandSources.transferOrders) sources.push('Transfer Orders')
  return sources
})

const enabledConstraints = computed(() => {
  const constraints = []
  if (wizardData.constraints.supplierCapacity) constraints.push('Supplier Capacity')
  if (wizardData.constraints.productionCapacity) constraints.push('Production Capacity')
  if (wizardData.constraints.warehouseCapacity) constraints.push('Warehouse Capacity')
  if (wizardData.constraints.budgetConstraints) constraints.push('Budget')
  return constraints
})

function nextStep() {
  if (currentStepIndex.value < steps.value.length - 1) {
    // Mark current step as completed
    steps.value[currentStepIndex.value].isCompleted = true
    steps.value[currentStepIndex.value].isActive = false
    
    // Move to next step
    currentStepIndex.value++
    steps.value[currentStepIndex.value].isActive = true
  }
}

function previousStep() {
  if (currentStepIndex.value > 0) {
    // Mark current step as inactive
    steps.value[currentStepIndex.value].isActive = false
    
    // Move to previous step
    currentStepIndex.value--
    steps.value[currentStepIndex.value].isActive = true
    steps.value[currentStepIndex.value].isCompleted = false
  }
}

function addEmailAddress() {
  wizardData.notifications.emailAddresses.push('')
}

function removeEmailAddress(index: number) {
  if (wizardData.notifications.emailAddresses.length > 1) {
    wizardData.notifications.emailAddresses.splice(index, 1)
  }
}

async function createPlan() {
  loading.value = true
  
  try {
    // Clean up email addresses
    wizardData.notifications.emailAddresses = wizardData.notifications.emailAddresses.filter(email => email.trim())
    
    const plan = await mrpStore.createPlanFromWizard(wizardData)
    
    // Navigate to planning view or show success message
    router.push('/mrp/planning')
    
  } catch (error) {
    console.error('Failed to create plan:', error)
  } finally {
    loading.value = false
  }
}

async function loadInitialData() {
  try {
    await mrpStore.fetchMasterData()
    
    // Set default dates
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    wizardData.planningPeriod.startDate = nextWeek.toISOString().split('T')[0]
    wizardData.planningPeriod.endDate = nextMonth.toISOString().split('T')[0]
    
  } catch (error) {
    console.error('Failed to load initial data:', error)
  }
}

onMounted(() => {
  loadInitialData()
})
</script>
