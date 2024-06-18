import { ActionContext } from "vuex"
import { TravelBoard, TravelBoardState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
// import { REQUEST_TRAVEL_BOARD_LIST_TO_DJANGO } from "./mutation-types"

export type TravelBoardActions = {
    requestTravelBoardListToDjango(context: ActionContext<TravelBoardState, any>): Promise<void>
    requestCreateTravelBoardToDjango(context: ActionContext<TravelBoardState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>
}

const actions: TravelBoardActions = {
    async requestTravelBoardListToDjango(context: ActionContext<TravelBoardState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/travel_board/list/');
            const data: TravelBoard[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_TRAVEL_BOARD_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching board list:', error);
            throw error
        }
    },

    async requestCreateTravelBoardToDjango(context: ActionContext<TravelBoardState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse> {
        try {
                console.log('requestCreateTravelBoardToDjango()')
                console.log(imageFormData)
                const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                    '/travel_board/register', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                console.log('응답 데이터:', res.data)
                return res
                } catch (error) {

                    console.error('requestCreateTravelBoardToDjango():', error)
                    throw error
                }
        },
};
export default actions;