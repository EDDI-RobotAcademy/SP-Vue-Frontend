import actions, { TravelActions } from "./actions"
import mutations, { TravelMutations } from "./mutations"
import state, { TravelState } from "./states"

export interface TravelModule {
    namespaced: true
    state: TravelState
    actions: TravelActions
    mutations: TravelMutations
}

const travelModule: TravelModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default travelModule