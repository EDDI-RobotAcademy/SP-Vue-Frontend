import { ActionContext } from "vuex"
import { OrderItem, OrderState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type OrderActions = {
    requestCreateOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string;
            items: {
                travelId: number;
                travelName: string;
                orderPrice: number
            }[]
        }
    ): Promise<AxiosResponse>;

    requestReadOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            orderId: string
        }
    ): Promise<AxiosResponse>

    requestOrderListToDjango(context: ActionContext<OrderState, any>,
        userToken: string
    ): Promise<void>
}

const actions: OrderActions = {
    async requestCreateOrderToDjango({ state }, payload) {
        try {
            const { userToken, items } = payload;
            if (!userToken) {
                throw new Error('User token not found');
            }

            console.log('payload:', payload);

            const requestData = {
                userToken,
                items: items
            };

            const response = await axiosInst.djangoAxiosInst.post('/travel_orders/create', requestData);
            console.log('response data:', response.data);

            return response.data; // 필요에 따라 응답 데이터를 반환할 수 있음
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async requestReadOrderToDjango({ state }, payload) {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                throw new Error('User token not found');
            }

            const { orderId } = payload

            const requestData = {
                userToken,
            }

            const response =
                await axiosInst.djangoAxiosInst.post(`/travel_orders/read/${orderId}`, requestData)

            return response.data
        } catch (error) {
            console.error('주문 내역 요청 중 에러:', error)
            throw error
        }
    },

    async requestOrderListToDjango(context: ActionContext<OrderState, any>,
        userToken: string
    ): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.post('/travel_orders/list/',{
                userToken: userToken
            });
            const data: OrderItem[] = res.data;
            console.log('order list action res data:', data)
            context.commit('REQUEST_ORDER_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching board list:', error);
            throw error
        }
    },
};

export default actions;