import { IConfigComponentItem } from "../../../../model/model";

export const D_AntdButton: IConfigComponentItem = {
  title: "按钮",
  icon: "button",
  domInfo: {
    tag: "a-button",
    title: "antd按钮",
    slots: false,
    canMove: true,
    ClearStyle:false,
    canAllowTo: false,
    props: {
      size: {
        type: "Select",
        default: "default",
        title: "大小",
        tips:"大小",
        options: [{
          value: 'large',
          label: 'large',
        },
        {
          value: 'default',
          label: 'default',
        },
        {
          value: 'small',
          label: 'small',
        }]
      },
      type: {
        type: "Select",
        default: "primary",
        title: "类型",
        tips:"类型",
        options: [{
          value: 'primary',
          label: 'primary',
        },
        {
          value: 'dashed',
          label: 'dashed',
        },
        {
          value: 'text',
          label: 'text',
        }]
      }
    },
    tagSlots: {
      enable: true,
      val: "antd按钮"
    },
    childrens: [],
  },
};
