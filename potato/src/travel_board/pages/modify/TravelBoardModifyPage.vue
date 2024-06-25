<template>
    <v-container>
        <h2>리뷰 글 수정!</h2>
        <v-card v-if="travelBoard">
            <v-card-title>게시물 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="title" label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelBoard.writer" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="review" label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="primary" @click="onModify">수정 완료</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelBoardReadPage' }">
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

const travelBoardModule = 'travelBoardModule'

export default {
    props: {
        BoardId: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            title: '',
            writer: '',
            review: '',
        }
    },
    computed: {
        ...mapState(travelBoardModule, ['travelBoard'])
    },
    methods: {
        ...mapActions(travelBoardModule, ['requestTravelBoardToDjango', 'requestModifyTravelBoardToDjango']),
        async onModify () {
            console.log('수정 완료를 누르셨습니다!')

            const payload = {
                title: this.title,
                review: this.review,
                boardId: this.BoardId,
            }

            await this.requestModifyTravelBoardToDjango(payload)
            await this.$router.push({ 
                name: 'TravelBoardReadPage',
                params: { BoardId: this.BoardId } 
            })
        },
    },
    created () {
        console.log("boardId:",this.BoardId)
        this.requestTravelBoardToDjango(this.BoardId).then(() => {
            this.title = this.travelBoard.title
            this.writer = this.travelBoard.writer
            this.review = this.travelBoard.review
        })
    },
}
</script>