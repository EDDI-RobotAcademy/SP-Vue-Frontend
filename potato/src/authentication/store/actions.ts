import { ActionContext } from "vuex"
import { AuthenticationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { capitalize } from "vue"


export type AuthenticationActions = {
    requestKakaoOauthRedirectionToDjango(): Promise<void>
    requestAccessTokenToDjangoRedirection(
        context: ActionContext<AuthenticationState, any>,
        payload: { code: string }): Promise<void>
    requestUserInfoToDjango(
        context: ActionContext<AuthenticationState, any>): Promise<any>
    requestAddRedisAccessTokenToDjango(
        { commit, state }: ActionContext<AuthenticationState, any>,
        { email, accessToken }: {email:string, accessToken: string }
    ): Promise<any>,
    requestLogoutToDjango(
        context: ActionContext<AuthenticationState, any>,
        userToken: string
    ): Promise<void>
}

const actions: AuthenticationActions = {
    async requestKakaoOauthRedirectionToDjango(): Promise<void> {
        return axiosInst.djangoAxiosInst.get('kakaoOauth/kakao').then((res) => {
            window.location.href = res.data.url
        })
    },
    async requestAccessTokenToDjangoRedirection(
        context: ActionContext<AuthenticationState, any>, 
        payload: { code: string }): Promise<void> {
    
    try {
        console.log('requestAccessTokenToDjangoRedirection()')
        const { code } = payload
        
        // 반환이 안 되었음
        const response = await axiosInst.djangoAxiosInst.post(
            '/kakaoOauth/kakao/access-token', { code })
        console.log('requestAccessTokenToDjango accessToken:', response.data.accessToken.access_token)
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
                    '/kakaoOauth/kakao/user-info',
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
            console.log("requestAddRedisAccessTokenToDjango -> email:", email)
            console.log("requestAddRedisAccessTokenToDjango -> accessToken:", accessToken)
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post(
                '/kakaoOauth/redis-access-token', {
                    email: email,
                    accessToken: accessToken
                })
            
            console.log('userToken:', response.data.userToken)
            
            localStorage.removeItem("accessToken")
            localStorage.setItem("userToken", response.data.userToken)
            commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', true)
            return response.data
            
        } catch (error) {
            console.error('Error adding redis access token:', error)
            throw error
        }
    },
    async requestLogoutToDjango(
        context: ActionContext<AuthenticationState, any>,
        userToken: string
    ): Promise<void> {

        try {
            const userToken = localStorage.getItem("userToken")

            const res = 
                await axiosInst.djangoAxiosInst.post('/kakaoOauth/logout', {
                    userToken: userToken
                })
            console.log('kakaoOauth logout res :', res.data)
            console.log('kakaoOauth logout 결과 res:', res.data.isSuccess)
            if (res.data.isSuccess === true) {
                context.commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', false)
            }
        } catch (error) {
            console.error('requestPostToFastapi() 중 에러 발생:', error)
            throw error
        }
        localStorage.removeItem("userToken")
    },
        
};

export default actions;
