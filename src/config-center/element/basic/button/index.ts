import { IConfigComponentItem, ERightToolAttrType, IDomExtProps, IEventAttrType } from "../../../../model/model";

export const D_ElButton: IConfigComponentItem = {
  title: "按钮",
  icon: "button",
  domInfo: {
    tag: "el-button",
    title: "el按钮",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "尺寸",
        tips: "尺寸",
        options: [
          {
            value: "large",
            label: "特大",
          },
          {
            value: "default",
            label: "大",
          },
          {
            value: "small",
            label: "中",
          },
        ],
      },
      type: {
        type: ERightToolAttrType.Select,
        default: "primary",
        title: "类型",
        tips: "类型",
        options: [
          {
            value: "default",
            label: "默认按钮",
          },
          {
            value: "primary",
            label: "主要按钮",
          },
          {
            value: "success",
            label: "成功按钮",
          },
          {
            value: "warning",
            label: "警告按钮",
          },
          {
            value: "danger",
            label: "危险按钮",
          },
          {
            value: "info",
            label: "信息按钮",
          },
          {
            value: "text",
            label: "文字按钮",
          },
        ],
      },
      plain: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "朴素按钮",
        tips: "是否为朴素按钮",
      },
      round: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "圆角按钮",
        tips: "是否为圆角按钮",
      },
      circle: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "圆形按钮",
        tips: "是否为圆形按钮",
      },
      loading: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "加载中",
        tips: "是否为加载中状态",
      },
      "loading-icon": {
        type: ERightToolAttrType.Select,
        default: "",
        title: "加载中icon",
        tips: "自定义加载中图标",
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
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "禁用",
        tips: "是否为禁用状态"
      },
      icon: {
        type: ERightToolAttrType.Select,
        default: "",
        title: "icon",
        tips: "自定义图标",
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
      autofocus: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "自动焦点",
        tips: "原生autofocus属性",
      },
      "native-type": {
        type: ERightToolAttrType.Select,
        default: "button",
        title: "原生按钮类型",
        tips: "原生type属性",
        options: [
          {
            value: "button",
            label: "button",
          },
          {
            value: "submit",
            label: "submit",
          },
          {
            value: "reset",
            label: "reset",
          },
        ],
      },
      //这个也没生效
      "auto-insert-space": {
        type: ERightToolAttrType.Radio,
        default: false,
        title: "自动空格",
        tips: "自动在两个中文之间加空格",
        options: [
          {
            value: true,
            label: "是",
          },
          {
            value: false,
            label: "否",
          },
        ],
      },
    },
    eventAttr: {
      click: {
        custom: true,
        tips:'点击',
        val: "alert('点击了按钮')",
        anonymous_params:[],
        list:[]
      }
    },
    tagSlots: {
      enable: true,
      val: "el按钮",
    },
    childrens: [],
  },
};
export const D_ElButtonGroup: IConfigComponentItem = {
  title: "双按钮组",
  icon: "button-group",
  domInfo: {
    tag: "el-button-group",
    title: "el按钮组",
    slots: true,
    canMove: true,
    canAllowTo: false,
    ClearStyle: true,
    props: {},
    extProps: {
      "按钮个数": IDomExtProps.ChangeChildrenCount
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [
      {
        ...D_ElButton.domInfo,
        title: "按钮组一",
        tagSlots: {
          enable: true,
          val: "按钮一",
        },
        canMove: false,
        ClearStyle: true,
      },
      {
        ...D_ElButton.domInfo,
        title: "按钮组二",
        tagSlots: {
          enable: true,
          val: "按钮二",
        },
        canMove: false,
        ClearStyle: true,
      },
    ],
  },
};
