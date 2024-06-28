<template>
  <v-container>
    <h2 class="text-center mb-5">여행지 상세정보</h2>
    <v-card v-if="travel" class="mx-auto" max-width="800" outlined>
      <!-- 이미지 컴포넌트 -->
      <v-img :src="getReviewImageUrl(travel.travelImage)" height="400px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)">
      </v-img>
      <!-- 여행지 이름을 이미지 아래에 위치 -->
      <v-card-title class="display-1 py-4">{{ travel.travelName }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="travel.travelPrice" readonly label="가격" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="travel.travelLocation" readonly label="카테고리" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="travel.travelProperty" readonly label="특성" auto-grow outlined dense></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="travel.travelContent" readonly label="여행 리뷰" auto-grow outlined dense></v-textarea>
            </v-col>
          </v-row>
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

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(travelModule, ['travel'])
    },
    // 삭제 구현 by 아람
    methods: {
        ...mapActions(travelModule, ['requestTravelToDjango']),
        getReviewImageUrl (travelImage) {
            console.log('travelImage:', travelImage)
            return require('@/assets/images/uploadImages/' + travelImage)
        },
        // async onDelete() {
        //     console.log('삭제를 누르셨습니다!')
        //     await this.requestDeleteTravelBoardToDjango(this.BoardId)
        //     await this.$router.push({ name: 'TravelBoardListPage' })
        // }
    },
    created () {
        const boardId = this.$route.params.boardId; // 라우터 파라미터에서 boardId를 가져옴
        console.log('boardId', boardId);
        if (boardId) {
            this.requestTravelToDjango(boardId);
        } else {
            console.error('boardId is undefined');
            // 적절한 오류 처리 로직 추가 (예: 사용자를 이전 페이지로 리다이렉트)
        }
    },
}
</script>