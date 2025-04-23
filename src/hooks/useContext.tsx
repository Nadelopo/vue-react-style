import { defineComponent, provide, inject, ref, isRef, type InjectionKey, type Ref } from 'vue'

export const createContext = <T,>(props: { value: T }) => {
  const key = Symbol() as InjectionKey<Ref<T>>
  const Provider = defineComponent(
    (props, { slots }) => {
      const val: Ref = isRef(props.value) ? props.value : ref(props.value)
      provide(key, val)
      return () => slots.default?.()
    },
    { props: ['value'] },
  )

  return { Provider, key, defaultValue: props }
}

export const useContext = <T,>(context: { key: InjectionKey<Ref<T>>; defaultValue: T }) => {
  const injected = inject(context.key, ref(context.defaultValue) as Ref<T>)
  return injected
}
