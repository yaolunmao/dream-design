import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElDatePicker: IConfigComponentItem = {
  title: "日期选择器",
  icon: "datepicker",
  domInfo: {
    tag: "el-date-picker",
    title: "el日期选择器",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      readonly: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "只读",
        tips: "只读",
      },
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
          },
        ],
      },
      editable: {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "可输入",
        tips: "文本框可输入",
      },
      clearable: {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "可清除",
        tips: "是否显示清除按钮",
      },
      placeholder: {
        type: ERightToolAttrType.Input,
        default: "",
        title: "非范围占位",
        tips: "非范围选择时的占位内容",
      },
      "start-placeholder": {
        type: ERightToolAttrType.Input,
        default: "",
        title: "开始日期占位",
        tips: "范围选择时开始日期的占位内容",
      },
      "end-placeholder": {
        type: ERightToolAttrType.Input,
        default: "",
        title: "结束日期占位",
        tips: "范围选择时结束日期的占位内容",
      },
      type: {
        type: ERightToolAttrType.Select,
        default: "date",
        title: "显示类型",
        tips: "显示类型",
        options: [
          {
            value: "year",
            label: "year",
          },
          {
            value: "month",
            label: "month",
          },
          {
            value: "date",
            label: "date",
          },
          {
            value: "dates",
            label: "dates",
          },
          {
            value: "datetime",
            label: "datetime",
          },
          {
            value: "week",
            label: "week",
          },
          {
            value: "datetimerange",
            label: "datetimerange",
          },
          {
            value: "daterange",
            label: "daterange",
          },
          {
            value: "monthrange",
            label: "monthrange",
          },
        ],
      },
      format: {
        type: ERightToolAttrType.Input,
        default: null,
        title: "格式化",
        tips: "显示在输入框中的格式",
      },
      "popper-class": {
        type: ERightToolAttrType.Input,
        default: "",
        title: "下拉框类名",
        tips: "DatePicker下拉框的类名",
      },
      "range-separator": {
        type: ERightToolAttrType.Input,
        default: "-",
        title: "分隔符",
        tips: "选择范围时的分隔符",
      },
      "unlink-panels": {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "取消联动",
        tips: "在范围选择器里取消两个日期面板之间的联动",
      },
      "prefix-icon": {
        type: ERightToolAttrType.Select,
        default: "",
        title: "前缀icon",
        tips: "自定义前缀图标",
        options: [
          {
            value: "",
            label: "Date",
          },
          {
            value: "Edit",
            label: "Edit",
          },
          {
            value: "Search",
            label: "Search",
          },
        ],
      },
      "clear-icon": {
        type: ERightToolAttrType.Select,
        default: "CircleClose",
        title: "清除icon",
        tips: "自定义清除图标",
        options: [
          {
            value: "CircleClose",
            label: "CircleClose",
          },
          {
            value: "Edit",
            label: "Edit",
          },
          {
            value: "Search",
            label: "Search",
          },
        ],
      },
      "validate-event": {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "表单校验",
        tips: "输入时是否触发表单的校验",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    eventAttr: {
      change: {
        custom: true,
        tips: "用户确认选定的值时触发",
        val: "console.log('DatePicker--change:'+value);",
        anonymous_params: ["value"],
        list: [],
      },
      blur: {
        custom: true,
        tips: "在组件Input失去焦点时触发",
        val: "console.log('DatePicker--blur:'+e);",
        anonymous_params: ["e"],
        list: [],
      },
      focus: {
        custom: true,
        tips: "在组件Input获得焦点时触发",
        val: "console.log('DatePicker--focus:'+JSON.stringify(e));",
        anonymous_params: ["e"],
        list: [],
      },
      "panel-change": {
        custom: true,
        tips: "当日期面板改变时触发",
        val: "console.log('DatePicker--panel-change:'+date,mode,view);",
        anonymous_params: ["date,mode,view"],
        list: [],
      },
    },
    childrens: [],
    compatibility:true
  },
};
