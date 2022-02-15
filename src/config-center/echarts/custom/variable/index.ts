import {
  ERightToolAttrType,
  IConfigComponentItem,
} from "../../../../model/model";

export const D_EchartsCustom: IConfigComponentItem = {
  title: "可变图表",
  icon: "echart-variable",
  domInfo: {
    tag: "v-chart",
    title: "通过改变option生成各类图表,当前测试环境里面仅引入了柱状图和饼图",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      option: {
        type: ERightToolAttrType.JsonEdit,
        default: {
          title: {
            text: "Traffic Sources",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: [
              "Direct",
              "Email",
              "Ad Networks",
              "Video Ads",
              "Search Engines",
            ],
          },
          series: [
            {
              name: "Traffic Sources",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                {
                  value: 335,
                  name: "Direct",
                },
                {
                  value: 310,
                  name: "Email",
                },
                {
                  value: 234,
                  name: "Ad Networks",
                },
                {
                  value: 135,
                  name: "Video Ads",
                },
                {
                  value: 1548,
                  name: "Search Engines",
                },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },
        title: "配置数据",
        tips: "配置数据",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    classAttr: {
      custom: {
        height: "400px",
        width: "400px",
      },
      global: [],
    },
    childrens: [],
    compatibility:true
  },
};
