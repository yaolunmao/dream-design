import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";
const D_ElContainer: IConfigComponentItem = {
  title: "外层容器",
  icon: "grid",
  domInfo: {
    tag: "el-container",
    title: "el外层容器",
    slots: true,
    canMove: true,
    canAllowTo: false,
    ClearStyle: true,
    props: {
      direction: {
        type: ERightToolAttrType.Select,
        default: "horizontal",
        title: "排列方向",
        tips: "子元素的排列方向",
        options: [
          {
            value: "horizontal",
            label: "horizontal",
          },
          {
            value: "vertical",
            label: "vertical",
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
const D_ElHeader: IConfigComponentItem = {
  title: "顶栏容器",
  icon: "grid",
  domInfo: {
    tag: "el-header",
    title: "el顶栏容器",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      height: {
        type: ERightToolAttrType.Input,
        default: "60px",
        title: "顶栏高度",
        tips: "顶栏高度",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
const D_ElAside: IConfigComponentItem = {
  title: "侧边栏容器",
  icon: "grid",
  domInfo: {
    tag: "el-aside",
    title: "el侧边栏容器",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      width: {
        type: ERightToolAttrType.Input,
        default: "300px",
        title: "侧边栏宽度",
        tips: "侧边栏宽度",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
const D_ElMain: IConfigComponentItem = {
  title: "主要区域容器",
  icon: "grid",
  domInfo: {
    tag: "el-main",
    title: "el主要区域容器",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {},
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
const D_ElFooter: IConfigComponentItem = {
  title: "底栏容器",
  icon: "grid",
  domInfo: {
    tag: "el-footer",
    title: "el底栏容器",
    slots: true,
    canMove: false,
    canAllowTo: true,
    ClearStyle: false,
    props: {
      height: {
        type: ERightToolAttrType.Input,
        default: "60px",
        title: "底栏高度",
        tips: "底栏高度",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
export const D_ElContainer1: IConfigComponentItem = {
  title: "顶-中布局",
  icon: "top-main",
  domInfo: {
    ...D_ElContainer.domInfo,
    props: {
      ...D_ElContainer.domInfo.props,
      direction: {
        ...D_ElContainer.domInfo.props.direction,
        default: "vertical",
      },
    },
    childrens: [{ ...D_ElHeader.domInfo }, { ...D_ElMain.domInfo }],
  },
};
export const D_ElContainer2: IConfigComponentItem = {
  title: "顶中下布局",
  icon: "top-main-footer",
  domInfo: {
    ...D_ElContainer.domInfo,
    props: {
      ...D_ElContainer.domInfo.props,
      direction: {
        ...D_ElContainer.domInfo.props.direction,
        default: "vertical",
      },
    },
    childrens: [
      { ...D_ElHeader.domInfo },
      { ...D_ElMain.domInfo },
      { ...D_ElFooter.domInfo },
    ],
  },
};
export const D_ElContainer3: IConfigComponentItem = {
  title: "左-中布局",
  icon: "left-main",
  domInfo: {
    ...D_ElContainer.domInfo,
    props: {
      ...D_ElContainer.domInfo.props,
      direction: {
        ...D_ElContainer.domInfo.props.direction,
      },
    },
    childrens: [{ ...D_ElAside.domInfo }, { ...D_ElMain.domInfo }],
  },
};
export const D_ElContainer4: IConfigComponentItem = {
  title: "上左中布局",
  icon: "top-left-main",
  domInfo: {
    ...D_ElContainer.domInfo,
    props: {
      ...D_ElContainer.domInfo.props,
      direction: {
        ...D_ElContainer.domInfo.props.direction,
        default: "vertical",
      },
    },
    childrens: [
      { ...D_ElHeader.domInfo },
      {
        ...D_ElContainer.domInfo,
        props: {
          ...D_ElContainer.domInfo.props,
          direction: {
            ...D_ElContainer.domInfo.props.direction,
          },
        },
        childrens: [{ ...D_ElAside.domInfo }, { ...D_ElMain.domInfo }],
      },
    ],
  },
};
