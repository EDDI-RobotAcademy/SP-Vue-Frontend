<template>
  <v-app>
    <!-- Navigation Bar -->
    <!-- <NavigationBar /> -->
    <!-- 최상단 배너 -->
    <main class="grid grid-cols-12 md:container mx-auto md:px-5">
    <section class="col-span-12 relative md:h-[calc(480px+5vw)] flex justify-center items-center">
      <img :src="require('@/assets/images/fixed/banner.jpg')" alt="Banner Image" class="banner-image">
    </section>
  </main>
    <!-- About Section -->
    <v-container class="my-5">
  <v-row justify="center">
    <v-col cols="12" md="5" class="text-center">
     
      <h2 class="font-weight-bold text-lg potrips-title"></h2>

      <v-divider class="my-5"></v-divider>
      <p class="mt-4 text-lg font-weight-bold potrips-text">
        여행 계획 짜는 것 마저 귀찮은 말하는 감자들을 위한 사이트<br>
        ANYWHERE YOU GO, POTATO WILL BE WITH YOU
      </p>
    </v-col>
  </v-row>
</v-container>
        <!-- Travel Items Slide Group -->
        <v-container class="my-5">
      <v-slide-group show-arrows class="py-5">
        <v-slide-item v-for="(item, index) in travelListWithIntegerPrices" :key="index" class="slide-item-with-margin">
          <v-card class="mx-auto fixed-width-card" elevation="5" @click="goToTravelReadPage(item.travelId)">
            <v-img
              :src="getImageUrl(item.travelImage)"
              class="white--text"
              height="220px"
              :alt="item.travelName"
              cover
            ></v-img>
            <v-col class="d-flex align-center" cols="auto">
              <v-icon>mdi-calendar-month-outline</v-icon>
              <span>{{ item.duration }}</span>
            </v-col>
            <v-divider></v-divider>
            <v-col class="py-0" cols="auto">
              <v-chip class="ma-1" color="purple lighten-4" text-color="purple darken-2" rounded>{{ item.travelProperty }} </v-chip>
              <!-- <v-chip class="ma-1" color="purple lighten-4" text-color="purple darken-2" rounded># 해시태그</v-chip>-->
            </v-col>
            <div class="text-center pa-4">
              <span class="text-xl font-weight-bold">{{ item.travelName }}</span>
            </div>
            <div class="d-flex flex-column align-center">
              <span>{{ item.travelPrice.toLocaleString() }}원</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <!-- Main Content -->
    <v-main class="mt-5">
      <v-container fluid class="pa-0">
        <!-- Hero Section -->
        <v-carousel
          cycle
          height="calc(350px + 4vw)"
          interval="5000"
          delimiter-icon="mdi-circle"
          delimiter-active-icon="mdi-circle"
        >
          <v-carousel-item
            v-for="(banner, i) in banners"
            :key="i"
            @click="handleBannerClick(i)"
          >
          <v-img :src="banner" class="carousel-img"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-container>

    </v-main>

    <v-container class="my-4">
    <v-row justify="center">
      <v-col cols="12" md="5" class="text-center">
        <h2 class="font-weight-bold text-lg potrips-title">TRAVEL</h2>
        <v-divider></v-divider>
       
      </v-col>
    </v-row>
  </v-container>

    <!-- Portfolio Items -->
    <v-container class="my-5">
        <div class="card-grid">
          <v-card
            v-for="(item, index) in displayedTravels"
            :key="index"
            class="card-item"
            elevation="5"
            @click="goToTravelReadPage(item.travelId)"
          >
            <v-img
              :src="getImageUrl(item.travelImage)"
              class="white--text"
              height="220px"
              :alt="item.travelName"
              cover
            ></v-img>
            <v-col class="d-flex align-center" cols="auto">
              <v-icon>mdi-calendar-month-outline</v-icon>
              <span>{{ item.duration }}</span>
            </v-col>
            <v-divider></v-divider>
            <v-col class="py-0" cols="auto">
              <v-chip
                class="ma-1"
                color="purple lighten-4"
                text-color="purple darken-2"
                rounded
              >{{ item.travelProperty }}</v-chip>
           
            </v-col>
            <div class="text-center pa-4">
              <span class="text-xl font-weight-bold">{{ item.travelName }}</span>
            </div>
            <div class="d-flex flex-column align-center">
              <span>{{ Math.round(item.travelPrice).toLocaleString() }}원</span>
            </div>
          </v-card>
        </div>
        <v-btn class="mx-auto d-block my-6" color="primary" @click="toggleShowAll">
          View All Travels
        </v-btn>
      </v-container>

    <!-- Footer -->
    <v-footer color="white">
      <v-container class="d-flex flex-column align-center">
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <h4 class="font-weight-bold text-uppercase">Phone</h4>
            <p>+ 1-888-1554-456-123</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <h4 class="font-weight-bold text-uppercase">Email</h4>
            <p class="text-primary cursor-pointer">spoatotrips@gmail.com</p>
            <v-spacer></v-spacer>
            <v-row class="mt-5 d-flex justify-center">
              <v-btn icon>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <h4 class="font-weight-bold text-uppercase">Address</h4>
            <p>Seoul</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

