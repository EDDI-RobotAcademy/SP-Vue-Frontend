<template lang="">
    <v-container>
        <h2>안녕 클레오파트라 세상에서 제일가는 포테이토칩</h2>
        
        <v-row v-if="productList.length > 0">
            <v-col v-for="(product, index) in productList" :key=index sm="6">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"/>
                    </v-row>
                </template>
                    
                <v-card-title>{{ product.productName }}</v-card-title>
                <v-card-subtitle>{{ product.productPrice }}</v-card-subtitle>
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