<script setup lang="ts">

import { TaskStatus, useTaskStore } from '../stores/taskStore'
import { useModalStore } from '@/stores/modalStore.ts'
import EditTask from '@/components/EditTask.vue'

const store = useTaskStore()
const modal = useModalStore()

const openEdit = async (taskId: number) => {
  modal.open(EditTask, {
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
    <table class="table-fixed w-full bg-surface shadow-md rounded overflow-hidden overscroll-auto">
      <thead class="bg-secondary text-on-secondary">
      <tr>
        <th class="py-2 px-4 text-left">Nome</th>
        <th class="py-2 px-4 text-left">Status</th>
        <th class="py-2 px-12 flex text-left justify-end">Ações</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="store.paginatedTasks.length > 0">
        <tr v-for="task in store.paginatedTasks" :key="task.id"
            class="border-b border-secondary-dark">
          <td class="py-2 px-4 truncate">{{ task.title }}</td>
          <td class="py-2 px-4">
          <span :class="[{
            'bg-warning text-on-surface': task.status === TaskStatus.InProgress,
            'bg-successful': task.status === TaskStatus.Completed,
            'bg-danger': task.status === TaskStatus.Overdue,
          }, 'text-on-danger rounded px-2']">
            {{ task.status }}
          </span>
          </td>
          <td class="py-2 px-4 flex gap-2 justify-end">
            <button
              class="bg-secondary text-on-secondary px-2 py-1 rounded"
              @click="openEdit(task.id)"
            >
              Editar
            </button>
            <button
              class="bg-danger text-on-danger px-2 py-1 rounded"
              @click="deleteTask(task.id)"
            >
              X
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="3" class="py-4 text-center">
            Não foi encontrado dados
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <!-- Paginação -->
    <div class="flex justify-center items-center gap-2 mt-4">
      <button
        class="px-3 py-1 rounded bg-secondary hover:bg-secondary-dark text-on-secondary"
        :disabled="store.currentPage === 1"
        @click="store.goToPage(store.currentPage - 1)"
      >
        Anterior
      </button>

      <span>Página {{ store.currentPage }} de {{ store.totalPages }}</span>

      <button
        class="px-3 py-1 rounded bg-secondary hover:bg-secondary-dark text-on-secondary"
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
