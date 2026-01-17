import DefaultLayout from '@/layout/DefaultLayout.vue'
import HomeView from '@/modules/home/HomeView.vue'
import DashboardView from '@/modules/dashboard/DashboardView.vue'
import ProductsView from '@/modules/products/ProductsView.vue'
import TodosView from '@/modules/todos/TodosView.vue'
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
          component: HomeView,
        },
        {
          name: 'dashboard',
          path: '/dashboard',
          component: DashboardView,
        },
        {
          name: 'products',
          path: '/products',
          component: ProductsView,
        },
        {
          name: 'todos',
          path: '/todos',
          component: TodosView,
        },
      ],
    },
  ],
})

export default router
