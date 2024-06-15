import { MutationTree } from "vuex";
import { TravelState, Travel } from "./states";
import { 
    Request_Travel_LIST_TO_DJANGO 
} from "./mutation-types";

export interface TravelMutations extends MutationTree<TravelState> {
    [Request_Travel_LIST_TO_DJANGO] (state: TravelState, receivedData: Travel[]): void
}

const mutations: MutationTree<TravelState> = {
    [Request_Travel_LIST_TO_DJANGO] (state: TravelState, receivedData: Travel[]): void {
        state.travelList = receivedData
    }
}

export default mutations as TravelMutations