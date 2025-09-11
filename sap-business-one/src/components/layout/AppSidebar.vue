<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 bg-sap-blue">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span class="text-sap-blue font-bold text-lg">S1</span>
          </div>
          <span class="ml-3 text-white font-semibold text-lg">SAP Business One</span>
        </div>
        <button
          @click="$emit('close')"
          class="lg:hidden text-white hover:text-gray-200"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <div v-for="module in modules" :key="module.id">
          <router-link
            v-if="module.route && !module.submodules"
            :to="module.route"
            @click="$emit('navigate')"
            :class="[
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group',
              isModuleActive(module)
                ? 'bg-sap-light-blue text-sap-blue font-semibold'
                : 'text-gray-700 hover:bg-sap-light-blue hover:text-sap-blue'
            ]"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center space-x-3">
                <component
                  :is="module.icon"
                  :class="[
                    'w-5 h-5 transition-colors duration-200',
                    isModuleActive(module)
                      ? 'text-sap-blue'
                      : 'text-gray-500 group-hover:text-sap-blue'
                  ]"
                />
                <span class="truncate">{{ module.name }}</span>
              </div>
            </div>
          </router-link>

          <button
            v-else
            @click="toggleModule(module.id)"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium rounded-lg transition-all duration-200 group',
              isModuleActive(module)
                ? 'bg-sap-light-blue text-sap-blue font-semibold'
                : 'text-gray-700 hover:bg-sap-light-blue hover:text-sap-blue'
            ]"
          >
            <div class="flex items-center space-x-3">
              <component
                :is="module.icon"
                :class="[
                  'w-5 h-5 transition-colors duration-200',
                  isModuleActive(module)
                    ? 'text-sap-blue'
                    : 'text-gray-500 group-hover:text-sap-blue'
                ]"
              />
              <span class="truncate">{{ module.name }}</span>
            </div>
            <ChevronDownIcon
              :class="[
                'w-4 h-4 transition-transform duration-200',
                expandedModules.includes(module.id) ? 'rotate-180' : ''
              ]"
            />
          </button>

          <!-- Submodules -->
          <div
            v-if="module.submodules && expandedModules.includes(module.id)"
            class="mt-1 space-y-1"
          >
            <router-link
              v-for="submodule in module.submodules"
              :key="submodule.id"
              :to="submodule.route"
              @click="$emit('navigate')"
              :class="[
                'flex items-center pl-11 pr-3 py-2 text-sm rounded-lg transition-all duration-200',
                $route.path === submodule.route
                  ? 'bg-sap-light-blue text-sap-blue font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-sap-blue'
              ]"
            >
              {{ submodule.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  isOpen: boolean
  modules: Array<any>
}>()

const emit = defineEmits<{
  close: []
  navigate: []
}>()

const route = useRoute()
const expandedModules = ref<string[]>([])

const toggleModule = (moduleId: string) => {
  const index = expandedModules.value.indexOf(moduleId)
  if (index > -1) {
    expandedModules.value.splice(index, 1)
  } else {
    expandedModules.value.push(moduleId)
  }
}

const isModuleActive = (module: any) => {
  if (module.route && route.path === module.route) {
    return true
  }
  if (module.submodules) {
    return module.submodules.some((sub: any) => route.path === sub.route)
  }
  return false
}
</script>