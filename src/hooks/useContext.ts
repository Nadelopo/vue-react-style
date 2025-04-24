import { defineComponent, provide, inject, type InjectionKey } from 'vue'

export const createContext = <T>(defaultValue: T) => {
  const key = Symbol() as InjectionKey<T>
  const Provider = defineComponent<{ value: T }>(
    (props, { slots }) => {
      provide(key, props.value)
      return () => slots.default?.()
    },
    { props: ['value'] },
  )

  return { Provider, key, defaultValue }
}

export const useContext = <T>(context: { key: InjectionKey<T>; defaultValue: T }) => {
  const injected = inject(context.key, context.defaultValue)!
  return injected
}
