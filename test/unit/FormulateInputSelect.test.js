import Vue from 'vue'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Formulate from '@/Formulate.js'
import FormulateInput from '@/FormulateInput.vue'
import FormulateInputSelect from '@/inputs/FormulateInputSelect.vue'

Vue.use(Formulate)

describe('FormulateInputSelect', () => {
  it('renders select input when type is "select"', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select' } })
    expect(wrapper.findComponent(FormulateInputSelect).exists()).toBe(true)
  })

  it('renders select options when options object is passed', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', options: { first: 'First', second: 'Second' } } })
    const option = wrapper.find('option[value="second"]')
    expect(option.exists()).toBe(true)
    expect(option.text()).toBe('Second')
  })

  it('renders select options when options array is passed', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', options: [
      { value: 13, label: 'Jane' },
      { value: 22, label: 'Jon' }
    ]} })
    const option = wrapper.find('option[value="22"]')
    expect(option.exists()).toBe(true)
    expect(option.text()).toBe('Jon')
  })

  it('renders select list with no options when empty array is passed.', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', options: []} })
    const option = wrapper.find('option')
    expect(option.exists()).toBe(false)
  })

  it('renders select list placeholder option.', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', placeholder: 'Select this', options: []} })
    const options = wrapper.findAll('option')
    expect(options.length).toBe(1)
    expect(options.at(0).attributes('disabled')).toBeTruthy()
  })

  it('passes an explicitly given name prop through to the root element', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', options: [],  name: 'foo' } })
    expect(wrapper.find('select[name="foo"]').exists()).toBe(true)
  })

  it('additional context does not bleed through to text select attributes', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select' } } )
    expect(Object.keys(wrapper.find('select').attributes())).toEqual(["id"])
  })

  it('sets data-has-value when it has a value', async () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'select', options: {first: 'First', second: 'Second'} }})
    expect(wrapper.attributes('data-has-value')).toBe(undefined)
    wrapper.find('select').setValue('second')
    await flushPromises()
    expect(wrapper.attributes('data-has-value')).toBe('true')
  })

  it('can add classes to the element wrapper', () => {
    const wrapper = mount(FormulateInput, {
      propsData: { type: 'select', elementClass: ['test-class']}
    })
    expect(wrapper.findComponent(FormulateInputSelect).attributes('class'))
      .toBe('formulate-input-element formulate-input-element--select test-class')
  })

  it('can add classes to the input element', () => {
    const wrapper = mount(FormulateInput, {
      propsData: { type: 'select', inputClass: ['test-class']}
    })
    expect(wrapper.find('select').attributes('class'))
      .toBe('test-class')
  })
})
