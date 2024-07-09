<template>
  <v-container class="travel-review-container" fluid>
    <v-card class="review-card mx-auto" rounded="lg" elevation="5">
      <v-card-title class="text-h4 text-center blue lighten-4 py-4 cute-font">
        여행 일기📖
      </v-card-title>
      <v-card-text>
        <v-row>
          <!-- 왼쪽 영역 -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="title"
              label="제목"
              prepend-icon="mdi-format-title"
              outlined
              dense
            />
            <v-text-field
              v-model="writer"
              label="작성자"
              prepend-icon="mdi-account"
              outlined
              dense
            />
            <v-file-input
              v-model="reviewImage"
              label="여행 사진"
              prepend-icon="mdi-camera"
              outlined
              dense
              accept="image/*"
            />
            <p v-if="uploadedFileName" class="caption">
              업로드된 파일: {{ uploadedFileName }}
            </p>
            <div class="text-center mt-6">
              <v-img
                src="@/assets/images/fixed/감자.png"
                max-width="150"
                class="mx-auto mb-2"
              ></v-img>
              <v-card-text class="speech-bubble cute-font">
                potrips를 이용해주셔서 감사합니다.😝
              </v-card-text>
            </div>
          </v-col>

          <!-- 오른쪽 영역 -->
          <v-col cols="12" md="6">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center">
                <v-text-field
                  v-model="point"
                  label="평점"
                  readonly
                  dense
                  hide-details
                  outlined
                  style="max-width: 60px;"
                  class="mr-2"
                />
                <div class="rating">
                  <span v-for="star in 5" :key="star" class="star" 
                        :class="{ 'selected': star <= point, 'hovered': star <= hoverRating && star > point}" 
                        @click="setRating(star)"
                        @mouseover="setHoverRating(star)"
                        @mouseleave="resetHoverRating">&#9733;</span>
                </div>
              </div>
              <span class="face-icon">{{ faceIcon }}</span>
            </div>
            <v-textarea
              v-model="review"
              outlined
              auto-grow
              rows="13"
            >
              <template v-slot:label>
                <div class="d-flex align-center">
                  <v-icon left>mdi-pencil</v-icon>
                  <span>여행 후기</span>
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end pa-4">
        <v-btn color="primary" @click="onSubmit" class="cute-btn mr-2">
          <v-icon left>mdi-check</v-icon>
          작성 완료
        </v-btn>
        <v-btn color="error" @click="onCancel" class="cute-btn">
          <v-icon left>mdi-close</v-icon>
          취소
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const travelReviewModule = 'travelReviewModule'

export default {
  data () {
    return {
      title: '',
      writer: '',
      reviewImage: null,
      point: 0,
      hoverRating: 0,
      review: '',
      uploadedFileName: '',
      faceIcon: '😐',
    }
  },
  methods: {
    ...mapActions(travelReviewModule, ['requestCreateTravelReviewToDjango']),
    setRating(value) {
      this.point = value;
      this.updateFaceIcon();
    },
    setHoverRating(value) {
      this.hoverRating = value;
    },
    resetHoverRating() {
      this.hoverRating = 0;
    },
    updateFaceIcon() {
      switch(this.point) {
        case 5:
          this.faceIcon = '😁';
          break;
        case 4:
          this.faceIcon = '😝';
          break;
        case 3:
          this.faceIcon = '🙂';
          break;
        case 2:
          this.faceIcon = '☹️';
          break;
        case 1:
          this.faceIcon = '😠';
          break;
        default:
          this.faceIcon = '😐';
      }
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
          
          const response = await this.requestCreateTravelReviewToDjango(imageFormData)
          this.uploadedFileName = response.data.reviewImage
          this.$router.push({ name: 'TravelReviewListPage' })
        } else {
          console.log('이미지 파일을 선택하세요!')
        }
      } catch (error) {
        console.log('파일 처리 과정에서 에러 발생:', error)
      }
    },
    async onCancel () {
      console.log('취소 버튼 눌렀지?')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gaegu&display=swap');

.travel-review-container {
  background-color: #f0f7fc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.review-card {
  max-width: 1000px;
  width: 100%;
  border-radius: 16px !important;
  overflow: hidden;
}

.rating {
  direction: ltr;
  font-size: 1.5em;
  display: inline-block;
}
  
.star {
  cursor: pointer;
  color: #BDBDBD;
  display: inline-block;
  transition: color 0.2s ease;
}

.star.selected {
  color: #FFC107;
}

.star.hovered {
  color: #FFC107;
}

.rating:hover .star:not(.selected) {
  color: #BDBDBD;
}

.rating:hover .star.hovered:not(.selected) {
  color: #FFC107;
}

.face-icon {
  font-size: 36px;
}

.cute-btn {
  border-radius: 20px !important;
  font-size: 1em !important;
  text-transform: none !important;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2) !important;
  transition: all 0.3s ease !important;
}

.cute-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 8px rgba(0,0,0,0.3) !important;
}

.cute-btn.primary {
  background-color: #FF9800 !important;
  border-color: #FF9800 !important;
}

.cute-btn.error {
  background-color: #E91E63 !important;
  border-color: #E91E63 !important;
}

.speech-bubble {
  position: relative;
  background: #ffffff;
  border-radius: .4em;
  padding: 10px;
  margin-top: 10px;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
  border-top: 0;
  margin-left: -10px;
  margin-top: -10px;
}

.cute-font {
  font-family: 'Gaegu', cursive;
  font-size: 1.2em;
}
</style>
