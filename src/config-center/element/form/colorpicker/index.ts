import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElColorPicker: IConfigComponentItem = {
  title: "颜色选择器",
  icon: "color-picker",
  domInfo: {
    tag: "el-color-picker",
    title: "el颜色选择器",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "禁用",
        tips: "是否禁用",
      },
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "尺寸",
        tips: "尺寸",
        options: [
          {
            value: "large",
            label: "大",
          },
          {
            value: "default",
            label: "默认",
          },
          {
            value: "small",
            label: "小",
          }
        ],
      },
      'show-alpha': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "透明度选择",
        tips: "是否支持透明度选择",
      },
      'color-format': {
        type: ERightToolAttrType.Select,
        default: "hex",
        title: "颜色格式",
        tips: "写入v-model的颜色的格式",
        options: [
          {
            value: "hsl",
            label: "hsl",
          },
          {
            value: "hsv",
            label: "hsv",
          },
          {
            value: "hex",
            label: "hex",
          },
          {
            value: "rgb",
            label: "rgb",
          },
        ],
      },
      predefine: {
        type: ERightToolAttrType.JsonEdit,
        default: [
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            'hsv(51, 100, 98)',
            'hsva(120, 40, 94, 0.5)',
            'hsl(181, 100%, 37%)',
            'hsla(209, 100%, 56%, 0.73)',
            '#c7158577',
          ],
        title: "预定义颜色",
        tips: "预定义颜色",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    eventAttr: {
        change: {
          custom: true,
          tips: "当绑定值变化时触发",
          val: "console.log('ColorPicker--change:'+value);",
          anonymous_params: ["value"],
          list: [],
        },
        'active-change': {
            custom: true,
            tips: "显示的颜色发生改变时触发",
            val: "console.log('ColorPicker--active-change:'+value);",
            anonymous_params: ["value"],
            list: [],
          },
      },
    childrens: [],
    compatibility:true
  },
};
