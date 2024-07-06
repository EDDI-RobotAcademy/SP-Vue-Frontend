<template>
  <v-container>
    <h2 class="text-center mb-5">여행지 상세정보</h2>
    <v-card v-if="travel" class="mx-auto" max-width="800" outlined>
      <!-- 이미지 컴포넌트 -->
        <v-img 
          :src="getReviewImageUrl(travel.travelImage)" 
          height="400px" 
          width="100%" 
          aspect-ratio="1.78"
          class="white--text align-end"
          style="object-fit: cover;">
        </v-img>
      <!-- 여행지 이름을 이미지 아래에 위치 -->
      <v-card-title class="display-1 py-4">{{ travel.travelName }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="travel.travelPrice" readonly label="가격" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="travel.travelProperty" readonly label="특성" auto-grow outlined dense></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="travel.travelContent" readonly label="상세 내용" auto-grow outlined dense></v-textarea>
            </v-col>
          </v-row>

          <v-col cols="auto">
            <v-btn color="error" @click="proceedToOrder(travel)">구매</v-btn>
          </v-col>

        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

.text-center {
  text-align: center;
}
.mb-5 {
  margin-bottom: 3rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>

<script>
import { mapActions, mapState } from 'vuex'

const travelModule = 'travelModule'
const orderModule = 'orderModule'

export default {
    props: {
        travelId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(travelModule, ['travel']),
        ...mapState(orderModule, ['orderList'])
    },
    // 삭제 구현 by 아람
    methods: {
        ...mapActions(travelModule, ['requestTravelToDjango']),
        ...mapActions(orderModule, ['requestCreateOrderToDjango']),
        getReviewImageUrl (travelImage) {
            console.log('travelImage:', travelImage)
            return require('@/assets/images/uploadImages/' + travelImage)
        },
        async proceedToOrder(travel) {
            this.isCheckoutDialogVisible = false;

            try {
                const currentSelectedItem = {
                    travelId: travel.travelId, // 현재 선택된 여행 상품 ID
                    travelName: travel.travelName, // 현재 선택된 여행 상품 이름
                    orderPrice: travel.travelPrice, // 현재 선택된 여행 상품 가격
                };
                console.log("currentSelectedItem:", currentSelectedItem);
                
                const userToken = localStorage.getItem('userToken');
                const orderId = await this.requestCreateOrderToDjango({
                    userToken,
                    items: [currentSelectedItem]
                });

                // this.$router.push('/order/list') 
                // router.push는 내 현재 경로에 push된 경로가 추가 되는 것임
                // travel/read/{id}/order/list 로 이동 경로가 안 보임
                // 그러므로 page.vue 자체로 이동하도록 설정하기
                this.$router.push({ name: 'OrderListPage'})
            } catch (error) {
                console.error("Order creation failed:", error);
            }
        }
    },
    created () {
        const travelId = this.$route.params.travelId; // 라우터 파라미터에서 travelId를 가져옴
        console.log('travelId', travelId);
        if (travelId) {
            this.requestTravelToDjango(travelId);
        } else {
            console.error('travelId is undefined');
            // 적절한 오류 처리 로직 추가 (예: 사용자를 이전 페이지로 리다이렉트)
        }
    },
}
</script>