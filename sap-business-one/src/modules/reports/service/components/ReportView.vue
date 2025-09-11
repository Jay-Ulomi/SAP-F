<template>
  <div class="service-report-view">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">{{ report.name }}</h2>
      <p v-if="report.description" class="text-gray-600 mt-1">{{ report.description }}</p>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Service Report Data</h3>
        
        <div v-if="loading" class="flex justify-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          <p>Service report data will be displayed here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  report: any
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})
</script>