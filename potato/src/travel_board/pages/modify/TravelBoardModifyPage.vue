<template>
    <v-container>
        <h2>게시물 수정</h2>
        <v-card v-if="travelBoard">
            <v-card-title>여행 상품 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelBoard.title" label="제목"/>
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
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="getReviewImageUrl(travelBoard.reviewImage)" aspect-ratio="1" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"/>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                         <v-col cols="12">
                              <VFileInput v-file-input v-model="reviewImage" label="이미지 파일" prepend-icon="mdi-camera"/>
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
import { mapActions, mapState} from 'vuex'

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
        async onModify() {
    console.log('수정 버튼 눌렀음');

    const payload = {
        BoardId: this.BoardId,
        title: this.title,
        point: this.point,
        review: this.review,
        // reviewImage: this.reviewImage,
    };

    try {
        await this.requestModifyTravelBoardToDjango(payload);

        await this.$router.push({
            name: 'TravelBoardListPage',
            params: { BoardId: this.BoardId }
        });
    } catch (error) {
        console.error('수정 중 오류 발생:', error);
    }
},
        getReviewImageUrl (reviewImage) {
            console.log('reviewImage:', reviewImage)
            return require('@/assets/images/uploadImages/' + reviewImage)
        },
    },


    created (){
        this.requestTravelBoardToDjango(this.BoardId).then(()=>{
            this.title = this.travelBoard.title
            this.writer = this.travelBoard.writer
            this.point = this.travelBoard.point
            this.review = this.travelBoard.review
            // this.reviewImage = this.travelBoard.reviewImage
        })
    },
}
</script>
