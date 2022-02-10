import { ERightToolAttrType, IConfigComponentItem, IDomExtProps } from "../../../../model/model";
const D_ElRow: IConfigComponentItem = {
  title: "行容器",
  icon: "grid",
  domInfo: {
    tag: "el-row",
    title: "el行容器",
    slots: true,
    canMove: true,
    canAllowTo: false,
    ClearStyle: true,
    props: {
      gutter: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "栅格间隔",
        tips: "栅格间隔",
      },
      justify: {
        type: ERightToolAttrType.Select,
        default: "start",
        title: "水平排列方式",
        tips: "flex布局下的水平排列方式",
        options: [
          {
            value: "start",
            label: "start",
          },
          {
            value: "end",
            label: "end",
          },
          {
            value: "center",
            label: "center",
          },
          {
            value: "space-around",
            label: "space-around",
          },
          {
            value: "space-between",
            label: "space-between",
          },
        ],
      },
      align: {
        type: ERightToolAttrType.Select,
        default: "top",
        title: "垂直排列方式",
        tips: "flex布局下的垂直排列方式",
        options: [
          {
            value: "top",
            label: "top",
          },
          {
            value: "middle",
            label: "middle",
          },
          {
            value: "bottom",
            label: "bottom",
          },
        ],
      },
      tag: {
        type: ERightToolAttrType.Input,
        default: "div",
        title: "元素标签",
        tips: "自定义元素标签",
      },
    },
    extProps:{
      "列容器个数":IDomExtProps.ChangeChildrenCount
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
const D_ElCol: IConfigComponentItem = {
  title: "列容器",
  icon: "grid",
  domInfo: {
    tag: "el-col",
    title: "el列容器",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      span: {
        type: ERightToolAttrType.InputNumber,
        default: 24,
        title: "占据列数",
        tips: "栅格占据的列数",
      },
      offset: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "左侧间隔格数",
        tips: "栅格左侧的间隔格数",
      },
      push: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "向右移动格数",
        tips: "栅格向右移动格数",
      },
      pull: {
        type: ERightToolAttrType.InputNumber,
        default: 0,
        title: "向左移动格数",
        tips: "栅格向左移动格数",
      },
      tag: {
        type: ERightToolAttrType.Input,
        default: "div",
        title: "元素标签",
        tips: "自定义元素标签",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
export const D_ElGrid1: IConfigComponentItem = {
  title: "单列栅格",
  icon: "grid1",
  domInfo: { ...D_ElRow.domInfo, childrens: [{ ...D_ElCol.domInfo }] },
};
export const D_ElGrid2: IConfigComponentItem = {
  title: "双列栅格",
  icon: "grid2",
  domInfo: {
    ...D_ElRow.domInfo,
    childrens: [
      {
        ...D_ElCol.domInfo,
        props: {
          ...D_ElCol.domInfo.props,
          span: {
            ...D_ElCol.domInfo.props.span,
            default: 12,
          },
        },
      },
      {
        ...D_ElCol.domInfo,
        props: {
          ...D_ElCol.domInfo.props,
          span: {
            ...D_ElCol.domInfo.props.span,
            default: 12,
          },
        },
      },
    ],
  },
};
