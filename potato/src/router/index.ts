import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import TravelRoutes from '@/travel/router/TravelRoutes'
import TravelReviewRoutes from '@/travel_review/router/TravelReviewRoutes'
import HomeRoutes from '@/home/router/HomeRoutes'
import AuthenticationRoutes from '@/authentication/router/AuthenticationRoutes'
import AccountRoutes from '@/account/router/AccountRoutes'
import OrderRoutes from '@/order/router/OrderRoutes'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import LogisticRegressionResultRoutes from '@/logisticRegression/router/LogisticRegressionRoutes'
import RandomForestRoutes from '@/randomForest/router/RandomForestRoutes'
import KmeansRoutes from '@/kmeans/router/KmeansRoutes'
import HotelRoutes from '@/hotel/router/hotelRoutes'




const routes: Array<RouteRecordRaw> = [
  // 항상 도메인의 router를 추가했으면 main router 에도 추가 해줘야 함
  ...TravelRoutes,
  ...TravelReviewRoutes,
  ...HomeRoutes,
  ...AuthenticationRoutes,
  ...AccountRoutes,
  ...OrderRoutes,
  ...SurveyRoutes,
  ...LogisticRegressionResultRoutes,
  ...RandomForestRoutes,
  ...KmeansRoutes,
  ...HotelRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router