export interface TravelState {
    travelList: Travel[]
    travel: Travel | null,
}

export interface Travel {
    travelId: number
    travelName: string
    travelProperty: string
    travelContent: string
    travelPrice: string
    travelImage: string
}

const state: TravelState = {
    travelList: [],
    travel: null,
}

export default state