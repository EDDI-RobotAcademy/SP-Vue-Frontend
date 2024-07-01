import KakaoRedirection from "@/authentication/redirection/KakaoRedirection.vue";
import router from "@/router"

const AuthenticationRoutes = [
    {   
        // redirection uri와 맞춰주기!
        path: '/oauth/kakao-access-token', 
        name: 'KakaoRedirection',
        component: KakaoRedirection
    },
]

export default AuthenticationRoutes