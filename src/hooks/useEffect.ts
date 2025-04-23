import { onMounted, onUnmounted, onUpdated, watch, type Ref } from 'vue'

export const useEffect = (cb: () => void | (() => void), deps?: Ref<unknown>[]) => {
  let cleanup: (() => void) | undefined

  const runEffect = () => {
    cleanup?.()
    const result = cb()
    if (typeof result === 'function') {
      cleanup = result
    }
  }

  onMounted(runEffect)

  if (deps === undefined) {
    onUpdated(runEffect)
  } else if (deps?.length) {
    watch(deps, runEffect, { deep: true })
  }

  onUnmounted(() => cleanup?.())
}
