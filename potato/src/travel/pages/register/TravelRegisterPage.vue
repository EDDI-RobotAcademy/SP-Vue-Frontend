
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="travelName" label="여행지"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="travelPrice" label="가격" type="number"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="travelProperty" label="특성"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="travelContent" label="상세 내용" auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="travelImage" label="이미지 파일" prepend-icon="mdi-camera"/>
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
const travelModule = 'travelModule'
export default {
    data () {
        return {
            travelName: '',
            travelPrice: 0,
            travelContent: '',
            travelImage: null,
            uploadedFileName: '',
            travelProperty: '', 
        }
    },
    methods: {
        ...mapActions(travelModule, ['requestCreateTravelToDjango']),
        async onSubmit () {
            console.log('상품 등록 눌렀음')
            
            try {
                if (this.travelImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('travelName', this.travelName)
                    imageFormData.append('travelProperty', this.travelProperty)
                    imageFormData.append('travelPrice', this.travelPrice.toString())
                    imageFormData.append('travelContent', this.travelContent)
                    imageFormData.append('travelImage', this.travelImage)
                    console.log(imageFormData)
                    const response = await this.requestCreateTravelToDjango(imageFormData)
                    this.uploadedFileName = response.data.imageName
                    this.$router.push({ name: 'TravelListPage' })
                } else {
                    console.log('이미지 파일을 선택하세요!')
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
            // 상품 상세 정보 읽기
        },
        async onCancel () {
            console.log('취소 버튼 눌럿음')
            // '이전 routing 경로로 이동해줘' 를 의미함
            this.$router.go(-1)
        }
    }
}
</script>