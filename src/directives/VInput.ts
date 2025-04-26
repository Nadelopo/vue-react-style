import type { Dispatch, SetStateAction } from '@/hooks'
import type { Directive, Ref } from 'vue'

type InputElement = HTMLInputElement | HTMLTextAreaElement

export const VInput: Directive<
  unknown,
  [Ref<unknown>, Dispatch<SetStateAction<unknown>>],
  string,
  string
> = {
  beforeMount: (el) => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
      throw new Error('VInput must be used on an input or textarea element')
    }
  },
  mounted: (el, binding) => {
    const [state, setState] = binding.value

    if (typeof state === 'undefined') {
      throw new Error('VInput must be used with a state')
    }
    if (typeof setState === 'undefined') {
      throw new Error('VInput must be used with a setState')
    }

    const input = el as InputElement

    input.value = String(state.value ?? '')
    input.oninput = () => {
      const value = input.type === 'number' ? Number(input.value) : input.value
      setState(value)
    }
  },
  updated: (el, binding) => {
    const input = el as InputElement
    const [state] = binding.value

    if (input.value !== String(state.value ?? '')) {
      input.value = String(state.value ?? '')
    }
  },
}
