import { ActionContext } from "vuex"
import { TravelReview, TravelReviewState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
// import { REQUEST_TRAVEL_REVIEW_LIST_TO_DJANGO } from "./mutation-types"

export type TravelReviewActions = {
    requestTravelReviewToDjango(context: ActionContext<TravelReviewState, any>, reviewId: number): Promise<void>,
    requestTravelReviewListToDjango(context: ActionContext<TravelReviewState, any>): Promise<void>,
    requestCreateTravelReviewToDjango(context: ActionContext<TravelReviewState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>,
    requestDeleteTravelReviewToDjango(context: ActionContext<TravelReviewState, unknown>, 
        reviewId: number): Promise<void>,
    requestModifyTravelReviewToDjango(context: ActionContext<TravelReviewState, any>,
        imageFormData: FormData): Promise<AxiosResponse> 
    // requestModifyTravelReviewToDjango(context: ActionContext<TravelReviewState, any>, payload: {
    //     title: string, review: string, reviewId: number, reviewImage: FormData
    // }): Promise<void> 
}

const actions: TravelReviewActions = {
    async requestTravelReviewToDjango(context: ActionContext<TravelReviewState, any>,
        reviewId: number): Promise<void> {
            try {
                const res: AxiosResponse<TravelReview> = await axiosInst.djangoAxiosInst.get(`/travel_review/read/${reviewId}`)
                console.log('data :', res.data)
                context.commit('REQUEST_TRAVEL_REVIEW_TO_DJANGO', res.data)
            } catch (error) {
                console.error('Error fetching read review :', error)
                throw error
            }
    },
    async requestTravelReviewListToDjango(context: ActionContext<TravelReviewState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/travel_review/list/');
            const data: TravelReview[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_TRAVEL_REVIEW_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching review list:', error);
            throw error
        }
    },

    async requestCreateTravelReviewToDjango(context: ActionContext<TravelReviewState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse> {
        try {
                console.log('requestCreateTravelReviewToDjango()')
                const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                    '/travel_review/register', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                console.log('응답 데이터:', res.data)
                return res
                } catch (error) {

                    console.error('requestCreateTravelReviewToDjango():', error)
                    throw error
                }
    },
    async requestDeleteTravelReviewToDjango(context: ActionContext<TravelReviewState, unknown>, 
        reviewId: number): Promise<void> {
            try {
                console.log('requestDeleteTravelToDjango()')
                await axiosInst.djangoAxiosInst.delete(`/travel_review/delete/${reviewId}`)
            } catch (error) {
                console.log('requestDeleteTravelReviewToDjango() 과정에서 문제 발생')
                throw error
            }
    },

    async requestModifyTravelReviewToDjango(context: ActionContext<TravelReviewState, any>,
        imageFormData: FormData): Promise<AxiosResponse>  {
        
        const reviewId = imageFormData.get('reviewId') // 이렇게 받을 수 있음
        try {
            // 이미지 처리용
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.put(
                `/travel_review/modify/${reviewId}`, imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('수정 성공!', res.data)
            return res
        } catch (error) {
            console.log('requestModifyTravelReviewToDjango() 과정에서 문제 발생')
            throw error
        }
    },
            
};
export default actions;