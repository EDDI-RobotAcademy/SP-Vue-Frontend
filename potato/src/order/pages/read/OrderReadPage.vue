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
                                    <th>사진</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="items in order" :key="items.travel_id">
                                        <td>{{ items.travel_name }}</td>
                                        <td>{{ items.price }}</td>
                                        <v-img :src="getReviewImageUrl(items.travel_image)" aspect-ratio="1" class="grey lighten-2">
                                            <template v-slot:placeholder>
                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"/>
                                                </v-row>
                                            </template>
                                        </v-img>
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
import { mapActions, mapState } from 'vuex';
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
                this.order = response
                this.order = this.order.order_items
                console.log('ordersItemInfo:', this.order)
            } catch (error) {
                console.error('주문 내역 확인 중 에러:', error)
            }
        },
        placeOrder() {
            // 최종 주문 처리 로직
            alert("Order has been placed successfully!");
            // 주문 후 장바구니 초기화 또는 다른 로직 추가
            this.$router.push({ name: 'home' }); // Assuming you want to redirect to HomePage after order
        },
        getReviewImageUrl (travel_image) {
            console.log('travel_image:', travel_image)
            return require('@/assets/images/uploadImages/' + travel_image)
        },
    },
    created() {
        this.fetchOrderData();
    }
};
</script>

<style>
/* 필요한 스타일을 여기에 추가합니다. */
</style>
