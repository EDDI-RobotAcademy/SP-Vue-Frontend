<template lang="">
        <div class="background-images">
            <div class="background-image gamja"></div>
            <div class="background-image tube-gamja"></div>
            <div class="background-image hanbok-gamja"></div>
            <div class="background-image normal-gamja"></div>
        </div>
    <v-container class="travel-review">
        <h1 class="text-center mb-6 travel-review-title">🥔의 여행일기🚗</h1>
        <div class="text-right mb-4">
            <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                rounded
                :to="{ name: 'TravelReviewRegisterPage' }"
            >
                일기 쓰기
            </v-btn>
        </div>

        <!-- 여기가 게시물 list 올라오는 wider-card영역 -->
        <v-card class="elevation-3 wider-card">
            <v-data-table
                v-model:items-per-page="perPage"
                :headers="headerTitle"
                :items="pagedItems"
                v-model:pagination="pagination"
                @click:row="readRow"
                item-value="reviewId"
                class="review-table"
            >
            <template v-slot:[`item.regDate`]="{ item }">
                    {{ formatDateTime(item.regDate) }}
                </template>
            </v-data-table>
        </v-card>

        <v-pagination
            v-model="pagination.page"
            :length="Math.ceil(travelReviewList.length / perPage)"
            color="primary"
            @input="updateItems"
            class="mt-4"
        />
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'


const travelReviewModule = 'travelReviewModule'

export default {
    components: {
        // RouterLink
    },
    computed: {
        ...mapState(travelReviewModule, ['travelReviewList']),
        pagedItems () {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.travelReviewList.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestTravelReviewListToDjango()
        .then(() => {
        console.log("travelReview data list :",this.travelReviewList);})
    },
    methods: {
        ...mapActions(travelReviewModule, ['requestTravelReviewListToDjango']),
        readRow (event, { item }) {
            console.log('item :', item)
            this.$router.push({
                name: 'TravelReviewReadPage',
                // ReviewId는 Vue에서 사용할 변수(States), reviewId는 Django에서 반환한 data field명!
                params: { ReviewId: item['reviewId'].toString() }
            })
        },
        goToProductReadPage (ReviewId) {
            this.$router.push({
                name: 'TravelReviewReadPage',
                params: { ReviewId: ReviewId }
            })
        },
        goToTravelReviewList () {
            this.$router.push('/travel_review/list')
        },
        formatDateTime(dateTimeString) {
            const dateTime = new Date(dateTimeString);
            const date = dateTime.toISOString().split('T')[0]; // yyyy-mm-dd
            const time = dateTime.toTimeString().split(' ')[0]; // hh:mm:ss
            return `${date} ${time}`;
        },
    },
    data () {
        return {
            headerTitle: [
                {
                    title: 'No.',
                    align: 'start',
                    sortable: true,
                    key: 'reviewId',
                },
                { title: '일기 제목', align: 'end', key: 'title' },
                { title: '작성자', align: 'end', key: 'writer' },
                { title: '작성일자', align: 'end', key: 'regDate' },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    }
}
</script>

<style scoped>

/* 게시물 list 올라오는 wider-card영역에 관한 설정*/
.travel-review {
    max-width: 70%;
    position: relative;
    overflow: hidden;
}

/* background-images는 페이지에서 대한 감자들 배치 대한 설정 */
.background-images {
    position: absolute;
    bottom: 50px;
    left: 50px;
    display: flex;
    z-index: 1;
}

/* .background-image는 감자들 각각에 대한 설정  */
.background-image {
    width: 150px;
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom left;
    opacity: 0.3;
    /* margin-right는 감자들 사이의 간격에 대한 설정 */
    margin-right: 20px; 
}

.gamja {
    background-image: url('@/assets/images/fixed/감자.png');
}

.tube-gamja {
    background-image: url('@/assets/images/fixed/튜브감자.png');
}

.hanbok-gamja {
    background-image: url('@/assets/images/fixed/한복감자.png');
}

.normal-gamja {
    background-image: url('@/assets/images/fixed/그냥감자.png');
}

.travel-review-title {
    font-family: 'Gaegu', cursive;
    color: #1976D2;
    font-weight: bold;
    font-size: 4.0em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.wider-card {
    width: 100%;
    margin: 0 auto;
    border: 0.1ex solid black
    
}

.review-table {
    background-color: rgb(255, 255, 242)
}

.v-data-table ::v-deep .v-data-table__wrapper {
    border-radius: 8px;
}

.v-data-table ::v-deep th {
    background-color: #E3F2FD !important;
    color: #1976D2 !important;
    font-weight: bold;
}

.v-data-table ::v-deep tr:hover {
    background-color: #BBDEFB !important;
    cursor: pointer;
}

</style>