import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TanstackView from '@/views/TanstackView.vue'
import ZodView from '@/views/ZodView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tanstack',
      name: 'tanstack',
      component: TanstackView,
    },
    {
      path: '/zod',
      name: 'zod',
      component: ZodView,
    },
  ],
})

export default router
