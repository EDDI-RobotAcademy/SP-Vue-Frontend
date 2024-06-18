export interface TravelBoardState {
    travelBoardList: TravelBoard[],
    travelBoard: TravelBoard | null,
}

export interface TravelBoard {
    BoardId: number
    title: string
    writer: string
    point: number
    review: string
    regDate: string
    updDate: string
}

const state: TravelBoardState = {
    travelBoardList: [],
    travelBoard: null,
}

export default state