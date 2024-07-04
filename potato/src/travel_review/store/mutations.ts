import { MutationTree } from "vuex";
import { TravelReviewState, TravelReview } from "./states";
import { 
    REQUEST_TRAVEL_REVIEW_LIST_TO_DJANGO,
    REQUEST_TRAVEL_REVIEW_TO_DJANGO
} from "./mutation-types";

export interface TravelReviewMutations extends MutationTree<TravelReviewState> {
    [REQUEST_TRAVEL_REVIEW_LIST_TO_DJANGO] (state: TravelReviewState, receivedData: TravelReview[]): void
    [REQUEST_TRAVEL_REVIEW_TO_DJANGO] (state: TravelReviewState, receivedData: TravelReview):void
}

const mutations: MutationTree<TravelReviewState> = {
    [REQUEST_TRAVEL_REVIEW_LIST_TO_DJANGO] (state: TravelReviewState, receivedData: TravelReview[]): void {
        state.travelReviewList = receivedData
    },
    [REQUEST_TRAVEL_REVIEW_TO_DJANGO] (state: TravelReviewState, receivedData: TravelReview):void {
        state.travelReview = receivedData
    }
}

export default mutations as TravelReviewMutations