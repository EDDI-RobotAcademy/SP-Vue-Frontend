<template>
    <v-app-bar :style="{ backgroundColor: 'rgb(255, 255, 255)' }" elevation="0">
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
            
            <!-- v-spacer 전후로 왼쪽에 적힐지 오른쪽에 적힐지 구분 됨 -->
            <v-spacer></v-spacer> 
            <v-menu close-on-content-click>
                <template v-slot:activator="{ props }">
                    <v-btn color="black" class="white--text custom-button" v-bind="props">
                        <span>Regression Analysis</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in items"
                                :key="index" @click="item.action">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

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
            isLogin: !!localStorage.getItem("userToken"),
            items: [
                { title: 'Logistic Regression', action: () => { router.push('/logistic-regression-result') } },
                { title: 'Random Forest', action: () => { router.push('/random-forest-result') } },
                { title: 'K-means Clustering', action: () => { router.push('/kmeans-test-result') } },
            ],
        }
    },
    computed: {
        ...mapState(authenticationModule, ['isAuthenticated']),
        ...mapState(orderModule, ['orderList'])
    },
    methods: {
        ...mapActions(authenticationModule, ['requestLogoutToDjango']),
        ...mapActions(orderModule, ['requestOrderListToDjango']),
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
                if(!this.orderList) {
                    console.error('주문 데이터가 없습니다!')
                    return
                }

                const orderId = this.orderList

                console.log('orderId:', orderId)

                this.$router.push('/order/list');
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
            this.requestOrderListToDjango(userToken);
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
  font-family: 'Gaegu', cursive;
  font-weight: bold;
  font-size: 1.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.custom-logo {
  width: 90px;  /* 부모 요소의 너비 */
  height: 65px; /* 부모 요소의 높이 */
  align-self: center; 
}


.travel-button {
  font-family: 'Gaegu', cursive;
  font-weight: bold;
  font-size: 1.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>