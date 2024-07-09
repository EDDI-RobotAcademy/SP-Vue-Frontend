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
            <v-col cols="6">
                <common-chart :title="`Age vs Place`"
                                :data="ageInfo"
                                graphType="countplot"
                                xKey="age"
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

            this.ageInfo = data.common_info.t_age
        }
    }
}

</script>