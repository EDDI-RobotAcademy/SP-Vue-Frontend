import { MutationTree } from "vuex";
import { TravelState, Travel } from "./states";
import { 
    REQUEST_TRAVEL_LIST_TO_DJANGO,
    REQUEST_TRAVEL_TO_DJANGO
} from "./mutation-types";



export interface TravelMutations extends MutationTree<TravelState> {
    [REQUEST_TRAVEL_LIST_TO_DJANGO] (state: TravelState, receivedData: Travel[]): void
    [REQUEST_TRAVEL_TO_DJANGO] (state: TravelState, receivedData: Travel):void
}

const mutations: MutationTree<TravelState> = {
    [REQUEST_TRAVEL_LIST_TO_DJANGO] (state: TravelState, receivedData: Travel[]): void {
        state.travelList = receivedData
    },
    [REQUEST_TRAVEL_TO_DJANGO] (state: TravelState, receivedData: Travel):void {
        state.travel = receivedData
    }
}



export default mutations as TravelMutations