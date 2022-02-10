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
    title:{
        type:String,
        default:""
    },
    xAxisData: {
        type: Array,
        default: []
    },
    seriesData: {
        type: Array,
        default: []
    },
    showBackground: {
        type: Boolean,
        default: false
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
    xAxis: {
        type: 'category',
        data: props.xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: props.seriesData,
            type: 'bar',
            showBackground: props.showBackground
        }
    ]
});
watch(props, () => {
    option.title.text=props.title;
    option.xAxis.data = props.xAxisData;
    option.series[0].data = props.seriesData;
    option.series[0].showBackground = props.showBackground;
    vchartRef.value?.resize();
});
</script>