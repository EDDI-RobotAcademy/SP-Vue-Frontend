import accountModule from '@/account/store/accountModule'
import authenticationModule from '@/authentication/store/authenticationModule'
import travelModule from '@/travel/store/travelModule'
import travelReviewModule from '@/travel_review/store/travelReviewModule'
import { createStore } from 'vuex'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    travelModule,
    travelReviewModule,
    authenticationModule,
    accountModule,
  }
})
