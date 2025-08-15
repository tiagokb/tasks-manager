import axios from 'axios'
import type { TaskStatus } from '@/stores/taskStore.ts'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export interface Task {
  id: number
  title: string
  status: TaskStatus,
  createdAt?: string
  updatedAt?: string
}

export const taskService = {
  getAll: async (order: string): Promise<Task[]> => {
    const { data } = await api.get('/tasks', { _sort: 'createdAt', _order: order })
    return data
  },

  getById: async (id: number): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`)
    return data
  },

  create: async (task: omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const now = new Date().toISOString()
    const { data } = await api.post('/tasks', { ...task, createdAt: now, updatedAt: now })
    return data
  },

  update: async (task: Task): Promise<Task> => {
    const { data } = await api.put(`/tasks/${task.id}`, {
      ...task,
      updatedAt: new Date().toISOString()
    })
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  }
}
