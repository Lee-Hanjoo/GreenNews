import { createRouter, createWebHistory } from 'vue-router'
import ApiView from '../views/ApiView.vue'

const routes = [
  {
    path: '/',
    name: 'api',
    component: ApiView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
