<script setup lang="ts">
// import { DreamDesignEdit } from "../src/assets/dist/dream-design.es";
// import  "../src/assets/dist/style.css";
import DreamDesignEdit from './components/dream-design-edit/index.vue';
import axios from "axios";
import { provide, ref } from 'vue';
import MonacoEdit from './components/monaco-edit/index.vue';
import CustomBasicTable from './components/custom/custom-basic-table.vue';
// import { DreamDesignEdit } from "../src/export";
const global_css_default = ref({});
const global_event_default =ref({});
//获取预制全局css
axios.get("/mock/global_css.json").then(res => {
  global_css_default.value = res.data;
});
axios.get("/mock/global_event.json").then(res => {
  global_event_default.value = res.data;
});
provide('global_css_default', global_css_default);//如需使用预制样式 请在此注入
provide('global_event_default', global_event_default);//如需使用预制事件 请在此注入


</script>

<template>
  <!-- <CustomBasicTable table-query-url="/mock/custo_basic_table1.json"></CustomBasicTable> -->
  <dream-design-edit></dream-design-edit>
</template>

<style>
body {
  margin: 0;
}
</style>
