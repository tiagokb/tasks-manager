<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TaskStatus, useTaskStore } from '@/stores/taskStore.ts'

const props = defineProps<{ taskId?: number, onSavedTask?: () => object }>()

const store = useTaskStore()

const taskForm = ref({
  title: '',
  status: TaskStatus
})

onMounted(async () => {
  if (props.taskId) {
    const task = await store.getTask(props.taskId)
    if (task) {
      taskForm.value = { ...task }
    }
  }
})

const save = () => {
  if (props.taskId) {
    store.updateTask(props.taskId, taskForm.value)
  } else {
    store.createTask(taskForm.value)
  }

  props.onSavedTask?.()
}

</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">
      {{ props.taskId ? `Editar tarefa, id: ${props.taskId}` : 'Criar Nova Tarefa' }}</h2>
    <div class="flex flex-col gap-1 justify-start">
      <label for="form-title">Titulo da Tarefa</label>
      <input
        id="form-title"
        v-model="taskForm.title"
        placeholder="Novo título"
        class="border p-2 w-full mb-4"
      />
    </div>
    <div class="flex flex-col gap-1 justify-start">
      <label for="form-status">Titulo da Tarefa</label>
      <select
        id="form-status"
        v-model="taskForm.status"
        class="border p-2 w-full mb-4"
      >
        <option v-for="status in TaskStatus" :key="status"
                :value="status">{{ status }}
        </option>
      </select>
    </div>
    <button @click="save" class="bg-blue-500 text-white px-4 py-2 rounded">
      Salvar
    </button>
  </div>
</template>
