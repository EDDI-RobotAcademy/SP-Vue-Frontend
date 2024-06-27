<template>
    <v-container>
        <h2>게시물 읽기!</h2>
        <v-card v-if="travel">
            <v-card-title>게시물 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travel.travelName" readonly label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travel.travelLocation" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
         /               <v-col cols="12">
                            <v-textarea v-model="travel.travelContent" readonly label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col cols="12">
                            <v-img :src="getReviewImageUrl(travel.travelImage)" aspect-ratio="1" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"/>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row> -->
                    <!-- <v-row justify="end">
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelBoardModifyPage', params: { BoardId } }">
                                <v-btn color="primary">수정</v-btn>
                            </router-link>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">삭제</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelBoardListPage' }">
                                <v-btn color="secondary">돌아가기</v-btn>
                            </router-link>
                        </v-col>
                    </v-row> -->
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const travelModule = 'travelModule'

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(travelModule, ['travel'])
    },
    // 삭제 구현 by 아람
    methods: {
        ...mapActions(travelModule, ['requestTravelToDjango']),
        // getReviewImageUrl (reviewImage) {
        //     console.log('reviewImage:', reviewImage)
        //     return require('@/assets/images/uploadImages/' + reviewImage)
        // },
        // async onDelete() {
        //     console.log('삭제를 누르셨습니다!')
        //     await this.requestDeleteTravelBoardToDjango(this.BoardId)
        //     await this.$router.push({ name: 'TravelBoardListPage' })
        // }
    },
    created () {
        const boardId = this.$route.params.boardId; // 라우터 파라미터에서 boardId를 가져옴
        console.log('boardId', boardId);
        if (boardId) {
            this.requestTravelToDjango(boardId);
        } else {
            console.error('boardId is undefined');
            // 적절한 오류 처리 로직 추가 (예: 사용자를 이전 페이지로 리다이렉트)
        }
    },
}
</script>