<template>
    <v-card>
        <v-card-title className="headline">{{ title }}</v-card-title>
        <v-card-text>
            <svg ref="chart"></svg>
        </v-card-text>
    </v-card>
</template>

<script>
import * as d3 from 'd3'

export default {
    props: {
        title: String,
        data: Array,
        graphType: String,
        xKey: String,
        hueKey: String,
        bins: Number,
    },
    mounted () {
        this.drawChart()
        window.addEventListener('resize', this.drawChart)

    },
    unmounted () {
        window.removeEventListener('resize', this.drawChart)
    },
    methods: {
        drawChart () {
            const { graphType } = this

            if (graphType === 'countplot') {
                this.drawCountPlot()
            } else if (graphType === 'histplot') {
                this.drawHistPlot()
            }
        },
        drawCountPlot () {
    const { data, xKey, hueKey } = this
    const svg = d3.select(this.$refs.chart)
    
    // 데이터를 xKey와 hueKey로 그룹화(x, y)
    const groupData = d3.rollup(
        data, v => v.length, d => d[xKey], d => d[hueKey]
    )

    const xKeyList = Array.from(groupData.keys())
    const hueKeyList = Array.from(new Set(data.map(d => d[hueKey])))

    const maxValue = d3.max(Array.from(groupData.values()), d => d3.max(Array.from(d.values())))

    const parentWidth = this.$refs.chart.parentElement.clientWidth
    const parentHeight = this.$refs.chart.parentElement.clientHeight

    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const width = parentWidth - margin.left - margin.right
    const height = parentHeight - margin.top - margin.bottom + 200
    
    svg.attr('width', parentWidth)
        .attr('height', parentHeight + 200)

    const chart = svg.select('g')

    if (!chart.empty()) {
        chart.remove()
    }

    const newChart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3.scaleBand()
        .domain(xKeyList)
        .range([0, width])
        .padding(0.1) // 여백 추가

    const yScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([height, 0])

    newChart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))

    newChart.append('g')
        .call(d3.axisLeft(yScale))

        const colorMap = {
    '4': 'lightblue', // 더 연한 톤
    '5': 'skyblue',
    '8': 'greenyellow',
    '9': 'limegreen',
    '11': 'orange',
    '12': 'darkorange',
    '13': 'orangered',
    '14': 'red',
    '15': 'darkred',
    '16': 'maroon' // 더 진한 톤
};

    console.log('colorMap:', hueKeyList.map(d => colorMap[d]))

    // 막대를 그룹으로 묶어서 색상을 적용
    hueKeyList.forEach(hueKey => {
        newChart.selectAll(`.bar-${hueKey}`)
            .data(xKeyList.map(x => ({x, y: groupData.get(x).get(hueKey) || 0, hueKey})))
            .enter()
            .append('rect')
            .attr('class', `bar-${hueKey}`)
            .attr('x', d => xScale(d.x) + (xScale.bandwidth() / hueKeyList.length) * hueKeyList.indexOf(d.hueKey))
            .attr('y', d => yScale(d.y))
            .attr('width', xScale.bandwidth() / hueKeyList.length)
            .attr('height', d => height - yScale(d.y))
            .attr('fill', d => colorMap[d.hueKey])
    })

    newChart.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(this.title)
},

        drawHistPlot () {
            const { data, xKey, bins } = this
            const svg = d3.select(this.$refs.chart)

            // 히스토그램 플로팅을 위해 데이터 값 추출
            const values = data.map(d => +d[xKey])

            const parentWidth = this.$refs.chart.parentElement.clientWidth
            const parentHeight = this.$refs.chart.parentElement.clientHeight

            const margin = { top: 50, right: 50, bottom: 50, left: 50 }
            const width = parentWidth - margin.left - margin.right
            const height = parentHeight - margin.top - margin.bottom + 100
            
            svg.attr('width', parentWidth)
                .attr('height', parentHeight + 100)

            const chart = svg.append('g')

            if (!chart.empty()) {
                chart.remove()
            }
            
            const newChart = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

            // 데이터 자체의 구간을 bins(30개)로 나누겠음
            const histogram = d3.histogram()
                .value(d => d)
                .domain(d3.extent(values))
                .thresholds(bins)

            const binsData = histogram(values)

            const xScale = d3.scaleLinear()
                .domain(d3.extent(values))
                .range([0, width])

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(binsData, d => d.length)])
                .nice()
                .range([height, 0])

            const colorScale = d3.scaleSequential(d3.interpolatePurples)
                .domain([0, d3.max(binsData, d => d.length)])

            newChart.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale))

            newChart.append('g')
                .call(d3.axisLeft(yScale))

            newChart.selectAll('rect')
                .data(binsData)
                .enter()
                .append('rect')
                .attr('x', d => xScale(d.x0))
                .attr('y', d => yScale(d.length))
                .attr('width', d => xScale(d.x1) - xScale(d.x0) - 1)
                .attr('height', d => height - yScale(d.length))
                .attr('fill', d => colorScale(d.length))

            newChart.append('text')
                .attr('x', width / 2)
                .attr('y', -margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .text(this.title)
        }
    }
}
</script>