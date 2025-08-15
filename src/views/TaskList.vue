<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
import Filter from '../components/Filter.vue'
import { useModalStore } from '../stores/modalStore'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'
import InfiniteTaskList from '@/components/InfiniteTaskList.vue'
import BaseButton from '@/components/BaseButton.vue'
import CreateTask from '@/components/CreateTask.vue'

const store = useTaskStore()

onMounted(() => {
  store.fetchTasks()
})

const modal = useModalStore()

const openCreate = () => {
  modal.open(CreateTask, {
    onSavedTask: () => {
      modal.close()
    }
  })
}

const openListView = () => {
  modal.open(InfiniteTaskList)
}

</script>

<template>
  <div class="bg-surface-dark text-on-surface px-8 py-4 rounded-md shadow-md">
    <div class="flex flex-col-reverse lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-10 px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-4 items-cnter justify-center">
        <base-button buttonType="primary" @click="openCreate">
          + Nova Tarefa
        </base-button>

        <base-button class="text-secondary" buttonType="ghost" @click="openListView">
          Ver Lista Completa
        </base-button>
      </div>

      <Filter />
    </div>
  </div>

  <Table />

</template>

<style scoped>
</style>
