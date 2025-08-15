import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Task, taskService } from '@/services/taskService.ts'

export enum TaskStatus {
  InProgress = 'Em andamento',
  Completed = 'Concluída',
  Overdue = 'Atrasada'
}

export const useTaskStore = defineStore('task', () => {

  const tasks = ref<Task[]>([])
  const filters = ref({
    title: '',
    status: ''
  })

  // Filter list
  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
        const matchesTitle = filters.value.title
          ? task.title.toLowerCase().includes(filters.value.title.toLowerCase())
          : true
        const matchesStatus = filters.value.status
          ? task.status === filters.value.status
          : true

        return matchesTitle && matchesStatus
      }
    )
  })

  const clearFilters = () => {
    filters.value.title = ''
    filters.value.status = ''
  }

  // Pagination functions
  const currentPage = ref(1)
  const pageSize = 10 // quantos itens por página
  const order = 'desc'

  const resetPage = () => {
    goToPage(1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const totalPages = computed(() => {
    return Math.ceil(filteredTasks.value.length / pageSize)
  })

  // Fake Pagination
  const paginatedTasks = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredTasks.value.slice(start, start + pageSize)
  })

  //CRUD functions
  const fetchTasks = async () => {
    try {
      tasks.value = await taskService.getAll(order)
    } catch (err) {
      console.log("error while fetch", err)
    }
  }

  const createTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskService.create(task)
      if (!tasks.value.find(t => t.id === newTask.id)) {
        tasks.value.push(newTask)
      }
    } catch (err) {
      console.error('Erro ao criar tarefa: ', err)
    }
  }

  const getTask = async (id: string): Promise<Task | undefined> => {
    try {
      const task = tasks.value.find(t => t.id === id)
      if (task) return task

      return await taskService.getById(id)
    } catch (err) {
      console.error('Erro ao buscar task: ', err)
      return undefined
    }
  }

  const updateTask = async (id: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task | undefined> => {
    try {
      const updatedTask = await taskService.update(task)
      const index = tasks.value.findIndex(t => t.id === updatedTask.id)
      if (index !== -1) tasks.value[index] = updatedTask
    } catch (err) {
      console.error('Erro ao atualizar tarefa: ', err)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      console.error('Erro ao deletar tarefa: ', err)
    }
  }

  return {
    tasks,
    filters,
    filteredTasks,
    clearFilters,
    resetPage,
    goToPage,
    paginatedTasks,
    currentPage,
    order,
    totalPages,
    fetchTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
  }
})
