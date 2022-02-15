import { IComponentImport, IConfigComponentGroup } from "../model/model";
//element组件
import { ElLayoutGroup } from "./element/layout"; //布局
import { ElBasicGroup } from "./element/basic"; //基础
import { ElFormGroup } from "./element/form"; //表单
//antd组件
import { AntdBasicGroup } from "./antdesign/basic"; //基础
//图表组件
import { EchartsLineGroup } from "./echarts/line"; //折线图
import { EchartsBarGroup } from "./echarts/bar"; //折线图
import { EchartsPieGroup } from "./echarts/pie"; //饼图
import { EchartsCustomGroup } from "./echarts/custom"; //自定义
//原生组件
import { NativeBasicGroup } from "./native/basic"; //原生
//自定义组件
import { CustomDataGroup } from "./custom/data"; //数据展示
import {
  ElButton,
  ElButtonGroup,
  ElCol,
  ElContainer,
  ElHeader,
  ElLink,
  ElAside,
  ElMain,
  ElFooter,
  ElRow,
  ElScrollbar,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
} from "element-plus";
import { Button as AButton } from "ant-design-vue";
import VChart from "vue-echarts";
import BasicLineChart from "../components/echarts/line/basic-line-chart.vue";
import StackedLineChart from "../components/echarts/line/stacked-line-chart.vue";
import BasicBarChart from "../components/echarts/bar/basic-bar-chart.vue";
import HorizontalBarChart from "../components/echarts/bar/horizontal-bar-chart.vue";
import BasicPieChart from "../components/echarts/pie/basic-pie-chart.vue";
import DoughnutPieChart from "../components/echarts/pie/doughnut-chart.vue";
import CustomBasicTable from ".././components/custom/custom-basic-table.vue";

const elementConfigCenter: IConfigComponentGroup[] = Object.seal([
  ElLayoutGroup,
  ElBasicGroup,
  ElFormGroup,
]);
const antdConfigCenter: IConfigComponentGroup[] = Object.seal([AntdBasicGroup]);

const EchartsConfigCenter: IConfigComponentGroup[] = Object.seal([
  EchartsLineGroup,
  EchartsBarGroup,
  EchartsPieGroup,
  EchartsCustomGroup,
]);
const NativeConfigCenter: IConfigComponentGroup[] = Object.seal([
  NativeBasicGroup,
]);
const customConfigCenter: IConfigComponentGroup[] = Object.seal([
  CustomDataGroup,
]);
export const configCenter = {
  element: elementConfigCenter,
  antd: antdConfigCenter,
  EChart: EchartsConfigCenter,
  原生: NativeConfigCenter,
  自定义: customConfigCenter,
};
//这么写是为了让别人引用编辑器组件的时候不用全局引入其它组件库
export const ComponentImport: IComponentImport = {
  "el-button": ElButton,
  "el-button-group": ElButtonGroup,
  "el-link": ElLink,
  "el-container": ElContainer,
  "el-header": ElHeader,
  "el-aside": ElAside,
  "el-main": ElMain,
  "el-footer": ElFooter,
  "el-row": ElRow,
  "el-col": ElCol,
  "el-scrollbar": ElScrollbar,
  "el-cascader": ElCascader,
  "el-cascader-panel": ElCascaderPanel,
  "el-checkbox": ElCheckbox,
  "el-checkbox-group": ElCheckboxGroup,
  "el-color-picker": ElColorPicker,
  "el-date-picker": ElDatePicker,
  "el-form": ElForm,
  "el-form-item": ElFormItem,
  "el-input": ElInput,
  "v-chart": VChart,
  "basic-line-chart": BasicLineChart,
  "stacked-line-chart": StackedLineChart,
  "basic-bar-chart": BasicBarChart,
  "horizontal-bar-chart": HorizontalBarChart,
  "basic-pie-chart": BasicPieChart,
  "doughnut-chart": DoughnutPieChart,
  "a-button": AButton,
  "custom-basic-table": CustomBasicTable,
};
