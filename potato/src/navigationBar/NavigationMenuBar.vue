<template>
    <v-app-bar color="primary" dark>
        <v-container class ="d-flex align-center">
            <v-btn @click="goToHome" text class="white--text">
                <v-toolbar-title class="text--darken-4">
                    <span>Potrips</span>
                </v-toolbar-title>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="goToTravelList" class="white--text">
                <v-icon left>mdi-store</v-icon>
                <span>여행지</span>
            </v-btn>
            <v-btn text @click="goToTravelReviewList" class="white--text">
                <v-icon left>mdi-forum</v-icon>
                <span>여행후기</span>
            </v-btn>
            <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
                <v-icon left>mdi-login</v-icon>
                <span>로그인</span>
            </v-btn>
            <v-btn v-if="isAuthenticated" text @click="signOut" class="btn-text">
                <v-icon left>mdi-logout</v-icon>
                <span>로그아웃</span>
            </v-btn>
        </v-container>

    </v-app-bar>
    
</template>



<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
const authenticationModule = 'authenticationModule'
import { mapActions, mapState } from 'vuex'

export default {

    // name: 'NavigationBar',
    computed: {
        ...mapState(authenticationModule, ['isAuthenticated'])
    },
    methods: {
        ...mapActions(authenticationModule, ['requestLogoutToDjango']),
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
</style>
