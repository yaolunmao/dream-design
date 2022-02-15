import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElInput: IConfigComponentItem = {
  title: "输入框",
  icon: "input",
  domInfo: {
    tag: "el-input",
    title: "el输入框",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      type: {
        type: ERightToolAttrType.Select,
        default: "text",
        title: "类型",
        tips: "类型",
        options: [
          {
            value: "textarea",
            label: "textarea",
          },
          {
            value: "text",
            label: "text",
          }
        ],
      },
      maxlength: {
        type: ERightToolAttrType.InputNumber,
        default: 100,
        title: "最大输入长度",
        tips: "最大输入长度",
      },
      minlength: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "最小输入长度",
        tips: "最小输入长度",
      },
      'show-word-limit': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "显示输入字数",
        tips: "是否显示输入字数统计,只在 type = \"text\" 或 type = \"textarea\" 时有效",
      },
      placeholder: {
        type: ERightToolAttrType.Input,
        default: `请输入文字`,
        title: "输入框占位文本",
        tips: "输入框占位文本",
      },
      clearable: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "可清空",
        tips: "可清空",
      },
      'show-password': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "切换密码图标",
        tips: "是否显示切换密码图标",
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
          }
        ],
      },
      "prefix-icon": {
        type: ERightToolAttrType.Select,
        default: "",
        title: "前缀icon",
        tips: "自定义前缀图标",
        options: [
          {
            value: "",
            label: "无",
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
      "suffix-icon": {
        type: ERightToolAttrType.Select,
        default: "",
        title: "后缀icon",
        tips: "自定义后缀图标",
        options: [
          {
            value: "",
            label: "无",
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
      rows: {
        type: ERightToolAttrType.InputNumber,
        default: 2,
        title: "输入框行数",
        tips: "输入框行数,只对 type=\"textarea\" 有效",
      },
      autosize: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "高度自适应",
        tips: "textarea高度是否自适应,只在 type=\"textarea\" 时生效。 ",
      },
      autocomplete: {
        type: ERightToolAttrType.Input,
        default: `off`,
        title: "自动补全",
        tips: "原生属性,自动补全",
      },
      name: {
        type: ERightToolAttrType.Input,
        default: ``,
        title: "原生属性name",
        tips: "原生属性name",
      },
      readonly: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "原生只读",
        tips: "原生属性,是否只读 ",
      },
      //够多了下面不写了
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
