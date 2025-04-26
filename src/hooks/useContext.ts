import { defineComponent, provide, inject } from 'vue'

export const createContext = <T>(key: string | symbol, defaultValue: T) => {
  const Provider = defineComponent<{ value: T }>(
    (props, { slots }) => {
      provide(key, props.value)
      return () => slots.default?.()
    },
    { props: ['value'] },
  )

  return { Provider, key, defaultValue }
}

export const useContext = <T>(context: { key: string | symbol; defaultValue: T }) => {
  return inject(context.key, context.defaultValue)
}
