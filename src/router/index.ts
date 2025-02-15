import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TanstackView from '@/views/TanstackView.vue'
import ZodView from '@/views/ZodView.vue'
import UserAdd from '@/views/User/UserAdd.vue'
import UserDetail from '@/views/User/UserDetail.vue'
import PostList from '@/views/Post/PostList.vue'

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
    {
      path: '/user/add',
      name: 'user-add',
      component: UserAdd,
    },
    {
      path: '/user/detail/:id',
      name: 'user-detail',
      component: UserDetail,
    },
    {
      path: '/post/list',
      name: 'post-list',
      component: PostList,
    },
  ],
})

export default router
