<script setup lang="ts">

import { TaskStatus, useTaskStore } from '../stores/taskStore'

const store = useTaskStore()

const clearFilters = () => {
  store.clearFilters()
  store.resetPage()
}

</script>

<template>
  <div class="flex flex-col md:flex-row justify-center gap-10 items-end">
    <span><strong>Filtrar por: </strong></span>

    <div class="flex flex-col gap-1 w-auto">
      <label for="filter-name" class="font-medium text-gray-700">Nome</label>
      <input
        id="filter-name"
        type="text"
        v-model="store.filters.title"
        @keyup="store.resetPage"
        placeholder="Procurar por nome da tarefa"
        class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col gap-1 w-auto">
      <label for="filter-status" class="font-medium text-gray-700">Status</label>
      <select
        id="filter-status"
        v-model="store.filters.status"
        @change="store.resetPage"
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
</template>

<style scoped>

</style>
