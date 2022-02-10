import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElLink: IConfigComponentItem = {
  title: "链接",
  icon: "link",
  domInfo: {
    tag: "el-link",
    title: "el链接",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      type: {
        type: ERightToolAttrType.Select,
        default: "primary",
        title: "类型",
        tips: "类型",
        options: [
          {
            value: "primary",
            label: "主要链接",
          },
          {
            value: "success",
            label: "成功链接",
          },
          {
            value: "warning",
            label: "警告链接",
          },
          {
            value: "danger",
            label: "危险链接",
          },
          {
            value: "info",
            label: "信息链接",
          },
        ],
      },
      underline: {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "是否下划线",
        tips: "鼠标悬停是否显示下划线",
      },
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "是否禁用状态",
        tips: "是否禁用状态",
      },
      href: {
        type: ERightToolAttrType.Input,
        default: "https://www.cnblogs.com/Hero-/",
        title: "链接地址",
        tips: "原生 href 属性",
      },
      icon: {
        type: ERightToolAttrType.Select,
        default: "",
        title: "icon",
        tips: "自定义图标组件",
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
    },
    tagSlots: {
      enable: true,
      val: "el链接",
    },
    childrens: [],
  },
};
