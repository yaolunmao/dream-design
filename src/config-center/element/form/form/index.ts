import {
  ERightToolAttrType,
  IConfigComponentItem,
  IDomExtProps,
} from "../../../../model/model";
const D_ElForm: IConfigComponentItem = {
  title: "表单容器",
  icon: "grid",
  domInfo: {
    tag: "el-form",
    title: "el表单容器",
    slots: true,
    canMove: true,
    canAllowTo: false,
    ClearStyle: true,
    props: {
      rules: {
        type: ERightToolAttrType.JsonEdit,
        default: { trigger: "blur" },
        title: "验证规则",
        tips: "表单验证规则",
      },
      inline: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "行内表单",
        tips: "行内表单模式"
      },
      'label-position': {
        type: ERightToolAttrType.Select,
        default: "right",
        title: "标签位置",
        tips: "表单域标签的位置,如果值为 left 或者 right 时,则需要设置 label-width",
        options: [
          {
            value: "left",
            label: "left",
          },
          {
            value: "right",
            label: "right",
          },
          {
            value: "top",
            label: "top",
          },
        ],
      },
      'label-width': {
        type: ERightToolAttrType.Input,
        default: "50px",
        title: "标签宽度",
        tips: "表单域标签的宽度,例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。",
      },
      'label-suffix': {
        type: ERightToolAttrType.Input,
        default: "",
        title: "标签后缀",
        tips: "表单域标签的后缀",
      },
      'hide-required-asterisk': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示星号",
        tips: "是否显示必填字段的标签旁边的红色星号",
      },
      'show-message': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示校验错误",
        tips: "是否显示校验错误信息",
      },
      'inline-message': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "行内形式展示",
        tips: "是否以行内形式展示校验信息",
      },
      'status-icon': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示反馈图标",
        tips: "是否在输入框中显示校验结果反馈图标",
      },
      'validate-on-rule-change': {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "立即触发验证",
        tips: "是否在 rules 属性改变后立即触发一次验证",
      },
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "组件尺寸",
        tips: "用于控制该表单内组件的尺寸",
        options: [
          {
            value: "large",
            label: "large",
          },
          {
            value: "default",
            label: "default",
          },
          {
            value: "small",
            label: "small",
          },
        ],
      },
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "禁用",
        tips: "是否禁用该表单内的所有组件。 若设置为 true,则表单内组件上的 disabled 属性不再生效",
      },
    },
    extProps: {
      列容器个数: IDomExtProps.ChangeChildrenCount,
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
const D_ElFormItem: IConfigComponentItem = {
  title: "表单项",
  icon: "grid",
  domInfo: {
    tag: "el-form-item",
    title: "el表单项",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      label: {
        type: ERightToolAttrType.Input,
        default: "标签",
        title: "标签",
        tips: "标签",
      },
      'label-width': {
        type: ERightToolAttrType.Input,
        default: "100px",
        title: "标签宽度",
        tips: "表单域标签的宽度,例如 '50px'。 支持 auto。",
      },
      required: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "必填",
        tips: "是否必填,如不设置,则会根据校验规则自动生成",
      },
      rules: {
        type: ERightToolAttrType.JsonEdit,
        default: {},
        title: "表单验证规则",
        tips: "表单验证规则",
      },
      error: {
        type: ERightToolAttrType.Input,
        default: "",
        title: "错误信息",
        tips: "表单域验证错误信息, 设置该值会使表单验证状态变为 error,并显示该错误信息",
      },
      'show-message': {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "显示校验错误",
        tips: "是否显示校验错误信息",
      },
      'inline-message': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "行内形式展示",
        tips: "以行内形式展示校验信息",
      },
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "大小",
        tips: "控制组件在此表单项中的大小",
        options: [
          {
            value: "large",
            label: "large",
          },
          {
            value: "default",
            label: "default",
          },
          {
            value: "small",
            label: "small",
          },
        ],
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
export const D_ElFormContainer: IConfigComponentItem = {
  title: "表单容器",
  icon: "form",
  domInfo: { ...D_ElForm.domInfo, childrens: [{ ...D_ElFormItem.domInfo }] },
};

