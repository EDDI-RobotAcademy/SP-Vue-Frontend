import actions, { TravelReviewActions } from "./actions"
import mutations, { TravelReviewMutations } from "./mutations"
import state, { TravelReviewState } from "./states"

export interface TravelReviewModule {
    namespaced: true
    state: TravelReviewState
    actions: TravelReviewActions
    mutations: TravelReviewMutations
}

const travelReviewModule: TravelReviewModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default travelReviewModule