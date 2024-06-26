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
            <v-btn text @click="goToTravelBoardList" class="white--text">
                <v-icon left>mdi-forum</v-icon>
                <span>여행후기</span>
            </v-btn>
        </v-container>

    </v-app-bar>
    
</template>



<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'

export default {

    name: 'NavigationBar',

    methods: {
        
        goToHome () {
            router.push('/')
        },
        goToTravelList () {
            router.push('/travel/list')
        },
        goToTravelBoardList () {
            router.push('/travel_board/list')
        },
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
