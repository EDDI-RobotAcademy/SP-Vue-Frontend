import { ActionContext } from "vuex"
import { TravelBoard, TravelBoardState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type TravelBoardActions = {
    requestTravelBoardToDjango(context: ActionContext<TravelBoardState, any>, boardId: number): Promise<void>,
    requestTravelBoardListToDjango(context: ActionContext<TravelBoardState, any>): Promise<void>,
    requestCreateTravelBoardToDjango(context: ActionContext<TravelBoardState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>,
    requestDeleteTravelBoardToDjango(context: ActionContext<TravelBoardState, unknown>, 
        boardId: number): Promise<void>,
    requestModifyTravelBoardToDjango(context: ActionContext<TravelBoardState, any>, payload: {
        title: string, review: string, boardId: number
    }  ):Promise<void>
}

const actions: TravelBoardActions = {
    async requestTravelBoardToDjango(context: ActionContext<TravelBoardState, any>, 
        boardId: number): Promise<void> {
            try {
                const res: AxiosResponse<TravelBoard> = await axiosInst.djangoAxiosInst.get(`/travel_board/read/${boardId}`)
                console.log('data :', res.data)
                context.commit('REQUEST_TRAVEL_BOARD_TO_DJANGO', res.data)
            } catch (error) {
                console.error('Error fetching read board :', error)
                throw error
            }
    },
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

    async requestDeleteTravelBoardToDjango(context: ActionContext<TravelBoardState, unknown>, 
        boardId: number): Promise<void> {
            try {
                console.log('requestDeleteTravelToDjango()')
                await axiosInst.djangoAxiosInst.delete(`/travel_board/delete/${boardId}`)
            } catch (error) {
                console.log('requestDeleteTravelBoardToDjango() 과정에서 문제 발생')
                throw error
            }
    },

    async requestModifyTravelBoardToDjango(context: ActionContext<TravelBoardState, any>, payload: {
        title: string, review: string, boardId: number
    }): Promise<void> {
        
        const { title, review, boardId } = payload
        console.log('modify title', title)
        console.log('modify boardId', boardId)
        try {
            // 수정을 요청 할 때는 PUT을 사용합니다.
            await axiosInst.djangoAxiosInst.put(`/travel_board/modify/${boardId}`, { title, review })
            console.log('수정 성공!')
        } catch (error) {
            console.log('requestModifyTravelBoardToDjango() 과정에서 문제 발생')
            throw error
        }
    },
};
export default actions;