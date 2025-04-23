/// <reference types="vite/client" />

type InputEvent = Event & { target: HTMLInputElement }

declare module 'vue' {
  interface InputHTMLAttributes {
    onInput?: (e: InputEvent) => void
    onChange?: (e: InputEvent) => void
  }
}

export {}
