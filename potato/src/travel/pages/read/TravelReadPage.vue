<template>
  <v-container>
    <h2 class="text-center mb-5">여행지 상페 페이지</h2>
    <v-img 
      v-if="travel"
      :src="getReviewImageUrl(travel.travelImage)" 
      height="500px" 
      width="100%" 
      aspect-ratio="1.78"
      class="white--text mb-4"
      style="object-fit: cover;">
    </v-img>
    <div v-if="travel">
      <h1 class="display-1 py-4 custom-margin">{{ travel.travelName }}</h1>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="custom-margin">
            <h2>가격</h2>
            <div class="text-h5 font-weight-bold align-center mt-4">{{ formattedPrice }}</div>
          </v-col>
        </v-row>
        
        <v-spacer></v-spacer>

        <v-row>
          <!-- 캘린더 날짜 선택 -->
          <v-col cols="12" md="6" class="custom-margin">
            <h2 class="custom-text "></h2>
            <v-date-picker
              v-model="registerDate"
              :day-style="dayStyle"
              :min="today"
              no-title
              show-current
              @input="onDateSelected"
              class="large-datepicker transparent-datepicker"
            ></v-date-picker>
          </v-col>
       
          <v-col cols="12" md="4" class="custom-margin-2">
            <!-- 인원 선택 -->
            <v-row>
              <v-col cols="12">
                <h2 class="custom-text">여행 인원 선택</h2>
                <v-spacer><br></v-spacer>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-btn @click="decreasePeopleCount" icon><v-icon>mdi-minus</v-icon></v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <div class="text-h5 font-weight-bold mx-4">{{ selectedPeople.length }}명</div>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn @click="increasePeopleCount" icon><v-icon>mdi-plus</v-icon></v-btn>
                  </v-col>
                 
                </v-row>
              </v-col>
            </v-row>
            <!-- 구매 버튼 -->
            <v-row class="custom-margin-2" justify="end">
              <v-col cols="12">
                <v-btn color="error" @click="proceedToOrder(travel)" :disabled="!registerDate">구매하기</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-chip color="purple lighten-4" text-color="purple darken-2" class="ma-3 large-chip" rounded>
              {{ travel.travelProperty }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea 
              v-model="travel.travelContent" 
              readonly 
              label="상세 내용" 
              auto-grow 
              outlined 
              dense
              class="custom-textarea"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const travelModule = 'travelModule'
const orderModule = 'orderModule'

export default {
  props: {
    travelId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      registerDate: null, // 선택된 여행 날짜를 저장할 변수
      selectedPeople: [], // 선택된 인원을 저장할 배열
      today: new Date().toISOString().substr(0, 10), // 오늘 날짜를 저장
      
    };
  },
  computed: {
    ...mapState(travelModule, ['travel']),
    ...mapState(orderModule, ['orderList']),
    formattedPrice() {
      if (this.travel && this.travel.travelPrice) {
        const price = this.travel.travelPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return price.length > 3 
          ? price.slice(0, -3) + '원'
          : price + '원';
      }
      return '';
    }
  },  
  methods: {
    ...mapActions(travelModule, ['requestTravelToDjango']),
    ...mapActions(orderModule, ['requestCreateOrderToDjango']),
    getReviewImageUrl(travelImage) {
      return require(`@/assets/images/uploadImages/${travelImage}`);
    },
    async proceedToOrder(travel) {
      try {
        const currentSelectedItem = {
          travelId: travel.travelId, // 현재 선택된 여행 상품 ID
          travelName: travel.travelName, // 현재 선택된 여행 상품 이름
          orderPrice: travel.travelPrice, // 현재 선택된 여행 상품 가격
          registerDate: this.registerDate ? this.registerDate.toISOString() : null, // 선택된 날짜 ISO 문자열로 변환
          selectedPeople: this.selectedPeople // 선택된 인원 배열
        };
        
        console.log("currentSelectedItem:", currentSelectedItem);
        
        const userToken = localStorage.getItem('userToken');
        const orderId = await this.requestCreateOrderToDjango({
          userToken,
          items: [currentSelectedItem]
        });

        this.$router.push({ name: 'OrderListPage' });
      } catch (error) {
        console.error("Order creation failed:", error);
      }
    },
    increasePeopleCount() {
      // 인원 수 증가 버튼 클릭 시
      this.selectedPeople.push(this.selectedPeople.length + 1);
    },
    decreasePeopleCount() {
      // 인원 수 감소 버튼 클릭 시
      if (this.selectedPeople.length > 0) {
        this.selectedPeople.pop();
      }
    },
    onDateSelected(registerDate) {
      this.registerDate = registerDate;
    },
   
  },
  
  created() {
    const travelId = this.$route.params.travelId;
    if (travelId) {
      this.requestTravelToDjango(travelId);
    } else {
      console.error('travelId is undefined');
      // 적절한 오류 처리 로직 추가 (예: 사용자를 이전 페이지로 리다이렉트)
    }
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
  font-family: 'Gaegu', cursive;
  font-weight: bold;
  font-size: 2.2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.mb-5 {
  margin-bottom: 3rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.custom-textarea .v-input__control {
  background-color: transparent !important;
}

.reservation-calendar {
  margin: 0 auto;
}
.custom-text {
  font-family: 'Gaegu', cursive;
  font-weight: bold;
  font-size: 1.8em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.custom-margin {
  margin-left: 50px;
  margin-top: 50px;
}
.custom-margin-2 {
  margin-left: 150px;
  margin-top: 150px;
}
.large-datepicker {
  margin-top: 50px;
  width: 100%; /* 부모 요소 너비에 맞춤 */
  height: 500px;
}
.transparent-datepicker .v-picker--date {
  background-color: transparent !important; /* 투명 배경색 설정 */
}

.large-chip {
  font-size: 16px; /* 폰트 크기 조정 */
  height: 40px; /* 높이 조정 */
  padding: 10px 20px; /* 내부 패딩 조정 */
}
</style>
