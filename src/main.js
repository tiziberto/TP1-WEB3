import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import router from './router' 

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { 
        colors: {
          primary: '#2f41a5ff',
          secondary: '#E53935',
          success: '#4CAF50',
          error: '#FF5252',
          background: '#FAFAFA', 
        },
      },
    },
  },
})

createApp(App)
    .use(vuetify) 
    .use(router) 
    .mount('#app')