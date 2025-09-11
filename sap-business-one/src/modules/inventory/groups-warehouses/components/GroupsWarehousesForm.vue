<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div
      class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
    >
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">
            {{ isEditing ? `Edit ${formType}` : `Create New ${formType}` }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                @click="activeTab = tab.id"
                :class="[
                  activeTab === tab.id
                    ? 'border-sap-blue text-sap-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Basic Information Tab -->
          <div v-if="activeTab === 'basic'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ formType === 'Item Group' ? 'Group Code' : formType === 'Warehouse' ? 'Warehouse Code' : 'Location Code' }} *
                  </label>
                  <input
                    v-model="formData.code"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :placeholder="`Enter ${formType.toLowerCase()} code`"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ formType === 'Item Group' ? 'Group Name' : formType === 'Warehouse' ? 'Warehouse Name' : 'Location Name' }} *
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :placeholder="`Enter ${formType.toLowerCase()} name`"
                  />
                </div>
                <div v-if="formType === 'Warehouse'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    v-model="formData.type"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="main">Main</option>
                    <option value="secondary">Secondary</option>
                    <option value="storage">Storage</option>
                    <option value="retail">Retail</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                <div v-if="formType === 'Location'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    v-model="formData.type"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="aisle">Aisle</option>
                    <option value="rack">Rack</option>
                    <option value="shelf">Shelf</option>
                    <option value="bin">Bin</option>
                    <option value="zone">Zone</option>
                  </select>
                </div>
                <div v-if="formType === 'Location'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Warehouse *</label>
                  <select
                    v-model="formData.warehouseId"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="">Select Warehouse</option>
                    <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                      {{ warehouse.warehouseCode }} - {{ warehouse.warehouseName }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    v-model="formData.status"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div v-if="formType === 'Warehouse'" class="md:col-span-3">
                  <label class="flex items-center">
                    <input
                      v-model="formData.isDefault"
                      type="checkbox"
                      class="rounded border-gray-300 text-sap-blue shadow-sm focus:border-sap-blue focus:ring-sap-blue"
                    />
                    <span class="ml-2 text-sm text-gray-700">Set as default warehouse</span>
                  </label>
                </div>
                <div class="md:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    :placeholder="`Enter ${formType.toLowerCase()} description`"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Address Tab (Warehouse only) -->
          <div v-if="activeTab === 'address' && formType === 'Warehouse'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Address Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    v-model="formData.address.street"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    v-model="formData.address.city"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    v-model="formData.address.state"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter state/province"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input
                    v-model="formData.address.zipCode"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter ZIP/postal code"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    v-model="formData.address.country"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Tab (Warehouse only) -->
          <div v-if="activeTab === 'contact' && formType === 'Warehouse'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    v-model="formData.contactInfo.phone"
                    type="tel"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    v-model="formData.contactInfo.email"
                    type="email"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter email address"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                  <input
                    v-model="formData.contactInfo.manager"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter manager name"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Capacity Tab -->
          <div v-if="activeTab === 'capacity'" class="space-y-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-base font-medium text-gray-900 mb-4">Capacity Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Total Capacity</label>
                  <input
                    v-model.number="formData.capacity.totalCapacity"
                    type="number"
                    min="0"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter total capacity"
                  />
                </div>
                <div v-if="formType === 'Location'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">X Coordinate</label>
                  <input
                    v-model.number="formData.coordinates.x"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter X coordinate"
                  />
                </div>
                <div v-if="formType === 'Location'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Y Coordinate</label>
                  <input
                    v-model.number="formData.coordinates.y"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter Y coordinate"
                  />
                </div>
                <div v-if="formType === 'Location'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Z Coordinate</label>
                  <input
                    v-model.number="formData.coordinates.z"
                    type="number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter Z coordinate"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md shadow-sm hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : (isEditing ? `Update ${formType}` : `Create ${formType}`) }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type {
  ItemGroup,
  Warehouse,
  Location,
  ItemGroupFormData,
  WarehouseFormData,
  LocationFormData,
  GroupType,
  Status,
  WarehouseType,
  LocationType,
} from '../types'

interface Props {
  item?: ItemGroup | Warehouse | Location | null
  formType: GroupType
  loading?: boolean
  warehouses?: Warehouse[]
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
  warehouses: () => [],
})

const emit = defineEmits<{
  close: []
  submit: [data: ItemGroupFormData | WarehouseFormData | LocationFormData]
}>()

// Tabs configuration
const tabs = computed(() => {
  const baseTabs = [{ id: 'basic', name: 'Basic Information' }]
  
  if (props.formType === 'warehouse') {
    return [
      ...baseTabs,
      { id: 'address', name: 'Address' },
      { id: 'contact', name: 'Contact' },
      { id: 'capacity', name: 'Capacity' },
    ]
  } else if (props.formType === 'location') {
    return [
      ...baseTabs,
      { id: 'capacity', name: 'Capacity & Coordinates' },
    ]
  }
  
  return baseTabs
})

// Active tab
const activeTab = ref('basic')

// Form data
const formData = ref<any>({
  code: '',
  name: '',
  description: '',
  type: '',
  status: 'active' as Status,
  warehouseId: '',
  isDefault: false,
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  contactInfo: {
    phone: '',
    email: '',
    manager: '',
  },
  capacity: {
    totalCapacity: 0,
  },
  coordinates: {
    x: 0,
    y: 0,
    z: 0,
  },
})

// Computed
const isEditing = computed(() => !!props.item)
const formType = computed(() => {
  const typeMap = {
    item_group: 'Item Group',
    warehouse: 'Warehouse',
    location: 'Location',
  }
  return typeMap[props.formType] || props.formType
})

// Watch for item changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      if ('groupName' in newItem) {
        // Item Group
        formData.value = {
          code: newItem.groupCode,
          name: newItem.groupName,
          description: newItem.description || '',
          status: newItem.status,
        }
      } else if ('warehouseName' in newItem) {
        // Warehouse
        formData.value = {
          code: newItem.warehouseCode,
          name: newItem.warehouseName,
          description: newItem.description || '',
          type: newItem.type,
          status: newItem.status,
          isDefault: newItem.isDefault,
          address: newItem.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
          contactInfo: newItem.contactInfo || {
            phone: '',
            email: '',
            manager: '',
          },
          capacity: {
            totalCapacity: newItem.capacity?.totalCapacity || 0,
          },
        }
      } else if ('locationName' in newItem) {
        // Location
        formData.value = {
          code: newItem.locationCode,
          name: newItem.locationName,
          description: newItem.description || '',
          warehouseId: newItem.warehouseId,
          type: newItem.type,
          status: newItem.status,
          capacity: {
            totalCapacity: newItem.capacity?.totalCapacity || 0,
          },
          coordinates: newItem.coordinates || {
            x: 0,
            y: 0,
            z: 0,
          },
        }
      }
    } else {
      // Reset form for new item
      formData.value = {
        code: '',
        name: '',
        description: '',
        type: '',
        status: 'active' as Status,
        warehouseId: '',
        isDefault: false,
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        contactInfo: {
          phone: '',
          email: '',
          manager: '',
        },
        capacity: {
          totalCapacity: 0,
        },
        coordinates: {
          x: 0,
          y: 0,
          z: 0,
        },
      }
    }
  },
  { immediate: true }
)

// Methods
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
