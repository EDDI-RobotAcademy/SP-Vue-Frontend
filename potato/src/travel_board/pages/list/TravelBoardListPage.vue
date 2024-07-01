<template lang="">
    <v-container>
        <h2>Travel Board 리뷰 게시판</h2>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ name: 'TravelBoardRegisterPage' }">
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
            item-value="boardId"/>
        <v-pagination
            v-model="pagination.page"
            :length="Math.ceil(travelBoardList.length / perPage)"
            color="primary"
            @input="updateItems"
            />
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const travelBoardModule = 'travelBoardModule'

export default {
    components: {
        // RouterLink
    },
    computed: {
        ...mapState(travelBoardModule, ['travelBoardList']),
        pagedItems () {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.travelBoardList.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestTravelBoardListToDjango()
    },
    methods: {
        ...mapActions(travelBoardModule, ['requestTravelBoardListToDjango']),
        readRow (event, { item }) {
            console.log('item :', item)
            this.$router.push({
                name: 'TravelBoardReadPage',
                // BoardId는 Vue에서 사용할 변수(States), boardId는 Django에서 반환한 data field명!
                params: { BoardId: item['boardId'].toString() }
            })
        },
        goToProductReadPage (BoardId) {
            this.$router.push({
                name: 'TravelBoardReadPage',
                params: { BoardId: BoardId }
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
                    key: 'boardId',
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
