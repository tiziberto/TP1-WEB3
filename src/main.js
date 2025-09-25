// src/main.js

import { createApp } from 'vue'
import App from './App.vue'

// 1. Configuración de Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// 2. Configuración de Vue Router
import router from './router' 

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light' 
  },
})

// 3. Montaje de la aplicación, usando Vuetify y Router
createApp(App)
    .use(vuetify) // Usa Vuetify
    .use(router)  // Usa Vue Router
    .mount('#app')