<template>
  <v-container>
    <v-form>
      <h2>회원가입 설문조사</h2>

      <h3>기본 정보</h3>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="나이 (만)" v-model="age" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select label="성별" :items="['남성', '여성']" required></v-select>
        </v-col>
      </v-row>

      <h3>선호 여행지</h3>
      <h4>다음 중 가장 가고 싶은 여행컨셉은 무엇인가요?</h4>
      <v-radio-group v-model="travelConcept" required>
        <v-radio label="식도락" value="food"></v-radio>
        <v-radio label="관광" value="photo"></v-radio>
        <v-radio label="도보여행" value="hiking"></v-radio>
        <v-radio label="포토여행" value="sightseeing"></v-radio>
        <v-radio label="액티비티" value="activity"></v-radio>
        <v-radio label="힐링" value="healing"></v-radio>
      </v-radio-group>

      <h4>주로 누구와 여행을 가나요?</h4>
      <v-radio-group v-model="travelCompanion" required>
        <v-radio label="혼자" value="alone"></v-radio>
        <v-radio label="가족" value="family"></v-radio>
        <v-radio label="친구" value="friends"></v-radio>
        <v-radio label="연인" value="partner"></v-radio>
        <v-radio label="단체" value="group"></v-radio>
      </v-radio-group>

      <h4>여행 중 소셜 미디어를 얼마나 자주 사용하시나요?</h4>
      <v-radio-group v-model="snsFrequency" required>
        <v-radio label="매 순간을 공유" value="always"></v-radio>
        <v-radio label="특별한 순간만 공유" value="sometimes"></v-radio>
        <v-radio label="가끔 체크" value="occasionally"></v-radio>
        <v-radio label="여행 중엔 완전히 끊기" value="never"></v-radio>
      </v-radio-group>

      <h4>여행 중 사진 찍기를 얼마나 좋아하시나요?</h4>
      <v-radio-group v-model="photoFrequency" required>
        <v-radio label="매 순간 사진 찍기" value="always"></v-radio>
        <v-radio label="중요한 순간만 촬영" value="import_moments"></v-radio>
        <v-radio label="최소한의 사진만 찍기" value="minimum"></v-radio>
        <v-radio label="사진보다는 기억에 담기" value="memory"></v-radio>
      </v-radio-group>

      <h4>국내 여행 시 평균적으로 지출하는 예산은 얼마인가요?</h4>
      <v-radio-group v-model="travelBudget" required>
        <v-radio label="10만원 이하" value="under_100k"></v-radio>
        <v-radio label="10-30만원" value="100k_to_300k"></v-radio>
        <v-radio label="30-50만원" value="300k_to_500k"></v-radio>
        <v-radio label="50-100만원" value="500k_to_1m"></v-radio>
        <v-radio label="100만원 이상" value="over_1m"></v-radio>
      </v-radio-group>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submitSurvey">
          제출하기
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import axiosInst from "@/utility/axiosInstance"

export default {
  name: 'SurveyPage',
  data() {
    return {
      age: '',
      gender: '',
      travelConcept: '',
      travelCompanion: '',
      snsFrequency: '',
      photoFrequency: '',
      travelBudget: ''
    };
  },
  methods: {
    ...mapActions(['submitSurvey']),
    async submitSurvey() {
      const payload = {
        age: Number(this.age) || 0,
        gender: this.gender === '남성' ? 1 : 2,
        travelConcept: ['food', 'photo', 'hiking', 'sightseeing', 'activity', 'healing'].indexOf(this.travelConcept) + 1,
        travelCompanion: ['alone', 'family', 'friends', 'partner', 'group'].indexOf(this.travelCompanion) + 1,
        snsFrequency: ['always', 'sometimes', 'occasionally', 'never'].indexOf(this.snsFrequency) + 1,
        photoFrequency: ['always', 'import_moments', 'minimum', 'memory'].indexOf(this.photoFrequency) + 1,
        travelBudget: ['under_100k', '100k_to_300k', '300k_to_500k', '500k_to_1m', 'over_1m'].indexOf(this.travelBudget) + 1,
      };
      console.log('Survey payload:', payload);
      try {
        await axiosInst.djangoAxiosInst.post('/survey/register', payload); // Django 서버의 엔드포인트로 가정
        this.$router.push('/');
      } catch (error) {
        console.error('Survey submission failed:', error);
        
      }
    }
  }
}
</script>