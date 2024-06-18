import { MutationTree } from "vuex";
import { TravelBoardState, TravelBoard } from "./states";
import { 
    REQUEST_TRAVEL_BOARD_LIST_TO_DJANGO 
} from "./mutation-types";

export interface TravelBoardMutations extends MutationTree<TravelBoardState> {
    [REQUEST_TRAVEL_BOARD_LIST_TO_DJANGO] (state: TravelBoardState, receivedData: TravelBoard[]): void
}

const mutations: MutationTree<TravelBoardState> = {
    [REQUEST_TRAVEL_BOARD_LIST_TO_DJANGO] (state: TravelBoardState, receivedData: TravelBoard[]): void {
        state.travelBoardList = receivedData
    }
}

export default mutations as TravelBoardMutations