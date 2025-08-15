<script setup lang="ts">

import { useModalStore } from '../stores/modalStore'
import BaseButton from '@/components/BaseButton.vue'
import { shallowRef, watch } from 'vue'

const modalStore = useModalStore()

const currentView = shallowRef(null)

watch(
  () => modalStore.current,
  (newVal) => {
    if (newVal) {
      currentView.value = newVal.view
    }
  },
  { immediate: true }
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modalStore.isOpen"
      class="fixed inset-0 flex items-center justify-center bg-surface-dark/50 z-50"
    >

      <div
        class="flex flex-col items-center justify-center w-auto min-w-xs max-w-4xl h-[80%] max-h-[90vh] bg-surface rounded-lg shadow-2xl px-8 py-8">
        <div class="flex flex-row w-full justify-end">
          <BaseButton button-type="ghost" class="text-danger" @click="modalStore.close()">
            ✕
          </BaseButton>
        </div>
        <div class="w-full h-full py-4">
          <component :is="currentView" v-bind="modalStore.current?.props" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
