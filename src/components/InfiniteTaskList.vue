<script setup lang="ts">

import { RecycleScroller } from 'vue-virtual-scroller'
import { useTaskStore } from '@/stores/taskStore.ts'
import { onMounted } from 'vue'

const store = useTaskStore()
onMounted(() => store.fetchTasks())

</script>

<template>
  <RecycleScroller
    class="h-50 lg:h-[500px] max-h-[50%] min-w-xl"
    :items="store.tasks"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="h-[50%] bg-blue-400 flex flex-row gap-4 justify-center items-center">
      <span>{{ item.title }}</span>
      <span>{{ item.status }}</span>
    </div>
  </RecycleScroller>
</template>

<style scoped>
</style>
