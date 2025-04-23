import { useEffect } from '@/hooks/useEffect'
import { useMemo, useMemoEffective } from '@/hooks/useMemo'
import { useRef } from '@/hooks/useRef'
import { useState } from '@/hooks/useState'
import { defineComponent } from 'vue'

type Props = { userName: string }

export const Test = defineComponent<Props>(
  (props) => {
    const [count, setCount] = useState(1)

    const inputRef = useRef<HTMLInputElement>()

    const [text, setText] = useState('tes')

    let controller = new AbortController()

    useEffect(() => {
      window.addEventListener('click', () => {}, { signal: controller.signal })
      console.log('effect')
      return () => {
        console.log('cleanup')
        controller.abort()
        controller = new AbortController()
      }
    })

    const reset = () => {
      setCount(0)
    }

    const doubleCount = useMemo(() => {
      console.log('doubleCount')
      return count.value * 2
    }, [count])

    const tripleCount = useMemoEffective(() => {
      console.log('tripleCount')
      return count.value * 3
    })

    return () => {
      return (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={text.value}
            onInput={(e) => setText(e.target.value)}
          />
          {text.value}
          <div>Test {props.userName}</div>
          <button onClick={() => setCount((c) => c + 1)}>click</button>
          <div>count: {count.value}</div>
          <div>double count: {doubleCount.value}</div>
          <div>triple count: {tripleCount.value}</div>
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
