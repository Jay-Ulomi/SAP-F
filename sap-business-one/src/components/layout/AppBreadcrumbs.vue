<template>
  <nav v-if="breadcrumbs.length > 0" class="bg-white px-4 py-3 border-b border-gray-200">
    <ol class="flex items-center space-x-2">
      <li>
        <router-link to="/dashboard" class="text-gray-400 hover:text-gray-600">
          <HomeIcon class="w-4 h-4" />
        </router-link>
      </li>
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <li class="flex items-center">
          <ChevronRightIcon class="w-4 h-4 text-gray-400 mx-1" />
          <router-link
            v-if="crumb.route && index < breadcrumbs.length - 1"
            :to="crumb.route"
            class="text-sm text-gray-600 hover:text-sap-blue"
          >
            {{ crumb.name }}
          </router-link>
          <span v-else class="text-sm text-gray-900 font-medium">
            {{ crumb.name }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modules: Array<any>
}>()

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs = []

  if (pathSegments.length > 0) {
    // Check for dashboard first
    if (route.path === '/dashboard') {
      crumbs.push({ name: 'Dashboard' })
      return crumbs
    }

    // Check for modules with submodules
    const module = props.modules.find((m) =>
      m.submodules && m.submodules.some((s: any) => s.route.startsWith(`/${pathSegments[0]}`))
    )

    if (module) {
      crumbs.push({ name: module.name, route: `/${pathSegments[0]}` })

      // Find matching submodule
      const submodule = module.submodules.find((s: any) => s.route === route.path)
      if (submodule) {
        crumbs.push({ name: submodule.name })
      }
    } else {
      // Single module without submodules
      const singleModule = props.modules.find((m) => m.route === route.path)
      if (singleModule) {
        crumbs.push({ name: singleModule.name })
      }
    }
  }

  return crumbs
})
</script>