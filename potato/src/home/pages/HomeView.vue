
 
<template>
 <div class="home">
   <header class="header">
     <h1>Potrips</h1>
   </header>
   <nav class="navigation">
     <ul>
       <li><a href="#">홈</a></li>
       <li><a href="#">인기 여행지</a></li>
       <li><a href="#">테마 여행</a></li>
       <li><a href="#">여행 후기</a></li>
       <!-- <li><a href="#">문의하기</a></li> -->
     </ul>
   </nav>
   <main>
     <section class="background">
       <!-- <img src="C:\proj\SP-Vue-Frontend\potato\src\assets\images\uploadImages\background.png" /> -->
     </section>
     <section class="popular-destinations">
       <h2>인기 여행지</h2>
       <div class="destinations">
         <div v-for="destination in destinations" :key="destination.id" class="destination-card">
           <img :src="destination.image" :alt="destination.name" />
           <h3>{{ destination.name }}</h3>
           <p>{{ destination.description }}</p>
           <button @click="viewDetails(destination.id)">자세히 보기</button>
         </div>
       </div>
     </section>
     <section class="theme-travel">
       <h2>테마 여행</h2>
       <div class="themes">
         <div v-for="theme in themes" :key="theme.id" class="theme-card">
           <img :src="theme.image" :alt="theme.name" />
           <h3>{{ theme.name }}</h3>
           <p>{{ theme.description }}</p>
           <button @click="viewDetails(theme.id)">자세히 보기</button>
         </div>
       </div>
     </section>
   </main>
 </div>
</template>

  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
    name: 'HomeView',
    setup() {
      const destinations = ([
        {
          id: 1,
          name: '제주도',
          description: '아름다운 자연과 풍부한 문화유산을 자랑하는 제주도입니다.',
          image: 'jeju.jpg',
        },
        {
          id: 2,
          name: '서울',
          description: '현대와 전통이 공존하는 대한민국의 수도 서울입니다.',
          image: 'seoul.jpg',
        },
        {
          id: 3,
          name: '부산',
          description: '아름다운 해변과 활기찬 도시 생활이 어우러진 부산입니다.',
          image: 'busan.jpg',
        },
      ]);
  
      const themes = ref([
        {
          id: 1,
          name: '가족 여행',
          description: '온 가족이 함께 즐길 수 있는 여행 코스입니다.',
          image: 'family.jpg',
        },
        {
          id: 2,
          name: '커플 여행',
          description: '로맨틱한 분위기의 커플 여행 코스입니다.',
          image: 'couple.jpg',
        },
        {
          id: 3,
          name: '혼자 여행',
          description: '혼자서도 즐길 수 있는 여행 코스입니다.',
          image: 'solo.jpg',
        },
      ]);
  
      const viewDetails = (id) => {
        console.log(`View details for item with id: ${id}`);
        // 추가적인 로직을 여기에 구현합니다.
      };
  
      return {
        destinations,
        themes,
        viewDetails,
      };
    },
  };
  </script>
  
  <style scoped>
  .home {
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 1rem;
  }
  
  .navigation ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    background-color: #333;
  }
  
  .navigation li {
    margin: 0 1rem;
  }
  
  .navigation a {
    color: white;
    text-decoration: none;
  }
  
  /* .banner img {
    width: 100%;
    height: auto;
  } */
  .background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  background-image: url("@/assets/background.png");
  background-size: cent;
  background-repeat: no-repeat;
  background-position: center;
}
  
  .popular-destinations, .theme-travel {
    padding: 2rem;
  }
  
  .destinations, .themes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .destination-card, .theme-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 1rem;
    padding: 1rem;
    width: 200px;
    text-align: left;
  }
  
  .destination-card img, .theme-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .destination-card h3, .theme-card h3 {
    margin: 0.5rem 0;
  }
  
  .destination-card button, .theme-card button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .destination-card button:hover, .theme-card button:hover {
    background-color: #45a049;
  }
  
  /* .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    width: 100%;
  } */
  </style>
 

  