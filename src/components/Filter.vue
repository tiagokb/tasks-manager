<script setup lang="ts">

import { TaskStatus, useTaskStore } from '../stores/taskStore'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

const store = useTaskStore()

const clearFilters = () => {
  store.clearFilters()
  store.resetPage()
}

</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 items-start md:items-end justify-center">
    <BaseInput class="w-full md:w-auto" :id="'filter-name'" :label="'Nome'" type="text" v-model="store.filters.title"
               @keyup="store.resetPage" placeholder="Procurar pelo titulo da tarefa" />

    <BaseSelect class="w-full md:w-auto" :id="'filter-status'" :label="'Status'" v-model="store.filters.status"
                @change="store.resetPage">
      <option value="">Todos</option>
      <option v-for="status in Object.values(TaskStatus)" :key="status" :value="status">
        {{ status }}
      </option>
    </BaseSelect>

    <div class="flex flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">

      <BaseButton class="w-full md:w-auto" button-type="outline" @click="clearFilters">
        Resetar Filtro
      </BaseButton>
    </div>
  </div>
</template>
