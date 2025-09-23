<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="$emit('close')"
        ></div>

        <!-- Modal Panel -->
        <div class="flex min-h-screen items-end justify-center p-0 text-center sm:items-center sm:p-4">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="isOpen"
              :class="[
                'relative transform overflow-hidden bg-white text-left shadow-xl transition-all',
                fullScreenOnMobile
                  ? 'w-full h-full min-h-screen sm:min-h-0 sm:rounded-lg sm:my-8 sm:w-full'
                  : 'rounded-t-lg sm:rounded-lg w-full sm:my-8 sm:w-full',
                sizeClasses
              ]"
              @click.stop
            >
              <!-- Modal Header -->
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-base sm:text-lg font-semibold leading-6 text-gray-900">
                    {{ title }}
                  </h3>
                  <button
                    @click="$emit('close')"
                    type="button"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sap-blue focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <!-- Modal Body -->
                <div class="mt-2 max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-250px)] overflow-y-auto">
                  <slot></slot>
                </div>
              </div>

              <!-- Modal Footer -->
              <div
                v-if="$slots.footer"
                class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3"
              >
                <slot name="footer"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  fullScreenOnMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'lg',
  fullScreenOnMobile: true
})

defineEmits<{
  close: []
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl md:max-w-4xl',
    xl: 'sm:max-w-4xl md:max-w-6xl',
    full: 'sm:max-w-full'
  }
  return sizes[props.size] || sizes.lg
})
</script>