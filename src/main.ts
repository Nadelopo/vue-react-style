import './assets/main.css'

import { createApp } from 'vue'
import { App } from './App.tsx'
import { VInput } from './directives/VInput.ts'

createApp(App).directive('input', VInput).mount('#app')
