<script setup lang="ts">

import { RecycleScroller } from 'vue-virtual-scroller'
import { TaskStatus, useTaskStore } from '@/stores/taskStore.ts'
import { onMounted } from 'vue'

const store = useTaskStore()
onMounted(() => store.fetchTasks())
</script>

<template>
  <div class="flex flex-col w-full h-[300px]">
    <RecycleScroller
      class="flex-1 w-full"
      :items="store.tasks"
      :item-size="64"
      :min-item-size="64"
      :buffer="200"
      key-field="id"
      v-slot="{ item }"
    >
      <div
        class="w-full border-b border-secondary flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start md:items-center py-2 px-2"
      >
        <span class="truncate md:truncate-3xl">{{ item.title }}</span>
        <span
          :class="[{
      'bg-warning text-on-surface': item.status === TaskStatus.InProgress,
      'bg-successful': item.status === TaskStatus.Completed,
      'bg-danger': item.status === TaskStatus.Overdue,
    }, 'rounded px-2 text-sm md:text-base']"
        >
    {{ item.status }}
  </span>
      </div>
    </RecycleScroller>
  </div>
</template>

<style scoped>
</style>
