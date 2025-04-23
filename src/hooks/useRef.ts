import { ref } from 'vue'

export const useRef = <T>(initialValue: T | null = null) => {
  return ref(initialValue)
}
