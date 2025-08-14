<script setup lang="ts">

import { useModalStore } from '../stores/modalStore'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { isOpen, current } = storeToRefs(modalStore)
const { close } = modalStore

</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
        <button
          @click="close"
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <component :is="current?.view" v-bind="current?.props" />
      </div>
    </div>
  </Teleport>
</template>
