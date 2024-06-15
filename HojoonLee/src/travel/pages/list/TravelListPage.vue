<template lang="">
    <v-container>
        <h2>안녕 난 말하는 감자야</h2>
        <v-alert travelList></v-alert>
        <v-row v-if="travelList">
            <v-col v-for="(travel, index) in travelList" :key=index cols="12" sm="6" md="4" lg="3">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"/>
                            </v-row>
                        </template>
                    <v-card-title>{{ travel.travelName }}</v-card-title>
                    <v-card-subtitle>{{ travel.travelPrice }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row v-else>
            <!-- Bootstrap 등에서 기본적으로 화면을 12개의 열로 구성함(전체 쓰겠단 소리) -->
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
</script>
