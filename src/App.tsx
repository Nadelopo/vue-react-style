import { defineComponent } from 'vue'
import { Test } from './components/Test'
import { useState } from './hooks/useState'

export const App = defineComponent(() => {
  const [show, setShow] = useState(false)
  return () => (
    <div>
      <button onClick={() => setShow((s) => !s)}>click</button>
      {show.value && <Test userName="test" />}
    </div>
  )
})
