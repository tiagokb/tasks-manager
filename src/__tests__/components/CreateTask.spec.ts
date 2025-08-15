import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import CreateTask from '@/components/CreateTask.vue'
import BaseInput from '@/components/BaseInput.vue'

describe('CreateTask.vue', () => {

  const pinia = createPinia()
  setActivePinia(pinia)

  it('renderiza com valores iniciais', () => {
    const wrapper = mount(CreateTask, {
      global: {
        plugins: [pinia]
      }
    })
    const input = wrapper.findComponent(BaseInput).find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('')
    expect(wrapper.vm.taskForm.title).toBe('')
  })

  it('emite evento com dados do formulário', async () => {
    const onSavedTask = vi.fn()
    const wrapper = mount(CreateTask, {
      props: { onSavedTask: onSavedTask },
      global: { plugins: [pinia] }
    })

    const input = wrapper.findComponent(BaseInput).find('input')
    await input.setValue('Nova Tarefa')

    await wrapper.find('form').trigger('submit.prevent')
    expect(onSavedTask).toHaveBeenCalled()
  })

  it('não envia formulario se o input estiver vazio', async () => {
    const onSavedTask = vi.fn()
    const wrapper = mount(CreateTask, {
      props: { onSavedTask: onSavedTask },
      global: {
        plugins: [pinia]
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(onSavedTask).not.toHaveBeenCalled()
  })
})
