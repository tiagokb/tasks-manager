<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
import Filter from '../components/Filter.vue'
import { useModalStore } from '../stores/modalStore'
import EditTask from '@/components/EditCreateTask.vue'
import Table from '@/components/Table.vue'

const store = useTaskStore()
store.fetchTasks()

const modal = useModalStore()

const openCreate = () => {
  modal.open(EditTask, {
    onSavedTask: () => {
      modal.close()
    }
  })
}

</script>

<template>
  <div class="bg-gray-100 px-8 py-4 rounded-md shadow-md mb-6">
    <Filter />

    <div class="flex justify-end mb-4">
      <button @click="openCreate" class="bg-blue-500 text-white px-4 py-2 rounded">
        + Nova Tarefa
      </button>
    </div>
  </div>

  <Table />

</template>

<style scoped>
</style>
