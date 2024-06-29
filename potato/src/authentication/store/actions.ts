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
}

const actions: AuthenticationActions = {
    async requestKakaoOauthRedirectionToDjango(): Promise<void> {
        return axiosInst.djangoAxiosInst.get('kakaoOauth/kakao').then((res) => {
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
            '/kakaoOauth/kakao/access-token', { code })
        console.log('accessToken:', response.data.accessToken.access_token)
        localStorage.setItem("accessToken", response.data.accessToken.access_token)
    } catch (error) {
        console.error('Access Token 요청 중 문제 발생:', error)
        throw error
    }
    },
        
};

export default actions;
