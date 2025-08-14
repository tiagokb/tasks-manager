import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '@/views/Welcome.vue'
import TaskList from '@/views/TaskList.vue'

const routes = [
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/tasks', name: 'tasks', component: TaskList }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
