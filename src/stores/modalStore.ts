import { defineStore } from 'pinia'

type ModalItem = {
  view: unknown
  props: Record<string, unknown>
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    stack: [] as ModalItem[]
  }),
  getters: {
    current: (state) => state.stack[state.stack.length - 1] || null,
    isOpen: (state) => state.stack.length > 0
  },
  actions: {
    open(view: unknown, props = {}) {
      this.stack.push({ view, props })
    },
    close() {
      this.stack.pop()
    },
    closeAll() {
      this.stack = []
    }
  }
})
