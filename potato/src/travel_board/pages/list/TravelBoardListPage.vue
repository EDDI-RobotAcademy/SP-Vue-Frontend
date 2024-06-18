<template lang="">
    <v-container>
        <h2>리뷰 게시판</h2>
        <v-alert travelBoardList></v-alert>
        <v-row v-if="travelBoardList">
            <v-col v-for="(travelBoard, index) in travelBoardList" :key=index cols="12" sm="6" md="4" lg="3">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"/>
                            </v-row>
                        </template>
                    <v-card-title>{{ travelBoard.title }}</v-card-title>
                    <v-card-subtitle>{{ travelBoard.point }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row v-else>
            <!-- Bootstrap 등에서 기본적으로 화면을 12개의 열로 구성함(전체 쓰겠단 소리) -->
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 리뷰가 없습니다!</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// 이것은 vuex 때문에 사용 가능
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
            return this.travelList.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestTravelBoardListToDjango()
    },
    methods: {
        ...mapActions(travelBoardModule, ['requestTravelBoardListToDjango']),
        getImageUrl (imageName) {
            return require('@/assets/images/uploadImages/' + imageName)
        },
        goToTravelReadPage (event, { item }) {
            console.log('읽기 구현 할 때 사용!')
        }
    },
    data () {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'travelBoardId',
                },
                { title: '제목', align: 'end', key: 'title' },
                { title: '평점', align: 'end', key: 'point' },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    }
}
</script>
