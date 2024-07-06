<template>
    <v-container class="my-10">
      <h2 class="headline">나의 주문 내역</h2>
      <v-row v-if="orderList && orderList.length > 0">
        <v-col
            v-for="(order, index) in orderList"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
            <v-card class="ma-5 order-card" elevation="12" @click="goToOrderReadPage(order.id)">
        
            <!-- order.id 대신 index + 1 사용 -->
            <v-card-title class="headline mb-2">{{ index + 1 }}</v-card-title>

            <v-card-text class="px-2 pb-2">
                <!-- slice를 통해 문자열 일부만 표기 -->
                {{ order.created_data.slice(0,16) }}
            </v-card-text>
                    
            </v-card>
        </v-col>
    </v-row>
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
        this.$router.push({ name: "OrderReadPage", params: { orderId: orderId } }).catch((err) => {
          console.error(err);
        });
      },
    },
  };
  </script>