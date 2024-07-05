<template>
    <v-app-bar :style="{ backgroundColor: 'rgb(215, 230, 209)' }" dark>
        <v-container class ="d-flex align-center"> 
           <!-- <v-btn @click="goToHome" text class="white--text">
                <v-toolbar-title class="white--text">
                    <span>PoTrips</span>
                </v-toolbar-title>
            </v-btn> -->
            <v-btn @click="goToHome" text class="white--text custom-button travel-button" style="display: flex; align-items: center; font-size: 25px;">                <v-img
                    src="@/assets/images/fixed/1.png"
                    alt="홈 아이콘"
                    class="custom-logo"
                    contain
                ></v-img>
                <span>POTRIPS</span>
            </v-btn>
           
            <v-spacer></v-spacer>
            <v-btn text @click="goToTravelList" class="white--text custom-button">
                <v-icon left>mdi-train</v-icon>
                <span>TRAVEL</span>
            </v-btn>
            <v-btn text @click="goToTravelReviewList" class="white--text custom-button">
                <v-icon left>mdi-forum</v-icon>
                <span>REVIEW</span>
            </v-btn>
            <v-btn text @click="goToOrderReadPage" class="white--text custom-button">
                <v-icon left>mdi-cart</v-icon>
                <span>ORDER</span>
            </v-btn>
            <v-btn v-if="!isAuthenticated" text @click="signIn" class="white--text custom-button">
                <v-icon left>mdi-login</v-icon>
                <span>LOGIN</span>
            </v-btn>
            <v-btn v-if="isAuthenticated" text @click="signOut" class="white--text custom-button">
                <v-icon left>mdi-logout</v-icon>
                <span>LOGOUT</span>
            </v-btn>
        </v-container>
    </v-app-bar>
</template>
  


<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
const authenticationModule = 'authenticationModule'
const orderModule = 'orderModule'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            order: null
        };
    },
    computed: {
        ...mapState(authenticationModule, ['isAuthenticated']),
        ...mapState(orderModule, ['order'])
    },
    methods: {
        ...mapActions(authenticationModule, ['requestLogoutToDjango']),
        ...mapActions(orderModule, ['requestReadOrderToDjango']),
        goToHome () {
            router.push('/')
        },
        goToTravelList () {
            router.push('/travel/list')
        },
        goToTravelReviewList () {
            router.push('/travel_review/list')
        },
        signIn () {
            router.push('/account/login')
        },
        signOut () {
            this.requestLogoutToDjango()
            router.push('/')
        },
        async goToOrderReadPage() {
            try {
                if(!this.order || !this.order.orderId) {
                    console.error('주문 데이터가 없습니다!')
                    return
                }
                
                const orderId = this.order.orderId

                console.log('orderId:', orderId)

                const response = await this.requestReadOrderToDjango({  orderId });
                console.log('응답 데이터:', response)

                this.$router.push(`/order/read/${orderId}`);
            } catch (error) {
                console.error('주문 페이지로 이동 중 에러:', error);
            }
        }   
    },
    mounted () {
        console.log('navigation bar mounted()')
        
        const userToken = localStorage.getItem("userToken")

        if (userToken) {
            console.log('You already has a userToken!!!')
            this.$store.state.authenticationModule.isAuthenticated = true
        }

    },
}

</script>

<style scoped>
.white--text {
    color: white;
}
.text--darken-4 {
    color: rgba(0, 0, 0, 0.87);
}
.v-btn {
    margin: 0 10px;
}
.custom-button {
  color: rgb(4, 49, 78); /* 텍스트 색상 */
  /* background-color: rgb(100, 149, 237);  */
}
.custom-logo {
  width: 90px;  /* 부모 요소의 너비 */
  height: 65px; /* 부모 요소의 높이 */
  align-self: center; 
}

@font-face {
  font-family: 'PrettyKelly'; /* 위에서 정의한 폰트 패밀리 이름 */
  src: url('@/assets/font/pretty-kelly.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.travel-button {
  font-family: 'PrettyKelly', sans-serify; /* 위에서 정의한 폰트 패밀리 사용 */
}
</style>