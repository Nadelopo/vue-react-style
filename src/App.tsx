import { defineComponent, type Ref } from 'vue'
import { useState, type Dispatch, type SetStateAction, createContext, useContext } from './hooks'
import { Counter } from './components/Counter'

type CounterContextType = {
  count: Ref<number>
  setCount: Dispatch<SetStateAction<number>>
  reset: () => void
}

export const CounterContext = createContext<CounterContextType | null>('counter', null)

export const useCounterContext = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('CounterContext is not provided')
  }
  return context
}
export const App = defineComponent(() => {
  const [count, setCount] = useState(0)

  const reset = () => setCount(0)

  const [text, setText] = useState<string | null>(null)
  return () => (
    <div>
      <input
        v-input={[[text, setText]]}
        type="text"
      />
      <div style={{ textAlign: 'center' }}>
        <div>{text.value}</div>
        <button
          onClick={() => setText('')}
          style={{ marginBottom: '20px' }}
        >
          reset
        </button>
      </div>
      <CounterContext.Provider value={{ count, setCount, reset }}>
        <Counter />
      </CounterContext.Provider>
    </div>
  )
})
