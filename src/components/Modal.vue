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
      class="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
    >

      <div
        class="flex flex-col items-center justify-center w-auto max-w-4xl h-auto max-h-[90%] bg-white rounded-lg shadow-2xl px-8 py-4">
        <div class="flex flex-row w-full justify-end">
          <button
            @click="close"
            class="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div class="w-full h-full py-4">
          <component :is="current?.view" v-bind="current?.props" />
        </div>
      </div>

      <!--      <div class="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative m-10 h-[%]">-->

      <!--      </div>-->
    </div>
  </Teleport>
</template>
