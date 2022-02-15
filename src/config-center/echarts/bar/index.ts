import {
  ERightToolAttrType,
  IConfigComponentGroup,
  IConfigComponentItem,
} from "../../../model/model";

const D_EchartsBasicBar: IConfigComponentItem = {
  title: "基础柱状图",
  icon: "chart-bar",
  domInfo: {
    tag: "basic-bar-chart",
    title: "基础柱状图",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      title: {
        type: ERightToolAttrType.Input,
        default: "基础柱状图",
        title: "标题",
        tips: "标题",
      },
      xAxisData: {
        type: ERightToolAttrType.JsonEdit,
        default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        title: "X轴数据",
        tips: "X轴数据",
      },
      seriesData: {
        type: ERightToolAttrType.JsonEdit,
        default: [120, 200, 150, 80, 70, 110, 130],
        title: "Y轴数据",
        tips: "Y轴数据",
      },
      height: {
        type: ERightToolAttrType.InputNumber,
        default: 400,
        title: "高度",
        tips: "高度",
      },
      width: {
        type: ERightToolAttrType.InputNumber,
        default: 400,
        title: "宽度",
        tips: "宽度",
      },
      showBackground: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示背景色",
        tips: "显示背景色",
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
const D_EchartsHorizontalBar: IConfigComponentItem = {
  title: "横向柱状图",
  icon: "horizontal-bar",
  domInfo: {
    tag: "horizontal-bar-chart",
    title: "横向柱状图",
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
      yAxisData: {
        type: ERightToolAttrType.JsonEdit,
        default: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        title: "Y轴数据",
        tips: "Y轴数据",
      },
      seriesData: {
        type: ERightToolAttrType.JsonEdit,
        default: [
          {
            name: "2011",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
          {
            name: "2012",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807],
          },
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
        default: 1000,
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
export const EchartsBarGroup: IConfigComponentGroup = {
  groupType: "bar",
  title: "柱状图",
  list: [D_EchartsBasicBar, D_EchartsHorizontalBar],
};
