import { readonly, ref } from 'vue'

export const useState = <T>(initialState: T) => {
  const state = ref<T>(initialState)
  const setState = (value: T | ((prev: T) => T)) => {
    state.value = typeof value === 'function' ? (value as (prev: T) => T)(state.value) : value
  }
  return [readonly(state), setState] as const
}