const travelModule = "travelModule";

export default {
 
  components: {
    // 필요한 컴포넌트를 여기에 추가
  },
  computed: {
    ...mapState(travelModule, ["travelList"]),
      travelListWithIntegerPrices() {
    return this.travelList.map(travel => ({
      ...travel,
      travelPrice: Math.round(travel.travelPrice)
    }));
  },
    pagedItems() {
      const startIdx = (this.pagination.page - 1) * this.perPage;
      const endIdx = startIdx + this.perPage;
      return this.travelList.slice(startIdx, endIdx);
    },
    displayedTravels() {
      return this.showAll ? this.travelList : this.travelList.slice(0, 3);
    },
  },
  mounted() {
    this.requestTravelListToDjango();
  },
  methods: {
    ...mapActions(travelModule, ["requestTravelListToDjango"]),
    getImageUrl(imageName) {
      return require(`@/assets/images/uploadImages/${imageName}`);
    },
    goToTravelReadPage(travelId) {
      this.$router.push({
        name: "TravelReadPage",
        params: { travelId: travelId },
      }).catch(err => {
        console.error(err);
      });
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
    handleBannerClick(index) {
      if (index === 3) { // 4th banner (0-based index)
        this.$router.push('/hotel'); // Replace with your target route
      }
    },
  },
  data() {
    return {
      showAll: false,
      headerTitle: [
        { title: "No", align: "start", sortable: true, key: "travelId" },
        { title: "상품명", align: "end", key: "travelName" },
        { title: "상품 가격", align: "end", key: "travelPrice" },
      ],
      perPage: 5,
      pagination: {
        page: 1,
      },
      banners: [
        require('@/assets/images/fixed/배너1.jpg'),
        require('@/assets/images/fixed/배너2.jpg'),
        require('@/assets/images/fixed/배너3.jpg'),
        require('@/assets/images/fixed/배너4.jpg'),
        require('@/assets/images/fixed/배너5.jpg'),
      ]
    };
  },
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.potrips-text {
  font-family: 'Gaegu', cursive;
  font-size: 1.5em
}

.text-center {
  text-align: center;
}

.v-divider {
  height: 2px;
}

.cursor-pointer {
  cursor: pointer;
}

.transition-500 {
  transition: transform 0.5s;
}

.scale-110 {
  transform: scale(1.1);
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fixed-width-card {
  width: 350px;
  height: 455px;
  border: 1px solid #ccc; 
  border-radius: 20px;  
  margin: 10px; 
}

.fixed-width-allcard {
  width: 320px;
  height: 455px;
  border: 1px solid #ccc; 
  border-radius: 20px;  
  margin: 3px; 
}

.slide-item-with-margin {
  margin:  10px;
}
.my-3 {
  margin: 8px 0; /* 상하 마진을 8px로 설정 */
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px; /* 카드 간의 간격 */
  
}
.card-item {
  max-width: 100%;
  border: 1px solid #ccc; 
  border-radius: 20px;  
}
.v-carousel__controls {
  background-color: transparent !important;
}

/* 필요한 경우, 덧점(delimiter) 컨트롤러의 상위 요소 배경도 투명하게 설정 */
.v-carousel__controls__container {
  background-color: transparent !important;
}
.v-carousel__controls__item {
  background-color: transparent !important;
  color: #555 !important; /* 덧점의 색상을 진한 회색으로 변경 */
}

.v-carousel__controls__item--active {
  background-color: transparent !important;
  color: #555 !important; /* 활성 덧점의 색상을 진한 회색으로 변경 */
}
.mt-5 {
  margin-top: 1000px;
}
.potrips-title {
  font-family: 'Gaegu', cursive;
  /* color: #e6b800; 감자와 비슷한 노란색 */
  font-size: 40px;  
  color: #1976D2;
}

.main-banner {
  position: relative;
  width: 100%;
  height: 50vh; /* Viewport height */
  overflow: hidden;
}

.main-banner img {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mb-10 {
  margin-bottom: 2.5rem; /* 40px margin */
}


</style>
