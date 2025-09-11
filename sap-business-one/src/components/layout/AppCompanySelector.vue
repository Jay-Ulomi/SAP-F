<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
    >
      <BuildingOfficeIcon class="w-5 h-5 text-gray-400" />
      <span class="text-sm font-medium">{{ selectedCompany.name }}</span>
      <ChevronDownIcon class="w-4 h-4 text-gray-400" />
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div class="p-2">
        <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Select Company
        </div>
        <button
          v-for="company in companies"
          :key="company.id"
          @click="selectCompany(company)"
          :class="[
            'w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors',
            selectedCompany.id === company.id
              ? 'bg-sap-light-blue text-sap-blue font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <div class="flex-1 text-left">
            <div>{{ company.name }}</div>
            <div class="text-xs text-gray-500">{{ company.database }}</div>
          </div>
          <CheckIcon
            v-if="selectedCompany.id === company.id"
            class="w-4 h-4 text-sap-blue"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BuildingOfficeIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

const companies = ref([
  { id: '1', name: 'ACME Corporation', database: 'SBODemoUS' },
  { id: '2', name: 'Global Industries', database: 'GlobalInd' },
  { id: '3', name: 'Tech Solutions Inc', database: 'TechSol' }
])

const selectedCompany = ref(companies.value[0])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectCompany = (company: any) => {
  selectedCompany.value = company
  isOpen.value = false
  // Emit event or update store
  console.log('Company selected:', company)
}
</script>