import { ActionContext } from "vuex"
import { Travel, TravelState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
// import { REQUEST_TRAVEL_LIST_TO_DJANGO } from "./mutation-types"

export type TravelActions = {
    requestTravelListToDjango(context: ActionContext<TravelState, any>): Promise<void>
    requestCreateTravelToDjango(context: ActionContext<TravelState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>
}

const actions: TravelActions = {
    async requestTravelListToDjango(context: ActionContext<TravelState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/travel/list/');
            const data: Travel[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_TRAVEL_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching board list:', error);
            throw error
        }
    },

    async requestCreateTravelToDjango(context: ActionContext<TravelState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse> {
        try {
                console.log('requestCreateTravelToDjango()')
                console.log(imageFormData)
                const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                    '/travel/register', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                console.log('응답 데이터:', res.data)
                return res
                } catch (error) {

                    console.error('requestCreateTravelToDjango():', error)
                    throw error
                }
        },
};
export default actions;