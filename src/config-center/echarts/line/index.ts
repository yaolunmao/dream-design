import {
  ERightToolAttrType,
  IConfigComponentGroup,
  IConfigComponentItem,
} from "../../../model/model";

const D_EchartsBasicLine: IConfigComponentItem = {
  title: "基础折线图",
  icon: "chart-line",
  domInfo: {
    tag: "basic-line-chart",
    title: "基础折线图",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      title: {
        type: ERightToolAttrType.Input,
        default: "基础折线图",
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
        default: [150, 230, 224, 218, 135, 147, 260],
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
      smooth: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "平滑效果",
        tips: "平滑效果",
      },
      areaStyle: {
        type: ERightToolAttrType.JsonEdit,
        default: {
          color: "transparent",
          origin: "auto",
          shadowBlur: 0,
          shadowColor: "rgba(0, 0, 0, 0)",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1,
        },
        title: "区域填充样式",
        tips: "区域填充样式",
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
const D_EchartsStackedLine: IConfigComponentItem = {
  title: "折线图堆叠",
  icon: "stacked-line",
  domInfo: {
    tag: "stacked-line-chart",
    title: "折线图堆叠",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      title: {
        type: ERightToolAttrType.Input,
        default: "Stacked Line",
        title: "标题",
        tips: "标题",
      },
      legend: {
        type: ERightToolAttrType.JsonEdit,
        default: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        title: "图例数据",
        tips: "图例数据",
      },
      xAxisData: {
        type: ERightToolAttrType.JsonEdit,
        default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        title: "X轴数据",
        tips: "X轴数据",
      },
      seriesData: {
        type: ERightToolAttrType.JsonEdit,
        default: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
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
export const EchartsLineGroup: IConfigComponentGroup = {
  groupType: "line",
  title: "折线图",
  list: [D_EchartsBasicLine, D_EchartsStackedLine],
};
