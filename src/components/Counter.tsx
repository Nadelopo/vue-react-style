import { useCounterContext } from '@/App'
import { defineComponent } from 'vue'

export const Counter = defineComponent(() => {
  const { count, setCount, reset } = useCounterContext()

  return () => {
    return (
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={() => setCount((c) => c + 1)}>click</button>
        {count.value}
        <button onClick={reset}>reset</button>
      </div>
    )
  }
})
