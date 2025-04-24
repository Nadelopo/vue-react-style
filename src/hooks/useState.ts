import { readonly, ref } from 'vue'

export type SetStateAction<S> = S | ((prevState: S) => S)

export const useState = <T>(initialState: T) => {
  const state = ref<T>(initialState)
  const setState = (value: SetStateAction<T>) => {
    return (state.value =
      typeof value === 'function' ? (value as (prev: T) => T)(state.value) : value)
  }
  return [readonly(state), setState] as const
}
