<template lang="">
    <v-container>
        <h2>Travel Review 리뷰 게시판</h2>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ name: 'TravelReviewRegisterPage' }">
                게시물 작성
            </router-link>
        </div>
        <!-- 여기서 게시물 클릭 기능 구현 >> readrow -->
        <v-data-table
            v-model:items-per-page="perPage"
            :headers="headerTitle"
            :items="pagedItems"
            v-model:pagination="pagination"
            class="elevation-1"
            @click:row="readRow"
            item-value="reviewId"/>
        <v-pagination
            v-model="pagination.page"
            :length="Math.ceil(travelReviewList.length / perPage)"
            color="primary"
            @input="updateItems"
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
        }
    },
    data () {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'reviewId',
                },
                { title: '제목', align: 'end', key: 'title' },
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
