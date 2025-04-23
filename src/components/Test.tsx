import { useEffect } from '@/hooks/useEffect'
import { useState } from '@/hooks/useState'
import { defineComponent } from 'vue'

type Props = { userName: string }

export const Test = defineComponent<Props>(
  (props) => {
    const [count, setCount] = useState(0)

    let controller = new AbortController()

    useEffect(() => {
      window.addEventListener(
        'click',
        () => {
          console.log('clicked in listener')
        },
        { signal: controller.signal },
      )
      console.log('effect')
      return () => {
        controller.abort()
        controller = new AbortController()
      }
    }, [count])

    const reset = () => {
      setCount(0)
    }

    return () => {
      if (count.value > 10) {
        return <div>count is greater than 10</div>
      }

      return (
        <div>
          <div>Test {props.userName}</div>
          <button onClick={() => setCount((c) => c + 1)}>click</button>
          <div>count: {count.value}</div>
          <button onClick={reset}>click</button>
        </div>
      )
    }
  },
  {
    props: ['userName'],
    emits: ['test'],
  },
)
