<template>
    <v-container>
        <h2>고객 일기</h2>
        <v-card v-if="travelReview">
            <v-card-title>일기 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelReview.title" readonly label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelReview.writer" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                       <v-col cols="12">
                            <h2>평점</h2>
                            <div class="rating-read">
                            <span v-for="star in 5" :key="star" class="star-read" 
                                    :class="{ 'selected-read': star <= travelReview.point }">&#9733;</span>
                            </div>
                            <!-- <v-text-field v-model="travelReview.point" readonly label="평점"/> -->
                        </v-col>
                    </v-row>
                    <v-row>
                       <v-col cols="12">
                            <v-textarea v-model="travelReview.review" readonly label="일기 내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="getReviewImageUrl(travelReview.reviewImage)" aspect-ratio="1" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"/>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelReviewModifyPage', params: { ReviewId } }">
                                <v-btn color="primary">수정</v-btn>
                            </router-link>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">삭제</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelReviewListPage' }">
                                <v-btn color="secondary">돌아가기</v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const travelReviewModule = 'travelReviewModule'

export default {
    props: {
        ReviewId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(travelReviewModule, ['travelReview'])
    },
    // 삭제 구현 by 아람
    methods: {
        ...mapActions(travelReviewModule, ['requestTravelReviewToDjango', 'requestDeleteTravelReviewToDjango']),
        getReviewImageUrl (reviewImage) {
            console.log('reviewImage:', reviewImage)
            return require('@/assets/images/uploadImages/' + reviewImage)
        },
        async onDelete() {
            console.log('삭제를 누르셨습니다!')
            await this.requestDeleteTravelReviewToDjango(this.ReviewId)
            await this.$router.push({ name: 'TravelReviewListPage' })
        }
    },
    created () {
        console.log('ReviewId', this.ReviewId)
        this.requestTravelReviewToDjango(this.ReviewId)
    },
}
</script>

<style scoped>
.rating-read {
    direction: ltr;
    font-size: 2em;
    display: inline-block;
}
.star-read {
    color: lightgray;
    display: inline-block;
}
.star-read.selected-read {
    color: gold;
}


</style>