import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TravelRoutes from '@/travel/router/TravelRoutes'
import HomeRoutes from '@/home/router/HomeRoutes'


const routes: Array<RouteRecordRaw> = [
  ...TravelRoutes,
  ...HomeRoutes,

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
