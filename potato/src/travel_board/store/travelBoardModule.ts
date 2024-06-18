import actions, { TravelBoardActions } from "./actions"
import mutations, { TravelBoardMutations } from "./mutations"
import state, { TravelBoardState } from "./states"

export interface TravelBoardModule {
    namespaced: true
    state: TravelBoardState
    actions: TravelBoardActions
    mutations: TravelBoardMutations
}

const travelBoardModule: TravelBoardModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default travelBoardModule