import DefaultLayout from '@/layout/DefaultLayout.vue'
import HomeView from '@/modules/home/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '',
      path: '/',
      component: DefaultLayout,
      children: [
        {
          name: 'home',
          path: '',
          component: HomeView
        }
      ]
    }
  ],
})

export default router
