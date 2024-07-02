<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="title" label="제목"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="rating">
                    <span v-for="star in 5" :key="star" class="star" 
                          :class="{ 'selected': star <= point, 'hovered': star <= hoverRating }" 
                          @click="setRating(star)"
                          @mouseover="setHoverRating(star)"
                          @mouseleave="resetHoverRating">&#9733;</span>
                </div>
                <v-text-field v-model="point" label="평점" readonly/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="writer" label="작성자"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <!-- 세로로 늘어나야 하는데 가로로 늘어나고 있음 -->
                <v-textarea v-model="review" label="리뷰 내용" auto-grow/>
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
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

// namespace 방식으로 vuex board 모듈을 사용하기 위한 형태
const travelBoardModule = 'travelBoardModule'

export default {
    // 현재 이 Vue 컴포넌트에서 사용하는 변수는 모두 data에 배치됨
    data () {
        return {
            title: '',
            writer: '',
            reviewImage: null,
            point: 0,
            hoverRating: 0,
            review: '',
            uploadedFileName: '',
        }
    },
    // methods의 경우엔 실제 컴포넌트가 사용하는 기능 집합임
    methods: {
        // namespace 방식의 vuex board 모듈의 action 기능을 땡겨올 때 사용
        // 그러므로 이것은 boardModule의 action에 정의되어야 함
        // 쉽게 얘기해서 requestCreateBoardToDjango가 boardModule의 action에 정의되어야 한다는 말
        ...mapActions(travelBoardModule, ['requestCreateTravelBoardToDjango']),
        setRating(value) {
            this.point = value;
        },
        setHoverRating(value) {
            this.hoverRating = value;
        },
        resetHoverRating() {
            this.hoverRating = 0;
        },
        async onSubmit () {
            console.log('상품 등록 눌렀음')
            
            try {
                if (this.reviewImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('title', this.title)
                    imageFormData.append('writer', this.writer)
                    imageFormData.append('point', this.point.toString())
                    imageFormData.append('review', this.review)
                    imageFormData.append('reviewImage', this.reviewImage)
                    
                    const response = await this.requestCreateTravelBoardToDjango(imageFormData)
                    this.uploadedFileName = response.data.reviewImage
                    this.$router.push({ name: 'TravelBoardListPage' })
                } else {
                    console.log('이미지 파일을 선택하세요!')
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
        },
        async onCancel () {
            console.log('취소 버튼 눌럿지 ?')
            this.$router.go(-1)
        }
    }
}
</script>

<style>
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

.star.selected,
.star.hovered {
    color: gold;
}

.rating:hover .star {
    color: lightgray;
}

.rating:hover .star.hovered {
    color: gold;
}
</style>