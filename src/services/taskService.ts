import axios from 'axios'
import type { TaskStatus } from '@/stores/taskStore.ts'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export interface Task {
  id: number
  title: string
  status: TaskStatus
}

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get('/tasks')
    return data
  },

  getById: async (id: number): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`)
    return data
  },

  create: async (task: omit<Task, 'id'>): Promise<Task> => {
    const { data } = await api.post('/tasks', task)
    return data
  },

  update: async (task: Task): Promise<Task> => {
    const { data } = await api.put(`/tasks/${task.id}`, task)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  }
}
