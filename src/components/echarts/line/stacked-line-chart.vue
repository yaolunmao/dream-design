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
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { reactive, ref, watch } from "vue";

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    xAxisData: {
        type: Array,
        default: []
    },
    seriesData: {
        type: Array,
        default: []
    },
    legend: {
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
        trigger: 'axis'
    },
    legend: {
        data: props.legend
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: props.seriesData
});
watch(props, () => {
    option.title.text=props.title;
    option.xAxis.data = props.xAxisData;
    option.legend.data = props.legend;
    option.series = props.seriesData;
    vchartRef.value?.resize();
});
</script>