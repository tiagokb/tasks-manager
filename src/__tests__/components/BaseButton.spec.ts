import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'
import { describe, expect, it, vi } from 'vitest'

describe('BaseButton.vue', () => {
  it('renderiza com slot correto', () => {
    const wrapper = mount(BaseButton, {
      props: { buttonType: 'primary' },
      slots: { default: 'Click Aqui' }
    })
    expect(wrapper.text()).toContain('Click Aqui')
  })

  it('dispara o evento click', async () => {
    const onClick = vi.fn()
    const wrapper = mount(BaseButton, {
      props: {
        buttonType: 'primary',
        onClick
      }
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('aplica classes do tipo de botão', () => {
    const wrapper = mount(BaseButton, { props: { buttonType: 'outline' } })
    expect(wrapper.classes()).toContain('btn-outline')
  })
})
