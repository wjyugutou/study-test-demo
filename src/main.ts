import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/flip',
      component: () => import('@/pages/flip/index.vue'),
      children: [
        {
          path: 'flip-two',
          component: () => import('@/pages/flip/flip-two/index.vue'),
        },
      ],
    },
  ],
})
app.use(router)
app.mount('#app')
