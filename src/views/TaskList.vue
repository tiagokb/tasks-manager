<script setup lang="ts">
import { computed, ref } from 'vue'
import { TaskStatus, useTaskStore } from '../stores/taskStore'
import Modal from '../components/Modal.vue'

const store = useTaskStore()
store.fetchTasks()

const showModal = ref(false)
const editingTaskId = ref<number | null>(null)

const taskForm = ref({
  title: null,
  status: null
})

const openCreate = () => {
  editingTaskId.value = null
  taskForm.value = { title: '', status: TaskStatus.InProgress }
  showModal.value = true
}

const openEdit = async (taskId: number) => {
  const task = await store.getTask(taskId)
  if (task) {
    editingTaskId.value = taskId
    taskForm.value = { ...task }
    showModal.value = true
  } else {
    console.warn('Task não encontrada')
  }
}

const saveTask = () => {
  if (editingTaskId.value) {
    store.updateTask(editingTaskId.value, taskForm.value)
  } else {
    store.createTask(taskForm.value)
  }
  showModal.value = false
}

const deleteTask = (id: number) => {
  store.deleteTask(id)
}

// Configuração de paginação
const currentPage = ref(1)
const pageSize = 10 // quantos itens por página

// Cálculo da lista filtrada
const filteredTasks = computed(() => {
  return store.filteredTasks
})

// Pega as tarefas da página atual
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTasks.value.slice(start, start + pageSize)
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredTasks.value.length / pageSize)
})

// Navegar
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const resetPage = () => {
  goToPage(1)
}

const clearFilters = () => {
  store.clearFilters()
  resetPage()
}
</script>

<template>
  <div class="bg-gray-100 px-8 py-4 rounded-md shadow-md mb-6">
    <div class="flex flex-col md:flex-row justify-center gap-10 items-end">
      <span><strong>Filtrar por: </strong></span>

      <div class="flex flex-col gap-1 w-auto">
        <label for="filter-name" class="font-medium text-gray-700">Nome</label>
        <input
          id="filter-name"
          type="text"
          v-model="store.filters.title"
          @keyup="resetPage"
          placeholder="Procurar por nome da tarefa"
          class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex flex-col gap-1 w-auto">
        <label for="filter-status" class="font-medium text-gray-700">Status</label>
        <select
          id="filter-status"
          v-model="store.filters.status"
          @change="resetPage"
          class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="status in Object.values(TaskStatus)" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <div class="flex flex-row gap-4 mt-4 md:mt-0">
        <button
          @click="clearFilters"
          class="rounded bg-gray-600 px-5 py-2 text-white font-semibold hover:bg-gray-700 transition"
        >
          Resetar Filtro
        </button>
      </div>
    </div>

    <div class="flex justify-end mb-4">
      <button @click="openCreate" class="bg-blue-500 text-white px-4 py-2 rounded">
        + Nova Tarefa
      </button>
    </div>

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
        <tr v-for="task in paginatedTasks" :key="task.id" class="border-b">
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
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Anterior
        </button>

        <span>Página {{ currentPage }} de {{ totalPages }}</span>

        <button
          class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Próxima
        </button>
      </div>
    </div>

    <Modal
      :show="showModal"
      :title="editingTaskId ? 'Editar Tarefa' : 'Nova Tarefa'"
      @close="showModal = false"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">Nome</label>
          <input
            type="text"
            v-model="taskForm.title"
            class="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Status</label>
          <select
            v-model="taskForm.status"
            class="border rounded px-2 py-1 w-full"
          >
            <option v-for="status in Object.values(TaskStatus)" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-2">
          <button @click="showModal = false" class="bg-gray-400 px-4 py-2 rounded text-white">
            Cancelar
          </button>
          <button @click="saveTask" class="bg-green-500 px-4 py-2 rounded text-white">
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
</style>
