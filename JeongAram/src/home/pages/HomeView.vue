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
              <h2 class="font-weight-bold text-lg">설명</h2>
              <v-divider></v-divider>
              <p class="mt-4 text-lg">
                웹페이지 설명.
              </p>
            </v-col>
          </v-row>
        </v-container>

   
        <v-container class="my-10">
          <v-row>
            <v-col cols="12" sm="6" lg="4" v-for="(item, index) in portfolioItems" :key="index">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-img
                    v-bind="props"
                    :src="item.imgSrc"
                    height="200px"
                    class="transition-500"
                    :class="{'scale-110': isHovering}"
                    aspect-ratio="1"
                    alt="item.title"
                    @click="viewPortfolio(item.title)"
                  ></v-img>
                </template>
              </v-hover>
              <v-card class="text-center pa-6">
                <h3 class="text-xl font-weight-bold">{{ item.title }}</h3>
                <v-divider class="mx-auto my-4" style="width: 10%"></v-divider>
                <p>{{ item.description }}</p>
              </v-card>
            </v-col>
          </v-row>
          <v-btn class="mx-auto d-block my-6" color="primary" @click="viewAllPortfolio">
            View Portfolio
          </v-btn>
        </v-container>

        <v-container class="my-10">
          <v-row>
            <v-col cols="12" sm="6" lg="4" v-for="(item, index) in portfolioItems" :key="index">
              <v-card class="mx-auto" max-width="400px" elevation="2" style="height: 400px;" @click="navigateTo(item.route)">
                <!-- 이미지 섹션 -->
                <v-img
                  :src="item.imgSrc"
                  class="white--text"
                  height="220px"
                  :alt="item.title"
                  cover
                ></v-img>
            
  

        <!-- 텍스트 섹션 -->
 
          <v-col class="d-flex align-center" cols="auto">
                <v-icon>mdi-calendar-month-outline</v-icon>
                  <span>{{ item.duration }}</span>
          </v-col>
              <v-divider></v-divider>
          <v-col class="py-0" cols="auto">
            <v-chip class="ma-1" color="blue-grey lighten-4" text-color="blue-grey darken-2" rounded># 힐링여행</v-chip>
            <v-chip class="ma-1" color="purple lighten-4" text-color="purple darken-2" rounded># 해시태그</v-chip>
          </v-col>
          <div class="text-center pa-4">
            <span class="text-xl font-weight-bold">{{ item.title }}</span>
          </div>
          <div class="d-flex flex-column align-center">
            <span>199,000원</span>
            <!-- <span class="text-primary">{{ item.author }}</span> -->
          </div>
      </v-card>
    </v-col>
  </v-row>
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
            <p></p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
// import NavigationBar from '@/navigationBar/NavigationMenuBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    // NavigationBar
  },
  setup() {
    const router = useRouter();
    const portfolioItems = ref([
      {
        imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipPaRr-48NKZubsRpca9IKTtMIniyUU7Uyq_eLbE=w675-h390-n-k-no',
        title: '제주도',
        description: '아름다운 자연과 풍부한 문화유산을 자랑하는 제주도입니다.',
        duration: '2박 3일',
        // author: 'hi',
        route: '/travel/read/1',
      },
      {
        imgSrc: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRoXgBIzcXUbyJlXlRm3q6Vs5llQKmEZGrSdsI-0fIAxpm5WaCLLhs3FFq_tgV-Dtd0fUT1CzIVWoOL3ojdtNcUaJfoX3RUSX5KIddiFA',
        title: '서울',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, optio quo earum autem possimus inventore laboriosam quidem maiores laborum vel!',
      },
      {
        imgSrc: 'https://images.unsplash.com/photo-1588963940468-9e6e4d202209?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        title: 'Ballycarbery Castle Ruins',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, optio quo earum autem possimus inventore laboriosam quidem maiores laborum vel!',
      },
    ]);

    // 클릭 시 페이지 이동
    const navigateTo = (route) => {
      router.push(route);
    };

    // const viewPortfolio = (title) => {
    //   console.log(`Viewing portfolio for: ${title}`);
    //   router.push('/portfolio');
    // };

    // const viewAllPortfolio = () => {
    //   console.log('Viewing all portfolio');
    //   router.push('/portfolio');
    // };

    return {
      portfolioItems,
      // viewPortfolio,
      // viewAllPortfolio,
      navigateTo,
    };
  },
});
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
</style>