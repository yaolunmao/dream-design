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
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { reactive, ref, watch } from "vue";

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
const props = defineProps({
    title:{
        type:String,
        default:""
    },
    seriesName:{
        type:String,
        default:""
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
    text: props.title,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: props.seriesName,
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: props.seriesData
    }
  ]
});
watch(props, () => {
    option.title.text=props.title;
    option.series[0].name = props.seriesName;
    option.series[0].data = props.seriesData;
    vchartRef.value?.resize();
});
</script>