import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElScrollbar: IConfigComponentItem = {
  title: "滚动条",
  icon: "scroll",
  domInfo: {
    tag: "el-scrollbar",
    title: "el滚动条",
    slots: true,
    canMove: true,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      height: {
        type: ERightToolAttrType.Input,
        default: "",
        title: "高度",
        tips: "滚动条高度",
      },
      "max-height": {
        type: ERightToolAttrType.Input,
        default: "100px",
        title: "最大高度",
        tips: "滚动条最大高度",
      },
      native: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "原生滚动条",
        tips: "是否使用原生滚动条样式",
      },
      noresize: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "不响应容器",
        tips: "不响应容器尺寸变化,如果容器尺寸不会发生变化,最好设置它可以优化性能",
      },
      tag: {
        type: ERightToolAttrType.Input,
        default: "div",
        title: "元素标签",
        tips: "视图的元素标签",
      },
      always: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "总是显示",
        tips: "滚动条总是显示",
      },
      'min-size': {
        type: ERightToolAttrType.InputNumber,
        default: 20,
        title: "最小尺寸",
        tips: "滚动条最小尺寸",
      },
    },
    eventAttr:{
      scroll:{
        custom:true,
        tips:"滚动触发事件",
        val:"console.log('顶部滚动距离:'+scroll_params.scrollTop);\n\tconsole.log('左侧滚动距离:'+scroll_params.scrollLeft)",
        anonymous_params:['scroll_params'],
        list:[]
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
