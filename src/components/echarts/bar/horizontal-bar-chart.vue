<template>
    <v-chart
        ref="vchartRef"
        :style="{ height: `${props.height}px`, width: `${props.width}px` }"
        :option="option"
    />
</template>
<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { reactive, ref, watch } from "vue";

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    yAxisData: {
        type: Array,
        default: []
    },
    seriesData: {
        type: Array,
        default: []
    },
    height: {
        type: Number,
        default: 400
    },
    width: {
        type: Number,
        default: 400
    }
});
const vchartRef = ref<InstanceType<typeof VChart>>();
const option = reactive({
    title: {
        text: props.title
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: props.yAxisData
    },
    series: props.seriesData
});
watch(props, () => {
    option.title.text = props.title;
    option.yAxis.data = props.yAxisData;
    option.series = props.seriesData;
    vchartRef.value?.resize();
});
</script>