<template>
  <v-container class="my-10">
      <h2 class="headline">나의 주문 내역</h2>
      <v-btn @click="sortOrderListByDate()">날짜 순 정렬</v-btn>
      <div v-if="orderList && orderList.length > 0">
          <v-row v-for="(order, index) in orderList" :key="index" no-gutters>
              <v-col cols="12">
                  <v-card class="order-card" elevation="2" @click="goToOrderReadPage(order.id)">
                      <v-card-title class="headline mb-2">{{ index + 1 }}</v-card-title>
                      <v-card-text class="px-2 pb-2">
                          {{ order.created_date.slice(0, 16) }}
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
      </div>
      <v-row v-else>
          <v-col cols="12" class="text-center">
              <v-alert type="info">등록된 여행 상품이 없습니다!</v-alert>
          </v-col>
      </v-row>
  </v-container>
</template>

  
<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("orderModule", ["orderList"]),
  },
  methods: {
    ...mapActions("orderModule", ["requestOrderListToDjango"]),
    goToOrderReadPage(orderId) {
      this.$router.push({ name: "OrderReadPage", params: { orderId: orderId } })
      // .catch((err) => {
      //   console.error(err);
      // }
    },
    sortOrderListByDate() {
      this.orderList.sort((a, b) => new String(a.created_date) - new String(b.created_date))
    },
  },
};
</script>

<style>
.my-10 {
    margin-top: 10px;
}
.order-card {
    cursor: pointer;
    margin-bottom: 0; /* 카드 간격을 없앰 */
    border-bottom: 1px solid #eee; /* 카드 간 구분선 추가 */
}

.headline {
    font-family: 'Gaegu', cursive;
    font-weight: bold;
    font-size: 1.8em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>