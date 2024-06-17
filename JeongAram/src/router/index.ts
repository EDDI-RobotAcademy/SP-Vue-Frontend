import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TravelRoutes from '@/travel/router/TravelRoutes'


const routes: Array<RouteRecordRaw> = [
  ...TravelRoutes,

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
