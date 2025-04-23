import { computed, ref, watch, type Ref } from 'vue'

export const useMemo = <T>(factory: () => T, deps: Ref<unknown>[]): Ref<T> => {
  const result = ref<T>(factory()) as Ref<T>

  watch(
    deps,
    () => {
      result.value = factory()
    },
    { deep: true },
  )

  return result
}

export const useMemoEffective = computed
