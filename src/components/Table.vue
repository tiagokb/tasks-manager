<script setup lang="ts">

import { useTaskStore } from '../stores/taskStore'
import { useModalStore } from '@/stores/modalStore.ts'
import EditCreateTask from '@/components/EditCreateTask.vue'

const store = useTaskStore()
const modal = useModalStore()

const openEdit = async (taskId: number) => {
  modal.open(EditCreateTask, {
    taskId: taskId, onSavedTask: () => {
      modal.close()
    }
  })
}

const deleteTask = (id: number) => {
  store.deleteTask(id)
}
</script>

<template>
  <div class="p-4">
    <table class="w-full bg-white shadow-md rounded overflow-hidden">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">Nome</th>
        <th class="py-2 px-4 text-left">Status</th>
        <th class="py-2 px-4 text-left">Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in store.paginatedTasks" :key="task.id" class="border-b">
        <td class="py-2 px-4">{{ task.title }}</td>
        <td class="py-2 px-4">{{ task.status }}</td>
        <td class="py-2 px-4 flex gap-2">
          <button
            class="bg-yellow-400 text-white px-2 py-1 rounded"
            @click="openEdit(task.id)"
          >
            Editar
          </button>
          <button
            class="bg-red-500 text-white px-2 py-1 rounded"
            @click="deleteTask(task.id)"
          >
            Excluir
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <div class="flex justify-center items-center gap-2 mt-4">
      <button
        class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
        :disabled="store.currentPage === 1"
        @click="store.goToPage(store.currentPage - 1)"
      >
        Anterior
      </button>

      <span>Página {{ store.currentPage }} de {{ store.totalPages }}</span>

      <button
        class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
        :disabled="store.currentPage === store.totalPages"
        @click="store.goToPage(store.currentPage + 1)"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
