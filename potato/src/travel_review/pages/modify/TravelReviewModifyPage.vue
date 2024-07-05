<template>
    <v-container>
        <h2>일기 수정!</h2>
        <v-card v-if="travelReview">
            <v-card-title>일기 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="title" label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="travelReview.writer" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div class="rating">
                                <span v-for="star in 5" :key="star" class="star"                                            
                                      :class="{ 'selected': star <= point, 'hovered': star <= hoverRating && star > point}" 
                                      @click="setRating(star)"
                                      @mouseover="setHoverRating(star)"
                                      @mouseleave="resetHoverRating">&#9733;</span>
                            </div>
                            <v-text-field v-model="point" readonly label="평점"/> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="review" label="일기 내용" auto-grow/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-file-input v-model="reviewImage" label="이미지 파일" prepend-icon="mdi-camera"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <p v-if="uploadedFileName">업로드된 파일: {{ uploadedFileName }}</p>
                        </v-col>
                    </v-row>

                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="primary" @click="onModify">수정 완료</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'TravelReviewReadPage' }">
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
    data () {
        return {
            title: '',
            writer: '',
            review: '',
            reviewImage: null, // 이거 추가해야 등록이미지가 맺힘
            point: 0,
            hoverRating: 0,
            uploadedFileName: '',
        }
    },
    computed: {
        ...mapState(travelReviewModule, ['travelReview'])
    },
    methods: {
        ...mapActions(travelReviewModule, ['requestTravelReviewToDjango', 'requestModifyTravelReviewToDjango']),
        setRating(value) {
            this.point = value;
        },
        setHoverRating(value) {
            this.hoverRating = value;
        },
        resetHoverRating() {
            this.hoverRating = 0;
        },
        async onModify () {
            console.log('수정 완료를 누르셨습니다!')



            // 이미지 수정 까지 처리
            try {
                if (this.reviewImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('title', this.title)
                    imageFormData.append('reviewId',this.ReviewId)
                    imageFormData.append('review', this.review)
                    imageFormData.append('point', this.point.toString())
                    imageFormData.append('reviewImage', this.reviewImage)
                    
                    const response = await this.requestModifyTravelReviewToDjango(imageFormData)
                    console.log('modify response :', response)
                    this.uploadedFileName = response.data.reviewImage
                    
                    await this.$router.push({ 
                        name: 'TravelReviewReadPage',
                        params: { ReviewId: this.ReviewId } 
                    })
                } else {
                    console.log('이미지 파일을 선택하세요!')
                    // 이미지 빼고는 다 수정
                    const imageFormData = new FormData()
                    imageFormData.append('title', this.title)
                    imageFormData.append('reviewId',this.ReviewId)
                    imageFormData.append('review', this.review)
                    imageFormData.append('point', this.point.toString())
                    imageFormData.append('reviewImage', this.reviewImage)
                    await this.requestModifyTravelReviewToDjango(imageFormData)

                    await this.$router.push({ 
                        name: 'TravelReviewReadPage',
                        params: { ReviewId: this.ReviewId } 
                    })
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
        },
    },
    created () {
        console.log("reviewId:",this.ReviewId)
        this.requestTravelReviewToDjango(this.ReviewId).then(() => {
            this.title = this.travelReview.title
            this.writer = this.travelReview.writer
            this.review = this.travelReview.review
            this.point = this.travelReview.point
        })
    },
}
</script>

<style scoped>
.rating {
    direction: ltr;
    font-size: 2em;
    display: inline-block;
}
  
.star {
    cursor: pointer;
    color: lightgray;
    display: inline-block;
    transition: color 0.2s ease;
}

.star.selected {
    color: gold;
}

.star.hovered {
    color: gold;
}

.rating:hover .star:not(.selected) {
    color: lightgray;
}

.rating:hover .star.hovered:not(.selected) {
    color: gold;
}
</style>