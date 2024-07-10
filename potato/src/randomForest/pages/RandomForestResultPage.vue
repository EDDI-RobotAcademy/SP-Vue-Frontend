<template>
    <v-container v-if="confusionMatrixInfoBeforeSmote && confusionMatrixInfoAfterSmote">
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-title class="headline">
                        Confusion Matrix before SMOTE
                    </v-card-title>
                    <v-card-text>
                        <confusion-matrix :confusionMatrix="confusionMatrixInfoBeforeSmote.confusion_matrix"/>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card>
                    <v-card-title class="headline">
                        Confusion Matrix after SMOTE
                    </v-card-title>
                    <v-card-text>
                        <confusion-matrix :confusionMatrix="confusionMatrixInfoAfterSmote.confusion_matrix"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
    <v-col cols="11">
        <common-chart :title="`Age vs Place`"
                      :data="ageInfo"
                      graphType="countplot"
                      xKey="age"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`gender vs Place`"
                      :data="genderInfo"
                      graphType="countplot"
                      xKey="gender"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`price vs Place`"
                      :data="priceInfo"
                      graphType="countplot"
                      xKey="price"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`travelConcept vs Place`"
                      :data="travelConceptInfo"
                      graphType="countplot"
                      xKey="travelConcept"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`travelCompanion vs Place`"
                      :data="travelCompanionInfo"
                      graphType="countplot"
                      xKey="travelCompanion"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`snsFrequency vs Place`"
                      :data="snsFrequencyInfo"
                      graphType="countplot"
                      xKey="snsFrequency"
                      hueKey="travelId"/>
    </v-col>

    <v-col cols="12">
        <common-chart :title="`photoFrequency vs Place`"
                      :data="photoFrequencyInfo"
                      graphType="countplot"
                      xKey="photoFrequency"
                      hueKey="travelId"/>
    </v-col>
    <v-col cols="12">
        <common-chart :title="`travelBudgetInfo vs Place`"
                      :data="travelBudgetInfo"
                      graphType="countplot"
                      xKey="travelBudget"
                      hueKey="travelId"/>
    </v-col>
</v-row>
         
    </v-container>
</template>

<script>
import ConfusionMatrix from '@/randomForest/components/ConfusionMatrix.vue';
import CommonChart from '@/randomForest/components/CommonChart.vue';
import axiosInstance from '@/utility/axiosInstance';

export default {
    components: {
        ConfusionMatrix,
        CommonChart
    },
    data () {
        return {
            confusionMatrixInfoBeforeSmote: null,
            confusionMatrixInfoAfterSmote: null,
            ageInfo: [],
            genderInfo: [],
            priceInfo: [],
            travelConceptInfo: [],
            travelCompanionInfo: [],
            snsFrequencyInfo: [],
            photoFrequencyInfo: [],
            travelBudgetInfo: []
        }
    },
    mounted () {
        this.ordersDataOnRandomForestAnalysis()
    },
    methods: {
        async ordersDataOnRandomForestAnalysis () {
            const response = await fetch('http://localhost:33333/random-forest')
            const data = await response.json()

            // const response = await axiosInstance.fastapiAxiosInst.get('/random-forest')
                
            // const data = await response.data

            console.log('data:', data)

            
            
            

            this.confusionMatrixInfoBeforeSmote = data.confusion_matrix_info_before_smote
            this.confusionMatrixInfoAfterSmote = data.confusion_matrix_info_after_smote
            this.ageInfo = data.common_info.t_age.sort((a, b) => a.age - b.age);
            this.genderInfo = data.common_info.t_gender;
            this.priceInfo = data.common_info.t_price.sort((a, b) => a.price - b.price);
            this.travelConceptInfo = data.common_info.t_travelConcept;
            this.travelCompanionInfo = data.common_info.t_travelCompanion;
            this.snsFrequencyInfo = data.common_info.t_snsFrequency;
            this.photoFrequencyInfo = data.common_info.t_photoFrequency;
            this.travelBudgetInfo = data.common_info.t_travelBudget;

        }
    }
}

</script>