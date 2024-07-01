import { ActionContext } from "vuex"
import { AuthenticationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { capitalize } from "vue"
import { Action } from "vuex/types/index.js"

export type AuthenticationActions = {
    requestKakaoOauthRedirectionToDjango(): Promise<void>
    requestAccessTokenToDjangoRedirection(
        context: ActionContext<AuthenticationState, any>,
        payload: { code: string }): Promise<void>
    requestUserInfoToDjango(
        context: ActionContext<AuthenticationState, any>): Promise<any>
    requestAddRedisAccessTokenToDjango(
        context: ActionContext<AuthenticationState, any>,
        { email, accessToken }: {email:string, accessToken: string }
    ): Promise<any>
}

const actions: AuthenticationActions = {
    async requestKakaoOauthRedirectionToDjango(): Promise<void> {
        return axiosInst.djangoAxiosInst.get('kakao-oauth/kakao').then((res) => {
            console.log('requestKakaoOauthRedirectionToDjango() -> res:', res.data.url)
            window.location.href = res.data.url
        })
    },
    async requestAccessTokenToDjangoRedirection(
        context: ActionContext<AuthenticationState, any>, 
        payload: { code: string }): Promise<void> {
    
    try {
        console.log('requestAccessTokenToDjangoRedirection()')
        const { code } = payload

        const response = await axiosInst.djangoAxiosInst.post(
            '/kakao-oauth/kakao/access-token', { code })
        console.log('accessToken:', response.data.accessToken.access_token)
        localStorage.setItem("accessToken", response.data.accessToken.access_token)
    } catch (error) {
        console.error('Access Token 요청 중 문제 발생:', error)
        throw error
    }
    },
    async requestUserInfoToDjango(
        context: ActionContext<AuthenticationState, any>): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accessToken")
            console.log('accessToken:', accessToken)
            const userInfoResponse: AxiosResponse<any> = 
                await axiosInst.djangoAxiosInst.post(
                    '/kakao-oauth/kakao/user-info',
                    { access_token: accessToken })
            
            console.log('User Info:', userInfoResponse.data.user_info)

                const userInfo = userInfoResponse.data.user_info
                return userInfo
            } catch (error) {
                alert('사용자 정보 가져오기 실패!')
                throw error
            }
    },
    async requestAddRedisAccessTokenToDjango(
        { commit, state }: ActionContext<AuthenticationState, any>,
        { email, accessToken }: {email:string, accessToken: string }
    ): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post(
                '/oauth/redis-access-token', {
                    email: email,
                    accessToken: accessToken
                })
            
            localStorage.removeItem("accessToken")
            localStorage.setItem("userToken", response.data.userToken)
            commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', true)
            return response.data
            
        } catch (error) {
            console.error('Error adding redis access token:', error)
            throw error
        }
    }
        
};

export default actions;
