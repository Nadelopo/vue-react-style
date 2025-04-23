import { onMounted, onUnmounted, watch, type Ref } from 'vue'

export const useEffect = (cb: () => void | (() => void), deps: Ref<unknown>[]) => {
  let cleanup: (() => void) | undefined

  onMounted(() => {
    const result = cb()
    if (typeof result === 'function') {
      cleanup = result
    }
  })

  if (deps.length !== 0) {
    watch(
      deps,
      () => {
        cleanup?.()
        const result = cb()
        if (typeof result === 'function') {
          cleanup = result
        }
      },
      { deep: true },
    )
  }

  onUnmounted(() => {
    cleanup?.()
  })
}
