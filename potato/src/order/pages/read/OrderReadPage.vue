<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>주문 상세 내역 보기</v-card-title>
                    <v-card-text>
                        <template v-if="order">
                            <v-table>
                                <thead>
                                <tr>
                                    <th>여행지</th>
                                    <th>가격</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="travel in order.travel" :key="travel.travelId">
                                        <td>{{ travel.travelName }}</td>
                                        <td>{{ travel.travelPrice }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </template>
                        <template v-else>
                            <p>주문 내역이 없습니다.</p>
                        </template>

                        <v-row>
                            <v-col class="text-right">
                                <v-btn color="green" @click="placeOrder">Place Order</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
const orderModule = 'orderModule'

export default {
    props: {
        orderId: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            order: null,
        };
    },
    computed: {
       
    },
    methods: {
        ...mapActions("orderModule", ["requestReadOrderToDjango"]),
        async fetchOrderData() {
            const orderId = this.orderId
            console.log('OrderReadPage orderId:', orderId)

            try {
                const response = await this.requestReadOrderToDjango({ orderId })
            } catch (error) {
                console.error('주문 내역 확인 중 에러:', error)
            }

            // const orderId = this.$route.params.orderId;
            // 여기에서 API 호출 또는 Vuex 액션을 통해 주문 데이터를 가져옵니다.
            // 예시: const response = await this.$store.dispatch('fetchOrder', orderId);
            // this.order = response;
            // 여기서는 더미 데이터를 사용합니다.
            // this.order = {
            //     orderId: orderId,
            //     items: [
            //         { productId: 1, productName: "Product 1", productPrice: 100, quantity: 2 },
            //         { productId: 2, productName: "Product 2", productPrice: 200, quantity: 1 },
            //     ]
            // };
        },
        placeOrder() {
            // 최종 주문 처리 로직
            alert("Order has been placed successfully!");
            // 주문 후 장바구니 초기화 또는 다른 로직 추가
            this.$router.push({ name: 'home' }); // Assuming you want to redirect to HomePage after order
        }
    },
    created() {
        this.fetchOrderData();
    }
};
</script>

<style>
/* 필요한 스타일을 여기에 추가합니다. */
</style>
