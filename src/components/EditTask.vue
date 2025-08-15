<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TaskStatus, useTaskStore } from '@/stores/taskStore.ts'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps<{ taskId: string, onSavedTask?: () => object }>()

const store = useTaskStore()

const taskForm = ref({
  title: null,
  status: null
})

onMounted(async () => {
  const task = await store.getTask(props.taskId)
  if (task) {
    taskForm.value = { ...task }
  }
})

const save = () => {
  store.updateTask(props.taskId, taskForm.value)
  props.onSavedTask?.()
}

</script>

<template>
  <div class="flex flex-col gap-4 justify-between items-center px-10 w-full h-full">
    <h2 class="text-xl font-bold mb-4 bg-surface text-on-surface">
      Editar tarefa, id: {{ props.taskId }}</h2>

    <BaseInput class="w-full" :id="'form-title-edit'" :label="'Titulo da Tarefa'" v-model="taskForm.title"
               placeholder="Novo título" />

    <BaseSelect class="w-full" :id="'form-status-edit'" :label="'Status'" v-model="taskForm.status"
                @change="store.resetPage">
      <option v-for="status in TaskStatus" :key="status"
              :value="status">{{ status }}
      </option>
    </BaseSelect>

    <div class="flex flex-row justify-center items-center w-full mt-10">

      <BaseButton button-type="primary" @click="save">
        Salvar
      </BaseButton>
    </div>
  </div>
</template>
