import { ref, type Ref } from 'vue'
import type { Dispatch } from './types'

type Reducer<S, A> = (state: S, action: A) => S

export const useReducer = <S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  initializer?: (arg: S) => S,
): [Ref<S>, Dispatch<A>] => {
  const state = ref<S>(initializer ? initializer(initialState) : initialState) as Ref<S>

  const dispatch = (action: A): void => {
    state.value = reducer(state.value, action)
  }

  return [state, dispatch] as const
}
