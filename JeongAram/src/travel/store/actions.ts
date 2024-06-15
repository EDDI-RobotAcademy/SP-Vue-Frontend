import { ActionContext } from "vuex"
import { Travel, TravelState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_TRAVEL_LIST_TO_DJANGO } from "./mutation-types"

export type TravelActions = {
    requestProductListToDjango(context: ActionContext<TravelState, any>): Promise<void>
}

const actions: TravelActions = {
    async requestProductListToDjango(context: ActionContext<TravelState, any>): Promise<void> {
        try {
            // django에 travel/list 라는 것을 get 요청보냄 => 이것은 travel urls.py로 받고 controller 함수와 매핑
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/travel/list/');
            const data: Travel[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_PRODUCT_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching board list:', error);
            throw error
        }
    },
};

export default actions;