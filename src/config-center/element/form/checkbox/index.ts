import {
  ERightToolAttrType,
  IConfigComponentItem,
  IDomExtProps,
} from "../../../../model/model";

export const D_ElCheckbox: IConfigComponentItem = {
  title: "多选框",
  icon: "checkbox",
  domInfo: {
    tag: "el-checkbox",
    title: "el多选框",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      label: {
        type: ERightToolAttrType.Input,
        default: "Option",
        title: "选中值",
        tips: "选中状态的值(只有在checkbox-group或者绑定对象类型为array时有效)",
      },
      "true-label": {
        type: ERightToolAttrType.Input,
        default: "",
        title: "选中时的值",
        tips: "选中时的值",
      },
      "false-label": {
        type: ERightToolAttrType.Input,
        default: "",
        title: "未选中时值",
        tips: "没有选中时的值",
      },
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "禁用",
        tips: "是否禁用",
      },
      border: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示边框",
        tips: "是否显示边框",
      },
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "尺寸",
        tips: "Checkbox 的尺寸",
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
          },
        ],
      },
      name: {
        type: ERightToolAttrType.Input,
        default: "",
        title: "name属性",
        tips: "原生name属性",
      },
      checked: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "是否勾选",
        tips: "当前是否勾选",
      },
      indeterminate: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "indeterminate",
        tips: "设置 indeterminate 状态,只负责样式控制",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    eventAttr: {
      change: {
        custom: true,
        tips: "当绑定值变化时触发的事件",
        val: "console.log('Checkbox--change:'+value);",
        anonymous_params: ["value"],
        list: [],
      },
    },
    childrens: [],
  },
};
export const D_ElCheckboxGroup: IConfigComponentItem = {
  title: "双多选框组",
  icon: "checkbox-group",
  domInfo: {
    tag: "el-checkbox-group",
    title: "el多选框组",
    slots: true,
    canMove: true,
    canAllowTo: false,
    ClearStyle: true,
    props: {
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "尺寸",
        tips: "Checkbox 的尺寸",
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
          },
        ],
      },
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "禁用",
        tips: "是否禁用",
      },
      min: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "最小数量",
        tips: "可被勾选的checkbox的最小数量",
      },
      max: {
        type: ERightToolAttrType.InputNumber,
        default: 100,
        title: "最大数量",
        tips: "可被勾选的checkbox的最大数量",
      },
      "text-color": {
        type: ERightToolAttrType.ColorPicker,
        default: "#ffffff",
        title: "文本颜色",
        tips: "按钮形式的Checkbox激活时的文本颜色",
      },
      fill: {
        type: ERightToolAttrType.ColorPicker,
        default: "#409EFF",
        title: "填充颜色",
        tips: "按钮形式的Checkbox激活时的填充色和边框色",
      },
    },
    extProps: {
      选项个数: IDomExtProps.ChangeChildrenCount,
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    eventAttr: {
      change: {
        custom: true,
        tips: "当绑定值变化时触发的事件",
        val: "console.log('Checkboxgroup--change:'+value);",
        anonymous_params: ["value"],
        list: [],
      },
    },
    childrens: [
      {
        ...D_ElCheckbox.domInfo,
        props: {
          ...D_ElCheckbox.domInfo.props,
          label: { ...D_ElCheckbox.domInfo.props.label, default: "Option1" },
        },
        title: "多选框组一",
        canMove: false,
        ClearStyle: true,
      },
      {
        ...D_ElCheckbox.domInfo,
        props: {
          ...D_ElCheckbox.domInfo.props,
          label: { ...D_ElCheckbox.domInfo.props.label, default: "Option2" },
        },
        title: "多选框组二",
        canMove: false,
        ClearStyle: true,
      },
    ],
  },
};
