import { defineComponent } from 'vue'
import { Test } from './components/Test'

export const App = defineComponent({
  render() {
    return (
      <div>
        <Test userName="test" />
      </div>
    )
  },
})
