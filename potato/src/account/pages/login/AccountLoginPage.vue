<template>
  <v-container class="login-container" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="login-card" elevation="8">
          <v-img
            class="mx-auto"
            height="500"
            :src="require('@/assets/images/fixed/로그인.png')"
          >
            <v-card-title class="text-h4 white--text">
            
            </v-card-title>
          </v-img>
          
          <v-card-text class="text-center pt-6">
            <h2 class="text-h5 mb-4 custom-font">감자가 되고 싶다고?⬇️⬇️</h2>
            <v-img class="icon"
                    :src="require('@/assets/images/fixed/kakao_login2.png')"
                    height="100"
                    @click="goToKakaoLogin"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {useStore} from 'vuex'
export default {
    setup () {
        const store = useStore()

        const goToKakaoLogin = async () => {
            await store.dispatch("authenticationModule/requestKakaoOauthRedirectionToDjango")
        }

        return {
            goToKakaoLogin
        }
    }
}</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@700&display=swap');

.login-container {
  background-image: url('@/assets/images/fixed/LB4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  overflow: hidden;
}

.icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon:hover {
  transform: scale(1.05);
}

.custom-font {
  font-family: 'Gaegu', cursive;
  font-size: 2.5rem;
  color: black;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}
</style>