export interface TravelReviewState {
    travelReviewList: TravelReview[],
    travelReview: TravelReview | null,
}

export interface TravelReview {
    ReviewId: number
    title: string
    writer: string
    point: number
    review: string
    regDate: string
    updDate: string
}

const state: TravelReviewState = {
    travelReviewList: [],
    travelReview: null,
}

export default state