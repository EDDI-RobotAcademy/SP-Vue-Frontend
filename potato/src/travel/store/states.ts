export interface TravelState {
    travelList: Travel[]
}

export interface Travel {
    travelId: number
    travelName: string
    travelLocation: string
    travelProperty: string
    travelContent: string
    travelPrice: string
}

const state: TravelState = {
    travelList: [],
}

export default state