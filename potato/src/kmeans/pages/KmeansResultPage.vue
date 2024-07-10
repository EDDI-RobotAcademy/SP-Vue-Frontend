<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>K-means Clustering Visualization</h1>
                <div ref="chart" :style="{ width: '100%', height: '500px' }"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
    name: 'ClusterVisualization',
    data () {
        return {
            centers: [],
            labels: [],
            points: [],
            error: null
        }
    },
    async mounted () {
        try {
            const response = await axios.get('http://localhost:33333/kmeans-test')
            console.log("response: ", response)
            this.centers = response.data.centers
            this.labels = response.data.labels
            this.points = response.data.points
            this.createChart()
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    },
    methods: {
        createChart() {
            
    if (this.points.length === 0 || this.centers.length === 0) {
        console.error("No data available.")
        return;
    }

    

    const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '500px')
        .attr('viewBox', '0 0 800 500')
        .append('g')
        .attr('transform', 'translate(50,50)')

    const width = 700
    const height = 400

    // 스케일링 함수 설정
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(this.points, d => d3.max(d))])  // 데이터의 최대값을 기준으로 x 축 범위 설정
        .range([0, width])  // SVG 요소 내의 x 좌표 범위 설정

    const yScale = d3.scaleLinear()
        .domain([0, this.points.length])  // 데이터의 개수를 기준으로 y 축 범위 설정
        .range([height, 0])  // SVG 요소 내의 y 좌표 범위 설정

    // 제한된 색상 팔레트 설정 (5개의 색상만 사용)
    const color = d3.scaleOrdinal(d3.schemeCategory10.slice(0, 5))
    

    svg.selectAll('circle')
    .data(this.points.filter((_, i) => i % 2 === 0)) // 예: 인덱스가 짝수인 데이터 포인트만 그립니다.
    .enter()
    .append('circle')
    .attr('cx', (d, i) => xScale(d[0]))  // 첫 번째 속성을 x 좌표로 설정
    .attr('cy', (d, i) => yScale(i * 2))  // 필터링된 데이터 인덱스를 y 좌표로 설정 (원래 인덱스를 유지하기 위해 i * 2 사용)
    .attr('r', 5)  // 반지름 설정
    .attr('fill', (d, i) => color(this.labels[i * 2] % 5))  // 제한된 색상 설정 // 제한된 색상 설정

    // 클러스터 센터 그리기
    svg.selectAll('rect')
        .data(this.centers)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(d[0]) - 10)  // 첫 번째 속성을 x 좌표로 설정
        .attr('y', (d, i) => yScale(i) - 10)  // 데이터 인덱스를 y 좌표로 설정
        .attr('width', 20)  // 너비 설정
        .attr('height', 20)  // 높이 설정
        .attr('fill', 'purple')  // 색상 설정
}

    }
}

</script>