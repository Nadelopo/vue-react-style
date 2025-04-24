import { defineComponent, type Ref } from 'vue'
import { Test } from './components/Test'
import { useState, type Dispatch, type SetStateAction } from './hooks/useState'
import { createContext } from './hooks/useContext'

export const TestContext = createContext<{
  show: Ref<boolean>
  setShow: Dispatch<SetStateAction<boolean>>
} | null>(null)
export const App = defineComponent(() => {
  const [show, setShow] = useState(false)

  return () => (
    <div>
      <TestContext.Provider value={{ show, setShow }}>
        <button onClick={() => setShow((s) => !s)}>click</button>
        {show.value && <Test userName="test" />}
      </TestContext.Provider>
    </div>
  )
})
