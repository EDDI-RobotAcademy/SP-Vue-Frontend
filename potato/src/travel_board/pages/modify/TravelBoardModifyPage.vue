<template>
    <v-container>
        <h2>게시물 수정</h2>
        <v-card v-if="travelBoard">
            <v-card-title>여행 상품 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="title" label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelBoard.writer" label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelBoard.point" label="별점"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelBoard.review" label="리뷰"/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="primary" @click="onModify">수정 완료</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'BoardReadPage' }">
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
import { mapActions, mapState} from 'vuex'

const travelBoardModule = 'travelBoardModule'

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            title: '',
            writer: '',
            reviewImage: null,
            point: 0,
            review: '',
        }
    },
    computed: {
        ...mapState(travelBoardModule, ['travelBoard']),
    },
    methods: {
        ...mapActions(travelBoardModule, ['requestTravelBoardToDjango', 'requestModifyTravelBoardToDjango']),
        async onModify (){
            console.log('수정 버튼 눌렀음')
            
            const payload = {
                boardId: this.boardId,
                title: this.title,
                point: this.point,
                review: this.review,
                reviewImage: this.reviewImage,
            }

            await this.requestModifyTravelBoardToDjango(payload)
            await this.$router.push({
                name:'TravelBoardListPage',
                params: { boardId: this.boardId }
            })
        }
    },

    created (){
        this.requestTravelBoardToDjango(this.boardId).then(()=>{
            this.title = this.travelBoard.title
            this.writer = this.travelBoard.writer
            this.point = this.travelBoard.point
            this.review = this.travelBoard.review
            this.reviewImage = this.travelBoard.reviewImage
        })
    },

}

</script>
