import actions, { TravelBoardActions } from "./actions"
import mutations, { TravelBoardMutations } from "./mutations"
import state, { TravelBoardState } from "./states"

export interface TravelModule {
    namespaced: true
    state: TravelBoardState
    actions: TravelBoardActions
    mutations: TravelBoardMutations
}

const travelModule: TravelModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default travelModule