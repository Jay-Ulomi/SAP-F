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

    // Find the main module
    const module = props.modules.find((m) => {
      if (m.route && m.route.startsWith(`/${pathSegments[0]}`)) {
        return true
      }
      if (m.submodules) {
        return m.submodules.some((s: any) => {
          if (s.route && s.route.startsWith(`/${pathSegments[0]}`)) {
            return true
          }
          if (s.submodules) {
            return s.submodules.some((nested: any) => nested.route && nested.route.startsWith(`/${pathSegments[0]}`))
          }
          return false
        })
      }
      return false
    })

    if (module) {
      crumbs.push({ name: module.name, route: `/${pathSegments[0]}` })

      // Check for 2nd level submodule
      if (module.submodules) {
        const submodule = module.submodules.find((s: any) => {
          if (s.route === route.path) {
            return true
          }
          if (s.submodules) {
            return s.submodules.some((nested: any) => nested.route === route.path)
          }
          return false
        })

        if (submodule) {
          // If the submodule has nested submodules, find the specific nested one
          if (submodule.submodules) {
            const nestedSubmodule = submodule.submodules.find((nested: any) => nested.route === route.path)
            if (nestedSubmodule) {
              crumbs.push({ name: submodule.name })
              crumbs.push({ name: nestedSubmodule.name })
            }
          } else {
            crumbs.push({ name: submodule.name })
          }
        }
      }
    }
  }

  return crumbs
})
</script>