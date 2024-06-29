import KakaoRedirection from "@/authentication/redirection/KakaoRedirection.vue";
import router from "@/router"

const AuthenticationRoutes = [
    {
        path: '/kakao-oauth/kakao-access-token',
        name: 'KakaoRedirection',
        component: KakaoRedirection
    },
]

export default AuthenticationRoutes