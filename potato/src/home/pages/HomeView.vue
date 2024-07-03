<template>
  <v-app>
    <!-- Navigation Bar -->
    <!-- <NavigationBar /> -->

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Hero Section -->
        <v-parallax src="https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" height="calc(480px + 5vw)">
          <v-row align="center" justify="center" class="white--text text-center">
            <v-col cols="12">
              <v-divider class="mx-auto" style="width: 10%"></v-divider>
              <h1 class="text-4xl font-weight-bold">Potrips</h1>
              <v-divider class="mx-auto" style="width: 10%"></v-divider>
            </v-col>
          </v-row>
        </v-parallax>
      </v-container>
    </v-main>

    <!-- About Section -->
    <v-container class="my-10">
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="font-weight-bold text-lg"></h2>
          <v-divider></v-divider>
          <p class="mt-4 text-lg">
            여행 계획 짜는 것 마저 귀찮은 말하는 감자들을 위한 사이트
          </p>
        </v-col>
      </v-row>
    </v-container>
        <!-- Travel Items Slide Group -->
        <v-container class="my-10">
      <v-slide-group show-arrows class="py-5">
        <v-slide-item v-for="(item, index) in travelList" :key="index" class="slide-item-with-margin">
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
              <v-chip class="ma-1" color="blue-grey lighten-4" text-color="blue-grey darken-2" rounded>{{ item.travelContent }} </v-chip>
              <v-chip class="ma-1" color="purple lighten-4" text-color="purple darken-2" rounded># 해시태그</v-chip>
            </v-col>
            <div class="text-center pa-4">
              <span class="text-xl font-weight-bold">{{ item.travelName }}</span>
            </div>
            <div class="d-flex flex-column align-center">
              <span>{{ item.travelPrice }}원</span>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <!-- Portfolio Items -->
    <v-container class="my-10">
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="(item, index) in displayedTravels" :key="index">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-img
                v-bind="props"
                :src="getImageUrl(item.travelImage)"
                height="200px"
                class="transition-500"
                :class="{'scale-110': isHovering}"
                aspect-ratio="1"
                alt="item.travelName"
                @click="navigateToTravelDetail(item.travelid)"
              ></v-img>
            </template>
          </v-hover>
          <v-card class="text-center pa-6">
            <h3 class="text-xl font-weight-bold">{{ item.travelName }}</h3>
            <v-divider class="mx-auto my-4" style="width: 10%"></v-divider>
            <p>{{ item.travelContent }}</p>
          </v-card>
        </v-col>
      </v-row>
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
    goToTravelReadPage(boardId) {
      this.$router.push({
        name: "TravelReadPage",
        params: { boardId: boardId },
      }).catch(err => {
        console.error(err);
      });
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
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
    };
  },
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.v-parallax img {
  filter: brightness(70%);
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

.slide-item-with-margin {
  margin: 0 10px;
}
</style>
