import {
  ERightToolAttrType,
  IConfigComponentGroup,
  IConfigComponentItem,
} from "../../../model/model";

const D_EchartsBasicPie: IConfigComponentItem = {
  title: "基础饼图",
  icon: "chart-pie",
  domInfo: {
    tag: "basic-pie-chart",
    title: "基础饼图",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      title: {
        type: ERightToolAttrType.Input,
        default: "Referer of a Website",
        title: "标题",
        tips: "标题",
      },
      subtitle: {
        type: ERightToolAttrType.Input,
        default: "Fake Data",
        title: "副标题",
        tips: "副标题",
      },
      seriesName: {
        type: ERightToolAttrType.Input,
        default: "Access From",
        title: "源名称",
        tips: "源名称",
      },
      seriesData: {
        type: ERightToolAttrType.JsonEdit,
        default: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        title: "数据源",
        tips: "数据源",
      },
      height: {
        type: ERightToolAttrType.InputNumber,
        default: 400,
        title: "高度",
        tips: "高度",
      },
      width: {
        type: ERightToolAttrType.InputNumber,
        default: 600,
        title: "宽度",
        tips: "宽度",
      }
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
    compatibility:true
  },
};
const D_EchartsDoughnutPie: IConfigComponentItem = {
  title: "环形图",
  icon: "chart-ring",
  domInfo: {
    tag: "doughnut-chart",
    title: "环形图",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      title: {
        type: ERightToolAttrType.Input,
        default: "World Population",
        title: "标题",
        tips: "标题",
      },
      seriesName: {
        type: ERightToolAttrType.Input,
        default: "Access From",
        title: "源名称",
        tips: "源名称",
      },
      seriesData: {
        type: ERightToolAttrType.JsonEdit,
        default: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        title: "数据源",
        tips: "数据源",
      },
      height: {
        type: ERightToolAttrType.InputNumber,
        default: 400,
        title: "高度",
        tips: "高度",
      },
      width: {
        type: ERightToolAttrType.InputNumber,
        default: 600,
        title: "宽度",
        tips: "宽度",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
    compatibility:true
  },
};
export const EchartsPieGroup: IConfigComponentGroup = {
  groupType: "pie",
  title: "饼图",
  list: [D_EchartsBasicPie, D_EchartsDoughnutPie],
};
